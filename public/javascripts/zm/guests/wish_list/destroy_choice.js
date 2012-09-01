Zm.guests.destroy_choice = {
	init: function() {
		if (!Ext.isEmpty(Zm.guests.wish_list.choice_id)) {
            console.log(Zm.guests.wish_list.choice_id)
			Ext.Ajax.request({
				url: '/guests/destroy_choice.json',
				method: 'post',
				jsonData: {
					id: Zm.guests.wish_list.choice_id
				},
				success: function() {
					Ext.getCmp('wlGrid').store.load();
					Ext.Msg.alert('删除', '删除成功！');

				},
				failure: function() {
					Ext.Msg.alert('删除', '删除失败！')
				}
			})
		} else {
			Ext.Msg.alert('警告', '请选择记录')
		}
	}
}

