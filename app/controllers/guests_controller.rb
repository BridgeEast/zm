#encoding: utf-8
class GuestsController < ApplicationController

  #*******************************心愿单********************************
  # url的解析，controller + action ,这里可以删，但route.rb哪里不能删 
  def wish_list
  end

  def wish_list_data
    wish_list = GeneralShoe.get_cwl_record( params[:id] )
    data = wish_list.blank? ? "" : GeneralShoe.wish_list_data( wish_list )
    render :json => { :wish_list_data => data }  #可以把render封装起来
  end

  def destroy_choice
    #debugger
    GeneralShoe.destroy(params[:id])
    render :json => {}
  end

  def add_to_determined_board
    GeneralShoe.find(params[:id]).each do |record|
      record.play_board.update_attributes(:board_kind => "确认板")
    end
    render :json => {}
  end

  def add_to_order
    Order.create!(params[:record])
    render :json => {}
  end

  #*********************************************************************


  ################################浏览鞋库##############################   

  def order_management
  end

  def scanning_store_of_shoes
  end

  def get_general_shoes
  #  choses =[]
   # GeneralShoe.all.each do |check|
  #    if(check.play_board.board_kind =="确认板")
   #     choses<<check
  #    end
  #  end
    respond_to do |format|
      format.json{ render :json=>{ :general_shoes => GeneralShoe.all }}
    end
  end

  def change_board_kind


    # PlayBoard.find(params[:choses_id]).board_kind.update_attributes("开发板")
    # render:json =>{}
    PlayBoard.all.each do |choses_ids|
      get_shoes = params[:choses_id].delete("S")
      if( choses_ids.general_shoe_id == get_shoes.to_i)
        choses_ids.supdate_attributes(:board_kind => "开发板")
      end
    end

    respond_to do |format|
      format.json{  render :json =>{}}
    end

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
       if(item.production_date.to_s.split("-")[1].gsub(/\b(0+)/,"")==params[:selectMonth].to_s and item.production_date.to_s.split("-")[0]==params[:selectYear] and item.types_of_shoes ==params[:selectType] )
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
=begin
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
=end

  ########################################################################
  #####################订单管理###########################################

  def order_management
  end
  def get_undetermined_orders_data
    results = []
    results = Order.where("production_date like ? and state like ? ", "%#{params[:selectDate]}%", "%#{'待定订单'}%")
    paging(results)
  end
  def get_proceeding_orders_data
    results = []
    results = Order.where("production_date like ? and state like ? ", "%#{params[:selectDate]}%", "%#{'进行中订单'}%")
    paging(results)
  end
  def get_check_shoes
    paging(Order.find(params[:id]).first.general_shoe)
  end

  def paging(array)
    m = params[:limit].to_i
    n = params[:start].to_i
    root = []
    max = m + n
    if max > array.length
      max = array.length
    end
    for i in n..max - 1
      root << array[i]
    end
    all_data = { :totalProperty => array.length, :roots => root }
    render :json => all_data
  end

  def guest_order
    render :json => {}
  end
  def get_guest_details
    a = Order.where( :order_id => params[:idd] ).first.id
    paging(GeneralShoe.find(:all, :conditions => "order_id = '#{a}'"))
  end

  def get_order_progress
    shoes = Order.where( :order_id => params[:orderid] ).first.general_shoes
    paging(GeneralShoe.get_progress_num_and_size( shoes ))
  end    
  def get_shoes_size_num
    shoes = Order.where( :order_id => params[:order_id] ).first.general_shoes
    size_num = GeneralShoe.get_size_and_num_json( shoes )
    paging(size_num)
  end
  def get_details_of_shoes
    details_shoes = GeneralShoe.get_order_details_json( params[:shoes_id] )
    respond_to do|format|
      format.json{ render :json => { :dos => details_shoes } }
    end
  end
  def send_to_order
    Order.all.each do |item|
      if(item.order_id == params[:order_id])
      item.update_attributes(:state => '进行中订单')
      end
    end
    render :json =>{}
  end
  def delete_undetermined_order
    Order.where(:order_id => params[:order_id]).delete_all
    render :json => {}
  end
end
