class ServicesController < ApplicationController
  #---------------------------------aji
  def excelProcessingAndPlayBoard
  end
  #---------------------------------- 得到数据－－－－－－－－
  def get_excel_shoes
    @tem1=[]
   
    case params[:nodekind]
    when 'y'
      @temexl = ExcelReceive.where("receiving_date like ?","#{params[:nodename]}%")
      #@temexl = ExcelReceive.find_by_sql("select * from excel_receives where year(receiving_date) = #{params[:nodename]}")# sucess
      @temexl.each do |temexl|
        @temaji = GeneralShoe.find_all_by_excel_receive_id(temexl.id)
        @tem1.concat(@temaji)
      end

    when 'm'
      puts "--------month-------------",params[:nodename]
      @temexl = ExcelReceive.where("receiving_date like ?","#{params[:nodename]}%")
      #@temexl = ExcelReceive.find_by_sql("select * from excel_receives where receiving_date like #{params[:nodename]}")# sucess
      @temexl.each do |temexl|
        @temaji = GeneralShoe.find_all_by_excel_receive_id(temexl.id)
        @tem1.concat(@temaji)
      end

    when 'excelid'
      puts "--------excelid-------------",params[:nodename]
       @tem1 = GeneralShoe.find_all_by_excel_receive_id(params[:nodename])
    end
    puts @tem1.size.to_s



=begin
    @tem1=[]
    if params[:yeardate].empty? == false 
      puts "xxxxxxxxxxxxxxxxxx",params[:yeardate].empty?

      @temexl = ExcelReceive.find_by_sql("select * from excel_receives where year(receiving_date) = #{params[:yeardate]}")# sucess
      @temexl.each do |temexl|
        @tem1 << GeneralShoe.find_by_excel_receive_id(temexl.id)
      end
    end

    if params[:excel_receive_id].empty? == false
      puts "xxxxxxxxxxsssssssssssss",params[:excel_receive_id].empty?
      @tem1 = GeneralShoe.find_all_by_excel_receive_id(params[:excel_receive_id])

    end
=end
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

  #------------------------------ 添加数据在general_shoes and details_of_shoes
  def create_in_generalanddetail
    GeneralShoe.create!(params[:record])
    render :json =>{}
  end
  #------------------------------ 修改数据在general_shoes and details_of_shoes
  def updata_in_generalanddetail
    GeneralShoe.find(params[:record][:id]).details_of_shoes.delete_all
     GeneralShoe.find(params[:record][:id]).update_attributes(params[:record])
    render :json => {}
  end
  #--------------------------- 点修改后弹出的显示，这里返回的是一串id！妈的个b
  def get_details_of_shoes_all_id
    details_shoes = GeneralShoe.get_details_ids_json( params[:id] )
      respond_to do|format|
        format.json{ render :json => { :dos => details_shoes } }
      end
  end
  #--------------------------- change the sure_board and done_board
  def updata_in_play_board
    @tem=PlayBoard.find_by_general_shoe_id(params[:record][:general_shoe_id])
    @tem.update_attributes(:sure_board => params[:record][:sure_board])
    @tem.update_attributes(:done_board => params[:record][:done_board])
    render :json => {}
 

  end
  #-------------------------- get the EpapbTree's treenode json-- 请不要改我的，因为我都已经看不懂我的代码了。。
  def get_tree_node
    treenodes=[]
    yearnode=[]
    #excelnode=[]
    yearnode.push('2011')
    aji=false
    #get all of table
    ExcelReceive.all.each do |tem|
      yearnode << tem.receiving_date.year
      yearnode=yearnode.uniq
      
     #for month in monthnode
      #  if tem.receiving_date.month != month then  
       #   yearnode << { :text => tem.receiving_date., :leaf=>true}
        #end
     end
    for year in yearnode do
      monthnode=Array.new(13){ Array.new()} # 真正的标准的二维定义！！
      ExcelReceive.all.each do |tem|
        if tem.receiving_date.year == year then
          aji = true
          monthnode[tem.receiving_date.month] << { :text => tem.excel_receive_id, :id=> tem.id, :leaf => true }
        end
      end
      excelnode=[]
      monTime=12
        #----------
      if year==Time.new.year then monTime=Time.new.month end
          
        for i in 1..monTime do
          if (monthnode[i].empty?) then
             excelnode << { :text => i.to_s+'mon', :id => i.to_s+'m', :leaf => true  }
          else
             excelnode << { :text => i.to_s+'mon', :id => i.to_s+'m', :children => monthnode[i] }
          end
        end
        #----------
        if aji then
          treenodes << { :text => year.to_s+'y', :id => year.to_s+'y', :children => excelnode }
        else
          treenodes << { :text => year.to_s+'y', :id => year.to_s+'y', :leaf => true }
        end
    end
      #if monthnode.include?(tem.receiving_date.month) then
       # { :text => tem.receiving_date.month, :children => [] }
      #else
      #tem.excel_receive_id
    render :json=> treenodes
  end
  #----------------------------load the picture ----
  def upload_photo
    @photo = GeneralShoe.new( params[:dd])
    origin_path = params[:dd][:photo_one]
    photo_one = upload_pic( origin_path, )
    @photo.set_photo_url(photo_one)   #go controller,write the set_photo_url,

    @photo.save #save it in db
  end
  
  def upload_pic(origin_path,target_dir)
    photo_name = origin_path.original_filename
    File.open(File.join( target_dir, photo_name),'wb') do |f|
      f.write( file.read)
      return photo_name
    end
  


    render :json=>yearnode
end
 def factory_order
    end

    def get_factory_order
      #respond_to do |format|
      #format.json{ render :json => { :factory_order => FactoryOrder.all } }
     # end
      factory_orders = FactoryOrder.get_cfo_record( params[:id] )
      if factory_orders == [] then
        # 如果没有找到对应的记录
        cfo_grid = ""
      else
        cfo_grid = FactoryOrder.create_cfo_json( factory_orders )
      end
      #回应请求
      respond_to do |format|
        format.json{ render :json => { :factory_order => cfo_grid } }
      end
    end

    #def get_check_shoes
  
     # respond_to do |format|
    #format.json{ render :json => { :check_shoes => GeneralShoe.all  } }
     # end
      #end
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
      general_shoes = { :totalProperty => 100, :cs => general_shoes }
      respond_to do|format|
        format.json{ render :json => general_shoes }
      end
      end

 def mps
    FactoryOrder.find(params[:record][:id]).update_attributes(:payment => params[:record][:payment])
    render :json => {  }
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
