Zm.guests.win = {
	init: function(selectionData) {
		var form = new Ext.form.FormPanel({
			region: 'north',
			layout: 'fit',
			frame: true,
			height: 240,
			width: 500,
			title: '样品详细信息',
			items: [{
				layout: 'column',
				items: [{
					columnWidth: .5,
					html: '<img src=\'/images/shoes/' + selectionData.get('photo_one') + '\' width=100% height=100%>'

				},
				{
					columnWidth: .5,
					html: '<img src=\'/images/shoes/' + selectionData.get('photo_two') + '\' width=100% height=100%>'

				}]
			}]
		});

		var cm = new Ext.grid.ColumnModel([{
			header: '部位',
			dataIndex: 'region'
		},
		{
			header: '材料',
			dataIndex: 'material'
		},
		{
			header: '颜色',
			dataIndex: 'color'
		},
		{
			header: '加工方法',
			dataIndex: 'procession'
		}]);

		store = new Ext.data.JsonStore({
			url: '/managements/get_details_of_shoes.json',
			fields: ['region', 'material', 'color', 'procession'],
			method: 'post',
			baseParams: {
				id: selectionData.get('id')
			},
			/* totalProperty: 'totalProperty' ,*/
			root: 'dos',
			autoLoad: true
		});

        console.log('data' , id)
		//store.load({ params: { start: 0 , limit: 2 } });
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
				displayMsg: '显示第{0}条到{1}条记录，一共{2}条',
				emptyMsg: "没有记录"
			})
		});

		check_detail = new Ext.Window({
			layout: 'border',
			closeAction: 'hide',
			height: 600,
			width: 500,
			constrainHeader: true,
			resizable: false,
			items: [form, grid]
		});

		return check_detail
	}
}

