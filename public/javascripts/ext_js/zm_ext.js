Ext.apply(Ext.form.FormPanel.prototype, { 
    frame: true,
    getFormValues: function(conditions) { 
        // 获取数据
        if(!conditions) conditions = {};
        if (Ext.isDefined(conditions.disabledFields))
            conditions.disabledFields.forEach(function (id) { Ext.getCmp(id).enable(); });
        var obj = this.form.getValues();
        if (Ext.isDefined(conditions.disabledFields))
            conditions.disabledFields.forEach(function (id) { Ext.getCmp(id).disable(); });
        for(key in obj) { 
            if(key.isInclude("-comboBox") || key.isInclude("-trigger")) {
                delete obj[key];
                var fieldId = key.slice(0, key.indexOf("-"));
                obj[fieldId] = key.isInclude("-comboBox") ? Ext.getCmp(fieldId).getValue() : Ext.getCmp(fieldId).trueValue;
            }
        }
        if(conditions.skips)
            for(var i = 0; i < conditions.skips.length; i++)
                delete obj[conditions.skips[i]];
        if(conditions.notEmpty)
            for(var j in obj)
                if(Ext.isEmpty(obj[j]) || ["填写备注", "请选择", "选择"].isInclude(obj[j])) delete obj[j];
        return obj;
    }
})
