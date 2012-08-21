class CreateNodes < ActiveRecord::Migration
  def self.up
    create_table :nodes do |t|
      t.string :year
     
    end
  end

  #Node.create :year => '2012'
  #Node.create :year => '2011'

  def self.down
    drop_table :nodes
  end
end
