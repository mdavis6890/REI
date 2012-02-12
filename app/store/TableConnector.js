Ext.define('REI.store.TableConnector', {
	extend : 'Ext.data.Store',
	url : undefined, // Set in extended class
	model : undefined, //Set in extended class
    proxy: {
    },
	remoteFilter : true,
	remoteSort : true,
	autoLoad : false,
	autoSync : true,
    constructor: function (config) {
        config = config || {};

        Ext.applyIf(config, {
            proxy: {
				type: 'rest',
				url : this.url,
				reader : {
					type : 'json',
					root : 'records',
					messageProperty : 'message'
				},
				writer : {
					type : 'json',
					writeAllFields : false
				}
            }
        });

        this.callParent([config]);
    }
});