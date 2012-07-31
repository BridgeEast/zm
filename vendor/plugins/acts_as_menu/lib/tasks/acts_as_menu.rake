# encoding: utf-8
namespace :acts_as_menu do
  desc 'create f_menu data in environment'
  task :create_datas => :environment do 
    puts "Creating  datas success,checkout your home page!"
    FMenu.delete_all
    FMenu.create!([
      { :name => "主页",:url => "home_menu"},
      { :name => "客户",
        :s_menus_attributes => [
          { :name => "浏览鞋库", :url => "" },
          { :name => "心愿单", :url => "" },
          { :name => "预购单管理", :url => "" },
          { :name => "订单管理", :url => "" },
        ]
      },
      { :name => "客服",
        :s_menus_attributes => [
          { :name => "Excel文件处理及下板", :url => "" },
          { :name => "浏览客户心愿单", :url => "" },
          { :name => "合同制作", :url => "" },
          { :name => "虚拟仓库管理", :url => "" },
          { :name => "预购单管理", :url => "" },
          { :name => "订单管理", :url => "" },
          { :name => "合同管理", :url => "" },
         
        ]
      },
      { :name => "管理层",
        :s_menus_attributes => [
          { :name => "查看鞋库", :url => "" },
          { :name => "查看客户心愿单", :url => "" },
          { :name => "查看预购单", :url => "" },
          { :name => "查看订单", :url => "" },
          { :name => "查看合同", :url => "" },
          { :name => "查看虚拟仓库", :url => "" }
        ]
      },
      { :name => "基础数据",
        :s_menus_attributes => [
          { :name => "鞋库", :url => "" },
          { :name => "部位", :url => "" },
          { :name => "材料", :url => "" },
          { :name => "颜色", :url => "" },
          { :name => "加工方法", :url => "" }
        ]
      }
      ])
  end
end
