Ext.define('REI.grid.Edit', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.REI.grid.Edit',
	autoScroll : true,
	firstEditColumn : 0,
	onAddButton : function () {
		var store = this.store,
			storeModel = store.model,
			rec = Ext.create(storeModel),
			//storeIdProperty = rec.idProperty,
			foreignKeys = rec.foreignKeys,
			edit = this.getPlugin('rowEditor');

		
		rec.setId(undefined);
		
		store.filters.each(function (filter, idx, count) {
			rec.set(filter.property, filter.value);
		});

		this.fireEvent('addRecord', rec);

		//recConfig[storeIdProperty] = undefined;
		//rec = Ext.create(storeModel, recConfig);

		store.autoSync = false;	//Turn off autosync to avoid saving the new record until the user has had a chance to edit the values.
		store.insert(0, rec); //Insert the new record
		store.autoSync = true; //Turn auto-sync back on so the record gets saved after the user edits the record.
		edit.startEdit(rec, this.firstEditColumn); //Start editing at the second column
	},
	onProxyException : function (proxy, response, operation, options) {
		var action = operation.action,
			records = operation.records,
			error = operation.error,
			store = this.getStore(),
			message;

		if (action === 'destroy') {
			message = 'There was a problem deleting your selections. They have been added back into the grid.<BR><BR>';
			message += error;
			Ext.Msg.alert('Error', message);
			Ext.each(records, function (brokenRecord, index, allItems) {
				Ext.each(store.removed, function (removedRecord, index, allItems) {
					if (brokenRecord === removedRecord) {
						store.removed.splice(index, 1);
					}
				});
				store.insert(0, brokenRecord);
			});
		} else if (action === 'update') {
			message = 'There was a problem saving your changes. Items have been reverted back to their last saved values.<BR><BR>';
			message += error;
			Ext.Msg.alert('Error', message);
			Ext.each(records, function (brokenRecord, index, allItems) {
				brokenRecord.reject(false); //Reset fields to their original values.
			});
		} else if (action === 'create') {
			message = 'There was a problem adding the new record. Items have been reverted back to their last saved values.<BR><BR>';
			message += error;
			Ext.Msg.alert('Error', message);
			Ext.each(records, function (brokenRecord, index, allItems) {
			});
		}
	},
	cancelEdit : function (editor, e, eOpts) {
		var store = e.store,
			record = e.record;
		
		if(record.phantom) {
			store.remove(record);
		}
	},
	initComponent : function () {
		this.plugins = [{
			ptype : 'rowediting',
			pluginId : 'rowEditor',
			listeners : {
				scope : this,
				canceledit : this.cancelEdit
			}
		}];


		this.dockedItems = [{
			xtype: 'toolbar',
			items: [{
                icon: '/js/ext-4.0.2a/examples/shared/icons/fam/add.png',  // Use a URL in the icon config
				text: 'Add',
				scope: this,
				handler: this.onAddButton
			}, {
                icon: '/js/ext-4.0.2a/examples/shared/icons/fam/accept.png',  // Use a URL in the icon config
				text: 'Refresh',
				scope: this,
				handler: function () {
					this.store.load();
				}
			}, {
                icon: '/js/ext-4.0.2a/examples/shared/icons/fam/accept.png',  // Use a URL in the icon config
				text: 'Save',
				scope: this,
				handler: function () {
					this.store.sync();
				}
			}]
		}];
		if (this.acItems === undefined) {
			this.acItems = [];
		}
		this.acItems.push({
			icon: '/js/ext-4.0.2a/examples/shared/icons/fam/delete.gif',  // Use a URL in the icon config
			tooltip: 'Remove',
			handler: function (grid, rowIndex, colIndex) {
				var store = grid.getStore(),
					rec = store.getAt(rowIndex);

				store.remove(rec);
				//grid.getStore().sync();
			}
		});

		this.columns.push({
            xtype : 'actioncolumn',
            width : this.acItems.length * 20,
            items : this.acItems
        });

		this.addEvents('addRecord');

		this.callParent(arguments);


		var store = this.getStore(),
			proxy = store.getProxy();

		proxy.on('exception', this.onProxyException, this);
	}
});