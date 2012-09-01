Zm.dataBases.storeOfShoes = {
    init: function() {
        Zm.pages.ViewPort = {
            layout: 'border',
            region: 'center',
            items: [this.createStoreOfShoes()]
        };
    },

//**********************************************************************************************
    createStoreOfShoes: function() {
        //------------------------------用于显示鞋库的gridpanel
        var shoesSm = new Ext.grid.CheckboxSelectionModel();
        var shoesCm = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(), shoesSm, {
            header: '样品图1',
            dataIndex: 'photo_one',
            renderer: title_img
        },
        {
            header: '样品图2',
            dataIndex: 'photo_two',
            renderer: title_img
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
            header: '颜色',
            dataIndex: 'colors'
        },
        {
            header: '价格',
            dataIndex: 'price'
        },
        {
            header: '制作日期',
            dataIndex: 'production_date'
        },
        {
            header: '备注',
            dataIndex: 'remark'
        }]);

        var shoesStore = new Ext.data.JsonStore({
            url: '/data_bases/get_general_shoes.json',
            fields: ['id', 'photo_one', 'photo_two', 'shoes_id', 'types_of_shoes', 'suitable_people', 'colors', 'price', 'production_date', 'remark'],
            root: 'general_shoes',
            autoLoad: true
        });

        var shoesGrid = new Ext.grid.GridPanel({
            id: 'storeOfShoesGrid',
            title: '鞋库',
            region: 'center',
            cm: shoesCm,
            sm: shoesSm,
            store: shoesStore,
            viewConfig: {
                forceFit: true
            },
            tbar: this.gridTbar()
        });

        var contextmenu = new Ext.menu.Menu({
            id: 'checkDetails',
            defaults: {
                scope: this
            },
            items: [{
                text: '查看详情',
                handler: function() {
                    Zm.managements.win.init().show();
                }
            },
            {
                text: '修改',
                handler: function() {
                    this.updateShoes()
                }
            }]
        });

        shoesGrid.on("rowcontextmenu", function(grid, rowIndex, e) {
            e.preventDefault();
            grid.getSelectionModel().selectRow(rowIndex);
            contextmenu.showAt(e.getXY())
        });

        return shoesGrid;
    },

    gridTbar: function() {
        return new Ext.Toolbar({
            defaults: {
                scope: this
            },
            items: ['-', {
                text: '添加新样品',
                handler: function() {
                    this.addShoes("添加新样品").show()
                }
            },
            '-', {
                text: '删除所选',
                handler: function() {
                    this.deleteShoes()
                }
            },
            '-']
        });
    },

