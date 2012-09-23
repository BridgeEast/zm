Zm.services.advanced_order_management={ 
  init:function(){ 
     this.select_advanced_orders_id;
     Zm.pages.ViewPort={ 
       layout:'border',
       region:'center',
       items:[{ 
          region:'north',
          title:'客服-预购单管理'
       },
         this.advancedorderGrid(),this.tree()]
     };
  },

  advancedorderGrid:function(){ 
    var cm = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),
        { header:'预购单',dataIndex:'advanced_order_id' },
        { header:'客户',dataIndex:'custom_num' },
        { header:'鞋子数量',dataIndex:'' },
        { header:'总价',dataIndex:'total_price' },
        { header:'付款情况',dataIndex:'' },
        { header:'采购日期',dataIndex:'advanced_order_date' },
        { header:'备注',dataIndex:'remark' },
        ]);

    advancedorderstore = new Ext.data.JsonStore({ 
      url:'/services/get_advanced_orders.json',
      fields:['id','advanced_order_id','custom_num','total_price','advanced_order_date','remark'],
       root:'advancedorders',
       autoLoad:true
    });

    var advancedorderGrid = new Ext.grid.GridPanel({ 
      id:'advancedorderGrid',
      region:'center',
      height:720,
      width:1500,
      autoScroll:true,
      cm:cm,
      store:advancedorderstore,
      viewConfig:{ forceFit:true },
    });

    var contextmenu = new Ext.menu.Menu({ 
      items:[{ 
          text:'查看鞋子',
          scope:this,
          handler:function(){ 
           this.select_advanced_orders_id = Ext.getCmp('advancedorderGrid').getSelectionModel().getSelected().data["advanced_order_id"];
           Zm.services.advanced_order_shoes.init().show();
          }
      },{ 
          text:'修改付款情况',
          scope:this,
          handler:function(){  }
      },{ 
          text:'查看预购单进度',
          scope:this,
          handler:function(){ 
           this.select_advanced_orders_id = Ext.getCmp('advancedorderGrid').getSelectionModel().getSelected().data["advanced_order_id"];
           Zm.services.advanced_order_speed.init().show();
          }    
      }
            ]
    });

    advancedorderGrid.on("rowcontextmenu",function(grid,rowIndex,e){ 
      e.preventDefault();
      grid.getSelectionModel().selectRow(rowIndex);
      contextmenu.showAt(e.getXY());
    });

    return advancedorderGrid
   },

  tree:function(){ 
    var ordertree = new Ext.tree.TreePanel({ 
      width:140,
      region:'west',
      root:orderroot,
      autoScroll:true,
    });

    var orderroot = new Ext.tree.TreeNode({ 
      text:'全部预购单',
    });

    var time = new Date();//获取系统时间
    var nowyear = time.getFullYear();//获取系统时间的年
    var nowmonth = time.getMonth();//获取系统时间的月
    for (var i = nowyear; i >nowyear -3;i--)
    { 
      var year = new Ext.tree.TreeNode({ text: i });
      orderroot.appendChild(year);
      if(i == nowyear)
      { var month = nowmonth +1 }
      else
      { month = 12 }
        for( var a = month; a>0; a--)
        { var months = new Ext.tree.TreeNode({ text: a +'月',id: a,leaf:true });
        year.appendChild(months);
        }
    };
    ordertree.setRootNode(orderroot);
    ordertree.on('click',function(node){ 
      if(node.leaf){ 
       var years = node.parentNode.text.toString();// 转换成字段
       var ordermonths = node.id.toString();
      advancedorderstore.proxy = new Ext.data.HttpProxy({ 
        url:'/services/get_advanced_order_data.json',
        method:'post',
        jsonData:{ 
          selectadvancedorderyear:years,
          selectadvancedordermonth:ordermonths,
        }
      }),
      advancedorderstore.reload()
      }
    })
    return ordertree
  }
};
