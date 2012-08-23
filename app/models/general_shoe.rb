class GeneralShoe < ActiveRecord::Base
  has_one :size_of_shoe
  has_one :details_of_shoe
  has_one :play_board

  belongs_to :advanced_order
  belongs_to :order
  belongs_to :excel_receive
  belongs_to :factory_order
end
