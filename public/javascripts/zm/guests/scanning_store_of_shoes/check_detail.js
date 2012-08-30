Zm.guests.check_detail={
  init:function(){ 
    var form = new Ext.form.FormPanel({ 
      region:'north',
      layout:'fit',
      frame:true,
      labeAlign:'left',
      labeWidth:100,
      height:240,
      width:500,
      title:'查看详情',
      items:[{ 
        layout:'column',
        items:[{ 
        title:'picture1',
        columnWidth: .5,
        },{
        title:'picture2',
        columnWidth: .5,
        }]
      }]
    });

    var cm = new Ext.grid.ColumnModel([
        { header:'部位',dataIndex:'region'},
        { header:'材料',dataIndex:'material'},
        { header:'颜色',dataIndex:'color' },
        { header:'加工方法',dataIndex:'procession'},
        { header:'备注',dataIndex:'remark'}
        ]);

  var  store = new Ext.data.JsonStore({ 
       url:'/guests/get_scanning_detail.json',
      fields:['id','region','material','color','procession','remark'],    
       method:'post',
       baseParams:{ 
          id: Zm.guests.scanning_store_of_shoes.select_id   
       },
       root:'scanning_detail',
       autoLoad:true
    });

  var sampledetailgrid = new Ext.grid.GridPanel({ 
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
   
   check_detail = new Ext.Window({ 
     layout:'border',
     closeAction:'hide',
      height:600,
      width: 500,
      constrainHeader:true,
      resizable:false,
      items:[form,sampledetailgrid]
    });
      return check_detail
    }
}
