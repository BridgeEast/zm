Zm.guests.determine = {
	add: function(config) {
		this.config = config
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
		}
		this.record()
	},

	add_to_size_of_shoes: function() {
		var records = [];
		var store = Ext.getCmp('makeOrderGrid').store;
		store.data.items.forEach(function(item) {
			var items = [];
			for (var i = 38; i < 45; i++) {
				if (item.data[i] != "") {
					items.push({
						size: i,
						necessary_num: parseInt(item.data[i])
					})
				}
			}
			records.push(items)
		})
		return records
	},

	add_to_play_board: function() {
		var items = [];
		var store = Ext.getCmp('makeOrderGrid').getStore();
		for (var i = 0; i < store.getCount(); i++) {
			items.push({
				board_kind: '开发板'
			})
		}
		return items
	},

	add_to_general_shoes: function(config) {
		var items = [];
		var records = this.add_to_play_board();
		var sizes = this.add_to_size_of_shoes();
		var store = Ext.getCmp('makeOrderGrid').getStore();
		for (var i = 0; i < store.getCount(); i++) {
			var data = store.getAt(i).data;
			items.push({
				shoes_id: config.data[i][0],
				production_date: year + '-' + month + '-' + day,
				size_of_shoes_attributes: sizes[i],
				play_board_attributes: records[i]
			})
		}
		return items
	},

	record: function() {
		var record = {
			order_id: Ext.get('order_id').dom.value,
			remark: Ext.getCmp('remark').getValue(),
			payment: Ext.getCmp('makeOrderForm').getForm().findField('type').getGroupValue(),
			production_date: year + '-' + month + '-' + day,
			shipment: false,
			lading_bill: false,
			state: '待定订单',
			general_shoes_attributes: this.add_to_general_shoes(this.config)
		};
		Ext.Ajax.request({
			url: '/guests/add_to_order.json',
			method: 'post',
			jsonData: {
				record: record
			},
			success: function() {
				Zm.guests.add_to_order.win.close();
				Ext.Msg.alert('添加', '添加成功！')
			},
			failure: function() {
				Zm.guests.add_to_order.win.close();
				Ext.Msg.alert('添加', '添加失败！')
			}
		})
	}
}

