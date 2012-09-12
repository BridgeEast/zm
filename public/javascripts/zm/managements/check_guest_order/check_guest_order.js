Zm.managements.check_guest_order= { 
    init: function() { 
        Zm.pages.ViewPort = {
            layout: 'border',
            region:'center',
            items: [{  
              region: 'north',
              title: '管理层-查看订单'
            },
            this.createCgoGrid(), this.createCgoTree()]
        };
    },


    createCgoGrid: function() { 
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
            { header: '制作日期', dataIndex: 'production_date', renderer: Ext.util.Format.dateRenderer('Y-m-d') },
            { header: '备注', dataIndex: 'remark' },
        ]);

        store = new Ext.data.JsonStore({ 
            url: '/managements/get_check_guest_order.json',
            fields: ['id','order_id','custom_num', 'custom_contrast','quality','total_price','shipment','payment','lading_bill','production_date','remark'],
            totalProperty: "totalProperty",
            root: 'check_guest_order',
            autoLoad: false
        });

        var cgoGrid = new Ext.grid.GridPanel({ 
            id: 'cgoGrid',
            region: 'center',
            cm: cm,
            store: store,
            viewConfig: { forceFit: true },
            bbar: new Ext.PagingToolbar({
                pageSize: 30,
                store: store,
                displayInfo: true,
                displayMsg: "显示第{0}条到{1}条记录，一共{2}条",
                emptyMsg: "没有记录"
            })
        });                  
   
        var cgoContextMenu = new Ext.menu.Menu({
         		id: 'theContextMenu',
          	items: [{
              	text: '查看鞋', 
                handler: function(){ 
                   var selected_id = Ext.getCmp('cgoGrid').getSelectionModel().getSelected().data["id"];
                   Zm.managements.checkShoesWin.init(selected_id).show(); 
                }
  	    		},{
               	text: '查看订单进度',
                handler: function(){ 
                   var selected_id = Ext.getCmp('cgoGrid').getSelectionModel().getSelected().data["id"];
                   Zm.managements.checkOrderProgressWin.init(selected_id).show()
                }
  	    		},{				
  	    		    text: '打开提单',
                handler: function(){ }
  	    		},{				
  	    			  text: '下载提单',	
  	    		},{			
  	    			  text: '打开客户合同',	
  	    		},{		
  	    	      text: '下载客户合同',
            }]
      	});
  
      	cgoGrid.on("rowcontextmenu", function(grid, rowIndex, e){
          	e.preventDefault();
          	grid.getSelectionModel().selectRow(rowIndex);
          	cgoContextMenu.showAt(e.getXY())
      	});

        return cgoGrid
        
    },


    createCgoTree: function() { 

		    var treeCgo = new Ext.tree.TreePanel({ 
          id: 'treeCgo',
          region: 'west',
          width: '180',
          autoScroll: true
        });

        var rootOrder = new Ext.tree.TreeNode({
			      id: 'rootOrder',
			      text: '全部订单'
		    });

		    var nowYear = new Date().getFullYear();
		    var nowMonth = new Date().getMonth();

		    for (var i = nowYear; i > nowYear - 3; i--) {
		   	    var year = new Ext.tree.TreeNode({
			  	     text: i,
				       id: i
			      });
			     rootOrder.appendChild(year);
			     if (i == nowYear) {
				       var months = nowMonth + 1
			     }
			     else {
				       months = 12
			     }
			     for (j = months; j > 0; j--) {
				       var month = new Ext.tree.TreeNode({
					         text: j + '月',
					         id: i + '_' + j
				       });
			     year.appendChild(month);
			     };
		    };

		    treeCgo.setRootNode(rootOrder);
        treeCgo.on("click", function(node){
            if (node.text.toString().indexOf("月") != -1) { 
                var year_num = node.parentNode.text
                var month_num = node.id.split("_")[1];
                if (parseInt(month_num) < 10) month_num = '0' + month_num
                  var date_num = year_num + '-' + month_num
            }
            else if (node.parentNode.text == '全部订单'){ 
                date_num = node.text;
            }
            else { 
                date_num = null;
            };

            store.proxy = new Ext.data.HttpProxy({
                url: '/managements/get_selected_data.json',
                method: 'post',
                jsonData: { selectDate: date_num }      
            }),
            store.load({ params: { start: 0, limit: 30 } });
         })

         return treeCgo
    }
};         
