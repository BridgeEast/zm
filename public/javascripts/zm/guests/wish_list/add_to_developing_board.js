Zm.guests.add_to_developing_board = {
	init: function() {
		Ext.Ajax.request({
			url: '/guests/add_to_developing_board.json',
			method: 'post',
			jsonData: {
				id: Zm.guests.wish_list.choice_id
			},
			success: function() {
				Ext.getCmp('wlGrid').store.load();
				Ext.Msg.alert('添加', '添加成功!')
			},
			failure: function() {
              Ext.Msg.alert('添加','添加失败！')
            }
		})
	}
}

