class FactoryOrder < ActiveRecord::Base
  has_many :general_shoes
  ###### 判断日期，选取适合的记录返回 #####
  def self.get_cfo_record( param )
    rec = Array.new
      self.all.each do|record|
        date = record.production_date.to_s.split("-")
        date[1] = date[1].to_i.to_s           #将01-09转化为1-9
        #如果点击的是年的，就显示符合年的记录
        if date[0] == param 
          rec << record
        else
        #与所创建的年月匹配, 则记录输入rec
          yearMonth = date[0] + "-" + date[1]
          if yearMonth == param
            rec << record
          end
        end
      end
      # 没数据返回空数组
      return rec
  end
  #获取需要的属性值并构造成json数组格式返回
  def self.create_cfo_json( cfo )
    cfo.collect! do |record|
      {
        :id => record.id,
        :factory_order_id => record.factory_order_id,
        :factory => record.factory,
        :payment => record.payment,
        :total_price => record.total_price,
        :production_date => record.production_date,
        :remark => record.remark
       }
    end
  end
end
