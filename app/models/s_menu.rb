class SMenu < ActiveRecord::Base
  has_many :t_menus
  belongs_to :f_menu
  # you can use NestedAssignment for help
  #include NestedAssignment
  accepts_nested_attributes_for :t_menus
end
