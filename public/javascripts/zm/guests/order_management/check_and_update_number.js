Zm.guests.check_and_update_number = {
    init: function() {
        var cm = new Ext.grid.ColumnModel([{
            header: '样品号',
            dataIndex: 'shoes_id'
        },
        {
            header: '38',
            dataIndex: 'size_38'
        },
        {
            header: '39',
            dataIndex: 'size_39'
        },
        {
            header: '40',
            dataIndex: 'size_40'
        },
        {
            header: '41',
            dataIndex: 'size_41'
        },
        {
            header: '42',
            dataIndex: 'size_42'
        },
        {
            header: '43',
            dataIndex: 'size_43'
        },
        {
            header: '44',
            dataIndex: 'size_44'
        }]);

        var store = new Ext.data.JsonStore({
            url: '/guests/get_shoes_size_num.json',
            fields: ['shoes_id', 'size_38', 'size_39', 'size_40', 'size_41', 'size_42', 'size_43', 'size_44'],
            totalProperty: 'totalProperty',
            root: 'roots'
        });

        var grid = new Ext.grid.EditorGridPanel({
            height: 578,
            autoScroll: true,
            loadMask: true,
            frame: true,
            viewConfig: {
                forceFit: true
            },
            store: store,
            cm: cm,
            bbar: new Ext.PagingToolbar({
                pageSize: 10,
                store: store,
                displayInfo: true,
                displayMsg: '显示第{0}条到{1}条记录，一共{2}条',
                emptyMsg: '没有记录'
            })
        });
        var checkAndUpdateNumber = new Ext.Window({
            height: 600,
            width: 500,
            frame: true,
            constrainHeader: true,
            items: [grid],
            listeners: { "show": { fn: function() { 
                var idd = Ext.getCmp('omGridOne').getSelectionModel().getSelected().data["order_id"];
                store.proxy = new Ext.data.HttpProxy({ 
                    url: '/guests/get_shoes_size_num.json',
                    method: 'post',
                    jsonData: { order_id: idd }
                });
                store.load({ params: { start: 0, limit: 20 } });
            } } }
        });
        return checkAndUpdateNumber
    }
}

