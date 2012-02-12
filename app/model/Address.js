Ext.define('REI.model.Address', {
	extend : 'Ext.data.Model',
	fields : [
		{ name: 'address_id', type : 'int', persist : false, useNull : true},
		{ name: 'street', type : 'string', useNull : true},
		{ name: 'property_id', type : 'int', useNull : true},
		{ name: 'zip_code', type : 'string', useNull : true}
	],
	idProperty : 'address_id'
});