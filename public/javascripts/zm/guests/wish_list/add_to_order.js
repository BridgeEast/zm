Zm.guests.add_to_order = {
	init: function(config) {
		return new Ext.Window({
			layout: 'border',
			closeAction: 'hide',
			height: 450,
			width: 600,
			constrainHeader: true,
			resizable: true,
			items: [this.make_order_form(), this.make_order_grid(config)],
			buttons: [{
				text: '确定'
			},
			{
				text: '重置'
			}]
		})
	},

	make_order_form: function() {
		return new Ext.form.FormPanel({
			id: 'makeOrderForm',
			title: '订单制作',
			region: 'north',
			buttonAlign: 'center',
			labelAlign: 'right',
			height: 150,
			frame: true,
			items: [{
				items: [{
					layout: 'column',
					items: [{
						columnWidth: .2,
						xtype: 'fieldset',
						defaultType: 'radio',
						hideLabels: true,
						layout: 'form',
						items: [{
							boxLabel: '付全款',
							name: 'rad',
							value: '1',
							checked: true,
						},
						{
							boxLabel: '先付30%',
							name: 'rad',
							value: '2',
						}]
					},
					{
						columnWidth: .8,
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
			},
			{
				labelAlign: 'right',
				fieldLabel: '发送合同',
				labelWidth: 50,
				fileUpload: true,
				items: [{
					xtype: 'textfield',
					fieldLabel: '文件名',
					name: 'file',
					inputType: 'file'
				}]
			}]
		});
	},

	make_order_grid: function(config) {
		var cm = new Ext.grid.ColumnModel([{
			header: '样品号',
			dataIndex: 'sample_id'
		},
		{
			header: '38',
			dataIndex: '38_size',
			editor: new Ext.grid.GridEditor(
			new Ext.form.TextField({
				allowBlank: false
			}))
		},
		{
			header: '39',
			dataIndex: '39_size',
			editor: new Ext.grid.GridEditor(
			new Ext.form.TextField({
				allowBlank: false
			}))
		},
		{
			header: '40',
			dataIndex: '40_size',
			editor: new Ext.grid.GridEditor(
			new Ext.form.TextField({
				allowBlank: false
			}))
		},
		{
			header: '41',
			dataIndex: '41_size',
			editor: new Ext.grid.GridEditor(
			new Ext.form.TextField({
				allowBlank: false
			}))
		},
		{
			header: '42',
			dataIndex: '42_size',
			editor: new Ext.grid.GridEditor(
			new Ext.form.TextField({
				allowBlank: false
			}))
		},
		{
			header: '43',
			dataIndex: '43_size',
			editor: new Ext.grid.GridEditor(
			new Ext.form.TextField({
				allowBlank: false
			}))
		},
		{
			header: '44',
			dataIndex: '44_size',
			editor: new Ext.grid.GridEditor(
			new Ext.form.TextField({
				allowBlank: false
			}))
		}]);
		//console.log(ss = config);
		var store = new Ext.data.Store({
			proxy: new Ext.data.MemoryProxy(config.data),
			reader: new Ext.data.ArrayReader({},
			[{
				name: 'sample_id'
			}])
		});
		store.load();

		return new Ext.grid.EditorGridPanel({
			id: 'makeOrderGrid',
			height: 253,
			region: 'center',
			viewConfig: {
				forceFit: true
			},
			store: store,
			cm: cm,
			bbar: new Ext.PagingToolbar({
				pageSize: 10,
				store: store,
				displayInfo: true,
				displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
				emptyMsg: "没有记录"
			})
		});
	}
}

