Zm.data_bases.check_for_shoes = {
    init: function(type) {
        var photoOne = Ext.getCmp('photoForm').getForm().items.items[0].getValue();
        var photoTwo = Ext.getCmp('photoForm').getForm().items.items[1].getValue();
        var selection = Ext.getCmp('storeOfShoesGrid').getSelectionModel();
        var shoesId = Ext.getCmp('addShoesId').getValue();
        var suitablePeople = Ext.getCmp('addSuitablePoeple').getValue();
        var color = Ext.getCmp('addColor').getValue();
        var typesOfShoes = Ext.getCmp('addTypesOfShoes').getValue();
        var price = Ext.getCmp('addPrice').getValue();
        var remark = Ext.getCmp('addRemark').getValue();
        var productionDate = date2str(new Date());
        var record = {
            photo_one: photoOne, 
            photo_two: photoTwo,
            shoes_id: shoesId,
            suitable_people: suitablePeople,
            colors: color,
            types_of_shoes: typesOfShoes,
            price: price,
            remark: remark,
            production_date: productionDate,
            details_of_shoes_attributes: Zm.data_bases.create_data.init()
        };
        function date2str(d) {
            var ret = d.getFullYear() + "-"
            ret += ("00" + (d.getMonth() + 1)).slice( - 2) + "-"
            ret += ("00" + d.getDate()).slice( - 2) + " "
            return ret;
        }
        if (shoesId) {
            if (type == "修改") {
                var record = {
                    id: selection.getSelected().id,
                    shoes_id: shoesId,
                    suitable_people: suitablePeople,
                    colors: color,
                    types_of_shoes: typesOfShoes,
                    price: price,
                    remark: remark,
                    production_date: productionDate,
                    details_of_shoes_attributes: Zm.data_bases.create_data.init()
                };
                Ext.Ajax.request({
                    url: '/data_bases/update_shoes_and_details_of_shoes.json',
                    method: 'post',
                    jsonData: {
                        record: record
                    },
                    success: function() {
                        Ext.getCmp('storeOfShoesGrid').store.load();
                        Ext.getCmp('addWindow').close();
                        Ext.Msg.alert('修改', '修改成功');
                    },
                    failure: function() {
                        Ext.Msg.alert('修改', '修改失败!');
                    },
                });
            } else {
                Ext.Ajax.request({
                    url: '/data_bases/create_shoes_and_details_of_shoes.json',
                    method: 'post',
                    jsonData: {
                        record: record
                    },
                    success: function() {
                        Ext.Msg.alert('添加', '添加成功!');
                    },
                    failure: function() {
                        Ext.Msg.alert('添加', '添加失败!');
                    },
                    callback: function() {
                        Ext.getCmp('form').form.reset();
                        Ext.getCmp('addWindow').close();
                        Ext.getCmp('storeOfShoesGrid').store.load();
                    }
                });
            }
        }
        else {
            Ext.Msg.alert('警告', '样品号不能为空!');
        }
    }
}

