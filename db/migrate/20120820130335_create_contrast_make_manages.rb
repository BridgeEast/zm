class CreateContrastMakeManages < ActiveRecord::Migration
  def self.up
    create_table :contrast_make_manages do |t|
      t.string :factory_order_id, :null => false, :unique => true
      t.string :factory
      t.string :payment



      t.timestamps
    end
  end

  def self.down
    drop_table :contrast_make_manages
  end
end
