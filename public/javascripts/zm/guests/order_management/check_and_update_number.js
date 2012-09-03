Zm.guests.check_and_update_number = {
    init: function() {
        var cm = new Ext.grid.ColumnModel([{
            header: '样品号',
            dataIndex: 'shoes_id',
            editor: new Ext.grid.GridEditor(new Ext.form.TextField({ allowBlank: false }))
        },
        {
            header: '38',
            dataIndex: 'size_38',
            editor: new Ext.grid.GridEditor(new Ext.form.TextField({ allowBlank: false }))
        },
        {
            header: '39',
            dataIndex: 'size_39',
            editor: new Ext.grid.GridEditor(new Ext.form.TextField({ allowBlank: false }))
        },
        {
            header: '40',
            dataIndex: 'size_40',
            editor: new Ext.grid.GridEditor(new Ext.form.TextField({ allowBlank: false }))
        },
        {
            header: '41',
            dataIndex: 'size_41',
            editor: new Ext.grid.GridEditor(new Ext.form.TextField({ allowBlank: false }))
        },
        {
            header: '42',
            dataIndex: 'size_42',
            editor: new Ext.grid.GridEditor(new Ext.form.TextField({ allowBlank: false }))
        },
        {
            header: '43',
            dataIndex: 'size_43',
            editor: new Ext.grid.GridEditor(new Ext.form.TextField({ allowBlank: false }))
        },
        {
            header: '44',
            dataIndex: 'size_44',
            editor: new Ext.grid.GridEditor(new Ext.form.TextField({ allowBlank: false }))
        }]);

        var data = [['MH-30', '100', '42', '200', '100'], ['MH-30', '100', '41', '400', '400'], ['B-24', '100', '39', '100', '50'], ['F-42', '100', '38', '500', '480'], ['16MM宽', '100', '42', '520', '480'], ['7MM', '100', '41', '120', '120'], ['43/1*3', '100', '40', '250', '250']];
        var store = new Ext.data.Store({
            proxy: new Ext.data.MemoryProxy(data),
            reader: new Ext.data.ArrayReader({},
            [{
                name: 'shoes_id'
            },
            {
                name: 'size_38'
            },
            {
                name: 'size_39'
            },
            {
                name: 'size_40'
            },
            {
                name: 'size_41'
            },
            {
                name: 'size_42'
            },
            {
                name: 'size_43'
            },
            {
                name: 'size_44'
            }])
        });
        store.load();

        var grid = new Ext.grid.EditorGridPanel({
            height: 578,
            autoScroll: true,
            loadMask: true,
            frame: true,
            viewConfig: {
                forceFit: true
            },
            store: store,
            cm: cm,
            bbar: new Ext.PagingToolbar({
                pageSize: 10,
                store: store,
                displayInfo: true,
                displayMsg: '显示第{0}条到{1}条记录，一共{2}条',
                emptyMsg: '没有记录'
            })
        });
        var win = new Ext.Window({
            height: 600,
            width: 500,
            frame: true,
            constrainHeader: true,
            items: [grid]
        });
        return win
    }
}

