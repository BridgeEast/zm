Zm.guests.judge_add_to_order = {
	init: function() {
		if (Ext.getCmp('wlTree').getSelectionModel().getSelectedNode().id.split("-")[2] == "开发板") {
			Ext.Msg.alert("警告", "别急别急！请您先把选中的鞋添加到确认板！")
		} else {
			var data = [];
			var records = Ext.getCmp("wlGrid").getSelectionModel().getSelections();
			Ext.each(records, function(record) {
				data.push([record.data.shoes_id]);
			});
			if (!Ext.isEmpty(data)) {
				Zm.guests.add_to_order.init({
					data: data
				}).show()
			}
			else {
				Ext.Msg.alert('警告', '请选择记录！')
			}
		}
	}
}

