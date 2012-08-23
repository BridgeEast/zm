Ext.onReady(function() {

	var detail = new Ext.form.FormPanel({
		region: 'north',
		layout: 'fit',
		frame: true,
		height: 240,
		width: 500,
		title: '样品详细信息',
		items: [{
			layout: 'column',
			items: [{
				title: '图片1',
				columnWidth: .5,

			},
			{
				title: '图片2',
				columnWidth: .5,

			}]
		}]
	});

	var cm = new Ext.grid.ColumnModel([{
		header: '部位',
		dataIndex: 'position'
	},
	{
		header: '材料',
		dataIndex: 'material'
	},
	{
		header: '颜色',
		dataIndex: 'colors'
	},
	{
		header: '加工方法',
		dataIndex: 'refine'
	},
	{
		header: '备注',
		dataIndex: 'remark'
	}]);

	var data = [['面料', 'NS-34,HP-8,H-3', '深沙色，深棕色，卡其绿', '', ''], ['内里', 'MH-30', '卡其色', '', ''], ['大底', 'MH-30', '卡其色', '', '内松紧顺面色'], ['鞋垫', 'B-24', '卡其色', '', ''], ['后套里', 'F-42', '棕色', '', ''], ['鞋带内里', '16MM宽', '古铜色', '', ''], ['线圈', ' ', '棕色', '', ''], ['毛刺', '7MM', '古铜色', '', ''], ['铆钉', '43/1*3', '棕色', '', ''], ['车线', '43/4*3', '349#', '', ''], ['Sock Logo', ' ', '', '无', ''], ['Outsole', ' ', '深棕色、沙色', '', '']];

	var store = new Ext.data.Store({
		proxy: new Ext.data.MemoryProxy(data),
		reader: new Ext.data.ArrayReader({},
		[{
			name: 'position'
		},
		{
			name: 'material'
		},
		{
			name: 'colors'
		},
		{
			name: 'refine'
		},
		{
			name: 'remark'
		}])
	});

	var grid = new Ext.grid.GridPanel({
		region: 'center',
		height: 360,
		viewConfig: {
			forceFit: true
		},
		store: store,
		cm: cm,
		bbar: new Ext.PagingToolbar({
			pageSize: 10,
			store: store,
			displayInfo: true,
			diaplayMsg: '显示第{0}条到{1}条记录，一共{2}条',
			emptyMsg: "没有记录"
		})
	});
	store.load();
	check_detail = new Ext.Window({
		layout: 'border',
		closeAction: 'hide',
		height: 600,
		width: 500,
		constrainHeader: true,
		resizable: false,
		items: [detail, grid]
	});
	check_detail.hide();
})

