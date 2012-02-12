Ext.define('REI.grid.UnitTransactions', {
	extend : 'REI.grid.Edit',
	alias : 'widget.REI.grid.UnitTransactions',
	store : 'UnitTransactions',
	firstEditColumn : 0,
	disabled : true,
    features: [{
        ftype: 'summary'
    }],
	setUnit : function (unit_id) {
		this.store.filters.clear();
		this.store.filter('unit_id', unit_id);
		this.enable();
	},
	colorMoney : function (value) {
		var moneyVal = Ext.util.Format.usMoney(value);
	    if (value < 0) {
            return '<span style="color:green;">' + moneyVal + '</span>';
        } else if (value > 0) {
            return '<span style="color:red;">' + moneyVal + '</span>';
        }
        return moneyVal;
		//return Ext.util.Format.usMoney(value);
	},
	initComponent : function () {
		this.columns = [{
			text : 'Date',
			dataIndex : 't_date',
			xtype : 'datecolumn',
			editor : {
				xtype : 'datefield',
				value : new Date(),
				selectOnFocus : true
			}
		}, {
			text : 'Category',
			dataIndex : 'unit_t_category',
			editor : { xtype : 'textfield'}
		}, {
			text : 'Note',
			dataIndex : 'note',
			editor : { xtype : 'textfield'}
		}, {
			text : 'Amount',
			dataIndex : 'amount',
			renderer: this.colorMoney,
			summaryType: 'sum',
			summaryRenderer: Ext.util.Format.usMoney,
			editor : { xtype : 'numberfield'}
		}];
		this.callParent(arguments);
	}
});