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

ActiveRecord::Schema.define(:version => 20120805123434) do

  create_table "c_menus", :force => true do |t|
    t.string   "speed",       :default => "normal"
    t.string   "delay",       :default => "800"
    t.string   "animation",   :default => "height"
    t.string   "dropShadows", :default => "true"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "client_order_enquiries", :force => true do |t|
    t.string   "order_id"
    t.string   "client"
    t.string   "contract"
    t.string   "total_price"
    t.string   "quality"
    t.string   "shipment"
    t.string   "payment"
    t.string   "lading_bill"
    t.string   "production_date"
    t.string   "remark"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "colors", :force => true do |t|
    t.string   "name"
    t.string   "remark"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "f_menus", :force => true do |t|
    t.string   "name"
    t.string   "url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "materials", :force => true do |t|
    t.string   "name"
    t.string   "remark"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "regions", :force => true do |t|
    t.string   "name"
    t.string   "remark"
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

  create_table "virtual_warehouse_enquiries", :force => true do |t|
    t.string   "photo_one"
    t.string   "photo_two"
    t.string   "shoes_id"
    t.string   "types_of_shoes"
    t.string   "suitable_people"
    t.string   "colors"
    t.string   "size"
    t.string   "number_of_shoes",  :limit => 50
    t.string   "finished_number"
    t.string   "warehouse_number"
    t.string   "production_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
