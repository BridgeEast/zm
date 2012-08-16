
Ext.onReady(function(){
			
			var clientorderenquirydetailcm = new Ext.grid.ColumnModel([
        	{header:'鞋号',dataIndex:'sampleformid'},
        	{header:'鞋型',dataIndex:'samplestyle'},
        	{header:'适合人群',dataIndex:'matchpeople'},
        	{header:'颜色',dataIndex:'color'},
        	{header:'价格',dataIndex:'price'},
        	{header:'备注',dataIndex:'remark'}
    	]);

    	var clientorderenquirydetaildata = [
        	['1','name1','descn1'],
        	['2','name2','descn2'],
        	['3','name3','descn3'],
        	['4','name4','descn4'],
        	['5','name5','descn5']
    	];

    	var clientorderenquirydetailstore = new Ext.data.Store({
        	proxy: new Ext.data.MemoryProxy(clientorderenquirydetaildata),
        	reader: new Ext.data.ArrayReader({}, [
	           	{name: 'sampleformid'},
				{name: 'samplestyle'},
            	{name: 'matchpeople'},
            	{name: 'style'},
            	{name: 'price'},
            	{name: 'uploaddate'},
        	])
    	});
    	clientorderenquirydetailstore.load();
   
  
   	   var clientorderenquirydetailgrid = new Ext.grid.GridPanel({
			region: 'center',
			height: 570,
			autoScroll: true,
			loadMask: true,
			stripeRows: true,
			frame:true,
			trackMouseOver : true,
			viewConfig:{forceFit:true},
        	store: clientorderenquirydetailstore,
        	cm: clientorderenquirydetailcm,
        	bbar: new Ext.PagingToolbar({
            	pageSize: 10,
            	store: clientorderenquirydetailstore,
            	displayInfo: true,
            	displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
            	emptyMsg: "没有记录"
        	})
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
