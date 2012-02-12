Ext.define('REI.view.Properties', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.REI.view.Properties',
	requires : [
		'REI.grid.Properties',
		'REI.grid.PropertyExps',
		'REI.grid.UnitExps',
		'REI.grid.Units',
		'REI.grid.UnitTransactions'
	],
    layout: {
        type: 'table',
        // The total column count must be specified here
        columns: 3
    },
	selectProperty : function (selectionModel, record, index, eOpts) {
		var gridUnits = this.down('#gridUnits'),
			gridPropertyExps = this.down('#gridPropertyExps'),
			property_id = record.get('property_id');

		this.fireEvent('selectProperty', selectionModel, record, index, eOpts);

		gridUnits.setProperty(property_id);
		gridPropertyExps.setProperty(property_id);
	},
	selectUnit : function (selectionModel, record, index, eOpts) {
		var gridUnitTransactions = this.down('#gridUnitTransactions'),
			gridUnitExps = this.down('#gridUnitExps'),
			unit_id = record.get('unit_id');
			
		this.fireEvent('selectUnit', selectionModel, record, index, eOpts);

		gridUnitTransactions.setUnit(unit_id);
		gridUnitExps.setUnit(unit_id);
	},
	getPropertiesGrid : function () { return this.down('#gridProperties'); },
	initComponent : function () {
		this.items = [{
			xtype : 'REI.grid.Properties',
			itemId : 'gridProperties',
			title : 'Properties',
			width: 250,
			height: 400,
			listeners : {
				scope : this,
				select : this.selectProperty
			}
		}, {
			xtype : 'REI.grid.PropertyExps',
			itemId : 'gridPropertyExps',
			title : 'Property Expenses',
			width: 900,
			height: 400,
			colspan : 2
		}, {
			xtype : 'REI.grid.Units',
			itemId : 'gridUnits',
			title : 'Units',
			width: 250,
			height: 400,
			listeners : {
				scope : this,
				select : this.selectUnit
			}
		}, {
			xtype : 'REI.grid.UnitTransactions',
			itemId : 'gridUnitTransactions',
			title : 'Unit Transactions',
			width: 500,
			height: 400
		}, {
			xtype : 'REI.grid.UnitExps',
			itemId : 'gridUnitExps',
			title : 'Unit Expenses',
			width: 500,
			height: 400
		}];

		this.callParent(arguments);
		this.addEvents('selectProperty', 'selectUnit');
		//console.log(this);
	}
});