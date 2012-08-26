Ext.onReady(function() {

	var form = new Ext.form.FormPanel({
		region: 'north',
		layout: 'fit',
		frame: true,
		height: 240,
		width: 500,
		title: '样品详细信息',
		items: [{
			layout: 'column',
			items: [{
				title: '图片1',
				columnWidth: .5,

			},
			{
				title: '图片2',
				columnWidth: .5,

			}]
		}]
	});

	var cm = new Ext.grid.ColumnModel([{
		header: '部位',
		dataIndex: 'region_id'
	},
	{
		header: '材料',
		dataIndex: 'material_id'
	},
	{
		header: '颜色',
		dataIndex: 'color_id'
	},
	{
		header: '加工方法',
		dataIndex: 'procession_id'
	}]);

    var select_id = Ext.getCmp("csosGrid").getSelectionModel().getSelected().id;

    var store = new Ext.data.JsonStore({
        url: '/managements/get_details.json',
        fields: ['id','region_id', 'material_id', 'color_id', 'procession_id'],
       method: 'post',
        jsonData: { select_id: select_id } ,
        root: 'details',
        autoLoad: true
    }) ;
  /*  var data = [['面料', 'NS-34,HP-8,H-3', '深沙色，深棕色，卡其绿', ''], ['内里', 'MH-30', '卡其色', ''], ['大底', 'MH-30', '卡其色', '', '内松紧顺面色'], ['鞋垫', 'B-24', '卡其色', '']];*/

    //var store = new Ext.data.Store({
    //proxy: new Ext.data.MemoryProxy(data),
    //reader: new Ext.data.ArrayReader({},
    //[{
    //name: 'region_id'
    //},
    //{
    //name: 'material_id'
    //},
    //{
    //name: 'color_id'
    //},
    //{
    //name: 'procession_id'
    //}])
    //});

	var grid = new Ext.grid.GridPanel({
		region: 'center',
		height: 360,
		viewConfig: {
			forceFit: true
		},
		store: store,
		cm: cm,
		bbar: new Ext.PagingToolbar({
			pageSize: 10,
			store: store,
			displayInfo: true,
			diaplayMsg: '显示第{0}条到{1}条记录，一共{2}条',
			emptyMsg: "没有记录"
		})
	});
   /* store.load();*/

	check_detail = new Ext.Window({
		layout: 'border',
		closeAction: 'hide',
		height: 600,
		width: 500,
		constrainHeader: true,
		resizable: false,
		items: [form, grid]
	});

	check_detail.hide();
})

