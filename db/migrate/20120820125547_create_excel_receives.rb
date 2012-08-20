class CreateExcelReceives < ActiveRecord::Migration
  def self.up
    create_table :excel_receives, :primary_key => :excel_num do |t|
      t.string :excel_num, :null => false
      t.string :custom

      t.timestamps
    end
  end

  def self.down
    drop_table :excel_receives
  end
end
