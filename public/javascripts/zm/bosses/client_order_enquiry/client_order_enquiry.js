Zm.bosses.client_order_enquiry= { 
    init: function() { 
        Zm.pages.ViewPort = {
            layout: 'border',
            region:'center',
            items: [ 
                     {region:'north',layout:'fit',height:'90',title:'管理层-订单管理'},
                     {region:'west',layout:'fit', width:'180', items:[cgo_tree]},
                     {region:'center',layout:'fit', items:[this.createCheckGuestOrderGrid()]}
                   ]
        };
    },

    createCheckGuestOrderGrid: function() { 
        var cm = new Ext.grid.ColumnModel([ 
            new Ext.grid.RowNumberer(),
            { header: '订单号', dataIndex: 'order_id' },
            { header: '客户', dataIndex: 'client' },
            { header: '客户合同', dataIndex: 'contract' },
            { header: '总价', dataIndex: 'total_price' },
            { header: '品质', dataIndex: 'quality' },
            { header: '是否出货', dataIndex: 'shipment' },
            { header: '付款情况', dataIndex: 'payment' },
            { header: '提单情况', dataIndex: 'lading_bill' },
            { header: '制作日期', dataIndex: 'production_date' },
            { header: '备注', dataIndex: 'remark' },
        ]);

        var store = new Ext.data.JsonStore({ 
            url: '/bosses/get_client_order_enquiry.json',
            fields: ['id','order_id', 'client','contract','total_price','quality','shipment','payment','lading_bill','production_date','remark'],
            root: 'client_order_enquiry',
            autoLoad: true
        });

        return new Ext.grid.GridPanel({ 
            id: 'clientOrderEnquiryGrid',
            region: 'center',
            cm: cm,
            store: store,
            viewConfig: { forceFit: true },
        });                  
        
     
    },

};


   
   var root=new Ext.tree.AsyncTreeNode({   
            id:"cgo_root", text:"全部订单", expanded:true,
 	     children:[
                   {text:'2012',id:'2012_node', expanded:true,
                    children:[
                             {text:'六月',id:'jun_node',leaf:true},  
                             {text:'五月',id:'may_node',leaf:true},  
                             {text:'四月',id:'apr_node',leaf:true},  
                             {text:'三月',id:'mar_node',leaf:true},  
                             {text:'二月',id:'feb_node',leaf:true},  
                             {text:'一月',id:'jan_node',leaf:true},  
                 ]},  
                   {text:'2011',id:'2011_node',leaf:true},  
                   {text:'2010',id:'2010_node',leaf:true},  
                 ]   
       });  
         
   var cgo_tree=new Ext.tree.TreePanel({     
       
 	     id:'cgo_tree', 
            width: 210,  
            minSize: 210,  
            maxSize: 300, 
            lines:true, 
            autoScroll:true,
 	
   });  cgo_tree.setRootNode(root);       
   
   cgo_tree.on('click', function(){
   a=Ext.getCmp("clientOrderEnquiryGrid").store.data.get(2).data.total_price;
            if(a)
            {alert('jing');}
            
//     nod = new Ext.tree.TreeNode({text: "编号:", id:'id'}); 
//			root.appendChild(nod);
   });

//    var rootNode = new Ext.tree.AsyncTreeNode({
//		id : "0",
//		text : "安徽中烟餐厅菜单"
//	});
//var treeMenu = new Ext.tree.TreePanel({
//		root : rootNode,
//		frame : true,
//		animate : true, // 开启动画效果
//		enableDD : false, // 不允许子节点拖动
//		border : false, // 没有边框
//		singleClickExpand : true,
//		autoScroll : true,
//		width:200,
//		height : document.body.clientHeight,
//		loader : new Ext.tree.TreeLoader({//这个加载器异步加载，当你打开一个节点时候自动加载子节点的数据，并返回到前台
//			dataUrl : REQUEST_URL,//请求地址
//			baseParams : {
//				method : 'getViewMenuTree'//请求参数和方法
//			}
//		}),
//		listeners :{//单击事件
//			click : function(node, event){
//				// 判断当前节点是否为第一级子节点
//				if (node.id != 0) {
//					viewMenuDish(node)
//				} else {
//					return;
//				}
//			}
//		}
//	});
// var formPanelLeft = new Ext.Panel({
//		layout: 'form',
//		width:200,
//		items:[treeMenu]
//	});
