Ext.onReady(function(){
    var cm = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),
        { header: "鞋号", dataIndex: "shoes_id"},
        { header: "38", dataIndex: "size_38"},
        { header: "39", dataIndex: "size_39"},
        { header: "40", dataIndex: "size_40"},
        { header: "41", dataIndex: "size_41"},
        { header: "42", dataIndex: "size_42"},
        { header: "43", dataIndex: "size_43"},
        { header: "44", dataIndex: "size_44"}
    ]);

    var store = new Ext.data.JsonStore({
        url: "/managements/get_daily_sheet.json",
        fields: ["shoes_id", "size_38", "size_39", "size_40", "size_41", "size_42", "size_43", "size_44"],
        totalProperty: "totalProperty",
        root: "daily_sheet",
    });
    store.load({ params: { start: 0, limit: 20 } });

    var dailySheetGrid = new Ext.grid.GridPanel({
        id: "dailysheetgird",
        width: 788,
        height: 487,
        frame: true,
        viewConfig: { forceFit: true },
        cm: cm,
        store: store,
        tbar: ["->",{
            xtype: "tbtext",
            text:"选择日期"
        },{
            xtype: "datefield",
            id: "datefield"
        }],
        bbar: new Ext.PagingToolbar({
            pageSize: 20, 
            store: store,
            displayInfo: true,
            displayMsg: "第{0}条到{1}条记录，一共{2}条",
            emptyMsg: "没有记录"
        })
    });

    dailySheetWindow = new Ext.Window({
        id: "sheetwindow",
        title: "工作日报表查询",
        width: 800,
        height: 550,
        closeAction: "hide",
        resizable: false,
        items: [dailySheetGrid],
        buttons: [{
            text: "确定",
            handler: function(){
                var day = new Array();
                day = String(Ext.getCmp("datefield").getValue()).split(" ");
                if(day[0] == "Jan"){ 
                    month = "-01-"
                }else if(day[1] == "Feb"){
                    month = "-02-" 
                }else if(day[1] == "Mar"){
                    month = "-03-" 
                }else if(day[1] == "Apr"){
                    month = "-04-" 
                }else if(day[1] == "May"){
                    month = "-05-" 
                }else if(day[1] == "Jun"){
                    month = "-06-" 
                }else if(day[1] == "Jul"){
                    month = "-07-" 
                }else if(day[1] == "Aug"){
                    month = "-08-" 
                }else if(day[1] == "Sep"){
                    month = "-09-" 
                }else if(day[1] == "Oct"){
                    month = "-10-" 
                }else if(day[1] == "Nov"){
                    month = "-11-" 
                }else{
                    month = "-12-" 
                };
                var pro = day[3] + month + day[2];
                store.proxy = new Ext.data.HttpProxy({
                    url: "/managements/get_virtual_daily_sheet.json",
                    method: "post",
                    jsonData: { pro_date: pro },
                });
                store.reload();
            }
        },{
            text: "重置",
            handler: function(){
                Ext.getCmp("datefield").reset();
            }
        }]
    });
});
