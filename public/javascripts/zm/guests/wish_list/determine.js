Zm.guests.determine = {
	add: function(config) {
		this.config = config;
		price = 0;
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
		var linenumber = 0;
		store.data.items.forEach(function(item) {
			var number = 0;
			var items = [];
			for (var i = 38; i < 45; i++) {
				if (item.data[i] != "") {
					items.push({
						size: i,
						necessary_num: parseInt(item.data[i]),
						finished_num: 0,
						store_remaining: parseInt(item.data[i])
					})
					number += parseInt(item.data[i]);
				}
			}
			records.push(items);
			var unit_price = Ext.getCmp("wlGrid").getSelectionModel().getSelections()[linenumber].data.price;
			price += unit_price * number;
			linenumber++
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

	add_to_general_shoes: function(config) t{
		var items = [];
		var records = this.add_to_play_board();
		var sizes = this.add_to_size_of_shoes();
		var selection = Ext.getCmp("wlGrid").getSelectionModel().getSelections();
		var store = Ext.getCmp('makeOrderGrid').getStore();
		for (var i = 0; i < store.getCount(); i++) {
			var data = selection[i].data;
			items.push({
				photo_one: data.photo_one,
				photo_two: data.photo_two,
				shoes_id: data.shoes_id,
				types_of_shoes: data.types_of_shoes,
				suitable_people: data.suitable_people,
				colors: data.colors,
				price: data.price,
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
            order_url: Ext.getCmp('order_name').getValue(),
			production_date: year + '-' + month + '-' + day,
			shipment: false,
			lading_bill: false,
			state: '待定订单',
			general_shoes_attributes: this.add_to_general_shoes(this.config),
			total_price: price
		};
		Ext.Ajax.request({
			url: '/guests/add_to_order.json',
			method: 'post',
			jsonData: {
				record: record
			},
			success: function() {
				Zm.guests.add_to_order.win.hide();
				Ext.Msg.alert('添加', '添加成功！')
			},
			failure: function() {
				Zm.guests.add_to_order.win.hide();
				Ext.Msg.alert('添加', '添加失败！')
			}
		})
	}
}

