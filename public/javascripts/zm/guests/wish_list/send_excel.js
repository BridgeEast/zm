Zm.guests.send_excel = {
	init: function() {
		var send_excel_form = new Ext.form.FormPanel({
			labelAlign: 'right',
			title: '发送Excel',
            region:'center',
			labelWidth: 50,
			buttonAlign: 'center',
			frame: true,
			fileUpload: true,
			width: 280,
			items: [{
				xtype: 'textfield',
				fieldLabel: '文件名',
				name: 'file',
				inputType: 'file'
			}],
			buttons: [{
				text: '提交'
				/*,*/
				//handler: function() {
				//send_excel.getForm().submit({
				//success: function(send_excel1, action) {
				//Ext.Msg.alert('信息', action.result.msg);
				//},
				//failure: function() {
				//Ext.Msg.alert('错误', '失败');
				//}
				//});
				/*}*/
			}]
		});

		send_excel_win = new Ext.Window({
			layout: 'border',
			closeAction: 'hide',
			height: 150,
			width: 400,
			constrainHeader: true,
			resizable: false,
			items: [send_excel_form]
		});

		return send_excel_win

	}

}

