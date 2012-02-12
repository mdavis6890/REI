Ext.define('REI.model.Property', {
	extend : 'Ext.data.Model',
	fields : [
		{ name: 'property_id', type : 'int', persist : false, useNull : true},
		{ name: 'property_name', type : 'string', useNull : true}
	],
	idProperty : 'property_id'
});