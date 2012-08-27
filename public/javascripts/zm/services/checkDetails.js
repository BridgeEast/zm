Zm.services.checkDetail = {
	// ++++++++++++++++++++++++++++++++++++++++++++++++查看详情+++++++++++++++++++++++++++
	createCheckDetails: function(shoes_id) {
    //Ext.Msg.alert("xxx",shoes_id);

		var detailCm = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(), {
			header: '部位',
			dataIndex: 'region',
		},
		{
			header: '材料',
			dataIndex: 'material'
		},
		//这里可以不用指定type，但还是要的也好
		{
			header: '颜色',
			dataIndex: 'color',

		},
		{
			header: '加工方法',
			dataIndex: 'procession',

		},
		// 在下面的stroe里得到的数据，可以不按顺序就能读到这里来
		]);

		var detailStore = new Ext.data.JsonStore({
			url: '/managements/get_details_of_shoes.json',
			fields: ['color','material','procession','region','remark'],
			baseParams: {
				id: 'null'
			},
			root: 'dos',
		});
   // detailStore.load();
    detailStore.setBaseParam('id', shoes_id );
    detailStore.load();
   

		var detailGrid = new Ext.grid.EditorGridPanel({
			id: 'detailGrid ',
			//title: '部位',
			region: 'center',
			height: 200,
			cm: detailCm,
			store: detailStore,
			viewConfig: {
				forceFit: true
			},
		});

		var detailPhoto = new Ext.Panel({
			id: 'detailPhoto',
			// title: "xx",
			// height: 100,
			// width: 100,
			layout: 'column',
			items: [{
				title: 'photo1',
				columnWidth: .5
			},
			{
				title: 'photo2',
				columnWidth: .5
			}]
		});
 

		return new Ext.Window({
			id: 'detailWin',
			//title: type,
			modal: true,
			height: 600,
			width: 600,
			constrainHeader: true,
			//protect the frame out of the page 
			items: [detailGrid, detailPhoto],

		});
	},
}

