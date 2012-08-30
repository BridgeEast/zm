Zm.guests.add_to_advanced_order = {
	init: function() {
		var make_advanced_order_form = new Ext.form.FormPanel({
			title: '预购单制作',
			region: 'north',
			buttonAlign: 'center',
			labelAlign: 'right',
			height: 130,
			frame: true,
			items: [{
				items: [{
					layout: 'column',
					items: [{
						columnWidth: .99,
						layout: 'form',
						labelAlign: 'left',
						items: [{
							width: 170,
							xtype: 'textarea',
							fieldLabel: '备注',
							name: 'textarea',

						}]
					}]
				}]
			}]
		});

		var make_advanced_order_cm = new Ext.grid.ColumnModel([{
			header: '样品号',
			dataIndex: 'sample_form_id',
			editor: new Ext.grid.GridEditor(
			new Ext.form.TextField({
				allowBlank: false
			}))
		},
		{
			header: '38',
			dataIndex: 'thirty_eight',
			editor: new Ext.grid.GridEditor(
			new Ext.form.TextField({
				allowBlank: false
			}))
		},
		{
			header: '39',
			dataIndex: 'thirty_nine',
			editor: new Ext.grid.GridEditor(
			new Ext.form.TextField({
				allowBlank: false
			}))
		},
		{
			header: '40',
			dataIndex: 'forty',
			editor: new Ext.grid.GridEditor(
			new Ext.form.TextField({
				allowBlank: false
			}))
		},
		{
			header: '41',
			dataIndex: 'forty_one',
			editor: new Ext.grid.GridEditor(
			new Ext.form.TextField({
				allowBlank: false
			}))
		},
		{
			header: '42',
			dataIndex: 'forty_two',
			editor: new Ext.grid.GridEditor(
			new Ext.form.TextField({
				allowBlank: false
			}))
		},
		{
			header: '43',
			dataIndex: 'forty_three',
			editor: new Ext.grid.GridEditor(
			new Ext.form.TextField({
				allowBlank: false
			}))
		},
		{
			header: '44',
			dataIndex: 'forty_four',
			editor: new Ext.grid.GridEditor(
			new Ext.form.TextField({
				allowBlank: false
			}))
		}]);

		var make_advanced_order_data = [['MH-30', '100', '42', '200', '100'], ['B-24', '100', '39', '100', '50'], ['F-42', '100', '38', '500', '480'], ['16MM宽', '100', '42', '520', '480'], ['7MM', '100', '41', '120', '120'], ['43/1*3', '100', '40', '250', '250']];

		var make_advanced_order_store = new Ext.data.Store({
			proxy: new Ext.data.MemoryProxy(make_advanced_order_data),
			reader: new Ext.data.ArrayReader({},
			[{
				name: 'sample_form_id'
			},
			{
				name: 'thirty_eight'
			},
			{
				name: 'thrity_nine'
			},
			{
				name: 'forty'
			},
			{
				name: 'forty_one'
			},
			{
				name: 'forty_two'
			},
			{
				name: 'forty_three'
			},
			{
				name: 'forty_four'
			}])
		});
		make_advanced_order_store.load();

		var make_advanced_order_grid = new Ext.grid.EditorGridPanel({
			height: 253,
			region: 'center',
			viewConfig: {
				forceFit: true
			},
			store: make_advanced_order_store,
			cm: make_advanced_order_cm,
			bbar: new Ext.PagingToolbar({
				pageSize: 10,
				store: make_advanced_order_store,
				displayInfo: true,
				displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
				emptyMsg: "没有记录"
			})
		});

		make_advanced_order_win = new Ext.Window({
			layout: 'border',
			closeAction: 'hide',
			height: 450,
			width: 600,
			constrainHeader: true,
			resizable: true,
			items: [make_advanced_order_form, make_advanced_order_grid],
			buttons: [{
				text: '确定'
			},
			{
				text: '重置'
			}]
		});

		return make_advanced_order_win

	}
}

