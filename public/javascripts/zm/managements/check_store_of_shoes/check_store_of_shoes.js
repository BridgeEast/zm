Zm.managements.check_store_of_shoes = {
	init: function() {
		Zm.pages.ViewPort = {
			layout: 'border',
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
			dataIndex: 'photoOne'
		},
		{
			header: '鞋图2',
			dataIndex: 'photoTwo'
		},
		{
			header: '鞋号',
			dataIndex: 'shoesId'
		},
		{
			header: '鞋型',
			dataIndex: 'typesOfShoes'
		},
		{
			header: '适用人群',
			dataIndex: 'suitablePeople'
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
			dataIndex: 'productionDate',
			renderer: Ext.util.Format.dateRenderer('Y/m/d')
		},
		{
			header: '备注',
			dataIndex: 'remark'
		},
		]);

		//var store = new Ext.data.JsonStore({
		//url: '/managements/get_check_store_of_shoes.json',
		//fields: ['id', 'photoOne', 'photoTwo', 'shoesId', 'typesOfShoes', 'suitablePeople', 'colors', 'price', 'productionDate', 'remark'],
		//root: 'check_store_of_shoes',
		//autoLoad: true
		/*});*/
		var data = [['1-1.jpg', '1-2.jpg', 'name1', 'descn1'], ['3-1.jpg', '3-2.jpg', 'name2', 'descn2']];
		var store = new Ext.data.Store({
			proxy: new Ext.data.MemoryProxy(data),
			reader: new Ext.data.ArrayReader({},
			[{
				name: 'photoOne'
			},
			{
				name: 'photoTwo'
			},
			{
				name: 'shoesId'
			},
			{
				name: 'typesOfShoes'
			},
			{
				name: 'suitablePeople'
			},
			{
				name: 'colors'
			},
			{
				name: 'price'
			},
			{
				name: 'productionDate'
			},
			{
				name: 'remark'
			}])
		});
		store.load();
		var csosGrid = new Ext.grid.GridPanel({
			id: 'csosGrod',
			region: 'center',
			cm: cm,
			store: store,
			viewConfig: {
				forceFit: true
			}
		});

		var contextmenu = new Ext.menu.Menu({
			items: [{
				id: 'checkDetails',
				text: '查看详情',
				handler: function() {
					check_detail.show()
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
			region: 'west',
			id: 'treeCsos',
			width: '180'
		});

		var rootShoes = new Ext.tree.TreeNode({
			id: 'rootShoes',
			text: '全部鞋' ,
            expand: false
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
						id: 'nodeHighHeeledShoe',
						leaf: true

					},
					{
						text: '平底鞋',
						id: 'nodeFlats',
						leaf: true
					},
					{
						text: '靴子',
						id: 'nodeBoots',
						leaf: true
					}]
				});
				year.appendChild(month);
			};
		};

		treeCsos.setRootNode(rootShoes);

		return treeCsos

	}

}

