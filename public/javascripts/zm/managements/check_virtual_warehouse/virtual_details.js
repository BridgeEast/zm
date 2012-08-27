Ext.onReady(function(){
    var detailsForm = new Ext.form.FormPanel({
        id: "detailsform",
        width: 500,
        height: 240,
	  		region:'north',
	  		layout: 'fit',
	  		frame: true,
       	labelAlign: 'left',
       	labelWidth: 100,
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
        new Ext.grid.RowNumberer(),
        { header: "aaa", dataIndex: "aaa"}
    ]);

    var store = new Ext.data.JsonStore({
        url: "/managements/get_data.json",
        fields: ["aaa","bbb"],
        root: "data"
    });

    var detailsGrid = new Ext.grid.GridPanel({
        id: "detailsgrid",
    		region: 'center',
    		height: 360,
    		autoScroll: true,
    		loadMask: true,
    		stripeRows: true,
    		frame:true,
    		trackMouseOver : true,
    		viewConfig:{forceFit:true},
        cm: cm,
        store: store,
    		bbar: new Ext.PagingToolbar({
           	pageSize: 10,
      			store: store,
          	displayInfo: true,
          	displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
          	emptyMsg: "没有记录"
       	})
        
    });

    detailsWindow = new Ext.Window({
        id: "detailswindow",
        title: "样品详细信息",
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
        items: [detailsForm, detailsGrid],
    })
});
