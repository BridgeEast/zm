Zm.guests.communicate = {
	init: function() {
		// HtmlEditor需要这个
		Ext.QuickTips.init();

		var form = new Ext.form.FormPanel({
			region: 'center',
			title: '交谈-样品1',
			buttonAlign: 'center',
			frame: true,
			items: [{
				items: [{
						height: 220,
						width: 520,
						xtype: 'textarea',
						name: 'textarea'
					}]
			},
			{
				labelAlign: 'top',
				items: [{
					xtype: 'htmleditor',
					id: 'editor',
					width: 520,
					height: 120
				}]
			}],
			buttons: [{
				text: '发送'
			},
			{
				text: '取消'
			}]
		});

		win = new Ext.Window({
			region: 'center',
			labelAlign: 'top',
			layout: 'border',
			frame: true,
			closeAction: 'hide',
			height: 450,
			width: 548,
			constrainHeader: true,
			resizable: false,
			items: [form]
		});

		return win

	}

}

