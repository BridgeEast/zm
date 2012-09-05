Zm.services.guest_order_detail={ 
   init:function(){ 
     this.select_id;
     var cm = new Ext.grid.ColumnModel([
         { header:'鞋号',dataIndex:'shoes_id' },
         { header:'鞋型',dataIndex:'types_of_shoes' },
         { header:'适合人群',dataIndex:'suitable_people' },
         { header:'颜色',dataIndex:'colors' },
         { header:'价格',dataIndex:'price' },
         { header:'备注',dataIndex:'remark' }
         ]);

     var store = new Ext.data.JsonStore({ 
       url:'/services/get_order_shoes_detail.json',
       fields:['id','shoes_id','types_of_shoes','suitable_people','colors','price','remark', 'photo_one', 'photo_two'],
       method:'post',
       baseParams:{ 
         id:Zm.services.guest_order_management.select_id
       },
         root:'order_shoes_detail',
         autoLoad:true
     });

     var orderdetailGrid = new Ext.grid.GridPanel({ 
       id:'orderdetailGrid',
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
         bbar:new Ext.PagingToolbar({ 
           pageSize:10,
           store:store,
           displayInfo:true,
           displayMsg:'显示第{ 0 }条到{ 1 }条记录，一共{ 2 }条',
           emptyMsg:"没有记录"
         })
     });

      var contextmenu1 = new Ext.menu.Menu({ 
       items:[{ 
           text:'鞋子详情',
           scope:this,
           handler:function(){ 
             this.select_id= Ext.getCmp('orderdetailGrid').getSelectionModel().getSelected().data["id"];
             Zm.services.order_detail.init().show();
           }
       },{ text:'与客户交谈'},
          { text:'下载合同'},
         { text:'查看合同'}]
     }); 

      orderdetailGrid.on("rowcontextmenu",function(grid,rowIndex,e){ 
           e.preventDefault();
           grid.getSelectionModel().selectRow(rowIndex);
           contextmenu1.showAt(e.getXY());
        });

      check_detail = new Ext.Window({ 
      layout:'border',
      closeAction:'hide',
      height:600,
      width:500,
      constrainHeader:true,
      resizable:false,
      items:[orderdetailGrid]
     });
      return check_detail
   }
}
