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
          { :name => "浏览样品单", :url => "" },
          { :name => "心愿单", :url => "" },
          { :name => "订单管理", :url => "" },
        ]
      },
      { :name => "客服",
        :s_menus_attributes => [
          { :name => "Excel文件处理及下板", :url => "" },
          { :name => "工厂订单制作", :url => "" },
          { :name => "虚拟仓库管理", :url => "" },
          { :name => "客户订单管理", :url => "" },
          { :name => "工厂订单管理", :url => "" },
          { :name => "样品管理", :url => "" },
          { :name => "浏览客户心愿单进行推销", :url => "" }
        ]
      },
      { :name => "老板",
        :s_menus_attributes => [
          { :name => "查看样品库", :url => "" },
          { :name => "查看样品与沟通纪录", :url => "" },
          { :name => "查看工厂订单", :url => "" },
          { :name => "查看客户订单", :url => "" }
        ]
      },
      { :name => "基础数据",
        :s_menus_attributes => [
          { :name => "样品库", :url => "" },
          { :name => "部位", :url => "" },
          { :name => "材料", :url => "" },
          { :name => "颜色", :url => "" },
          { :name => "加工方法", :url => "" }
        ]
      }
      ])
  end
end
