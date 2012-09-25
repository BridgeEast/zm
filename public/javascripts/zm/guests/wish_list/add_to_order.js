Zm.guests.add_to_order = {
	//isInit: false,
	init: function(config) {
		Ext.QuickTips.init();
		this.config = config;
		this.unSelectAll = Zm.guests.checkbox.unSelectAll(); //不是this.unSelectAll
		this.win = this.createWin();
		//this.isInit = true;
	},

	createWin: function() {
		return new Ext.Window({
			layout: 'border',
			id: 'win',
			closeAction: 'hide',
			height: 450,
			width: 600,
			constrainHeader: true,
			resizable: true,
			items: [this.make_order_form(), this.make_order_grid()],
			buttons: [{
				text: '确定',
				scope: this,
				handler: function() {
					Zm.guests.determine.add(this.config);
					Ext.getCmp('wlGrid').unSelectAll();
				}
			},
			{
				text: '重置',
				scope: this,
				handler: function() {
					Ext.getCmp('makeOrderForm').getForm().reset();
					Ext.getCmp('makeOrderGrid').getStore().removeAll();
					this.reloadData()
				}
			},
			{
				text: '取消',
				scope: this,
				handler: function() {
					this.win.hide();
					Ext.getCmp('makeOrderForm').getForm().reset();
					Ext.getCmp('makeOrderGrid').getStore().removeAll();
					Ext.getCmp('wlGrid').unSelectAll();
				}
			}]
		});
	},

	reloadData: function() {
		this.config.data.forEach(function(sample_id) {
			var record = new Ext.data.Record({
				sample_id: sample_id[0]
			})
			store.add(record)
		})
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
						id: 'remark',
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
                    id: 'order_name',
					inputType: 'file'
				}]
			}]
		});
	},

	make_order_grid: function() {
		var cm = new Ext.grid.ColumnModel([{
			header: '样品号',
			dataIndex: 'sample_id'
		},
		{
			header: '38',
			dataIndex: '38',
			editor: new Ext.form.NumberField({
				allowNegative: false,
				allowDecimals: false,
				regex: /^[0-9]*[1-9][0-9]*$/,
				regexText: '只能输入正整数'
			})
		},
		{
			header: '39',
			dataIndex: '39',
			editor: new Ext.form.NumberField({
				allowNegative: false,
				allowDecimals: false,
				regex: /^[0-9]*[1-9][0-9]*$/,
				regexText: '只能输入正整数'
			})
		},
		{
			header: '40',
			dataIndex: '40',
			editor: new Ext.form.NumberField({
				allowNegative: false,
				allowDecimals: false,
				regex: /^[0-9]*[1-9][0-9]*$/,
				regexText: '只能输入正整数'
			})
		},
		{
			header: '41',
			dataIndex: '41',
			editor: new Ext.form.NumberField({
				allowNegative: false,
				allowDecimals: false,
				regex: /^[0-9]*[1-9][0-9]*$/,
				regexText: '只能输入正整数'
			})
		},
		{
			header: '42',
			dataIndex: '42',
			editor: new Ext.form.NumberField({
				allowNegative: false,
				allowDecimals: false,
				regex: /^[0-9]*[1-9][0-9]*$/,
				regexText: '只能输入正整数'
			})
		},
		{
			header: '43',
			dataIndex: '43',
			editor: new Ext.form.NumberField({
				allowNegative: false,
				allowDecimals: false,
				regex: /^[0-9]*[1-9][0-9]*$/,
				regexText: '只能输入正整数'
			})
		},
		{
			header: '44',
			dataIndex: '44',
			editor: new Ext.form.NumberField({
				allowNegative: false,
				allowDecimals: false,
				regex: /^[0-9]*[1-9][0-9]*$/,
				regexText: '只能输入正整数'
			})
		}]);

		store = new Ext.data.ArrayStore({
			data: this.config.data,
			fields: 'sample_id 38 39 40 41 42 43 44'.split(' ')
		});

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

