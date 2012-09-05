Zm.managements.CheckFactoryOrder = { 
  init: function(){ 
            this.contextMenu = this.contextMenu();   // 设为此处Zm.managements.CheckFactoryOrder已经生成
            this.contextMenu2 = this.contextMenu2();
            Zm.pages.ViewPort = { 
            region: 'center',
            layout: 'border',
            // 引用/tree/cfoTree.js与/tree/getDate.js
            items: [ this.cfoTree.showCfoTree(), this.showCfoGrid() ]
          };
        },

//--------------------------合同管理
  showCfoGrid: function(){ 
                 var cm = new Ext.grid.ColumnModel([
                   { header: '合同号', dataIndex: 'factory_order_id' },
                   { header: '工厂', dataIndex: 'factory' },
                   { header: '总价', dataIndex: 'total_price' },
                   { header: '付款情况', dataIndex: 'payment' },
                   { header: '制作日期', dataIndex: 'production_date' },
                   { header: '备注', dataIndex: 'remark' }
                 ]);
                 var store = new Ext.data.JsonStore({
                   url: '/managements/get_cfo_grid.json',
                   fields: [ 'id','factory_order_id', 'factory', 'total_price', 'payment', 'production_date', 'remark' ],
                   root: 'cfo',
                   baseParam: { id: "null" },
                  });
                 var cfoGrid = new Ext.grid.GridPanel({ 
                   id: 'cfoGrid',
                   title: '管理层-合同管理',
                   region: 'center',
                   cm: cm,
                   store: store,
                   viewConfig: { forceFit: true },
                 });
                 return cfoGrid;
               },
//----------------------右键菜单
  contextMenu: function(){ 
                 return new Ext.menu.Menu({ 
                   defaults: { scope: this },
                   items: [{ 
                     text: '查看鞋',
                     handler: function(){ 
                       this.checkWindow( this.checkShoes() ).show();                       // 显示查看鞋的窗口
                       var obj = Ext.getCmp("cfoGrid").getSelectionModel().getSelected().data; // 取出被选中合同id
                       var store = Ext.getCmp( 'checkShoes' ).store;                       // 发送请求显示查看鞋数据
                       store.setBaseParam( "id", obj.id );
                       var myMask = this.loadingMask( "checkShoes" );
                       myMask.show();
                       store.load({ 
                         params:{  start: 0, limit: 10 },
                         callback: function(){ 
                           myMask.hide();
                         }
                       });
                       Zm.managements.CheckFactoryOrder.clickEvent.menuDetailsEvent();
                              }
                        },{ 
                     id: 'modifyPaymentsMenu',
                     text: '查看码号和数量',
                     handler: function(){ 
                       this.checkWindow( this.checkSizeNum() ).show();
                       var obj = Ext.getCmp("cfoGrid").getSelectionModel().getSelected().data;
                       var store = Ext.getCmp('checkSizeNum').store;
                       store.setBaseParam( "id", obj.id );
                       var myMask = this.loadingMask( "checkSizeNum" );
                       myMask.show()
                       store.load({ 
                         callback: function(){ 
                                     myMask.hide();
                                   }
                       });
                              }
                          },{ 
                     id: 'checkFatoryOrderMenu',
                     text: '查看合同',
                     handler: function(){ 
                       this.checkWindow( this.checkFactory() ).show();
                              }
                          },{ 
                     text: '下载合同',
                     handler: function(){ 
                       Ext.Msg.alert("对不起","此系统不支持下载！");
                          }
                            }]
                      });
                },
  contextMenu2: function(){ 
                  return new Ext.menu.Menu({ 
                    defaults: { scope: this },
                    items: [{ 
                      text: '查看详情',handler: function(){ 
                              this.detailsWindow( this.checkDetailsForm(), this.checkDetailsGrid() ).show();
                              var store = Ext.getCmp("checkDetailsGrid").store;
                              var obj = Ext.getCmp('checkShoes').getSelectionModel().getSelected().data;
                              store.setBaseParam( "id", obj.id );
                              var myMask = this.loadingMask( "checkDetailsGrid" );
                              myMask.show();
                              store.load({ callback:function(){ myMask.hide() } });
                            } 
                    },{ 
                      text: '查看订单',handler: function(){ 
                              var order_id = Ext.getCmp("checkShoes").getSelectionModel().getSelected().data.id;
                                Ext.Ajax.request({
                                  method: 'POST',
                                  url: '/managements/open_order.json',
                                  jsonData: { id: order_id },
                                  //callback: function(){ Ext.Msg.alert(notice); }
                                  success: function(){ 
                                  }
                                });
                                  this.checkWindow( this.checkOrders() ).show();
                            }
                    }],
                  });
                },
//--------------------------查看鞋
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
                  url: '/managements/get_check_shoes.json',
                  fields: ['id', 'shoes_id', 'types_of_shoes', 'suitable_people', 'colors', 'price', 'remark', 'photo_one', 'photo_two' ],
                  totalProperty: 'totalProperty', 
                  baseParams: { id: 'null' },
                  root: 'cs',
                });
                var checkShoes = new Ext.grid.GridPanel({ 
                  id: 'checkShoes',
                  title: '查看鞋',
                  cm: cm,
                  store: store,
                  viewConfig: { forceFit: true },
                  bbar: new Ext.PagingToolbar({ 
                    pageSize: 10,
                    store: store,
                    displayInfo: true,
                    displayMsg: '显示第{ 0 }条到{ 1 }条记录，一共{ 2 }条',
                    emptyMsg: '没有记录'
                  }),
                });
                store.load();
                return checkShoes;
              },
