class ManagementsController < ApplicationController
         
    def check_guest_order
    end
  
    def check_virtual_warehouse
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
end


