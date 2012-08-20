class CreateRegions < ActiveRecord::Migration
  def self.up
    create_table :regions do |t|

      t.string :region, :null => false
      t.text :remark
      t.date :created_date

      t.timestamps
    end
  end

  def self.down
    drop_table :regions
  end
end
