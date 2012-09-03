Zm.guests.check_and_update_shoes = {
    init: function() {
        var sm = new Ext.grid.CheckboxSelectionModel();
        var cm = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(), sm, {
            header: '样品号',
            dataIndex: 'shoes_id'
        },
        {
            header: '鞋型',
            dataIndex: 'types_of_shoes'
        },
        {
            header: '适合人群',
            dataIndex: 'suitable_people'
        },
        {
            header: '价格',
            dataIndex: 'price'
        },
        {
            header: '备注',
            dataIndex: 'remark'
        }]);

        var store = new Ext.data.JsonStore({
          url: '/guests/guest_order.json',
          fields: ['shoes_id', 'types_of_shoes', 'suitable_people', 'price', 'remark'],
          totalProperty: "totalProperty",
          root: "roots",
        });
        var grid = new Ext.grid.GridPanel({
            height: 570,
            autoScroll: true,
            loadMask: true,
            frame: true,
            viewConfig: {
                forceFit: true
            },
            cm: cm,
            sm: sm,
            store: store,
            bbar: new Ext.PagingToolbar({
                pageSize: 20,
                store: store,
                displayInfo: true,
                displayMsg: '显示第{0}条到{1}条记录，一共{2}条',
                emptyMsg: '没有记录'
            }),
            tbar: new Ext.Toolbar(['-', {
                text: '添加一个样品',
            },
            '-', {
                text: '删除所选样品',
            },
            '-'])
        });

        var checkAndUpdateShoes = new Ext.Window({
            constrainHeader: true,
            height: 600,
            width: 500,
            items: [grid],
            listeners: { "show": { fn: function(){ 
                store.proxy = new Ext.data.HttpProxy({ 
                    url: "/guests/get_guest_details.json",
                    method: "post",
                    jsonData: { idd: Ext.getCmp('omGridOne').getSelectionModel().getSelected().data["order_id"] }
                });
                store.load({ params: { start: 0, limit: 20 } });
            } } }
        })
        return checkAndUpdateShoes
    }
}

