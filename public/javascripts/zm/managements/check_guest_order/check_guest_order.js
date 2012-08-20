Zm.managements.check_guest_order= { 
    init: function() { 
        Zm.pages.ViewPort = {
            layout: 'border',
            region:'center',
            items: [ 
                     {region:'north',layout:'fit',height:'90',title:'管理层-订单管理'},
                     {region:'west',layout:'fit', width:'180', items:[cgo_tree]},
                     {region:'center',layout:'fit', items:[grid]}
                   ]
        };
    },

};

        var cm = new Ext.grid.ColumnModel([ 
            new Ext.grid.RowNumberer(),
            { header: '订单号', dataIndex: 'order_id' },
            { header: '客户', dataIndex: 'client' },
            { header: '客户合同', dataIndex: 'contract' },
            { header: '总价', dataIndex: 'total_price' },
            { header: '品质', dataIndex: 'quality' },
            { header: '是否出货', dataIndex: 'shipment' },
            { header: '付款情况', dataIndex: 'payment' },
            { header: '提单情况', dataIndex: 'lading_bill' },
            { header: '制作日期', dataIndex: 'production_date' },
            { header: '备注', dataIndex: 'remark' },
        ]);

        var store = new Ext.data.JsonStore({ 
            url: '/managements/get_check_guest_order.json',
            fields: ['id','order_id', 'client','contract','total_price','quality','shipment','payment','lading_bill','production_date','remark'],
            root: 'check_guest_order',
            autoLoad: true
        });

        var grid = new Ext.grid.GridPanel({ 
            id: 'regionGrid',
            region: 'center',
            cm: cm,
            store: store,
            viewConfig: { forceFit: true },
        });                  
   
        var clientorderenquirycontextmenu = new Ext.menu.Menu({
       		id: 'theContextMenu',
        	items: [{
            	text: '查看鞋',
            	handler: function(){
					clientorderenquirydetail.show();
            	}
			},{
            	text: '查看订单进度',
            	handler: function(){
              Ext.Ajax.request({
                  url: '/managements/node.json',
                  success: function(){
                      Ext.Msg.alert('Good','It is OK now!');
                  },
                  failure: function(){
                      Ext.Msg.alert('Oh no','It is so bad!');
                  }
              });
            	}
			},{				
			      	text: '打开提单',
			},{				
				      text: '下载提单',	
			},{			
				      text: '打开客户合同',	
			},{		
		      		text: '下载客户合同',
        	}]
    	});

    	grid.on("rowcontextmenu", function(grid, rowIndex, e){
        	e.preventDefault();
        	grid.getSelectionModel().selectRow(rowIndex);
        	clientorderenquirycontextmenu.showAt(e.getXY());
    	});

    var root=new Ext.tree.AsyncTreeNode({   
            text: '全部订单',
            expanded: true
        });  
          
    var cgo_tree=new Ext.tree.TreePanel({     
            loader: new Ext.tree.TreeLoader( { dataUrl: '/managements/guest_order_node.json' } ),
            root: root
    });    
