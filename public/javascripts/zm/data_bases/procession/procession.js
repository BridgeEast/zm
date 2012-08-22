Zm.dataBases.procession = { 
    init: function() { 
        Zm.pages.ViewPort = { 
            layout: 'border',
            region:'center',
            items: [this.createProcessionGrid()]
        };
    },

    createProcessionGrid: function() { 
        var cm = new Ext.grid.ColumnModel([ 
            new Ext.grid.RowNumberer(),
            { header: '加工方法', dataIndex: 'procession' },
            { header: '备注', dataIndex: 'remark' },
            { header: '创建日期', dataIndex: 'created_date' }
        ]);

        var store = new Ext.data.JsonStore({ 
            url: '/data_bases/get_procession.json',
            fields: ['id','procession', 'remark','created_date'],
            root: 'procession',
            autoLoad: true
        });

        return new Ext.grid.GridPanel({ 
            id: 'processionGrid',
            title: '加工方法',
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
                handler: function() { this.addProcession("添加加工方法").show() }
            }, { 
                text: '删除',
                handler: function() { this.deleteProcession() }
            }, { 
                text: '修改',
                handler: function() { this.updateProcession() }
            }]
        });        
    },

    addProcession: function(type) { 
        var addProcessionForm = new Ext.form.FormPanel({ 
            id: 'addProcessionForm',
            labelAlign: 'right',
            labelWidth: 60,
            bodyStyle: 'padding: 10px 0 0 0',
            width: 300,
            height: 190,
            frame: true,
            items: [
                { id: 'addProcession', fieldLabel: '加工方法', xtype: 'textfield', width: 200 },
                { id: 'addRemark', fieldLabel: '备注', xtype: 'textarea', width: 200 },
                { id: 'addCreatedDate', fieldLabel: '创建日期', xtype: 'datefield', width: 200 }
            ],
            buttons: [{ 
                text: '保存',
                scope: this,
                handler: function() { 
                    this.checkForProcession(type)
                }
            }]
        });

        return new Ext.Window({ 
            id: 'addWindow',
            title: type,
            modal: true,
            items: [ addProcessionForm ]
        });           
    },

    checkForProcession: function(type) { 
        var procession = Ext.getCmp('addProcession').getValue();
        var remark = Ext.getCmp('addRemark').getValue();
        var created_date = Ext.getCmp('addCreatedDate').getValue();
        var selection = Ext.getCmp('processionGrid').getSelectionModel();
        var store = Ext.getCmp('processionGrid').store;
        var win
        var record = { 
            procession: procession,
            remark: remark,
            created_date: created_date
        };
        if(procession) { 
            if(type == "修改加工方法") { 
                var record = { 
                    id: selection.getSelected().data["id"],
                    procession: procession,
                    remark: remark,
                    created_date: created_date
                };
                Ext.Ajax.request({ 
                    url: '/data_bases/update_procession.json',
                    method: 'post',
                    jsonData: { record: record },
                    success: function() { 
                        Ext.getCmp('processionGrid').store.load();                    
                        Ext.getCmp('addWindow').close();                        
                        Ext.Msg.alert('修改', '修改成功!');
                    },
                    failure: function() { 
                        Ext.Msg.alert('修改', '修改失败!');         
                    },
                });
            }else{ 
                Ext.Ajax.request({ 
                    url: '/data_bases/create_procession.json',
                    method: 'post',
                    jsonData: { record: record },
                    success: function() { 
                        Ext.Msg.alert('添加', '添加成功!');
                    },
                    failure: function() { 
                        Ext.Msg.alert('添加', '添加失败!');         
                    },
                    callback: function() { 
                        Ext.getCmp('addProcessionForm').form.reset();
                        Ext.getCmp('addWindow').close();
                        Ext.getCmp('processionGrid').store.load();
                    }
                });      
            }

        }else{ 
            Ext.Msg.alert('警告', '部位不能为空' );
        }
    },

    deleteProcession: function() { 
        var selection = Ext.getCmp('processionGrid').getSelectionModel();
        if(selection.getSelected()) { 
            Ext.Ajax.request({ 
                url: '/data_bases/delete_procession.json',
                method: 'post',
                jsonData: { id: selection.getSelected().id },
                success: function() { 
                    Ext.getCmp('processionGrid').store.load();                    
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

    updateProcession: function() { 
        var selection = Ext.getCmp('processionGrid').getSelectionModel();
        if(!selection.getSelected()) { 
            Ext.Msg.alert('警告', '请选择一条记录');
        }else{ 
            var data = selection.getSelected().data
            this.addProcession("修改加工方法").show();             
            Ext.getCmp('addProcession').setValue(data["procession"]);
            Ext.getCmp('addRemark').setValue(data["remark"]);
            Ext.getCmp('addCreatedDate').setValue(data["createdDate"]);
        };
    } 

};

