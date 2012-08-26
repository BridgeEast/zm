Zm.managements.CheckAdvancedOrder.clickEvent = {  
  menuEvent: function(){ 
               var that = Zm.managements.CheckAdvancedOrder;
               var beClick = Ext.getCmp( "caoGrid" );

               beClick.on( 'rowcontextmenu', function( beClick, rowIndex, e ){ 
                 e.preventDefault();
                 beClick.getSelectionModel().selectRow( rowIndex );
                 that.contextMenu().showAt( e.getXY() );
                 
               });
             },
  menuDetailsEvent: function(){ 
                      var that = Zm.managements.CheckAdvancedOrder;
                      var beClick = Ext.getCmp( "checkShoes" );
                      beClick.on( 'rowcontextmenu', function( beClick,rowIndex,e ){ 
                          var that = Zm.managements.CheckAdvancedOrder;
                          e.preventDefault();
                          beClick.getSelectionModel().selectRow( rowIndex );
                          that.contextMenu2().showAt( e.getXY() );
                      });
                    },
}

