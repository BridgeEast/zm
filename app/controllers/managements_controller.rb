class ManagementsController < ApplicationController

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


