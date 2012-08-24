class ManagementsController < ApplicationController

   
    def check_store_of_shoes
    end

    def get_check_store_of_shoes
      respond_to do |format|
        debugger
        format.json{ render :json => { :check_store_of_shoes => GeneralShoe.all }}
      end
    end

   def get_data
      respond_to do |format|
        format.json{ render :json => { :check_store_of_shoes => GeneralShoe.find(:all , :conditions => "production_date.split("/")[1] = '08'  ") }}
         
    def check_guest_order
    end
  
    def check_virtual_warehouse
    end

    def get_check_guest_order
      render :json => { :check => GeneralShoe.find_by_sql("select id, photo_one, photo_two from general_shoes")}
    end

    def get_check_virtual_warehouse
      render :json => { :general_shoe => SizeOfShoe.find(:all, :conditions => ["created_at like ?", params[:date] + "%" ])}
#         render :json => { :general_shoe => GeneralShoe.find_by_sql("select general_shoes.*, size_of_shoes.* from general_shoes,size_of_shoes where general_shoes.id=size_of_shoes.id and size_of_shoes.created_at like '2012-0%'") }
    end
 
    def get_tree_node
      respond_to do |format|
        format.json{ render :json => { :tree_node => VirtualWarehouseNode.all } }
      end
    end

  def node
    nod = []
    Node.all.each do |s|
      nod << { :text => s.year ,
               :expand => true ,
               :leaf => true

             }
    end
    render :json => nod
  end

  def check_guest_order
  end

  def check_virtual_warehouse
  end

  def get_check_guest_order
    respond_to do |format|
      format.json{render :json => { :check_guest_order => CheckGuestOrder.all } }
    end
  end

  def get_check_virtual_warehouse
    respond_to do |format|
      format.json{render :json => { :check_virtual_warehouse => CheckVirtualWarehouse.all } }
    end
  end
    ##############################################################################################
    def check_factory_order
    end
    def check_advanced_order
    end
    def check_wish_order
    end
    ######################### 点击树节点获取工厂合同表格 #######################
    def get_cfo_grid
      @factory_orders = FactoryOrder.get_cfo_record( params[:id] )
      if @factory_orders == [] then
        # 如果没有找到对应的记录
        @cfo_grid = ""
      else
        @cfo_grid = FactoryOrder.create_cfo_json( @factory_orders )
      end
      #回应请求
      respond_to do |format|
        format.json{ render :json => { :cfo => @cfo_grid } }
      end
    end
    ######################## 点击树节点获取预购单对应表格 ########################
    def get_cao_grid
      @advanced_orders = AdvancedOrder.get_cao_record( params[:id] )
      if @advanced_orders == [] then
        @cao_grid = ""
      else
        @cao_grid = AdvancedOrder.create_cao_json( @advanced_orders )
      end
      respond_to do|format|
        format.json{ render :json => { :cao => @cao_grid } }
      end
    end
    ######################## 点击树节点获取心愿单对应表格 ########################
    def get_cwl_grid
      @wish_list = GeneralShoe.get_cwl_record( params[:id] )
      if @wish_list == [] then
        @cwl_grid = ""
      else
        @cwl_grid = GeneralShoe.create_cwl_json( @wish_list )
      end
      respond_to do |format|
        format.json{ render :json => { :cwl => @cwl_grid } }
      end
    end
    ############################ 点击右键查看鞋 #################################
    def get_general_shoes
      @general_shoes = FactoryOrder.find( param[:id] ).general_shoes
      respond_to do|format|
        format.json{ render :json => { :cs => @general_shoes } }
      end
    end
    ############################ 点击右键查看详情 ###############################
    def get_details_of_shoes
      @details_shoes = GeneralShoe.get_details_json( params[:id] )
      respond_to do|format|
        format.json{ render :json => { :dos => @details_shoes } }
      end
    end

end



