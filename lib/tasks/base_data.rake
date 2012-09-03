# encoding: utf-8
namespace :data do 
  desc '创建基础数据'
  task :create_datas => :environment do
    puts "创建部位基础数据"
    Region.delete_all
    Region.create([
      {:id => 1, :region => "里料",:remark => '',:created_date => "2012-8-22"},
      {:id => 2, :region => "内里",:remark => '',:created_date => "2012-8-22"},
      {:id => 3, :region => "大底",:remark => '',:created_date => "2012-8-22"},
      {:id => 4, :region => "鞋垫",:remark => '',:created_date => "2012-8-22"},
      {:id => 5, :region => "后套里",:remark => '',:created_date => "2012-8-22"},
      {:id => 6, :region => "鞋带内里",:remark => '',:created_date => "2012-8-22"},
      {:id => 7, :region => "线圈",:remark => '',:created_date => "2012-8-22"},
      {:id => 8, :region => "毛刺",:remark => '',:created_date => "2012-8-22"},
      {:id => 9, :region => "铆钉",:remark => '',:created_date => "2012-8-22"},
      {:id => 10, :region => "车线",:remark => '',:created_date => "2012-8-22"},
      {:id => 11, :region => "sock logo",:remark => '',:created_date => "2012-8-22"}
    ])
    
    puts "创建物料基础数据"
    Material.delete_all
    Material.create([
      {:id => 1, :material => "pvc鞋底",:remark => "",:created_date => "2012-8-22"},
      {:id => 2, :material => "pu鞋底",:remark => '',:created_date => "2012-8-22"},
      {:id => 3, :material => "牛巴",:remark => '',:created_date => "2012-8-22"},
      {:id => 4, :material => "超细纤维",:remark => '',:created_date => "2012-8-22"},
      {:id => 5, :material => "天然皮",:remark => '',:created_date => "2012-8-22"},
      {:id => 6, :material => "网布",:remark => '',:created_date => "2012-8-22"},
      {:id => 7, :material => "rb鞋底",:remark => '',:created_date => "2012-8-22"},
      {:id => 8, :material => "tpr鞋底",:remark => '',:created_date => "2012-8-22"},
      {:id => 9, :material => "eva鞋底",:remark => '',:created_date => "2012-8-22"},
      {:id => 10, :material => "md鞋底",:remark => '',:created_date => "2012-8-22"},
      {:id => 11, :material => "组合鞋底",:remark => '',:created_date => "2012-8-22"},
      {:id => 12, :material => "牛皮革",:remark => "",:created_date => "2012-8-22"},
      {:id => 13, :material => "猪皮革",:remark => '',:created_date => "2012-8-22"},
      {:id => 14, :material => "羊皮革",:remark => '',:created_date => "2012-8-22"},
      {:id => 15, :material => "马皮革",:remark => '',:created_date => "2012-8-22"},
      {:id => 16, :material => "驴皮革",:remark => '',:created_date => "2012-8-22"},
      {:id => 17, :material => "表皮及制品",:remark => '',:created_date => "2012-8-22"},
      {:id => 18, :material => "袋鼠皮革",:remark => '',:created_date => "2012-8-22"},
      {:id => 19, :material => "鱼皮革",:remark => '',:created_date => "2012-8-22"},
      {:id => 20, :material => "中底板",:remark => '',:created_date => "2012-8-22"},
      {:id => 21, :material => "鞋楦",:remark => '',:created_date => "2012-8-22"},
      {:id => 22, :material => "沿条",:remark => '',:created_date => "2012-8-22"},
      {:id => 23, :material => "鞋扣",:remark => "",:created_date => "2012-8-22"},
      {:id => 24, :material => "鞋撑",:remark => '',:created_date => "2012-8-22"},
      {:id => 25, :material => "鞋蜡",:remark => '',:created_date => "2012-8-22"},
      {:id => 26, :material => "帆布",:remark => '',:created_date => "2012-8-22"},
      {:id => 27, :material => "麻布",:remark => '',:created_date => "2012-8-22"},
      {:id => 28, :material => "棉布",:remark => '',:created_date => "2012-8-22"},
      {:id => 29, :material => "格子布",:remark => '',:created_date => "2012-8-22"},
      {:id => 30, :material => "尼龙布",:remark => '',:created_date => "2012-8-22"},
      {:id => 31, :material => "防水布",:remark => '',:created_date => "2012-8-22"},
      {:id => 32, :material => "弹力布",:remark => '',:created_date => "2012-8-22"},
      {:id => 33, :material => "珍珠布",:remark => '',:created_date => "2012-8-22"},
      {:id => 34, :material => "针织布",:remark => '',:created_date => "2012-8-22"},
      {:id => 35, :material => "绸缎布",:remark => '',:created_date => "2012-8-22"}
    ])
    
    puts "创建颜色基础数据"
    Color.delete_all
    Color.create([
      {:id => 1, :color => "淡黄",:remark => "",:created_date => "2012-8-22"},
      {:id => 2, :color => "白色",:remark => '',:created_date => "2012-8-22"},
      {:id => 3, :color => "中黄",:remark => '',:created_date => "2012-8-22"},
      {:id => 4, :color => "桔黄",:remark => '',:created_date => "2012-8-22"},
      {:id => 5, :color => "桔红",:remark => '',:created_date => "2012-8-22"},
      {:id => 6, :color => "柠檬黄",:remark => '',:created_date => "2012-8-22"},
      {:id => 7, :color => "朱红",:remark => '',:created_date => "2012-8-22"},
      {:id => 8, :color => "大红",:remark => '',:created_date => "2012-8-22"},
      {:id => 9, :color => "深红",:remark => '',:created_date => "2012-8-22"},
      {:id => 10, :color => "玫瑰红",:remark => '',:created_date => "2012-8-22"},
      {:id => 11, :color => "熟褐",:remark => '',:created_date => "2012-8-22"},
      {:id => 12, :color => "草绿",:remark => "",:created_date => "2012-8-22"},
      {:id => 13, :color => "中绿",:remark => '',:created_date => "2012-8-22"},
      {:id => 14, :color => "深绿",:remark => '',:created_date => "2012-8-22"},
      {:id => 15, :color => "橄榄绿",:remark => '',:created_date => "2012-8-22"},
      {:id => 16, :color => "湖蓝",:remark => '',:created_date => "2012-8-22"},
      {:id => 17, :color => "钴蓝",:remark => '',:created_date => "2012-8-22"},
      {:id => 18, :color => "群青",:remark => '',:created_date => "2012-8-22"},
      {:id => 19, :color => "深蓝",:remark => '',:created_date => "2012-8-22"},
      {:id => 20, :color => "紫罗兰",:remark => '',:created_date => "2012-8-22"},
      {:id => 21, :color => "天蓝",:remark => '',:created_date => "2012-8-22"},
      {:id => 22, :color => "灰色",:remark => '',:created_date => "2012-8-22"}
   ])  

   puts "创建加工方法基础数据"
   Procession.delete_all
   Procession.create([
     {:id => 1, :procession => "贴合",:remark => "",:created_date => "2012-8-22"},
     {:id => 2, :procession => "裁条",:remark => '',:created_date => "2012-8-22"},
     {:id => 3, :procession => "裁块",:remark => '',:created_date => "2012-8-22"},
     {:id => 4, :procession => "热压",:remark => '',:created_date => "2012-8-22"},
     {:id => 5, :procession => "水转印",:remark => '',:created_date => "2012-8-22"},
     {:id => 6, :procession => "移印",:remark => '',:created_date => "2012-8-22"},
     {:id => 7, :procession => "升华转印",:remark => '',:created_date => "2012-8-22"},
     {:id => 8, :procession => "电镀",:remark => '',:created_date => "2012-8-22"},
     {:id => 9, :procession => "微量射出",:remark => '',:created_date => "2012-8-22"},
     {:id => 10, :procession => "TPU射",:remark => '',:created_date => "2012-8-22"},
     {:id => 11, :procession => "印刷",:remark => '',:created_date => "2012-8-22"},
     {:id => 12, :procession => "眼扣",:remark => '',:created_date => "2012-8-22"},
     {:id => 13, :procession => "过胶",:remark => '',:created_date => "2012-8-22"},
     {:id => 14, :procession => "折边",:remark => '',:created_date => "2012-8-22"},
     {:id => 15, :procession => "高周波",:remark => '',:created_date => "2012-8-22"},
     {:id => 16, :procession => "车翻",:remark => '',:created_date => "2012-8-22"},
     {:id => 17, :procession => "喷漆",:remark => '',:created_date => "2012-8-22"}
   ])    

   puts "创建预购单数据"
   AdvancedOrder.delete_all
   AdvancedOrder.create([
     {:id => 1, :advanced_order_id => "A1",:total_price => "14.21",:advanced_order_date => "2012-7-21",:remark => "nothing",:state => "待定预购单",:custom_num => "客户1"},
     {:id => 2, :advanced_order_id => "A2",:total_price => "17.75",:advanced_order_date => "2012-7-11",:remark => "nothing",:state => "进行中预购单",:custom_num => "客户2"},
     {:id => 3, :advanced_order_id => "A3",:total_price => "11.32",:advanced_order_date => "2012-8-09",:remark => "nothing",:state => "进行中预购单",:custom_num => "客户3"}
   ])  

   puts "创建Excel数据"
   ExcelReceive.delete_all
   ExcelReceive.create([
     {:id => 1, :excel_receive_id => "E1",:custom_num => "客户1",:excel_url => "e1.xls",:receiving_date => "2012-8-1"},
     {:id => 2, :excel_receive_id => "E2",:custom_num => "客户3",:excel_url => "e2.xls",:receiving_date => "2012-7-12"},
     {:id => 3, :excel_receive_id => "E3",:custom_num => "客户2",:excel_url => "e3.xls",:receiving_date => "2012-8-5"},
   ]) 

   puts "创建工厂订单数据"
   FactoryOrder.delete_all
   FactoryOrder.create([
     {:id => 1, :factory_order_id => "F1",:factory => "工厂1",:payment => "付全款", :total_price => "23.32",:production_date => "2012-6-4",:remark => " "},
     {:id => 2, :factory_order_id => "F2",:factory => "工厂2",:payment => "先付30%", :total_price => "12.62",:production_date => "2012-6-7",:remark => " "},
     {:id => 3, :factory_order_id => "F3",:factory => "工厂1",:payment => "付全款", :total_price => "183.30",:production_date => "2012-8-14",:remark => " "}
   ]) 

   puts "创建订单数据"
   Order.delete_all
   Order.create([
     {:id => 1, :order_id => "O1",:server_num => "客服1",:custom_num => "客户1",:custom_contrast => "合同1",:quality => "Yes", :payment => "付全款",:order_url => "o1.xls",:total_price => "123.92",:production_date => "2012-7-8",:shipment => "0",:lading_bill => "0", :state => "待定订单",:remark => " "},
     {:id => 2, :order_id => "O2",:server_num => "客服1",:custom_num => "客户2",:custom_contrast => "合同2",:quality => "Yes", :payment => "先付30%",:order_url => "o2.xls",:total_price => "219.10",:production_date => "2012-7-10",:shipment => "1",:lading_bill => "0", :state => "进行中订单",:remark => " "},
     {:id => 3, :order_id => "O3",:server_num => "客服2",:custom_num => "客户3",:custom_contrast => "合同3",:quality => "No", :payment => "付全款",:order_url => "o3.xls",:total_price => "291.32",:production_date => "2012-8-8",:shipment => "0",:lading_bill => "1", :state => "进行中订单",:remark => " "}
   ]) 

   puts "创建鞋概述数据"
   GeneralShoe.delete_all
   GeneralShoe.create([
     {:id => 1, :shoes_id => "S1",:suitable_people => "男性",:colors => "黑色", :types_of_shoes => "高跟鞋",:price => "2.20",:photo_one => "1-1.jpg",:photo_two => "1-2.jpg",:advanced_order_id => "1",:order_id => "",:excel_receive_id => "1",:factory_order_id => "",:production_date => "2012-6-4",:remark => " "},
     {:id => 2, :shoes_id => "S2",:suitable_people => "女性",:colors => "白色", :types_of_shoes => "平底鞋",:price => "12.72",:photo_one => "2-1.jpg",:photo_two => "2-2.jpg",:advanced_order_id => "2",:order_id => "",:excel_receive_id => "2",:factory_order_id => "",:production_date => "2012-7-6",:remark => " "},
     {:id => 3, :shoes_id => "S3",:suitable_people => "中性",:colors => "蓝色", :types_of_shoes => "靴子",:price => "23.20",:photo_one => "3-1.jpg",:photo_two => "3-2.jpg",:advanced_order_id => "3",:order_id => "",:excel_receive_id => "3",:factory_order_id => "",:production_date => "2012-7-24",:remark => " "},
     {:id => 4, :shoes_id => "S4",:suitable_people => "女性",:colors => "黑色", :types_of_shoes => "高跟鞋",:price => "32.25",:photo_one => "4-1.jpg",:photo_two => "4-2.jpg",:advanced_order_id => "3",:order_id => "",:excel_receive_id => "1",:factory_order_id => "",:production_date => "2012-8-1",:remark => " "},
     {:id => 5, :shoes_id => "S5",:suitable_people => "中性",:colors => "红色", :types_of_shoes => "平底鞋",:price => "36.10",:photo_one => "5-1.jpg",:photo_two => "5-2.jpg",:advanced_order_id => "",:order_id => "1",:excel_receive_id => "2",:factory_order_id => "1",:production_date => "2012-8-1",:remark => " "},
     {:id => 6, :shoes_id => "S6",:suitable_people => "男性",:colors => "黄色", :types_of_shoes => "高跟鞋",:price => "12.20",:photo_one => "6-1.jpg",:photo_two => "6-2.jpg",:advanced_order_id => "",:order_id => "1",:excel_receive_id => "3",:factory_order_id => "2",:production_date => "2012-6-4",:remark => " "},
     {:id => 7, :shoes_id => "S7",:suitable_people => "女性",:colors => "绿色", :types_of_shoes => "平底鞋",:price => "10.42",:photo_one => "7-1.jpg",:photo_two => "7-2.jpg",:advanced_order_id => "",:order_id => "2",:excel_receive_id => "",:factory_order_id => "3",:production_date => "2012-7-6",:remark => " "},
     {:id => 8, :shoes_id => "S8",:suitable_people => "女性",:colors => "蓝色", :types_of_shoes => "靴子",:price => "33.22",:photo_one => "8-1.jpg",:photo_two => "8-2.jpg",:advanced_order_id => "",:order_id => "2",:excel_receive_id => "3",:factory_order_id => "1",:production_date => "2012-7-24",:remark => " "},
     {:id => 9, :shoes_id => "S9",:suitable_people => "男性",:colors => "青色", :types_of_shoes => "靴子",:price => "12.86",:photo_one => "9-1.jpg",:photo_two => "9-2.jpg",:advanced_order_id => "",:order_id => "2",:excel_receive_id => "1",:factory_order_id => "3",:production_date => "2012-8-1",:remark => " "},
     {:id => 10, :shoes_id => "S10",:suitable_people => "中性",:colors => "绿色", :types_of_shoes => "平底鞋",:price => "24.10",:photo_one => "10-1.jpg",:photo_two => "10-2.jpg",:advanced_order_id => "",:order_id => "3",:excel_receive_id => "2",:factory_order_id => "2",:production_date => "2012-8-1",:remark => " "},
     {:id => 11, :shoes_id => "S11",:suitable_people => "男性",:colors => "青色", :types_of_shoes => "靴子",:price => "19.86",:photo_one => "11-1.jpg",:photo_two => "11-2.jpg",:advanced_order_id => "",:order_id => "",:excel_receive_id => "1",:factory_order_id => "",:production_date => "2012-8-1",:remark => " "},
     {:id => 12, :shoes_id => "S12",:suitable_people => "中性",:colors => "紫色", :types_of_shoes => "平底鞋",:price => "20.10",:photo_one => "12-1.jpg",:photo_two => "12-2.jpg",:advanced_order_id => "",:order_id => "",:excel_receive_id => "2",:factory_order_id => "",:production_date => "2012-8-1",:remark => " "}    
   ])  

   puts "创建鞋细节数据"
   DetailsOfShoe.delete_all
   DetailsOfShoe.create([
     {:id => 1, :general_shoe_id => "1",:region_id => "3",:material_id => "1",:color_id => "2",:procession_id => "4"},
     {:id => 2, :general_shoe_id => "2",:region_id => "5",:material_id => "7",:color_id => "6",:procession_id => "1"},
     {:id => 3, :general_shoe_id => "3",:region_id => "6",:material_id => "2",:color_id => "5",:procession_id => "9"},
     {:id => 4, :general_shoe_id => "4",:region_id => "3",:material_id => "1",:color_id => "2",:procession_id => "4"},
     {:id => 5, :general_shoe_id => "5",:region_id => "2",:material_id => "5",:color_id => "4",:procession_id => "7"},
     {:id => 6, :general_shoe_id => "6",:region_id => "6",:material_id => "2",:color_id => "2",:procession_id => "4"},
     {:id => 7, :general_shoe_id => "7",:region_id => "9",:material_id => "11",:color_id => "6",:procession_id => "1"},
     {:id => 8, :general_shoe_id => "8",:region_id => "11",:material_id => "2",:color_id => "5",:procession_id => "9"},
     {:id => 9, :general_shoe_id => "9",:region_id => "2",:material_id => "4",:color_id => "2",:procession_id => "4"},
     {:id => 10, :general_shoe_id => "10",:region_id => "1",:material_id => "6",:color_id => "4",:procession_id => "7"},     
     {:id => 11, :general_shoe_id => "1",:region_id => "2",:material_id => "3",:color_id => "3",:procession_id => "2"},
     {:id => 12, :general_shoe_id => "2",:region_id => "3",:material_id => "4",:color_id => "5",:procession_id => "3"},
     {:id => 13, :general_shoe_id => "3",:region_id => "5",:material_id => "6",:color_id => "6",:procession_id => "5"},
     {:id => 14, :general_shoe_id => "4",:region_id => "1",:material_id => "8",:color_id => "8",:procession_id => "8"},
     {:id => 15, :general_shoe_id => "5",:region_id => "6",:material_id => "9",:color_id => "9",:procession_id => "9"},
     {:id => 16, :general_shoe_id => "6",:region_id => "11",:material_id => "10",:color_id => "10",:procession_id => "11"},
     {:id => 17, :general_shoe_id => "7",:region_id => "10",:material_id => "11",:color_id => "11",:procession_id => "1"},
     {:id => 18, :general_shoe_id => "8",:region_id => "9",:material_id => "1",:color_id => "12",:procession_id => "10"},
     {:id => 19, :general_shoe_id => "9",:region_id => "2",:material_id => "13",:color_id => "3",:procession_id => "10"},
     {:id => 20, :general_shoe_id => "10",:region_id => "3",:material_id => "3",:color_id => "5",:procession_id => "1"},
     {:id => 21, :general_shoe_id => "1",:region_id => "6",:material_id => "2",:color_id => "6",:procession_id => "8"},
     {:id => 22, :general_shoe_id => "2",:region_id => "3",:material_id => "16",:color_id => "6",:procession_id => "7"},
     {:id => 23, :general_shoe_id => "3",:region_id => "6",:material_id => "12",:color_id => "2",:procession_id => "6"},
     {:id => 24, :general_shoe_id => "4",:region_id => "5",:material_id => "3",:color_id => "3",:procession_id => "5"},
     {:id => 25, :general_shoe_id => "5",:region_id => "1",:material_id => "5",:color_id => "8",:procession_id => "4"},
     {:id => 26, :general_shoe_id => "6",:region_id => "1",:material_id => "6",:color_id => "10",:procession_id => "3"},
     {:id => 27, :general_shoe_id => "7",:region_id => "10",:material_id => "1",:color_id => "9",:procession_id => "2"},
     {:id => 28, :general_shoe_id => "8",:region_id => "9",:material_id => "2",:color_id => "9",:procession_id => "1"},
     {:id => 29, :general_shoe_id => "9",:region_id => "3",:material_id => "8",:color_id => "6",:procession_id => "9"},
     {:id => 30, :general_shoe_id => "10",:region_id => "1",:material_id => "8",:color_id => "4",:procession_id => "10"},
     {:id => 31, :general_shoe_id => "11",:region_id => "2",:material_id => "9",:color_id => "7",:procession_id => "1"},
     {:id => 32, :general_shoe_id => "11",:region_id => "3",:material_id => "10",:color_id => "6",:procession_id => "2"},
     {:id => 33, :general_shoe_id => "11",:region_id => "4",:material_id => "11",:color_id => "5",:procession_id => "3"},
     {:id => 34, :general_shoe_id => "12",:region_id => "5",:material_id => "10",:color_id => "4",:procession_id => "4"},
     {:id => 35, :general_shoe_id => "12",:region_id => "6",:material_id => "9",:color_id => "3",:procession_id => "5"},
     {:id => 36, :general_shoe_id => "12",:region_id => "7",:material_id => "8",:color_id => "2",:procession_id => "6"}
   ])    

   puts "创建鞋打板数据"
   PlayBoard.delete_all
   PlayBoard.create([
     {:id => 1, :general_shoe_id => "1",:custom_num => "客户1",:server_num => "客服1",:sure_board => "2012-6-8",:done_board => "2012-6-13",:communication => "阿基是傻B",:board_kind => "确认板"},
     {:id => 2, :general_shoe_id => "2",:custom_num => "客户1",:server_num => "客服1",:sure_board => "2012-6-16",:done_board => "2012-6-20",:communication => "阿基是傻B",:board_kind => "开发板"},
     {:id => 3, :general_shoe_id => "3",:custom_num => "客户2",:server_num => "客服1",:sure_board => "2012-7-2",:done_board => "2012-7-5",:communication => "阿基是傻B",:board_kind => "确认板"},
     {:id => 4, :general_shoe_id => "4",:custom_num => "客户2",:server_num => "客服1",:sure_board => "2012-7-25",:done_board => "2012-7-29",:communication => "阿基是傻B",:board_kind => "开发板"},
     {:id => 5, :general_shoe_id => "5",:custom_num => "客户2",:server_num => "客服2",:sure_board => "2012-8-8",:done_board => "2012-8-9",:communication => "阿基是傻B",:board_kind => "确认板"},
     {:id => 6, :general_shoe_id => "6",:custom_num => "客户1",:server_num => "客服1",:sure_board => "2012-6-8",:done_board => "2012-6-13",:communication => "阿基是傻B",:board_kind => "开发板"},
     {:id => 7, :general_shoe_id => "7",:custom_num => "客户1",:server_num => "客服1",:sure_board => "2012-6-16",:done_board => "2012-6-20",:communication => "阿基是傻B",:board_kind => "开发板"},
     {:id => 8, :general_shoe_id => "8",:custom_num => "客户2",:server_num => "客服1",:sure_board => "2012-7-2",:done_board => "2012-7-5",:communication => "阿基是傻B",:board_kind => "开发板"},
     {:id => 9, :general_shoe_id => "9",:custom_num => "客户2",:server_num => "客服1",:sure_board => "2012-7-25",:done_board => "2012-7-29",:communication => "阿基是傻B",:board_kind => "开发板"},
     {:id => 10, :general_shoe_id => "10",:custom_num => "客户2",:server_num => "客服2",:sure_board => "2012-8-6",:done_board => "2012-8-7",:communication => "阿基是傻B",:board_kind => "开发板"},    
     {:id => 11, :general_shoe_id => "11",:custom_num => "客户3",:server_num => "客服2",:sure_board => "2012-8-1",:done_board => "2012-8-2",:communication => "阿基是傻B",:board_kind => "开发板"},  
     {:id => 12, :general_shoe_id => "12",:custom_num => "客户3",:server_num => "客服2",:sure_board => "2012-8-1",:done_board => "2012-8-2",:communication => "阿基是傻B",:board_kind => "开发板"},  
   ])  

   puts "创建码号与数量数据"
   SizeOfShoe.delete_all
   SizeOfShoe.create([
     {:id => 1, :general_shoe_id => "1",:size => "36",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 2, :general_shoe_id => "2",:size => "36",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 3, :general_shoe_id => "3",:size => "36",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 4, :general_shoe_id => "4",:size => "36",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 5, :general_shoe_id => "5",:size => "36",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 6, :general_shoe_id => "6",:size => "36",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 7, :general_shoe_id => "7",:size => "36",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 8, :general_shoe_id => "8",:size => "36",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 9, :general_shoe_id => "9",:size => "36",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 10, :general_shoe_id => "10",:size => "36",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 11, :general_shoe_id => "11",:size => "36",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 12, :general_shoe_id => "12",:size => "36",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 13, :general_shoe_id => "1",:size => "37",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 14, :general_shoe_id => "2",:size => "37",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 15, :general_shoe_id => "3",:size => "37",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 16, :general_shoe_id => "4",:size => "37",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 17, :general_shoe_id => "5",:size => "37",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 18, :general_shoe_id => "6",:size => "37",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 19, :general_shoe_id => "7",:size => "37",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 20, :general_shoe_id => "8",:size => "37",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 21, :general_shoe_id => "9",:size => "37",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 22, :general_shoe_id => "10",:size => "37",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 23, :general_shoe_id => "11",:size => "37",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 24, :general_shoe_id => "12",:size => "37",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 25, :general_shoe_id => "1",:size => "38",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 26, :general_shoe_id => "2",:size => "38",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 27, :general_shoe_id => "3",:size => "38",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 28, :general_shoe_id => "4",:size => "38",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 29, :general_shoe_id => "5",:size => "38",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 30, :general_shoe_id => "6",:size => "38",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 31, :general_shoe_id => "7",:size => "38",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 32, :general_shoe_id => "8",:size => "38",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 33, :general_shoe_id => "9",:size => "38",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 34, :general_shoe_id => "10",:size => "38",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 35, :general_shoe_id => "11",:size => "38",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
     {:id => 36, :general_shoe_id => "12",:size => "38",:necessary_num => "500",:finished_num => "",:store_remaining => ""},
   ])

   puts "创建入库与出库数据"
   InboundAndOutbound.delete_all
   InboundAndOutbound.create([
     {:id => 1, :size_of_shoe_id => "1",:size => "36",:inbound_num => "200",:outbound_num => "0",:inbound_and_outbound_date => "2012-8-8"},
     {:id => 2, :size_of_shoe_id => "1",:size => "36",:inbound_num => "300",:outbound_num => "500",:inbound_and_outbound_date => "2012-8-9"},
     {:id => 3, :size_of_shoe_id => "1",:size => "37",:inbound_num => "180",:outbound_num => "0",:inbound_and_outbound_date => "2012-8-8"},
     {:id => 4, :size_of_shoe_id => "1",:size => "37",:inbound_num => "220",:outbound_num => "500",:inbound_and_outbound_date => "2012-8-9"},
     {:id => 5, :size_of_shoe_id => "1",:size => "38",:inbound_num => "200",:outbound_num => "200",:inbound_and_outbound_date => "2012-8-8"},
     {:id => 6, :size_of_shoe_id => "1",:size => "38",:inbound_num => "300",:outbound_num => "300",:inbound_and_outbound_date => "2012-8-9"},
     {:id => 7, :size_of_shoe_id => "2",:size => "36",:inbound_num => "0",:outbound_num => "0",:inbound_and_outbound_date => "2012-8-8"},
     {:id => 8, :size_of_shoe_id => "2",:size => "36",:inbound_num => "500",:outbound_num => "500",:inbound_and_outbound_date => "2012-8-9"},
     {:id => 9, :size_of_shoe_id => "2",:size => "37",:inbound_num => "120",:outbound_num => "20",:inbound_and_outbound_date => "2012-8-8"},
     {:id => 10, :size_of_shoe_id => "2",:size => "37",:inbound_num => "380",:outbound_num => "480",:inbound_and_outbound_date => "2012-8-9"},
     {:id => 11, :size_of_shoe_id => "2",:size => "38",:inbound_num => "200",:outbound_num => "100",:inbound_and_outbound_date => "2012-8-8"},
     {:id => 12, :size_of_shoe_id => "2",:size => "38",:inbound_num => "300",:outbound_num => "400",:inbound_and_outbound_date => "2012-8-9"},
     {:id => 13, :size_of_shoe_id => "3",:size => "36",:inbound_num => "200",:outbound_num => "0",:inbound_and_outbound_date => "2012-8-10"},
     {:id => 14, :size_of_shoe_id => "3",:size => "36",:inbound_num => "300",:outbound_num => "500",:inbound_and_outbound_date => "2012-8-11"},
     {:id => 15, :size_of_shoe_id => "3",:size => "37",:inbound_num => "180",:outbound_num => "0",:inbound_and_outbound_date => "2012-8-10"},
     {:id => 16, :size_of_shoe_id => "3",:size => "37",:inbound_num => "220",:outbound_num => "500",:inbound_and_outbound_date => "2012-8-11"},
     {:id => 17, :size_of_shoe_id => "3",:size => "38",:inbound_num => "200",:outbound_num => "200",:inbound_and_outbound_date => "2012-8-10"},
     {:id => 18, :size_of_shoe_id => "3",:size => "38",:inbound_num => "300",:outbound_num => "300",:inbound_and_outbound_date => "2012-8-11"},
     {:id => 19, :size_of_shoe_id => "4",:size => "36",:inbound_num => "0",:outbound_num => "0",:inbound_and_outbound_date => "2012-8-10"},
     {:id => 20, :size_of_shoe_id => "4",:size => "36",:inbound_num => "500",:outbound_num => "500",:inbound_and_outbound_date => "2012-8-11"},
     {:id => 21, :size_of_shoe_id => "4",:size => "37",:inbound_num => "120",:outbound_num => "20",:inbound_and_outbound_date => "2012-8-10"},
     {:id => 22, :size_of_shoe_id => "4",:size => "37",:inbound_num => "380",:outbound_num => "480",:inbound_and_outbound_date => "2012-8-11"},
     {:id => 23, :size_of_shoe_id => "4",:size => "38",:inbound_num => "200",:outbound_num => "100",:inbound_and_outbound_date => "2012-8-10"},
     {:id => 24, :size_of_shoe_id => "4",:size => "38",:inbound_num => "300",:outbound_num => "400",:inbound_and_outbound_date => "2012-8-11"},     
     {:id => 25, :size_of_shoe_id => "5",:size => "36",:inbound_num => "200",:outbound_num => "0",:inbound_and_outbound_date => "2012-8-8"},
     {:id => 26, :size_of_shoe_id => "5",:size => "36",:inbound_num => "300",:outbound_num => "500",:inbound_and_outbound_date => "2012-8-9"},
     {:id => 27, :size_of_shoe_id => "5",:size => "37",:inbound_num => "180",:outbound_num => "0",:inbound_and_outbound_date => "2012-8-8"},
     {:id => 28, :size_of_shoe_id => "5",:size => "37",:inbound_num => "220",:outbound_num => "500",:inbound_and_outbound_date => "2012-8-9"},
     {:id => 29, :size_of_shoe_id => "5",:size => "38",:inbound_num => "200",:outbound_num => "200",:inbound_and_outbound_date => "2012-8-8"},
     {:id => 30, :size_of_shoe_id => "5",:size => "38",:inbound_num => "300",:outbound_num => "300",:inbound_and_outbound_date => "2012-8-9"},
     {:id => 31, :size_of_shoe_id => "6",:size => "36",:inbound_num => "0",:outbound_num => "0",:inbound_and_outbound_date => "2012-8-8"},
     {:id => 32, :size_of_shoe_id => "6",:size => "36",:inbound_num => "500",:outbound_num => "500",:inbound_and_outbound_date => "2012-8-9"},
     {:id => 33, :size_of_shoe_id => "6",:size => "37",:inbound_num => "120",:outbound_num => "20",:inbound_and_outbound_date => "2012-8-8"},
     {:id => 34, :size_of_shoe_id => "6",:size => "37",:inbound_num => "380",:outbound_num => "480",:inbound_and_outbound_date => "2012-8-9"},
     {:id => 35, :size_of_shoe_id => "6",:size => "38",:inbound_num => "200",:outbound_num => "100",:inbound_and_outbound_date => "2012-8-8"},
     {:id => 36, :size_of_shoe_id => "6",:size => "38",:inbound_num => "300",:outbound_num => "400",:inbound_and_outbound_date => "2012-8-9"},
     {:id => 37, :size_of_shoe_id => "7",:size => "36",:inbound_num => "200",:outbound_num => "0",:inbound_and_outbound_date => "2012-8-10"},
     {:id => 38, :size_of_shoe_id => "7",:size => "36",:inbound_num => "300",:outbound_num => "500",:inbound_and_outbound_date => "2012-8-11"},
     {:id => 39, :size_of_shoe_id => "7",:size => "37",:inbound_num => "180",:outbound_num => "0",:inbound_and_outbound_date => "2012-8-10"},
     {:id => 40, :size_of_shoe_id => "7",:size => "37",:inbound_num => "220",:outbound_num => "500",:inbound_and_outbound_date => "2012-8-11"},
     {:id => 41, :size_of_shoe_id => "7",:size => "38",:inbound_num => "200",:outbound_num => "200",:inbound_and_outbound_date => "2012-8-10"},
     {:id => 42, :size_of_shoe_id => "7",:size => "38",:inbound_num => "300",:outbound_num => "300",:inbound_and_outbound_date => "2012-8-11"},
     {:id => 43, :size_of_shoe_id => "8",:size => "36",:inbound_num => "0",:outbound_num => "0",:inbound_and_outbound_date => "2012-8-10"},
     {:id => 44, :size_of_shoe_id => "8",:size => "36",:inbound_num => "500",:outbound_num => "500",:inbound_and_outbound_date => "2012-8-11"},
     {:id => 45, :size_of_shoe_id => "8",:size => "37",:inbound_num => "120",:outbound_num => "20",:inbound_and_outbound_date => "2012-8-10"},
     {:id => 46, :size_of_shoe_id => "8",:size => "37",:inbound_num => "380",:outbound_num => "480",:inbound_and_outbound_date => "2012-8-11"},
     {:id => 47, :size_of_shoe_id => "8",:size => "38",:inbound_num => "200",:outbound_num => "100",:inbound_and_outbound_date => "2012-8-10"},
     {:id => 48, :size_of_shoe_id => "8",:size => "38",:inbound_num => "300",:outbound_num => "400",:inbound_and_outbound_date => "2012-8-11"}, 
     {:id => 49, :size_of_shoe_id => "9",:size => "36",:inbound_num => "200",:outbound_num => "0",:inbound_and_outbound_date => "2012-8-9"},
     {:id => 50, :size_of_shoe_id => "9",:size => "36",:inbound_num => "300",:outbound_num => "500",:inbound_and_outbound_date => "2012-8-10"},
     {:id => 51, :size_of_shoe_id => "9",:size => "37",:inbound_num => "180",:outbound_num => "0",:inbound_and_outbound_date => "2012-8-9"},
     {:id => 52, :size_of_shoe_id => "9",:size => "37",:inbound_num => "220",:outbound_num => "500",:inbound_and_outbound_date => "2012-8-10"},
     {:id => 53, :size_of_shoe_id => "9",:size => "38",:inbound_num => "200",:outbound_num => "200",:inbound_and_outbound_date => "2012-8-9"},
     {:id => 54, :size_of_shoe_id => "9",:size => "38",:inbound_num => "300",:outbound_num => "300",:inbound_and_outbound_date => "2012-8-10"},
     {:id => 55, :size_of_shoe_id => "10",:size => "36",:inbound_num => "0",:outbound_num => "0",:inbound_and_outbound_date => "2012-8-9"},
     {:id => 56, :size_of_shoe_id => "10",:size => "36",:inbound_num => "500",:outbound_num => "500",:inbound_and_outbound_date => "2012-8-10"},
     {:id => 57, :size_of_shoe_id => "10",:size => "37",:inbound_num => "120",:outbound_num => "20",:inbound_and_outbound_date => "2012-8-9"},
     {:id => 58, :size_of_shoe_id => "10",:size => "37",:inbound_num => "380",:outbound_num => "480",:inbound_and_outbound_date => "2012-8-10"},
     {:id => 59, :size_of_shoe_id => "10",:size => "38",:inbound_num => "200",:outbound_num => "100",:inbound_and_outbound_date => "2012-8-9"},
     {:id => 60, :size_of_shoe_id => "10",:size => "38",:inbound_num => "300",:outbound_num => "400",:inbound_and_outbound_date => "2012-8-10"}   
   ])  
  end
end
