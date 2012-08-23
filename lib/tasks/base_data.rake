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
      {:id => 11, :region => "Sock Logo",:remark => '',:created_date => "2012-8-22"}
    ])
    
    puts "创建物料基础数据"
    Material.delete_all
    Material.create([
      {:id => 1, :material => "PVC鞋底",:remark => "",:created_date => "2012-8-22"},
      {:id => 2, :material => "PU鞋底",:remark => '',:created_date => "2012-8-22"},
      {:id => 3, :material => "牛巴",:remark => '',:created_date => "2012-8-22"},
      {:id => 4, :material => "超细纤维",:remark => '',:created_date => "2012-8-22"},
      {:id => 5, :material => "天然皮",:remark => '',:created_date => "2012-8-22"},
      {:id => 6, :material => "网布",:remark => '',:created_date => "2012-8-22"},
      {:id => 7, :material => "RB鞋底",:remark => '',:created_date => "2012-8-22"},
      {:id => 8, :material => "TPR鞋底",:remark => '',:created_date => "2012-8-22"},
      {:id => 9, :material => "EVA鞋底",:remark => '',:created_date => "2012-8-22"},
      {:id => 10, :material => "MD鞋底",:remark => '',:created_date => "2012-8-22"},
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

   puts "创建进度基础数据"
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
   
  end
end
