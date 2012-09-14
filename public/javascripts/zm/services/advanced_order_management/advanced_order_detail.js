  Zm.services.advanced_order_detail={ 
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
        columnWidth: .5,
        html: '<img src=\'/images/shoes/' + Ext.getCmp('advancedordershoesGrid').getSelectionModel().getSelected().data.photo_one + '\' width=100% height=100%>'
        },{
        columnWidth: .5,
        html: '<img src=\'/images/shoes/' + Ext.getCmp('advancedordershoesGrid').getSelectionModel().getSelected().data.photo_two + '\' width=100% height=100%>'
       }]
     }]
    });

    var cm = new Ext.grid.ColumnModel([
        { header:'部位',dataIndex:'region' },
        { header:'材料',dataIndex:'material' },
        { header:'颜色',dataIndex:'color' },
        { header:'加工方法',dataIndex:'procession' },
        { header:'备注',dataIndex:'remark' }
        ]);

    var store = new Ext.data.JsonStore({ 
      url:'/services/get_advanced_order_detail.json',
      fields:['id','region','material','color','procession','remark'],
      method:'post',
      baseParams:{ 
       id:Zm.services.advanced_order_shoes.select_advanced_id
      },
        root:'advanced_order_detail',
      autoLoad:true
    });

    var advancedorderdetailgrid = new Ext.grid.GridPanel({ 
      region:'center',
      height:360,
      autoScroll:true,
      loadMask:true,
      stripeRows:true,
      frame:true,
      trackMouseOver:true,
          viewConfig:{ forceFot:true },
          store:store,
        cm:cm,
        bbar:new Ext.PagingToolbar({ 
         pageSize:10,
         store:store,
         displayInfo:true,
         displayMsg:'显示第{ 0 }条到{ 1 }条记录,一共{ 2 }条',
         emptyMsg:'没有记录'
        })
    });

    check_detail = new Ext.Window({ 
     layout:'border',
      closeAction:'hide',
      height:600,
      width: 500,
      constrainHeader:true,
      resizable:false,
      items:[form,advancedorderdetailgrid]
    });
      return check_detail
   }
 }
