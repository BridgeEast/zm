Zm.managements.check_virtual_warehouse= { 
    init: function() { 
        Zm.pages.ViewPort = {
            layout: 'border',
            region:'center',
            items: [ 
                {region:'north',layout:'fit',height:'90',title:'管理层-虚拟仓库管理'},
                {region:'center',layout:'fit', items:[grid] },
                {region:'west',
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
            { header: '图鞋1', dataIndex: 'photo_one' },
            { header: '图鞋2', dataIndex: 'photo_two' },
            { header: '鞋号', dataIndex: 'shoes_id' },
            { header: '鞋型', dataIndex: 'types_of_shoes' },
            { header: '适合人群', dataIndex: 'suitable_people' },
            { header: '颜色', dataIndex: 'colors' },
            { header: '码号', dataIndex: 'size' },
            { header: '价格', dataIndex: 'price' },
            { header: '数量', dataIndex: 'necessary_num' },
            { header: '已完成数量', dataIndex: 'finished_num' }, 
            { header: '仓库数量', dataIndex: 'store_remaining' },
            { header: '制作日期', dataIndex: 'created_at' },
        ]);


        var store = new Ext.data.JsonStore({ 
            url: "/managements/get_check_virtual_warehouse_node.json",
            fields: ['photo_one','photo_two','shoes_id','suitable_people','colors','size','types_of_shoes','price','created_at','necessary_num','finished_num','store_remaining'],
            root: 'virtual_warehouse',
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
                text: 'ddddddddddddddd',
              	handler: function(){  var a = "morning"; var b = a.split(""); alert(b);  }
            }, '-', {
                text: 'ssssssssssssss', handler: function(){
                var i=2012;
                var j=0;
                var k=8;
                    store.proxy = new Ext.data.HttpProxy({ 
                        url: "/managements/get_check_virtual_warehouse.json",
                    });
                    store.reload();
              }
          }, '-']),
          bbar: new Ext.PagingToolbar({
              pageSize: 10,
              store: store,
              displayInfo: true,
              displayMsg: "显示第{0}条到{1}条记录，一共{2}条",
              emptyMsg: "没有记录"
          })
        });
        store.load();

        var virtualwarehouseenquiry2contextmenu = new Ext.menu.Menu({
         		id: 'theContextMenu',
          	items: [{
              	text: '查看详情', handler: function(){ sampledetail.show(); }					
          	}]
      	});

      	grid.on("rowcontextmenu", function(grid, rowIndex, e){
          	e.preventDefault();
          	grid.getSelectionModel().selectRow(rowIndex);
          	virtualwarehouseenquiry2contextmenu.showAt(e.getXY());
      	});	
  
        var treeStore = new Ext.data.JsonStore({ 
            url: '/managements/get_tree_node.json',
            fields: ['factory_order_id'],
            root: 'tree_node',
            autoLoad: true
        });
  
        var jing_year_nodes = [];    //全局变量数组，暂时没有好的方法，先用着 
        
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
            var contract_nodes = [];
            var record = [];
            var txt = [];
                for(m = 0; m < treeStore.getCount(); m++){
                    record[m] = treeStore.getAt(m);
                };
        				if(node.id == "cvw_root"){
           			    for(i = 2010; i < myDate.getFullYear()+1; i++ ){
           		          jing_year_nodes[i] = new Ext.tree.TreeNode({ text: i, id: "node" + i });
           	     	  		root.appendChild(jing_year_nodes[i]);

                        if(i == myDate.getFullYear()){
                            for(j=1; j < myDate.getMonth() + 2; j++){
                                if(j > 9){
                                    month_nodes[j] = new Ext.tree.TreeNode({ text: j + "月", id: "node" + i + j });
                                    jing_year_nodes[i].appendChild(month_nodes[j]);

                                    for(k = 0; k < treeStore.getCount(); k++){
                                        contract_nodes[k] = new Ext.tree.TreeNode({ text: record[k].get('factory_order_id'), id: "node" + i + j + k });
                                        month_nodes[j].appendChild(contract_nodes[k]);
                                    }
                                }else{
                                    month_nodes[j] = new Ext.tree.TreeNode({ text: j + "月", id: "node" + i + "0" + j });
                                    jing_year_nodes[i].appendChild(month_nodes[j]);

                                    for(k = 0; k < treeStore.getCount(); k++){
                                        contract_nodes[k] = new Ext.tree.TreeNode({ text: record[k].get('factory_order_id'), id: "node" + i + "0" + j + k });
                                        month_nodes[j].appendChild(contract_nodes[k]);
                                    }
                                }
                            }
                        }else{
           			            for(j=1;j<13;j++){
                                if(j > 9){
                                    month_nodes[j] = new Ext.tree.TreeNode({ text: j + "月", id: "node" + i + j });
                                    jing_year_nodes[i].appendChild(month_nodes[j]);
                                }else{
                                    month_nodes[j] = new Ext.tree.TreeNode({ text: j + "月", id: "node" + i + "0" + j });
                                    jing_year_nodes[i].appendChild(month_nodes[j]);
                                }
        			              }
                        }
        			      }
             jing_node3.remove();    
                };
         });      
          
         cvw_tree.on("collapsenode", function(node){  //树的闭合事件
             if(node.id=="cvw_root"){
                 var myDate = new Date();
                 for(i = 2010; i <= 2012; i++){ jing_year_nodes[i].remove() };
                 jing_node3 = new Ext.tree.TreeNode({text: "2010", id: "linshi"});
                 root.appendChild(jing_node3);
             }
         });

         cvw_tree.on("click", function(node){
             var nodeString = node.id;
             var stringValue = nodeString.split("");
             var i = stringValue[7];
             var j = stringValue[9];
             var date = "201" + i + "-0" + j; 
             var contract = "contract3";
             var record = {contract: contract, date: date};
             if(node.id.length == 10){
                 store.proxy = new Ext.data.HttpProxy({
                     url: "/managements/get_month.json",
                     method: "post",
                     jsonData: { record: record }
                 });
                 store.reload();
             };
             alert(node.id);
         });

