Zm.services.virtulWarehouesManagent={ 
    init: function(){ 
        Zm.pages.ViewPort ={
            layout: 'border',
            region: 'center',
            items: [this.gridPanel(),this.treePanel()]
        };
    },

    gridPanel: function(){ 
        var sm = new Ext.grid.CheckboxSelectionModel();
        var cm = new Ext.grid.ColumnModel([
            new Ext.grid.RowNumberer(),
            sm,
            { header: '鞋图1', dataIndex: 'photo_one', renderer: title_img },
            { header: '鞋图2', dataIndex: 'photo_two', renderer: title_img },
            { header: '鞋号', dataIndex: 'shoes_id', sortable: true },
            { header: '鞋型', dataIndex: 'types_of_shoes' },
            { header: '适合人群', dataIndex: 'suitable_people' },
            { header: '颜色', dataIndex: 'colors' },
            { header: '上传日期', dataIndex: 'production_date' }
        ]);

        var store = new Ext.data.JsonStore({ 
            url: '/services/get_virtual_warehouse_management.json',
            fields: ['id','photo_one', 'photo_two', 'shoes_id', 'types_of_shoes', 'suitable_people', 'colors',  'production_date'],
            root: 'virtual_wm'
            //autoLoad: true
        });

        var createPanel = new Ext.grid.GridPanel({ 
            id: 'createPanel',
            title: '客服-虚拟仓库',
            region: 'center',
            cm: cm,
            sm: sm,
            store: store,
            viewConfig: { forceFit: true },
            tbar: new Ext.Toolbar({ defaults: { scope: this },
                                   items: ['-',
                                  { text: '工厂日报表', handler: function(){ Zm.services.factory_daily_sheet.init().show(); } },
                                  '-',
                                  { text: '日报表查询', handler: function(){  dailySheetWindow.show(); } },
                                  '-' ,
                                  { text: '月报表查询', handler: function(){ monthSheetWindow.show(); } },
                                  '-' ,
                                  { text: '删除所选', handler: function(){ this.checkWindow2(this.delete_shoes()).show(); } },
                                  '-',
                                  { text: '日发货单', handler: function(){ dailyDispatchWindow.show(); } },
                                  '-' ,
                                  { text: '月发货单', handler: function(){ monthDispatchWindow.show(); } },
                                  '-']})
        });
        
        var contextmenu = new Ext.menu.Menu({ 
            id: 'cmenu',
            defaults: { scope: this },
            items: [{
                     text: '查看鞋',
                     handler: function(){ 
                                      this.showPhoto(this.photoForm(),this.checkDetailsOfShoes()).show();
                                      var store = Ext.getCmp('checkDetailsOfShoes').store;
                                      var obj = Ext.getCmp('createPanel').getSelectionModel().getSelected().data;
                                      store.setBaseParam( "id", obj.id );
                                      console.log('ss',obj.id);
                                      store.load();
                     }
                   },{ text: '查看码号/数量',
                       handler: function(){ 
                                     this.checkWindow(this.checkAll()).show(); 
                                     var store = Ext.getCmp('grid').store;
                                     var obj = Ext.getCmp('createPanel').getSelectionModel().getSelected().data;
                                     store.setBaseParam( "id", obj.id );
                                     console.log('ss',obj.id); 
                       }
                   },
                   { text: '与客户交流',
                     handler: function(){ return Ext.Msg.alert('提示','暂不支持该功能'); }
                   }
            ]
        });

       createPanel.on("rowcontextmenu",function(grid,rowIndex,e){ 
           e.preventDefault();
           grid.getSelectionModel().selectRow(rowIndex);
           contextmenu.showAt(e.getXY())
     });

        return createPanel;
    },

   checkWindow: function( cs ){ 
                   return new Ext.Window({ 
                   id: 'checkWindow',
                   layout: 'fit',
                   closeAction: 'close',
                   constrain: true,
                   constrainHeader: true,
                   height: 600,
                   width: 500,
                   items: [ cs ],
                 });
               },
 
  checkWindow2: function(cs){ 
                  return new Ext.Window({ 
                   id: 'checkWindow2',
                   layout: 'fit',
                   closeAction: 'close',
                   constrain: true,
                   constrainHeader: true,
                   height: 500,
                   width: 1000,
                   items: [ cs ],
                 });
  },

   photoForm: function(){ 
       return new Ext.form.FormPanel({ 
                id: 'photoForm',
                region: 'north',
                layout: 'form',
                height: 250,
                frame: true,
                items: [{ 
                      layout: 'column',
                      items: [{
                          columnWidth: .5,
                          html: "<img src=\'/images/shoes/" + Ext.getCmp('createPanel').getSelectionModel().getSelected().data.photo_one + "\' width=100% height=100% />"
                      },{
                          columnWidth: .5,
                          html: "<img src=\'/images/shoes/" + Ext.getCmp('createPanel').getSelectionModel().getSelected().data.photo_two + "\' width=100% height=100% />"
                      }]
                }]
    });
  },

   showPhoto: function(pf,cds){ 
               return new Ext.Window({ 
                  width: 550,
                  height: 600,
                  layout: 'border',
                  closeAction: 'close',
                  constrain: true,
                  constrainHeader: true,
                  resizable: false,
                  items: [pf,cds]
               });
    },

    delete_shoes: function(){ 
              var selection = Ext.getCmp('createPanel').getSelectionModel();
		     if (selection.getSelected()) {
			          Ext.Ajax.request({
				           url: '/services/delete_shoes_and_detail_of_shoes.json',
				           method: 'post',
				           jsonData: {
				           id: selection.getSelected().id,

				 },
				   success: function() {
					    Ext.getCmp('createPanel').store.load();
					    Ext.Msg.alert('删除', '删除成功!');
				},
				  failure: function() {
					  Ext.Msg.alert('删除', '删除失败!');
				},
			})
		} else {
          	Ext.Msg.alert('警告', '请选择一条记录');
		}  
    },
  

  checkDetailsOfShoes: function(){ 
          var cm = new Ext.grid.ColumnModel([
                      { header: '部位', dataIndex: 'region' },
                      { header: '材料', dataIndex: 'material' },
                      { header: '颜色', dataIndex: 'color' },
                      { header: '加工方法', dataIndex: 'procession' },
                      { header: '备注', dataIndex: 'remark' },
                  ]);
          var store = new Ext.data.JsonStore({
                    url: '/services/get_details_of_shoes.json',
                    fields: [ 'region', 'material' , 'color', 'procession', 'remark' ],
                    baseParams: { id: 'null' },
                    root: 'dos'
                  });

         return new Ext.grid.GridPanel({ 
                    id: 'checkDetailsOfShoes',
                    cm: cm,
                    store: store, 
                    region: 'center'
                   });

 
  },

   checkAll: function(){ 
        var cm = new Ext.grid.ColumnModel([ 
           // { header: '鞋号', dataIndex: 'general_shoe_id' },
            { header: '码号', dataIndex: 'size' },
            { header: '需要数量', dataIndex: 'necessary_num' },
            { header: '已完成数量', dataIndex: 'finished_num' },
            { header: '仓库剩余数量',dataIndex: 'store_remaining' }
        ]);

        var store = new Ext.data.JsonStore({ 
            url: '/services/get_all.json',
            fields: ['id','size','necessary_num','finished_num','store_remaining'],
            root: 'ga',
            autoLoad: true
        });

        var grid = new Ext.grid.GridPanel({ 
            id: 'grid',
            cm: cm,
            store: store,
            viewConfig: { forceFit: true }
        });

        return grid;
   },  

 
   
 treePanel: function(){ 

      var root = new Ext.tree.AsyncTreeNode({ 
              id: 'root',
              text: '全部合同'
      });
       
      var loader = new Ext.tree.TreeLoader({
			       dataUrl: '/services/get_treenode.json'
		  });

    

       var tree = new Ext.tree.TreePanel({ 
            id: 'tree',
            region:'west',
            autoScroll: true,
            collapsible: true,
            width: 150,
            root: root,
            loader: loader
      });
     
	tree.on('click', function(node) {
  //var years = node.parentNode.parentNode.id;
  //var months = node.parentNode.id ;
  var ids = node.id;
			var store = Ext.getCmp('createPanel').store;
     
			store.setBaseParam('id',ids);
      //store.setBaseParam('year',years);
      //store.setBaseParam('month',months);
     
		/* store.proxy = new Ext.data.HttpProxy({ 
               url:'/services/get_virtual_warehouse_management.json',
               method:'post',
               jsonData:{ 
                year:years,
                month:months,
                id:ids
               }
             }),*/
    store.reload();
		})

       return  tree;
 },
 



}
