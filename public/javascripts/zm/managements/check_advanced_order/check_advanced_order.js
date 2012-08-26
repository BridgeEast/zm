Zm.managements.CheckAdvancedOrder = { 
  init: function(){ 
          Zm.pages.ViewPort = { 
            region: 'center',
            layout: 'border',
            items: [ this.showCaoTree(), this.showCaoGrid() ],
          };
        },

  showCaoTree: function(){ 
                 var advancedOrdersRoot = Zm.managements.caoOrCwlTreeNode.createTreeNode( "caoTree" );
                 var caoTree = new Ext.tree.TreePanel({ 
                   id: 'caoTree',
                   region: 'west',
                   root: advancedOrdersRoot,
                   width: 150,
                   collapsible: true,
                   autoScroll: true,
                   loader: new Ext.tree.TreeLoader(),
                 });
                 caoTree.on( "click", function( node ){ 
                   var store = Ext.getCmp('caoGrid').store;
                   store.setBaseParam( 'id',node.id );
                   store.reload();
                 });
                 return caoTree;
               },

  showCaoGrid: function(){ 
                 var cm = new Ext.grid.ColumnModel([
                   { header: '预购单号', dataIndex: 'advanced_order_id' },
                   { header: '客户', dataIndex: 'custom_num' },
                   { header: '鞋数量', dataIndex: 'number_of_shoes' },
                   { header: '总价', dataIndex: 'total_price' },
                   { header: '付款情况', dataIndex: 'payment' },
                   { header: '采购日期', dataIndex: 'advanced_order_date' },
                   { header: '备注', dataIndex: 'remark' },
                 ]);
                 var store = new Ext.data.JsonStore({ 
                   url: '/managements/get_cao_grid.json',
                   fields: ['advanced_order_id','custom_num','number_of_shoes','total_price','payment','advanced_order_date','remark'],
                   root: 'cao',
                   baseParams: { id: 'null' },
                 });
                 return new Ext.grid.GridPanel({ 
                   id: 'caoGrid',
                   title: '管理层-预购单管理',
                   region: 'center',
                   cm: cm,
                   store: store,
                   viewConfig: { forceFit: true },
                 });
               },
/*****************************右键弹出***************************************/
  contextMenu: function(){ 
                 return new Ext.menu.Menu({ 
                   defaults: { scope: this },
                   items: [{ 
                            text: '查看鞋', handler: function(){ 
                                    this.checkWindow( this.checkShoes() ).show();
                                    Zm.managements.CheckAdvancedOrder.clickEvent.menuDetailsEvent();
                                    var store = Ext.getCmp( "checkShoes" ).store;
                                    var obj = Ext.getCmp("caoGrid").getSelectionModel().getSelected().data;
                                    store.setBaseParam( "id",obj.id );
                                    store.load( { params: { start: 0, limit: 10 } } );
                                  }
                          },{ 
                            text: '查看预购单进度', handler: function(){ 
                                    this.checkWindow( this.checkAdvancedOrderSchedule() ).show();
                                  }
                          }],
                 });
               },
  contextMenu2: function(){ 
                  return new Ext.menu.Menu({ 
                    defaults: { scope: this },
                    items: [{ 
                      text: '查看详情',handler: function(){ 
                              this.detailsWindow( this.checkDetailsForm(), this.checkDetailsGrid() ).show();
                            }
                    }],
                  });
                },
// 查看鞋
  checkShoes: function(){ 
                var cm = new Ext.grid.ColumnModel([ 
                  { header: '鞋号', dataIndex: 'shoes_id' },
                  { header: '鞋型', dataIndex: 'types_of_shoes' },
                  { header: '适合人群', dataIndex: 'suitable_people' },
                  { header: '颜色', dataIndex: 'colors' },
                  { header: '价格', dataIndex: 'price' },
                  { header: '备注', dataIndex: 'remark' },
                ]);
                var store = new Ext.data.JsonStore({
                  url: '/managements/get_general_shoes.json',
                  fields: ['shoes_id','types_of_shoes','suitable_people','colors','price','remark'],
                  totalProperty: 'totalProperty',
                  root: 'cs',
                 });
                return new Ext.grid.GridPanel({
                  id: 'checkShoes',
                  region: 'center',
                  cm: cm,
                  store: store,
                  viewConfig: { forceFit: true },
                });
              },
// 查看预购单进度
  checkAdvancedOrderSchedule: function(){ 
                                var cm = new Ext.grid.ColumnModel([ 
                                    { header: '鞋号', dataIndex: 'shoes_id' },
                                    { header: '', dataIndex: '' },
                                    { header: '', dataIndex: '' },
                                    { header: '', dataIndex: '' },
                                    { header: '', dataIndex: '' },
                                ]);
                                var store = new Ext.data.JsonStore({ 
                                  //url: '',
                                  //fields: [],
                                  //root: '',
                                  autoLoad: true,
                                });
                                return new Ext.grid.GridPanel({ 
                                  id: 'checkAdvancedOrderSchedule',
                                  region: 'center',
                                  cm: cm,
                                  store: store,
                                  viewConfig: { forceFit: true },
                                });
                              },
// 查看详情（图片）
  checkDetailsForm: function(){ 
                      return new Ext.form.FormPanel({
                        id: 'checkDetailsForm',
                        labelAlign: 'right',
                        region: 'north',
                        labelWidth: 60,
                        width: 500,
                        height: 300,
                        frame: true,
                      });
                    },
// 查看详情（表格）
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
/****************************窗体*************************************/
  checkWindow: function( checkGrid ){ 
                 return new Ext.Window({ 
                   layout: 'border',
                   width: 500,
                   height: 600,
                   constrain: true,
                   resizable: false,
                   items: [ checkGrid ],
                 });
               },
  detailsWindow: function( checkDetailsForm, checkDetailsGrid ){ 
                   return new Ext.Window({ 
                     width: 500,
                     height: 600,
                     layout: 'border',
                     constrain: true,
                     resizable: false,
                     items: [ checkDetailsForm, checkDetailsGrid ],
                   });
                 },
}
