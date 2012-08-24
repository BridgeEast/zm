class Order < ActiveRecord::Base
  has_many :general_shoes,:dependent => :destroy
end
