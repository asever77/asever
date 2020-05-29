//utils module
;(function ($, win, doc, undefined) {

	'use strict';

	var $ui = win.$plugins,
		namespace = 'netiveUI.plugins';
		
	/* ------------------------------------------------------------------------
	* name : accordion tab  
	* Ver. : v1.0.0
	* date : 2018-12-21
	* EXEC statement
	* - $plugins.uiAccordion({ option });
	* - $plugins.uiAccordionToggle({ option });
	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {
		uiScrollBox: function (opt) {
			return createUiScrollBox(opt);
		}
	});

    function createUiScrollBox(opt) {
        const callback = opt.callback,
            len = $('.ui-scrollbox-item').length;

        if ($(win).outerHeight() > $('.ui-scrollbox-item').eq(0).offset().top) {
            console.log(111111111)
            $('.ui-scrollbox-item').eq(0).addClass('visible');
            callback({ current:0, visible: true});
        }

        $(win).off('scroll.win').on('scroll.win', function(){
            const $win = $(win),
                $body = $('body'),
                win_h = $win.outerHeight(),
                scr_t = $win.scrollTop(),
                add_h = (win_h / 6),
                item = $('.ui-scrollbox-item');

            let n = 0;

            if (Math.abs(win_h - item.eq(0).offset().top) + add_h < scr_t) {
                item.eq(0).addClass('visible');
                n = 0;
                callback({ current: n, visible:true });
                itemCheck();
            } else {
                if ($(win).outerHeight() > $('.ui-scrollbox-item').eq(0).offset().top + 65) {
                    item.eq(0).addClass('visible');
                    n = 0;
                    callback({ current: n, visible:true });
                    itemCheck();
                } else {
                    callback({ current: n, visible:false });
                    item.eq(0).removeClass('visible');
                }
            }

            function itemCheck() {
                n = n + 1;
                const items = item.eq(n);

                if (n >= len) {
                    return false;
                }

                if (Math.abs(win_h - items.offset().top) + add_h < scr_t) {
                    items.addClass('visible');
                    callback({ current: n, visible:true });
                    itemCheck();
                } else {
                    items.removeClass('visible');
                    callback({ current: n, visible:false });
                }
            }
        })
    }
	

})(jQuery, window, document);