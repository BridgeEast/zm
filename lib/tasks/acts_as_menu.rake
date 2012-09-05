# encoding: utf-8
namespace :menu do
  desc '创建菜单'
  task :init_datas => :environment do 
    puts "创建菜单成功!"
    FMenu.delete_all
    FMenu.create!([
      { :name => "主页",:url => "/home_menu"},
      { :name => "客户",
        :s_menus_attributes => [
          { :name => "浏览鞋库", :url => "/guests/scanning_store_of_shoes" },
          { :name => "心愿单", :url => "/guests/wish_list" },
          { :name => "预购单管理", :url => "" },
          { :name => "订单管理", :url => "" },
        ]
      },
      { :name => "客服",
        :s_menus_attributes => [
          { :name => "Excel文件处理及下板", :url => "/services/excelProcessingAndPlayBoard" },#---aji
          { :name => "浏览客户心愿单", :url => "/services/scanningGuestWishList" },#---aji
          { :name => "合同制作", :url => "" },
          { :name => "虚拟仓库管理", :url => "" },
          { :name => "预购单管理", :url => "" },
          { :name => "订单管理", :url => "/services/guest_order_management" },
          { :name => "合同管理", :url => "" },
         
        ]
      },
      { :name => "管理层",
        :s_menus_attributes => [
          { :name => "查看鞋库", :url => "/managements/check_store_of_shoes" },
          { :name => "查看客户心愿单", :url => "/managements/check_wish_list" },
          { :name => "查看预购单", :url => "/managements/check_advanced_order" },
          { :name => "查看订单", :url => "/managements/check_guest_order" },
          { :name => "查看合同", :url => "/managements/check_factory_order" },
          { :name => "查看虚拟仓库", :url => "/managements/check_virtual_warehouse" }
        ]
      },
      { :name => "基础数据",
        :s_menus_attributes => [
          { :name => "鞋库", :url => "/data_bases/store_of_shoes" },
          { :name => "部位", :url => "/data_bases/region" },
          { :name => "材料", :url => "/data_bases/material" },
          { :name => "颜色", :url => "/data_bases/color" },
          { :name => "加工方法", :url => "/data_bases/procession" }
        ]
      }
      ])
  puts "创建管理员!"
  User.delete_all
  User.create!({ :email => 'hzu@gmail.com',:password=>'hzuhzu' })
  end
end
