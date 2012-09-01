Zm.guests.wish_list = {
	init: function() {
		this.change_id = [];
		this.choice_id = [];
		this.select_id;
		this.photo_one;
		this.photo_two;
		Zm.pages.ViewPort = {
			layout: 'border',
			region: 'center',
			items: [{
				region: 'north',
				title: '客户-心愿单'
			},
			this.create_wl_grid(), this.create_wl_tree()]
		};
	},

	create_wl_grid: function() {
		var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(), sm, {
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

		var store = new Ext.data.JsonStore({
			url: '/guests/wish_list_data.json',
			fields: ['id', 'photo_one', 'photo_two', 'shoes_id', 'types_of_shoes', 'suitable_people', 'colors', 'price', 'sure_board', 'done_board', 'production_date', 'communication', 'remark'],
			//fields: 'id photo_one'.split(" ") 
			root: 'wish_list_data',
			baseParams: {
				id: 'null'
			} //初始化
		});

		var tbar = new Ext.Toolbar({
			defaults: {
				scope: this //作用域是调用这个方法的对象，也就是wish_list
			},
			items: [{
				text: '发送Excel添加到开发板',
				handler: function() {
					Zm.guests.send_excel.init().show()
				}
			},
			'-', {
				text: '添加到确认板',
				handler: function() {
					var change_board_kind = Ext.getCmp("wlGrid").getSelectionModel().getSelections();
					if (Ext.getCmp('wlTree').getSelectionModel().getSelectedNode().id.split("-")[2] == "确认板") {
						Ext.Msg.alert("警告" , "这些已经是确认板啦！")
					} else {
						for (var records = 0, len = change_board_kind.length; records < len; records++) {
							wlGrid.store.remove(change_board_kind[records]);
						}
						Ext.each(change_board_kind, function(data) {
							this.change_id.push(data.id)
						},
						this);
						Zm.guests.add_to_developing_board.init()
					}
				}
			},
			'-', {
				text: '添加到预购单',
				handler: function() {
					Zm.guests.add_to_advanced_order.init().show()
				}
			},
			'-', {
				text: '删除所选',
				handler: function() {
					var selectedData = Ext.getCmp("wlGrid").getSelectionModel().getSelections();
					Ext.each(selectedData, function(data) {
						this.choice_id.push(data.id)
					},
					this);
					Zm.guests.destroy_choice.init()
				}
			},
			'-', {
				text: '添加到订单',
				handler: function() {
					Zm.guests.add_to_order.init().show()
				}
			}]
		});
		var wlGrid = new Ext.grid.GridPanel({
			id: 'wlGrid',
			region: 'center',
			cm: cm,
			sm: sm,
			store: store,
			viewConfig: {
				forceFit: true
			},
			tbar: tbar,
		});

		var contextmenu = new Ext.menu.Menu({
			items: [{
				id: 'check_details',
				text: '查看详情',
				scope: this,
				handler: function() {
					this.select_id = Ext.getCmp('wlGrid').getSelectionModel().getSelected().data["id"];
					this.photo_one = Ext.getCmp('wlGrid').getSelectionModel().getSelected().data["photo_one"];
					this.photo_two = Ext.getCmp('wlGrid').getSelectionModel().getSelected().data["photo_two"];
					Zm.guests.win.init().show();
				}
			},
			{
				id: 'communicate_with_service',
				text: '与客服交谈',
				handler: function() {
					Zm.guests.communicate.init().show();
				}
			}]
		});
		wlGrid.on("rowcontextmenu", function(grid, rowIndex, e) {
			e.preventDefault();
			grid.getSelectionModel().selectRow(rowIndex);
			contextmenu.showAt(e.getXY())
		});
		return wlGrid

	},

	create_wl_tree: function() {
		var wlTree = new Ext.tree.TreePanel({
			autoScroll: true,
			region: 'west',
			id: 'wlTree',
			width: '180'
		});

		var rootShoes = new Ext.tree.TreeNode({
			id: 'rootShoes',
			text: '全部鞋'
		});

		var nowYear = new Date().getFullYear();
		var nowMonth = new Date().getMonth();

		for (var i = nowYear; i > nowYear - 3; i--) {
			var year = new Ext.tree.TreeNode({
				text: i,
				id: i
			});
			rootShoes.appendChild(year);
			if (i == nowYear) {
				var months = nowMonth + 1
			}
			else {
				months = 12
			}
			for (j = months; j > 0; j--) {
				var month = new Ext.tree.AsyncTreeNode({
					text: j + '月',
					id: i + '-' + j,
					children: [{
						text: '开发板',
						id: i + '-' + j + '-' + '开发板',
						leaf: true
					},
					{
						text: '确认板',
						id: i + '-' + j + '-' + '确认板',
						leaf: true
					}]
				});
				year.appendChild(month);
			};
		};

		wlTree.setRootNode(rootShoes);
		wlTree.on('click', function(node) {
			var store = Ext.getCmp('wlGrid').store;
			store.setBaseParam("id", node.id);
			store.reload();
		})
		return wlTree
	}

}

