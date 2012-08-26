Zm.managements.check_store_of_shoes = {
	init: function() {
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
			dataIndex: 'photo_one'
		},
		{
			header: '鞋图2',
			dataIndex: 'photo_two'
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
			root: 'check_store_of_shoes',
			autoLoad: true
		});

		var csosGrid = new Ext.grid.GridPanel({
			id: 'csosGrid',
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
           //selct_id = csosGrid.getSelectionModel().getSelected().data["id"];
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
						id: 'nodeHighHeeledShoe' + i + j,
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
		treeCsos.on('click', function(node) {
         
			if (node.leaf) {
				var year = node.parentNode.parentNode.text;
				var month = node.parentNode.id.split("_")[1];
				store.proxy = new Ext.data.HttpProxy({
					url: '/managements/get_data.json',
					method: 'post',
					jsonData: {
						selectYear: year,
						selectMonth: month,
						selectType: node.text
					}
				}),
				store.load()
			}
		})
		return treeCsos

	}

}


