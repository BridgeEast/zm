Zm.services.excelProcessingAndPlayBoard = { 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  init: function(){ 
    //Ext.Msg.alert('hello','world');
    Zm.pages.ViewPort = {//i don't know what it readly it,shit,Zm.pages.ViewPort......
            layout: 'border',
            region:'center',
            items: [this.createEpapbGrid(),this.createEpapbTree()]
        };
  },

//+++++++++++++++++++++++++++EpapdGrid+++++++++++++++++++++++++++++++++++
 createEpapbGrid: function() {
    //Ext.Msg.alert('hello','world');


    var cm = new Ext.grid.ColumnModel([ 
            new Ext.grid.RowNumberer(),
            { header: '鞋图1', dataIndex: 'photoOne' },
            { header: '鞋图2', dataIndex: 'photoTwo' },
            { header: '鞋号', dtaIndex: 'shoesId' },
            { header: '鞋型', dataIndex: 'typesOfShoes' },
            { header: '适用人群', dataIndex: 'suitablePeople' },
            { header: '颜色', dataIndex: 'colors' },
            { header: '价格', dataIndex: 'price' },
            { header: '确定打板时间', dataIndex: 'sureBoard' },
            { header: '完成打板时间', dataIndex: 'doneBoard' },
            { header: '备注', dataIndex: 'remark' }
        ]);
        //------------------------------------------
        var store = new Ext.data.JsonStore({ 
            url: '/data_bases/get_region.json',
            fields: ['id','name', 'remark'],
            root: 'region',
            autoLoad: true
        });
        var gridTbar = new Ext.Toolbar({ 
            defaults: { scope: this  },    
            items: [
            { 
                text: '添加鞋',
                handler: function() { this.addShoes("添加鞋").show() }
            },'-',{ 
                text: '删除所选',
                handler: function() { this.deleteShoes() }
            },'-',{ 
                text: '发送至心愿单',
                handler: function() { this.sendToWishList() }
            }]
        });  


        var EpapbGrid= new Ext.grid.GridPanel({ 
            id: 'epapbGrid',
            title: '客服-Excel文件处理及打板',
            region: 'center',//+++++++++++++
            border :true,


            cm: cm,
            store: store,
            width: 400,
            height: 300,
            viewConfig: { forceFit: true },
            tbar: gridTbar
        });      
        return EpapbGrid;

  },
//++++++++++++++++++++++++++++++++addShoes:function+++++++++++++++++++++++++++++++
  addShoes: function(type){ 
    var addShoesForm = new Ext.form.FormPanel({ 
            id: 'addShoesForm',
            labelAlign: 'right',
            labelWidth: 60,
            bodyStyle: 'padding: 10px 0 0 0',
            width: 600,
            height: 80,
            frame: true,

            layout: 'column',
            items: [{ columnWidth: .33,
                      layout: 'form',
                      items: [ { id: 'addName', fieldLabel: '鞋号', xtype: 'textfield', width: 120 },
                               { id: 'xxx', fieldLabel: '鞋型', xtype: 'textfield', width: 120 }
                      ]
                    },{  columnWidth: .33,
                      layout: 'form',
                      items: [ { id: 'addRemark', fieldLabel: '适用人群', xtype: 'textfield', width: 120  },
                               { id: 'adddk', fieldLabel: '价格', xtype: 'textfield', width: 120  }
                      ]
               
                    },{  columnWidth: .34,
                      layout: 'form',
                      items: [ { id: 'addRemfefaark', fieldLabel: '颜色', xtype: 'textfield', width: 120  },
                               { id: 'addRedefmark', fieldLabel: '备注', xtype: 'textfield', width: 120  }
                      ]
                    }
                   ]          
        });

        var addGridCm = new Ext.grid.ColumnModel([ 
            new Ext.grid.RowNumberer(),
            { header: '部位', dataIndex: '' },
            { header: '材料', dataIndex: 'created_date',type: 'date' }, //这里可以不用指定type，但还是要的也好
            { header: '颜色', dataIndex: 'color' },
            { header: '加工方法', dataIndex: 'remark' },// 在下面的stroe里得到的数据，可以不按顺序就能读到这里来
        ]);

         var addGridStore = new Ext.data.JsonStore({ 
            url: '/data_bases/get_color.json',
            fields: ['id','color', 'remark','created_date'],//fields  是指读进来的字段, 应该与表的字段一样?
            root: 'color',// 这个是表名去掉s的状态？？
            autoLoad: true
        });

        var addGrid = new Ext.grid.GridPanel({ 
            id: 'addGrid ',
            title: '部位',
            region: 'center',
            height: 200,
            cm: addGridCm,
            store: addGridStore,
            viewConfig: { forceFit: true },
        });

        var addPhoto = new Ext.Panel({ 
            id: 'addPhoto',
          // title: "xx",
           // height: 100,
           // width: 100,
          layout: 'column',
          items: [{ title: 'photo1', columnWidth: .5 },
                 { title: 'photo2', columnWidth: .5 }        
                ]        
        });

        return new Ext.Window({ 
            id: 'addShoesWindow',
            title: type,
            modal: true,
            height: 600,
            width: 600,
            items: [ addShoesForm,addGrid,addPhoto],
            buttons: [{ text: 'uploadphoto',scope: this },
                      { text: 'sure',scope: this},
                      { text: 'reset',scope: this}
                  ]

        });           
   },
 
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
createEpapbTree: function() {

   var EpapbTree=new Ext.tree.TreePanel({
		//renderTo:'tree1',//这也一另一种渲染手法，你也可以在下面body里找到div
    //autoHeight:true,// 如果是这种渲染手法，就要为它加上这个属性，不然就要在div里设定div的高度
    width: 100,
    split: true,
    maxSize: 150,
    minSize: 80,
    collapsible: true,

    region: 'west',
		root:new Ext.tree.TreeNode({text:'i am root'}),
		});
    
    return EpapbTree;

 }
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++





















};
