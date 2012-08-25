class Procession < ActiveRecord::Base
  has_one :details_of_shoe,:dependent => :destroy
end
