class CreateAdvancedOrders < ActiveRecord::Migration
  def self.up
    create_table :advanced_orders, :primary_key => :advanced_order_id do |t|
      t.string :advanced_order_id, :null => false
      t.decimal :total_price
      t.date :advanced_order_date
      t.text :remark
      t.string :state
      t.string :custom_num


      t.timestamps
    end
  end

  def self.down
    drop_table :advanced_orders
  end
end
