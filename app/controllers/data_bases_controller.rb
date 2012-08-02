class DataBasesController < ApplicationController

  #scope: data_bases/region/region.js
  #scope: data_bases/material/material.js  
  def region
  end
  def material
  end
  def color
  end

  #scope: base_datas/region/region.js
  #scope: data_bases/material/material.js  
  def get_region
    respond_to do |format|
      format.json{ render :json => { :region => Region.all } }
    end
  end
  def get_material
    respond_to do |format|
      format.json{ render :json => { :material => Material.all } }
    end
  end 
  def get_color
    respond_to do |format|
      format.json{ render :json => { :color => Color.all } }
      end
  end

  #scope: data_bases/region/region.js
  #scope: data_bases/material/material.js
  def create_region
    Region.create!(params[:record])
    render :json => {}
  end
  def create_material
    Material.create!(params[:record])
    render :json => {}
  end 
  def create_color
    Color.create!(params[:record])
    render :json => {}
  end

  #scope: data_bases/region/region.js
  #scope: data_bases/material/material.js
  def delete_region
    Region.find(params[:id]).destroy
      render :json => {}
  end
  def delete_material
    Material.find(params[:id]).destroy
      render :json => {}
  end  
  def delete_color
    Color.find(params[:id]).destroy
       render :json => {}
  end

  #scope: data_bases/region/region.js
  #scope: data_bases/material/material.js
  def update_region
    Region.find(params[:record][:id]).update_attributes(params[:record])
    render :json => {}
  end
  def update_material
    Material.find(params[:record][:id]).update_attributes(params[:record])
    render :json => {}
  end  
  def update_color
    Color.find(params[:record][:id]).update_attributes(params[:recors])
    render :json => {}
  end

end
