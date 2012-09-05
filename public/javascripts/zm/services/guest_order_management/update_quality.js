Zm.services.update_quality={ 
 init:function(){ 
   var qualityform = new Ext.form.FormPanel({ 
       id:'qualityform',
       region:'center',
       title:'修改品质',
       labelAlign:'right',
       labelWidth:80,
       buttonAlign:'center',
       frame:true,
       width:280,
       items:[{ 
         title:'修改选项',
					height: 'auto',
					xtype: 'fieldset',
					defaultType:'radio',
					hideLabels: true,
			 		layout: 'form',
         items:[
         {
           boxLabel:'Yes',
           name:'qualityradio',
           inputValue:'Yes',
           width:'auto',
         },
         { 
           boxLabel:'No',
           name:'qualityradio',
           inputValue:'No',
           width:'auto',
         }]
       }],
      	buttons: [{
              scope:this,
            	text: '确定',
              handler:function()
              { 
                this.deal1()
              }
        	},{ 
            	text: '重置',
              handler:function()
              { 
                
              }
        	}]		
    });

   qualityfromwin = new Ext.Window({ 
     id:'qualityformwin',
     layout:'border',
     closeAction:'hide',
      width:290,
      height:200,
      constrainHeader:true,
      resizable:false,
      items:[qualityform]
   });

   return qualityfromwin
 },

 deal1:function(){ 
   var qualityvalue = Ext.getCmp('qualityform').getForm().findField('qualityradio').getGroupValue();
   if (qualityvalue != null)
   { 
     Ext.Ajax.request({ 
      url:'/services/update_quality',
      method:'post',
      jsonData:{ 
         value:qualityvalue,
         id:Zm.services.guest_order_management.select_id
      },
       success:function(){ 
        Ext.getCmp('ordermanagementGrid').store.load();
        Ext.getCmp('qualityformwin').close();
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
