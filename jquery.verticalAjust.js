(function( $ ){

	var options = {
		elms: []
	};
	
	var methods = {
		attach: function (str) {
			//add an list case
			options.elms[options.elms.length] = str;
		},
		ajust: function () {
			if (options.elms.length) {
				for (var i = 0; i < options.elms.length; i++) {
					methods._ajust(options.elms[i]);
				}
			}
		},
		_ajust: function (str) {
			//detect col count
			var last_left = 0;
			var cols = 0;
			var htsCol = [];
			$(str).each(function(index) {
				var left = $(this).offset().left;
				if ($(this).attr('data-om') === undefined) {
					$(this).attr('data-om', parseInt($(this).css('marginTop')));
				}
				
				if (!cols) {
					if (last_left > left)
						cols = index;
					else 
						htsCol[index] = 0;
				} 
				last_left = left;
			});
			
			console.log(cols);
			
			var hts = [];
			var htsRow = 0;
			var innerWidth = $(window).innerWidth();
			
			$(str).each(function(index) {
				var height = $(this).height();
				
				hts[index] = height;
				var delta = 0;
				if (index >= cols) {
					if (index % cols == 0) {
						var mx = 0;
						for(var i = index-cols; i < index; i++) mx = Math.max(mx, hts[i]);
						htsRow += mx;
					}
					var delta = htsRow - htsCol[index % cols] - parseInt($(this).attr('data-om')) * Math.floor(index / cols);
				}
				hts[index] = height - delta;
				htsCol[index % cols] += height;
				$(this).css({marginTop: -delta});
				
			});			
			
		}
		
	};
	
	$.fn.verticalAjust = function( method ) {
		
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.attach.apply( this, arguments );
		} else {
			$.error( 'Метод с именем ' +  method + ' не существует для jQuery.tooltip' );
		}   

	};
	
	$( window ).bind('resize', function() {
		$.fn.verticalAjust('ajust');
	});	
	
	$(function() {
		$.fn.verticalAjust('ajust');
	});
	
	
})( jQuery );