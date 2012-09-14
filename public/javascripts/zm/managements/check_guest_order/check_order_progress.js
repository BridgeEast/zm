Zm.managements.checkOrderProgressWin = { 
    init: function(selected_id) { 
    
    var cm = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),
        { header: "鞋号", dataIndex: "shoes_id" },
        { header: "36", dataIndex: "size_36" },
        { header: "37", dataIndex: "size_37" },
        { header: "38", dataIndex: "size_38" },
        { header: "39", dataIndex: "size_39" },
        { header: "40", dataIndex: "size_40" },
        { header: "41", dataIndex: "size_41" }, 
        { header: "42", dataIndex: "size_42" },
        { header: "43", dataIndex: "size_43" },
        { header: "44", dataIndex: "size_44" }
    ]);

    var store = new Ext.data.JsonStore({
        url: "/managements/check_order_progress.json",
        fields: ["id","shoes_id",  "size_36",  "size_37", "size_38", "size_39", "size_40", "size_41", "size_42", "size_43", "size_44"],
        totalProperty: "totalProperty",
        baseParams: { id: selected_id },
        root: "check_order_progress",
        autoLoad: true
    });
    store.load({ params: { start: 0, limit: 20 } })

    var checkOrderProgressGrid = new Ext.grid.GridPanel({
        height: 491,
        width: 788,
        region: "center",
        viewConfig: { forceFit: true },
        cm: cm,
        store: store,
        bbar: new Ext.PagingToolbar({
            pageSize: 20,
            store: store,
            displayInfo: true,
            displayMsg: "第{0}条到第{1}条记录，一共{2}条记录",
            emptyMsg: "没有记录"
        })

    });

    checkOrderProgressWindow = new Ext.Window({
        height: 527,
        width: 800,
        layout: 'border',
        closeAction: "hide",
        resizable: false,
        constrainHeader: true,
        items: [checkOrderProgressGrid],
    });

    return checkOrderProgressWindow

   }
}
