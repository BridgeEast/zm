Zm.guests.judge_add_to_order = {
	init: function() {
		this.add_to_order_id;
		defaults: {
			scope: this
		};
		if (Ext.getCmp('wlTree').getSelectionModel().getSelectedNode().id.split("-")[2] == "开发板") {
			Ext.Msg.alert("警告", "别急别急！请您先把选中的鞋添加到确认板！")
		} else {
			this.add_to_order_id = [];
			var add_to_order_records = Ext.getCmp("wlGrid").getSelectionModel().getSelections();
			for (var records = 0, len = add_to_order_records.length; records < len; records++) {
				Ext.getCmp('wlGrid').store.remove(add_to_order_records[records]);
			}
			Ext.each(add_to_order_records, function(data) {
				this.add_to_order_id.push(data.id)
			},
			this);
			if (!Ext.isEmpty(this.add_to_order_id)) {
				Zm.guests.add_to_order.init().show()
			}
			else {
				Ext.Msg.alert('警告', '请选择记录！')
			}
		}
	}
}

