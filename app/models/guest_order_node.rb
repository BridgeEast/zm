class GuestOrderNode < ActiveRecord::Base
      scope :node_or_parent, where(:nodeparent => ["1"])
      scope :which_month, where(:nodeparent => ["2"])

    def order_tree
        months = []
        GuestOrderNode.which_month.each do |t|
        months << { :text => t.nodetext, :leaf => true }
        end
        return months 
    end
end
