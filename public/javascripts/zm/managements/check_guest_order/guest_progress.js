Ext.onReady(function(){
    var cm = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),
        { header: "鞋号", dataIndex: "shoes_id" },
        { header: "38", dataIndex: "size_38" },
        { header: "39", dataIndex: "size_39" },
        { header: "40", dataIndex: "size_40" },
        { header: "41", dataIndex: "size_41" }, 
        { header: "42", dataIndex: "size_42" },
        { header: "43", dataIndex: "size_43" },
        { header: "44", dataIndex: "size_44" }
    ]);

    var store = new Ext.data.JsonStore({
        url: "/managements/get_order_progress.json",
        fields: ["shoes_id", "size_38", "size_39", "size_40", "size_41", "size_42", "size_43", "size_44"],
        baseParam: { id: "null"},
        root: "progress",
    });

    var progressGrid = new Ext.grid.GridPanel({
        id: "progressgrid",
        height: 380,
        width: 640,
        viewConfig: { forceFit: true },
        cm: cm,
        store: store,
        bbar: new Ext.PagingToolbar({
            pageSize: 10,
            store: store,
            displayInfo: true,
            displayMsg: "第{0}条到第{1}条记录，一共{2}条记录",
            emptyMsg: "没有记录"
        })

    });

    progressWindow = new Ext.Window({
        id: "progresswindow",
        height: 413,
        width: 654,
        closeAction: "hide",
        resizable: false,
        items: [progressGrid],
        listeners: {'show':{fn:
            function(){
                var order = Ext.getCmp('guestgrid').getSelectionModel().getSelected().data["order_id"];
                store.proxy = new Ext.data.HttpProxy({
                url: "/managements/get_order_progress.json",
                method: "post",
                jsonData: { orderid: order},
            });
            store.reload();
            }
          }
        },
    });
});
