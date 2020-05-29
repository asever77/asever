;(function ($, win, doc, undefined) {

	'use strict';

	var $ui = win.$plugins,
        namespace = 'netiveUI.plugins';

    /* ------------------------------------------------------------------------
	* name : count number
	* Ver. : v1.0.0
	* date : 2018-12-21
	* EXEC statement
	* - $plugins.uiCountStep({ option });
	* - $plugins.uiCountSlide({ option });
	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {	
		uiCountStep: function (opt) {
			return createUiCountStep(opt);
		},
		uiCountSlide: function (opt) {
			return createUiCountSlide(opt);
		}
	});
	function createUiCountSlide(opt){
		var $base = $('#' + opt.id),
			countNum = !!opt.value === true ? opt.value : $base.text(),
			base_h = $base.outerHeight(),
			textNum = 0,
			len = countNum.toString().length,
			speed = !!opt.speed === true ? opt.speed + 's' : '1.0s',
			eff  = !!opt.eff === true ? opt.eff : 'easeOutQuart',
			transitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend',
			i = 0,
			nn = 1,
			step, re, timer, r;
			
		if ($base.data('ing') !== true) {
			textNum = $ui.option.uiComma(countNum);
			base_h === 0 ? base_h = $base.text('0').outerHeight() : '';
			$base.data('ing',true).empty().css('height', base_h);
			len = textNum.length;
			step = len;
			re = Math.ceil(len / 9); 
			(step < 9) ? step = 9 - len : step = 1;	

			// 숫자 단위만큼 
			for (i; i < len; i++) {
				var n = Number(textNum.substr(i, 1)),
					$thisNum, $base_div;
				
				if (isNaN(n)) {
					// 숫자가 아닐때 ', . ' 
					$base.append('<div class="n' + i + '"><div class="ui-count-og" style="top:' + base_h + 'px">' + textNum.substr(i, 1) + '</div></div>');
					$base.find('.n' + i).append('<span>' + textNum.substr(i, 1) + '</span>');
				}
				else {
					// 숫자일때
					$base.append('<div class="n' + i + '"><div class="ui-count-og" style="top:' + base_h + 'px">' + n + '</div></div>');
					$base.find('.n' + i).append('<span>9<br>8<br>7<br>6<br>5<br>4<br>3<br>2<br>1<br>0<br>' + n + '</span>');
					step = step + 1;
				}
				
				$base_div = $base.children('.n' + i);
				$base_div.find('span').wrapAll('<div class="ui-count-num" style="top:' + base_h + 'px; transition:top '+ speed +' cubic-bezier(' + $ui.option.effect[eff] + ');"></div>');
				$thisNum = $base_div.find('.ui-count-num');
				$thisNum.data('height', $thisNum.height()); 
			}

			r = len;
			timer = setInterval(function() {
				count(r)
				r = r - 1; 
				(r < 0) ? clearInterval(timer) : '';
			},150);
			
			
		}
		function count(r){
			var $current_num = $base.children('.n' + r).find('.ui-count-num'),
				num_h = Number($current_num.data('height'));
			$current_num.css('top', (num_h - base_h) * -1); 
			
			if (r === 0) {
				$current_num.one(transitionEnd, function(){
					$base.text(textNum).data('ing', false);
				});
			}
		}
	}
	function createUiCountStep(opt) {
		const $base = $('#' + opt.id);
		const countNum = !!opt.value === true ? opt.value : $base.text();

		let count = 0,
			timer, diff, counter,
			add = Math.ceil((countNum - count) / (countNum - count), -2),
			j = 1,
			v = 0,
			s = 100;
		
		if ($base.data('ing') !== true) {
			counter = function(){
				j = v < 10? j = 0 : v < 10 ? j + 11 : v < 40 ? j +111 : v < 70 ? j + 1111 : j + 11111;
				s = s < 0 ? s = 0 : s - 10;
				diff = countNum - count;
				(diff > 0) ? count += add + j : '';

				let n = $ui.option.uiComma(count);
				$base.text(n);
				v = v + 1;

				if(count < countNum) {
					timer = setTimeout(function() { 
						counter(); 
					}, s);
				} else {
					$base.text($ui.option.uiComma(countNum));
					clearTimeout(timer);
				}
			}
			counter();
		}
	}

        
})(jQuery, window, document);