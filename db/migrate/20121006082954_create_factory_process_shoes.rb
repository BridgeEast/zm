class CreateFactoryProcessShoes < ActiveRecord::Migration
  def self.up
    create_table :factory_process_shoes do |t|
      t.integer :factory_order_id
      t.integer :general_shoe_id
      t.integer :size
      t.integer :processing_num

      t.timestamps
    end
  end

  def self.down
    drop_table :factory_process_shoes
  end
end
