Zm.managements.caoOrCwlTreeNode = { 
  // 创建树根并返回
  createTreeNode: function( caoOrCwl ){ 
                    var rootText;
                    // 判断是预购单或心愿单的树根
                    caoOrCwl == "caoTree"? rootText = "全部预购单": rootText = "全部心愿单";
                    var root = new Ext.tree.TreeNode({ text: rootText });
                    this.createYearNode( root, caoOrCwl );
                    return root;
                  },
  // 创建年份节点
  createYearNode: function( root, caoOrCwl ){ 
                    var date = new Date();
                    var curYear = date.getFullYear();
                    var curMonth;
                    // 从2010年增加年份直至当前年份
                    for( var year = curYear; year > curYear-3; year-- ){ 
                      var curMonth;
                      var yearNode = new Ext.tree.TreeNode({ text: year + '', id: year });
                      year == curYear? curMonth = date.getMonth() + 1: curMonth = 12;
                      this.createMonthNode( yearNode, curMonth, caoOrCwl );
                      root.appendChild( yearNode );
                    }
                  },
  // 创建月份节点
  createMonthNode: function( yearNode, curMonth, caoOrCwl ){ 
                     // yearNode 年份的参数，curMonth年份所对应的月份数Model  不用s
                     var year = yearNode.id;
                     var monthNode;
                     // 每年所对应的总月份
                     for( var month = curMonth; month >= 1; month-- ){ 
                       monthNode = new Ext.tree.TreeNode({ id: year + '-' + month, text: Zm.getDate.getMonthName( month ) });
                       this.createOrderNode( monthNode, caoOrCwl );        // 将心愿单或预购单储存下创建两个节点
                       yearNode.appendChild( monthNode );
                     }
                   },
  // 根据需要实现预购单或心愿单节点
  createOrderNode: function( monthNode, caoOrCwl ){ 
                     var text1, text2;
                     if ( caoOrCwl == 'caoTree' ){ 
                       text1 = "待定预购单";
                       text2 = "进行中预购单";
                     }else{ 
                       text1 = "开发板", judge1 = false;
                       text2 = "确认板", judge2 = true;
                     }
                     var node1 = new Ext.tree.TreeNode({ id: monthNode.id + '-' + text1, text: text1, leaf: true });
                     var node2 = new Ext.tree.TreeNode({ id: monthNode.id + '-' + text2, text: text2, leaf: true });
                     monthNode.appendChild( node1 );
                     monthNode.appendChild( node2 );
                   },
}
