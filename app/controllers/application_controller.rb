class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :authenticate_user!
  layout :render_by_login_session
  

  def render_by_login_session
    is_a?(Devise::SessionsController) ? "login" : "application"
  end

  def upload_order
    @order = Order.new( params[:order] )
    origin_path = params[:order][:order_url]                   # 取出传过来的订单的本地文件路径
    order_path = upload_file( origin_path, File::File_target ) # 将文件写入服务器并返回文件名及其后缀
    @order.set_order_url( order_path )                         # 设置路径在数据库
    if @order.save then
    #  :notice => "文件上传成功！"
    end
  end
  
  def upload_file( file, target_dir )
    if file.nil || file.original_filename.empty?
      #return "空文件或文件名错误！"
    else
      filename = file.original_filename                            # 文件名
      File.open( File.join( target_dir, filename ),'wb' ) do |f|   # 打开的文件并准备写入
        f.write( file.read )                                       # 向文件夹中写入文件
        return filename #返回文件名和其后缀
      end
    end
  end
end
