/*Ext.onReady(function() {*/
Zm.services.factory_daily_sheet = { 
   
init: function(){  
	

	factoryDailySheet = new Ext.Window({
		id: 'factoryDailysheet',
		title: '工厂日报表',
		width: 800,
		height: 630,
		closeAction: 'close',
		contrain: true,
		constrainHeader: true,
		resizeble: false,
		items: [this.gridPanel()]
	});
  return factoryDailySheet;
  },



gridPanel: function(){  
        var cm = new Ext.grid.ColumnModel([
               {  header: '鞋号',
                  dataIndex: 'size'
                  //editor: new Ext.grid.GridEditor(new Ext.form.TextField({ allowBlank: false }))
               },{
                  header: '入库数量', 
                  dataIndex: 'inbound_num',
                  //editor: new Ext.grid.GridEditor(new Ext.form.TextField({ allowBlank: false }))
                  },{ 
                  header: '入库时间',
                  dataIndex: 'inbound_and_outbound_date',
                  // editor: new Ext.grid.GridEditor(new Ext.form.TextField({ allowBlank: false }))
                  }
        ]);




 var store = new Ext.data.JsonStore({ 
            url: '/services/get_inbound_num.json',
            fields: ['id','size_of_shoe_id', 'size', 'inbound_num','inbound_and_outbound_date'],
            root: 'inbound_num',
            autoLoad: true
        });



	  var grid = new Ext.grid.EditorGridPanel({
            id: 'grid',
            region: 'center',
            stripeRows: true,
            autoScroll: true,
            loadMask: true,
            frame: true,
            tackMouseOver: true,
            viewConfig: {
                forceFit: true
            },
            store: store,
            cm: cm,
            enableColumnMove: false,
            tbar: new Ext.Toolbar({ 
                         defaults: { scope: this },  
                         items: ['-',{  text: '删除', handler: function(){  }},'-'],
           })
        });
          

          


    var form = new Ext.form.FormPanel({ 
            id: 'form',
            region: 'north',
            frame: true,
            labelAlign: 'left',
            labelWidth: 80,
            height: 140,
            width: 600,
            title: '样品表格填写',
            items: [{
                layout: 'column',
                items: [{
                    columnWidth: .5,
                    layout: 'form',
                    items: [{ xtype: 'textfield', fieldLabel: '样品号', width: 100, id: 'size_of_shoe_id' },
                            { xtype: 'combo',
                            fieldLabel: '鞋号',
                            width: 100, 
                            id: 'sizes',
                            store :new Ext.data.SimpleStore({ 
                                  fields: ['value','text'],
                                  data:[['value1','36'],['value1','37'],['value1','38'],['value1','39'],['value1','40'],['value1','41'],['value1','42'],['value1','43'],['value1','44']]
                                                            }),
                            displayField: 'text',
                            valueField: 'text',
                            mode: 'local',
                            editable: false,
                            triggerAction: 'all',
                           emptyText: '请选择'
                           }
                           ]
                       
                     
                     },{
                    columnWidth: .5,
                    layout: 'form',
                    items: [{ xtype: 'datefield',fieldLabel: '填写时间', width: 100, format: 'Y-m-d', id: 'addDate'  },
                            { xtype: 'textfield',fieldLabel: '数量',width: 100, id: 'inbound_num' }
                    ]
                    
                       
                    
                }]
            }],
        buttons: [{ 
              text: '确定',
              scope: this,
              handler: function(){ this.saveButton(); }
            
        }]
        });
    

     

          var form2 = new Ext.form.FormPanel({
            id: 'form2',
            layout: 'border',
            frame: true,
            closeAction: 'hide',
            buttonAlign: 'left',
            height: 550,
            width: 800,
            resizable: true,
            items: [form, grid]
           
        });
       
       return form2;
},

 
   saveButton: function(){ 
          var size_of_shoe_id = Ext.getCmp('size_of_shoe_id').getValue();
          var size = Ext.getCmp('sizes').getValue();
          var inbound_num = Ext.getCmp('inbound_num').getValue();
          var add_date = Ext.getCmp('addDate').getValue();
          var selection = Ext.getCmp('grid').getSelectionModel();
          var store = Ext.getCmp('grid').store;
          var record = { 
                size_of_shoe_id: size_of_shoe_id,
                size: size,
                inbound_num: inbound_num,
                inbound_and_outbound_date: add_date
          };
          if(size_of_shoe_id) { 
             
                Ext.Ajax.request({ 
                    url: '/services/create_data.json',
                    method: 'post',
                    jsonData: { record: record },
                    success: function() { 
                        Ext.Msg.alert('添加', '添加成功!');
                    },
                    failure: function() { 
                        Ext.Msg.alert('添加', '添加失败!');         
                    },
                    callback: function() { 
                       // Ext.getCmp('addForm').form.reset();
                        //Ext.getCmp('addWindow').close();
                        Ext.getCmp('grid').store.load();
                    }
                });      
            

        }else{ 
            Ext.Msg.alert('警告', '部位不能为空' );
        }

   },






  

}


