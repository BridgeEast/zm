Zm.managements.CheckFactoryOrder.cfoTree = { 
  showCfoTree: function(){ 
                           var date = new Date();
                           var curYear = date.getFullYear(); //当前年份
                           var factoryOrdersRoot = new Ext.tree.TreeNode({ 
                               id: 'factoryOrdersRoot',
                               text: '全部合同',
                           });
                           // 年份循环直到当前年份
                           for( var year = curYear; year > curYear-3; year-- ){ 
                             var curMonth;
                             var yearNode = new Ext.tree.TreeNode({ id: year, text: year + ''});
                             year == curYear?  curMonth = date.getMonth() + 1: curMonth = 12; // 年份所对应的月份数
                             this.createMonthNode( yearNode, curMonth );                      // 每个年份增加所有的月份
                             factoryOrdersRoot.appendChild( yearNode );
                           }
                           
                           var cfoTree = new Ext.tree.TreePanel({ 
                             id: 'cfoTree',
                             region: 'west',
                             autoScroll: true,
                             collapsible: true, 
                             width: 150,
                             root: factoryOrdersRoot,
                           });

                           cfoTree.on( 'click', function(node){ 
                             var store = Ext.getCmp('cfoGrid').store;
                             store.setBaseParam( "id",node.id ); // 传入月份节点的id给controller判断
                             store.reload();
                           });

                           return cfoTree;
                         },

  createMonthNode: function( yearNode, curMonth ){ 
                     // yearNode 年份的参数，curMonth年份所对应的月份数
                     var year = yearNode.id;
                     // 每年所对应的月份
                     var obj = this;
                     for( var month = 1; month <= curMonth; month++ ){ 
                       monthNode = new Ext.tree.TreeNode({ id: year + '-' + month, text: Zm.getDate.getMonthName( month ), leaf: true })
                       yearNode.appendChild( monthNode );
                     }
                   },
}
