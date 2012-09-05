Zm.services.update_shipment={ 
 init:function(){ 
   var shipform = new Ext.form.FormPanel({ 
       id:'shipform',
       region:'center',
       title:'修改提单情况',
       labelAlign:'right',
       labelWidth:80,
       buttonAlign:'center',
       frame:true,
       width:280,
     	items: [
       { 
          title:'修改选项',
					height: 'auto',
					xtype: 'fieldset',
					defaultType:'radio',
					hideLabels: true,
			 		layout: 'form',
					items: [{
			  	 		boxLabel: 'true',
						name: 'shipmentradio',
						inputValue: 'true',
			   	 		width: 'auto'			
					},{
			  	 		boxLabel: 'false',
						name: 'shipmentradio',
						inputValue: 'false',
						width: 'auto'	
					}]	
        	}],	
      	buttons: [{
              scope:this,
            	text: '确定',
              handler:function()
              { 
                this.dealship()
              }
        	},{ 
            	text: '重置',
              handler:function()
              { 
                
              }
        	}]		
    });

   shipfromwin = new Ext.Window({ 
     id:'shipformwin',
     layout:'border',
     closeAction:'hide',
      width:290,
      height:200,
      constrainHeader:true,
      resizable:false,
      items:[shipform]
   });

   return shipfromwin
 },

 dealship:function(){ 
   var shipvalue = Ext.getCmp('shipform').getForm().findField('shipmentradio').getGroupValue();
   if (shipvalue != null)
   { 
     Ext.Ajax.request({ 
      url:'/services/update_shipment',
      method:'post',
      jsonData:{ 
         value:shipvalue,
         id:Zm.services.guest_order_management.select_id
      },
       success:function(){ 
        Ext.getCmp('ordermanagementGrid').store.load();
        Ext.getCmp('shipformwin').close();
        Ext.Msg.alert('修改','修改成功！');
       },
       failure:function(){ 
         Ext.Msg.alert('修改','修改失败！');
       },
     })
   }
   else{ Ext.Msg.alert('请选择','你没有选择修改方式!') }
 }
}

