Zm.data_bases.update_shoes = {
    init: function() {
        this.updateShoes()
    },
    updateShoes: function() {
        var selection = Ext.getCmp('storeOfShoesGrid').getSelectionModel();
        var data = selection.getSelected().data;
        Zm.data_bases.store_of_shoes.addShoes("修改").show();
        Ext.getCmp('addShoesId').setValue(data["shoes_id"]);
        Ext.getCmp('addSuitablePoeple').setValue(data["suitable_people"]);
        Ext.getCmp('addColor').setValue(data["colors"]);
        Ext.getCmp('addTypesOfShoes').setValue(data["types_of_shoes"]);
        Ext.getCmp('addPrice').setValue(data["price"]);
        Ext.getCmp('addRemark').setValue(data["remark"]);
    }
}

