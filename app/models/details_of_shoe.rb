class DetailsOfShoe < ActiveRecord::Base
  belongs_to :region
  belongs_to :material
  belongs_to :color
  belongs_to :procession

  belongs_to :general_shoe
end
