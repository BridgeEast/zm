class CreateGeneralShoes < ActiveRecord::Migration
  def self.up
    create_table :general_shoes do |t|

      t.string :shoes_id, :null => false
      t.string :suitable_people
      t.string :colors
      t.string :types_of_shoes

      t.decimal :price

      t.string :photo_one
      t.string :photo_two
      t.integer :advanced_order_id
      t.integer :order_id
      t.integer :excel_num
      t.integer :factory_order_id

      t.text :remark
      t.date :production_date

      t.timestamps
    end
  end

  def self.down
    drop_table :general_shoes
  end
end
