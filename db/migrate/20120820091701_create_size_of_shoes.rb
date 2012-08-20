class CreateSizeOfShoes < ActiveRecord::Migration
  def self.up
    create_table :size_of_shoes do |t|

      t.integer :general_shoe_id, :null => false

      t.integer :size_36
      t.integer :size_37
      t.integer :size_38
      t.integer :size_39
      t.integer :size_40
      t.integer :size_41
      t.integer :size_42
      t.integer :size_43
      t.integer :size_44

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
