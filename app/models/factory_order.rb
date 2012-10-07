class FactoryOrder < ActiveRecord::Base
  has_many :general_shoes,:dependent => :destroy
  ###### 判断日期，选取适合的记录返回 #####
  def self.get_cfo_record( param )
    rec = Array.new
      self.all.each do|record|
        date = record.production_date.to_s.split("-")
        date[1] = date[1].to_i.to_s           #将01-09转化为1-9
        #如果点击的是年的，就显示符合年的记录
        if date[0] == param 
          rec << record
          end
        #else
        #与所创建的年月匹配, 则记录输入rec
          yearMonth = date[0] + "-" + date[1]
          if yearMonth == param
            rec << record
          end
        #end
        ymnode = date[0]+'-'+date[1]+'-'+ record.factory_order_id
         if  ymnode == param
              rec << record
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

 def self.cj(yy)
     yy.general_shoes.collect! do |record|
 { 
    :id => record.id,
    :photo_one => record.photo_one,
    :photo_two => record.photo_two,
    :shoes_id => record.shoes_id,
    :types_of_shos => record.types_of_shoes,
    :suitable_people => record.suitable_people,
    :colors => record.colors,
    :production_date => record.production_date
    
 }
  end
end

end
