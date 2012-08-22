Zm.dataBases.region = { 
    init: function() { 
        Zm.pages.ViewPort = {
            layout: 'border',
            region:'center',
            items: [this.createRegionGrid()]
        };
    },

    createRegionGrid: function() { 
        var cm = new Ext.grid.ColumnModel([ 
            new Ext.grid.RowNumberer(),
            { header: '部位', dataIndex: 'region' },
            { header: '备注', dataIndex: 'remark' },
            { header: '创建日期', dataIndex: 'created_date' }
        ]);

        var store = new Ext.data.JsonStore({ 
            url: '/data_bases/get_region.json',
            fields: ['id','region', 'remark', 'created_date'],
            root: 'region',
            autoLoad: true
        });

        return new Ext.grid.GridPanel({ 
            id: 'regionGrid',
            title: '部位',
            region: 'center', cm: cm, store: store,
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
                handler: function() { this.addRegion("添加部位").show() }
            }, { 
                text: '删除',
                handler: function() { this.deleteRegion() }
            }, { 
                text: '修改',
                handler: function() { this.updateRegion() }
            }]
        });        
    },

    addRegion: function(type) {
        var addRegionForm = new Ext.form.FormPanel({ 
            id: 'addRegionForm',
            labelAlign: 'right',
            labelWidth: 60,
            bodyStyle: 'padding: 10px 0 0 0',
            width: 300,
            height: 190,
            frame: true,
            items: [
                { id: 'addRegion', fieldLabel: '部位', xtype: 'textfield', width: 200 },
                { id: 'addRemark', fieldLabel: '备注', xtype: 'textarea', width: 200 },
                { id: 'addCreatedDate', fieldLabel:'创建日期', xtype: 'datefield', width: 200}
            ],
            buttons: [{ 
                text: '保存',
                scope: this,
                handler: function() { 
                    this.checkForRegion(type)
                }
            }]
        });

        return new Ext.Window({ 
            id: 'addWindow',
            title: type,
            modal: true,
            items: [ addRegionForm ]
        });           
    },

    checkForRegion: function(type) { 
        var region = Ext.getCmp('addRegion').getValue();
        var remark = Ext.getCmp('addRemark').getValue();
        var createdDate = Ext.getCmp('addCreatedDate').getValue();
        var selection = Ext.getCmp('regionGrid').getSelectionModel();
        var store = Ext.getCmp('regionGrid').store;
        var win
        var record = { 
            region: region,
            remark: remark,
            created_date: createdDate
        };
        if(region) { 
            if(type == "修改部位") { 
                var record = { 
                    id: selection.getSelected().data["id"],
                    region: region,
                    remark: remark,
                    created_date: createdDate
                };
                Ext.Ajax.request({ 
                    url: '/data_bases/update_region.json',
                    method: 'post',
                    jsonData: { record: record },
                    success: function() { 
                        Ext.getCmp('regionGrid').store.load();                    
                        Ext.getCmp('addWindow').close();                        
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
                        Ext.getCmp('addWindow').close();
                        Ext.getCmp('regionGrid').store.load();
                    }
                });      
            }

        }else{ 
            Ext.Msg.alert('警告', '部位不能为空' );
        }
    },

    
    updateRegion: function() { 
        var selection = Ext.getCmp('regionGrid').getSelectionModel();
        if(!selection.getSelected()) { 
            Ext.Msg.alert('警告', '请选择一条记录');
        }else{ 
            var data = selection.getSelected().data
            this.addRegion("修改部位").show();             
            Ext.getCmp('addName').setValue(data["name"]);
            Ext.getCmp('addRemark').setValue(data["remark"]);
        };
    }, 

    deleteRegion: function() { 
        var selection = Ext.getCmp('regionGrid').getSelectionModel();
        if(selection.getSelected()) { 
            Ext.Ajax.request({ 
                url: '/data_bases/delete_region.json',
                method: 'post',
                jsonData: { id: selection.getSelected().id },
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
        var selection = Ext.getCmp('regionGrid').getSelectionModel();
        if(!selection.getSelected()) { 
            Ext.Msg.alert('警告', '请选择一条记录');
        }else{ 
            var data = selection.getSelected().data
            this.addRegion("修改部位").show();         
            Ext.getCmp('addRegion').setValue(data["region"]);
            Ext.getCmp('addRemark').setValue(data["remark"]);
            Ext.getCmp('addCreatedDate').setValue(data["createdDate"]);
        };
    } 

};
