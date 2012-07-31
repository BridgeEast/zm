Zm.dataBases.region = { 
    init: function() { 
        this.win = this.addRegion();
        new Ext.Viewport({ 
            layout: 'border',
            items: [this.panel(), this.createRegionGrid()]
        });
    },

    panel: function() { 
        return new Ext.Panel({ 
            region: 'north',
            height: 45
        });
    },

    createRegionGrid: function() { 
        var cm = new Ext.grid.ColumnModel([ 
            new Ext.grid.RowNumberer(),
            { header: '部位', dataIndex: 'name' },
            { header: '备注', dataIndex: 'remark' }
        ]);

        var store = new Ext.data.JsonStore({ 
            url: '/data_bases/get_region.json',
            fields: ['id','name', 'remark'],
            root: 'region',
            autoLoad: true
        });

        return new Ext.grid.GridPanel({ 
            id: 'regionGrid',
            title: '部位',
            region: 'center',
            cm: cm,
            store: store,
            viewConfig: { forceFit: true },
            tbar: this.gridTbar()
        });                  
    },

    gridTbar: function() { 
        return new Ext.Toolbar({ 
            defaults: { 
                scope: this 
            },
            items: [{ 
                text: '添加',
                handler: function() { this.win.show() }
            }, { 
                text: '删除',
                handler: function() { this.deleteRegion() }
            }, { 
                text: '修改',
                handler: function() { this.updateRegion() }
            }]
        });        
    },

    addRegion: function() { 
        var addRegionForm = new Ext.form.FormPanel({ 
            id: 'addRegionForm',
            labelAlign: 'right',
            labelWidth: 60,
            bodyStyle: 'padding: 10px 0 0 0',
            width: 300,
            height: 160,
            frame: true,
            items: [
                { id: 'addName', fieldLabel: '部位', xtype: 'textfield', width: 200 },
                { id: 'addRemark', fieldLabel: '备注', xtype: 'textarea', width: 200 }
            ],
            buttons: [{ 
                text: '保存',
                scope: this,
                handler: function() { 
                    this.checkForRegion()
                }
            }]
        });

        return new Ext.Window({ 
            id: 'addWindow',
            title: '更新部位',
            closeAction: 'hide',
            modal: true,
            items: [ addRegionForm ]
        });           
    },

    checkForRegion: function() { 
        var name = Ext.getCmp('addName').getValue();
        var remark = Ext.getCmp('addRemark').getValue();
        var selection = Ext.getCmp('regionGrid').getSelectionModel();
        var record = { 
            name: name,
            remark: remark
        };
        if(name) { 
            if(selection) { 
                var record = { 
                    id: selection.getSelected().data["id"],
                    name: name,
                    remark: remark
                };
                Ext.Ajax.request({ 
                    url: '/data_bases/update_region.json',
                    method: 'post',
                    jsonData: { record: record },
                    success: function() { 
                        Ext.getCmp('regionGrid').store.load();                    
                        Ext.getCmp('addWindow').hide();                        
                        Ext.Msg.alert('修改', '修改成功!');
                    },
                    failure: function() { 
                        Ext.Msg.alert('修改', '修改失败!');         
                    },
                });
            }else{ 
                Ext.Ajax.request({ 
                    url: '/data_bases/create_region.json',
                    method: 'post',
                    jsonData: { record: record },
                    success: function() { 
                        Ext.Msg.alert('添加', '添加成功!');
                    },
                    failure: function() { 
                        Ext.Msg.alert('添加', '添加失败!');         
                    },
                    callback: function() { 
                        Ext.getCmp('addRegionForm').form.reset();
                        Ext.getCmp('addWindow').hide();
                        Ext.getCmp('regionGrid').store.load();
                    }
                });      
            }

        }else{ 
            Ext.Msg.alert('警告', '部位不能为空' );
        }
    },

    deleteRegion: function() { 
        var id = Ext.getCmp('regionGrid').getSelectionModel().getSelected().id;
        if(id) { 
            Ext.Ajax.request({ 
                url: '/data_bases/delete_region.json',
                method: 'post',
                jsonData: { id: id },
                success: function() { 
                    Ext.getCmp('regionGrid').store.load();                    
                    Ext.Msg.alert('删除', '删除成功!');
                },
                failure: function() { 
                    Ext.Msg.alert('删除', '删除失败!');         
                },
            })
        }else{ 
            Ext.Msg.alert('警告', '请选择一条记录');
        }
    },

    updateRegion: function() { 
        var data = Ext.getCmp('regionGrid').getSelectionModel().getSelected().data;
        this.win.show();             
        Ext.getCmp('addName').setValue(data["name"]);
        Ext.getCmp('addRemark').setValue(data["remark"]);
    } 

};
