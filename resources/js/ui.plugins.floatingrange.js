;(function ($, win, doc, undefined) {

	'use strict';

	var $ui = win.$plugins,
        namespace = 'netiveUI.plugins';

    /* ------------------------------------------------------------------------
	* name : object floating Range
	* Ver. : v1.0.0
	* date : 2018-12-21
	* EXEC statement
	* - $plugins.uiFloatingRange({ option });
	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {
		uiFloatingRange: function (opt) {
			return createUiFloatingRange(opt);
		}
	});
	$ui.uiFloatingRange.option = {
		add: false,
		margin: 0
	};
	function createUiFloatingRange(opt) {
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, $ui.uiFloatingRange.option, opt),
			id = opt.id,
			add = opt.add,
			mg = opt.margin,
			$range = $('#' + id),
			$item = $range.find('.ui-floating-range-item'),
			$add = add ? $('#' + add) : null,
			item_h = $item.outerHeight(),
			range_t = $range.offset().top,
			range_h = $range.outerHeight(),
			win_scrt = $(win).scrollTop(),
			add_h = add ? $add.outerHeight() : 0,
			add_t = add ? $add.position().top : 0;
						
		$(win).off('scroll.'+ id ).on('scroll.'+ id, function(){
			act();
		});
		
		function act(){
			range_t = $range.offset().top;
			range_h = $range.outerHeight();
			win_scrt = $(win).scrollTop();
			add_h = $add.outerHeight();
			add_t = $add.position().top;
			
			if (range_t <= (win_scrt + add_h + add_t + mg)) {
				if ((range_t + range_h) - item_h < (win_scrt + add_h + add_t + mg)) {
					$item.css('top', range_h - item_h );
				} else {
					$item.css('top', (win_scrt + add_h + add_t + mg) - range_t );
				}
			} else {
				$item.css('top', 0);
			}
		}
	}

})(jQuery, window, document);