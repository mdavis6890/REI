Ext.Loader.setConfig({
	enabled: true,
	disableCaching : false
});
Ext.application({
	name: 'REI',

	//appFolder: 'app',

	controllers : [
		'App'
	],

	launch: function () {
		//console.log('App loading...');
		//console.log(Ext.getVersion());
		Ext.create('Ext.container.Viewport', {
			layout : 'fit',
			items : [{xtype : 'REI.view.Properties'}]
		});
		//console.log('App loaded');
	}
});
