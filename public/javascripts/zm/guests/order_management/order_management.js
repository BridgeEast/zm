Zm.guests.order_management = {
    init: function() {
        Zm.pages.ViewPort = {
            layout: 'border',
            region: 'center',
            items: [{
                region: 'north',
                title: '客户-订单管理'
            },
            this.createOmForm(), this.createTreeOm()]
        };
    },
    //-------------------------------------------------------------------
    createOmForm: function() {
        var omForm = new Ext.form.FormPanel({
            region: 'center',
            layout: 'form',
            items: [this.createOmGridOne(), this.createOmGridTwo()]
        });
        return omForm
    },
    //-------------------------------------------------------------------
    createOmGridOne: function() {
        var cmOne = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(), {
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
        data1 = [['1','name1','descn1'],
        	['2','name2','descn2'],
        	['3','name3','descn3'],
        	['4','name4','descn4'],
        	['5','name5','descn5']];
        var storeOne = new Ext.data.Store({
            proxy: new Ext.data.MemoryProxy(data1),
            reader: new Ext.data.ArrayReader({},
            [{
                name: 'order_id'
            },
            {
                name: 'custom_contract'
            },
            {
                name: 'total_price'
            },
            {
                name: 'payment'
            },
            {
                name: 'production_date'
            },
            {
                name: 'remark'
            }])
        });
        storeOne.load();
        var omGridOne = new Ext.grid.GridPanel({
            id: 'omGridOne',
            height: 300,
            cm: cmOne,
            store: storeOne,
            viewConfig: {
                forceFit: true
            },
            /* bbar: new Ext.pagingToolbar({ 
                    pageSize: 10,
                    store: storeOne,
                    displayInfo: true,
                    displayMsg: '显示第{0}条到{1}记录一共{2}条',
                    emptyMsg: '没有记录'
                  }) */
        });

        var contextmenu = new Ext.menu.Menu({
            items: [{
                id: 'checkAndUpdateShoes',
                text: '查看与修改样品',
            }]
        });

        omGridOne.on("rowcontextmenu", function(grid, rowIndex, e) {
            e.preventDefault();
            grid.getSelectionModel().selectRow(rowIndex);
            contextmenu.showAt(e.getXY())
        });
        return omGridOne
    },
    //------------------------------------------------------------------
    createOmGridTwo: function() {
        var cmTwo = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(), {
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
            id: 'omGridTwo',
            height: 300,
            cm: cmTwo,
            store: storeTwo,
            viewConfig: {
                forceFit: true
            }
        });
        return omGridTwo
    },
    //-----------------------------------------------------------------
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
            else if (node.parentNode.text == '全部鞋') {
                data = node.text;
            }
            else {
                year = null;
                month = null;
                type = null;
            }
        })
        return treeOm
    }

}

