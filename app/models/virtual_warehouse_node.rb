class VirtualWarehouseNode < ActiveRecord::Base
      scope :node_or_parent, where(:nodeparent => ["1"])
      scope :which_month, where(:nodeparent => ["2"])
      scope :which_contract, where(:nodeparent => ["3"])

    def virtual_warehouse_tree 
        months = []
        VirtualWarehouseNode.which_month.each do |t|
        months << { :text => t.nodetext, :expanded => true, :children => t.warehouse_tree }
        end
        return months 
    end

    def warehouse_tree 
        contract = []
        VirtualWarehouseNode.which_contract.each do |t|
        contract << { :text => t.nodetext, :expanded => true, :leaf => true }
        end
        return contract 
    end
end

