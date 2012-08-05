Zm.dataBases.color = { 
    init: function() { 
        Zm.pages.ViewPort = {
            layout: 'border',
            region:'center',
            items: [this.createColorGrid()]
        };
    },

    createColorGrid: function() { 
        var cm = new Ext.grid.ColumnModel([ 
            new Ext.grid.RowNumberer(),
            { header: '颜色', dataIndex: 'name' },
            { header: '备注', dataIndex: 'remark' }
        ]);

        var store = new Ext.data.JsonStore({ 
            url: '/data_bases/get_color.json',
            fields: ['id','name', 'remark'],
            root: 'color',
            autoLoad: true
        });

        return new Ext.grid.GridPanel({ 
            id: 'colorGrid',
            title: '颜色',
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
                handler: function() { this.addColor("添加颜色").show() }
            }, { 
                text: '删除',
                handler: function() { this.deleteColor() }
            }, { 
                text: '修改',
                handler: function() { this.updateColor() }
            }]
        });        
    },

    addColor: function(type) { 
        var addColorForm = new Ext.form.FormPanel({ 
            id: 'addColorForm',
            labelAlign: 'right',
            labelWidth: 60,
            bodyStyle: 'padding: 10px 0 0 0',
            width: 300,
            height: 160,
            frame: true,
            items: [
                { id: 'addName', fieldLabel: '颜色', xtype: 'textfield', width: 200 },
                { id: 'addRemark', fieldLabel: '备注', xtype: 'textarea', width: 200 }
            ],
            buttons: [{ 
                text: '保存',
                scope: this,
                handler: function() { 
                    this.checkForColor(type)
                }
            }]
        });

        return new Ext.Window({ 
            id: 'addWindow',
            title: type,
            modal: true,
            items: [ addColorForm ]
        });           
    },

    checkForColor: function(type) { 
        var name = Ext.getCmp('addName').getValue();
        var remark = Ext.getCmp('addRemark').getValue();
        var selection = Ext.getCmp('colorGrid').getSelectionModel();
        var store = Ext.getCmp('colorGrid').store;
        var win
        var record = { 
            name: name,
            remark: remark
        };
        if(name) { 
            if(type == "修改颜色") { 
                var record = { 
                    id: selection.getSelected().data["id"],
                    name: name,
                    remark: remark
                };
                Ext.Ajax.request({ 
                    url: '/data_bases/update_color.json',
                    method: 'post',
                    jsonData: { record: record },
                    success: function() { 
                        Ext.getCmp('colorGrid').store.load();                    
                        Ext.getCmp('addWindow').close();                        
                        Ext.Msg.alert('修改', '修改成功!');
                    },
                    failure: function() { 
                        Ext.Msg.alert('修改', '修改失败!');         
                    },
                });
            }else{ 
                Ext.Ajax.request({ 
                    url: '/data_bases/create_color.json',
                    method: 'post',
                    jsonData: { record: record },
                    success: function() { 
                        Ext.Msg.alert('添加', '添加成功!');
                    },
                    failure: function() { 
                        Ext.Msg.alert('添加', '添加失败!');         
                    },
                    callback: function() { 
                        Ext.getCmp('addColorForm').form.reset();
                        Ext.getCmp('addWindow').close();
                        Ext.getCmp('colorGrid').store.load();
                    }
                });      
            }

        }else{ 
            Ext.Msg.alert('警告', '颜色不能为空' );
        }
    },

    deleteColor: function() { 
        var selection = Ext.getCmp('colorGrid').getSelectionModel();
        if(selection.getSelected()) { 
            Ext.Ajax.request({ 
                url: '/data_bases/delete_color.json',
                method: 'post',
                jsonData: { id: selection.getSelected().id },
                success: function() { 
                    Ext.getCmp('colorGrid').store.load();                    
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

    updateColor: function() { 
        var selection = Ext.getCmp('colorGrid').getSelectionModel();
        if(!selection.getSelected()) { 
            Ext.Msg.alert('警告', '请选择一条记录');
        }else{ 
            var data = selection.getSelected().data
            this.addColor("修改颜色").show();             
            Ext.getCmp('addName').setValue(data["name"]);
            Ext.getCmp('addRemark').setValue(data["remark"]);
        };
    } 

};

