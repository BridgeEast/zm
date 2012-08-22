class CreateMaterials < ActiveRecord::Migration
  def self.up
    create_table :materials do |t|
      t.string :material, :null => false
      t.text :remark
      t.date :created_date

      t.timestamps
    end
  end

  def self.down
    drop_table :materials
  end
end
