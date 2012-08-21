class CreateCheckStoreOfShoes < ActiveRecord::Migration
  def self.up
    create_table :check_store_of_shoes do |t|
      t.string :photoOne
      t.string :photoTwo
      t.string :shoesId
      t.string :typesOfShoes
      t.string :suitablePeople
      t.string :colors
      t.decimal :price
      t.date :productionDate
      t.text :remark
      t.timestamps
    end
  end

  def self.down
    drop_table :check_store_of_shoes
  end
end
