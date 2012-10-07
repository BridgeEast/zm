Zm.services.factoryOrder ={ 
  init: function(){ 
     Zm.pages.ViewPort ={ 
           layout: 'border',
           region: 'center',
           items: [this.treePanel(),this.gridPanel()]
          };
    },
//-----创建树
  treePanel: function(){
      var date = new Date();
      var curYear = date.getFullYear();
      var root = new Ext.tree.TreeNode({ 
              id: 'root',
              text: '全部合同'
      });

      for(var year = curYear; year > curYear-3; year--){ 
          var curMonth;
          var yearNode = new Ext.tree.TreeNode({ id: year, text: year +'' });
          year == curYear? curMonth = date.getMonth()+1: curMonth =12;
          this.createMonthNode( yearNode, curMonth );
          root.appendChild(yearNode);
      }
      
      var tree = new Ext.tree.TreePanel({ 
            id: 'tree',
            region:'west',
            autoScroll: true,
            collapsible: true,
            width: 150,
            root: root
      });

      tree.on('click',function(node){ 
          var store = Ext.getCmp('createPanel1').store;
          store.setBaseParam('id',node.id);
          store.reload();
      });
      return tree;
  },
    createMonthNode: function(yearNode,curMonth){ 
        var year = yearNode.id;
        var obj = this;
        for(var month = curMonth; month >=1; month--){ 
            monthNode = new Ext.tree.TreeNode({  id: year +'-'+ month, text: this.getMonthName(month), leaf: true})
            yearNode.appendChild(monthNode);
        }
    },
    getMonthName: function(month){
                    switch(month){
                     case 1:
                     return "一月";
                   case 2:
                     return "二月";
                   case 3:
                     return "三月";
                   case 4:
                     return "四月";
                   case 5:
                     return "五月";
                   case 6:
                     return "六月";
                   case 7:
                     return "七月";
                   case 8: 
                     return "八月";
                   case 9:
                     return "九月";
                   case 10:
                     return "十月";
                   case 11:
                     return "十一月";
                   case 12:
                     return "十二月";
                   };
    },


//------创建合同表格
  gridPanel: function(){ 
     var cm = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),
          { header: '合同号', dataIndex: 'factory_order_id' },
          { header: '工厂', dataIndex: 'factory' },
          { header: '付款情况', dataIndex: 'payment' },
          { header: '总价', dataIndex: 'total_price' },
          { header: '制作日期', dataIndex: 'production_date' },
          { header: '备注', dataIndex: 'remark' }
    
          ]);

    var store = new Ext.data.JsonStore({ 
          url: '/services/get_factory_order.json',
          fields: ['id','factory_order_id','factory','payment','total_price','production_date','remark'],
          root: 'factory_order',
          //autoLoad: true
          baseparam: { id: 'null' }
          });
  
   
    
   
    var createPanel1 = new Ext.grid.GridPanel({ 
        id: 'createPanel1',
        title: '工厂合同',
        region: 'center',
        cm: cm,
        store: store,
        viewConfig: { forceFit: true }
        });
    
  

   var contextmenu = new Ext.menu.Menu({ 
      id: 'factoryOrder',
      defaults: { scope: this },
      items: [{
          text: '查看鞋',
          handler: function(){ 
              this.checkWindow(this.checkShoes()).show();
              var obj = Ext.getCmp('createPanel1').getSelectionModel().getSelected().data;
              var store = Ext.getCmp( 'createPanel2' ).store;                       
              store.setBaseParam( "id", obj.id );
              store.load({ params:{ start: 0, limit: 10 } })
              }
         },{
          text: '查看鞋数量',
          handler: function(){  
                  this.checkWindow( this.checkShoesNumber() ).show();
                   var obj = Ext.getCmp("createPanel1").getSelectionModel().getSelected().data;
                   var store = Ext.getCmp('checkShoesNumber').store;
                   store.setBaseParam( "id", obj.id );
                   store.load()
          
          }
      },{ 
        text: '修改付款方式',
        handler: function(){ 
                 this.checkWindow2( this.modifyPayment() ).show();
                //var obj = Ext.getCmp('createPanel1').getSelectModel().getSelected().data;
                
                }
      }]
    });


     createPanel1.on("rowcontextmenu",function(grid,rowIndex,e){ 
     e.preventDefault();
     grid.getSelectionModel().selectRow(rowIndex);
     contextmenu.showAt(e.getXY())
     });
    return createPanel1;
  },
  //----创建合同表格结束

  

  //创建查看鞋表格
  checkShoes: function(){ 
      var cm= new Ext.grid.ColumnModel([
          { header: '鞋号', dataIndex: 'shoes_id' },
          { header: '鞋型', dataIndex: 'types_of_shoes' },
          { header: '适合人群', dataIndex: 'suitable_people' },
          { header: '颜色', dataIndex: 'colors' },
          { header: '价格', dataIndex: 'price' },
          { header: '备注', dataIndex: 'remark' }
          ]);

      var store = new Ext.data.JsonStore({ 
           url: '/services/get_check_shoes.json',
           fields: ['id','shoes_id','types_of_shoes','suitable_people','colors','price','remark','photo_one','photo_two'],
           totalProperty: 'totalProperty',
           baseParams: { id: 'null' },
           root: 'cs'
       
           });
        
       
       
      var createPanel2 = new Ext.grid.GridPanel({ 
          id: 'createPanel2',
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
               })
           });

      var contextmenu2 = new Ext.menu.Menu({ 
                //id: 'detailsShoes',如果用这个id会出现text重复现象
                defaults: { scope: this },
                items:[{ 
                     text: '查看鞋详情',
                     handler: function(){ 
                             this.showPhoto(this.photoForm(),this.checkDetailsOfShoes()).show(); 
                             var store = Ext.getCmp('checkDetailsOfShoes').store;
                             var obj = Ext.getCmp('createPanel2').getSelectionModel().getSelected().data;
                             store.setBaseParam( "id", obj.id );
                             store.load();

                    
                        }
                       },{ text: '查看订单' }]
       });


       
        createPanel2.on("rowcontextmenu",function(grid,rowIndex,e){ 
        e.preventDefault();
        grid.getSelectionModel().selectRow(rowIndex);
        contextmenu2.showAt(e.getXY())
       });
 
  
      return createPanel2;
  },
  //创建查看鞋表格结束

  //创建查看鞋详情表格
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
  //创建查看鞋详情表格结束

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
                          html: "<img src=\'/images/shoes/" + Ext.getCmp('createPanel2').getSelectionModel().getSelected().data.photo_one + "\' width=100% height=100% />"
                      },{
                          columnWidth: .5,
                          html: "<img src=\'/images/shoes/" + Ext.getCmp('createPanel2').getSelectionModel().getSelected().data.photo_two + "\' width=100% height=100% />"
                      }]
                }]
    });
  },
  
  //查看鞋数量
  checkShoesNumber: function() {
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
                    { header: '44', dataIndex: 'size_44' }
      ]);

      var store = new Ext.data.JsonStore({ 
               url: '/managements/get_shoes_size_num',
                      fields: [ 'id', 'shoes_id', 'size_36', 'size_37', 'size_38', 'size_39', 'size_40', 'size_41', 'size_42', 'size_43', 'size_44' ],
                      baseParams: { id: 'null' },
                      root: 'csn',
                   });
                  return new Ext.grid.GridPanel({
                    id: 'checkShoesNumber',
                    cm: cm,
                    store: store,
                    viewConfig: { forceFit: true },
                  });
     
  },

