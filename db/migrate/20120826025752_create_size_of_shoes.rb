class CreateSizeOfShoes < ActiveRecord::Migration
  def self.up
    create_table :size_of_shoes do |t|

      t.integer :general_shoe_id, :null => false


      t.integer :size
      t.integer :necessary_num
      t.integer :finished_num
      t.integer :store_remaining

      t.timestamps
    end
  end

  def self.down
    drop_table :size_of_shoes
  end
end
