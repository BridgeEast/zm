Zm.guests.add_to_order = {
	init: function(config) {
		return new Ext.Window({
			id: 'win',
			layout: 'border',
			closeAction: 'hide',
			height: 450,
			width: 600,
			constrainHeader: true,
			resizable: true,
			items: [this.make_order_form(), this.make_order_grid(config)],
			buttons: [{
				text: '确定',
				handler: function() {
					var year = new Date().getFullYear();
					var mon = new Date().getMonth() + 1;
					if (mon < 10) {
						var month = '0' + mon
					}
					else {
						month = mon
					}
					var date = new Date().getDate();
					if (date < 10) {
						var day = '0' + date
					}
					else {
						day = date
					}
					var record = {
						order_id: '11',
						payment: Ext.getCmp('makeOrderForm').getForm().findField('type').getGroupValue(),
						production_date: year + '-' + month + '-' + day,
						shipment: false,
						lading_bill: false,
						state: '待定订单'
					};
					Ext.Ajax.request({
						url: '/guests/add_to_order.json',
						method: 'post',
						jsonData: {
							record: record
						},
						success: function() {
							Ext.getCmp('win').close();
							Ext.Msg.alert('添加', '添加成功！')
						},
						failure: function() {
							Ext.Msg.alert('添加', '添加失败！')
						}
					})
				}
			},
			{
				text: '重置'
			},
			{
				text: '取消',
				handler: function() {
					Ext.getCmp('win').close();
					//取消复选框的勾
					Ext.grid.GridPanel.prototype.unSelectAll = function() {
						var view = this.getView();
						var sm = this.getSelectionModel();
						if (sm) {
							sm.clearSelections();
							var hd = Ext.fly(view.innerHd);
							var c = hd.query('.x-grid3-hd-checker-on');
							if (c && c.length > 0) {
								Ext.fly(c[0]).removeClass('x-grid3-hd-checker-on')
							}
						}
					};
					Ext.getCmp('wlGrid').unSelectAll()
				}
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
						title: '付款方式',
						defaultType: 'radio',
						hideLabels: true,
						items: [{
							boxLabel: '付全款',
							name: 'type',
							inputValue: '付全款',
							checked: true,
						},
						{
							boxLabel: '先付30%',
							name: 'type',
							inputValue: '先付30%',
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

