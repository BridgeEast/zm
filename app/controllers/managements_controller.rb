class ManagementsController < ApplicationController
 
  #*********************************************查看鞋库****************************************************


    def check_store_of_shoes
    end

    def get_check_store_of_shoes
      render :json => { :check_store_of_shoes => GeneralShoe.all }
    end
    
    def get_data
      choices = []

      choices = GeneralShoe.where("types_of_shoes like ? and production_date like ? ","%#{params[:selectType]}%" , "%#{params[:selectDate]}%" )
      
      respond_to do |format|
        format.json{ render :json => { :check_store_of_shoes => choices} }
      end
    end
    
    def get_details
       details = GeneralShoe.get_shoes_details( params[:id] )
       render :json => { :details => details } 
    end

 
  #*********************************************************************************************************


    def get_jing
      guest_size = []
      aa = [] 
      aa << Order.find(1) 
      guest_size << { :general_shoe_id => "jing", :size_38 => Order.find(1).id, :size_39 => 39, :size_40 => 40, :size_41 => 41, :size_42 => 42, :size_43 => 43, :size_44 => 44 }
      render :json => { :progress => guest_size }
    end


#    def get_jing
#      guest_size = []
#      SizeOfShoe.all.each do |s|
#        m = 1
#        for i in m..SizeOfShoe.count
#          if SizeOfShoe.find(i).general_shoe_id == s.general_shoe_id
#            case s.size
#            when 38
#              size38 = s.size
#            when 39
#              size39 = s.size
#            when 40
#              size40 = s.size
#            when 41
#              size41 = s.size
#            when 42
#              size42 = s.size
#            when 43
#              size43 = s.size
#            when 44
#              size44 = s.size
#            end
#          end
#          guest_size << { :size_38 => size38, :size_39 => size39, :size_40 => size40, :size_41 => size41, :size_42 => size42, :size_43 => size43, :size_44 => size44 }
#        end
#        m += 1
#      end
#      render :json => { :progress =>  guest_size }
#    end
    
#    def get_jing
#      render :json => { :progress => Order.find(:all, :conditions => "order_id = 'O2'")}
#    end

    def get_guest_progress
      render :json => { :progress => Order.all }
    end

#    def get_guest_progress
#      a = []
#      Order.all.each do |s|
#        a << { :id => s.id.to_s + "/" + s.order_id.to_s }
#      end
#      render :json => { :progress => a }
#    end

    #分页显示示例
    def get_daily_sheet
      daily_data = []
      SizeOfShoe.limit(params[:limit].to_i).offset(params[:start].to_i).each do |s|
        daily_data << { :id => s.id, :necessary_num => s.necessary_num, :finished_num => s.finished_num }
      end
      daily_sheet = { :totalProperty => SizeOfShoe.count, :gds => daily_data }
      render :json => daily_sheet
    end

    #guest     
    def check_guest_order
    end
  
    def check_virtual_warehouse
    end

    def get_contract
      render :json => { :virtual_warehouse => GeneralShoe.find_by_sql("select general_shoes.*, size_of_shoes.* from general_shoes, size_of_shoes where factory_order_id='#{params[:record][:contract]}' and general_shoes.production_date like '#{params[:record][:date]}%' and general_shoes.id = size_of_shoes.general_shoe_id") }
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
    #################### 点击查看下载订单 ############################
    def download_order
      @order = Orders.find_by_id( params[:id] )
     # if @order == nil
     #   :notice => "文件不存在"
     # else
        order_path = @order.order_url
     #   if File.exist?( order_path )
          order_file = File.open( order_path ) #打开文件
          bin_order = order_file.binmode       #转化为二进制
          order_file.send_data( bin_order,     #直接在浏览器打开 
                               :dispotion => "inline", 
                               :filename => @order.order_id )
          order_file.close
     #   else
     #     :notice => "文件无法打开"
     #   end
     # end
    end

end



