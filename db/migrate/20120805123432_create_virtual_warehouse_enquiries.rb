class CreateVirtualWarehouseEnquiries< ActiveRecord::Migration
  def self.up
    create_table :virtual_warehouse_enquiries do |t|
      t.string :photo_one
      t.string :photo_two
      t.string :shoes_id
      t.string :types_of_shoes
      t.string :suitable_people
      t.string :colors
      t.string :size
      t.string :number
      t.string :finished_number
      t.string :warehouse_number
      t.string :production_date

      t.timestamps
    end
  end

  def self.down
    drop_table :virtual_warehouse_enquiries
  end
end


