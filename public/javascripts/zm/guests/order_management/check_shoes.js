Zm.guests.check_shoes = {
    init: function() {
        var cm = new Ext.grid.ColumnModel([
            {  
                header: '鞋图一',
                dataIndex: 'photo_one',
                hidden : true
            },
            { 
                header: '鞋图二',
                dataIndex: 'photo_two',
                hidden : true
            },
            {
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
            }
        ]);
        var store = new Ext.data.JsonStore({
            url: '/guests/get_guest_details.json',
            fields: ['photo_one', 'photo_two', 'shoes_id', 'types_of_shoes', 'suitable_people', 'price', 'remark'],
            totalProperty: "totalProperty",
            root: "roots",
        });
        var grid = new Ext.grid.GridPanel({
            id: 'grid',
            height: 570,
            autoScroll: true,
            loadMask: true,
            frame: true,
            cm: cm,
            viewConfig: {
                forceFit: true
            },
            store: store,
            bbar: new Ext.PagingToolbar({
                pageSize: 20,
                store: store,
                displayInfo: true,
                displayMsg: '显示第{0}条到{1}条记录，一共{2}条',
                emptyMsg: '没有记录'
            })
        });
        var contextmenu = new Ext.menu.Menu({ 
            scope: this,
            items: [{ 
                     text: '查看详情',
                     handler: function() { 
                     Zm.guests.check_details_of_shoes.init().show();
                     }
                   },
                   { 
                     text: '与客服交谈',
                     handler: function() { 
                        Zm.guests.communicateWithServices.init().show();
                     }
                   }]
        }); 
        grid.on("rowcontextmenu", function(grid, rowIndex, e) { 
            e.preventDefault();
            grid.getSelectionModel().selectRow(rowIndex);
            contextmenu.showAt(e.getXY())
        });
        var checkShoes = new Ext.Window({
            height: 600,
            width: 500,
            constrainHeader: true,
            items: [grid],
            listeners: { "show": { fn: function(){ 
                var idd = Ext.getCmp('omGridTwo').getSelectionModel().getSelected().data["order_id"];
                store.proxy = new Ext.data.HttpProxy({ 
                    url: "/guests/get_guest_details.json",
                    method: "post",
                    jsonData: { idd: idd }
                });
                store.load({ params: { start: 0, limit: 20 } });
            } } }
        })
        return checkShoes
    }
}

