Zm.guests.order_management = {
    init: function() {
        this.omPanel = this.createOmPanel();
        Zm.pages.ViewPort = {
            layout: 'border',
            region: 'center',
            items: [{
                region: 'north',
                title: '客户-订单管理'
            },
            this.createTreeOm(), this.omPanel]

        };
    },
    //---------------------------------------------------------------------
    createOmPanel: function() {
        var mainPanel = new Ext.Panel({
            id: 'mainPanel',
            region: 'center',
            resizeTabs: true,
            layout: 'card',
            activeItem: 0,
            items: [this.createOmGridOne(), this.createOmGridTwo()]
        });
        return mainPanel
    },
    //---------------------------------------------------------------------
    createOmGridOne: function() {
        var smOne = new Ext.grid.CheckboxSelectionModel();
        var cmOne = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(), smOne, {
            header: '订单号',
            dataIndex: 'order_id'
        },
        {
            header: '客户合同',
            dataIndex: 'custom_contract'
        },
        {
            header: '总价',
            dataIndex: 'total_price'
        },
        {
            header: '付款情况',
            dataIndex: 'payment'
        },
        {
            header: '制作日期',
            dataIndex: 'production_date',
            renderer: Ext.util.Format.dateRenderer('Y-m-d')
        },
        {
            header: '备注',
            dataIndex: 'remark'
        },
        ]);
        var store = new Ext.data.JsonStore({
            url: '/guests/get_undetermined_orders_datas',
            fields: ['order_id', 'custom_contract', 'total_price', 'payment', 'production_date', 'remark'],
            totalProperty: 'totalProperty',
            root: "roots",
            autoLoad: false
        });
        var omGridOne = new Ext.grid.GridPanel({
            id: 'omGridOne',
            title: '待定',
            height: 360,
            cm: cmOne,
            sm: smOne,
            store: store,
            loadMask: true,
            viewConfig: {
                forceFit: true
            },
            bbar: new Ext.PagingToolbar({
                pageSize: 30,
                store: store,
                displayInfo: true,
                displayMsg: '显示第{0}条到{1}记录,一共{2}条',
                emptyMsg: '没有记录'
            }),
            tbar: new Ext.Toolbar(['-', {
                text: '删除所选',
                handler: function() { 
                     Zm.guests.delete_undetermined_order.init()
                }
            },
            '-', {
                text: '发送订单',
                scope: this,
                handler: function(){ 
                Zm.guests.send_to_order.init();
                }
            },
            '-'])
        });

        var contextmenu = new Ext.menu.Menu({
            scope: this,
            items: [{
                text: '查看与修改样品',
                handler: function() {
                    this.select_id = Ext.getCmp('omGridOne').getSelectionModel().getSelected().data["order_id"];
                    Zm.guests.check_and_update_shoes.init().show();
                }
            },
            {
                text: '查看码号与数量',
                handler: function() {
                    Zm.guests.check_and_update_number.init().show();
                }
            },
            {
                text: '打开客户合同'
            },
            {
                text: '下载客户合同'
            }]
        });

        omGridOne.on("rowcontextmenu", function(grid, rowIndex, e) {
            e.preventDefault();
            grid.getSelectionModel().selectRow(rowIndex);
            contextmenu.showAt(e.getXY())
        });
        return omGridOne
    },

    //---------------------------------------------------------------------
    createOmGridTwo: function() {
        var smTwo = new Ext.grid.CheckboxSelectionModel();
        var cmTwo = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(), smTwo, {
            header: '订单号',
            dataIndex: 'order_id'
        },
        {
            header: '客户合同',
            dataIndex: 'custom_contrast'
        },
        {
            header: '总价',
            dataIndex: 'total_price'
        },
        {
            header: '品质',
            dataIndex: 'quality'
        },
        {
            header: '是否出货',
            dataIndex: 'shipment'
        },
        {
            header: '付款情况',
            dataIndex: 'payment'
        },
        {
            header: '提单情况',
            dataIndex: 'lading'
        },
        {
            header: '制作日期',
            dataIndex: 'production_date'
        },
        {
            header: '备注',
            dataIndex: 'remark'
        }]);
        var store = new Ext.data.JsonStore({
            url: '/guests/get_proceeding_orders_data',
            fields: ['order_id', 'custom_contract', 'total_price', 'payment', 'production_date', 'remark'],
            totalProperty: 'totalProperty',
            root: 'roots',
            autoLoad: false
        })
        var omGridTwo = new Ext.grid.GridPanel({
            id: 'omGridTwo',
            title: '进行中',
            height: 300,
            cm: cmTwo,
            sm: smTwo,
            store: store,
            loadMask: true,
            viewConfig: {
                forceFit: true
            },
            bbar: new Ext.PagingToolbar({
                pageSize: 30,
                store: store,
                displayInfo: true,
                displayMsg: '显示第{0}条到{1}条记录，一共{2}条',
                emptyMsg: '没有记录'
            })
        });
        var contextmenu = new Ext.menu.Menu({
            items: [{
                text: '查看样品',
                scope: this,
                handler: function() {
                    Zm.guests.check_shoes.init().show();
                }
            },
            {
                text: '查看订单进度',
                scope: this,
                handler: function() {
                    Zm.guests.check_order_schedule.init().show();
                }
            },
            {
                text: '打开提单'
            },
            {
                text: '下载提单'
            },
            {
                text: '打开客户合同'
            },
            {
                text: '下载客户合同'
            }]
        });

        omGridTwo.on("rowcontextmenu", function(grid, rowIndex, e) {
            e.preventDefault();
            grid.getSelectionModel().selectRow(rowIndex);
            contextmenu.showAt(e.getXY())
        });
        return omGridTwo
    },
    //---------------------------------------------------------------------
    createTreeOm: function() {
        var treeOm = new Ext.tree.TreePanel({
            autoScroll: true,
            region: 'west',
            id: 'treeOm',
            width: '180'
        });
        var rootOrders = new Ext.tree.TreeNode({
            id: 'rootOrders',
            text: '全部订单'
        });
        var nowYear = new Date().getFullYear();
        var nowMonth = new Date().getMonth();

        for (var i = nowYear; i > nowYear - 3; i--) {
            var year = new Ext.tree.TreeNode({
                text: i,
                id: i
            });
            rootOrders.appendChild(year);
            if (i == nowYear) {
                var months = nowMonth + 1
            }
            else {
                months = 12
            }
            for (j = months; j > 0; j--) {
                var month = new Ext.tree.AsyncTreeNode({
                    text: j + '月',
                    id: i + '_' + j,
                    children: [{
                        text: '待定',
                        id: 'nodeUndetermined' + j + i,
                        leaf: true
                    },
                    {
                        text: '进行中',
                        id: 'nodeProceeding' + j + i,
                        leaf: true
                    }]
                });
                year.appendChild(month);
            };
        };
        treeOm.setRootNode(rootOrders);
        treeOm.on({
            scope: this,
            click: function(node) {
                if (node.text == '待定') {
                    this.omPanel.layout.setActiveItem(0);
                }
                if (node.text == '进行中') {
                    this.omPanel.layout.setActiveItem(1);
                }
                if (node.leaf) {
                    var year = node.parentNode.parentNode.text;
                    var month = node.parentNode.id.split("_")[1];
                    if (parseInt(month) < 10) month = '0' + month;
                    var date = year + '_' + month;
                    var type = node.text + '订单';
                }
                else if (node.text.toString().indexOf("月") != - 1) {
                    year = node.parentNode.text;
                    month = node.id.split("_")[1];
                    if (parseInt(month) < 10) month = '0' + month;
                    date = year + '_' + month;
                }
                else {
                    year = null;
                    month = null;
                    type = null;
                }
                if (type == '待定订单') {
                    Ext.getCmp('omGridOne').store.proxy = new Ext.data.HttpProxy({
                        url: '/guests/get_undetermined_orders_data.json',
                        method: 'post',
                        jsonData: {
                            selectDate: date,
                            selectType: type
                        }
                    });
                    Ext.getCmp('omGridOne').store.load({
                        params: {
                            start: 0,
                            limit: 30
                        }
                    });
                } else if (type == '进行中订单') {
                    Ext.getCmp('omGridTwo').store.proxy = new Ext.data.HttpProxy({
                        url: '/guests/get_proceeding_orders_data.json',
                        method: 'post',
                        jsonData: {
                            selectDate: date,
                            selectType: type
                        }
                    });
                    Ext.getCmp('omGridTwo').store.load({
                        params: {
                            start: 0,
                            limit: 30
                        }
                    });
                }

            }
        })
        return treeOm
    },
    //-------------------------------------------------------------------
    sendOrders: function() {
        var orderId = Ext.getCmp('omGridOne').getSelectionModel().getSelected().data["order_id"];
        var record = {
            order_id: orderId,
        }
        Ext.Ajax.request({
            url: '/guests/send_order.json',
            method: 'post',
            jsonData: {
                record: record
            },
            suceess: function() {
                Ext.getCmp('omGridOne').store.load();
                Ext.Msg.alert('发送', '发送成功');
            },
            failure: function() {
                Ext.Msg.alert('发送', '发送失败');
            }
        })
    }

}

