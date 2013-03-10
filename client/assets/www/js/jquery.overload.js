
define(['jquery'],function ($) { 

	$.parseJSON: function( data ) {
		// Attempt to parse using the native JSON parser first
		/**  THIS RAISES Parsing ERROR
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}
		**/
	
		if ( data === null ) {
			return data;
		}
	
		if ( typeof data === "string" ) {
	
			// Make sure leading/trailing whitespace is removed (IE can't handle it)
			data = $.trim( data );
	
			if ( data ) {
				// Make sure the incoming data is actual JSON
				// Logic borrowed from http://json.org/json2.js
				if ( rvalidchars.test( data.replace( rvalidescape, "@" )
					.replace( rvalidtokens, "]" )
					.replace( rvalidbraces, "")) ) {
	
					return ( new Function( "return " + data ) )();
				}
			}
		}
	
		$.error( "Invalid JSON: " + data );
	}

	return $;

});

