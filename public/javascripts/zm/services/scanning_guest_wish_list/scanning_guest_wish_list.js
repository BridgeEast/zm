Zm.services.scanning_guest_wish_list = {
	init: function() {
		Zm.pages.ViewPort = {
			layout: 'border',
			region: 'center',
			items: [{
				region: 'north',
				title: '客服-浏览客户心愿单'
			},
			this.create_sgwl_grid(), this.create_sgwl_tree()]
		};
	},

	create_sgwl_grid: function() {
		var cm = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(), {
			header: '鞋图1',
			dataIndex: 'photo_one',
			renderer: title_img
		},
		{
			header: '鞋图2',
			dataIndex: 'photo_two',
			renderer: title_img
		},
		{
			header: '客户',
			dataIndex: 'custom_num'      
		},
		{
			header: '鞋号',
			dataIndex: 'shoes_id'
		},
		{
			header: '鞋型',
			dataIndex: 'types_of_shoes'
		},
		{
			header: '适用人群',
			dataIndex: 'suitable_people'
		},
		{
			header: '颜色',
			dataIndex: 'colors'
		},
		{
			header: '价格',
			dataIndex: 'price'
		},
		{
			header: '确定打板时间',
			dataIndex: 'sure_board',
			renderer: Ext.util.Format.dateRenderer('Y-m-d')
		},
		{
			header: '完成打板时间',
			dataIndex: 'done_board',
			renderer: Ext.util.Format.dateRenderer('Y-m-d')   
 		},
		{
			header: '制作日期',
			dataIndex: 'production_date',
			renderer: Ext.util.Format.dateRenderer('Y-m-d')  	
    },    
		{
			header: '谈话',
			dataIndex: 'communication'   
		},
		{
			header: '备注',
			dataIndex: 'remark'
		},
		]);

		store = new Ext.data.JsonStore({
			url: '/services/get_scanning_guest_wish_list.json',
			fields: ['id', 'photo_one', 'photo_two', 'shoes_id', 'types_of_shoes', 'suitable_people', 'colors', 'price', 'sure_board', 'done_board', 'production_date', 'communication', 'remark'],
			totalProperty: "totalProperty",
			root: 'scanning_guest_wish_list',
			baseParams: { id: 'null' }
		});

		var sgwlGrid = new Ext.grid.GridPanel({
			id: 'sgwlGrid',
			region: 'center',
			cm: cm,
			store: store,
			viewConfig: { forceFit: true },
			bbar: new Ext.PagingToolbar({
				pageSize: 10,
				store: store,
				displayInfo: true,
				displayMsg: "显示第{0}条到{1}条记录，一共{2}条",
				emptyMsg: "没有记录"
			})
		});

		var contextmenu = new Ext.menu.Menu({
			items: [{
				text: '查看详情',
				handler: function() {
					var selected_id = Ext.getCmp('sgwlGrid').getSelectionModel().getSelected().data["id"];
					var photo_one = Ext.getCmp('sgwlGrid').getSelectionModel().getSelected().data["photo_one"];
					var photo_two = Ext.getCmp('sgwlGrid').getSelectionModel().getSelected().data["photo_two"];
					Zm.services.checkDetailsWin.init(selected_id, photo_one, photo_two).show();
				},
    },{ 
        text: '更新打板时间',
        handler: function() {  
          Zm.services.updatePlayBoardWin.init().show();
        }
    },{ 
        text: '与客户交谈',
        handler: function() {  }        
        }
			]
		});

		sgwlGrid.on("rowcontextmenu", function(grid, rowIndex, e) {
			e.preventDefault();
			grid.getSelectionModel().selectRow(rowIndex);
			contextmenu.showAt(e.getXY())
		});

		return sgwlGrid

	},

	create_sgwl_tree: function() {

		    var treeSgwl = new Ext.tree.TreePanel({ 
          id: 'treeSgwl',
          region: 'west',
          width: '180',
          autoScroll: true
        });

        var rootSgwl = new Ext.tree.TreeNode({
			      id: 'rootSgwl',
			      text: '全部心愿单'
		    });

		    var nowYear = new Date().getFullYear();
		    var nowMonth = new Date().getMonth();

		    for (var i = nowYear; i > nowYear - 3; i--) {
		   	    var year = new Ext.tree.TreeNode({
			  	     text: i,
				       id: i
			      });
			     rootSgwl.appendChild(year);
			     if (i == nowYear) {
				       var months = nowMonth + 1
			     }
			     else {
				       months = 12
			     }
			     for (j = months; j > 0; j--) {
				       var month = new Ext.tree.TreeNode({
					         text: j + '月',
					         id: i + '-' + j
				       });
			     year.appendChild(month);
			     };
		    };

		    treeSgwl.setRootNode(rootSgwl);
	    	treeSgwl.on('click', function(node) {
		    	var store = Ext.getCmp('sgwlGrid').store;
		    	store.setBaseParam("id", node.id);
		    	store.reload();
	    	})

         return treeSgwl

	}

}

