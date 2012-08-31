class DetailsOfShoe < ActiveRecord::Base
  belongs_to :region
  belongs_to :material
  belongs_to :color
  belongs_to :procession

  belongs_to :general_shoe

  def self.find_details_num( shoes )
    shoes.collect! do |shoe|
      { 
        :rigion => shoe.region.region,
        :material => shoe.material.material,
        :color => shoe.color.color
        :procession => shoe.procession.procession
      }
    end
  end
