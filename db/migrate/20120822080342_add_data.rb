class AddData < ActiveRecord::Migration
  def self.up
  #  Region.delete_all
  #  Region.create([
  #  {:id => 1, :region => "里料",:remark => '',:date => "2012-8-22"},
  #  {:id => 2, :region => "内里",:remark => '',:date => "2012-8-22"},
  #  {:id => 3, :region => "大底",:remark => '',:date => "2012-8-22"},
  #  {:id => 4, :region => "鞋垫",:remark => '',:date => "2012-8-22"},
  #  {:id => 5, :region => "后套里",:remark => '',:date => "2012-8-22"},
  #  {:id => 6, :region => "鞋带内里",:remark => '',:date => "2012-8-22"},
  #  {:id => 7, :region => "线圈",:remark => '',:date => "2012-8-22"},
  #  {:id => 8, :region => "毛刺",:remark => '',:date => "2012-8-22"},
  #  {:id => 9, :region => "铆钉",:remark => '',:date => "2012-8-22"},
  #  {:id => 10, :region => "车线",:remark => '',:date => "2012-8-22"},
  #  {:id => 11, :region => "Sock Logo",:remark => '',:date => "2012-8-22"}
  #  ])
  # Material.delete_all
  # Material.create([
  #  {:id => 1, :region => "PVC鞋底",:remark => "",:date => "2012-8-22"},
  #  {:id => 2, :region => "PU鞋底",:remark => '',:date => "2012-8-22"},
  #  {:id => 3, :region => "牛巴",:remark => '',:date => "2012-8-22"},
  #  {:id => 4, :region => "超细纤维",:remark => '',:date => "2012-8-22"},
  #  {:id => 5, :region => "天然皮",:remark => '',:date => "2012-8-22"},
  #  {:id => 6, :region => "网布",:remark => '',:date => "2012-8-22"},
  #  {:id => 7, :region => "RB鞋底",:remark => '',:date => "2012-8-22"},
  #  {:id => 8, :region => "TPR鞋底",:remark => '',:date => "2012-8-22"},
  #  {:id => 9, :region => "EVA鞋底",:remark => '',:date => "2012-8-22"},
  #  {:id => 10, :region => "MD鞋底",:remark => '',:date => "2012-8-22"},
  #  {:id => 11, :region => "组合鞋底",:remark => '',:date => "2012-8-22"},
  #  {:id => 12, :region => "牛皮革",:remark => "",:date => "2012-8-22"},
  #  {:id => 13, :region => "猪皮革",:remark => '',:date => "2012-8-22"},
  #  {:id => 14, :region => "羊皮革",:remark => '',:date => "2012-8-22"},
  #  {:id => 15, :region => "马皮革",:remark => '',:date => "2012-8-22"},
  #  {:id => 16, :region => "驴皮革",:remark => '',:date => "2012-8-22"},
  #  {:id => 17, :region => "表皮及制品",:remark => '',:date => "2012-8-22"},
  #  {:id => 18, :region => "袋鼠皮革",:remark => '',:date => "2012-8-22"},
  #  {:id => 19, :region => "鱼皮革",:remark => '',:date => "2012-8-22"},
  #  {:id => 20, :region => "中底板",:remark => '',:date => "2012-8-22"},
  #  {:id => 21, :region => "鞋楦",:remark => '',:date => "2012-8-22"},
  #  {:id => 22, :region => "沿条",:remark => '',:date => "2012-8-22"},
  #  {:id => 23, :region => "鞋扣",:remark => "",:date => "2012-8-22"},
  #  {:id => 24, :region => "鞋撑",:remark => '',:date => "2012-8-22"},
  #  {:id => 25, :region => "鞋蜡",:remark => '',:date => "2012-8-22"},
  #  {:id => 26, :region => "帆布",:remark => '',:date => "2012-8-22"},
  #  {:id => 27, :region => "麻布",:remark => '',:date => "2012-8-22"},
  #  {:id => 28, :region => "棉布",:remark => '',:date => "2012-8-22"},
  #  {:id => 29, :region => "格子布",:remark => '',:date => "2012-8-22"},
  #  {:id => 30, :region => "尼龙布",:remark => '',:date => "2012-8-22"},
  #  {:id => 31, :region => "防水布",:remark => '',:date => "2012-8-22"},
  #  {:id => 32, :region => "弹力布",:remark => '',:date => "2012-8-22"},
  #  {:id => 33, :region => "珍珠布",:remark => '',:date => "2012-8-22"},
  #  {:id => 34, :region => "针织布",:remark => '',:date => "2012-8-22"},
  #  {:id => 35, :region => "绸缎布",:remark => '',:date => "2012-8-22"},
  #  ])
  #  Color.delete_all
  #  Color.create([
  #  {:id => 1, :region => "淡黄",:remark => "",:date => "2012-8-22"},
  #  {:id => 2, :region => "白色",:remark => '',:date => "2012-8-22"},
  #  {:id => 3, :region => "中黄",:remark => '',:date => "2012-8-22"},
  #  {:id => 4, :region => "桔黄",:remark => '',:date => "2012-8-22"},
  #  {:id => 5, :region => "桔红",:remark => '',:date => "2012-8-22"},
  #  {:id => 6, :region => "柠檬黄",:remark => '',:date => "2012-8-22"},
  #  {:id => 7, :region => "朱红",:remark => '',:date => "2012-8-22"},
  #  {:id => 8, :region => "大红",:remark => '',:date => "2012-8-22"},
  #  {:id => 9, :region => "深红",:remark => '',:date => "2012-8-22"},
  #  {:id => 10, :region => "玫瑰红",:remark => '',:date => "2012-8-22"},
  #  {:id => 11, :region => "熟褐",:remark => '',:date => "2012-8-22"},
  #  {:id => 12, :region => "草绿",:remark => "",:date => "2012-8-22"},
  #  {:id => 13, :region => "中绿",:remark => '',:date => "2012-8-22"},
  #  {:id => 14, :region => "深绿",:remark => '',:date => "2012-8-22"},
  #  {:id => 15, :region => "橄榄绿",:remark => '',:date => "2012-8-22"},
  #  {:id => 16, :region => "湖蓝",:remark => '',:date => "2012-8-22"},
  #  {:id => 17, :region => "钴蓝",:remark => '',:date => "2012-8-22"},
  #  {:id => 18, :region => "群青",:remark => '',:date => "2012-8-22"},
  #  {:id => 19, :region => "深蓝",:remark => '',:date => "2012-8-22"},
  #  {:id => 20, :region => "紫罗兰",:remark => '',:date => "2012-8-22"},
  #  {:id => 21, :region => "天蓝",:remark => '',:date => "2012-8-22"},
  #  {:id => 22, :region => "灰色",:remark => '',:date => "2012-8-22"}
  #  ])  
  #  Procession.delete_all
  #  Procession.create([
  #  {:id => 1, :region => "贴合",:remark => "",:date => "2012-8-22"},
  #  {:id => 2, :region => "裁条",:remark => '',:date => "2012-8-22"},
  #  {:id => 3, :region => "裁块",:remark => '',:date => "2012-8-22"},
  #  {:id => 4, :region => "热压",:remark => '',:date => "2012-8-22"},
  #  {:id => 5, :region => "水转印",:remark => '',:date => "2012-8-22"},
  #  {:id => 6, :region => "移印",:remark => '',:date => "2012-8-22"},
  #  {:id => 7, :region => "升华转印",:remark => '',:date => "2012-8-22"},
  #  {:id => 8, :region => "电镀",:remark => '',:date => "2012-8-22"},
  #  {:id => 9, :region => "微量射出",:remark => '',:date => "2012-8-22"},
  #  {:id => 10, :region => "TPU射",:remark => '',:date => "2012-8-22"},
  #  {:id => 11, :region => "印刷",:remark => '',:date => "2012-8-22"},
  #  {:id => 12, :region => "眼扣",:remark => '',:date => "2012-8-22"},
  #  {:id => 13, :region => "过胶",:remark => '',:date => "2012-8-22"},
  #  {:id => 14, :region => "折边",:remark => '',:date => "2012-8-22"},
  #  {:id => 15, :region => "高周波",:remark => '',:date => "2012-8-22"},
  #  {:id => 16, :region => "车翻",:remark => '',:date => "2012-8-22"},
  #  {:id => 17, :region => "喷漆",:remark => '',:date => "2012-8-22"}
  #  ])    
  end

  def self.down
  #  Region.delete_all
  #  Material.delete_all
  #  Color.delete_all
  #  Procession.delete_all
  end
end
