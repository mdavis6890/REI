Ext.define('REI.controller.App', {
    extend: 'Ext.app.Controller',

	models : [
		'Property',
		'Unit',
		'PropertyExp',
		'UnitExp',
		'UnitTransaction'
	],

    stores: [
		'Properties',
		'PropertyExps',
		'Units',
		'UnitExps',
		'UnitTransactions'
	],

    views: [
		'Properties'
	],

    init: function () {
    }
});