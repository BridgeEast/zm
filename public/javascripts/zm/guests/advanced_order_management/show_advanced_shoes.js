Zm.guests.show_advanced_shoes = { 
  init:function(){ 
    this.select_advanced_id;
    var cm = new Ext.grid.ColumnModel([
        { header:'鞋号',dataIndex:'shoes_id' },
        { header:'鞋型',dataIndex:'types_of_shoes' },
        { header:'适合人群',dataIndex:'suitable_people' },
        { header:'颜色',dataIndex:'colors' },
        { header:'价格',dataIndex:'price' },
        { header:'备注',dataIndex:'remark' }
        ]);

    var store = new Ext.data.JsonStore({ 
      url:'/guests/get_advanced_order_shoes.json',
      fields:['id','shoes_id','types_of_shoes','suitable_people','colors','price','remark', 'photo_one', 'photo_two'],
      method:'post',
      baseParams:{ 
        id:Zm.guests.advanced_order_management.select_id
      },
        root:'advanced_order_shoes',
        autoLoad:true
    });

    var advancedordershoesGrid = new Ext.grid.GridPanel({ 
      id:'advancedordershoesGrid',
      region:'center',
      height:360,
      autoScroll:true,
      locaMask:true,
      stripeRows:true,
      frame:true,
             trackMouseOver:true,
         viewConfig:{ forceFit:true },
         store:store,
         cm:cm,
         tbar:this.gridTbar1(),
         bbar:new Ext.PagingToolbar({ 
           pageSize:10,
           store:store,
           displayInfo:true,
           displayMsg:'显示第{ 0 }条到{ 1 }条记录，一共{ 2 }条',
           emptyMsg:"没有记录"
         })
    });
    
    
      var contextmenu = new Ext.menu.Menu({ 
       items:[{ 
           text:'鞋子详情',
           scope:this,
           handler:function(){ 
             this.select_advanced_id= Ext.getCmp('advancedordershoesGrid').getSelectionModel().getSelected().data["id"];
              Zm.guests.check_advanced_detail.init().show();
           }
         }]
       }); 

      advancedordershoesGrid.on("rowcontextmenu",function(grid,rowIndex,e){ 
           e.preventDefault();
           grid.getSelectionModel().selectRow(rowIndex);
           contextmenu.showAt(e.getXY());
        });

      check_detail = new Ext.Window({ 
      layout:'border',
      closeAction:'hide',
      height:600,
      width:500,
      constrainHeader:true,
      resizable:false,
      items:[advancedordershoesGrid]
     });
      return check_detail
  },

   gridTbar1:function(){ 
   return new Ext.Toolbar({ 
    defaults:{ 
     scope:this
    },
   items:[{ 
    id:'DeleteChosesShoes',
    text:'删除所选的鞋',
    hidden:true,
    handler:function(){ this.DeleteChosesShoes() }
   },{ 
    id:'AddOrherShoes',
    text:'增加新鞋',
    hidden:true,
   }]
   });
  },

   DeleteChosesShoes:function(){ 
    var id = Ext.getCmp('advancedordershoesGrid').getSelectionModel().getSelected().data["shoes_id"];
    Ext.Ajax.request({ 
      jsonData:{ choses_delete_id:id },
     url:'/guests/delete_shoes',
     method:'post',
     success:function(){ 
      Ext.getCmp('advancedordershoesGrid').store.load();
      Ext.Msg.alert('删除','删除成功!');
     },
     failure:function(){ 
      Ext.Msg.alert('删除','删除失败!');
     },
   });
   }
}

