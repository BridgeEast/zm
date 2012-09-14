Zm.managements.check_store_of_shoes = {
	init: function() {
		this.select_id;
		this.photo_one;
		this.photo_two;
		Zm.pages.ViewPort = {
			layout: 'border',
			region: 'center',
			items: [{
				region: 'north',
				title: '管理层-查看鞋库'
			},
			this.create_csos_grid(), this.create_csos_tree()]
		};
	},

	create_csos_grid: function() {
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
			header: '制作日期',
			dataIndex: 'production_date',
			renderer: Ext.util.Format.dateRenderer('Y-m-d')
		},
		{
			header: '备注',
			dataIndex: 'remark'
		},
		]);

		store = new Ext.data.JsonStore({
			url: '/managements/get_check_store_of_shoes.json',
			fields: ['id', 'photo_one', 'photo_two', 'shoes_id', 'types_of_shoes', 'suitable_people', 'colors', 'price', 'production_date', 'remark'],
			totalProperty: "totalProperty",
			root: 'check_store_of_shoes',
			autoLoad: false
		});

		var csosGrid = new Ext.grid.GridPanel({
			id: 'csosGrid',
			region: 'center',
			cm: cm,
			store: store,
			viewConfig: {
				forceFit: true
			},
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
				id: 'checkDetails',
				text: '查看详情',
				scope: this,
				handler: function() {
					this.select_id = Ext.getCmp('csosGrid').getSelectionModel().getSelected().data["id"];
					this.photo_one = Ext.getCmp('csosGrid').getSelectionModel().getSelected().data["photo_one"];
					this.photo_two = Ext.getCmp('csosGrid').getSelectionModel().getSelected().data["photo_two"];
					Zm.managements.win.init().show();
				}
			}]
		});

		csosGrid.on("rowcontextmenu", function(grid, rowIndex, e) {
			e.preventDefault();
			grid.getSelectionModel().selectRow(rowIndex);
			contextmenu.showAt(e.getXY())
		});

		return csosGrid

	},

	create_csos_tree: function() {

		var treeCsos = new Ext.tree.TreePanel({
			autoScroll: true,
			region: 'west',
			id: 'treeCsos',
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
					id: i + '_' + j,
					children: [{
						text: '高跟鞋',
						id: 'nodeHighHeeledShoe' + j + i,
						leaf: true

					},
					{
						text: '平底鞋',
						id: 'nodeFlats' + j + i,
						leaf: true
					},
					{
						text: '靴子',
						id: 'nodeBoots' + j + i,
						leaf: true
					}]
				});
				year.appendChild(month);
			};
		};

		treeCsos.setRootNode(rootShoes);
		treeCsos.on('click', function(node) {
			if (node.leaf) {
				var year = node.parentNode.parentNode.text;
				var month = node.parentNode.id.split("_")[1];
				if (parseInt(month) < 10) {
					month = '0' + month
				}
				var date = year + '-' + month;
				var type = node.text
			}
			else if (node.text.toString().indexOf("月") != - 1) {
				year = node.parentNode.text;
				month = node.id.split("_")[1];
				if (parseInt(month) < 10) {
					month = '0' + month
				}
				date = year + '-' + month;
			}
			else if (!isNaN(node.text)) {
				date = node.text;
			}
			else if (node.text == '全部鞋'){
				date = null
			}

			store.proxy = new Ext.data.HttpProxy({
				url: '/managements/get_data.json',
				method: 'post',
				jsonData: {
					selectDate: date,
					selectType: type
				}
			}),
			store.load({
				params: {
					start: 0,
					limit: 10
				}
			})
		})

		return treeCsos

	}

}

