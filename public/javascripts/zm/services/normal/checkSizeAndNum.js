Zm.services.checkSizeAndNum = {
	createCheckSizeAndNum: function(id,shoes_id) {
		var cm = new Ext.grid.ColumnModel([{
			header: '鞋号',
			dataIndex: 'shoes_id'
		},
		{
			header: '36',
			dataIndex: 'size_36'
		},
		{
			header: '37',
			dataIndex: 'size_37'
		},
		{
			header: '38',
			dataIndex: 'size_38'
		},
		{
			header: '39',
			dataIndex: 'size_39'
		},
		{
			header: '40',
			dataIndex: 'size_40'
		},
		{
			header: '41',
			dataIndex: 'size_41'
		},
		{
			header: '42',
			dataIndex: 'size_42'
		},
		{
			header: '43',
			dataIndex: 'size_43'
		},
		{
			header: '44',
			dataIndex: 'size_44'
		},
		]);
		var store = new Ext.data.JsonStore({
			url: '/services/checkSizeAndNum.json',
			fields: [ 'id', 'shoes_id', 'size_36', 'size_37', 'size_38', 'size_39', 'size_40', 'size_41', 'size_42', 'size_43', 'size_44' ],
        baseParams: {
				id: id,
        shoes_id: shoes_id
        
			},
			root: 'sizeAndNum',
		});
    store.load();
		var grid=new Ext.grid.GridPanel({
			id: 'checkSizeNum',
			cm: cm,
			store: store,
			viewConfig: {
				forceFit: true
			},
		});
   	return new Ext.Window({
			id: 'checkSizeAndNumWindow',
			//title: type,
			modal: true,
			height: 500,
			width: 600,
      layout: 'fit',
			constrainHeader: true,
			//protect the frame out of the page 
			items: [grid],

		});

	},

}

