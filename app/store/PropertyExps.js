Ext.define('REI.store.PropertyExps', {
	extend : 'REI.store.TableConnector',
	model : 'REI.model.PropertyExp',
	url : 'app/dao/property_exp',
	sorters: [{
		property: 'property_exp_date',
		direction: 'ASC'
	}]
});