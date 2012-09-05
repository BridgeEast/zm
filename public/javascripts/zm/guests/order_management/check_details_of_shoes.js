Zm.guests.check_details_of_shoes = {
    init: function() {
        var form = new Ext.form.FormPanel({
            frame: true,
            height: 240,
            width: 500,
            title: '查看详情',
            items: [{
                layout: 'column',
                items: [{
                    columnWidth: .5,
                    html: '<img src=\'/images/shoes/' + Ext.getCmp('grid').getSelectionModel().getSelected().data.photo_one + '\'width=100% height=100%>'
                },
                {
                    columnWidth: .5,
                    html: '<img src=\'/images/shoes/' + Ext.getCmp('grid').getSelectionModel().getSelected().data.photo_two + '\' width=100% height=100%>'
                }]
            }]
        });

        var cm = new Ext.grid.ColumnModel([{ 
            header: '部位',
            dataIndex: 'region'
        },
        { 
            header: '材料',
            dataIndex: 'material'
        },
        { 
            header: '颜色',
            dataIndex: 'color'
        },
        { 
            header: '加工方法',
            dataIndex: 'procession'
        }]);
        var store = new Ext.data.JsonStore({ 
            url: '/guests/get_details_of_shoes.json',
            fields: ['region', 'material', 'color', 'procession'],
            method: 'post',
            baseParams: { shoes_id: Ext.getCmp('grid').getSelectionModel().getSelected().data["shoes_id"]},
            root: 'dos',
            autoLoad: true
        });

        var detailsShowGrid = new Ext.grid.GridPanel({ 
            height: 360,
            loadMask: true,
            viewConfig: { forceFit: true },
            store: store,
            cm: cm
        });
        var checkDetails = new Ext.Window({ 
            height: 600,
            width: 500,
            constrainHeader: true,
            resizable: false,
            items: [form, detailsShowGrid]
        });
        return checkDetails
    }
}

