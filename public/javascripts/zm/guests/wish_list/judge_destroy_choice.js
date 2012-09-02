Zm.guests.judge_destroy_choice = {
	init: function() {
		this.choice_id = [];
		defaults: {
			scope: this //作用域是调用这个方法的对象
		};
		var selectedData = Ext.getCmp("wlGrid").getSelectionModel().getSelections();
		Ext.each(selectedData, function(data) {
			this.choice_id.push(data.id)
		},
		this);
		if (!Ext.isEmpty(this.choice_id)) {
			Zm.guests.destroy_choice.init()
		}
		else {
			Ext.Msg.alert('警告', '请选择记录！')
		}
	}
}

