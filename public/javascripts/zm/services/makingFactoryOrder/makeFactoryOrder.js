Zm.makingFactoryOrder.makeFactoryOrder = {
	makeFactoryOrder: function(record) {
		//---------------------------------------------mFOformStore1---
		var mFOformStore1 = new Ext.data.SimpleStore({
			fields: ['value', 'text'],
			data: [['value1', 'factory-a'], ['value2', 'factory-b'], ['value3', 'factory-c']]
		});

		var mFOformStore2 = new Ext.data.SimpleStore({
			fields: ['value', 'text'],
			data: [['value1', '付全款'], ['value2', '先付30％']]
		});

		var mFOform = new Ext.form.FormPanel({
			id: 'mFOform',
			//labelAlign: 'right',
			labelWidth: 50,
			bodyStyle: 'padding: 10px 0 0 0',
			width: 900,
			height: 100,
			frame: true,

			layout: 'column',
			items: [{
				id: 'factory_order_id',
				fieldLabel: 'hetonghao',
				xtype: 'textfield',
				width: 20,
				columnWidth: .25,
			},
			{
				id: 'factory',
				fieldLabel: 'gongchang',
				xtype: 'combo',
				width: 120,
				store: mFOformStore1,
				displayField: 'text',
				valueField: 'text',
				mode: 'local',
				editable: false,
				triggerAction: 'all',
				emptyText: '请选择',
				width: 120,
				columnWidth: .25,

			},
			{
				id: 'payment',
				fieldLabel: 'fukuanfangshi',
				xtype: 'combo',
				width: 120,
				store: mFOformStore2,
				displayField: 'text',
				valueField: 'text',
				mode: 'local',
				editable: false,
				triggerAction: 'all',
				emptyText: '请选择',
				width: 120,
				columnWidth: .25,

			},
			{
				id: 'remark',
				fieldLabel: 'beizhu',
				xtype: 'textfield',
				width: 100,
				columnWidth: .25,
			}]

		});
		//--------------------------------------mFOgrid1----
		var id = "";
		var shoes_id = "";
		for (var i = 0; i < record.length; i++) {
			id = id + record[i].id.toString();
			shoes_id = shoes_id + record[i].data.shoes_id.toString() + " ";
		};
		console.log("id", id);
		console.log("shoes_id", shoes_id);
		var id = 5
		var shoes_id = "tao"
		var mFOgrid1Cm = new Ext.grid.ColumnModel([{
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

		var id = "";
		var shoes_id = "";
		for (var i = 0; i < record.length; i++) {
			id = id + record[i].id.toString();
			shoes_id = shoes_id + record[i].data.shoes_id.toString() + " ";
		};
		console.log("id", id);
		console.log("shoes_id", shoes_id);

		var mFOgrid1Store = new Ext.data.JsonStore({
			url: '/services/checkMoreSizeAndNum.json',
			fields: ['id', 'shoes_id', 'size_36', 'size_37', 'size_38', 'size_39', 'size_40', 'size_41', 'size_42', 'size_43', 'size_44'],
			baseParams: {
				id: id,
				shoes_id: shoes_id

			},
			root: 'sizeAndNum',
		});
		mFOgrid1Store.load();
		var mFOgrid1 = new Ext.grid.GridPanel({
			id: 'mFOgrid1',
			cm: mFOgrid1Cm,
			height: 200,
			store: mFOgrid1Store,
			viewConfig: {
				forceFit: true
			},
		});

		//--------------------------------------mFOgrid2----
    var mFOgrid2CmEdit=new Ext.form.NumberField({ 
      allowBlank: false,
      vtype: 'alphanum',
    });
		var mFOgrid2Cm = new Ext.grid.ColumnModel([{
			header: '鞋号',
			dataIndex: 'shoes_id',

		},
		{
			header: '36',
			dataIndex: 'size_36',
			editor: mFOgrid2CmEdit,
		},
		{
			header: '37',
			dataIndex: 'size_37',
			editor: mFOgrid2CmEdit,
		},
		{
			header: '38',
			dataIndex: 'size_38',
			editor: mFOgrid2CmEdit,
		},
		{
			header: '39',
			dataIndex: 'size_39',
			editor: mFOgrid2CmEdit,
		},
		{
			header: '40',
			dataIndex: 'size_40',
			editor: mFOgrid2CmEdit,
		},
		{
			header: '41',
			dataIndex: 'size_41',
			editor: mFOgrid2CmEdit,
		},
		{
			header: '42',
			dataIndex: 'size_42',
			editor: mFOgrid2CmEdit,
		},
		{
			header: '43',
			dataIndex: 'size_43',
			editor: mFOgrid2CmEdit,
		},
		{
			header: '44',
			dataIndex: 'size_44',
			editor: mFOgrid2CmEdit,
		}]);

		var mFOgrid2Store = new Ext.data.JsonStore({
			url: '/services/checkMoreSizeAndNum.json',
			fields: ['id', 'shoes_id'],
			baseParams: {
				id: id,
				shoes_id: shoes_id,

			},
			root: 'sizeAndNum',
		});
		mFOgrid2Store.load();

    var mFOgrid2Bar = new Ext.Toolbar({
			defaults: {
				scope: this
			},
			items: [{
				text: 'save',
				handler: function() { // 这里一定要先用function，不然会直接引用下面的命令
          this.saveToSizeAndFactory();
          
        }
			},
			'-', {
				text: 'cancel',
				handler: function() {
				}
			}
			]
		});

		var mFOgrid2 = new Ext.grid.EditorGridPanel({
			id: 'mFOgrid2',
			cm: mFOgrid2Cm,
			height: 180,
			store: mFOgrid2Store,
			clicksToEdit: 1,
			viewConfig: {
				forceFit: true
			},
			autoShow: true,
      bbar: mFOgrid2Bar,
        
		});
   
    

		return new Ext.Window({
			id: 'makeFactoryOrderWin',
			//title: type,
			modal: true,
			height: 500,
			width: 900,
			//  layout: 'form',
			constrainHeader: true,
			//protect the frame out of the page 
			items: [mFOform, mFOgrid1, mFOgrid2],
		});

	},
   //---------------------------------------function-------------
    saveToSizeAndFactory: function(){ 
      var store = Ext.getCmp('mFOgrid2').getStore(); 
    },
}

