Zm.guests.determine = {
	add: function() {
		if (Ext.get('order_id').dom.value == "") {
			Ext.Msg.alert("警告", "订单名不能为空")
		} else {
			var year = new Date().getFullYear();
			var mon = new Date().getMonth() + 1;
			if (mon < 10) {
				var month = '0' + mon
			}
			else {
				month = mon
			}
			var date = new Date().getDate();
			if (date < 10) {
				var day = '0' + date
			}
			else {
				day = date
			}
			var record = {
				order_id: Ext.get('order_id').dom.value,
				payment: Ext.getCmp('makeOrderForm').getForm().findField('type').getGroupValue(),
				production_date: year + '-' + month + '-' + day,
				shipment: false,
				lading_bill: false,
				state: '待定订单'
			};
			Ext.Ajax.request({
				url: '/guests/add_to_order.json',
				method: 'post',
				jsonData: {
					record: record
				},
				success: function() {
					Ext.getCmp('win').close();
					Ext.Msg.alert('添加', '添加成功！')
				},
				failure: function() {
					Ext.Msg.alert('添加', '添加失败！')
				}
			})
		}
	}
}

