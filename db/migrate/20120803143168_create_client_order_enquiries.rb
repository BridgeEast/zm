class CreateClientOrderEnquiries< ActiveRecord::Migration
  def self.up
    create_table :client_order_enquiries do |t|
      t.string :order_id
      t.string :client
      t.string :contract
      t.string :total_price
      t.string :quality
      t.string :shipment
      t.string :payment
      t.string :lading_bill
      t.string :production_date
      t.string :remark

      t.timestamps
    end
  end

  def self.down
    drop_table :client_order_enquiries
  end
end


