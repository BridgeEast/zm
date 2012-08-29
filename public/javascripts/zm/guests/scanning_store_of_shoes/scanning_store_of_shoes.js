 Zm.guests.scanning_store_of_shoes={
  init:function(){ 
     this.select_id;
    Zm.pages.ViewPort={ 
      layout:'border',
      region:'center',
      items:[{
				region: 'north',
				title: '客户-浏览鞋库'
			},
      this.scanningsamplesGrid(),this.tree()]
    };
  },

   scanningsamplesGrid:function(){ 
    var scanningsamplesm = new Ext.grid.CheckboxSelectionModel();
      var cm1=new Ext.grid.ColumnModel([
          new Ext.grid.RowNumberer(),
       
         	{header:'鞋图1',dataIndex:'photo_one'},
         	{header:'鞋图2',dataIndex:'photo_two'},
           { header:'鞋号',dataIndex:'shoes_id'},
           { header:'鞋型',dataIndex:'types_of_shoes'},
           { header:'适用人群',dataIndex:'suitable_people'},
           { header:'颜色',dataIndex:'colors'},
           { header:'价格',dataIndex:'price'},
           { header:'制作日期',dataIndex:'production_date'},
           { header:'备注',dataIndex:'remark' },
           ]);
   
        store=new Ext.data.JsonStore({ 
         url:'/guests/get_general_shoes.json',
         fields:['id','photo_one','photo_two','shoes_id','types_of_shoes','suitable_people','colors','price','production_date','remark'],
         root:'general_shoes',
         autoLoad:true
       });

       var scanningGrid = new Ext.grid.GridPanel({ 
             id:'scanningGrid',
             region:'center',
             height:720,
              width:1500,
             autoScroll:true,
             cm:cm1,
             store:store,
             viewConfig:{ forceFit: true },
             tbar:this.gridTbar1()
       });

       	var contextmenu = new Ext.menu.Menu({
			     items: [{
				   id: 'selectDetails',
				   text: '查看详情',
           scope:this,
			    	handler: function() {
					 this.select_id = Ext.getCmp('scanningGrid').getSelectionModel().getSelected().data["id"];
                   Zm.guests.check_detail.init().show();
				}
			}]
		});
         
         scanningGrid.on("rowcontextmenu",function(grid,rowIndex,e){ 
           e.preventDefault();
           grid.getSelectionModel().selectRow(rowIndex);
           contextmenu.showAt(e.getXY());
         });

         return scanningGrid
   },
        
   gridTbar1:function(){ 
      return new Ext.Toolbar({ 
           defaults:{ 
              scope:this
           },
            items:[{ 
                text:'添加到开发版',
                handler:function(){ this.adddevelopment() },
            }]
      });
   },

   adddevelopment:function(){ 
           var record={ 
             id:Ext.getCmp('scanningGrid').getSelectionModel().getSelected().data["id"],
           };
            Ext.Ajax.request({ 
              JsonData:{ record: record },
                 url:'/guests/change_board_kind.json',
                 mehtod:'post',
                 //jsonData:{ record:record },
                 success:function(){ 
                 Ext.getCmp('scanningGrid').store.load();
                 Ext.Msg.alert('添加','添加成功！');
                 },
                 failure:function(){ 
                 Ext.Msg.alert('添加','添加失败！');
                 },
                 });
           },

   tree:function(){ 
     var loader=new Ext.tree.TreeLoader({
       dataUrl:'/guests/load_tree.json'
     });

       var root = new Ext.tree.AsyncTreeNode({
         text:'全部鞋',
         id:'0',
         draggable:false,
       //  iconCls:"nodeicon",
         });
     
     var scanningtree= new Ext.tree.TreePanel({ 
       // el:"tree1",
        split:true,
        width:140,
        region:'west',
        loader:loader,
        root:root,
        rootVisible:true , 
        autoScroll:true,    
        enableDD:false, 
        containerScroll: true 
     });

     scanningtree.on('click',function(node){ 
       if(node.leaf){
      var year=node.parentNode.parentNode.text;
      var months=node.parentNode.text.split("");
      var month=months[0]
       	store.proxy = new Ext.data.HttpProxy({
        url:'/guests/get_data.json',
       method:'post',
       jsonData:{ 
        selectYear:year,
        selectMonth:month,
        selectType:node.text
       }
      }),
       store.load()
   }
 })
    
 return scanningtree
     }
};
