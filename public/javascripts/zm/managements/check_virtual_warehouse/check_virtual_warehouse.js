Zm.managements.check_virtual_warehouse= { 
    init: function() { 
        Zm.pages.ViewPort = {
            layout: 'border',
            region:'center',
            items: [ 
                     {region:'north',layout:'fit',height:'90',title:'管理层-虚拟仓库管理'},
                     {region:'center',layout:'fit', items:[grid] },
                     {
                         region:'west',
                     //  collapseMode: 'mini',  最小化后左边很细
                     //  split: true,   调节west的宽度
                         collapsible: true,
                         layout:'fit',
                         width:'180',
                         items:[cvw_tree]
                     }
                   ]
        };
    },
};

      var root = new Ext.tree.AsyncTreeNode({
          text: "全部合同",
          expanded: true
      });

      var cvw_tree = new Ext.tree.TreePanel({
          loader: new Ext.tree.TreeLoader( { dataUrl: "/managements/virtual_warehouse_node.json" } ),
          root: root
      });
 
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
      
