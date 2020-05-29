;(function ($, win, doc, undefined) {

	'use strict';

	var $ui = win.$plugins,
        namespace = pluginsName;

    /* ------------------------------------------------------------------------
	* name : Brick list
	* Ver. : v1.0.0
	* date : 2018-12-21
	* EXEC statement
	* - $plugins.uibricklist({ option });
	* - $plugins.uibricklistAdd({ option });
	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {
		uiBrickList: function (opt) {
			return createUiBrickList(opt);
		},
		uiBrickListAdd: function (opt) {
			return createUiBrickListAdd(opt);
		}
	});
	$ui.uiBrickList.option = {
		margin: 0,
		actdelay: true,
		response: true
	}
	function createUiBrickList(opt){
		if (opt === undefined) { return false; }
		
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, $ui.uiBrickList.option, opt),
			$base = $('#' + opt.id), 
			$item = $base.find('.ui-bricklist-item').not('.disabled'),
			mg = opt.margin,
			re = opt.response,
			actdelay = opt.actdelay,
			wrap_w  = $base.outerWidth(),
			item_w  = $item.outerWidth(),
			item_sum = $item.length,
			item_col = Math.floor(wrap_w / item_w) ,
			item_row = (item_sum / item_col) + (item_sum % item_col) ? 1 : 0,
			item_top = [],
			delay_n = 0,
			i = 0,
			timer;

		$base.data('orgcol',item_col);

		for (i = 0; i < item_col; i++) {
			actdelay ? delay_n = i: delay_n = 0;
			$item.eq(i).attr('role','listitem').css({
				position: 'absolute',
				left : (item_w + mg) * i,
				top : 0
			}).stop().delay(50 * i).animate({
				top : 0
			}, 300, function(){
				$(this).addClass('on');
			});
			$(this).addClass('on');
			item_top[i] = $item.eq(i).outerHeight() + mg;
		}

		setTimeout(function(){
			for (i = 0; i < item_col; i++) {
				item_top[i] = $item.eq(i).outerHeight() + mg;
			}
			
			$base.data('opt', { 
					'wrap':wrap_w, 
					'width':item_w, 
					'top':item_top, 
					'row':item_row, 
					'col':item_col, 
					'actdelay':actdelay,
					'mg':mg
				});
			$ui.uiBrickListAdd({ id: opt.id, actdelay:actdelay });
		},200);
		
		if (re) {
			$(win).off('resize.win').on('resize.win', function(){
				var recol_n =  Math.floor($('#' + opt.id).outerWidth() / $('#' + opt.id).find('.ui-bricklist-item').outerWidth());
				if ($base.data('orgcol') === recol_n && recol_n > 1) {
					return false;
				}
				
				clearTimeout(timer);
				timer = setTimeout(function(){
					$ui.uiBrickList({ id : opt.id, margin: opt.margin, actdelay:false });
				},300);
				$base.find('.ui-bricklist-wrap').css('height', Math.max.apply(null, item_top));
			});
		}	
	}
	function createUiBrickListAdd(opt){
		if (opt === undefined) { return false; }
		
		var $base = $('#' + opt.id), 
			$item = $base.find('.ui-bricklist-item').not('.disabled'),
			dataOpt = $base.data('opt'),
			wrap_w = dataOpt.wrap,
			actdelay = dataOpt.actdelay,
			item_w = dataOpt.width,
			item_sum = $item.length,
			item_col = dataOpt.col,
			item_row = dataOpt.row,
			item_top = dataOpt.top,
			mg = dataOpt.mg,
			delay_n = 0,
			i = item_col,
			minH, nextN, item_h,timer;

		clearTimeout(timer);
		timer = setTimeout(function(){
			for (i; i < item_sum; i++) {
				actdelay ? delay_n = i: delay_n = 0;
				minH = Math.min.apply(null, item_top);
				nextN = item_top.indexOf(minH);
				item_h = Number($item.eq(i).outerHeight() + mg);
				$plugins.uiLoading({ visible:true });
				$item.eq(i).css({
					position: 'absolute',
					left : (item_w * nextN) + (mg * nextN),
					top : item_top[nextN]
				}).stop().delay(50 * i).animate({
					 top : item_top[nextN]
				},150, function(){
					$plugins.uiLoading({ visible:false });
					$(this).addClass('on');
				});
				item_top[nextN] = Number(minH + item_h);
			}
			$base.data('opt', { 'wrap':wrap_w, 'width':item_w, 'top':item_top, 'row':item_row, 'col':i, 'mg':mg })
			.find('.ui-bricklist-wrap').css('height', Math.max.apply(null, item_top));
		},300);
	}
    
        
})(jQuery, window, document);