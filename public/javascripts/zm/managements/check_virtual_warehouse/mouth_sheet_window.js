Ext.onReady(function(){
    var combos = new Ext.data.SimpleStore({
        fields:["id", "combo"],
        data: [ ["1", "一月"], ["2", "二月"], ["3", "三月"],["4", "四月"], ["5", "五月"], ["6", "六月"], 
              ["7", "七月"], ["8", "八月"], ["9", "九月"], ["10", "十月"], ["11", "十一月"], ["12", "十二月"] ]
    });

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
        url: "/manngements/get_mouth_sheet.json",
        fields: ["general_shoe_id", "size_38", "size_39", "size_40", "size_41", "size_42", "size_43", "size_44"],
        root: "mouth_sheet"
    });

    var mouthSheetGrid = new Ext.grid.GridPanel({
        id: "mouthsheetgrid",
        width: 585,
        height: 287,
        frame: true,
        viewConfig: { forceFit: true },
        cm: cm,
        store: store,
        tbar: ["->",{
            xtype: "tbtext",
            text:"选择月份"
        },{
            xtype: "combo",
            width: 105,
            name: "combo",
            mode: "local",
            store: combos,
            displayField: "combo"
        }],
        bbar: new Ext.PagingToolbar({
            pagSize: 6,
            store: store,
            displayInfo: true,
            displayMsg: "第 {0} 条到第 {1} 条记录，一共有 {2} 条",
            emptyMsg: "没有记录"
        })
    });

    mouthSheetWindow = new Ext.Window({
        id: "mouthsheetwindow",
        title: "工作月报表查询",
        width: 600,
        height: 350,
        closeAction: "hide",
        resizable: false,
        items: [mouthSheetGrid],
        buttons: [{
            text: "确定", handler: function(){  }
        },{
            text: "关闭", handler: function(){ dailySheetWindow.hide(); }
        }]
    });
});
