Ext.onReady(function(){
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
