Ext.onReady(function(){
    var cm = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),
        { header: "鞋号", dataIndex: "general_shoe_id" },
        { header: "38", dataIndex: "size_38" },
        { header: "39", dataIndex: "size_39" },
        { header: "40", dataIndex: "size_40" },
        { header: "41", dataIndex: "size_41" },
        { header: "42", dataIndex: "size_42" },
        { header: "43", dataIndex: "size_43" }, 
        { header: "44", dataIndex: "size_44" }
    ]);

    var store = new Ext.data.JsonStore({
        url: "/managements/get_data.json",
        fields: ["general_shoe_id", "size_38", "size_39", "size_40", "size_41", "size_42", "size_43", "size_44"],
        root: "data"
    });

    var dailyDispatchGrid = new Ext.grid.GridPanel({
        id: "dailydispatchgrid",
        width: 585,
        height: 287,
        frame: true,
        viewConfig: { forceFit: true },
        cm: cm,
        store: store,
        tbar: ["->",{
            xtype: "tbtext",
            text:"选择日期"
        },{
            xtype: "datefield",
        }],
        bbar: new Ext.PagingToolbar({
            pagSize: 6,
            store: store,
            displayInfo: true,
            displayMsg: "第 {0} 到 {1} 条记录，共 {2} 条",
            emptyMsg: "没有记录"
        })
    });

    dailyDispatchWindow = new Ext.Window({
        id: "dailydispatchwindow",
        title: "工厂日发货单查询",
        width: 600,
        height: 350,
        closeAction: "hide",
        resizable: false,
        items: [dailyDispatchGrid],
        buttons: [{
            text: "确定", handler: function(){  }
        },{
            text: "关闭", handler: function(){ dailySheetWindow.hide(); }
        }]
    });
});
