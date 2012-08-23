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
      {:id => 1, :region => "PVC鞋底",:remark => "",:created_date => "2012-8-22"},
      {:id => 2, :region => "PU鞋底",:remark => '',:created_date => "2012-8-22"},
      {:id => 3, :region => "牛巴",:remark => '',:created_date => "2012-8-22"},
      {:id => 4, :region => "超细纤维",:remark => '',:created_date => "2012-8-22"},
      {:id => 5, :region => "天然皮",:remark => '',:created_date => "2012-8-22"},
      {:id => 6, :region => "网布",:remark => '',:created_date => "2012-8-22"},
      {:id => 7, :region => "RB鞋底",:remark => '',:created_date => "2012-8-22"},
      {:id => 8, :region => "TPR鞋底",:remark => '',:created_date => "2012-8-22"},
      {:id => 9, :region => "EVA鞋底",:remark => '',:created_date => "2012-8-22"},
      {:id => 10, :region => "MD鞋底",:remark => '',:created_date => "2012-8-22"},
      {:id => 11, :region => "组合鞋底",:remark => '',:created_date => "2012-8-22"},
      {:id => 12, :region => "牛皮革",:remark => "",:created_date => "2012-8-22"},
      {:id => 13, :region => "猪皮革",:remark => '',:created_date => "2012-8-22"},
      {:id => 14, :region => "羊皮革",:remark => '',:created_date => "2012-8-22"},
      {:id => 15, :region => "马皮革",:remark => '',:created_date => "2012-8-22"},
      {:id => 16, :region => "驴皮革",:remark => '',:created_date => "2012-8-22"},
      {:id => 17, :region => "表皮及制品",:remark => '',:created_date => "2012-8-22"},
      {:id => 18, :region => "袋鼠皮革",:remark => '',:created_date => "2012-8-22"},
      {:id => 19, :region => "鱼皮革",:remark => '',:created_date => "2012-8-22"},
      {:id => 20, :region => "中底板",:remark => '',:created_date => "2012-8-22"},
      {:id => 21, :region => "鞋楦",:remark => '',:created_date => "2012-8-22"},
      {:id => 22, :region => "沿条",:remark => '',:created_date => "2012-8-22"},
      {:id => 23, :region => "鞋扣",:remark => "",:created_date => "2012-8-22"},
      {:id => 24, :region => "鞋撑",:remark => '',:created_date => "2012-8-22"},
      {:id => 25, :region => "鞋蜡",:remark => '',:created_date => "2012-8-22"},
      {:id => 26, :region => "帆布",:remark => '',:created_date => "2012-8-22"},
      {:id => 27, :region => "麻布",:remark => '',:created_date => "2012-8-22"},
      {:id => 28, :region => "棉布",:remark => '',:created_date => "2012-8-22"},
      {:id => 29, :region => "格子布",:remark => '',:created_date => "2012-8-22"},
      {:id => 30, :region => "尼龙布",:remark => '',:created_date => "2012-8-22"},
      {:id => 31, :region => "防水布",:remark => '',:created_date => "2012-8-22"},
      {:id => 32, :region => "弹力布",:remark => '',:created_date => "2012-8-22"},
      {:id => 33, :region => "珍珠布",:remark => '',:created_date => "2012-8-22"},
      {:id => 34, :region => "针织布",:remark => '',:created_date => "2012-8-22"},
      {:id => 35, :region => "绸缎布",:remark => '',:created_date => "2012-8-22"},
    ])
    
    puts "创建颜色基础数据"
    Color.delete_all
    Color.create([
      {:id => 1, :region => "淡黄",:remark => "",:created_date => "2012-8-22"},
      {:id => 2, :region => "白色",:remark => '',:created_date => "2012-8-22"},
      {:id => 3, :region => "中黄",:remark => '',:created_date => "2012-8-22"},
      {:id => 4, :region => "桔黄",:remark => '',:created_date => "2012-8-22"},
      {:id => 5, :region => "桔红",:remark => '',:created_date => "2012-8-22"},
      {:id => 6, :region => "柠檬黄",:remark => '',:created_date => "2012-8-22"},
      {:id => 7, :region => "朱红",:remark => '',:created_date => "2012-8-22"},
      {:id => 8, :region => "大红",:remark => '',:created_date => "2012-8-22"},
      {:id => 9, :region => "深红",:remark => '',:created_date => "2012-8-22"},
      {:id => 10, :region => "玫瑰红",:remark => '',:created_date => "2012-8-22"},
      {:id => 11, :region => "熟褐",:remark => '',:created_date => "2012-8-22"},
      {:id => 12, :region => "草绿",:remark => "",:created_date => "2012-8-22"},
      {:id => 13, :region => "中绿",:remark => '',:created_date => "2012-8-22"},
      {:id => 14, :region => "深绿",:remark => '',:created_date => "2012-8-22"},
      {:id => 15, :region => "橄榄绿",:remark => '',:created_date => "2012-8-22"},
      {:id => 16, :region => "湖蓝",:remark => '',:created_date => "2012-8-22"},
      {:id => 17, :region => "钴蓝",:remark => '',:created_date => "2012-8-22"},
      {:id => 18, :region => "群青",:remark => '',:created_date => "2012-8-22"},
      {:id => 19, :region => "深蓝",:remark => '',:created_date => "2012-8-22"},
      {:id => 20, :region => "紫罗兰",:remark => '',:created_date => "2012-8-22"},
      {:id => 21, :region => "天蓝",:remark => '',:created_date => "2012-8-22"},
      {:id => 22, :region => "灰色",:remark => '',:created_date => "2012-8-22"}
   ])  

   puts "创建进度基础数据"
   Procession.delete_all
   Procession.create([
     {:id => 1, :region => "贴合",:remark => "",:created_date => "2012-8-22"},
     {:id => 2, :region => "裁条",:remark => '',:created_date => "2012-8-22"},
     {:id => 3, :region => "裁块",:remark => '',:created_date => "2012-8-22"},
     {:id => 4, :region => "热压",:remark => '',:created_date => "2012-8-22"},
     {:id => 5, :region => "水转印",:remark => '',:created_date => "2012-8-22"},
     {:id => 6, :region => "移印",:remark => '',:created_date => "2012-8-22"},
     {:id => 7, :region => "升华转印",:remark => '',:created_date => "2012-8-22"},
     {:id => 8, :region => "电镀",:remark => '',:created_date => "2012-8-22"},
     {:id => 9, :region => "微量射出",:remark => '',:created_date => "2012-8-22"},
     {:id => 10, :region => "TPU射",:remark => '',:created_date => "2012-8-22"},
     {:id => 11, :region => "印刷",:remark => '',:created_date => "2012-8-22"},
     {:id => 12, :region => "眼扣",:remark => '',:created_date => "2012-8-22"},
     {:id => 13, :region => "过胶",:remark => '',:created_date => "2012-8-22"},
     {:id => 14, :region => "折边",:remark => '',:created_date => "2012-8-22"},
     {:id => 15, :region => "高周波",:remark => '',:created_date => "2012-8-22"},
     {:id => 16, :region => "车翻",:remark => '',:created_date => "2012-8-22"},
     {:id => 17, :region => "喷漆",:remark => '',:created_date => "2012-8-22"}
   ])    
   
  end
end
