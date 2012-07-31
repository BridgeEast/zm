class DataBasesController < ApplicationController

  #scope: data_bases/region/region.js
  def region
  end

  #scope: base_datas/region/region.js
  def get_region
    respond_to do |format|
      format.json{ render :json => { :region => Region.all } }
    end
  end

  #scope: data_bases/region/region.js
  def create_region
    Region.create!(params[:record])
    respond_to do |format|
      format.json{ render :json => {}}
    end
  end

  #scope: data_bases/region/region.js
  def delete_region
    Region.find(params[:id]).destroy
    respond_to do |format|
      format.json{ render :json => {}}
    end
  end

  #scope: data_bases/region/region.js
  def update_region
    Region.find(params[:record][:id]).update_attributes(params[:record])
    respond_to do |format|
      format.json{ render :json => {}}
    end
  end

end
