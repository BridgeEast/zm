#encoding: utf-8
class GuestsController < ApplicationController
  ################################浏览鞋库##############################   
  def scanning_store_of_shoes
  end

  def get_general_shoes
    choses =[]
    GeneralShoe.all.each do |check|
      if(check.play_board.board_kind =="确认板")
        choses<<check
      end
    end
    respond_to do |format|
      format.json{ render :json=>{ :general_shoes =>choses }}
    end
  end

  def change_board_kind
       select_id = nil
       GeneralShoe.all.each do |j|
         if(j.shoes_id==params[:record])
           select_id << j
         end
       end
       PlayBoard.all.each do |choses_id|
       if( choses_id.general_shoe_id == select_id)
          choses_id.board_kind.update_attributes("开发板")
       end
       end
    respond_to do |format|
       format.json{  render :json =>{}}
  end
  end
   
  def get_data
     selects =[]
     GeneralShoe.all.each do |item|
       
       if(item.production_date.to_s.split("-")[1].gsub(/\b(0+)/,"")==params[:selectMonth].to_s and item.production_date.to_s.split("-")[0]==params[:selectYear] and item.types_of_shoes ==params[:selectType] and item.play_board.board_kind=="确认板")
       selects << item
       end
     end
     respond_to do |format|
       format.json{  render :json =>{ :general_shoes =>selects }}
     end
   end
   
   
    def get_scanning_detail
      details_shoes = GeneralShoe.get_details_json( params[:id] )
      respond_to do|format|
        format.json{ render :json => { :scanning_detail => details_shoes } }
      end
    end

  def load_tree
    nodes=[]
    treenodes=[]
    i = 0
    #获取表里的所有数据
        GeneralShoe.all.each do |a|
          #插入个循环，循环月份节点
          second_node = []
          a.month.each do |g|
            #再插入个循环，循环鞋节点
            leaf_node=[]
            a.style.each do |y|
            leaf_node<<{ :text=>y,:leaf=>true }
            end
            #结束鞋型节点 
          second_node << { :text=>g,:children=> leaf_node }
        end
          #结束月份节点
          nodes<<{ :text=>a.year[i],:children=> second_node}
          i+=1
        end

        #对数据中text为空的数据进行去除
        num=nodes.count-1
        while num>=0
          if (nodes[num][:text]!= nil)
              treenodes << nodes[num]
          end
          num -= 1
        end
        render :json=>treenodes
   end
end
########################################################################
#####################订单管理###########################################

