class SizeOfShoe < ActiveRecord::Base
  has_many :inbound_and_outbound, :dependent => :destroy

  belongs_to :general_shoe
end
