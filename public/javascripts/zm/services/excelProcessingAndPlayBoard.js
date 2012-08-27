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
			dataIndex: 'photo_one'
		},
		{
			header: '鞋图2',
			dataIndex: 'photo_two'
		},
		{
			header: '鞋号',
			dataIndex: 'shoes_id'
		},
		{
			header: '鞋型',
			dataIndex: 'types_of_shoes'
		},
		{
			header: '适用人群',
			dataIndex: 'suitable_people'
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
			dataIndex: 'sure_board'
		},
		{
			header: '完成打板时间',
			dataIndex: 'done_board'
		},
		{
			header: '备注',
			dataIndex: 'remark'
		}]);
		//------------------------------------------
		var store = new Ext.data.JsonStore({
			url: '/services/get_excel_shoes.json',
			fields: ['id','photo_one', 'photo_two', 'shoes_id', 'types_of_shoes', 'suitable_people', 'colors', 'price', 'sure_board', 'done_board', 'remark'],
			root: 'excel_shoes',
			autoLoad: true
		});
		//store.load;
		var gridTbar = new Ext.Toolbar({
			defaults: {
				scope: this
			},
			items: [{
				text: '添加鞋',
				handler: function() {// 这里一定要先用function，不然会直接引用下面的命令
          this.addOrModifyshoes("添加鞋").show()
				}
			},
			'-', {
				text: '删除所选',
				handler: function() {
          this.deleteShoes();
				}
			},
			'-', {
				text: '发送至心愿单',
				handler: function() {
				  
				}
			}]
		});

		var Epapbcontextmenu = new Ext.menu.Menu({ // 这里做了一个菜单，供下面的行的右键可用
			id: 'Epapbcontextmenu',
      defaults: { scope:this },
			items: [{ //菜单主要有什么内容，实现什么功能
				text: '查看详情',
				handler: function() {
          var shoes_id = Ext.getCmp('epapbGrid').getSelectionModel().getSelected().data.id;
          // Ext.Msg.alert("xxx",shoes_id);
          //this.cwlWindow( this.checkDetailsForm(), this.checkDetailsGrid() ).show();
          Zm.services.checkDetail.createCheckDetails(shoes_id).show();
          //var store = Ext.getCmp('detailGrid').store;
          //store.setBaseParam('id', shoes_id );
          //store.reload();
        }
			},
			{
				text: '修改',
				handler: function() {}
			},
			{
				text: '与客户交谈',
				handler: function() {}
			},
			{
				text: '修改确定打板时间',
				handler: function() {}

			},
			{
				text: '修改完成打板时间',
				handler: function() {}

			},
			{
				text: '打印',
				handler: function() {}

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

		EpapbGrid.on("rowcontextmenu", function(grid, rowIndex, e) {
			e.preventDefault();
			grid.getSelectionModel().selectRow(rowIndex);
			Epapbcontextmenu.showAt(e.getXY());
		});
		return EpapbGrid;

	},
	//++++++++++++++++++++++++++++++++addOrModifyshoes:function+++++++++++++++++++++++++++++++
	addOrModifyshoes: function(type) {
		var AOMSFormStore = new Ext.data.SimpleStore({
			fields: ['value', 'text'],
			data: [['value1', '高跟鞋'], ['value2', '平底鞋'], ['value3', '靴子']]
		});

		var AOMSForm = new Ext.form.FormPanel({
			id: 'AOMSForm',
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
					store: AOMSFormStore,
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
    //----------AOMSGrid-----
		var addGridEditorRegion = new Ext.grid.GridEditor(
		new Ext.form.ComboBox({
			id: 'addGridEditorRegion',
			store: new Ext.data.JsonStore({
				url: '/data_bases/get_region.json',
				method: 'get',
				// 当用户点击的时候才进行加载。
				root: 'region',
				// 表名？
				fields: ['id', 'region']
			}),
			triggerAction: 'all',
			//选择的一个属性
			displayField: 'region',
			valueField: 'id',
			editable: false
		}));

		var addGridEditorMaterial = new Ext.grid.GridEditor(
		new Ext.form.ComboBox({
			id: 'addGridEditorMaterial',
			store: new Ext.data.JsonStore({
				url: '/data_bases/get_material.json',
				method: 'get',
				// 当用户点击的时候才进行加载。
				root: 'material',
				// 表名？
				fields: ['id', 'material']
			}),
			triggerAction: 'all',
			//选择的一个属性
			displayField: 'material',
			valueField: 'id',
			editable: false
		}));

		var addGridEditorColor = new Ext.grid.GridEditor(
		new Ext.form.ComboBox({
			id: 'addGridEditorColor',
			store: new Ext.data.JsonStore({
				url: '/data_bases/get_color.json',
				method: 'get',
				// 当用户点击的时候才进行加载。
				root: 'color',
				// 表名？
				fields: ['id', 'color']
			}),
			triggerAction: 'all',
			//选择的一个属性
			displayField: 'color',
			valueField: 'id',
			editable: false
		}));

		var addGridEditorProcession = new Ext.grid.GridEditor(
		new Ext.form.ComboBox({
			id: 'addGridEditorProcession',
			store: new Ext.data.JsonStore({
				url: '/data_bases/get_procession.json',
				method: 'get',
				// 当用户点击的时候才进行加载。
				root: 'procession',
				// 表名？
				fields: ['id', 'procession']
			}),
			triggerAction: 'all',
			//选择的一个属性
			displayField: 'procession',
			valueField: 'id',
			editable: false
		}));

		var AOMSCm = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(), {
			header: '部位',
			dataIndex: 'region',
			editor: addGridEditorRegion,
			renderer: function(value) {
				var combo = Ext.getCmp("addGridEditorRegion");
				record = combo.findRecord(combo.valueField, value);
				return record ? record.get(combo.displayField) : combo.valueNotFoundText;
			}
		},
		{
			header: '材料',
			dataIndex: 'material',
			editor: addGridEditorMaterial,
			renderer: function(value) {
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
			renderer: function(value) {
				var combo = Ext.getCmp("addGridEditorColor");
				record = combo.findRecord(combo.valueField, value);
				return record ? record.get(combo.displayField) : combo.valueNotFoundText;
			}

		},
		{
			header: '加工方法',
			dataIndex: 'procession',
			editor: addGridEditorProcession,
			renderer: function(value) {
				var combo = Ext.getCmp("addGridEditorProcession");
				record = combo.findRecord(combo.valueField, value);
				return record ? record.get(combo.displayField) : combo.valueNotFoundText;
			}

		},
		// 在下面的stroe里得到的数据，可以不按顺序就能读到这里来
		]);

		var AOMSData = [];
		var AOMSStore = new Ext.data.JsonStore({
			proxy: new Ext.data.MemoryProxy(AOMSData),
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
		AOMSStore.load();

		var AOMSRecord = Ext.data.Record.create([{
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

		var AOMSGridTbar = new Ext.Toolbar(['-', {
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

		var AOMSGrid = new Ext.grid.EditorGridPanel({
			id: 'AOMSGrid',
			//title: '部位',
			region: 'center',
			height: 200,
			cm: AOMSCm,
			store: AOMSStore,
			tbar: AOMSGridTbar,
			clicksToEdit: 1,
			viewConfig: {
				forceFit: true
			},
		});

		var AOMSPhoto = new Ext.Panel({
			id: 'AOMSPhoto',
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
			id: 'AOMSWindow',
			title: type,
			modal: true,
			height: 600,
			width: 600,
			constrainHeader: true,
			//protect the frame out of the page 
			items: [AOMSForm,AOMSGrid,AOMSPhoto],
			buttons: [{
				text: '上传图片',
				scope: this
			},
			{
				text: '确定',
				scope: this
			},
			{
				text: '重置',
				scope: this
			},
			{
				text: '取消',
				scope: this,
			}]

		});
	},
	//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++deleteShoes++++++++++++++++++++++++
	deleteShoes: function() {
		var selection = Ext.getCmp('epapbGrid').getSelectionModel();
		if (selection.getSelected()) {
			Ext.Ajax.request({
				url: '/services/delete_shoes_and_detail_of_shoes.json',
				method: 'post',
				jsonData: {
					id: selection.getSelected().id,

				},
				success: function() {
					Ext.getCmp('epapbGrid').store.load();
					Ext.Msg.alert('删除', '删除成功!');
				},
				failure: function() {
					Ext.Msg.alert('删除', '删除失败!');
				},
			})
		} else {
			Ext.Msg.alert('警告', '请选择一条记录');
		}

	},
  //+++++++++++++++++++++++++++++++send_to_wish_list++++++++++++++++++++++++++++++++++++++++++
  
  //++++++++++++++++++++++++++++++++++check_details++++++++++++++++++++++++++++++++++++++++++++
  
	//+++++++++++++++++++++++++++++++++++EpapbTree+++++++++++++++++++++++++++++++++++++++++++++++
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

