Ext.define('REI.grid.UnitExps', {
	extend : 'REI.grid.Edit',
	alias : 'widget.REI.grid.UnitExps',
	store : 'UnitExps',
	firstEditColumn : 0,
	disabled : true,
	setUnit : function (unit_id) {
		this.store.filters.clear();
		this.store.filter('unit_id', unit_id);
		this.enable();
	},
	initComponent : function () {
		this.columns = [{
			text : 'Date',
			dataIndex : 'exp_date',
			xtype : 'datecolumn',
			editor : {
				xtype : 'datefield',
				value : new Date(),
				selectOnFocus : true
			}
		}, {
			text : 'Amount',
			dataIndex : 'amount',
			renderer: Ext.util.Format.usMoney,
			editor : { xtype : 'numberfield'}
		}, {
			text : 'Note',
			dataIndex : 'note',
			width : 200,
			editor : { xtype : 'textfield'}
		}];
		this.callParent(arguments);
		
		this.on('add', this.addRecord);
	}
});