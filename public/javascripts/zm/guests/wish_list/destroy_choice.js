Zm.guests.destroy_choice = {
	init: function() {
		Ext.Ajax.request({
			url: '/guests/destroy_choice.json',
			method: 'post',
			jsonData: {
				id: Zm.guests.judge_destroy_choice.choice_id
			},
			success: function() {
				Ext.getCmp('wlGrid').store.load();
				Ext.Msg.alert('删除', '删除成功！');

			},
			failure: function() {
				Ext.Msg.alert('删除', '删除失败！')
			}
		})
	}
}

