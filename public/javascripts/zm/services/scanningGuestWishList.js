Zm.services.scanningGuestWishList = {
	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	init: function() {
		//Ext.Msg.alert('hello','world');
		Zm.pages.ViewPort = { //i don't know what it readly it,shit,Zm.pages.ViewPort......
			layout: 'border',
			region: 'center',
			items: [this.createSgwlGrid(), this.createSgwlTree()]
		};
	},

	//+++++++++++++++++++++++++++EpapdGrid+++++++++++++++++++++++++++++++++++
	createSgwlGrid: function() {
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
			//notice,we haven't write the route yet.
			fields: ['id', 'name', 'remark'],
			root: 'region',
			autoLoad: true
		});

		var gridTbar = new Ext.Toolbar({
			defaults: {
				scope: this
			},
			items: [{
				text: '<font face=华文隶书 color="#993300">check details</font>',
				handler: function() {
					this.checkDetails("查看详情").show()
				}
			},
			{
				text: '<font face=华文隶书 color="#993300">talk to the client</font>',
				icon: '/images/user.png',
				handler: function() {
					this.communicateWithGuest().show()
				}
			}]
		});

		var SgwlGrid = new Ext.grid.GridPanel({
			id: 'SgwlGrid',
			title: '客服－浏览客户心愿单进行推销',
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
		return SgwlGrid;

	},
	//++++++++++++++++++++++++++++++++checkDetails:function+++++++++++++++++++++++++++++++
	checkDetails: function(type) {
		var checkGridCm = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(), {
			header: '部位',
			dataIndex: 'name'
		},
		{
			header: '材料',
			dataIndex: 'remark'
		},
		{
			header: '颜色',
			dataIndex: 'remark'
		},
		{
			header: '加工方法',
			dataIndex: 'remark'
		},
		]);

		var checkGridStore = new Ext.data.JsonStore({
			url: '/data_bases/get_region.json',
			fields: ['id', 'name', 'remark'],
			root: 'region',
			autoLoad: true
		});

		var checkGrid = new Ext.grid.GridPanel({
			id: 'checkGrid ',
			title: '部位',
			region: 'center',
			height: 150,

			cm: checkGridCm,
			store: checkGridStore,
			viewConfig: {
				forceFit: true
			},
		});

		var checkPhoto = new Ext.Panel({
			id: 'checkPhoto',
			// title: "xx",
			// height: 100,
			// width: 100,
			height: 100,
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
			height: 400,
			width: 600,
			items: [checkPhoto, checkGrid],
			buttons: [{
				text: 'uploadphoto',
				scope: this,
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

	//++++++++++++++++++++++++++++++++++++++++++++communicateWithGuest+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	communicateWithGuest: function() {

		var communicateText = new Ext.form.TextArea({ //fieldLabel:'备注',
			name: 'textarea',
			height: 270,
			width: 150,
		});

		var communicateEditor = new Ext.form.HtmlEditor({ //一个html的编辑器
			height: 200,
      autoWidth: true,
			fieldLabel: 'online editor',
			enableAlignments: true,
			//下面都是一些格式定义，不再赘述，自己看。
			enableColors: true,
			enableFont: true,
			enableFontSize: true,
			enableFormat: true,
			enableLinks: true,
			enableLists: true,
			enableSourceEdit: true,
			//buttons:[tp_b8],
		});

		var communicateTbar = new Ext.Toolbar({
			defaults: {
				scope: this
			},
			items: [{
				text: '客服：xxx,',
				icon: '/images/user.png',
				handler: function() {
					//var a=nof_1.getValue;
					Ext.MessageBox.alert('Congratulation!', '你的订单已提交到\'xxxx\'请等待客服人员的回复！');
				}
			},
			{
				text: '客户：xxx,',
				icon: '/images/user.png',
				handler: function() {
					//var a=nof_1.getValue;
					Ext.MessageBox.alert('Congratulation!', '你的订单已提交到\'xxxx\'请等待客服人员的回复！');
				}

			},
			{
				text: '查看资料',
				icon: '/images/docs.gif',
				handler: function() {
					//var a=nof_1.getValue;
					Ext.MessageBox.alert('Congratulation!', '你的订单已提交到\'xxxx\'请等待客服人员的回复！');
				}

			}]
		});

		var communicateBbar = new Ext.Toolbar({
			defaults: {
				scope: this
			},
			items: [{
				text: '聊天记录',
				icon: '/images/messages.png',
				handler: function() {
					//var a=nof_1.getValue;
					Ext.MessageBox.alert('Congratulation!', '你的订单已提交到\'xxxx\'请等待客服人员的回复！');
				}

			},
			{
				text: '清空记录',
				icon: '/images/cancel.png',
				handler: function() {
					//var a=nof_1.getValue;
					Ext.MessageBox.alert('Congratulation!', '你的订单已提交到\'xxxx\'请等待客服人员的回复！');
				}
			},
			{
				text: '传送图片',
				icon: '/images/image_add.png',

				handler: function() {
					//var a=nof_1.getValue;
					Ext.MessageBox.alert('Congratulation!', '你的订单已提交到\'xxxx\'请等待客服人员的回复！');
				}
			},
			{
				text: '传递附件',
				icon: '/images/folder_go.png',
				handler: function() {
					//var a=nof_1.getValue;
					Ext.MessageBox.alert('Congratulation!', '你的订单已提交到\'xxxx\'请等待客服人员的回复！');
				}
			}]

		})
		var communicateEditorBbar = new Ext.Toolbar({
			defaults: {
				scope: this
			},
			items: ['->',{
				text: '发送',
				handler: function() {
					//var a=nof_1.getValue;
					Ext.MessageBox.alert('Congratulation!', '你的订单已提交到\'xxxx\'请等待客服人员的回复！');
				}
			},
			{
				text: '关闭',
				handler: function() {
					//var a=nof_1.getValue;
					Ext.MessageBox.alert('Congratulation!', '你的订单已提交到\'xxxx\'请等待客服人员的回复！');
				}
			}]

		})

		var communicateWindow = new Ext.Window({
			title: '样品单1>>款号1',
			height: 600,
			width: 550,
			//region:'east',
			//layout:'border',
			closeAction: 'hide',
			minimizable: true,
			maximizable: true,
			closable: true,
			items: [{
				region: 'south',
				layout: 'fit',
				// width: 200,
				tbar: communicateTbar,
				items: [communicateText],
				bbar: communicateBbar,
			},
			{
				region: 'center',
				//layout: 'fit',
				// width: 200,
				//tbar:[q2],
				bbar: communicateEditorBbar,
				items: [communicateEditor],
			}

			],
			//bbar:[q1],
		});
		//talk_panel2.show();
		//
		return communicateWindow;

	},

	//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	createSgwlTree: function() {

		var SgwlTree = new Ext.tree.TreePanel({
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

		return SgwlTree;

	}
	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
};

