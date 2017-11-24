require_relative '02_searchable'
require 'active_support/inflector'

# Phase IIIa
class AssocOptions
  attr_accessor(
    :foreign_key,
    :class_name,
    :primary_key
  )

  def model_class
    self.class_name.constantize
  end

  def table_name
    "#{self.class_name.downcase}s"
  end
end

class BelongsToOptions < AssocOptions
  
  def initialize(name, options = {})
    defaults = { foreign_key: "#{name}_id".to_sym, primary_key: :id, class_name: name.camelcase }
    defaults.merge!(options)
    defaults.each { |k, v| self.send("#{k}=", v) }
  end

end

class HasManyOptions < AssocOptions
  def initialize(name, self_class_name, options = {})
    defaults = { foreign_key: "#{self_class_name.downcase}_id".to_sym, primary_key: :id, class_name: name.singularize.camelcase }
    defaults.merge!(options)
    defaults.each { |k, v| self.send("#{k}=", v) }
  end
end

module Associatable
  # Phase IIIb
  def belongs_to(name, options = {})
    define_method(name) do
      name.capitalize.to_s.find(options[:foreign_key])
    end
  end

  def has_many(name, options = {})
    # ...
  end

  def assoc_options
    # Wait to implement this in Phase IVa. Modify `belongs_to`, too.
  end
end

class SQLObject
  extend Associatable
end
