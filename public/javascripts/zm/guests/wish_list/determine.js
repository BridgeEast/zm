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
		this.record();
		Ext.getCmp('makeOrderForm').getForm().reset();
		Ext.getCmp('makeOrderGrid').getStore().removeAll();
	},

	add_to_size_of_shoes: function() {
		var items = [];
		var store = Ext.getCmp('makeOrderGrid').store
		store.data.items.forEach(function(item) {
			if (item.data[38] != '') items.push({
				size: 38,
				necessary_num: 100
			})
			if (item.data[39] != '') items.push({
				size: 38,
				necessary_num: 100
			})
		})
		//var items = [];
		//var store = Ext.getCmp('makeOrderGrid').getStore();
		//for (var i = 0; i < store.getCount(); i++) {
		//    var data = store.getAt(i).data;
		//    for (var j = 38; j < 45; j++) {
		//        if (data[j] != "") {
		//            items.push({
		//                size: 38,
		//                necessary_num: 100
		//            })
		//        }
		//    }
		//}
		//console.log(items)
		return items
	},

	add_to_play_board: function() {
		var items = [];
		var store = Ext.getCmp('makeOrderGrid').getStore();
		for (var i = 0; i < store.getCount(); i++) {
			var data = store.getAt(i).data;
			items.push({
				board_kind: '开发板'
			})
		}
		return items
	},

	add_to_general_shoes: function(config) {
		var items = [];
		records = this.add_to_play_board();
		var store = Ext.getCmp('makeOrderGrid').getStore();
		for (var i = 0; i < store.getCount(); i++) {
			var data = store.getAt(i).data;
			items.push({
				shoes_id: config.data[i][0],
				production_date: '2012-09-09',
				size_of_shoes_attributes: this.add_to_size_of_shoes(),
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
				Ext.getCmp('win').close();
				Ext.Msg.alert('添加', '添加成功！')
			},
			failure: function() {
				Ext.Msg.alert('添加', '添加失败！')
			}
		})
	}
}

