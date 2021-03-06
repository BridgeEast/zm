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
        url: "/services/get_virtual_month_sheet.json",
        fields: ["shoes_id","size_36","size_37", "size_38", "size_39", "size_40", "size_41", "size_42", "size_43", "size_44"],
        totalProperty: "totalProperty",
        root: "roots"
    });
    store.load({ params: { start: 0, limit: 10 } });

    var monthDispatchGrid= new Ext.grid.GridPanel({
        id: "mouthdispatchgrid",
        width: 788,
        height: 491,
        frame: true,
        viewConfig: { forceFit: true },
        cm: cm,
        store: store,
        tbar: ["->",{
            xtype: "tbtext",
            text:"选择年月"
        },{
            xtype: "combo",
            id:"comboy",
            width: 75,
            name: "combo",
            mode: "local",
            store: combos2,
            displayField: "combo"
        },{
            xtype: "combo",
            id:"combom",
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
            displayMsg: "第 {0} 条到第 {1} 条记录，一共有 {2} 条",
            emptyMsg: "没有记录"
        })
    });

    monthDispatchWindow = new Ext.Window({
        id: "monthdispatchwindow",
        title: "工作月发货单查询",
        width: 800,
        height: 554,
        closeAction: "hide",
        resizable: false,
        contrain: true,
        constrainHeader: true,
        items: [monthDispatchGrid],
        buttons: [{
            text: "确定",
            handler: function(){
                var year = Ext.getCmp("comboy").getValue();
                var month = Ext.getCmp("combom").getValue();
                var mon = new Array();
                mon = month.split("");
                if(mon[1] == "月")
                    var pro_m = "0" + mon[0];
                else
                    var pro_m = mon[0] + mon[1];
                var pro_ym = year + "-" + pro_m;
                store.proxy = new Ext.data.HttpProxy({
                    url: "/services/get_virtual_month_dispatch.json",
                    method: "post",
                    jsonData: { pro_ym: pro_ym },
                });
                store.reload();
            }
        },{
            text: "重置", handler: function(){
                Ext.getCmp("comboy").reset();
                Ext.getCmp("combom").reset()
            }
        }]
    });
});

