var dailysheetenquiry;

Ext.onReady(function(){
		
    var dailysheetenquiry1 = new Ext.form.FormPanel({
        title: '工厂日报表查询',
		region: 'north',
        buttonAlign: 'center',
		labelAlign: 'right',
		layout: 'form',		
        height: 130,
        frame: true,
        items: [{
			items: [{	
				layout:'form',
            	labelAlign: 'left',
            	items: [{
			//		width: 170,	
			//		height: 90,
                	xtype: 'datefield',
               		fieldLabel: '日期',
					name: 'date',
				}]	
            }]	
        }]
    });

	
	  	var dailysheetenquiry2cm = new Ext.grid.ColumnModel([											 
			
			{header:'样品号',dataIndex:'sampleformid'},
			{header:'38',dataIndex:'thirtyeight'},
			{header:'39',dataIndex:'thirtynine'},
			{header:'40',dataIndex:'forty'},
			{header:'41',dataIndex:'fortyone'},
			{header:'42',dataIndex:'fortytwo'},
			{header:'43',dataIndex:'fortythree'},
			{header:'44',dataIndex:'fortyfour'}
		]);

    	var dailysheetenquiry2data = [
        	['MH-30','100','42','200','100'],
        	['B-24','100','39','100','50'],
        	['F-42','100','38','500','480'],
			['16MM宽','100','42','520','480'],
			['7MM','100','41','120','120'],
			['43/1*3','100','40','250','250']
    	];

    	var dailysheetenquiry2store = new Ext.data.Store({
        	proxy: new Ext.data.MemoryProxy(dailysheetenquiry2data),
        	reader: new Ext.data.ArrayReader({}, [
            	{name: 'sampleformid'},
				{name: 'thirtyeight'},
				{name: 'thritynine'},
				{name: 'forty'},
            	{name: 'fortyone'},
				{name: 'fortytwo'},
				{name: 'fortythree'},
				{name: 'fortyfour'} 								
        	])
    	});
    	dailysheetenquiry2store.load();

    	var dailysheetenquiry2grid = new Ext.grid.GridPanel({
			height: 253,
			region: 'center',
			autoScroll: true,
			loadMask: true,
			stripeRows: true,
			frame:true,
			trackMouseOver : true,
			viewConfig:{forceFit:true},
        	store: dailysheetenquiry2store,
        	cm: dailysheetenquiry2cm,
        	bbar: new Ext.PagingToolbar({
            	pageSize: 10,
            	store: dailysheetenquiry2store,
            	displayInfo: true,
            	displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
            	emptyMsg: "没有记录"
        	})			
    	});			
	
	
		dailysheetenquiry = new Ext.Window({
			minimizable: true,
			labelAlign: 'top',		
			frame:true,
        	closeAction: 'hide',
			height: 450,
			width: 400,
			defaultButton: 0,
			constrainHeader: true,
			resizable: true,
       	 	items: [dailysheetenquiry1,dailysheetenquiry2grid],
		 	buttons: [{
            	text: '确定'
        	},{
				text: '重置'
        	}]
    	});
		dailysheetenquiry.hide();

	});						 
