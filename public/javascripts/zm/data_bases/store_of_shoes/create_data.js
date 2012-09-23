Zm.data_bases.create_data = {
    init: function() {
        var items = [];
        var store = Ext.getCmp('grid').getStore();
        for (var i = 0; i < store.getCount(); i++) {
            var data = store.getAt(i).data;
            items.push({
                region_id: data.region,
                material_id: data.material,
                color_id: data.color,
                procession_id: data.procession
            });
        }
        return items
    }
}

