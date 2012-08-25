class GeneralShoe < ActiveRecord::Base
  has_many :size_of_shoes, :dependent => :destroy
  has_many :details_of_shoes,:dependent => :destroy
  has_one :play_board,:dependent => :destroy

  belongs_to :advanced_order
  belongs_to :order
  belongs_to :excel_receive
  belongs_to :factory_order
  ########### 获取心愿单所需记录 ##########
  def self.get_cwl_record( param )
    rec = Array.new
    self.all.each do |record|
      date = record.production_date
      cwl_date = date.to_s.split("-") 
      # 建立"XXXX-X-开发板"格式的id来与param进行比较
      cwl_node_id = cwl_date[0] + "-" + cwl_date[1].to_i.to_s + "-" + record.play_board.board_kind 
      if cwl_node_id == param then
        rec << record
      end
    end
    return rec
  end
  ########## 创建心愿单所需记录的json ##############
  def self.create_cwl_json( cwl )
    cwl.collect! do|item|
      { 
         :id => item.id,
         :photo_one => item.photo_one,
         :photo_two => item.photo_two,
         :custom_num => item.play_board.custom_num,
         :shoe_id => item.shoe_id,
         :types_of_shoes => item.types_of_shoes,
         :suitable_people => item.suitable_people,
         :colors => item.colors,
         :price => item.price,
         :sure_board => item.play_board.sure_board,
         :done_board => item.play_board.done_board,
         :communication => item.play_board.communication,
         :remark => item.remark
      }
    end
  end

end



