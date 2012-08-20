class CreateContrastMakeManages < ActiveRecord::Migration
  def self.up
    create_table :contrast_make_manages, :primary_key => :factory_order_id do |t|
      t.string :factory_order_id, :null => false
      t.string :factory
      t.string :payment



      t.timestamps
    end
  end

  def self.down
    drop_table :contrast_make_manages
  end
end
