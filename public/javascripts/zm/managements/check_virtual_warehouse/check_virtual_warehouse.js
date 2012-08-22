jm.managements.check_virtual_warehouse= { 
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

        var cm = new Ext.grid.ColumnModel([ 
            new Ext.grid.RowNumberer(),
            { header: '图鞋1', dataIndex: 'nodetext' },
            { header: '图鞋2', dataIndex: 'nodeparent' },
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
            fields: ['nodetext','nodeparent'],
            root: 'virtual_warehouse_node',
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
          }, '-', {
              text: 'dddddddddddd',
            	handler: function(){ 
              var record = [];
                  for(i = 0; i < store.getCount(); i++){
                       record[i] = store.getAt(i);
                    //  alert(record.get('nodetext'));

                  };
                  for(m = 0; m < 6; m++){
                      alert(record[m].get('nodetext'));
                  }
              }
          }, '-', {
              text: 'ssssssssssssss', handler: function(){
                  alert(store.getCount());
            }
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
      var root = new Ext.tree.AsyncTreeNode({
          id: "cvw_root",
          text: "全部合同",
          children: []
      });

      var cvw_tree = new Ext.tree.TreePanel({
          root: root
      });      

    cvw_tree.on("expandnode",function(node){      //树的展开时执行的事件
    		var myDate = new Date();
    		var month_nodes = [];
        var year_nodes = [];
        var contract_nodes = [];
        var record = [];
        var txt = [];
            for(m = 0; m < store.getCount(); m++){
                record[m] = store.getAt(m);
            };
    				if(node.id == "cvw_root"){
       			    for(i = 2010; i < myDate.getFullYear()+1; i++ ){
       		          year_nodes[i] = new Ext.tree.TreeNode({ text: i, id: i + "sss" });
       	     	  		root.appendChild(year_nodes[i]);
                    if(i == myDate.getFullYear()){
                        for(j=1; j < myDate.getMonth() + 2; j++){
                            month_nodes[j] = new Ext.tree.TreeNode({ text: j + "月", id: j + "ddd" });
                            year_nodes[i].appendChild(month_nodes[j]);

                            for(k = 0; k < 5; k++){
                                contract_nodes[k] = new Ext.tree.TreeNode({ text: record[k].get('nodetext'), id: k });
                                month_nodes[j].appendChild(contract_nodes[k]);
                            };
                        }
                    }
                    else{
       			            for(j=1;j<13;j++){
       		 		        		  month_nodes[j] = new Ext.tree.TreeNode({ text: j + "月", id: j });
       		 		              year_nodes[i].appendChild(month_nodes[j]);
    			              }
                    }
    			      }
            }

     });      
      
