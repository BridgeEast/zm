Zm.guests.judge_add_to_determined_board = {
	init: function() {
		this.change_id = [];
		defaults: {
			scope: this
		};
		if (Ext.getCmp('wlTree').getSelectionModel().getSelectedNode().id.split("-")[2] == "确认板") {
			Ext.Msg.alert("警告", "这些已经是确认板啦！")
		} else {
			this.change_id = [];
			var change_board_kind = Ext.getCmp("wlGrid").getSelectionModel().getSelections();
			for (var records = 0, len = change_board_kind.length; records < len; records++) {
				Ext.getCmp('wlGrid').store.remove(change_board_kind[records]);
			}
			Ext.each(change_board_kind, function(data) {
				this.change_id.push(data.id)
			},
			this);
			if (!Ext.isEmpty(this.change_id)) {
				Zm.guests.add_to_determined_board.init()
			}
			else {
				Ext.Msg.alert('警告', '请选择记录！')
			}
		}
	}
}		this.change_id = [];

