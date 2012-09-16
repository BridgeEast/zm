Zm.services.makingFactoryOrder = {
	init: function() {
    Ext.QuickTips.init();
		//Ext.Msg.alert('hello','world');
		Zm.pages.ViewPort = { //i don't know what it readly it,shit,Zm.pages.ViewPort......
			title: '客户－工厂订单管理',
			layout: 'border',
			region: 'center',
			items: [{
				region: 'north',
				height: 380,
				layout: 'border',
				split: true,
				items: [this.createMfo1Tree(), this.createMfo1Grid()]
			},
			{
				region: 'center',
				height: 80,
				layout: 'border',
				items: [this.createMfo2Tree(), this.createMfo2Grid()]
			}]
		};
	},
	//++++++++++++++++++++++++++++++++createMfo1Tree ++++++++++++++++++++++++++++++++++++++++
	createMfo1Tree: function() {
		var Mfo1TreeLoader = new Ext.tree.TreeLoader({
			dataUrl: '/services/getMfo1TreeNode.json'
		});

		var Mfo1TreeRoot = new Ext.tree.AsyncTreeNode({
			text: '全部订单',
			id: '0',
			draggable: false,
		});
		//    root.expand();
		var Mfo1Tree = new Ext.tree.TreePanel({
			//renderTo:'tree1',//这也一另一种渲染手法，你也可以在下面body里找到div
			//autoHeight:true,// 如果是这种渲染手法，就要为它加上这个属性，不然就要在div里设定div的高度
			width: 100,
			split: true,
			maxSize: 150,
			minSize: 80,
			collapsible: true,
			autoScroll: true,
			loader: Mfo1TreeLoader,
			region: 'west',
			root: Mfo1TreeRoot,
		});

    Mfo1Tree.on('click', function(node) {
      

			var store = Ext.getCmp('Mfo1grid').store;
			var nodekind = node.id.toString().slice(-1);
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
				nodekind = 'nodeid';
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
		return Mfo1Tree;

	},
	//+++++++++++++++++++++++++++++++++createMfo1Grid++++++++++++++++++++++++++++++++++++++++
	createMfo1Grid: function() {
		//Ext.Msg.alert('hello','world');
		var Mfo1GridCm = new Ext.grid.ColumnModel([
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
			header: '码号',
			dataIndex: 'size'
		},
		{
			header: '数量',
			dataIndex: 'necessary_num'
		},
		{
			header: '日期',
			dataIndex: 'production_date'
		},
		{
			header: '备注',
			dataIndex: 'remark'
		}]);
		//------------------------------------------
		var Mfo1GridStore = new Ext.data.JsonStore({
			url: '/services/getAllOrdershoes.json',
			fields: ['id', 'photo_one', 'photo_two', 'shoes_id', 'types_of_shoes', 'suitable_people', 'colors', 'size', 'necessary_num', 'production_date', 'remark'],
			root: 'allOrdershoes',
			baseParams: {
				//yeardate: 'null',
				//monthdate: 'null',
				//excel_receive_id: 'null',
				nodekind: 'null',
				nodename: 'null',
			},
			//autoLoad: true
		});
		//Mfo1GridStore.load;
		var Mfo1gridContextMenu = new Ext.menu.Menu({ // 这里做了一个菜单，供下面的行的右键可用
			id: 'Mfo1gridContextMenu',
			defaults: {
				scope: this
			},
			items: [{ //菜单主要有什么内容，实现什么功能
				text: '查看详情',
				handler: function() {
					var shoes_id = Ext.getCmp('Mfo1grid').getSelectionModel().getSelected().data.id;
					var photo_one = Ext.getCmp('Mfo1grid').getSelectionModel().getSelected().data.photo_one;
					var photo_two = Ext.getCmp('Mfo1grid').getSelectionModel().getSelected().data.photo_two;
					// Ext.Msg.alert("xxx",shoes_id);
					//this.cwlWindow( this.checkDetailsForm(), this.checkDetailsGrid() ).show();
					Zm.services.checkDetail.createCheckDetails(shoes_id, photo_one, photo_two).show(); //invoke the function of looking details
					//var Mfo1GridStore = Ext.getCmp('detailGrid').Mfo1GridStore;
					//Mfo1GridStore.setBaseParam('id', shoes_id );
					//Mfo1GridStore.reload();
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

		var Mfo1grid = new Ext.grid.GridPanel({
			id: 'Mfo1grid',
			title: '请选择相关的订单',
			region: 'center',
			border: true,
			cm: Mfo1GridCm,
			store: Mfo1GridStore,
			width: 400,
			height: 300,
			viewConfig: {
				forceFit: true
			},
		});

		Mfo1grid.on("rowcontextmenu", function(grid, rowIndex, e) {
			e.preventDefault();
			grid.getSelectionModel().selectRow(rowIndex);
			Mfo1gridContextMenu.showAt(e.getXY());
		});
		return Mfo1grid;

	},

	//++++++++++++++++++++++++++++++++createMfo1Tree ++++++++++++++++++++++++++++++++++++++++
	createMfo2Tree: function() {
		var loader = new Ext.tree.TreeLoader({
			dataUrl: '/services/get_tree_node.json'
		});

		var root = new Ext.tree.AsyncTreeNode({
			text: '客户Excel接收',
			id: '0',
			draggable: false,
		});
		//    root.expand();
		var Mfo2Tree = new Ext.tree.TreePanel({
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

		return Mfo2Tree;
	},
	//+++++++++++++++++++++++++++++++++createMfo2Grid++++++++++++++++++++++++++++++++++++++++
	createMfo2Grid: function() {
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
			header: '码号',
			dataIndex: 'size'
		},
		{
			header: '数量',
			dataIndex: 'necessary_num'
		},
		{
			header: '日期',
			dataIndex: 'production_date'
		},
		{
			header: '备注',
			dataIndex: 'remark'
		}]);
		//------------------------------------------
		var store = new Ext.data.JsonStore({
			url: '/services/get_excel_shoes.json',
			fields: ['id', 'photo_one', 'photo_two', 'shoes_id', 'types_of_shoes', 'suitable_people', 'colors', 'size', 'necessary_num', 'production_date', 'remark'],
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
}

