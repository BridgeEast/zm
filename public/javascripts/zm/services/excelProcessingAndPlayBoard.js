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
			dataIndex: 'photo_one',
			renderer: title_img
		},
		{
			header: '鞋图2',
			dataIndex: 'photo_two',
			renderer: title_img
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
			fields: ['id', 'photo_one', 'photo_two', 'shoes_id', 'types_of_shoes', 'suitable_people', 'colors', 'price', 'sure_board', 'done_board', 'remark'],
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
				handler: function() { // 这里一定要先用function，不然会直接引用下面的命令
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
			defaults: {
				scope: this
			},
			items: [{ //菜单主要有什么内容，实现什么功能
				text: '查看详情',
				handler: function() {
					var shoes_id = Ext.getCmp('epapbGrid').getSelectionModel().getSelected().data.id;
					var photo_one = Ext.getCmp('epapbGrid').getSelectionModel().getSelected().data.photo_one;
					var photo_two = Ext.getCmp('epapbGrid').getSelectionModel().getSelected().data.photo_two;
					// Ext.Msg.alert("xxx",shoes_id);
					//this.cwlWindow( this.checkDetailsForm(), this.checkDetailsGrid() ).show();
					Zm.services.checkDetail.createCheckDetails(shoes_id, photo_one, photo_two).show();
					//var store = Ext.getCmp('detailGrid').store;
					//store.setBaseParam('id', shoes_id );
					//store.reload();
				}
			},
			{
				text: '修改',
				handler: function() {
					//this.updateShoes("修改");
					this.updateShoes();
				}
			},
			{
				text: '与客户交谈',
				handler: function() {
					Zm.services.communicateWithGuest.createCommunicateWithGuest().show();
				}
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
	addOrModifyshoes: function(type,shoes_id) {
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
	

		
    if(type=="添加鞋"){ 
      var AOMSData = [{ region:'1',material:'3',color:'4',procession:'5' }];
	  	var AOMSStore = new Ext.data.Store({
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
    
    }else
      {
        var AOMSStore = new Ext.data.JsonStore({
				url: '/services/get_details_of_shoes_all_id.json',
				fields: ['color', 'material', 'procession', 'region', 'remark'],
				baseParams: {	id: 'null'	},
				root: 'dos',
			});
      //console.log("xx",shoes_id);
      AOMSStore.setBaseParam('id', shoes_id);
			AOMSStore.load();      
      }

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
    var value;
    function addGridEditorColoraji(value) {
        console.log("xx",value);
				var combo = Ext.getCmp("addGridEditorColor");
				record = combo.findRecord(combo.valueField, value);
				return record ? record.get(combo.displayField) : combo.valueNotFoundText;
			}

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
			renderer: addGridEditorColoraji(value),
		},
		{
			header: '加工方法',
			dataIndex: 'procession',
			editor: addGridEditorProcession,
			renderer: function(value) {
        console.log("xxxxxx",value)
				var combo = Ext.getCmp("addGridEditorProcession");
			record = combo.findRecord(combo.valueField, value);
			return record ? record.get(combo.displayField) : combo.valueNotFoundText;
	}

		},
		// 在下面的stroe里得到的数据，可以不按顺序就能读到这里来
		]);
    
    
		

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
				var p = new AOMSRecord({
					region: '',
					material: '',
					color: '',
					procession: ''
				});
				AOMSGrid.stopEditing();
				AOMSStore.insert(0, p);
				AOMSGrid.startEditing(0, 0);
			}
		},
		'-', {
			text: '删除一行',
			handler: function() {
				Ext.Msg.confirm('信息', '确定要删除？', function(btn) {
					if (btn == 'yes') {
						var sm = AOMSGrid.getSelectionModel();
						var cell = sm.getSelectedCell();
						var record = AOMSStore.getAt(cell[0]);
						AOMSStore.remove(record);
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
      autoShow: true,
      //activeItem:
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
			items: [AOMSForm, AOMSGrid, AOMSPhoto],
			buttons: [{
				text: '上传图片',
				scope: this
			},
			{
				text: '确定',
				scope: this,
				handler: function() {
					this.checkForShoes(type);
				}
			},
			{
				text: '重置',
				scope: this,
				handler: function() {
					
				}
			},
			{
				text: '取消',
				scope: this,
			}]

		});
	},
	//+++++++++++++++++++++++++++++++updata_shoes++++++++++++++++++++++++++++++++++++++++++++++++
	updateShoes: function() {
		var selection = Ext.getCmp('epapbGrid').getSelectionModel();
		if (!selection.getSelected()) {
			Ext.Msg.alert('警告', '请选择一条记录');
		} else {
			var data = selection.getSelected().data;
      var shoes_id = data.id;
			this.addOrModifyshoes("修改",shoes_id).show();
			
			Ext.getCmp('shoes_id').setValue(data["shoes_id"]);
			Ext.getCmp('types_of_shoes').setValue(data["types_of_shoes"]);
			Ext.getCmp('suitable_people').setValue(data["suitable_people"]);
			Ext.getCmp('price').setValue(data["price"]);
			Ext.getCmp('colors').setValue(data["colors"]);
			Ext.getCmp('remark').setValue(data["remark"]);
			
		/*	var tempgrid = new Ext.grid.EditorGridPanel({
				id: 'tempgird',
				store: detailStore,
				viewConfig: {
					forceFit: true
				},
			});*/
			// detailStore.load();
      //console.log("id",shoes_id);
		//	detailStore.setBaseParam('id', shoes_id);
			//detailStore.load();
      //console.log("dataDos", detailStore.getCount());
			//var dataDos = detailStore.data;
		//	Ext.getCmp("AOMSGrid").getStore().loadData(dataDos);

		};
	},

	// if(type=='修改'){ 
	//   Ext.Msg.alert("xxx");
	//   var data = Ext.getCmp('colorGrid').getSelectionModel().getSelected().data

	//  }
	//+++++++++++++++++++++++++++++++checkForShoes+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	createDetailShoes: function() {
		var store = Ext.getCmp('AOMSGrid').getStore();
		//var count=store.getCount();
		//console.log("count",count);
		var detailrecord = [];
		for (i = 0; i < store.getCount(); i++) {
			var data = store.getAt(i).data;

			detailrecord.push({
				region_id: data.region,
				material_id: data.material,
				color_id: data.color,
				procession_id: data.procession
			});

		} //返回记录，记住这里的region_id：要与数据库的字段一致
		// console.log("detailrecord",detailrecord[0].region_id);
		return detailrecord;

	},
	checkForShoes: function(type) {

		var selection = Ext.getCmp('epapbGrid').getSelectionModel();
		var shoesId = Ext.getCmp('shoes_id').getValue();
		var suitablePeople = Ext.getCmp('suitable_people').getValue();
		var color = Ext.getCmp('colors').getValue();
		var typesOfShoes = Ext.getCmp('types_of_shoes').getValue();
		var price = Ext.getCmp('price').getValue();
		var remark = Ext.getCmp('remark').getValue();
		var productionDate = date2str(new Date());
		var win
		var record = {
			shoes_id: shoesId,
			suitable_people: suitablePeople,
			colors: color,
			types_of_shoes: typesOfShoes,
			price: price,
			remark: remark,
			production_date: productionDate,
			details_of_shoes_attributes: this.createDetailShoes(),
			// 返回的是一个数组，数组包含几条记录如：｛key:value,key:value....｝等。
		};
		function date2str(d) {
			var ret = d.getFullYear() + "-"
			ret += ("00" + (d.getMonth() + 1)).slice( - 2) + "-"
			ret += ("00" + d.getDate()).slice( - 2) + " "
			return ret;
		}
		if (shoesId) {
			if (type == "修改") {
				var record = {
					id: selection.getSelected().id,
					shoes_id: shoesId,
					suitable_people: suitablePeople,
					colors: color,
					types_of_shoes: typesOfShoes,
					price: price,
					remark: remark,
					production_date: productionDate,
					details_of_shoes_attributes: this.createDetailShoes(),
					// 返回的是一个数组，数组包含几条记录如：｛key:value,key:value....｝等。
				};

				Ext.Ajax.request({
					url: '/services/updata_in_generalanddetail.json',
					method: 'post',
					jsonData: {
						record: record
					},
					success: function() {
						Ext.getCmp('epapbGrid').store.load();
						Ext.getCmp('AOMSWindow').close();
						Ext.Msg.alert('修改', '修改成功');
						// Ext.Msg.alert('',this.createData.region_id)
					},
					failure: function() {
						Ext.Msg.alert('修改', '修改失败!');
					},
				});
			} else {
				Ext.Ajax.request({
					url: '/services/create_in_generalanddetail.json',
					method: 'post',
					jsonData: {
						record: record
					},
					success: function() {
						Ext.Msg.alert('添加', '添加成功!');
					},
					failure: function() {
						Ext.Msg.alert('添加', '添加失败!');
					},
					callback: function() {
						Ext.getCmp('AOMSForm').form.reset();
						Ext.getCmp('AOMSWindow').close();
						Ext.getCmp('epapbGrid').store.load();
					}
				});
			}
		}
		else {
			Ext.Msg.alert('警告', '样品号不能为空!');
		}
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

