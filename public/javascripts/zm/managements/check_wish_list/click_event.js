Zm.managements.CheckWishList.clickEvent = { 
  menuEvent: function(){ 
               var that = Zm.managements.CheckWishList;
               var beClick = Ext.getCmp( "cwlGrid" );
               beClick.on('rowcontextmenu', function( beClick, rowIndex, e ){ 
                 e.preventDefault();
                 beClick.getSelectionModel().selectRow( rowIndex );
                 that.checkDetails().showAt( e.getXY() );
               });
             },
}
