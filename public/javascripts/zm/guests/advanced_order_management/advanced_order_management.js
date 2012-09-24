Zm.guests.advanced_order_management = { 
  init:function(){
    this.select_advanced_order_id;
    Zm.pages.ViewPort = { 
      layout:'border',
      region:'center',
      items:[{ 
       region:'north',
       title:'客户-预购单管理'
      },
      this.advancedGrid(),this.tree()]
    };
  },

  advancedGrid:function(){ 
   var cm = new Ext.grid.ColumnModel([
     new Ext.grid.RowNumberer(),
     { header:'预购单号',dataIndex:'advanced_order_id' },
     { header:'鞋数量',dataIndex:'custom_mun' },
     { header:'总价',dataIndex:'total_price' },
     { header:'付款',dataIndex:'pay' },
     { header:'采购日期',dataIndex:'advanced_order_date' },
     { header:'备注',dataIndex:'remark' }
     ]);
     
   store = new Ext.data.JsonStore({ 
    url:'/guests/get_advanced_orders.json',
    fields:['id','advanced_order_id','custom_num','total_price','advanced_order_date','remark'],
    root:'advancedorders',
    autoLoad:false
   });

   var advancedGrid = new Ext.grid.GridPanel({ 
     id:'advancedGrid',
     region:'center',
     height:720,
     width:1500,
     autoScroll:true,
     cm:cm,
     store:store,
     viewConfig:{ forceFit: true },
     tbar:this.gridTbar()
   });

   var contextmenu = new Ext.menu.Menu({ 
     id:'contextmenu',
     items:[{ 
      id:'CheckDetail',
      text:'查看并修改鞋',
      scope:this,
      handler:function(){ 
        this.select_id = Ext.getCmp('advancedGrid').getSelectionModel().getSelected().data["id"];
         Zm.guests.show_advanced_shoes.init().show();
         Ext.getCmp('DeleteChosesShoes').show();
         Ext.getCmp('AddOrherShoes').show();
      }
     },{ 
      id:'Checkmun',
      text:'查看并修改数量',
     },{ 
      id:'CheckShoes',
      text:'查看详情',
      scope:this,
      handler:function(){ 
         this.select_id = Ext.getCmp('advancedGrid').getSelectionModel().getSelected().data["id"];
         Zm.guests.show_advanced_shoes.init().show();
       }
     },{ 
      id:'Checkprogress',
      text:'查看进度',
      scope:this,
      handler:function(){ 
       this.select_id = Ext.getCmp('advancedGrid').getSelectionModel().getSelected().data["id"];
       Zm.guests.progress_of_shoes.init().show();
      }
     }]
   });
    
    advancedGrid.on("rowcontextmenu",function(grid,rowIndex,e){ 
           e.preventDefault();
           grid.getSelectionModel().selectRow(rowIndex);
           contextmenu.showAt(e.getXY());
         });

         return advancedGrid

},

  gridTbar:function(){ 
    return new Ext.Toolbar({ 
     defaults:{ 
      scope:this
     },
    items:[{
     id:'DeleteChoses',
     text:'删除所选',
     hidden:true,
     handler:function(){ this.DeleteChoses() }
    },
    { id:'sendadvancedorder',
      text:'发送预购单',
      hidden:true,
      handler:function(){ this.sendadvancedorder() }
    },{ 
      id:'changeorder',
      text:'预购单成订单',
      hidden:true,
      handler:function(){ this.changeorder() },      
    }]
    });
  },

  DeleteChoses:function(){ 
   var id = Ext.getCmp('advancedGrid').getSelectionModel().getSelected().data["advanced_order_id"];
   Ext.Ajax.request({ 
     jsonData:{ choses_id:id },
     url:'/guests/delete_orders',
     method:'post',
     success:function(){ 
      Ext.getCmp('advancedGrid').store.load();
      Ext.Msg.alert('删除','删除成功!');
     },
     failure:function(){ 
      Ext.Msg.alert('删除','删除失败!');
     },
   });
  },

  sendadvancedorder:function(){ 
   var id = Ext.getCmp('advancedGrid').getSelectionModel().getSelected().data["advanced_order_id"];
   Ext.Ajax.request({ 
     jsonData:{ choses_send_id:id },
     url:'/guests/send_orders',
     method:'post',
     success:function(){ 
      Ext.getCmp('advancedGrid').store.load();
      Ext.Msg.alert('发送','发送成功!');
     },
     failure:function(){ 
      Ext.Msg.alert('发送','发送失败!');
     },
   });
  },

 tree:function(){ 
   var tree = new Ext.tree.TreePanel({ 
    width:140,
    region:'west',
    root:advancedorderroot,
    autoScroll:true,
   });

   var advancedorderroot = new Ext.tree.TreeNode({ 
    text:'全部预购单',
    id:'0',
   });

   var time = new Date();
   var nowyear = time.getFullYear();
   var nowmonth = time.getMonth();
   for(var i = nowyear;i > nowyear-3;i--)
   { 
     var year = new Ext.tree.TreeNode({ text:i })
       advancedorderroot.appendChild(year);
     if(i == nowyear)
      { var a = nowmonth +1 }
     else
     { a = 12 }
     for(var b=a;b>0;b--){  
     var month = new Ext.tree.AsyncTreeNode({ 
      text:b + '月',
      id:b,
      children:[
     { text:'待定',leaf:true },
     { text:'进行中',leaf:true }
       ]
     });
     year.appendChild(month);
   }
   };
     tree.setRootNode(advancedorderroot);
     tree.on('click',function(node){ 
      if(node.leaf){ 
       var years = node.parentNode.parentNode.text.toString();
       var months = node.parentNode.id.toString();
       //var types = node.text;
       if(node.text == '待定')
     {  store.proxy = new Ext.data.HttpProxy({ 
         url:'/guests/get_ready_data.json',
         method:'post',
         jsonData:{ 
          selectYear:years,
          selectMonth:months,
     //     selectType:types
         }
       }),
       Ext.getCmp('DeleteChoses').show()
       Ext.getCmp('sendadvancedorder').show()
       Ext.getCmp('changeorder').hide()
       Ext.getCmp('CheckDetail').show()
       Ext.getCmp('Checkmun').show()
       Ext.getCmp('CheckShoes').hide()
       Ext.getCmp('Checkprogress').hide()
       store.reload()
     }
       else
     { store.proxy = new Ext.data.HttpProxy({ 
        url:'/guests/get_making_data.json',
        method:'post',
        jsonData:{ 
         selectYear:years,
         selectMonth:months,
       //  selectType:types
        }
      }),
      
       Ext.getCmp('DeleteChoses').hide()
       Ext.getCmp('sendadvancedorder').hide()
       Ext.getCmp('changeorder').show()
        Ext.getCmp('CheckDetail').hide()
       Ext.getCmp('Checkmun').hide()
       Ext.getCmp('CheckShoes').show()
       Ext.getCmp('Checkprogress').show()
       store.reload()
     }
      }
     })
    return tree
    }
 };
