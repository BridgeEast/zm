Ext.onReady(function(){
		var = new Ext.form.FormPanel({
	  		region:'north',
	  		layout: 'fit',
	  		frame: true,
       	labelAlign: 'left',
       	labelWidth: 100,
	  		height: 240,
	  		width: 500,
	  		items:[{
      			layout:'column',
         		items: [{
             		title: '图片1',
            		columnWidth: .5,
	      				html:"<img src=images/1-1.jpg width=100% height=100%>"
         		},{
             		title: '图片2',
             		columnWidth: .5,
	  		    		html:"<img src=images/1-2.jpg width=100% height=100%>"
          	}]
	  		}]
		});

	
		var cm = new Ext.grid.ColumnModel([
        new Ext.grid.ColumnModel(),
      	{header:'部位',dataIndex:'position'},
      	{header:'材料',dataIndex:'material'},
      	{header:'颜色',dataIndex:'color'},
      	{header:'加工方法',dataIndex:'refine'},
      	{header:'备注',dataIndex:'remark'}
    ]);

    var store = new Ext.data.JsonStore({
        url: "/managements/get_data.json",
        fields: ["a","b","c"],
        root: "data"
    });

    var sampledetailgrid = new Ext.grid.GridPanel({
    		region: 'center',
    		height: 360,
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
		
		sampledetail = new Ext.Window({
        id: 'sampledetail',
        title: '样品详细信息',
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
     	 	items: [sampledetail1,sampledetailgrid]
    });
});					 
