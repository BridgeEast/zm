class ServicesController < ApplicationController
  #---------------------------------aji
  def excelProcessingAndPlayBoard
  end
  #---------------------------------- 得到数据－－－－－－－－
  def get_excel_shoes
    @tem1 = GeneralShoe.all
    @tem2 = PlayBoard.all
    tem3=[]
    @tem1.each do |tem1|
      @tem2.each do |tem2|
        if tem1.id == tem2.general_shoe_id
          tem4 = {:id => tem1.id, :photo_one => tem1.photo_one, :photo_two => tem1.photo_two, :shoes_id => tem1.shoes_id, :types_of_shoes => tem1.types_of_shoes, :suitable_people => tem1.suitable_people, :colors => tem1.colors, :price => tem1.price, :sure_board => tem2.sure_board, :done_board => tem2.done_board, :remark => tem1.remark  }
        tem3 << tem4
        end
      end
    end
    respond_to do |format|
        format.json{ render :json => { :excel_shoes => tem3 } }
    end
  end
  #----------------------------------- 删除数据----------------
  def delete_shoes_and_detail_of_shoes
    GeneralShoe.find(params[:id]).destroy
    render :json => {}
  end
  #-----------------------------右键查看详情----------------
  def get_details_of_shoes
    details_shoes = GeneralShoe.get_details_json( params[:id] )
    respond_to do|format|
      format.json{ render :json => { :dos => details_shoes } }
    end
  end














  def scanningGuestWishList
  end





  #----------------------------------aji

########################################################查看订单############################################################
  def guest_order_management
  end
   

  def get_orders
    respond_to do |format|
      format.json{ render :json => { :orders => Order.all } }
     end
   end

  def get_order_data
     orderselects =[]
     Order.all.each do |orderitem|
       if(orderitem.production_date.to_s.split("-")[1].gsub(/\b(0+)/,"")==params[:selectordermonth].to_s and orderitem.production_date.to_s.split("-")[0]==params[:selectorderyear])
        orderselects << orderitem
       end
     end
     respond_to do |format|
       format.json{  render :json =>{ :orders =>orderselects }}
     end
  end

  def get_order_shoes_detail
      check_shoes=[]
     GeneralShoe.all.each do |aa|
       act = params[:id].delete("O")
      if(aa.order_id== act.to_i)
        check_shoes << aa
      end
    end
  #   details_shoes = GeneralShoe.get_shoes_json( check_shoes)
      respond_to do |format|
        format.json{ render :json =>{ :order_shoes_detail =>   check_shoes   } }
      end
  end

   def get_order_shoes_detail_second
      details_shoes = GeneralShoe.get_details_json( params[:id] )
      respond_to do|format|
        format.json{ render :json => { :order_shoes_detail_second => details_shoes } }
      end
   end

   def get_speed_of_progress
      shoes = Order.where( :id => params[:id].delete("O") ).first.general_shoes
     size_num = GeneralShoe.get_size_and_num_json( shoes )
      respond_to do|format|
        format.json{ render :json => { :speed_of_progress => size_num } }
      end
   end

    def update_pay_condition
    Order.all.each do |selects|
     if( selects.order_id == params[:id])
         selects.update_attributes(:payment => params[:value])
     end
  end
    respond_to do |format|
       format.json{  render :json =>{}}
     end
    end

    def update_quality
      Order.all.each do |qualityselects|
        if(qualityselects.order_id == params[:id])
         # p paramas[:qualityvalue]
          qualityselects.update_attributes(:quality => params[:value])
        end
      end
      respond_to do |format|
        format.json{ render :json =>{} }
      end
    end

    def update_shipment
      Order.all.each do |shipselects|
        if(shipselects.order_id == params[:id])
          shipselects.update_attributes(:shipment => params[:value])
        end
      end
      respond_to do |format|
        format.json{ render :json =>{} }
      end
    end
#########################################################################################################################################################
  def upload_order
    @order = Order.new( params[:order] )
    origin_path = params[:order][:order_url]                   # 取出传过来的订单的本地文件路径
    order_path = upload_file( origin_path, File::File_target ) # 将文件写入服务器并返回文件名及其后缀
    @order.set_order_url( order_path )                         # 设置路径在数据库
    @order.save
  end
  
  def upload_file( file, target_dir )
      filename = file.original_filename                            # 文件名
      File.open( File.join( target_dir, filename ),'wb' ) do |f|   # 打开的文件并准备写入
        f.write( file.read )                                       # 向文件夹中写入文件
        return filename #返回文件名和其后缀
    end
  end
end
