Zm.guests.add_to_order = {
	isInit: false,
	init: function(config) {
		this.unSelectAll();
		this.win = this.createWin(config);
		this.isInit = true;
	},

	createWin: function(config) {
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
                   console.log(Ext.getCmp('makeOrderGrid').getStore().getAt(0).data); 
       console.log('init' , config.data);
					Zm.guests.determine.add(config.data)
				}
			},
			{
				text: '重置',
				handler: function() {
					Ext.getCmp('makeOrderForm').getForm().reset();
					Ext.getCmp('makeOrderGrid').getStore().reload();
				}
			},
			{
				text: '取消',
				scope: this,
				handler: function() {
					this.win.hide(); //close会把win关掉，下次show时又要重新建win，很浪费资源
					Ext.getCmp('wlGrid').unSelectAll()
				}
			}]
		});
	},

	unSelectAll: function() { //每次点总选框再取消，用clearSelections()只能去掉每条记录前面的勾,总选框的勾去不掉，这是Ext的问题。
		Ext.grid.GridPanel.prototype.unSelectAll = function() { //prototype是原型的意思，
			var view = this.getView();
			var sm = this.getSelectionModel();
			if (sm) {
				sm.clearSelections(); //去掉每条记录前面的勾
				var hd = Ext.fly(view.innerHd); //下面是改那个总选框的样式，去掉它的勾，
				var c = hd.query('.x-grid3-hd-checker-on');
				if (c && c.length > 0) {
					Ext.fly(c[0]).removeClass('x-grid3-hd-checker-on')
				}
			}
		};
	},

	make_order_form: function() {
		return new Ext.form.FormPanel({
			id: 'makeOrderForm',
			title: '订单制作',
			region: 'north',
			//bodyStyle:……  //设置边距
			buttonAlign: 'center',
			labelAlign: 'right',
			labelWidth: 60,
			height: 150,
			defaults: { //下面有多少层items就有多少层defaults
				defaults: {
					defaults: {
						anchor: "90%"
					}
				}
			},
			frame: true,
			items: [{
				layout: 'column',
				items: [{
					columnWidth: .33,
					layout: 'form',
					items: [{
						xtype: 'textfield',
						fieldLabel: '订单名',
						id: 'order_id',
						allowBlank: false,
						name: 'textfield',
					}]
				},
				{
					columnWidth: .2,
					layout: 'form',
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
					columnWidth: .33,
					layout: 'form',
					items: [{
						xtype: 'textarea',
						fieldLabel: '备注',
						name: 'textarea',
					}]
				},
				]
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
			editor: new Ext.form.TextField({})
		},
		{
			header: '39',
			dataIndex: '39_size',
			editor: new Ext.form.TextField({})
		},
		{
			header: '40',
			dataIndex: '40_size',
			editor: new Ext.form.TextField({})
		},
		{
			header: '41',
			dataIndex: '41_size',
			editor: new Ext.form.TextField({})
		},
		{
			header: '42',
			dataIndex: '42_size',
			editor: new Ext.form.TextField({})
		},
		{
			header: '43',
			dataIndex: '43_size',
			editor: new Ext.form.TextField({})
		},
		{
			header: '44',
			dataIndex: '44_size',
			editor: new Ext.form.TextField({})
		}]);
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

