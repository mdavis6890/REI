Ext.define('REI.data.proxy.Rest', {
	override : 'Ext.data.proxy.Rest',
    buildUrl: function(request) {
        var me        = this,
            operation = request.operation,
            records   = operation.records || [],
            record    = records[0],
            format    = me.format,
            url       = me.getUrl(request),
            id        = record ? record.getId() : operation.id;
        
        if (me.appendId && id !== undefined && id !== null && id !== '') {
            if (!url.match(/\/$/)) {
                url += '/';
            }
            
            url += id;
        }
        
        if (format) {
            if (!url.match(/\.$/)) {
                url += '.';
            }
            
            url += format;
        }
        
        request.url = url;
		
        return me.superclass.buildUrl.call(this, request);
    }
});
Ext.define('REI.data.Field', {
	override : 'Ext.data.Field',
	defaultValue : null
});
Ext.require('Ext.data.Types', function () {
	Ext.apply(Ext.data.Types, {
		DATE: {
			convert: function(v) {
				var df = this.dateFormat,
					parsed,
					timezoneOffset = (new Date()).getTimezoneOffset() * 60000; // Get timezone offset in ms
				

				if (!v) {
					return null;
				}
				if (Ext.isDate(v)) {
					return v;
				}
				if (df) {
					if (df == 'timestamp') {
						return new Date(v*1000);
					}
					if (df == 'time') {
						return new Date(parseInt(v, 10));
					}
					return Ext.Date.parse(v, df);
				}

				parsed = Date.parse(v);
				return parsed ? new Date(parsed + timezoneOffset) : null; // Add PST timezone offset in milliseconds.
			}
		}
	});
});