Zm.guests.add_to_determined_board = {
	init: function() {
		Ext.Ajax.request({
			url: '/guests/add_to_determined_board.json',
			method: 'post',
			jsonData: {
				id: Zm.guests.judge_add_to_determined_board.change_id
			},
			success: function() {
				Ext.Msg.alert('添加', '添加成功!')
			},
			failure: function() {
				Ext.Msg.alert('添加', '添加失败！')
			}
		})
	}
}

