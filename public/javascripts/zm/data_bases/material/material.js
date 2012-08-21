Zm.dataBases.material = { 
    init: function() { 
        Zm.pages.ViewPort = { 
            layout: 'border',
            region:'center',
            items: [this.createMaterialGrid()]
        };
    },

    createMaterialGrid: function() { 
        var cm = new Ext.grid.ColumnModel([ 
            new Ext.grid.RowNumberer(),
            { header: '材料', dataIndex: 'material' },
            { header: '备注', dataIndex: 'remark' },
            { header: '创建日期', dataIndex: 'created_date' }
        ]);

        var store = new Ext.data.JsonStore({ 
            url: '/data_bases/get_material.json',
            fields: ['id','material', 'remark','created_date'],
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
            height: 200,
            frame: true,
            items: [
                { id: 'addMaterial', fieldLabel: '材料', xtype: 'textfield', width: 200 },
                { id: 'addRemark', fieldLabel: '备注', xtype: 'textarea', width: 200 },
                { id: 'addCreatedDate', fieldLabel: '创建日期', xtype: 'datefield', width: 200 }
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
        var material = Ext.getCmp('addMaterial').getValue();
        var remark = Ext.getCmp('addRemark').getValue();
        var created_date = Ext.getCmp('addCreatedDate').getValue();
        var selection = Ext.getCmp('materialGrid').getSelectionModel();
        var store = Ext.getCmp('materialGrid').store;
        var win
        var record = { 
            material: material,
            remark: remark,
            created_date: created_date
        };
        if(material) { 
            if(type == "修改部位") { 
                var record = { 
                    id: selection.getSelected().data["id"],
                    material: material,
                    remark: remark,
                    created_date: created_date
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
            Ext.getCmp('addMaterial').setValue(data["material"]);
            Ext.getCmp('addRemark').setValue(data["remark"]);
            Ext.getCmp('addCreatedDate').setValue(data["createdDates"]);
        };
    } 

};

