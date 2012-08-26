class ManagementsController < ApplicationController
 
  #*********************************************查看鞋库****************************************************


    def check_store_of_shoes
    end

    def get_check_store_of_shoes
      respond_to do |format|
        format.json{ render :json => { :check_store_of_shoes => GeneralShoe.all }}
      end
    end
    
    def get_data
      choices = []
      
      GeneralShoe.all.each do |item|
        if( item.production_date.to_s.split("-")[1].gsub(/\b(0+)/,"") == params[:selectMonth] and item.production_date.to_s.split("-")[0] == params[:selectYear].to_s and item.types_of_shoes == params[:selectType])
          choices << item
        end
      end
     
      respond_to do |format|
        format.json{ render :json => { :check_store_of_shoes => choices} }
      end
    end
    
    def get_details
      details = []

<<<<<<< HEAD
      DetailsOfShoe.all.each do |item|
        if (item.general_shoe_id == params[:select_id])
          details << item
        end
      end

    respond_to do |format|
        format.json{ render :json => { :details => details } }
      end
     # respond_to do |format|
        #format.json{ render :json => { :details => DetailsOfShoe.all} }
      #end

    end



  #*********************************************************************************************************



=======
   #   respond_to do |format|
        #format.json{ render :json => { :details =>  GeneralShoe.details_of_shoes.find(:all , :conditions => "params[:select_id] = details_of_shoes.general_shoe_id") } }
      #end
  respond_to do |format|
        format.json{ render :json => { :check_store_of_shoes => GeneralShoe.find(:all , :conditions => "production_date.split("/")[1] = '08'  ") }}
      end
   end
         
>>>>>>> d156b655aa365dfe655ffa72aa9d46ac342af526
    def check_guest_order
    end
  
    def check_virtual_warehouse
    end

    def get_contract
      render :json => { :virtual_warehouse => GeneralShoe.find_by_sql("select general_shoes.*, size_of_shoes.* from general_shoes, size_of_shoes where factory_order_id='#{params[:record][:contract]}' and general_shoes.production_date like '#{params[:record][:date]}%' and general_shoes.id = size_of_shoes.general_shoe_id") }
      end

    end
    def get_check_virtual_warehouse
        render :json => { :general_shoe => SizeOfShoe.find(:all, :conditions => ["created_at like ?", params[:date] + "%" ])}
    end
 #   def get_check_guest_order
 #     grids = []
 #     GeneralShoe.all.each do |s|
 #       grids << { :id => s.id, :photo_one => s.photo_one, :photo_two => s.photo_two }
 #     end
 #     render :json => grids
 #   end

    def get_check_guest_order
      render :json => { :check => GeneralShoe.find_by_sql("select id, photo_one, photo_two from general_shoes")}
    end

    def get_check_virtual_warehouse_node
      render :json => { :virtual_warehouse => GeneralShoe.all }
    end
 
    def get_tree_node
      respond_to do |format|
        format.json{ render :json => { :tree_node => FactoryOrder.all } }
      end
    end

    def get_check_virtual_warehouse
      render :json => { :virtual_warehouse => GeneralShoe.find_by_sql("select general_shoes.*, size_of_shoes.* from general_shoes, size_of_shoes where general_shoes.id = size_of_shoes.general_shoe.id ")}
    end

###############  这部分是我的，别碰我的东西   ##################################################################

    ##############################################################################################
    def check_factory_order
    end
    def check_advanced_order
    end
    def check_wish_order
    end
    ######################### 点击树节点获取工厂合同表格 #######################
    def get_cfo_grid
      factory_orders = FactoryOrder.get_cfo_record( params[:id] )
      if factory_orders == [] then
        # 如果没有找到对应的记录
        cfo_grid = ""
      else
        cfo_grid = FactoryOrder.create_cfo_json( factory_orders )
      end
      #回应请求
      respond_to do |format|
        format.json{ render :json => { :cfo => cfo_grid } }
      end
    end
    ######################## 点击树节点获取预购单对应表格 ########################
    def get_cao_grid
      advanced_orders = AdvancedOrder.get_cao_record( params[:id] )
      if advanced_orders == [] then
        cao_grid = ""
      else
        cao_grid = AdvancedOrder.create_cao_json( advanced_orders )
      end
      respond_to do|format|
        format.json{ render :json => { :cao => cao_grid } }
      end
    end
    ######################## 点击树节点获取心愿单对应表格 ########################
    def get_cwl_grid
      wish_list = GeneralShoe.get_cwl_record( params[:id] )
      if wish_list == [] then
        cwl_grid = ""
      else
        cwl_grid = GeneralShoe.create_cwl_json( wish_list )
      end
      respond_to do |format|
        format.json{ render :json => { :cwl => cwl_grid } }
      end
    end
    ############################ 点击右键查看鞋 #################################
    def get_check_shoes
      index = params[:start]
      pageSize = params[:limit]
      i = index.to_i
      check_shoes = Array.new
      count = pageSize.to_i + index.to_i
      # 按照第几页显示10条数据
      for i in index.to_i...count
        tmp = FactoryOrder.find( params[:id] ).general_shoes[ i ]
        p tmp
        if tmp != nil then
          check_shoes << tmp
          i += 1
        else
          break
        end
      end
      general_shoes = GeneralShoe.get_shoes_json( check_shoes ) 
      general_shoes = { :totalProperty => 100, :cs => general_shoes }
      respond_to do|format|
        format.json{ render :json => general_shoes }
      end
    end
    ############################ 点击右键查看详情 ###############################
    def get_details_of_shoes
      details_shoes = GeneralShoe.get_details_json( params[:id] )
      respond_to do|format|
        format.json{ render :json => { :dos => details_shoes } }
      end
    end
    ############################ 点击右键查看合同 ###############################
    def get_check_factory_order
      factory_order = GeneralShoe.where( :id => params[:id] )#此处应该再取出合同的url，便于在form中显示
      respond_to do |format|
        format.json{ render :json => { :fo => factory_order } }
      end
    end
    ########################## 点击右键查看订单 ##############################
    def get_check_orders
      orders = GeneralShoe.where( :id => params[:id] ) #此处应该再取出订单存放的url，便于在form中显示
      respond_to do|format|
        format.json{ render :json => { :co => orders } }
      end
    end

end



