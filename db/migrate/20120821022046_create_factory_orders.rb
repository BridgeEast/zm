class CreateFactoryOrders < ActiveRecord::Migration
  def self.up
    create_table :factory_orders do |t|

      t.string :factory_order_id, :null => false, :unique => true
      t.string :factory
      t.string :payment
      t.decimal :total_price
      t.date :production_date
      t.text :remark

      t.timestamps
    end
  end

  def self.down
    drop_table :factory_orders
  end
end
