Ext.define('REI.model.UnitTransaction', {
	extend : 'Ext.data.Model',
	fields : [
		{ name: 'unit_transaction_id', type : 'int', persist : false, useNull : true},
		{ name: 'unit_t_category', type : 'string', useNull : true},
		{ name: 'unit_id', type : 'int', useNull : true},
		{ name: 'amount', type : 'number', useNull : true},
		{ name: 't_date', type : 'date', defaultValue : new Date(), useNull : true},
		{ name: 'note', type : 'string', useNull : true}
	],
	idProperty : 'unit_transaction_id'
});