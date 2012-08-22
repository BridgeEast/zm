var mouthdispatchlistenquiry;

Ext.onReady(function(){
		
    var mouthdispatchlistenquiry1 = new Ext.form.FormPanel({
        title: '工厂月报表查询',
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
                	xtype: 'combo',
               		fieldLabel: '选择月份',
					name: 'combo',
                    store: new Ext.data.SimpleStore({
                        fields: ['value', 'text'],
                        data: [
                            ['value1', '一月'],
                            ['value2', '二月'],
							['value3', '三月'],
                            ['value4', '四月'],
							['value5', '五月'],
                            ['value6', '六月'],
							['value7', '七月'],
                            ['value8', '八月'],
							['value9', '九月'],
                            ['value10', '十月'],
							['value11', '十一月'],
                            ['value12', '十二月'],
                        ]
                    }),
                    displayField: 'text',
                    valueField: 'value',
                    mode: 'local',
                    emptyText:'请选择'					
				}]	
            }]	
        }]
    });

	
	  	var mouthdispatchlistenquiry2cm = new Ext.grid.ColumnModel([											 
			
			{header:'样品号',dataIndex:'sampleformid'},
			{header:'38',dataIndex:'thirtyeight'},
			{header:'39',dataIndex:'thirtynine'},
			{header:'40',dataIndex:'forty'},
			{header:'41',dataIndex:'fortyone'},
			{header:'42',dataIndex:'fortytwo'},
			{header:'43',dataIndex:'fortythree'},
			{header:'44',dataIndex:'fortyfour'}
		]);

    	var mouthdispatchlistenquiry2data = [
        	['MH-30','100','42','200','100'],
        	['B-24','100','39','100','50'],
        	['F-42','100','38','500','480'],
			['16MM宽','100','42','520','480'],
			['7MM','100','41','120','120'],
			['43/1*3','100','40','250','250']
    	];

    	var mouthdispatchlistenquiry2store = new Ext.data.Store({
        	proxy: new Ext.data.MemoryProxy(mouthdispatchlistenquiry2data),
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
    	mouthdispatchlistenquiry2store.load();

    	var mouthdispatchlistenquiry2grid = new Ext.grid.GridPanel({
			height: 253,
			region: 'center',
			autoScroll: true,
			loadMask: true,
			stripeRows: true,
			frame:true,
			trackMouseOver : true,
			viewConfig:{forceFit:true},
        	store: mouthdispatchlistenquiry2store,
        	cm: mouthdispatchlistenquiry2cm,
        	bbar: new Ext.PagingToolbar({
            	pageSize: 10,
            	store: mouthdispatchlistenquiry2store,
            	displayInfo: true,
            	displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
            	emptyMsg: "没有记录"
        	})			
    	});			
	
	
		mouthdispatchlistenquiry = new Ext.Window({
			minimizable: true,
			labelAlign: 'top',		
			frame:true,
        	closeAction: 'hide',
			height: 450,
			width: 400,
			defaultButton: 0,
			constrainHeader: true,
			resizable: true,
       	 	items: [mouthdispatchlistenquiry1,mouthdispatchlistenquiry2grid],
		 	buttons: [{
            	text: '确定'
        	},{
      				text: '重置', handler: function(){ 
                  mouthdispatchlistenquiry1.form.reset();
                  mouthdispatchlistenquiry2store.removeAll();
              }
        	}]
    	});
		mouthdispatchlistenquiry.hide();

	});						 
