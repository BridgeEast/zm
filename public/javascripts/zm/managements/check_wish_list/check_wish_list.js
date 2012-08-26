Zm.managements.CheckWishList = { 
  init: function(){ 
          Zm.pages.ViewPort = { 
          region: 'center',
          layout: 'border',
          items: [ this.showCwlTree(), this.showCwlGrid() ],
        };
  },

  showCwlTree: function(){ 
                   var wishListsRoot = Zm.managements.caoOrCwlTreeNode.createTreeNode( "cwlTree" );
                   cwlTree = new Ext.tree.TreePanel({ 
                     id: 'cwlTree',
                     region: 'west',
                     width: 150,
                     collapsible: true,
                     autoScroll: true,
                     root: wishListsRoot,
                     loader: new Ext.tree.TreeLoader(),
                   });
                   cwlTree.on( 'click', function( node ){ 
                     var store = Ext.getCmp('cwlGrid').store;
                     store.setBaseParam( "id", node.id );
                     store.reload();
                   });
                   return cwlTree;
                 },

  showCwlGrid: function(){ 
                   var sm = new Ext.grid.CheckboxSelectionModel({ handleMouseDown: Ext.emptyFn });
                   var cm = new Ext.grid.ColumnModel([ 
                     sm,
                     { header: '鞋图1', dataIndex: 'photo_one' ,renderer: title_img },
                     { header: '鞋图2', dataIndex: 'photo_two' ,renderer: title_img },
                     { header: '客户', dataIndex: 'custom_num' },
                     { header: '鞋号', dataIndex: 'shoes_id' },
                     { header: '鞋型', dataIndex: 'types_of_shoes' },
                     { header: '使用人群', dataIndex: 'suitable_people' },
                     { header: '颜色', dataIndex: 'colors' },
                     { header: '价格', dataIndex: 'price' },
                     { header: '确定打板时间', dataIndex: 'sure_board' },
                     { header: '完成打板时间', dataIndex: 'done_board' },
                     { header: '谈话', dataIndex: 'communication' },
                     { header: '备注', dataIndex: 'remark' }
                   ]);
                   var store = new Ext.data.JsonStore({ 
                     url: '/managements/get_cwl_grid.json',
                     fields:[ 'id','photo_one','photo_two','custom_num','shoes_id',
                              'types_of_shoes','suitable_people','colors','price',
                              'sure_board','done_board','communication','remark'],
                     root: 'cwl',
                     baseParams: { id: 'null' },
                   });
                   return new Ext.grid.GridPanel({
                     id: 'cwlGrid',
                     title: '管理层-查看客户心愿单',
                     region: 'center',
                     cm: cm,
                     store: store,
                     viewConfig: { forceFit: true },
                   });
                 },

  checkDetails: function(){ 
                  return new Ext.menu.Menu({ 
                    defaults:{ scope: this },
                    items: [
                      { text: '查看详情',
                        handler: function(){ 
                                   var the_shoes_id = Ext.getCmp('cwlGrid').getSelectionModel().getSelected().data.id;
                                   this.cwlWindow( this.checkDetailsForm(), this.checkDetailsGrid() ).show();
                                   var store = Ext.getCmp('checkDetailsGrid').store;
                                   store.setBaseParam('id', the_shoes_id );
                                   store.reload();
                                 } }
                    ]
                  });
                },

  checkDetailsForm: function(){ 
                  return new Ext.form.FormPanel({
                    id: 'checkDetailsForm',
                    region: 'north',
                    labelAlign: 'right',
                    labelWidth: 60,
                    width: 500,
                    height: 300,
                    frame: true,
                    layout: 'form',
                    resizable: true,
                    items: [{ 
                      layout: 'column',
                      items:[{ 
                        columnWidth: .5,
                        html: '<img src=\'/images/' + Ext.getCmp('cwlGrid').getSelectionModel().getSelected().data.photo_one + '\' width=100% height=100%>'
                      },{ 
                        columnWidth: .5,
                        html: '<img src=\'/images/' + Ext.getCmp('cwlGrid').getSelectionModel().getSelected().data.photo_two + '\' width=100% height=100%>'
                      }],
                    }],
                  });
                },
  checkDetailsGrid: function(){ 
                      var cm = new Ext.grid.ColumnModel([ 
                        { header: '部位', dataIndex: 'region' },
                        { header: '材料', dataIndex: 'material' },
                        { header: '颜色', dataIndex: 'color' },
                        { header: '加工方法', dataIndex: 'procession' },
                        { header: '备注', dataIndex: 'remark' },
                      ]);
                      var store = new Ext.data.JsonStore({ 
                        url: '/managements/get_details_of_shoes.json',
                        fields: ['region','material','color','procession','remark'],
                        baseParams: { id: 'null' },
                        root: 'dos',
                      });
                      return new Ext.grid.GridPanel({ 
                        id: 'checkDetailsGrid',
                        region: 'center',
                        cm: cm,
                        store: store,
                        viewConfig: { forceFit: true },
                      });
                    },

  cwlWindow: function( checkDetailsForm, checkDetailsGrid ){ 
               return new Ext.Window({ 
                 id: 'cwlWindow',
                 layout: 'border',
                 width: 500,
                 height: 600,
                 constrain: true,
                 items: [ checkDetailsForm, checkDetailsGrid ],
               });
             },

}
