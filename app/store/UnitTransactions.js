Ext.define('REI.store.UnitTransactions', {
	extend : 'REI.store.TableConnector',
	model : 'REI.model.UnitTransaction',
	url : 'app/dao/unit_transaction',
	sorters: [{
		property: 't_date',
		direction: 'ASC'
	}]
});