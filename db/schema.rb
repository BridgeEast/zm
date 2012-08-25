# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120825022728) do

  create_table "advanced_orders", :force => true do |t|
    t.string   "advanced_order_id",                                  :null => false
    t.decimal  "total_price",         :precision => 10, :scale => 0
    t.date     "advanced_order_date"
    t.text     "remark"
    t.string   "state"
    t.string   "custom_num"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "c_menus", :force => true do |t|
    t.string   "speed",       :default => "normal"
    t.string   "delay",       :default => "800"
    t.string   "animation",   :default => "height"
    t.string   "dropShadows", :default => "true"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "colors", :force => true do |t|
    t.string   "color",        :null => false
    t.text     "remark"
    t.date     "created_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

<<<<<<< HEAD
=======
  create_table "contrast_make_manages", :force => true do |t|
    t.string   "factory_order_id", :null => false
    t.string   "factory"
    t.string   "payment"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

>>>>>>> 提交代码
  create_table "details_of_shoes", :force => true do |t|
    t.integer  "general_shoe_id", :null => false
    t.integer  "region_id"
    t.integer  "material_id"
    t.integer  "color_id"
    t.integer  "procession_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "excel_receives", :force => true do |t|
<<<<<<< HEAD
    t.string   "excel_receive_id", :null => false
=======
    t.string   "excel_num",  :null => false
>>>>>>> 提交代码
    t.string   "custom"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "f_menus", :force => true do |t|
    t.string   "name"
    t.string   "url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "factory_orders", :force => true do |t|
    t.string   "factory_order_id",                                :null => false
    t.string   "factory"
    t.string   "payment"
    t.decimal  "total_price",      :precision => 10, :scale => 0
    t.date     "production_date"
    t.text     "remark"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "general_shoes", :force => true do |t|
    t.string   "shoes_id",                                         :null => false
    t.string   "suitable_people"
    t.string   "colors"
    t.string   "types_of_shoes"
    t.decimal  "price",             :precision => 10, :scale => 0
    t.string   "photo_one"
    t.string   "photo_two"
    t.integer  "advanced_order_id"
    t.integer  "order_id"
    t.integer  "excel_num"
    t.integer  "excel_receive_id"
    t.integer  "factory_order_id"
    t.text     "remark"
    t.date     "production_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "materials", :force => true do |t|
    t.string   "material",     :null => false
    t.text     "remark"
    t.date     "created_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

<<<<<<< HEAD
=======
  create_table "nodes", :force => true do |t|
    t.string  "nodetext"
    t.integer "nodeparent"
  end

>>>>>>> 提交代码
  create_table "orders", :force => true do |t|
    t.string   "order_id",                                       :null => false
    t.string   "server_num"
    t.string   "custom_num"
    t.string   "custom_contrast"
    t.string   "quality"
    t.string   "payment"
    t.decimal  "total_price",     :precision => 10, :scale => 0
    t.date     "production_date"
    t.boolean  "shipment"
    t.boolean  "lading_bill"
    t.boolean  "state"
    t.text     "remark"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "play_boards", :force => true do |t|
    t.integer  "general_shoe_id", :null => false
    t.string   "custom_num"
    t.string   "server_num"
    t.date     "sure_board"
    t.date     "done_board"
    t.text     "communication"
    t.string   "board_kind"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "processions", :force => true do |t|
    t.string   "procession",   :null => false
    t.text     "remark"
    t.date     "created_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "regions", :force => true do |t|
    t.string   "region",       :null => false
    t.text     "remark"
    t.date     "created_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "s_menus", :force => true do |t|
    t.string   "name"
    t.string   "url"
    t.integer  "f_menu_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "size_of_shoes", :force => true do |t|
    t.integer  "general_shoe_id", :null => false
    t.integer  "size"
    t.integer  "necessary_num"
    t.integer  "finished_num"
    t.integer  "store_remaining"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "t_menus", :force => true do |t|
    t.string   "name"
    t.string   "url"
    t.integer  "s_menu_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.string   "email",                                 :default => "", :null => false
    t.string   "encrypted_password",     :limit => 128, :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                         :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
