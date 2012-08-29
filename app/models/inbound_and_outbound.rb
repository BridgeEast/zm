class InboundAndOutbound < ActiveRecord::Base
  belongs_to :size_of_shoe
#  def self.get_jing( prodate )
#      prodate.collect! do |shoe|
#        { 
#     #     :shoes_id => shoe.shoes_id,
#     #     :size_36 => InboundAndOutbound.get_virtual_sizenum( shoe, 36 ),
#     #     :size_37 => InboundAndOutbound.get_virtual_sizenum( shoe, 37 ),
#          :size_38 => shoe.inbound_num,
#          :size_39 => shoe.jing( shoe, 39 ),
#        }
#      end
#  end
#
#  def jing( shoe, size )
#
#    return 388
#  end
#
#  def self.get_virtual_sizenum( shoe, size )
#    size_shoe = shoe.inbound_and_outbounds.where( :size => size )
#    if size_shoe != []
#      if size_shoe.first.inbound_num != nil
#        fin = size_shoe.first.inbound_num.to_s
#      else
#        fin = "0"
#      end
#    else
#      fin = "0"
#    end
#    return fin
#  end
  
end
