Zm.dataBases.material = { 
    init: function() { 
        new Ext.Viewport({ 
            layout: 'border',
            items: [this.panel(), this.createMaterialGrid()]
        });
    },

    panel: function() { 
        return new Ext.Panel({ 
            region: 'north',
            height: 45
        });
    },

    createMaterialGrid: function() { 
        var cm = new Ext.grid.ColumnModel([ 
            new Ext.grid.RowNumberer(),
            { header: '材料', dataIndex: 'name' },
            { header: '备注', dataIndex: 'remark' }
        ]);

        var store = new Ext.data.JsonStore({ 
            url: '/data_bases/get_material.json',
            fields: ['id','name', 'remark'],
            root: 'material',
            autoLoad: true
        });

        return new Ext.grid.GridPanel({ 
            id: 'materialGrid',
            title: '材料',
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
                handler: function() { this.addMaterial("添加材料").show() }
            }, { 
                text: '删除',
                handler: function() { this.deleteMaterial() }
            }, { 
                text: '修改',
                handler: function() { this.updateMaterial() }
            }]
        });        
    },

    addMaterial: function(type) { 
        var addMaterialForm = new Ext.form.FormPanel({ 
            id: 'addMaterialForm',
            labelAlign: 'right',
            labelWidth: 60,
            bodyStyle: 'padding: 10px 0 0 0',
            width: 300,
            height: 160,
            frame: true,
            items: [
                { id: 'addName', fieldLabel: '材料', xtype: 'textfield', width: 200 },
                { id: 'addRemark', fieldLabel: '备注', xtype: 'textarea', width: 200 }
            ],
            buttons: [{ 
                text: '保存',
                scope: this,
                handler: function() { 
                    this.checkForMaterial(type)
                }
            }]
        });

        return new Ext.Window({ 
            id: 'addWindow',
            title: type,
            modal: true,
            items: [ addMaterialForm ]
        });           
    },

    checkForMaterial: function(type) { 
        var name = Ext.getCmp('addName').getValue();
        var remark = Ext.getCmp('addRemark').getValue();
        var selection = Ext.getCmp('materialGrid').getSelectionModel();
        var store = Ext.getCmp('materialGrid').store;
        var win
        var record = { 
            name: name,
            remark: remark
        };
        if(name) { 
            if(type == "修改部位") { 
                var record = { 
                    id: selection.getSelected().data["id"],
                    name: name,
                    remark: remark
                };
                Ext.Ajax.request({ 
                    url: '/data_bases/update_material.json',
                    method: 'post',
                    jsonData: { record: record },
                    success: function() { 
                        Ext.getCmp('materialGrid').store.load();                    
                        Ext.getCmp('addWindow').close();                        
                        Ext.Msg.alert('修改', '修改成功!');
                    },
                    failure: function() { 
                        Ext.Msg.alert('修改', '修改失败!');         
                    },
                });
            }else{ 
                Ext.Ajax.request({ 
                    url: '/data_bases/create_material.json',
                    method: 'post',
                    jsonData: { record: record },
                    success: function() { 
                        Ext.Msg.alert('添加', '添加成功!');
                    },
                    failure: function() { 
                        Ext.Msg.alert('添加', '添加失败!');         
                    },
                    callback: function() { 
                        Ext.getCmp('addMaterialForm').form.reset();
                        Ext.getCmp('addWindow').close();
                        Ext.getCmp('materialGrid').store.load();
                    }
                });      
            }

        }else{ 
            Ext.Msg.alert('警告', '部位不能为空' );
        }
    },

    deleteMaterial: function() { 
        var selection = Ext.getCmp('materialGrid').getSelectionModel();
        if(selection.getSelected()) { 
            Ext.Ajax.request({ 
                url: '/data_bases/delete_material.json',
                method: 'post',
                jsonData: { id: selection.getSelected().id },
                success: function() { 
                    Ext.getCmp('materialGrid').store.load();                    
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

    updateMaterial: function() { 
        var selection = Ext.getCmp('materialGrid').getSelectionModel();
        if(!selection.getSelected()) { 
            Ext.Msg.alert('警告', '请选择一条记录');
        }else{ 
            var data = selection.getSelected().data
            this.addMaterial("修改部位").show();             
            Ext.getCmp('addName').setValue(data["name"]);
            Ext.getCmp('addRemark').setValue(data["remark"]);
        };
    } 

};

