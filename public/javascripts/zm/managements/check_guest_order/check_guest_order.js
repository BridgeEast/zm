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
            { header: '客户', dataIndex: 'custom_num' },
            { header: '客户合同', dataIndex: 'custom_contrast' },
            { header: '品质', dataIndex: 'quality' },
            { header: '总价', dataIndex: 'total_price' },
            { header: '是否出货', dataIndex: 'shipment' },
            { header: '付款情况', dataIndex: 'payment' },
            { header: '提单情况', dataIndex: 'lading_bill' },
            { header: '制作日期', dataIndex: 'production_date' },
            { header: '备注', dataIndex: 'remark' },
        ]);

        var store = new Ext.data.JsonStore({ 
            url: '/managements/get_check_guest_order.json',
            fields: ['order_id','custom_num', 'custom_contrast','quality','total_price','shipment','payment','lading_bill','production_date','remark'],
            root: 'check_guest_order',
            autoLoad: false
        });

        var grid = new Ext.grid.GridPanel({ 
            id: 'guestgrid',
            region: 'center',
            cm: cm,
            store: store,
            viewConfig: { forceFit: true },
        });                  
   
        var guestContexMenu = new Ext.menu.Menu({
         		id: 'theContextMenu',
          	items: [{
              	text: '查看鞋', 
                handler: function(){ guestDetailWindow.show(); }
  	    		},{
               	text: '查看订单进度',
                handler: function(){ progressWindow.show(); }
  	    		},{				
  	    		    text: '打开提单', handler: function(){ 
                    alert(Ext.getCmp('guestgrid').getSelectionModel().getSelected().data["order_id"]); 
                }
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
          	guestContexMenu.showAt(e.getXY());
      	});
        
        var chen_year_nodes = [];  //全局变量，暂时没其他办法，先用着

        var root=new Ext.tree.AsyncTreeNode({   
            id: 'cgo_root',
            text: '全部订单',
            children: []
        });  
              
        var cgo_tree=new Ext.tree.TreePanel({     
            root: root
        });    

        cgo_tree.on("expandnode",function(node){      //树的展开时执行的事件
        		var myDate = new Date();
        		var month_nodes = [];
        				if(node.id == "cgo_root"){
           			    for(i = 2010; i < myDate.getFullYear()+1; i++ ){
           		          chen_year_nodes[i] = new Ext.tree.TreeNode({ text: i, id: "nodes" + i });
           	     	  		root.appendChild(chen_year_nodes[i]);
                        if(i == myDate.getFullYear()){
                            for(j = 1; j < myDate.getMonth() + 2; j++){
                                if(j > 9){
                                    month_nodes[j] = new Ext.tree.TreeNode({ text: j + "月", id: "nodes" + i + j });
                                    chen_year_nodes[i].appendChild(month_nodes[j]);
                                }else{
                                    month_nodes[j] = new Ext.tree.TreeNode({ text: j + "月", id: "nodes" + i + "0" + j });
                                    chen_year_nodes[i].appendChild(month_nodes[j]);
                                }
                            }
                        }else{
           			            for(j = 1; j < 13; j++){
                                if(j > 9){
           		 		        		      month_nodes[j] = new Ext.tree.TreeNode({ text: j + "月", id: "nodes" + i + j });
           		 		                  chen_year_nodes[i].appendChild(month_nodes[j]);
                                }else{
           		 		        		      month_nodes[j] = new Ext.tree.TreeNode({ text: j + "月", id: "nodes" + i + "0" + j });
           		 		                  chen_year_nodes[i].appendChild(month_nodes[j]);
                                }
        			              }
                        }
        			      }
                }
             chen_node3.remove();
         });

         cgo_tree.on("collapsenode", function(node){  
             if(node.id=="cgo_root"){
                 var myDate = new Date();
                 for(i = 2010; i <= myDate.getFullYear(); i++){ chen_year_nodes[i].remove() };
                 chen_node3 = new Ext.tree.TreeNode({text: "2010", id: "Linshi2010"});
                 root.appendChild(chen_node3);
             }
                 store.removeAll();
         });

         cgo_tree.on("click", function(node){
             var i = node.id.substring(5, 9);
             var j = node.id.substring(9, 11);
             var date = i + "-" + j;
             if(node.id.length == 11){
                     store.proxy = new Ext.data.HttpProxy({
                         url: "/managements/get_guest_order.json",
                         method: "post",
                         jsonData: { date: date }
                     });
                     store.reload();
             }
         });
