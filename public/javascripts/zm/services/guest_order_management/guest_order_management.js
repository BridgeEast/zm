Zm.services.guest_order_management={ 
  init:function(){ 
    this.select_id;
      Zm.pages.ViewPort={ 
        layout:'border',
        region:'center',
        items:[{ 
           region:'north',
           title:'客服-订单管理'
        },
        this.ordermanagementGrid(),this.tree()]
      };
  },
    
   ordermanagementGrid:function(){ 
      var cm2 = new Ext.grid.ColumnModel([
          new Ext.grid.RowNumberer(),
          { header:'订单号',dataIndex:'order_id' },
          { header:'客户',dataIndex:'custom_num' },
          { header:'客户合同',dataIndex:'custom_contrast' },
          { header:'总价',dataIndex:'total_price' },
          { header:'品质',dataIndex:'quality' },
          { header:'是否出货',dataIndex:'shipment' },
          { header:'付款情况',dataIndex:'payment' },
          { header:'提单情况',dataIndex:'lading_bill' },
          { header:'制作日期',dataIndex:'production_date' },
          { header:'备注',dataIndex:'remark' }
          ]);

      orderstore = new Ext.data.JsonStore({ 
         url:'/services/get_orders.json',
         fields:['id','order_id','custom_num','custom_contrast','total_price','quality','shipment','payment','lading_bill','production_date','remark'],
            root:'orders',
            autoLoad:true
      });

      var ordermanagementGrid = new Ext.grid.GridPanel({ 
          id:'ordermanagementGrid',
          region:'center',
          height:720,
          width:1500,
          autoScroll:true,
          cm:cm2,
          store:orderstore,
          viewConfig:{ forceFit:true },
      });

      var contextmenu = new Ext.menu.Menu({ 
         items:[{ 
                  text:'查看鞋子',
                  scope:this,
                  handler:function(){ 
                   this.select_id = Ext.getCmp('ordermanagementGrid').getSelectionModel().getSelected().data["order_id"];
                  Zm.services.guest_order_detail.init().show();
                  }
                },
                {
                  text:'查看订单进度',
                  scope:this,
                  handler:function(){
                   this.select_id = Ext.getCmp('ordermanagementGrid').getSelectionModel().getSelected().data["order_id"];
                   Zm.services.speed_of_progress.init().show();
                  }
                },
                { 
                  text:'与客户交谈',
                  scope:this,
                  handler:function(){  }
                },
                { 
                  text:'修改付款情况',
                  scope:this,
                  handler:function(){
                   this.select_id = Ext.getCmp('ordermanagementGrid').getSelectionModel().getSelected().data["order_id"];
                   Zm.services.update_pay_condition.init().show();
                  }
                },
               { 
                  text:'修改品质',
                  scope:this,
                  handler:function(){ 
                   this.select_id = Ext.getCmp('ordermanagementGrid').getSelectionModel().getSelected().data["order_id"];
                   Zm.services.update_quality.init().show();
                  }
                },
                { 
                  text:'修改是否出货',
                  scope:this,
                  handler:function(){ 
                     this.select_id = Ext.getCmp('ordermanagementGrid').getSelectionModel().getSelected().data["order_id"];
                   Zm.services.update_shipment.init().show();
                  }
                },
                { 
                  text:'上传提单',
                  scope:this,
                  handler:function(){  }
                },
                { 
                  text:'打开提单',
                  scope:this,
                  handler:function(){  }
                },
                { 
                  text:'下载提单',
                  scope:this,
                  handler:function(){  }
                },
                { 
                  text:'打开客户合同',
                  scope:this,
                  handler:function(){  }
                },
                { 
                  text:'下载客户合同',
                  scope:this,
                  handler:function(){  }
                }
          ]
      });

        ordermanagementGrid.on("rowcontextmenu",function(grid,rowIndex,e){ 
           e.preventDefault();
           grid.getSelectionModel().selectRow(rowIndex);
           contextmenu.showAt(e.getXY());
        });

        return ordermanagementGrid
   },

    tree:function(){ 
       var ordertree = new Ext.tree.TreePanel({ 
         width:140,
         region:'west',
         root:orderroot,
       //  root: new Ext.tree.TreeNode({ text:'sss' }),
         autoScroll:true,
       });
    
        var orderroot = new Ext.tree.TreeNode({
         text:'全部订单',
         id:'0',
         });

       var time = new Date();
       var nowyear = time.getFullYear();
       var nowmonth = time.getMonth();
       for(var i=nowyear; i > nowyear-3; i--){ 
         var year = new Ext.tree.TreeNode({ text: i });
         orderroot.appendChild(year);
         if(i==nowyear)
          { var a = nowmonth +1 }
         else
          { a = 12 }
         for(var b=a; b > 0; b--){  
         var month = new Ext.tree.AsyncTreeNode({ text: b +'月',id:i +'_' +b,leaf:true });
         year.appendChild(month);
         }
        };
         ordertree.setRootNode(orderroot);
         ordertree.on('click',function(node){ 
           if(node.leaf){ 
           var years = node.parentNode.text.toString();
           var months =node.id.split("_")[1]
             orderstore.proxy = new Ext.data.HttpProxy({ 
               url:'/services/get_order_data.json',
               method:'post',
               jsonData:{ 
                selectorderyear:years,
                selectordermonth:months,
               }
             }),
             orderstore.reload()
               }
             })
         return ordertree 
    }
};
