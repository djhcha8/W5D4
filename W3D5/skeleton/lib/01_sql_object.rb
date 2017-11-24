require_relative 'db_connection'
require 'active_support/inflector'
# NB: the attr_accessor we wrote in phase 0 is NOT used in the rest
# of this project. It was only a warm up.

class SQLObject
  def self.columns
    return @columns unless @columns.nil?
    columns = DBConnection.execute2(<<-SQL)
      SELECT 
        *
      FROM
        #{self.table_name}
    SQL
    @columns = columns.first.map(&:to_sym)
  end

  def self.finalize!
    self.columns.each do |column|
      define_method(column) do
        self.attributes[column]
      end
      
      define_method("#{column}=") do |set_value|
        self.attributes[column] = set_value
      end
    end
  end

  def self.table_name=(table_name)
    @table_name = self.class.to_s.tableize
  end

  def self.table_name
    "#{self.to_s.downcase}s"
  end

  def self.all
    results = DBConnection.execute(<<-SQL)
      SELECT 
        *
      FROM 
        #{self.table_name}
    SQL
    
    self.parse_all(results)
  end

  def self.parse_all(results)
    results.map { |result| self.new(result) }
  end

  def self.find(id)
    result = DBConnection.execute(<<-SQL, id)
    SELECT 
      *
    FROM 
      #{self.table_name}
    WHERE 
      id = ?
    SQL
    self.parse_all(result).first
  end

  def initialize(params = {})
    params.each do |attr_name, value|
      raise "unknown attribute '#{attr_name}'" unless self.class.columns.include?(attr_name.to_sym)
      self.send("#{attr_name}=", value)
    end
  end

  def attributes
    @attributes ||= Hash.new
  end

  def attribute_values
    self.class.columns.map { |column| self.send(column) }
  end

  def insert
    col_names = self.class.columns.map(&:to_s).join(', ')
    question_marks = Array.new(self.class.columns.length, '?').join(', ') 

    DBConnection.execute(<<-SQL, attribute_values)
    INSERT INTO 
      #{self.class.table_name} (#{col_names})
    VALUES 
      (#{question_marks})
    SQL
    
    self.id = DBConnection.last_insert_row_id
  end

  def update
    set_columns = self.class.columns.map { |attr_name| "#{attr_name} = ?"  }.join(', ')
    DBConnection.execute(<<-SQL, attribute_values, id)
    UPDATE 
      #{self.class.table_name}
    SET 
      #{set_columns}
    WHERE 
      id = ?
    SQL
  end

  def save
    if self.class.find(self.id)
      self.update
    else 
      self.insert
    end 
  end
end
