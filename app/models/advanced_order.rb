class AdvancedOrder < ActiveRecord::Base
  has_many :general_shoes
  ############# 获取预购单所需的记录 ###############
  def self.get_cao_record( param )
    rec = Array.new
    self.all.each do |record|
      cao_state = record.state           #待定预购单 或 进行中预购单
      date = record.advanced_order_date  #预购单日期
      cao_date = date.to_s.split("-")
      caoNodeId = cao_date[0] + '-' + cao_date[1].to_i.to_s + '-' + cao_state # 构建成节点的Id形式
      # 存入所需的记录 
      if caoNodeId == param then
        rec << record
      end
    end
    return rec
  end
  ############## 创建预购单所需数据的json ###############
  def self.create_cao_json( cao )
    p cao
    cao.collect! do |item|
      { 
         :id => item.id,
         :advanced_order_id => item.advanced_order_id,
         :total_price => item.total_price,
         :advanced_order_date => item.advanced_order_date,
         :remark => item.remark,
         :custom_num => item.custom_num
       }
    end
  end

end
