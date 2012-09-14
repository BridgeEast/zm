Zm.guests.delete_undetermined_order = {
    init: function() {
        var items = Ext.getCmp('omGridOne').getSelectionModel().getSelections();
        if (!Ext.isEmpty(items)) {
            var order_id = [];
            for (var i = 0; i < items.length; i++) {
                var record = items[i];
                var order_id = record.get('order_id');
                Ext.getCmp('omGridOne').store.remove(items[i]);
                Ext.Ajax.request({
                    url: '/guests/delete_undetermined_order',
                    method: 'post',
                    jsonData: {
                        order_id: record.get('order_id')
                    },
                    success: function() {
                        Ext.Msg.alert('删除', '删除成功')
                    },
                    failure: function() {
                        Ext.Msg.alert('删除', '删除失败')
                    }
                })
            }
        }
        else{ 
            Ext.Msg.alert('警告', '请选择记录')
        }
    }
}

