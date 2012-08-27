class ServicesController < ApplicationController
  #---------------------------------aji
  def excelProcessingAndPlayBoard
  end
  #---------------------------------- 得到数据－－－－－－－－
  def get_excel_shoes
    @tem1 = GeneralShoe.all
    @tem2 = PlayBoard.all
    tem3=[]
    @tem1.each do |tem1|
      @tem2.each do |tem2|
        if tem1.id == tem2.general_shoe_id
          tem4 = {:id => tem1.id, :photo_one => tem1.photo_one, :photo_two => tem1.photo_two, :shoes_id => tem1.shoes_id, :types_of_shoes => tem1.types_of_shoes, :suitable_people => tem1.suitable_people, :colors => tem1.colors, :price => tem1.price, :sure_board => tem2.sure_board, :done_board => tem2.done_board, :remark => tem1.remark  }
        tem3 << tem4
        end
      end
    end
    respond_to do |format|
        format.json{ render :json => { :excel_shoes => tem3 } }
    end
  end
  #----------------------------------- 删除数据----------------
  def delete_shoes_and_detail_of_shoes
    GeneralShoe.find(params[:id]).destroy
    render :json => {}
  end
  #-----------------------------右键查看详情----------------
  def get_details_of_shoes
    details_shoes = GeneralShoe.get_details_json( params[:id] )
    respond_to do|format|
      format.json{ render :json => { :dos => details_shoes } }
    end
  end















  def scanningGuestWishList
  end




  #----------------------------------aji
end
