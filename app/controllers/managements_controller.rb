class ManagementsController < ApplicationController

  def client_order_enquiry
  end

  def virtual_warehouse_enquiry
  end

  def get_client_order_enquiry
    respond_to do |format|
      format.json{render :json => { :client_order_enquiry => ClientOrderEnquiry.all } }
    end
  end

  def get_virtual_warehouse_enquiry
    respond_to do |format|
      format.json{render :json => { :virtual_warehouse_enquiry => VirtualWarehouseEnquiry.all } }
    end
  end
end


