Zm.guests.determine = {
	add: function(config) {
		if (Ext.get('order_id').dom.value == "") {
			Ext.Msg.alert("警告", "订单名不能为空")
		} else {
			year = new Date().getFullYear();
			var mon = new Date().getMonth() + 1;
			if (mon < 10) {
				month = '0' + mon
			}
			else {
				month = mon
			}
			var date = new Date().getDate();
			if (date < 10) {
				day = '0' + date
			}
			else {
				day = date
			}

			this.add_to_general_shoes(config);
			this.record()
		}
	},

	add_to_general_shoes: function(config) {
		var items = [];
        console.log('xxx',config);
		for (var i = 0; i < config.length; i++) {
			items.push({
				shoes_id: config[i][0],
				order_id: Ext.get('order_id').dom.value
			})
		}
		return items
	},

	record: function() {
		var record = {
			order_id: Ext.get('order_id').dom.value,
			payment: Ext.getCmp('makeOrderForm').getForm().findField('type').getGroupValue(),
			production_date: year + '-' + month + '-' + day,
			shipment: false,
			lading_bill: false,
			state: '待定订单',
			details_of_shoes_attributes: this.add_to_general_shoes()

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

