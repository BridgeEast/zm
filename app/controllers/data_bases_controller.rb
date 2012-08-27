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
  def store_of_shoes
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
  def get_procession
    respond_to do |format|
      format.json{ render :json => { :procession => Procession.all } }
    end
  end  
  def get_general_shoes
    respond_to do |format|
      format.json{ render :json => { :general_shoes => GeneralShoe.all } }
    end
  end
  def get_details
       render :json => { :details => DetailsOfShoe.where(:general_shoe_id => params[:id]) }

    end
  def get_details_of_shoes
      details_shoes = GeneralShoe.get_details_json( params[:id] )
      respond_to do|format|
        format.json{ render :json => { :dos => details_shoes } }
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
  def create_shoes
    GeneralShoe.create!(params[:record])
    render :json => {}
  end

  def create_shoes_and_details_of_shoes
    @records = params[:record] 
    GeneralShoe.create!({ 
      :shoes_id => @records[:shoes_id],
      :suitable_people => @records[:suitable_people],
      :colors => @records[:colors],
      :types_of_shoes => @records[:types_of_shoes],
      :price => @records[:price],
      :remark => @records[:remark],
      :production_date => @records[:production_date],

      :details_of_shoes_attributes =>[{ 
      :region_id => @records[:region_id],
      :material_id => @records[:material_id],
      :color_id => @records[:color_id],
      :procession_id => @records[:procession_id]
    }]
    })
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
  def delete_shoes
    GeneralShoe.find(params[:id]).destroy
    render :json => {}
  end
  def delete_shoes_and_detail_of_shoes
    GeneralShoe.find(params[:id]).destroy
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
  def update_shoes
    @records = params[:record]
    GeneralShoe.find(params[:record][:id]).update_attributes(params[:record])
    GeneralShoe.find(params[:record][:id]).details_of_shoes.all.update_attributes(
      {
      :region_id => @records[:region_id],
      :material_id => @records[:material_id],
      :color_id => @records[:color_id],
      :procession_id => @records[:procession_id]
    }
    )
    render :json => {}
  end

end
