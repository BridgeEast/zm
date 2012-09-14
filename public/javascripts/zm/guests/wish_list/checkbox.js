Zm.guests.checkbox = {
	init: function() {
		this.unSelectAll()
	},

	unSelectAll: function() { //每次点总选框再取消，用clearSelections()只能去掉每条记录前面的勾,总选框的勾去不掉，这是Ext的问题。
		Ext.grid.GridPanel.prototype.unSelectAll = function() { //prototype是原型的意思，
			var view = this.getView();
			var sm = this.getSelectionModel();
			if (sm) {
				sm.clearSelections(); //去掉每条记录前面的勾
				var hd = Ext.fly(view.innerHd); //下面是改那个总选框的样式，去掉它的勾，
				var c = hd.query('.x-grid3-hd-checker-on');
				if (c && c.length > 0) {
					Ext.fly(c[0]).removeClass('x-grid3-hd-checker-on')
				}
			}
		}
	}
}

