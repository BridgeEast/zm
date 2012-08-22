class CreateOrders < ActiveRecord::Migration
  def self.up
    create_table :orders do |t|
      t.string :order_id, :null => false, :unique => true
      t.string :server_num
      t.string :custom_num
      t.string :custom_contrast
      t.string :quality
      t.string :payment

      t.decimal :total_price
      t.date :production_date
      t.boolean :shipment
      t.boolean :lading_bill
      t.boolean :state
      t.text :remark

      t.timestamps
    end
  end

  def self.down
    drop_table :orders
  end
end
