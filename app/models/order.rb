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
end
