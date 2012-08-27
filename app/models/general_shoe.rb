class GeneralShoe < ActiveRecord::Base
  has_many :size_of_shoes, :dependent => :destroy
  has_many :details_of_shoes,:dependent => :destroy
  has_one :play_board,:dependent => :destroy

  belongs_to :advanced_order
  belongs_to :order
  belongs_to :excel_receive
  belongs_to :factory_order
  ########### 获取心愿单所需记录 ##########
  def self.get_cwl_record( param_node )
    rec = Array.new
    self.all.each do |record|
      date = record.production_date
      cwl_date = date.to_s.split("-") 
      # 建立"XXXX-X-开发板"格式的id来与param进行比较
        cwl_node_id = cwl_date[0] + "-" + cwl_date[1].to_i.to_s + "-" + record.play_board.board_kind
        case param_node
        when cwl_date[0]
          rec << record
        when cwl_date[0] + '-' + cwl_date[1].to_i.to_s
          rec << record
        when cwl_node_id
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
         :shoes_id => item.shoes_id,
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
  ############### 查看鞋的所需记录的json #################
  def self.get_shoes_json( check_shoes )
    check_shoes.collect! do |item|
      { 
        :id => item.id,
        :shoes_id => item.shoes_id,
        :types_of_shoes => item.types_of_shoes,
        :suitable_people => item.suitable_people,
        :colors => item.colors,
        :price => item.price,
        :remark => item.remark,
        :photo_one => item.photo_one,
        :photo_two => item.photo_two
      }
    end
  end
  ################### 查看详情 ######################
  def self.get_details_json( the_shoe_id ) 
    shoes = self.where( :id => the_shoe_id ).first #取出id为the_shoe_id的鞋的对象
    shoes.details_of_shoes.collect! do |record|
      #对同一只多个详情进行筛选组成json
      { 
        :region => record.region.region,
        :material => record.material.material,
        :color => record.color.color,
        :procession => record.procession.procession,
        :remark => record.region.remark,
      }
    end
  end
  #################### 查看鞋号和码号 ############################
  def self.get_size_and_num_json( shoes )
      shoes.collect! do|shoe|
        { 
          :id => shoe.id,
          :shoes_id => shoe.shoes_id,
          :size_36 => GeneralShoe.get_size_obj( shoe, 36 ),
          :size_37 => GeneralShoe.get_size_obj( shoe, 37 ),
          :size_38 => GeneralShoe.get_size_obj( shoe, 38 ),
          :size_39 => GeneralShoe.get_size_obj( shoe, 39 ),
          :size_40 => GeneralShoe.get_size_obj( shoe, 40 ),
          :size_41 => GeneralShoe.get_size_obj( shoe, 41 ),
          :size_42 => GeneralShoe.get_size_obj( shoe, 42 ),
          :size_43 => GeneralShoe.get_size_obj( shoe, 43 ),
          :size_44 => GeneralShoe.get_size_obj( shoe, 44 ),
        }
      end
  end
  ###################### 获取鞋码为size的size_of_shoes的记录 ######################
  def self.get_size_obj( shoe, size )
    size_shoe = shoe.size_of_shoes.where( :size => size )
    if size_shoe != []
      if size_shoe.first.necessary_num != nil 
        nec = size_shoe.first.necessary_num.to_s
      else
        nec = "0"
      end
      if size_shoe.first.finished_num != nil
        fin = size_shoe.first.finished_num.to_s
      else
        fin = "0"
      end
    else
      fin = "0"
      nec = "0"
    end
    return fin + "/" + nec
  end
end


