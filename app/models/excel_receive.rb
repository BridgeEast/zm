class ExcelReceive < ActiveRecord::Base
  has_many :general_shoes,:dependent => :destroy
end