//**********************************************************************************************
    //----------------------------------- 添加新样品
    addShoes: function(type) {
        var cm = new Ext.grid.ColumnModel([{
            header: '部位',
            dataIndex: 'region',
            editor: new Ext.grid.GridEditor(new Ext.form.ComboBox({
                id: 'addRegion',
                store: new Ext.data.JsonStore({
                    url: '/data_bases/get_region.json',
                    method: 'get',
                    root: 'region',
                    fields: ['id', 'region'],
                }),
                triggerAction: 'all',
                displayField: 'region',
                valueField: 'id',
                editable: false
            })),
            renderer: function(value) {
                var combo = Ext.getCmp("addRegion");
                record = combo.findRecord(combo.valueField, value);
                return record ? record.get(combo.displayField) : combo.valueNotFoundText;
            }
        },
        {
            header: '材料',
            dataIndex: 'material',
            editor: new Ext.grid.GridEditor(new Ext.form.ComboBox({
                id: 'addMaterial',
                store: new Ext.data.JsonStore({
                    url: '/data_bases/get_material.json',
                    method: 'get',
                    root: 'material',
                    fields: ['id', 'material'],
                }),
                triggerAction: 'all',
                displayField: 'material',
                valueField: 'id',
                editable: false
            })),
            renderer: function(value) {
                var combo = Ext.getCmp("addMaterial");
                record = combo.findRecord(combo.valueField, value);
                return record ? record.get(combo.displayField) : combo.valueNotFoundText;
            }
        },
        {
            header: '颜色',
            dataIndex: 'color',
            editor: new Ext.grid.GridEditor(new Ext.form.ComboBox({
                id: 'addColors',
                store: new Ext.data.JsonStore({
                    url: '/data_bases/get_color.json',
                    method: 'get',
                    root: 'color',
                    fields: ['id', 'color']
                }),
                triggerAction: 'all',
                displayField: 'color',
                valueField: 'id',
                editable: false
            })),
            renderer: function(value) {
                var combo = Ext.getCmp("addColors");
                record = combo.findRecord(combo.valueField, value);
                return record ? record.get(combo.displayField) : combo.valueNotFoundText;
            }
        },
        {
            header: '加工方法',
            dataIndex: 'procession',
            editor: new Ext.grid.GridEditor(new Ext.form.ComboBox({
                id: 'addProcession',
                store: new Ext.data.JsonStore({
                    url: '/data_bases/get_procession.json',
                    method: 'get',
                    root: 'procession',
                    fields: ['id', 'procession']
                }),
                triggerAction: 'all',
                displayField: 'procession',
                valueField: 'id',
                editable: false
            })),
            renderer: function(value) {
                var combo = Ext.getCmp("addProcession");
                record = combo.findRecord(combo.valueField, value);
                return record ? record.get(combo.displayField) : combo.valueNotFoundText;
            }
        }]);

        // ---------------------------放到grid里显示的原始数据
        var inpcdata = [];
        var inpcRecord = Ext.data.Record.create([{
            name: 'region'
        },
        {
            name: 'material'
        },
        {
            name: 'color'
        },
        {
            name: 'procession'
        }]);
        if (type == '修改') {
            var inpcstore = new Ext.data.JsonStore({
                url: '/data_bases/get_details_of_shoes.json',
                fields: ['region', 'material', 'color', 'procession'],
                baseParams: {
                    id: Ext.getCmp('storeOfShoesGrid').getSelectionModel().getSelected().id
                },
                root: 'dos',
            })
        } else {
            var inpcstore = new Ext.data.Store({
                proxy: new Ext.data.MemoryProxy(inpcdata),
                reader: new Ext.data.ArrayReader({},
                [{
                    name: 'region'
                },
                {
                    name: 'material'
                },
                {
                    name: 'color'
                },
                {
                    name: 'procession'
                }])
            })
        };
        var grid = new Ext.grid.EditorGridPanel({
            id: 'grid',
            region: 'center',
            stripeRows: true,
            autoScroll: true,
            loadMask: true,
            frame: true,
            trackMouseOver: true,
            viewConfig: {
                forceFit: true
            },
            store: inpcstore,
            cm: cm,
            enableColumnMove: false,
            tbar: new Ext.Toolbar(['-', {
                text: '添加一行',
                handler: function() {
                    var initValue = {
                        region: "",
                        material: "",
                        color: "",
                        procession: ""
                    };
                    var p = new inpcRecord(initValue);
                    grid.stopEditing();
                    inpcstore.insert(0, p);
                    grid.startEditing(0, 0);
                    p.dirty = true;
                    p.modifild = initValue;
                }
            },
            '-', {
                text: '删除一行',
                handler: function() {
                    var sm = grid.getSelectionModel();
                    var cell = sm.getSelectedCell();
                    if (!cell) {
                        Ext.Msg.alert('提示', '没有选择需要删除的数据行');
                    }
                    else {
                        Ext.Msg.confirm('信息', '确定要删除？', function(btn) {
                            if (btn == 'yes') {
                                var record = inpcstore.getAt(cell[0]);
                                inpcstore.remove(record);
                            }
                        })
                    }
                }
            },
            '-'])
        });
        //---------------------------------------添加窗口
        var sampleForm = new Ext.form.FormPanel({
            region: 'north',
            frame: true,
            labelAlign: 'left',
            labelWidth: 80,
            height: 100,
            width: 600,
            title: '样品表格填写',
            items: [{
                layout: 'column',
                items: [{
                    columnWidth: .33,
                    layout: 'form',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: '样品号',
                        width: 100,
                        id: 'addShoesId'
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: '鞋型',
                        width: 100,
                        id: 'addTypesOfShoes',
                        store: new Ext.data.SimpleStore({
                            fields: ['value', 'text'],
                            data: [['value1', '高跟鞋'], ['value2', '平底鞋'], ['value3', '靴子']]
                        }),
                        displayField: 'text',
                        valueField: 'text',
                        mode: 'local',
                        editable: false,
                        triggerAction: 'all',
                        emptyText: '请选择'
                    },
                    {}]
                },
                {
                    columnWidth: .33,
                    layout: 'form',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: '适用人群',
                        width: 100,
                        id: 'addSuitablePoeple'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '价格',
                        width: 100,
                        id: 'addPrice'
                    }]
                },
                {
                    columnWidth: .34,
                    layout: 'form',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: '颜色',
                        width: 100,
                        id: 'addColor'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '备注',
                        width: 100,
                        id: 'addRemark'
                    }]
                }]
            }]
        });

        //------------------------------图片窗口
        var samplePhoto = new Ext.form.FormPanel({
            id: 'photoForm',
            region: 'south',
            frame: true,
            labelAlign: 'right',
            labelWidth: 70,
            height: 230,
            width: 600,
            items: [{
                layout: 'column',
                items: [{
                    columnWidth: .5,
                    layout: 'form',
                    title: '图片1',

                },
                {
                    columnWidth: .5,
                    layout: 'form',
                    title: '图片2',

                }]
            }]
        });

        //----------------------------- 窗体上的按钮
        var btnPhoto = new Ext.form.TextField({ 
            text: '上传图片',
            scope: this,
            inputType: 'file',
            handler: function(){ 
            }

        });
        var btnSubmit = new Ext.Button({
            text: '确定',
            scope: this,
            handler: function() {
                this.checkForShoes(type);
            }
        });

        var btnReset = new Ext.Button({
            text: '重置',
            handler: function() {
                form.getForm().reset();
                grid.getStore().reload();
            }
        });

        //-------------------------------addShoesForm
        var form = new Ext.form.FormPanel({
            id: 'form',
            layout: 'border',
            frame: true,
            closeAction: 'hide',
            height: 630,
            width: 600,
            resizable: true,
            items: [sampleForm, grid, samplePhoto],
            buttons: [btnPhoto,btnSubmit, btnReset]
        });
        return new Ext.Window({
            id: 'addWindow',
            constrainHeader: true,
            title: type,
            modal: true,
            items: [form]
        });
    },
