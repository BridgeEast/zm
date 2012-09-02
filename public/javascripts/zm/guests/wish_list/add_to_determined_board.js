Zm.guests.add_to_determined_board = {
	init: function() {
		if (!Ext.isEmpty(Zm.guests.wish_list.change_id)) {
			Ext.Ajax.request({
				url: '/guests/add_to_determined_board.json',
				method: 'post',
				jsonData: {
					id: Zm.guests.wish_list.change_id
				},
				success: function() {
					Ext.Msg.alert('添加', '添加成功!')
				},
				failure: function() {
					Ext.Msg.alert('添加', '添加失败！')
				}
			})
		}
		else {
			Ext.Msg.alert('警告','请选择记录!')
		}
	}
}

