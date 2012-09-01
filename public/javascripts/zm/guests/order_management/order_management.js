Zm.guests.order_management = {
    init: function() {
        Zm.pages.ViewPort = {
            layout: 'border',
            region: 'center',
            items: [{
                region: 'north',
                title: '客户-订单管理'
            },
            this.createTreeOm(), this.createOmGridOne()]
        };
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
        var storeOne = new Ext.data.JsonStore({ 
            url: '/guests/get_check_orders',
            fields: ['id', 'order_id', 'custom_contract', 'total_price', 'payment', 'production_date', 'remark'],
            root: 'check_orders',
            autoLoad: false
        });
        var omGridOne = new Ext.grid.GridPanel({
            region: 'center',
            id: 'omGridOne',
            height: 360,
            cm: cmOne,
            sm: smOne,
            store: storeOne,
            trackMouseOver : true,
            viewConfig: {
                forceFit: true
            },
            bbar: new Ext.PagingToolbar({ 
            pageSize: 20,
            store: storeOne,
            displayInfo: true,
            displayMsg: '显示第{0}条到{1}记录,一共{2}条',
            emptyMsg: '没有记录'
        }),
            tbar: new Ext.Toolbar( 
            ['-',{ 
                     text: '删除所选'
                   },'-',
                   { 
                     text: '发送订单'
                   },'-'])
        });

        var contextmenu = new Ext.menu.Menu({
            items: [{
                id: 'checkAndUpdateShoes',
                text: '查看与修改样品',
            },
            { 
                text: '查看码号与数量'
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
        data2 = [['1','name1','descn1','','','已上传'],
        	['2','name2','descn2','','','已上传'],
        	['3','name3','descn3','','','未上传'],
        	['4','name4','descn4','','','未上传'],
        	['5','name5','descn5','','','未上传']];
        var storeTwo = new Ext.data.Store({
            proxy: new Ext.data.MemoryProxy(data2),
            reader: new Ext.data.ArrayReader({},
            [{
                name: 'order_id'
            },
            {
                name: 'custom_contrast'
            },
            {
                name: 'total_price'
            },
            {
                name: 'quality'
            },
            {
                name: 'shipment'
            },
            {
                name: 'payment'
            },
            {
                name: 'lading'
            },
            {
                name: 'production_date'
            },
            {
                name: 'remark'
            }])
        });
        storeTwo.load();
        var omGridTwo = new Ext.grid.GridPanel({
            region: 'center',
            id: 'omGridTwo',
            height: 300,
            cm: cmTwo,
            sm: smTwo,
            store: storeTwo,
            viewConfig: {
                forceFit: true
            }
        });
         var contextmenu = new Ext.menu.Menu({
            items: [{
                text: '查看样品',
            },
            { 
                text: '查看订单进度'
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
               text: '下载客户合同'           }]
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
                        id: 'nodeProceeding',
                        leaf: true
                    }]
                });
                year.appendChild(month);
            };
        };
        treeOm.setRootNode(rootOrders);
        treeOm.on('click', function(node) {
            if (node.leaf) {
                var year = node.parentNode.parentNode.text;
                var month = node.parentNode.id.split("_")[1];
                if (parseInt(month) < 10) month = '0' + month;
                var date = year + '_' + month;
                var type = node.text;
            }
            else if (node.text.toString().indexOf("月") != - 1) {
                year = node.parentNode.text;
                month = node.id.split("_")[1];
                if (parseInt(month) < 10) month = '0' + month;
                date = year + '-' + month;
            }
            else if (node.parentNode.text == '全部订单') {
                data = node.text;
            }
            else {
                year = null;
                month = null;
                type = null;
            }

          /*  store.proxy = new Ext.data.HttpProxy({ 
                url: '/guests/get_orders_data.json',
                method: 'post',
                jsonData: { 
                  selectDate: date,
                  selectType: type
                }
            }),
             store.load() */
        })
        return treeOm
    }

}

