Zm.data_bases.delete_shoes = {
    init: function() {
          this.deleteShoes()
          },
    deleteShoes: function() {
        var selection = Ext.getCmp('storeOfShoesGrid').getSelectionModel();
        if (selection.getSelected()) {
            Ext.Ajax.request({
                url: '/data_bases/delete_shoes_and_detail_of_shoes.json',
                method: 'post',
                jsonData: {
                    id: selection.getSelected().id,
                },
                success: function() {
                    Ext.getCmp('storeOfShoesGrid').store.load();
                    Ext.Msg.alert('删除', '删除成功!');
                },
                failure: function() {
                    Ext.Msg.alert('删除', '删除失败!');
                },
            })
        } else {
            Ext.Msg.alert('警告', '请选择一条记录');
        }
    }
}

