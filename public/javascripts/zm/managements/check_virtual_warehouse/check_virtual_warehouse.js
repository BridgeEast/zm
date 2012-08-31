Zm.managements.check_virtual_warehouse = {
    init: function() {
        Zm.pages.ViewPort = {
            layout: 'border',
            region: 'center',
            items: [
                    { region: 'north', layout: 'fit', height: '90', title: '管理层-虚拟仓库管理' },
                    { region: 'center', layout: 'fit', items: [grid] },
                    { region: 'west', collapsible: true, layout: 'fit', width: '180', items: [cvw_tree] }
                   ]
        };
    },
};

var cm = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),
        { header: '图鞋1', dataIndex: 'photo_one' },
        { header: '图鞋2', dataIndex: 'photo_two' },
        { header: '鞋号', dataIndex: 'shoes_id' },
        { header: '鞋型', dataIndex: 'types_of_shoes' },
        { header: '适合人群', dataIndex: 'suitable_people' },
        { header: '颜色', dataIndex: 'colors' },
        { header: '码号', dataIndex: 'size' },
        { header: '价格', dataIndex: 'price' },
        { header: '数量', dataIndex: 'necessary_num' },
        { header: '已完成数量', dataIndex: 'finished_num' },
        { header: '仓库数量', dataIndex: 'store_remaining' },
        { header: '制作日期', dataIndex: 'production_date' }
]);

var store = new Ext.data.JsonStore({
    url: "/managements/get_virtuals.json",
    fields: ['photo_one', 'photo_two', 'shoes_id', 'suitable_people', 'colors', 'size', 'types_of_shoes', 'price', 'production_date', 'necessary_num', 'finished_num', 'store_remaining'],
    totalProperty: "totalProperty",
    root: 'roots',
});
store.load({ params: { start: 0, limit: 30} });

var grid = new Ext.grid.GridPanel({
    id: 'virtualgrid',
    region: 'center',
    cm: cm,
    store: store,
    viewConfig: {
        forceFit: true
    },
    tbar: new Ext.Toolbar(['-', {
        text: '日报表查询',
        handler: function() {
            dailySheetWindow.show();
        }
    },'-',{
        text: '月报表查询',
        handler: function() {
            mouthSheetWindow.show();
        }
    },'-',{
        text: '日发货查询',
        handler: function() {
            dailyDispatchWindow.show();
        }
    },'-',{
        text: '月发货查询',
        handler: function() {
            mouthDispatchWindow.show();
        }
    }, '-']),
    bbar: new Ext.PagingToolbar({
        pageSize: 30,
        store: store,
        displayInfo: true,
        displayMsg: "显示第{0}条到{1}条记录，一共{2}条",
        emptyMsg: "没有记录"
    })
});
store.load();

var virtualwarehouseenquiry2contextmenu = new Ext.menu.Menu({
    id: 'theContextMenu',
    items: [{ text: '查看详情', handler: function(){ } }]
});

grid.on("rowcontextmenu", function(grid, rowIndex, e) {
    e.preventDefault();
    grid.getSelectionModel().selectRow(rowIndex);
    virtualwarehouseenquiry2contextmenu.showAt(e.getXY());
});

var treeStore = new Ext.data.JsonStore({
    url: '/managements/get_tree_node.json',
    fields: ['id', 'factory_order_id', 'production_date'],
    root: 'tree_node',
    autoLoad: true
});

var root = new Ext.tree.AsyncTreeNode({
    id: "cvwRoot",
    text: "全部合同",
    expandable: true,   //节点的“+”或“-”一直显示
    children: []
});

var jing_year_nodes = [];

var cvw_tree = new Ext.tree.TreePanel({
    root: root
});

