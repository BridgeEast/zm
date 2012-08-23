class DataBasesController < ApplicationController

  #scope: data_bases/region/region.js
  #scope: data_bases/material/material.js  
  def region
  end
  def material
  end
  def color
  end
  def procession
  end

  #scope: base_datas/region/region.js
  #scope: data_bases/material/material.js  
  def get_region
    @regions = Region.all
    @region_grid = @regions.collect! do|a|
      { 
        :id => a.id,
        :name => a.region,
        :remark => a.remark
      }
    end
    respond_to do |format|
      format.json{ render :json => { :region => @region_grid } }
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
  def get_procession
    respond_to do |format|
      format.json{ render :json => { :procession => Procession.all } }
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
  def create_procession
    Procession.create!(params[:record])
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
  def delete_procession
    Procession.find(params[:id]).destroy
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
    Color.find(params[:record][:id]).update_attributes(params[:record])
    render :json => {}
  end
  def update_procession
    Procession.find(params[:record][:id]).update_attributes(params[:record])
    render :json => {}
  end

end
