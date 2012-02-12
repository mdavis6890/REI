Ext.define('REI.grid.PropertyExps', {
	extend : 'REI.grid.Edit',
	alias : 'widget.REI.grid.PropertyExps',
	store : 'PropertyExps',
	disabled : true,
	firstEditColumn : 0,
    features: [{
        ftype: 'summary'
    }],
	setProperty : function (property_id) {
		this.store.filters.clear();
		this.store.filter('property_id', property_id);
		this.enable();
	},
	initComponent : function () {
		this.columns = [{
			text : 'Date',
			dataIndex : 'property_exp_date',
			xtype : 'datecolumn',
			editor : { xtype : 'datefield', value : new Date()}
		}, {
			text : 'Category',
			dataIndex : 'category',
			editor : { xtype : 'textfield'}
		}, {
			text : 'Notes',
			dataIndex : 'note',
			width : 500,
			editor : { xtype : 'textfield'}
		}, {
			text : 'Amount',
			dataIndex : 'property_exp_amount',
			renderer: Ext.util.Format.usMoney,
			summaryType: 'sum',
			summaryRenderer: Ext.util.Format.usMoney,
			editor : { xtype : 'numberfield'}
		}];
		this.callParent(arguments);
	}
});