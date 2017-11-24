require_relative 'db_connection'
require_relative '01_sql_object'

module Searchable
  def where(params)
    where_line = []
    params.each do |attribute, value|
      where_line << "#{attribute} = ?"
    end 
    where_line = where_line.join(' AND ')
    vals = params.values 
    
    matches = DBConnection.execute(<<-SQL, vals)
    SELECT 
      *
    FROM 
      #{self.table_name}
    WHERE 
      #{where_line}
    SQL
    matches.map { |match| self.new(match) }
  end
end

class SQLObject
  extend Searchable
end