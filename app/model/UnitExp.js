Ext.define('REI.model.UnitExp', {
	extend : 'Ext.data.Model',
	fields : [
		{ name: 'unit_exp_id', type : 'int', persist : false, useNull : true},
		{ name: 'unit_id', type : 'int', useNull : true},
		{ name: 'amount', type : 'number', useNull : true},
		{ name: 'note', type : 'string', useNull : true},
		{ name: 'exp_date', type : 'date', defaultValue : new Date(), useNull : true}
	],
	idProperty : 'unit_exp_id',
	foreignKeys : ['unit_id']
});