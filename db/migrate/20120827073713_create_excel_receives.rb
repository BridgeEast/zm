class CreateExcelReceives < ActiveRecord::Migration
  def self.up
    create_table :excel_receives do |t|

      t.string :excel_receive_id, :null => false, :unique => true
      t.string :custom_num
      t.string :excel_url
      t.date :receiving_date

      t.timestamps
    end
  end

  def self.down
    drop_table :excel_receives
  end
end