//***************************************************************************************************************
    createData: function() {
        var items = [];
        var store = Ext.getCmp('grid').getStore();
        for (i = 0; i < store.getCount(); i++) {
            var data = store.getAt(i).data;
            items.push({
                region_id: data.region,
                material_id: data.material,
                color_id: data.color,
                procession_id: data.procession
            });
        }
        return items
    },
//******************************************************************************************************************
    checkForShoes: function(type) {
        var _this = this
        var selection = Ext.getCmp('storeOfShoesGrid').getSelectionModel();
        var shoesId = Ext.getCmp('addShoesId').getValue();
        var suitablePeople = Ext.getCmp('addSuitablePoeple').getValue();
        var color = Ext.getCmp('addColor').getValue();
        var typesOfShoes = Ext.getCmp('addTypesOfShoes').getValue();
        var price = Ext.getCmp('addPrice').getValue();
        var remark = Ext.getCmp('addRemark').getValue();
        var productionDate = date2str(new Date());
        var win
        var record = {
            shoes_id                    : shoesId,
            suitable_people             : suitablePeople,
            colors                      : color,
            types_of_shoes              : typesOfShoes,
            price                       : price,
            remark                      : remark,
            production_date             : productionDate,
            details_of_shoes_attributes : _this.createData()
        };
        function date2str(d) {
            var ret = d.getFullYear() + "-"
            ret += ("00" + (d.getMonth() + 1)).slice( - 2) + "-"
            ret += ("00" + d.getDate()).slice( - 2) + " "
            return ret;
        }
        if (shoesId) {
            if (type == "修改") {
                var record = {
                    id                           : selection.getSelected().id,
                    shoes_id                     : shoesId,
                    suitable_people              : suitablePeople,
                    colors                       : color,
                    types_of_shoes               : typesOfShoes,
                    price                        : price,
                    remark                       : remark,
                    production_date              : productionDate,
                    details_of_shoes_attributes  : _this.createData()
                };
                Ext.Ajax.request({
                    url: '/data_bases/update_shoes_and_details_of_shoes.json',
                    method: 'post',
                    jsonData: {
                        record: record
                    },
                    success: function() {
                        Ext.getCmp('storeOfShoesGrid').store.load();
                        Ext.getCmp('addWindow').close();
                        Ext.Msg.alert('修改', '修改成功');
                    },
                    failure: function() {
                        Ext.Msg.alert('修改', '修改失败!');
                    },
                });
            } else {
                Ext.Ajax.request({
                    url: '/data_bases/create_shoes_and_details_of_shoes.json',
                    method: 'post',
                    jsonData: {
                        record: record
                    },
                    success: function() {
                        Ext.Msg.alert('添加', '添加成功!');
                    },
                    failure: function() {
                        Ext.Msg.alert('添加', '添加失败!');
                    },
                    callback: function() {
                        Ext.getCmp('form').form.reset();
                        Ext.getCmp('addWindow').close();
                        Ext.getCmp('storeOfShoesGrid').store.load();
                    }
                });
            }
        }
        else {
            Ext.Msg.alert('警告', '样品号不能为空!');
        }
    },
