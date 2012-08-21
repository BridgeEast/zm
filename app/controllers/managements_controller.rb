class ManagementsController < ApplicationController

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

  def check_store_of_shoes
  end

  def check_guest_order
  end

  def check_virtual_warehouse
  end

  def get_check_store_of_shoes
    respond_to do |format|
      format.json{ render :json => { :check_store_of_shoes => CheckStoreOfShoes.all }}
    end
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


