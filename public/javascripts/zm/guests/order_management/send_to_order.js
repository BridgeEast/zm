Zm.guests.send_to_order = {
    init: function() {
        var items = Ext.getCmp('omGridOne').getSelectionModel().getSelections();
        if (!Ext.isEmpty(items)) {
            for (var i = 0; i < items.length; i++) {
                var record = items[i];
                Ext.getCmp('omGridOne').store.remove(items[i]);
                Ext.Ajax.request({
                    url: '/guests/send_to_order.json',
                    method: 'post',
                    jsonData: {
                        order_id: record.get('order_id')
                    },
                    success: function() {
                        Ext.Msg.alert('添加', '添加成功');
                    },
                    failure: function() {
                        Ext.Msg.alert('添加', '添加失败')
                    }
                })
            }
        }
        else {
            Ext.Msg.alert('警告', '请选择记录！')
        }
    }
}

