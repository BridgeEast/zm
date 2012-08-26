
Ext.onReady(function(){
			
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
          url:"/managements/get_detail.json",
          fields: ['shoes_id', 'types_of_shoes', 'suitable_people', 'colors', 'price', 'remark'],
          root: "guest_detail",
          autoLoad: true
    	});
  
  	  var clientorderenquirydetailgrid = new Ext.grid.GridPanel({
		    	region: 'center',
		    	height: 570,
		    	autoScroll: true,
		    	loadMask: true,
		    	stripeRows: true,
		    	frame:true,
		    	trackMouseOver : true,
		    	viewConfig:{forceFit:true},
        	store: store,
        	cm: cm, 
        	bbar: new Ext.PagingToolbar({
            	pageSize: 10,
            	store: store,
            	displayInfo: true,
            	displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
            	emptyMsg: "没有记录"
        	})
    	});

      var clientorderenquirydetailcontextmenu = new Ext.menu.Menu({
       		id: 'clientorderenquirydetailContextMenu',
        	items: [{
            	text: '查看详情',
            	handler: function(){
				    	sampledetail.show();
            	}	
			},{
            	text: '查看合同',
			},{
            	text: '下载合同',	handler: function(){ Ext.Msg.alert('Hello','Jing'); }
        	}]
    	});

    	clientorderenquirydetailgrid.on("rowcontextmenu", function(clientorderenquirydetailgrid, rowIndex, e){
        	e.preventDefault();
        	clientorderenquirydetailgrid.getSelectionModel().selectRow(rowIndex);
        	clientorderenquirydetailcontextmenu.showAt(e.getXY());
    	});      

      clientorderenquirydetail = new Ext.Window({
			minimizable: true,
			region: 'center',
			labelAlign: 'top',
			frame:true,
        	closeAction: 'hide',
			height: 600,
			width: 500,
			defaultButton: 0,
			constrainHeader: true,
			resizable: false,
       	 	items: [clientorderenquirydetailgrid]
    	});
	    clientorderenquirydetail.hide();
	});					 
