Zm.guests.check_order_schedule = {
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
            url: '/guests/guest_order.json',
            fields: ["shoes_id", "size_38", "size_39", "size_40", "size_41", "size_42", "size_43", "size_44"],
            totalProperty: "totalProperty",
            root: "roots",
        });
        var grid = new Ext.grid.GridPanel({
            height: 570,
            autoScroll: true,
            loadMask: true,
            frame: true,
            cm: cm,
            viewConfig: {
                forceFit: true
            },
            store: store,
            bbar: new Ext.PagingToolbar({
                pageSize: 10,
                store: store,
                displayInfo: true,
                displayMsg: '显示第{0}条到{1}条记录，一共{2}条',
                emptyMsg: '没有记录'
            })
        });

        var checkOrderSchedule = new Ext.Window({
            height: 600,
            width: 500,
            constrainHeader: true,
            items: [grid],
            listeners: {
                "show": {
                    fn: function() {
                        var orderid = Ext.getCmp('omGridTwo').getSelectionModel().getSelected().data["order_id"];
                        store.proxy = new Ext.data.HttpProxy({
                            url: "/guests/get_order_progress.json",
                            method: "post",
                            jsonData: {
                                orderid: orderid
                            },
                        });
                        store.load({
                            params: {
                                start: 0,
                                limit: 20
                            }
                        });
                    }
                }
            }
        })
        return checkOrderSchedule
    }
}

