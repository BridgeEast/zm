Zm.data_bases.store_of_shoes = {
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
                    Zm.data_bases.update_shoes.init()
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
                scope: this,
                handler: function() {
                    Zm.data_bases.delete_shoes.init()
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
                    fields: ['id', 'region']
                }),
                triggerAction: 'all',
                displayField: 'region',
                valueField: 'id',
                editable: false
            })),
            renderer: function(value) {
                var combo = Ext.getCmp("addRegion");
                record = combo.findRecord(combo.valueField, value);
                return record ? record.get(combo.displayField) : value;
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
                    fields: ['id', 'material']
                }),
                triggerAction: 'all',
                displayField: 'material',
                valueField: 'id',
                editable: false
            })),
            renderer: function(value) {
                var combo = Ext.getCmp("addMaterial");
                record = combo.findRecord(combo.valueField, value);
                return record ? record.get(combo.displayField) : value;
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
                return record ? record.get(combo.displayField) : value;
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
                return record ? record.get(combo.displayField) : value;
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
                url: '/data_bases/get_check_details_of_shoes.json',
                fields: ['region', 'material', 'color', 'procession'],
                baseParams: {
                    id: Ext.getCmp('storeOfShoesGrid').getSelectionModel().getSelected().data['id']
                },
                root: 'dos'
            });
            Ext.getCmp("addRegion").store.load();
            Ext.getCmp("addMaterial").store.load();
            Ext.getCmp("addColors").store.load();
            Ext.getCmp("addProcession").store.load({
                callback: function() {
                    inpcstore.load()
                }
            });
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
                    }]
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
            layout: 'column',
            items: [{
                columnWidth: .5,
                items: [{
                    xtype: 'box',
                    id: 'pho',
                    height: 192,
                    autoEl: {
                        tag: 'img',
                        src: Ext.BLANK_IMAGE_URL,
                    }
                },
                {
                    xtype: 'textfield',
                    inputType: 'file',
                    id: 'photoFileOne',
                    name: 'photoFileOne',
                    listeners: {
                        'render': function() {
                            var fileCmpO = Ext.get('photoFileOne');
                            fileCmpO.on('change', function(field, newValue, oldValue) {
                                Ext.get('pho').dom.src = window.URL.createObjectURL(Ext.get('photoFileOne').dom.files[0]);
                                
                            },
                            this);
                        }
                    }

                }]
            },
            {
                columnWidth: .5,
                items: [{
                    xtype: 'box',
                    id: 'pht',
                    height: 192,
                    autoEl: {
                        tag: 'img',
                        src: Ext.BLANK_IMAGE_URL
                    }
                },
                {
                    xtype: 'textfield',
                    inputType: 'file',
                    id: 'photoFileTwo',
                    name: 'photoTwo',
                    listeners: {
                        'render': function() {
                            var fileCmpT = Ext.get('photoFileTwo');
                            fileCmpT.on('change', function(field, newValue, oldValue) {
                                Ext.get('pht').dom.src = window.URL.createObjectURL(Ext.get('photoFileTwo').dom.files[0]);
                            },
                            this);
                        }
                    }
                }]
            }]
        });

        //----------------------------- 窗体上的按钮
        var btnSubmit = new Ext.Button({
            text: '确定',
            scope: this,
            handler: function() {
                Zm.data_bases.check_for_shoes.init(type)
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
            buttons: [btnSubmit, btnReset]
        });
        return new Ext.Window({
            id: 'addWindow',
            constrainHeader: true,
            title: type,
            modal: true,
            items: [form]
        });
    }
}

