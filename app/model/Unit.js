Ext.define('REI.model.Unit', {
	extend : 'Ext.data.Model',
	fields : [
		{ name: 'unit_id', type : 'int', persist : false, useNull : true},
		{ name: 'unit_name', type : 'string', useNull : true},
		{ name: 'property_id', type : 'int', useNull : true}
	],
	idProperty : 'unit_id'
});