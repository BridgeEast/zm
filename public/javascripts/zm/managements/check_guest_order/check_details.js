Zm.managements.checkDetailsWin = {
	init: function(selected_shoes_id, photo_one, photo_two) {
		var checkDetailsForm = new Ext.form.FormPanel({
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
					html: '<img src=\'/images/shoes/' + photo_one + '\' width=100% height=100%>'
				},
				{
					columnWidth: .5,
					html: '<img src=\'/images/shoes/' + photo_two + '\' width=100% height=100%>'
				}]
			}]
		});

		var checkDetailsCm = new Ext.grid.ColumnModel([
        { header: '部位', dataIndex: 'region'},
		    { header: '材料', dataIndex: 'material'},
		    { header: '颜色', dataIndex: 'color'},
		    { header: '加工方法', dataIndex: 'procession'}
    ]);

		var checkDetailsStore = new Ext.data.JsonStore({
			url: '/managements/get_cgo_check_details.json',
			fields: ['region', 'material', 'color', 'procession'],
			method: 'post',
			baseParams: {	id: selected_shoes_id },
           /* totalProperty: 'totalProperty' ,*/
			root: 'cgo_check_details',
      autoLoad: true
		});

        //store.load({ params: { start: 0 , limit: 2 } });

		var checkDetailsGrid = new Ext.grid.GridPanel({
			region: 'center',
			height: 360,
			viewConfig: { forceFit: true },
			store: checkDetailsStore,
			cm: checkDetailsCm,
			bbar: new Ext.PagingToolbar({
				pageSize: 10,
				store: store,
				displayInfo: true,
				diaplayMsg: '显示第{0}条到{1}条记录，一共{2}条',
				emptyMsg: "没有记录"
			})
		});

		var checkDetailsWin = new Ext.Window({
      layout: 'border',
			closeAction: 'hide',
			height: 600,
			width: 500,
			constrainHeader: true,
			resizable: false,
			items: [checkDetailsForm, checkDetailsGrid]
		});

		return checkDetailsWin
	}
}