//-------------------------查看详情
  checkDetailsForm: function(){ 
                      return new Ext.form.FormPanel({ 
                        id: 'checkDetailsFrom',
                        region: 'north',
                        layout: 'form',
                        height: 250,
                        frame: true,
                        items: [{ 
                          layout: 'column',
                          items: [{ 
                            columnWidth: .5,
                            html: "<img src=\'/images/shoes/" + Ext.getCmp('checkShoes').getSelectionModel().getSelected().data.photo_one + "\' width=100% height=100% />"
                          },{ 
                            columnWidth: .5,
                            html: "<img src=\'/images/shoes/" + Ext.getCmp('checkShoes').getSelectionModel().getSelected().data.photo_two + "\' width=100% height=100% />"
                          }]
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
                    fields: [ 'region', 'material' , 'color', 'procession', 'remark' ],
                    baseParams: { id: 'null' },
                    root: 'dos'
                  });
                   return new Ext.grid.GridPanel({ 
                    id: 'checkDetailsGrid',
                    region: 'center',
                    cm: cm,
                    store: store,
                  });
                },
//--------------------------查看码号和数量
  checkSizeNum: function(){ 
                  var cm = new Ext.grid.ColumnModel([
                      { header: '鞋号', dataIndex: 'shoes_id' },
                      { header: '36', dataIndex: 'size_36' },
                      { header: '37', dataIndex: 'size_37' },
                      { header: '38', dataIndex: 'size_38' },
                      { header: '39', dataIndex: 'size_39' },
                      { header: '40', dataIndex: 'size_40' },
                      { header: '41', dataIndex: 'size_41' },
                      { header: '42', dataIndex: 'size_42' },
                      { header: '43', dataIndex: 'size_43' },
                      { header: '44', dataIndex: 'size_44' },
                     ]);
                  var store = new Ext.data.JsonStore({
                      url: '/managements/get_shoes_size_num',
                      fields: [ 'id', 'shoes_id', 'size_36', 'size_37', 'size_38', 'size_39', 'size_40', 'size_41', 'size_42', 'size_43', 'size_44' ],
                      baseParams: { id: 'null' },
                      root: 'csn',
                   });
                  return new Ext.grid.GridPanel({
                    id: 'checkSizeNum',
                    cm: cm,
                    store: store,
                    viewConfig: { forceFit: true },
                  });
                },
//--------------------------查看订单
  checkOrders: function(){ 
                 return new Ext.form.FormPanel({
                   id: 'checkOrder',
                   frame: true,
                 });
               },
//------------------------ 查看合同（将合同附件粘上）
  checkFactory: function(){ 
                  return new Ext.form.FormPanel({
                    id: 'factoryForm',
                    frame: true,
                  })
                },
//----------------------公用窗体
  checkWindow: function( checkGrid ){ 
                 return new Ext.Window({ 
                   layout: 'fit',
                   closeAction: 'close',
                   constrain: true,
                   constrainHeader: true,
                   resizable: false,
                   height: 600,
                   width: 500,
                   items: [ checkGrid ],
                 });
               },
  detailsWindow: function( checkDetailsForm, checkDetailsGrid ){ 
                   return new Ext.Window({ 
                     width: 550,
                     height: 600,
                     layout: 'border',
                     closeAction: 'close',
                     constrain: true,
                     constrainHeader: true,
                     resizable: false,
                     items: [ checkDetailsForm, checkDetailsGrid ],
                   });
                 },
  loadingMask: function( loading ){ 
                 return new Ext.LoadMask( Ext.getDom( loading ),{ 
                   msg: 'Please waiting...',
                   removeMask: true,
                 });
               },
}

