Zm.guests.communicateWithServices = {
    init: function() {
        var communicateText = new Ext.form.TextArea({
            name: 'textarea',
            height: 270,
            width: 150,
        });

        var communicateEditor = new Ext.form.HtmlEditor({
            enableAlignment: true,
            enableColors: true,
            enableFont: true,
            enableFontSize: true,
            enableFormat: true,
            enableLinks: true,
            enableLists: true,
            enableSourceEdit: true,
        });
        var communicateTbar = new Ext.Toolbar({
            items: [{
                text: '客服:',
                icon: '/images/im/user_suit.png',
                handler: function() {
                    Ext.Msg.alert('提示', '此功能正在开发中...');
                }
            },
            {
                text: '客户:',
                icon: '/images/im/user.png',
                handler: function() {
                    Ext.Msg.alert('提示', '此功能正在开发中...');
                }
            }]
        });
        var communicateBbar = new Ext.Toolbar({
            items: [{
                text: '聊天记录',
                icon: '/images/im/messages.png',
                handler: function() {
                    Ext.Msg.alert('提示', '暂不支持查看聊天记录...')
                }
            },
            {
                text: '清空记录',
                icon: '/images/im/cancel.png',
                handler: function() {
                    Ext.Msg.alert('提示', '没有记录');
                }
            },
            {
                text: '发送图片',
                icon: '/images/im/image_add.png',
                handler: function() {
                    Ext.Msg.alert('提示', '此功能正在开发中...');
                }
            },
            {
                text: '传送附件',
                icon: '/images/im/folder_go.png',
                handler: function() {
                    Ext.Msg.alert('提示', '此功能待开发...');
                }
            }]
        });
        var sendButton = new Ext.Button({
            text: '发送'
        });
        var cancleButton = new Ext.Button({
            text: '取消'
        });
        var communicateWindow = new Ext.Window({
            title: '与客服交谈',
            height: 575,
            width: 560,
            maximizable: true,
            constrainHeader: true,
            buttonAlign: 'right',
            items: [{
                layout: 'fit',
                tbar: communicateTbar,
                items: [communicateText],
                bbar: communicateBbar
            },
            {
                layout: 'fit',
                items: [communicateEditor]
            }],
            buttons: [sendButton, cancleButton]

        });
        return communicateWindow;
    }
}

