class CreateDetailsOfShoes < ActiveRecord::Migration
  def self.up
    create_table :details_of_shoes do |t|

      t.integer :general_shoe_id, :null => false

      t.integer :region_id
      t.integer :material_id
      t.integer :color_id
      t.integer :procession_id


      t.timestamps
    end
  end

  def self.down
    drop_table :details_of_shoes
  end
end
