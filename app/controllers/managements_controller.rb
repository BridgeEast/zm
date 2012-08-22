class ManagementsController < ApplicationController
     def virtual_warehouse_node 
         nodes = []
         VirtualWarehouseNode.node_or_parent.each do |x|
            nodes << { :text => x.nodetext, :expanded => true, :children => x.virtual_warehouse_tree }
         end
          render :json => nodes
     end
         
    def check_guest_order
    end
  
    def check_virtual_warehouse
    end

    def guest_order_node
    end
  
    def get_check_guest_order
        respond_to do |format|
        format.json{render :json => { :guest_order_node => GuestOrderNode.all } }
      end
    end
  
    def get_check_virtual_warehouse
      respond_to do |format|
        format.json{render :json => { :virtual_warehouse_node => VirtualWarehouseNode.all } }
      end
    end
end


