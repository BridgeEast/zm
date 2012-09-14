Zm.services.updatePlayBoardWin = { 
  init: function() { 


    var data = Ext.getCmp('sgwlGrid').getSelectionModel().getSelected().data;

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
		});

  },


	updatePlayBoard: function(shoes_id) {
		var sure = Ext.getCmp('sure_board').getValue();
		var done = Ext.getCmp('done_board').getValue();
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
				Ext.getCmp('sgwlGrid').store.load();
				Ext.getCmp('updatePlayBoardWin').close();
				Ext.Msg.alert('修改', '修改成功');
				// Ext.Msg.alert('',this.createData.region_id)
			},
			failure: function() {
				Ext.Msg.alert('修改', '修改失败!');
			},
		});
	},
  

}

