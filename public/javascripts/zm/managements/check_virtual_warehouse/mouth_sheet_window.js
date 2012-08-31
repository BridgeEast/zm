Ext.onReady(function(){
    var combos = new Ext.data.SimpleStore({
        fields:["id", "combo"],
        data: [ ["1", "1月"], ["2", "2月"], ["3", "3月"],["4", "4月"], ["5", "5月"], ["6", "6月"], 
              ["7", "7月"], ["8", "8月"], ["9", "9月"], ["10", "10月"], ["11", "11月"], ["12", "12月"] ]
    });

    var combos2= new Ext.data.SimpleStore({
        fields:["id", "combo"],
        data: [ ["1", "2009"], ["2", "2010"], ["3", "2011"], ["4", "2012"], ["5", "2013"], ["6", "2014"], ["7", "2015"],
              ["8", "2016"], ["9", "2017"], ["10", "2018"], ["11", "2019"],["12", "2020"] ]
    });

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
        url: "/managements/get_virtual_mouth_sheet.json",
        fields: ["shoes_id", "size_38", "size_39", "size_40", "size_41", "size_42", "size_43", "size_44"],
        totalProperty: "totalProperty",
        root: "roots"
    });
    store.load({ params: { start: 0, limit: 20 } });

    var mouthSheetGrid = new Ext.grid.GridPanel({
        id: "mouthsheetgrid",
        width: 788,
        height: 478,
        frame: true,
        viewConfig: { forceFit: true },
        cm: cm,
        store: store,
        tbar: ["->",{
            xtype: "tbtext",
            text:"选择年月"
        },{
            xtype: "combo",
            id:"combo_y",
            width: 75,
            name: "combo",
            mode: "local",
            store: combos2,
            displayField: "combo"
        },{
            xtype: "combo",
            id:"combo_m",
            width: 75,
            name: "combo",
            mode: "local",
            store: combos,
            displayField: "combo"
        }],
        bbar: new Ext.PagingToolbar({
            pageSize: 20,
            store: store,
            displayInfo: true,
            displayMsg: "第{0}条到第{1}条记录，一共有{2}条",
            emptyMsg: "没有记录"
        })
    });

    mouthSheetWindow = new Ext.Window({
        id: "mouthsheetwindow",
        title: "工作月报表查询",
        width: 800,
        height: 550,
        closeAction: "hide",
        resizable: false,
        items: [mouthSheetGrid],
        buttons: [{
            text: "确定", 
            handler: function(){
                var year = Ext.getCmp("combo_y").getValue();
                var month = Ext.getCmp("combo_m").getValue();
                var mon = new Array();
                mon = month.split("");
                if(mon[1] == "月")
                    var pro_m = "0" + mon[0];
                else
                    var pro_m = mon[0] + mon[1];
                var pro_ym = year + "-" + pro_m;
                store.proxy = new Ext.data.HttpProxy({
                    url: "/managements/get_virtual_mouth_sheet.json",
                    method: "post",
                    jsonData: { pro_ym: pro_ym },
                });
                store.reload();
            }
        },{
            text: "重置", 
            handler: function(){ 
                Ext.getCmp("combo_y").reset();
                Ext.getCmp("combo_m").reset();
            }
        }],
    });

});
