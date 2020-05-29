;(function ($, win, doc, undefined) {

	'use strict';

	var $ui = win.$plugins,
        namespace = 'netiveUI.plugins';

    /* ------------------------------------------------------------------------
	* name : tooltip
	* Ver. : v1.0.0
	* date : 2018-12-21
	* EXEC statement
	* - $plugins.uiTooltip();
	* - $plugins.uiTooltip({ option });
	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {
		uiTooltip: function (opt) {
			return createUiTooltip(opt);
		}
	});
	$ui.uiTooltip.option = {
		visible: null,
		id: false,
		ps: false
	};
	function createUiTooltip(opt){
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, $ui.uiTooltip.option, opt),
			$btn = $('.ui-tooltip-btn'),
			$tip = opt.id ? typeof opt.id === 'string' ? $('#' + opt.id) : opt.id : false,
			visible = opt.visible,
			id = opt.id ? $tip.attr('id') : '',
			
			sp = 10,
			ps = opt.ps,
			off_t, off_l, w, h, bw, bh, st, sl, timer,
			class_ps = 'ps-ct ps-cb ps-lt ps-lb ps-rt ps-rb';

		if (visible !== null) {
			visible ? tooltipSet(id) : tooltipHide();
		}

		// $btn
		// .on('click', function(e){
		// 	e.preventDefault();
		// 	tooltipSet($(this).attr('aria-describedby'));
		// });

		$btn
		.off('mouseover.ui focus.ui').on('mouseover.ui focus.ui', function(e){
			e.preventDefault();
			tooltipSet($(this).attr('aria-describedby'));
		})
		.off('mouseleave.ui ').on('mouseleave.ui', function(){
			tooltipHideDelay();

			$('.ui-tooltip')
				.on('mouseover.ui', function(){
					clearTimeout(timer);
				})
				.on('mouseleave.ui', function(e){
					tooltipHideDelay();
				});
		})

		$btn
		.off('touchstart.uitooltip').on('touchstart.uitooltip', function(e){
			e.preventDefault();
			if (!$(this).data('view')){
				$(this).data('view', true);
				tooltipHide();
				tooltipSet($(this).attr('aria-describedby'));
			} else {
				$(this).data('view', false);
				tooltipHide();
			}

			// $(doc).off('click.bdd').on('click.bdd', function(e){
			// 	//dropdown 영역 외에 클릭 시 판단
			// 	if (!!$('body').data('dropdownOpened')){
			// 		if ($('.ui-tooltip').has(e.target).length < 1) {
			// 			tooltipHide();
			// 		}
			// 	}
			// });
		});

		function tooltipSet(v) {
			var $t = $('[aria-describedby="'+ v +'"]');

			$('#' + v).removeClass(class_ps);

			id = v;
			off_t = $t.offset().top;
			off_l =$t.offset().left;
			w = $t.outerWidth();
			h = $t.outerHeight();
			bw = $(win).innerWidth();
			bh = $(win).innerHeight();
			st = $(doc).scrollTop();
			sl = $(doc).scrollLeft();
			
			tooltipShow(off_t, off_l, w, h, bw, bh, st, sl, id, false);
		}
		function tooltipHide() {
			$('.ui-tooltip').removeAttr('style').attr('aria-hidden', true).removeClass(class_ps);
		}
		function tooltipHideDelay(){
			timer = setTimeout(tooltipHide, 100);
		}

		function tooltipShow(off_t, off_l, w, h, bw, bh, st, sl, id) {
			var $id = $('#' + id),
				pst = (bh / 2 > (off_t - st) + (h / 2)) ? true : false,
				psl = (bw / 2 > (off_l - sl) + (w / 2)) ? true : false,
				tw = $id.outerWidth(),
				th = $id.outerHeight(),
				ps_l, ps_r, cursorCls = 'ps-';
				
			if (psl) {
				if (off_l - sl > tw / 2) {
					cursorCls += 'c';
					ps_l = off_l - (tw / 2) + (w / 2);
				} else {
					cursorCls += 'l';
					ps_l = off_l;
				}
			} else {
				if (bw - (off_l - sl + w) > tw / 2) {
					cursorCls += 'c';
					ps_r = Math.ceil(off_l) - (tw / 2) + (w / 2);
				} else {
					cursorCls += 'r';
					ps_r = off_l - tw + w;
				}
			}

			ps ? cursorCls = 'ps-l' : '';
			ps ? ps_l = off_l : '';
			ps ? psl = true : '';
			pst ? cursorCls += 'b' : cursorCls += 't';

			if (!!$id.attr('modal')) {
				if (!$ui.browser.oldie) {
					ps_l = ps_l;
					ps_r = ps_r;
				}

				$ui.browser.ie ? '' : off_t = off_t;
			}

			if (!!$id.closest('.type-fixed-bottom').length) {
				off_t = off_t - $('ui-modal-tit').outerHeight();
			}

			$id.addClass(cursorCls).attr('aria-hidden', false).css({ 
				display:'block'
			}).css({
				top : pst ? off_t + h + sp : off_t - th - sp,
				left : psl ? ps_l : ps_r
			});
		}
	}


})(jQuery, window, document);