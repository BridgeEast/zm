class ChangeExcelNumInGeneralShoes < ActiveRecord::Migration
  def self.up
    rename_column :general_shoes, :excel_num, :excel_receive_id
  end

  def self.down
    rename_column :general_shoes, :excel_receive_id, :excel_num, 
  end
end
