Zm.managements.check_virtual_warehouse= { 
    init: function() { 
        Zm.pages.ViewPort = {
            layout: 'border',
            region:'center',
            items: [ 
                     {region:'north',layout:'fit',height:'90',title:'管理层-虚拟仓库管理'},
                     {region:'west',layout:'fit', width:'180', items:[cvw_tree]},
                     {region:'center',layout:'fit', items:[grid]}
                   ]
        };
    },
};
 
    var root=new Ext.tree.AsyncTreeNode({   
             id:"factory_order_root", text:"全部订单", expanded:true,
		     children:[
                    {text:'2012',id:'2012_node', expanded:true,
                    children:[
                               {text:'三月',id:'mar_node',expanded:true,
                               children:[
                                          {text:'合同1',id:'mar_factory_order1_node',leaf:true},
                                          {text:'合同2',id:'mar_factory_order2_node',leaf:true},
                                          {text:'合同3',id:'mar_factory_order3_node',leaf:true},
                               ]},

                               {text:'二月',id:'feb_node',expanded:true,
                               children:[
                                          {text:'合同1',id:'feb_factory_order1_node',leaf:true},
                                          {text:'合同2',id:'feb_factory_order2_node',leaf:true},
                                          {text:'合同3',id:'feb_factory_order3_node',leaf:true},
                               ]},

                               {text:'一月',id:'jan_node',expanded:true,
                               children:[
                                          {text:'合同1',id:'jan_factory_order1_node',leaf:true},
                                          {text:'合同2',id:'jan_factory_order2_node',leaf:true},
                                          {text:'合同3',id:'jan_factory_order3_node',leaf:true},
                               ]}
                  ]},  
                    {text:'2011',id:'2011_node',leaf:true},  
                    {text:'2010',id:'2010_node',leaf:true},  
                  ]   
        });   
    var cvw_tree=new Ext.tree.TreePanel({     
        
		     id:'cvw_tree', 
             width: 210,  
             minSize: 210,  
             maxSize: 300, 
             lines:true, 
             autoScroll:true,
		
    });  cvw_tree.setRootNode(root);       

        var cm = new Ext.grid.ColumnModel([ 
            new Ext.grid.RowNumberer(),
            { header: '图鞋1', dataIndex: 'photo_one' },
            { header: '图鞋2', dataIndex: 'photo_two' },
            { header: '鞋号', dataIndex: 'shoes_id' },
            { header: '鞋型', dataIndex: 'types_of_shoes' },
            { header: '适合人群', dataIndex: 'suitable_people' },
            { header: '颜色', dataIndex: 'colors' },
            { header: '码号', dataIndex: 'size' },
            { header: '数量', dataIndex: 'number_of_shoes' },
            { header: '已完成数量', dataIndex: 'finished_number' },
            { header: '仓库数量', dataIndex: 'warehouse_number' },
            { header: '制作日期', dataIndex: 'production_date' },
        ]);

        var store = new Ext.data.JsonStore({ 
            url: '/managements/get_check_virtual_warehouse.json',
            fields: ['id','photo_one', 'photo_two','shoes_id','types_of_shoes','suitable_people','colors','size','number_of_shoes','finished_number','warehouse_number','production_date'],
            root: 'check_virtual_warehouse',
            autoLoad: true
        });

        var grid = new Ext.grid.GridPanel({ 
            id: 'virtualWarehouseEnquiryGrid',
            region: 'center',
            cm: cm,
            store: store,
            viewConfig: { forceFit: true },
            tbar: new Ext.Toolbar(['-', {
            	text: '日报表查询',	
       	handler: function(){  dailysheetenquiry.show();  }
        	}, '-', {
            	text: '月报表查询',	
            	handler: function(){  mouthsheetenquiry.show();  }
        	}, '-', {
              text: '日发货查询',
            	handler: function(){  dailydispatchlistenquiry.show();  }
          }, '-', {
              text: '月发货查询',
            	handler: function(){  mouthdispatchlistenquiry.show();  }
          }, '-'])
        });                  

        var virtualwarehouseenquiry2contextmenu = new Ext.menu.Menu({
       		id: 'theContextMenu',
        	items: [{
            	text: '查看详情',
            	handler: function(){
					sampledetail.show();
            	}					
        	}]
    	});
    	grid.on("rowcontextmenu", function(grid, rowIndex, e){
        	e.preventDefault();
        	grid.getSelectionModel().selectRow(rowIndex);
        	virtualwarehouseenquiry2contextmenu.showAt(e.getXY());
    	});	
      
