class CreatePlayBoards < ActiveRecord::Migration
  def self.up
    create_table :play_boards do |t|

      t.integer :general_shoe_id, :null => false

      t.string :custom_num
      t.string :server_num
      t.date :sure_board
      t.date :done_board
      t.text :communication
      t.string :board_kind

      t.timestamps
    end
  end

  def self.down
    drop_table :play_boards
  end
end
