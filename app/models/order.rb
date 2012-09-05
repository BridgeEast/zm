class Order < ActiveRecord::Base
  has_many :general_shoes,:dependent => :destroy

  ############ 文件路径 
  File_target = "public/files/orders_files"
  ############ 在数据库设置文件路径
  def set_order_url( order_url )
    self.order_url  = order_url
  end
  ########### 从数据库获取文件路径
  def get_order_url
    return Order::File_target + "/" + self.order_url
  end
  def get_details_of_shoes
      details_of_shoes = GeneralShoe.where(:shoes_id => shoes_id).first
      details_of_shoes.collect! do |item|
        { 
          :region => item.region.region,
          :material => item.material.material,
          :color => item.color.color,
          :procession => item.procession.procession
        }
      end
  end
end
