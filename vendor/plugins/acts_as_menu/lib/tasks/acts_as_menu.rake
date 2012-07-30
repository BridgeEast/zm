# encoding: utf-8
namespace :acts_as_menu do
  desc 'create f_menu data in environment'
  task :create_datas => :environment do 
    puts "Creating  datas success,checkout your home page!"
    FMenu.delete_all
    FMenu.create!([
      { :name => "主页",:url => "acts_as_menus/home_menu"},
      { :name => "制单",
        :s_menus_attributes => [
          { :name => "制作板单", :url => "sample_orders/new" },
          { :name => "制作订单", :url => "orders/new" },
          { :name => "板房管理", :url => "sample_orders" },
          { :name => "订单列表", :url => "orders"},
          { :name => "订单进度列表", :url => "order_items" }
        ]
      },
      { 
        :name => "菜单设置",
        :url => "c_menu_win"
      }])
  end
end
