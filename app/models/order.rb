class Order < ActiveRecord::Base
  has_many :general_shoes,:dependent => :destroy

  ############ 文件路径 
  File_target = "public/files/orders_files"
  ############ 在数据库设置文件路径
  def set_orders_url( orders_url )
    self.orders_url  = orders_url
  end
  ########### 从数据库获取文件路径
  def get_orders_url
    return Order::File_target + "/" + self.orders_url
  end
end