// 修改付款方式
   modifyPayment: function(){ 
          var form = new Ext.form.FormPanel({ 
                  id: 'formPanel',
                  frame: true,
                  items: [{
                          xtype: 'fieldset',
                          id: 'modifyPayment',
                          title: '选择付款方式',
                          aotoHeight: true,
                          defaultType: 'radio',
                          hideLabels: true,
                          items: [
                                  { boxLabel: '付款30%', name: 'radio', inputValue:  '1' },
                                  { boxLabel: '已付全款', name: 'radio', inputValue: '2' }
                          ]
                  }],
                  buttons: [{ text: '确定',
                              scope: this ,
                              handler: function(){  
                                     this.mps(); 
                              }
                  }] 
          });
          return form;
   },

   mps: function(){ 
        var modify_payment= Ext.getCmp('createPanel1').getSelectionModel().getSelected().data;
        var value = Ext.getCmp('formPanel').getForm().findField('radio').getGroupValue();
        if (!value) 
        { 
            Ext.Msg.alert("请选择",'你没有选择修改的方式')
        }
        else{
            var value2 =  modify_payment['payment'];     
               (value==='1')? value2="付款30%":value2="已付全款"
             modify_payment['payment'] = value2 ;
            var record = { id: modify_payment['id'], payment: modify_payment['payment']  }
            Ext.Ajax.request({ 
                url:'/services/mps.json',
                method: 'post',
                jsonData: { record: record },
                success: function(){ 
                  Ext.getCmp('createPanel1').store.reload();
                  Ext.getCmp('checkWindow2').close();
                  Ext.Msg.alert('','修改成功');
                },
                failure: function(){ Ext.Msg.alert('','修改失败'); },
            

        });
        }
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
  
  checkWindow2: function(cs2){  
              return new Ext.Window({ 
                  id: 'checkWindow2',
                  layout: 'fit',
                  closeAction: 'close',
                  constrain: true,
                  constrainHeader: true,
                  width: 259,
                  height: 160,
                  items: [cs2]
              });
  }
 
}