cvw_tree.on("expandnode", function(node) { //树的展开时执行的事件
    var myDate = new Date();
    var month_nodes = [];
    var contract_nodes = [];
    var record = [];
    var txt = [];
    for (m = 0; m < treeStore.getCount(); m++) {
        record[m] = treeStore.getAt(m);
    }
    if (node.id == "cvwRoot") {
        for (i = myDate.getFullYear(); i >= 2010 ; i--) {
            jing_year_nodes[i] = new Ext.tree.TreeNode({
                text: i,
                id: "node" + i
            });
            root.appendChild(jing_year_nodes[i]);

            if (i == myDate.getFullYear()) {
                for (j = myDate.getMonth() + 1; j >= 1 ; j--) {
                    if (j > 9) {
                        month_nodes[j] = new Ext.tree.TreeNode({
                            text: j + "月",
                            id: "node" + i + j
                        });
                        jing_year_nodes[i].appendChild(month_nodes[j]);

                        for (k = 0; k < treeStore.getCount(); k++) {
                            var month_data = i + "-" + j;
                            if (record[k].get('production_date').substring(0, 7) == month_data) {
                                contract_nodes[k] = new Ext.tree.TreeNode({
                                    text: record[k].get('factory_order_id'),
                                    id: "node" + i + j + record[k].get('id')
                                });
                                month_nodes[j].appendChild(contract_nodes[k]);
                            }
                        }
                    } else {
                        month_nodes[j] = new Ext.tree.TreeNode({
                            text: j + "月",
                            id: "node" + i + "0" + j
                        });
                        jing_year_nodes[i].appendChild(month_nodes[j]);
                        var x = 0;
                        var myNode = [];

                        for (k = 0; k < treeStore.getCount(); k++) {
                            var month_data = i + "-0" + j;
                            if (record[k].get('production_date').substring(0, 7) == month_data) { //按月份进行分类
                                contract_nodes[k] = new Ext.tree.TreeNode({
                                    text: record[k].get('factory_order_id'),
                                    id: "node" + i + "0" + j + record[k].get('id')
                                });
                                month_nodes[j].appendChild(contract_nodes[k]);
                            }
                        }
                    }
                }
            } else {
                for (j = 12; j > 0; j--) {
                    if (j > 9) {
                        month_nodes[j] = new Ext.tree.TreeNode({
                            text: j + "月",
                            id: "node" + i + j
                        });
                        jing_year_nodes[i].appendChild(month_nodes[j]);

                        for (k = 0; k < treeStore.getCount(); k++) {
                            var month_data = i + "-" + j;
                            if (record[k].get('production_date').substring(0, 7) == month_data) {
                                contract_nodes[k] = new Ext.tree.TreeNode({
                                    text: record[k].get('factory_order_id'),
                                    id: "node" + i + j + record[k].get('id')
                                });
                                month_nodes[j].appendChild(contract_nodes[k]);
                            }
                        }
                    } else {
                        month_nodes[j] = new Ext.tree.TreeNode({
                            text: j + "月",
                            id: "node" + i + "0" + j
                        });
                        jing_year_nodes[i].appendChild(month_nodes[j]);
                        var x = 0;
                        var myNode = [];

                        for (k = 0; k < treeStore.getCount(); k++) {
                            var month_data = i + "-0" + j;
                            if (record[k].get('production_date').substring(0, 7) == month_data) { //按月份进行分类
                                contract_nodes[k] = new Ext.tree.TreeNode({
                                    text: record[k].get('factory_order_id'),
                                    id: "node" + i + "0" + j + record[k].get('id')
                                });
                                month_nodes[j].appendChild(contract_nodes[k]);
                            }
                        }
                    }
                }
            }
        }
    }
});

cvw_tree.on("collapsenode", function(node) { //树的闭合事件
    if (node.id == "cvwRoot") {
        var myDate = new Date();
        for (i = 2010; i <= myDate.getFullYear(); i++) {
            jing_year_nodes[i].remove()
        };
    }
    store.removeAll();
});

cvw_tree.on("click", function(node) {
    var i = node.id.substring(4, 8);
    var j = node.id.substring(8, 10);
    var record = {};
    var contract = node.id.substring(10, node.id.length); //根据id提取合同的名字
    var date = i + "-" + j;
    record = {
        contract: contract,
        date: date
    };

    if (node.id.length > 10) {
        store.proxy = new Ext.data.HttpProxy({
            url: "/managements/get_contract.json",
            method: "post",
            jsonData: { record: record },
        });
        store.load({ params: { start: 0, limit: 30 } });
    }
});

