Ext.define('REI.grid.Properties', {
	extend : 'REI.grid.Edit',
	alias : 'widget.REI.grid.Properties',
	store : 'Properties',
	firstEditColumn : 1,
	initComponent : function () {
		this.columns = [{
			text : 'ID',
			dataIndex : 'property_id'
		}, {
			text : 'Name',
			dataIndex : 'property_name',
			editor : { xtype : 'textfield'}
		}];
		this.callParent(arguments);
	}
});