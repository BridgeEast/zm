class ManagementsController < ApplicationController
  #*********************************************查看鞋库****************************************************
    def csos_paging(array)
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
      all_data = { :totalProperty => array.length, :check_store_of_shoes => root }
      render :json => all_data
    end


    def check_store_of_shoes
    end

    def get_check_store_of_shoes
      render :json => { :check_store_of_shoes => GeneralShoe.all }
    end
    
    def get_data
      csos_paging(GeneralShoe.where("types_of_shoes like ? and production_date like ? ","%#{params[:selectType]}%" , "%#{params[:selectDate]}%").order("production_date DESC"))
    end
    
    def get_csos_check_details
      shoes_details = GeneralShoe.get_details_json( params[:id] )
      respond_to do|format|
        format.json{ render :json => { :csos_check_details => shoes_details } }
      end
    end


   
  #**********************************************查看订单***********************************************************

    def check_guest_order
    end

    def get_check_guest_order
      render :json => { :check_guest_order => Order.all}
    end

    def get_selected_data
      cgo_paging(Order.where("production_date like ? ", "%#{params[:selectDate]}%").order("production_date DESC"))
    end
 

   #^^^^^^^^^^^^^右键查看鞋^^^^^^^^^^^^^^
    def check_shoes
      order_shoes = GeneralShoe.get_shoes_json( Order.find(params[:id]).general_shoes )       
      render :json => { :check_shoes => order_shoes }  
    end

    #^^^^^^^^右键查看详情^^^^^^^^
    def get_cgo_check_details
      shoes_details = GeneralShoe.get_details_json( params[:id] )
      respond_to do|format|
        format.json{ render :json => { :cgo_check_details => shoes_details } }
      end
    end 

   #^^^^^^^^^^^右键查看订单进度^^^^^^^^^^^^
    def check_order_progress
      order_shoes = Order.find( params[:id] ).general_shoes
      size_num = GeneralShoe.get_size_and_num_json( order_shoes )
      respond_to do|format|
        format.json{ render :json => { :check_order_progress => size_num } }
      end
    end

    ##^^^^^^^^^^^^^  分页  ^^^^^^^^^^^^^^
    def cgo_paging(array)
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
      all_data = { :totalProperty => array.length, :check_guest_order => root }
      render :json => all_data
    end

##^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  日报表    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    def get_virtual_daily_sheet
      prodate = []
      shoe_name = []
      pro = params[:pro_date]
      InboundAndOutbound.all.each do |m|
        if m.inbound_and_outbound_date.to_s == "#{pro}"
          prodate << m.size_of_shoe_id
        end
      end
      SizeOfShoe.where( :id => prodate ).each do |n|
        shoe_name << n
      end
      paging(SizeOfShoe.sheet_shoe_size_num( shoe_name ))
    end

##^^^^^^^^^^^^^^^^^^^^^^^^^^^^^   月报表   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    def get_virtual_mouth_sheet
      shoe_name = []
      prodate = []
      proym = params[:pro_ym] 
      InboundAndOutbound.all.each do |m|
        a = []
        root_data = []
        a = m.inbound_and_outbound_date.to_s.split("-")
        pro = a[0].to_s + "-" + a[1].to_s
        if pro == "#{proym}"
          prodate << m.size_of_shoe_id
        end
      end
      SizeOfShoe.where( :id => prodate ).each do |n|
        shoe_name << n
      end
      paging(SizeOfShoe.sheet_shoe_size_num( shoe_name ))
    end

##^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  日发货单  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    def get_virtual_daily_dispatch
      prodate = []
      shoe_name = []
      pro = params[:pro_date]
      InboundAndOutbound.all.each do |m|
        if m.inbound_and_outbound_date.to_s == "#{pro}"
          prodate << m.size_of_shoe_id
        end
      end
      SizeOfShoe.where( :id => prodate ).each do |n|
        shoe_name << n
      end
      paging(SizeOfShoe.dispatch_shoe_size_num( shoe_name ))
    end

##^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  月发货单  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    def get_virtual_mouth_dispatch
      shoe_name = []
      prodate = []
      proym = params[:pro_ym] 
      InboundAndOutbound.all.each do |m|
        a = []
        a = m.inbound_and_outbound_date.to_s.split("-")
        pro = a[0].to_s + "-" + a[1].to_s
        if pro == "#{proym}"
          prodate << m.size_of_shoe_id
        end
      end
      SizeOfShoe.where( :id => prodate ).each do |n|
        shoe_name << n
      end
      paging(SizeOfShoe.dispatch_shoe_size_num( shoe_name ))
    end

    ##订单进度
    def get_order_progress

    end    

    ##guest查看详情
    def get_guest_details
      a = Order.where( :order_id => params[:id] ).first.id
      paging(GeneralShoe.find(:all, :conditions => "order_id = '#{a}'"))
    end

    ##vitrual主界面数据
    def get_contract
      contract = GeneralShoe.find_by_sql("select general_shoes.*, size_of_shoes.* from general_shoes, size_of_shoes where factory_order_id='#{params[:record][:contract]}' and general_shoes.production_date like '#{params[:record][:date]}%' and general_shoes.id = size_of_shoes.general_shoe_id")
      paging(contract)
    end
 
    ##virtual第一次加载数据，不显示
    def get_virtuals
      render :json => {}
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
        if tmp != nil then
          check_shoes << tmp
          i += 1
        else
          break
        end
      end
      general_shoes = GeneralShoe.get_shoes_json( check_shoes ) 
      general_shoes = { :totalProperty => check_shoes.count, :cs => general_shoes }
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
    ##################### 点击右键查看码号和数量的进度 ##########################
    def get_shoes_size_num
      shoes = FactoryOrder.where( :id => params[:id] ).first.general_shoes
      size_num = GeneralShoe.get_size_and_num_json( shoes )
      respond_to do|format|
        format.json{ render :json => { :csn => size_num } }
      end
    end
    #################### 点击查看订单 ############################
    def open_order
      @order = GeneralShoe.find_by_id( params[:id] ).order
    #  if @order == nil
    #    raise "无此订单"
    #  else
        @order_path = @order.get_order_url
    #    if File.exist?( order_path )
          order_file = File.open( @order_path ) #打开文件
          @order_data = order_file.read
          bin_order = order_file.binmode       #转化为二进制
          send_data( @order_data,     #直接在浏览器打开 
                     :disposition => "inline", 
                     :filename => @order.order_id ) 

          order_file.close
    #    else
    #      raise "文件无法打开"
    #    end
    #  end
   end
   ##################### 点击下载合同 ###############################3
   def download_factory_order
     @factory_order = GeneralShoe.find( params[:id] ).factory_order
     @factory_order_path = @factory_order.get_factory_order_url
     factory_order_file = File.open( @factory_order_path )
     bin_factory_order = factory_order_file.binmode
     send_data( @factory_order_data,
              :disposition => "attachment")
     factory_order_file.close
   end
end
