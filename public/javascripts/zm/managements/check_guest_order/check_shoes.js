Zm.managements.checkShoesWin = { 
    init: function(selected_id) { 

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
          fields: ["id",'shoes_id', 'types_of_shoes', 'suitable_people', 'colors', 'price', 'remark', 'photo_one','photo_two'],
          totalProperty: "totalProperty",
          baseParams: { id: selected_id },
          root: "check_shoes",
          autoLoad: true
    	});
      store.load({ params: { start: 0, limit: 20 } });
  
  	  var checkShoesGrid= new Ext.grid.GridPanel({
          id: 'checkShoesGrid',
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

      var checkShoesContextMenu = new Ext.menu.Menu({
        	items: [{
            	text: '查看详情',
            	handler: function(){
                  var selected_shoes_id = Ext.getCmp('checkShoesGrid').getSelectionModel().getSelected().data["id"];
                  var photo_one = Ext.getCmp('checkShoesGrid').getSelectionModel().getSelected().data["photo_one"];
                  var photo_two = Ext.getCmp('checkShoesGrid').getSelectionModel().getSelected().data["photo_two"];
                  Zm.managements.checkDetailsWin.init(selected_shoes_id, photo_one, photo_two).show();
            	}	
			    },{
            	text: '查看合同',
			    },{
            	text: '下载合同',	
        	}]
    	});

      	checkShoesGrid.on("rowcontextmenu", function(grid, rowIndex, e){
          	e.preventDefault();
          	grid.getSelectionModel().selectRow(rowIndex);
          	checkShoesContextMenu.showAt(e.getXY())
    	});      

      var checkShoesWin = new Ext.Window({
	    		layout: 'border',
          closeAction: 'hide',
	    		height: 527,
	    		width: 800,
	    		constrainHeader: true,
	    		resizable: false,
       	 	items: [checkShoesGrid]
    	});


      return checkShoesWin

    }

}
