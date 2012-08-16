Zm.bosses.client_order_enquiry= { 
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
            url: '/bosses/get_client_order_enquiry.json',
            fields: ['id','order_id', 'client','contract','total_price','quality','shipment','payment','lading_bill','production_date','remark'],
            root: 'client_order_enquiry',
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
					clientorderenquirypricenumber.show();
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
             id:"cgo_root", text:"全部订单", expanded:true,
		     children:[
                    {text:'2012',id:'2012_node', expanded:true,
                     children:[
                              {text:'六月',id:'jun_node',leaf:true},  
                              {text:'五月',id:'may_node',leaf:true},  
                              {text:'四月',id:'apr_node',leaf:true},  
                              {text:'三月',id:'mar_node',leaf:true},  
                              {text:'二月',id:'feb_node',leaf:true},  
                              {text:'一月',id:'jan_node',leaf:true},  
                  ]},  
                    {text:'2011',id:'2011_node',leaf:true},  
                    {text:'2010',id:'2010_node',leaf:true},  
                  ]   
        });  
          
    var cgo_tree=new Ext.tree.TreePanel({     
        
		     id:'cgo_tree', 
             width: 210,  
             minSize: 210,  
             maxSize: 300, 
             lines:true, 
             autoScroll:true,
		
    });  cgo_tree.setRootNode(root);     

    var contextmenu = new Ext.menu.Menu({
        id: 'theContextMenu',
        items: [{
            text: 'first',
            handler: function(){
                alert('last');
            }
        }]
    });
    cgo_tree.on("contextmenu", function(node, e){
        e.preventDefault();
        node.select();
        contextmenu.showAt(e.getXY());
    });


