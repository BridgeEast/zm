Zm.services.speed_of_progress ={ 
  init:function(){ 

   var cm = new Ext.grid.ColumnModel([
       { header:'鞋号',dataIndex:'shoes_id' },
       { header:'38',dataIndex:'size_36' },
       { header:'39',dataIndex:'size_37' },
       { header:'40',dataIndex:'size_38' },
       { header:'41',dataIndex:'size_39' },
       { header:'42',dataIndex:'size_40' },
       { header:'43',dataIndex:'size_41' },
       { header:'44',dataIndex:'size_42' },
       ]);

      var store = new Ext.data.JsonStore({ 
       url:'/services/get_speed_of_progress.json',
       fields:['id','shoes_id','size_36','size_37','size_38','size_39','size_40', 'size_41', 'size_42'],
       method:'post',
       baseParams:{ 
         id:Zm.services.guest_order_management.select_id
       },
         root:'speed_of_progress',
         autoLoad:true
     });

     var speedofprogressGrid = new Ext.grid.GridPanel({ 
      region:'center',
      height:360,
      autoScroll:true,
      loadMask: true,
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

    check_detail2 = new Ext.Window({ 
      layout:'border',
      closeAction:'hide',
      height:600,
      width: 500,
      constrainHeader:true,
      resizable:false,
      items:[speedofprogressGrid]
    });
      return check_detail2
   }
}
