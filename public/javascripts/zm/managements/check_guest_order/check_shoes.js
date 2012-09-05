Zm.managements.checkShoesWin = { 
    init: function() { 

			var cm = new Ext.grid.ColumnModel([
          new Ext.grid.RowNumberer(),      
        	{header:'鞋号',dataIndex:'shoes_id'},
        	{header:'鞋型',dataIndex:'types_of_shoes'},
        	{header:'适合人群',dataIndex:'suitable_people'},
        	{header:'颜色',dataIndex:'colors'},
        	{header:'价格',dataIndex:'price'},
        	{header:'备注',dataIndex:'remark'}
    	]);

    	var store = new Ext.data.JsonStore({
          url:"/managements/check_shoes.json",
          fields: ['shoes_id', 'types_of_shoes', 'suitable_people', 'colors', 'price', 'remark'],
          totalProperty: "totalProperty",
          root: "roots",
          autoLoad: true
    	});
      store.load({ params: { start: 0, limit: 20 } });
  
  	  var guestDetailGrid= new Ext.grid.GridPanel({
		    	region: 'center',
		    	height: 491,
          width: 788,
		    	autoScroll: true,
		    	loadMask: true,
		    	stripeRows: true,
		    	frame:true,
		    	trackMouseOver : true,
		    	viewConfig:{forceFit:true},
        	store: store,
        	cm: cm, 
        	bbar: new Ext.PagingToolbar({
            	pageSize: 20,
            	store: store,
            	displayInfo: true,
            	displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
            	emptyMsg: "没有记录"
        	})
    	});

      var guestContextMenu = new Ext.menu.Menu({
       		id: 'clientorderenquirydetailContextMenu',
        	items: [{
            	text: '查看详情',
            	handler: function(){
            	}	
			},{
            	text: '查看合同',
			},{
            	text: '下载合同',	
        	}]
    	});

    	guestContextMenu.on("rowcontextmenu", function(guestDetailGrid, rowIndex, e){
        	e.preventDefault();
        	guestDetailGrid.getSelectionModel().selectRow(rowIndex);
        	guestContexMenu.showAt(e.getXY());
    	});      

      var checkShoesWin = new Ext.Window({
	    		minimizable: true,
	    		region: 'center',
	    		labelAlign: 'top',
	    		frame:true,
          closeAction: 'hide',
	    		height: 527,
	    		width: 800,
	    		constrainHeader: true,
	    		resizable: false,
       	 	items: [guestDetailGrid],
          listeners: { "show": { fn: function(){
              var idd = Ext.getCmp('guestgrid').getSelectionModel().getSelected().data["order_id"];
              store.proxy = new Ext.data.HttpProxy({
                  url: "/managements/get_guest_details.json",
                  method: "post",
                  jsonData: { idd: idd }
              });
              store.load({ params: { start: 0, limit: 20 } });
          }}}
    	});



    }

}
