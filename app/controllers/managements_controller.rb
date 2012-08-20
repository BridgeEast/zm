class ManagementsController < ApplicationController
     def guest_order_node
         nodes = []
         GuestOrderNode.node_or_parent.each do |s|
            nodes << { :text => s.nodetext, :expanded => true, :children => s.order_tree}
         end
                                                            #:children => [ {:text => s.id, :leaf => true } ]
          render :json => nodes
     end

     def virtual_warehouse_node 
         nodes = []
         VirtualWarehouseNode.node_or_parent.each do |x|
            nodes << { :text => x.nodetext, :children => x.virtual_warehouse_tree }
         end
          render :json => nodes
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


