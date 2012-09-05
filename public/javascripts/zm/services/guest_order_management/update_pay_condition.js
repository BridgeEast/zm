Zm.services.update_pay_condition={ 
  init:function(){ 

   	   var  payform = new Ext.form.FormPanel({
          id:'payform',
         region:'center',
         title:'修改付款情况',
        	labelAlign: 'right',
        	labelWidth: 80,
        	buttonAlign: 'center',
        	frame:true,
        	width: 280,
				items: [
       { 
          title:'修改选项',
					height: 'auto',
					xtype: 'fieldset',
					defaultType:'radio',
					hideLabels: true,
			 		layout: 'form',
					items: [{
			  	 		boxLabel: '已付全款',
						name: 'radio',
						inputValue: '已付全款',
			   	 		width: 'auto'			
					},{
			  	 		boxLabel: '已付30%',
						name: 'radio',
						inputValue: '已付30%',
						width: 'auto'	
					}]	
        	}],	
        	buttons: [{
              scope:this,
            	text: '确定',
              handler:function()
              { 
                this.deal()
              }
        	},{
            	text: '重置',
              handler:function()
              { 
                
              }
        	}]			
    	});

     payformwin = new Ext.Window({ 
       id:'payformwin',
       layout:'border',		
      closeAction: 'hide',
			width: 290,
      height:200,
			constrainHeader: true,
			resizable: false,
      items: [payform]
    });

     return payformwin
 
    },

  deal:function(){ 
         var value = Ext.getCmp('payform').getForm().findField('radio').getGroupValue();
           if(value != null)
           { Ext.Ajax.request({ 
                url:'/services/update_pay_condition',
                method:'post',
                jsonData:{ value:value,
                           id:Zm.services.guest_order_management.select_id
                 },
                success:function(){ 
                   Ext.getCmp('ordermanagementGrid').store.load();
                   Ext.getCmp('payformwin').close();
                   Ext.Msg.alert('修改','修改成功！');
                },
             failure:function(){ 
               Ext.Msg.alert('修改','修改失败！');
             },
             })
           }
           else
           {   Ext.Msg.alert("请选择",'你没有选择修改的方式') }

  }
}
