class CreateColors < ActiveRecord::Migration
  def self.up
    create_table :colors do |t|

      t.string :color, :null => false
      t.text :remark
      t.date :created_date

      t.timestamps
    end
  end

  def self.down
    drop_table :colors
  end
end
