Ext.define('REI.model.PropertyExp', {
	extend : 'Ext.data.Model',
	fields : [
		{ name: 'property_exp_id', type : 'int', persist : false, useNull : true},
		{ name: 'property_exp_amount', type : 'number', useNull : true},
		{ name: 'property_id', type : 'int', useNull : true},
		{ name: 'category', type : 'string', useNull : true},
		{ name: 'note', type : 'string', useNull : true},
		{ name: 'property_exp_date', type : 'date', useNull : true}
	],
	idProperty : 'property_exp_id'
});