//***************************************************************************************
    //-------------------------删除所选
    deleteShoes: function() {
        var selection = Ext.getCmp('storeOfShoesGrid').getSelectionModel();
        if (selection.getSelected()) {
            Ext.Ajax.request({
                url: '/data_bases/delete_shoes_and_detail_of_shoes.json',
                method: 'post',
                jsonData: {
                    id: selection.getSelected().id,

                },
                success: function() {
                    Ext.getCmp('storeOfShoesGrid').store.load();
                    Ext.Msg.alert('删除', '删除成功!');
                },
                failure: function() {
                    Ext.Msg.alert('删除', '删除失败!');
                },
            })
        } else {
            Ext.Msg.alert('警告', '请选择一条记录');
        }

    },
//***************************************************************************************************
    //-------------------------------------- 修改
    updateShoes: function() {
        var selection = Ext.getCmp('storeOfShoesGrid').getSelectionModel();
        var data = selection.getSelected().data;
        this.addShoes("修改").show();
        Ext.getCmp('addShoesId').setValue(data["shoes_id"]);
        Ext.getCmp('addSuitablePoeple').setValue(data["suitable_people"]);
        Ext.getCmp('addColor').setValue(data["colors"]);
        Ext.getCmp('addTypesOfShoes').setValue(data["types_of_shoes"]);
        Ext.getCmp('addPrice').setValue(data["price"]);
        Ext.getCmp('addRemark').setValue(data["remark"]);
    }
}
/*renderer: function(combo, gridId) {
    var getValue = function(value) {
        var idx = combo.store.find(combo.valueField, value);
        var rec = combo.store.getAt(idx);
        if (rec) {
            return rec.get(combo.displayField);
        }
        return value;
    }

    return function(value) {
        if (combo.store.getCount() == 0 && gridId) {
            combo.store.on('load', function() {
                var grid = Ext.getCmp(gridId);
                if (grid) {
                    grid.getView().refresh();
                }
            },
            {
                single: true
            });
            return value;
        }

        return getValue(value);
    };
};*/

