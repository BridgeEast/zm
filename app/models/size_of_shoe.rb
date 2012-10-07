class SizeOfShoe < ActiveRecord::Base
  has_many :inbound_and_outbound, :dependent => :destroy
  belongs_to :general_shoe
  
##^^^^^^^^^^^^^^^^^^  日报表  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  def self.sheet_shoe_size_num( shoe_name )
      shoe_name.collect! do |shoe|
        { 
          :shoes_id => shoe.general_shoe.shoes_id,
          :size_36 => SizeOfShoe.get_virtual_num( shoe, 36 ),
          :size_37 => SizeOfShoe.get_virtual_num( shoe, 37 ),
          :size_38 => SizeOfShoe.get_virtual_num( shoe, 38 ),
          :size_39 => SizeOfShoe.get_virtual_num( shoe, 39 ),
          :size_40 => SizeOfShoe.get_virtual_num( shoe, 40 ),
          :size_41 => SizeOfShoe.get_virtual_num( shoe, 41 ),
          :size_42 => SizeOfShoe.get_virtual_num( shoe, 42 ),
          :size_43 => SizeOfShoe.get_virtual_num( shoe, 43 ),
          :size_44 => SizeOfShoe.get_virtual_num( shoe, 44 )
        }
      end
  end

##^^^^^^^^^^^^^^^^^^  日报表  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  
  def self.get_virtual_num( shoe, size )
    size_shoe = shoe.inbound_and_outbound.where( :size => size )
    if size_shoe != []
      if size_shoe.first.inbound_num != nil
        fin = size_shoe.first.inbound_num
      else
        fin = "0"
      end
    else
      fin = "0"
    end
    return fin
  end
##^^^^^^^^^^^^^^^^^^^^  日发货单  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  def self.dispatch_shoe_size_num( shoe_name )
      shoe_name.collect! do |shoe|
        { 
          :shoes_id => shoe.general_shoe.shoes_id,
          :size_36 => SizeOfShoe.get_dispatch_num( shoe, 36 ),
          :size_37 => SizeOfShoe.get_dispatch_num( shoe, 37 ),
          :size_38 => SizeOfShoe.get_dispatch_num( shoe, 38 ),
          :size_39 => SizeOfShoe.get_dispatch_num( shoe, 39 ),
          :size_40 => SizeOfShoe.get_dispatch_num( shoe, 40 ),
          :size_41 => SizeOfShoe.get_dispatch_num( shoe, 41 ),
          :size_42 => SizeOfShoe.get_dispatch_num( shoe, 42 ),
          :size_43 => SizeOfShoe.get_dispatch_num( shoe, 43 ),
          :size_44 => SizeOfShoe.get_dispatch_num( shoe, 44 ),
        }
      end
  end

  def self.get_dispatch_num( shoe, size )
    size_shoe = shoe.inbound_and_outbound.where( :size => size )
    if size_shoe != []
      if size_shoe.first.outbound_num != nil
        fin = size_shoe.first.outbound_num
      else
        fin = "0"
      end
    else
      fin = "0"
    end
    return fin
  end


def self.get_vv_json(vv)
    vv.collect! do |item|
    { 
      :id => item.id,
      :general_shoe_id => item.general_shoe.id,
      #:photo_one => item.general_shoe.photo_one,
      #:photo_two => item.general_shoe.photo_two,
      :shoes_id => item.general_shoe.shoes_id,
      #:types_of_shoes => item.general_shoe.types_of_shoes,
      #:suitable_people => item.general_shoe.suitable_people,
      #:colors => item.general_shoe.colors,
      #:production_date => item.general_shoe.production_date,
      :size => item.size,
      :necessary_num => item.necessary_num,
      :finished_num =>item.finished_num,
      :store_remaining => item.store_remaining
    }
    end
end


end
