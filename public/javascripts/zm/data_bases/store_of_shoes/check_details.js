Zm.managements.win = {
	init: function() {
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
					html: '<img src=\'/images/shoes/' + Ext.getCmp('storeOfShoesGrid').getSelectionModel().getSelected().data.photo_one + '\' width=100% height=100%>'

				},
				{
					columnWidth: .5,
					html: '<img src=\'/images/shoes/' + Ext.getCmp('storeOfShoesGrid').getSelectionModel().getSelected().data.photo_two + '\' width=100% height=100%>'

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
    
    var selection = Ext.getCmp('storeOfShoesGrid').getSelectionModel();
		var store = new Ext.data.JsonStore({
			url: '/data_bases/get_details_of_shoes.json',
            fields: ['region', 'material', 'color', 'procession'],
            baseParams: {
                id: selection.getSelected().id
            },
            root: 'dos',
            autoLoad: true
        });

		var grid = new Ext.grid.GridPanel({
			region: 'center',
			height: 360,
			viewConfig: {
				forceFit: true
			},
			store: store,
			cm: cm,
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

