class CreateInboundAndOutbounds < ActiveRecord::Migration
  def self.up
    create_table :inbound_and_outbounds do |t|

      t.integer :size_of_shoe_id, :null => false, :unique => true
      t.integer :size
      t.integer :inbound_num
      t.integer :outbound_num
      t.date :inbound_and_outbound_date

      t.timestamps
    end
  end

  def self.down
    drop_table :inbound_and_outbounds
  end
end
