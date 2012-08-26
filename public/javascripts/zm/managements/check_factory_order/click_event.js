Zm.managements.CheckFactoryOrder.clickEvent = { 

   menuEvent: function(){ 
                 var that = Zm.managements.CheckFactoryOrder;
                 var beClick = Ext.getCmp( "cfoGrid" );
                 beClick.on('rowcontextmenu', function( beClick, rowIndex, e ){ 
                   e.preventDefault();
                   beClick.getSelectionModel().selectRow( rowIndex );
                   that.contextMenu.showAt( e.getXY() );// 使用init中的contextMenu
                 });
                 //取出显示菜单的合同记录
               },
   menuDetailsEvent: function(){ 
                       var that = Zm.managements.CheckFactoryOrder;
                       var beClick = Ext.getCmp( "checkShoes" );
                       beClick.on('rowcontextmenu', function( beClick, rowIndex, e){ 
                         e.preventDefault();
                         beClick.getSelectionModel().selectRow( rowIndex );
                         that.contextMenu2.showAt( e.getXY() );
                       });
                     },
}
