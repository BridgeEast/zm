class ManagementsController < ApplicationController
    def node
        parent = params[:parent] || 0
        @nodes = Node.find(:all, :conditions => "nodeparent=#{parent}")
        render :json => @nodes.to_json
    end

 #   def get_node
 #     respond_to do |format|
 #       format.json{render :json => { :node => Node.all } }
 #     end
 #   end
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


