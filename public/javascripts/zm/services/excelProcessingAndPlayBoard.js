Zm.services.excelProcessingAndPlayBoard = {
	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	init: function() {
		//Ext.Msg.alert('hello','world');
		Zm.pages.ViewPort = { //i don't know what it readly it,shit,Zm.pages.ViewPort......
			layout: 'border',
			region: 'center',
			items: [this.createEpapbGrid(), this.createEpapbTree()]
		};
	},

	//+++++++++++++++++++++++++++EpapdGrid+++++++++++++++++++++++++++++++++++
	createEpapbGrid: function() {
		//Ext.Msg.alert('hello','world');
		var cm = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(), {
			header: '鞋图1',
			dataIndex: 'photoOne'
		},
		{
			header: '鞋图2',
			dataIndex: 'photoTwo'
		},
		{
			header: '鞋号',
			dtaIndex: 'shoesId'
		},
		{
			header: '鞋型',
			dataIndex: 'typesOfShoes'
		},
		{
			header: '适用人群',
			dataIndex: 'suitablePeople'
		},
		{
			header: '颜色',
			dataIndex: 'colors'
		},
		{
			header: '价格',
			dataIndex: 'price'
		},
		{
			header: '确定打板时间',
			dataIndex: 'sureBoard'
		},
		{
			header: '完成打板时间',
			dataIndex: 'doneBoard'
		},
		{
			header: '备注',
			dataIndex: 'remark'
		}]);
		//------------------------------------------
		var store = new Ext.data.JsonStore({
			url: '/data_bases/get_region.json',
			fields: ['id', 'name', 'remark'],
			root: 'region',
			autoLoad: true
		});
		var gridTbar = new Ext.Toolbar({
			defaults: {
				scope: this
			},
			items: [{
				text: '添加鞋',
				handler: function() {
					this.addShoes("添加鞋").show()
				}
			},
			'-', {
				text: '删除所选',
				handler: function() {
					this.deleteShoes()
				}
			},
			'-', {
				text: '发送至心愿单',
				handler: function() {
					this.sendToWishList()
				}
			}]
		});

		var EpapbGrid = new Ext.grid.GridPanel({
			id: 'epapbGrid',
			title: '客服-Excel文件处理及打板',
			region: 'center',
			//+++++++++++++
			border: true,

			cm: cm,
			store: store,
			width: 400,
			height: 300,
			viewConfig: {
				forceFit: true
			},
			tbar: gridTbar
		});
		return EpapbGrid;

	},
	//++++++++++++++++++++++++++++++++addShoes:function+++++++++++++++++++++++++++++++
	addShoes: function(type) {
		var addShoesFormComboStore = new Ext.data.SimpleStore({
			fields: ['value', 'text'],
			data: [['value1', '高跟鞋'], ['value2', '平底鞋'], ['value3', '靴子']]
		});

		var addShoesForm = new Ext.form.FormPanel({
			id: 'addShoesForm',
			labelAlign: 'right',
			labelWidth: 60,
			bodyStyle: 'padding: 10px 0 0 0',
			width: 600,
			height: 80,
			frame: true,

			layout: 'column',
			items: [{
				columnWidth: .33,
				layout: 'form',
				items: [{
					id: 'shoes_id',
					fieldLabel: '鞋号',
					xtype: 'textfield',
					width: 120
				},
				{
					id: 'types_of_shoes',
					fieldLabel: '鞋型',
					xtype: 'combo',
					width: 120,
					store: addShoesFormComboStore,
					displayField: 'text',
					valueField: 'text',
					mode: 'local',
					editable: false,
					triggerAction: 'all',
					emptyText: '请选择'
				}]
			},
			{
				columnWidth: .33,
				layout: 'form',
				items: [{
					id: 'suitable_people',
					fieldLabel: '适用人群',
					xtype: 'textfield',
					width: 120
				},
				{
					id: 'price',
					fieldLabel: '价格',
					xtype: 'textfield',
					width: 120
				}]

			},
			{
				columnWidth: .34,
				layout: 'form',
				items: [{
					id: 'colors',
					fieldLabel: '颜色',
					xtype: 'textfield',
					width: 120
				},
				{
					id: 'remark',
					fieldLabel: '备注',
					xtype: 'textfield',
					width: 120
				}]
			}]
		});
		//+++++++++++++++++++++++++++++++++++++++++++++addGrid+++++++++++++++++++++++++++++++
		var addGridEditorRegion = new Ext.grid.GridEditor(
		new Ext.form.ComboBox({
			id: 'addGridEditorRegion',
			store: new Ext.data.JsonStore({
				url: '/data_bases/get_region.json',
				method: 'get',// 当用户点击的时候才进行加载。
				root: 'region',// 表名？
				fields: ['id', 'region']
			}),
			triggerAction: 'all',//选择的一个属性
			displayField: 'region',
			valueField: 'id',
			editable: false
		})
    );

    var addGridEditorMaterial = new Ext.grid.GridEditor(
		new Ext.form.ComboBox({
			id: 'addGridEditorMaterial',
			store: new Ext.data.JsonStore({
				url: '/data_bases/get_material.json',
				method: 'get',// 当用户点击的时候才进行加载。
				root: 'material',// 表名？
				fields: ['id', 'material']
			}),
			triggerAction: 'all',//选择的一个属性
			displayField: 'material',
			valueField: 'id',
			editable: false
		})
    );

    var addGridEditorColor = new Ext.grid.GridEditor(
		new Ext.form.ComboBox({
			id: 'addGridEditorColor',
			store: new Ext.data.JsonStore({
				url: '/data_bases/get_color.json',
				method: 'get',// 当用户点击的时候才进行加载。
				root: 'color',// 表名？
				fields: ['id', 'color']
			}),
			triggerAction: 'all',//选择的一个属性
			displayField: 'color',
			valueField: 'id',
			editable: false
		})
    );

    var addGridEditorProcession = new Ext.grid.GridEditor(
		new Ext.form.ComboBox({
			id: 'addGridEditorProcession',
			store: new Ext.data.JsonStore({
				url: '/data_bases/get_procession.json',
				method: 'get',// 当用户点击的时候才进行加载。
				root: 'procession',// 表名？
				fields: ['id', 'procession']
			}),
			triggerAction: 'all',//选择的一个属性
			displayField: 'procession',
			valueField: 'id',
			editable: false
		})
    );
    

		var addGridCm = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(), {
			header: '部位',
			dataIndex: 'region',
      editor: addGridEditorRegion,
      renderer:function(value){ 
         var combo = Ext.getCmp("addGridEditorRegion");
                record = combo.findRecord(combo.valueField, value);
                return record ? record.get(combo.displayField) : combo.valueNotFoundText;
      }
		},
		{
			header: '材料',
			dataIndex: 'material',
      editor: addGridEditorMaterial,
      renderer:function(value){ 
         var combo = Ext.getCmp("addGridEditorMaterial");
                record = combo.findRecord(combo.valueField, value);
                return record ? record.get(combo.displayField) : combo.valueNotFoundText;
      }
		},
		//这里可以不用指定type，但还是要的也好
		{
			header: '颜色',
			dataIndex: 'color',
			editor: addGridEditorColor,
      renderer:function(value){ 
         var combo = Ext.getCmp("addGridEditorColor");
                record = combo.findRecord(combo.valueField, value);
                return record ? record.get(combo.displayField) : combo.valueNotFoundText;
      }

		},
		{
			header: '加工方法',
			dataIndex: 'procession',
      editor: addGridEditorProcession,
      renderer:function(value){ 
         var combo = Ext.getCmp("addGridEditorProcession");
                record = combo.findRecord(combo.valueField, value);
                return record ? record.get(combo.displayField) : combo.valueNotFoundText;
      }


		},
		// 在下面的stroe里得到的数据，可以不按顺序就能读到这里来
		]);
    
    var data=[];
		var addGridStore = new Ext.data.JsonStore({
			proxy: new Ext.data.MemoryProxy(data),
            reader: new Ext.data.ArrayReader({},
            [{
                name: 'region'
            },
            {
                name: 'material'
            },
            {
                name: 'color'
            },
            {
                name: 'procession'
            }])
		});
    addGridStore.load();

		var addGridRecord = Ext.data.Record.create([{
			name: 'region'
		},
		{
			name: 'material'
		},
		{
			name: 'color'
		},
		{
			name: 'procession'
		}]);

		var addGridTbar = new Ext.Toolbar(['-', {
			text: '添加一行',
			handler: function() {
				var p = new addGridRecord({
					region: '',
					material: '',
					color: '',
					procession: ''
				});
				addGrid.stopEditing();
				addGridStore.insert(0, p);
				addGrid.startEditing(0, 0);
			}
		},
		'-', {
			text: '删除一行',
			handler: function() {
				Ext.Msg.confirm('信息', '确定要删除？', function(btn) {
					if (btn == 'yes') {
						var sm = addGrid.getSelectionModel();
						var cell = sm.getSelectedCell();
						var record = addGridStore.getAt(cell[0]);
						addGridStore.remove(record);
					}
				});
			}
		},
		'-'])

		var addGrid = new Ext.grid.EditorGridPanel({
			id: 'addGrid ',
			//title: '部位',
			region: 'center',
			height: 200,
			cm: addGridCm,
			store: addGridStore,
			tbar: addGridTbar,
			viewConfig: {
				forceFit: true
			},
		});

		var addPhoto = new Ext.Panel({
			id: 'addPhoto',
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
			id: 'addShoesWindow',
			title: type,
			modal: true,
			height: 600,
			width: 600,
			constrainHeader: true,
			//protect the frame out of the page 
			items: [addShoesForm, addGrid, addPhoto],
			buttons: [{
				text: 'uploadphoto',
				scope: this
			},
			{
				text: 'sure',
				scope: this
			},
			{
				text: 'reset',
				scope: this
			}]

		});
	},

	//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	createEpapbTree: function() {

		var EpapbTree = new Ext.tree.TreePanel({
			//renderTo:'tree1',//这也一另一种渲染手法，你也可以在下面body里找到div
			//autoHeight:true,// 如果是这种渲染手法，就要为它加上这个属性，不然就要在div里设定div的高度
			width: 100,
			split: true,
			maxSize: 150,
			minSize: 80,
			collapsible: true,

			region: 'west',
			root: new Ext.tree.TreeNode({
				text: 'i am root'
			}),
		});

		return EpapbTree;

	}
	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
};

