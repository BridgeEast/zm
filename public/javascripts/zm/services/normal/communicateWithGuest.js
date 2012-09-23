Zm.services.communicateWithGuest = {
	createCommunicateWithGuest: function() {
		//Ext.Msg.alert("xxx");
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
				icon: '/images/im/user.png',
				handler: function() {
					//var a=nof_1.getValue;
					Ext.MessageBox.alert('Congratulation!', '你的订单已提交到\'xxxx\'请等待客服人员的回复！');
				}
			},
			{
				text: '客户：xxx,',
				icon: '/images/im/user.png',
				handler: function() {
					//var a=nof_1.getValue;
					Ext.MessageBox.alert('Congratulation!', '你的订单已提交到\'xxxx\'请等待客服人员的回复！');
				}

			},
			{
				text: '查看资料',
				icon: '/images/im/docs.gif',
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
				icon: '/images/im/messages.png',
				handler: function() {
					//var a=nof_1.getValue;
					Ext.MessageBox.alert('Congratulation!', '你的订单已提交到\'xxxx\'请等待客服人员的回复！');
				}

			},
			{
				text: '清空记录',
				icon: '/images/im/cancel.png',
				handler: function() {
					//var a=nof_1.getValue;
					Ext.MessageBox.alert('Congratulation!', '你的订单已提交到\'xxxx\'请等待客服人员的回复！');
				}
			},
			{
				text: '传送图片',
				icon: '/images/im/image_add.png',

				handler: function() {
					//var a=nof_1.getValue;
					Ext.MessageBox.alert('Congratulation!', '你的订单已提交到\'xxxx\'请等待客服人员的回复！');
				}
			},
			{
				text: '传递附件',
				icon: '/images/im/folder_go.png',
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
			items: ['->', {
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
			height: 630,
			width: 560,
			//region:'east',
			//layout:'border',
			closeAction: 'hide',
			minimizable: true,
			maximizable: true,
			closable: true,
      constrain: true,
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

}

