Ext.onReady(function(){
    var cm = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),
        { header: "样品", dataIndex: "general_shoe_id"},
        { header: "38", dataIndex: "necessary_num"},
        { header: "39", dataIndex: "finished_num"},
        { header: "40", dataIndex: "size_40"},
        { header: "41", dataIndex: "size_41"},
        { header: "42", dataIndex: "size_42"},
        { header: "43", dataIndex: "size_43"},
        { header: "44", dataIndex: "size_44"}
    ]);

    var store = new Ext.data.JsonStore({
        url: "/managements/get_daily_sheet.json",
        fields: ["general_shoe_id", "necessary_num", "finished_num", "size_40", "size_41", "size_42", "size_43", "size_44"],
        totalProperty: "totalProperty",
      //  baseParams: {},
        root: "gds",
    });
    store.load({ params: { start: 0, limit: 8 } });

    var dailySheetGrid = new Ext.grid.GridPanel({
        id: "dailysheetgird",
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

    dailySheetWindow = new Ext.Window({
        id: "sheetwindow",
        title: "工作日报表查询",
        width: 600,
        height: 350,
        closeAction: "hide",
        resizable: false,
        items: [dailySheetGrid],
        buttons: [{
            text: "确定", handler: function(){  }
        },{
            text: "关闭", handler: function(){ dailySheetWindow.hide(); }
        }]
    });
});
