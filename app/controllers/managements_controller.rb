class ManagementsController < ApplicationController
<<<<<<< HEAD

   
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
=======
         
    def check_guest_order
    end
  
    def check_virtual_warehouse
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

    def get_check_virtual_warehouse
      render :json => { :general_shoe => SizeOfShoe.find(:all, :conditions => ["created_at like ?", params[:date] + "%" ])}
#         render :json => { :general_shoe => GeneralShoe.find_by_sql("select general_shoes.*, size_of_shoes.* from general_shoes,size_of_shoes where general_shoes.id=size_of_shoes.id and size_of_shoes.created_at like '2012-0%'") }
    end
 
    def get_tree_node
      respond_to do |format|
        format.json{ render :json => { :tree_node => VirtualWarehouseNode.all } }
>>>>>>> 请执行bundle update --local
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
end


