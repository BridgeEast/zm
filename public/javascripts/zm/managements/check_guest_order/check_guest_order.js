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
            id: "cgo_root",
            text: '全部订单',
            expanded: true,
            children: []
        });  
          
    var cgo_tree=new Ext.tree.TreePanel({     
            root: root
    });    

    cgo_tree.on("expandnode",function(node){      //树的展开时执行的事件
    		var myDate = new Date();
    		var month_nodes = [];
        var year_nodes = [];
    				if(node.id == "cgo_root"){
       			    for(i = 2010; i < myDate.getFullYear()+1; i++ ){
       		          year_nodes[i] = new Ext.tree.TreeNode({ text: i, id:i });
       	     	  		root.appendChild(year_nodes[i]);
                    if(i == myDate.getFullYear()){
                        for(j=1; j < myDate.getMonth() + 2; j++){
                            month_nodes[j] = new Ext.tree.TreeNode({ text: j + "月", id: j });
                            year_nodes[i].appendChild(month_nodes[j]);
                        }
                    }
                    else{
       			            for(j = 1; j < 13; j++){
       		 		        		  month_nodes[j] = new Ext.tree.TreeNode({ text: j + "月", id: j });
       		 		              year_nodes[i].appendChild(month_nodes[j]);
    			              }
                    }
    			      }
            }
	   });
