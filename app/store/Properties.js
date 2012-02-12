Ext.define('REI.store.Properties', {
	extend : 'REI.store.TableConnector',
	model : 'REI.model.Property',
	url : 'app/dao/property',
	autoLoad : true
});