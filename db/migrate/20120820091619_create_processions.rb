class CreateProcessions < ActiveRecord::Migration
  def self.up
    create_table :processions do |t|

      t.string :procession, :null => false
      t.text :remark
      t.date :created_date

      t.timestamps
    end
  end

  def self.down
    drop_table :processions
  end
end
