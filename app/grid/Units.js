Ext.define('REI.grid.Units', {
	extend : 'REI.grid.Edit',
	alias : 'widget.REI.grid.Units',
	store : 'Units',
	disabled : true,
	firstEditColumn : 0,
	setProperty : function (property_id) {
		this.store.filters.clear();
		this.store.filter('property_id', property_id);
		this.enable();
	},
	initComponent : function () {
		this.columns = [{
			text : 'Name',
			dataIndex : 'unit_name',
			width : 150,
			editor : { xtype : 'textfield'}
		}];
		this.callParent(arguments);
	}
});