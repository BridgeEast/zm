Zm.services.excelProcessingAndPlayBoard = {
	//+++++++++++++++++++++++++++++++++ initialize++++++++++++++++++++++++++++++++++++++
	init: function() {
    treenode=null;
		//Ext.Msg.alert('hello','world');
		Zm.pages.ViewPort = { //i don't know what it readly it,shit,Zm.pages.ViewPort......
			layout: 'border',
			region: 'center',
			items: [this.createEpapbGrid(), this.createEpapbTree()]
		};
	},

	//+++++++++++++++++++++++++++EpapdGrid,used for show the main message+++++++++++++++++++++++++++++++++++
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
			baseParams: {
				//yeardate: 'null',
				//monthdate: 'null',
				//excel_receive_id: 'null',
				nodekind: 'null',
				nodename: 'null',
			},
			//autoLoad: true
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
					var shoes_id = Ext.getCmp('EpapbGrid').getSelectionModel().getSelected().data.id;
					var photo_one = Ext.getCmp('EpapbGrid').getSelectionModel().getSelected().data.photo_one;
					var photo_two = Ext.getCmp('EpapbGrid').getSelectionModel().getSelected().data.photo_two;
					// Ext.Msg.alert("xxx",shoes_id);
					//this.cwlWindow( this.checkDetailsForm(), this.checkDetailsGrid() ).show();
					Zm.services.checkDetail.createCheckDetails(shoes_id, photo_one, photo_two).show(); //invoke the function of looking details
					//var store = Ext.getCmp('detailGrid').store;
					//store.setBaseParam('id', shoes_id );
					//store.reload();
				}
			},
			{
				text: '修改',
				handler: function() {
					this.updateShoes();

				}
			},
			{
				text: '与客户交谈',
				handler: function() {
					Zm.services.communicateWithGuest.createCommunicateWithGuest().show(); //invoke the im
				}
			},
			{
				text: '修改打板的时间',
				handler: function() {
					this.updatePlayBoardWin().show();

				}
			},
			{
				text: '打印',
				handler: function() {}

			}]
		});

		var EpapbGrid = new Ext.grid.GridPanel({
			id: 'EpapbGrid',
			title: '客服-Excel文件处理及打板',
			region: 'center',
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
	//++++++++++++++++++++++++++++++++addOrModifyshoes:function+++++++++++++++++++++++++++++++++++++++++++++++++++++++
	addOrModifyshoes: function(type, shoes_id) {
    /*if(treenode==null){ //if the custom hasn't click a excel node,than the treenode is null,and cannot create a new one!
      Ext.Msg.alert('Tip!','请选择一个excel节点！');
      return treenode;
    }*/
		var AOMSFormStore = new Ext.data.SimpleStore({
			fields: ['value', 'text'],
			data: [['value1', '高跟鞋'], ['value2', '平底鞋'], ['value3', '靴子']]
		});
		//------------------AOMSForm--------------------
		var AOMSForm = new Ext.form.FormPanel({
			id: 'AOMSForm',
			labelAlign: 'right',
			labelWidth: 60,
			bodyStyle: 'padding: 10px 0 0 0',
			//width: 600,
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
		//----------AOMSGrid------------------------
		//----------the combo in the editorGrid
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
		//------------------------------------------------------
		// //-----------------------------load the combo-store- 加括号的强制执行，你妹的
		void function() {

			Ext.getCmp('addGridEditorRegion').store.load();
			Ext.getCmp('addGridEditorMaterial').store.load(); // combo的store要先加载，详情的store加载后才能显示数据，这里可以放在这里，但是放的位置一定要小心s
			Ext.getCmp('addGridEditorColor').store.load();
			//	Ext.getCmp('addGridEditorProcession').store.load();
		} ()

		var AOMSCm = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(), {
			header: '部位',
			dataIndex: 'region',
			editor: addGridEditorRegion,
			renderer: function(value) {
				// Ext.getCmp('addGridEditorRegion').store.load();
				var combo = Ext.getCmp("addGridEditorRegion");
				record = combo.findRecord(combo.valueField, value);
				var display = Ext.getCmp("addGridEditorRegion").getStore();

				return record ? record.get(combo.displayField) : value;
			}
		},
		{
			header: '材料',
			dataIndex: 'material',
			editor: addGridEditorMaterial,
			renderer: function(value) {
				//	Ext.getCmp('addGridEditorMaterial').store.load(); // combo的store要先加载，详情的store加载后才能显示数据，这里可以放在这里，但是放的位置一定要小心s
				var combo = Ext.getCmp("addGridEditorMaterial");
				record = combo.findRecord(combo.valueField, value);
				//var display=Ext.getCmp("addGridEditorMaterial").getStore().getAt(value).data.material;
				return record ? record.get(combo.displayField) : value;
			}
		},
		//这里可以不用指定type，但还是要的也好
		{
			header: '颜色',
			dataIndex: 'color',
			editor: addGridEditorColor,
			renderer: function(value) {
				//	Ext.getCmp('addGridEditorColor').store.load();
				var combo = Ext.getCmp("addGridEditorColor");
				record = combo.findRecord(combo.valueField, value);
				//var display=Ext.getCmp("addGridEditorColor").getStore().getAt(value).data.color;
				return record ? record.get(combo.displayField) : value;
			}
		},
		{
			header: '加工方法',
			dataIndex: 'procession',
			editor: addGridEditorProcession,
			renderer: function(value) {
				// Ext.getCmp('AOMSGrid').getStore().reload();
				//	Ext.getCmp('addGridEditorProcession').store.load();
				var combo = Ext.getCmp("addGridEditorProcession");
				record = combo.findRecord(combo.valueField, value);
				// var display=Ext.getCmp("addGridEditorProcession").getStore().getAt(value).data.procession;
				return record ? record.get(combo.displayField) : value;
			}

		},
		// 在下面的stroe里得到的数据，可以不按顺序就能读到这里来
		]);

		if (type == "添加鞋") {
			var AOMSData = [];
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
			//AOMSStore.load();
		} else {
			var AOMSStore = new Ext.data.JsonStore({
				url: '/services/get_details_of_shoes_all_id.json',
				fields: ['color', 'material', 'procession', 'region', 'remark'],
				baseParams: {
					id: 'null'
				},
				root: 'dos',
			});
			//console.log("x",shoes_id);
			AOMSStore.setBaseParam('id', shoes_id);
		}
		// //-----------------------------load the combo-store- 加括号的强制执行，你妹的
		//AOMSStore.load();
		Ext.getCmp('addGridEditorProcession').store.load({
			callback: function() { //comboStore加载完毕之后回调时,才加载gridStore, 这只是一个scombo的store加载，不触发任何的函数，所以一定要用callback！ 虽然我们在上面和下面都有说直接去getCmp("xxxx").store.load();, 然后再直接AOMSStore.load(), 但这样会出错，有了callback后就没有出错了，但是还是要加载其它三个列的combo的store，我操！fuck！，这里一定要callback！！i fuck！
				AOMSStore.load()
			}
		});

		/*
    Ext.getCmp('addGridEditorRegion').store.load();// 也可以这样写，先加载一个combo的store，再把AOMSStore加载进来，这个AOMSStore里的数据就能得到正确的显示，而上面的combo.store.load({  }) 是写在load里面的一个回调函数，非常重要，！
    AOMSStore.load();
  
		AOMSStore.load();
    */
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
				AOMSStore.insert(0, p); //insert data above the head of store
				AOMSGrid.startEditing(0, 0); //start at x=0,y=0
        AOMSGrid.view.refresh();
			}
		},
		'-', {
			text: '删除一行',
			handler: function() {
				Ext.Msg.confirm('信息', '确定要删除？', function(btn) {
					if (btn == 'yes') {
						var sm = AOMSGrid.getSelectionModel(); //get the selected model
						var cell = sm.getSelectedCell(); //get the selected model's all cells
						var record = AOMSStore.getAt(cell[0]); //judge which row be selected,
						AOMSStore.remove(record); // remove it
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
				columnWidth: .5,

			},
			]
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
				scope: this,

				id: 'photo_upload',
				//labelAlign: 'right',
				xtype: 'textfield',
				fieldLabel: 'upload',
				name: 'file',
				inputType: 'file',
        blankText: '请上传文件',  
  
        anchor: '50%'  // anchor width by percentage

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
         var photo = Ext.getCmp('photo_upload').getValue();
         //var photo = Ext.getCmp('photo_upload').getEl();
       // var photo= Ext.getCmp('photo_upload').getValue();// only get a string...
        // var photo = Ext.getDom('photo_upload');
       // var aa=document.getElementById("photo_upload"); 
       
        

         console.log('aji: ',photo);
         Ext.Ajax.request({
					url: '/services/upload_photo.json',
					method: 'post',
          jsonData:{ 
            photo:photo
          },
          /*

					jsonData: {
						photo: photo
					},*/
					success: function() {
            alert('sucess');

					},
					failure: function() {
            alert('failure');
					},
				}); 

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
		var selection = Ext.getCmp('EpapbGrid').getSelectionModel();
		if (!selection.getSelected()) {
			Ext.Msg.alert('警告', '请选择一条记录');
		} else {
			var data = selection.getSelected().data;
			var shoes_id = data.id;
			this.addOrModifyshoes("修改", shoes_id).show();

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
	//++++++++++++++++++++++++++++++++++++++++++++checkForShoes+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
  createPlayBoards: function() {
    

		var playboard=[];
    
    var record={
      custom_num: 'aji',
      server_num: 'fuckfan',
      communication: 'fuckfan is sb',
      board_kind: '开发板'
    };
    playboard.push(record);
		return record;
	},


	checkForShoes: function(type) {

		var selection = Ext.getCmp('EpapbGrid').getSelectionModel();
		var shoesId = Ext.getCmp('shoes_id').getValue();
		var suitablePeople = Ext.getCmp('suitable_people').getValue();
		var color = Ext.getCmp('colors').getValue();
		var typesOfShoes = Ext.getCmp('types_of_shoes').getValue();
		var price = Ext.getCmp('price').getValue();
		var remark = Ext.getCmp('remark').getValue();
		var productionDate = date2str(new Date());
		var photo_one = Ext.getCmp('photo_upload').getValue();
		var excel_receive_id = treenode;
    var photo_url = Ext.get('photo_upload').dom;
		var win
		var record = {
			shoes_id: shoesId,
			suitable_people: suitablePeople,
			colors: color,
			types_of_shoes: typesOfShoes,
			price: price,
			remark: remark,
			production_date: productionDate,
			photo_one: photo_one,
			excel_receive_id: 1,
      photo_one: photo_url,
			details_of_shoes_attributes: this.createDetailShoes(),
      play_board_attributes: this.createPlayBoards(),// 这里的表名要写单

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
						Ext.getCmp('EpapbGrid').store.load();
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
						Ext.getCmp('EpapbGrid').store.load();
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
		var selection = Ext.getCmp('EpapbGrid').getSelectionModel();
		if (selection.getSelected()) {
			Ext.Ajax.request({
				url: '/services/delete_shoes_and_detail_of_shoes.json',
				method: 'post',
				jsonData: {
					id: selection.getSelected().id,

				},
				success: function() {
					Ext.getCmp('EpapbGrid').store.load();
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
	//++++++++++++++++++++++++++++++++++++++++++++updatePlayBoard++++++++++++++++++++++++++++++++++++++++++++
	updatePlayBoardWin: function() {
		var data = Ext.getCmp('EpapbGrid').getSelectionModel().getSelected().data;

		var updatePlayBoardForm = new Ext.form.FormPanel({
			id: 'updatePlayBoardForm',
			labelAlign: 'right',
			labelWidth: 50,
			bodyStyle: 'padding: 10px 10px 30px 30px',
			frame: true,
			defaultType: 'datefield',
			deafaults: {
				scope: this
			},
			items: [{
				id: 'sure_board',
				fieldLabel: '确定打板时间',
				format: 'Y-m-d',
				width: 200,
			},
			{
				id: 'done_board',
				fieldLabel: '完成打板时间',
				format: 'Y-m-d',
				width: 200,
			}],
			buttons: [{
				text: '确定',
				scope: this,
				//when you invoke some function,and show the 'uncaught typeError',you can add the scope:this,   
				handler: function() {
					this.updatePlayBoard(data.id);
          console.log("xxx",data.id);
				}
			},
			{
				text: '取消',
				handler: function() {
					Ext.getCmp('updatePlayBoardWin').close();
				}
			}]
		});

		Ext.getCmp('sure_board').setValue(data["sure_board"]);
		Ext.getCmp('done_board').setValue(data["done_board"]);

		return new Ext.Window({
			id: 'updatePlayBoardWin',
			title: "updataPlayBoard",
			height: 200,
			width: 400,
			constrainHeader: true,
			layout: 'fit',
			items: [updatePlayBoardForm]
		})

	},

	updatePlayBoard: function(shoes_id) {
		var sure = Ext.getCmp('sure_board').getValue();
		var done = Ext.getCmp('done_board').getValue();
		console.log('xxx', sure);
		var record = {
			sure_board: sure,
			done_board: done,
			general_shoe_id: shoes_id,

		};

		Ext.Ajax.request({
			url: '/services/updata_in_play_board.json',
			method: 'post',
			jsonData: {
				record: record
			},
			success: function() {
				Ext.getCmp('EpapbGrid').store.load();
				Ext.getCmp('updatePlayBoardWin').close();
				Ext.Msg.alert('修改', '修改成功');
				// Ext.Msg.alert('',this.createData.region_id)
			},
			failure: function() {
				Ext.Msg.alert('修改', '修改失败!');
			},
		});
	},
	//+++++++++++++++++++++++++++++++send_to_wish_list++++++++++++++++++++++++++++++++++++++++++
	//+++++++++++++++++++++++++++++++++++EpapbTree++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	createEpapbTree: function() {
		var loader = new Ext.tree.TreeLoader({
			dataUrl: '/services/get_tree_node.json'
		});

		var root = new Ext.tree.AsyncTreeNode({
			text: '客户Excel接收',
			id: '0',
			draggable: false,
		});
		//    root.expand();
		var EpapbTree = new Ext.tree.TreePanel({
			//renderTo:'tree1',//这也一另一种渲染手法，你也可以在下面body里找到div
			//autoHeight:true,// 如果是这种渲染手法，就要为它加上这个属性，不然就要在div里设定div的高度
			width: 100,
			split: true,
			maxSize: 150,
			minSize: 80,
			collapsible: true,
      autoScroll: true,
			loader: loader,
			region: 'west',
			root: root,
		});

		EpapbTree.on('click', function(node) {
      

			var store = Ext.getCmp('EpapbGrid').store;
			var nodekind = node.id.toString().slice( - 1);
			var nodename = node.id.toString().substring(0, node.id.toString().length - 1);
			console.log('nodekind', nodekind);
			console.log('nodename', nodename);

			if (nodekind == 'y') {
				store.setBaseParam('nodekind', nodekind); //must devide into 2 steps
				store.setBaseParam('nodename', nodename);
				store.reload();
			}
			else if (nodekind == 'm') {
				if (nodename < 10) nodename = '0' + nodename // 格式化一下日期
				var year = node.parentNode.id.toString().substring(0, node.parentNode.id.toString().length - 1); //得到父节点的什么年份
				nodename = year + '_' + nodename;
				console.log('nodename' + nodename);
				store.setBaseParam('nodekind', nodekind);
				store.setBaseParam('nodename', nodename);
				store.reload();
			}

			else {
        treenode=node.id;// 保存用到的全局变量
				nodekind = 'excelid';
				store.setBaseParam('nodekind', nodekind);
				store.setBaseParam('nodename', node.id);
				store.reload();
			}

			/*
      if(nodekind == 'y'){ 
        //var yeardate=.substring(0,4);
       // console.log('year',yeardate);
        console.log('nodename',nodename);
        store.setBaseParam('yeardate',nodename,'excel_receive_id',kong);
        store.reload();
      }
      else if(nodekind == 'm'){ 
        var yeardate=node.parentNode.id.toString().substring(0,node.parentNode.id.toString().length-1);
        store.setBaseParam( 'yeardate',yeardate, 'monthdate',nodename );
      
      }else
        {
        console.log('nodeid',node.id)
        store.removeAll();
        store.setBaseParam('excel_receive_id',node.id);
        store.reload();
        }
        
			//var store = Ext.getCmp('wlGrid').store;
			//store.setBaseParam("id", node.id);
			//store.reload();
    //*/
		});

		var contextmenu = new Ext.menu.Menu({
			id: 'treecontextmenu',
			items: [{
				text: 'open',
				handler: function() {
					alert('xxx');
				}
			},{
				text: 'download',
				handler: function() {
					alert('xxx');
				}
			}]

		});

    EpapbTree.on("contextmenu",function(node,e){ 
      e.preventDefault();
      node.select();
      contextmenu.showAt(e.getXY());
    });

		return EpapbTree;

	}
	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
};

