class AttrAccessorObject
  def self.my_attr_accessor(*names)
    names.each do |name|
      
      # define getters
      define_method(name) do
        self.instance_variable_get("@#{name.to_s}")
      end
      
      # define setters
      define_method("#{name}=") do |set_value|
        self.instance_variable_set("@#{name}", set_value)
      end
      
    end 
  end
  
end
