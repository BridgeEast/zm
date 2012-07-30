class FMenu < ActiveRecord::Base
  has_many :s_menus, :dependent => :destroy
  accepts_nested_attributes_for  :s_menus, :allow_destroy => true
end
