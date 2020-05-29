;(function ($, win, doc, undefined) {

	'use strict';

	var $ui = win.$plugins,
        namespace = 'netiveUI.plugins';

    /* ------------------------------------------------------------------------
	* name : slider
	* Ver. : v1.0.0
	* date : 2018-12-21
	* EXEC statement
	* - $plugins.uiSlider({ option });
	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {
		uiSlider: function (opt) {
			return createUiSlider(opt);
		}
	});
	$ui.uiSlider.option = {
		vertical: false, //가로,세로형
		range: false, //범위슬라이더
		reverse : false, //역순
		acc: false, //select 연결
		stepname: false,
		callback: false,

		tooltip: false,
		unit: '',
		txt_s:'',
		txt_e:'',

		now: [0],
		step: 10,
		min: 0,
		max: 100,
	}
	function createUiSlider(opt) {
		var opt = $.extend(true, {}, $ui.uiSlider.option, opt),
			$slider = $('#' + opt.id),
			$wrap = $slider.find('.ui-slider-wrap'),
			$divwrap = $slider.find('.ui-slider-divwrap'),
			$bg = $wrap.find('.ui-slider-bg'),
			$btn = $wrap.find('button'),
			$btn_s = $wrap.find('.ui-slider-btn-s'),
			$btn_e = $wrap.find('.ui-slider-btn-e'),
			$bar = $bg.find('.ui-slider-bar'),
			vertical = opt.vertical,
			range = opt.range,
			rev = opt.reverse,
			stepname = opt.stepname,
			acc = opt.acc;//select 연결

		rev ? $slider.addClass('type-reverse') : $slider.removeClass('type-reverse');
		vertical ? $slider.addClass('type-vertical') : $slider.removeClass('type-vertical');

		var	step = opt.step,
			id = opt.id,
			min = opt.min,
			max = opt.max,
			tooltip = opt.tooltip,
			callback = opt.callback,
			unit = opt.unit,
			txt_e = opt.txt_e,
			txt_s = opt.txt_s,
			txt_e2 = '', 
			txt_s2 = '',

			slider_w = !vertical ? $bg.outerWidth() : $bg.outerHeight(),
			step_w = 100 / step,
			unit_sum = (max - min) / step,
			now_s = opt.now[0] < min ? min : opt.now[0],
			now_e = opt.now[1] > max ? max : opt.now[1],
			per_min = ((now_s - min) / (max - min)) * 100,
			per_max = ((now_e - min) / (max - min)) * 100,
			div_w = Math.ceil(slider_w / step),
			lmt_max,
			lmt_min,
			now_sum = [],
			sliderstep = [],
			p, keyCode, $sel_s, $sel_e, txt_val,
			dir = !vertical ? rev ? 'right' : 'left' : rev ? 'bottom' : 'top',
			siz = !vertical ? 'width' : 'height';

		//percent change
		per_min = perStep(per_min);
		range ? per_max = perStep(per_max) : '';

		//web accessibility : select 
		if (acc) {
			$sel_s = $('[data-sliderselect="' + opt.id + '"]').find('.ui-slider-min');
			range ? $sel_e = $('[data-sliderselect="' + opt.id + '"]').find('.ui-slider-max') : '';
		}
		
		//reset
		$wrap.find('.ui-slider-tooltip').remove();
		$divwrap.find('span').remove();
		
		//tooltip setting
		if (!!tooltip) {
			$wrap.append('<div class="ui-slider-tooltip"></div>');
			sliderTooltip({ unit:unit, now_1:opt.now[0], now_2:opt.now[1], per_min:per_min, per_max:per_max });
			sliderCallback({ callback:callback, now_1:opt.now[0], now_2:opt.now[1] });
		} 
		
		//button setting
		$btn_s.css(dir, per_min + '%').find('.ui-slider-txt').text(((per_min / step_w) * unit_sum) + min);
		range ? $btn_e.css(dir, per_max + '%').find('.ui-slider-txt').text(((per_max / step_w) * unit_sum) + min) : '';
		//range 타입 : 버튼이 겹치는 경우 우선 클릭될 버튼 설정
		if (per_min === per_max && per_min >= 50 && range) {
			$btn_s.addClass('on');
			$btn_e.removeClass('on');
		} else if (per_min === per_max && per_max < 50 && range){
			$btn_s.removeClass('on');
			$btn_e.addClass('on');
		}
		
		//graph bar setting
		!range ? $bar.css(siz,per_min + '%').css(dir,0) : $bar.css(siz,per_max - per_min + '%').css(dir,per_min + '%' );

		//graph step & select option setting
		for (var i = 0; i < step + 1; i++) {
			txt_e2 = (i === step) ? opt.txt_e : '';
			txt_s2 = (i === 0) ? opt.txt_s : '';
			txt_val = parseInt(min + (unit_sum * i));
			now_sum.push(txt_val);
			if (stepname) {
				$divwrap.append('<span class="ui-slider-div n'+ i +'" style="'+ dir +':' + step_w * i + '%; '+ siz +':' + div_w + 'px; margin-'+ dir +':' + (div_w / 2) * -1 + 'px"><em>' + stepname[i] + '</em></div>');
			} else {
				$divwrap.append('<span class="ui-slider-div n'+ i +'" style="'+ dir +':' + step_w * i + '%; '+ siz +':' + div_w + 'px; margin-'+ dir +':' + (div_w / 2) * -1 + 'px"><em>' + txt_val + ' ' + txt_e2 + '' + txt_s2 + '</em></div>');
			}
			
			sliderstep.push(parseInt(min + (unit_sum * i)));
			if (stepname) {
				if (acc) {
					if (now_s === txt_val) {
						$sel_s.append('<option value="' + txt_val + '" selected>' + stepname[i] + '</option>');
					} else if (now_e < txt_val) {
						$sel_s.append('<option value="' + txt_val + '" disabled>' + stepname[i] + '</option>');
					} else {
						$sel_s.append('<option value="' + txt_val + '">' + stepname[i] + '</option>');
					}
					
					if (now_e === txt_val && range) {
						$sel_e.append('<option value="' + txt_val + '" selected>' + stepname[i] + '</option>');
					} else if (now_s > txt_val && range) {
						$sel_e.append('<option value="' + txt_val + '" disabled>' + stepname[i] + '</option>');
					} else if (range){
						$sel_e.append('<option value="' + txt_val + '">' + stepname[i] + '</option>');
					}
				}
			} else {
				if (acc) {
					if (now_s === txt_val) {
						$sel_s.append('<option value="' + txt_val + '" selected>' + txt_val + '' + opt.unit + ' ' + txt_e2 +'' + txt_s2 + '</option>');
					} else if (now_e < txt_val) {
						$sel_s.append('<option value="' + txt_val + '" disabled>' + txt_val + '' + opt.unit + ' ' + txt_e2 +'' + txt_s2 + '</option>');
					} else {
						$sel_s.append('<option value="' + txt_val + '">' + txt_val + '' + opt.unit + ' ' + txt_e2 +'' + txt_s2 + '</option>');
					}
					
					if (now_e === txt_val && range) {
						$sel_e.append('<option value="' + txt_val + '" selected>' + txt_val + '' + opt.unit + ' ' + txt_e2 +'' + txt_s2 + '</option>');
					} else if (now_s > txt_val && range) {
						$sel_e.append('<option value="' + txt_val + '" disabled>' + txt_val + '' + opt.unit + ' ' + txt_e2 +'' + txt_s2 + '</option>');
					} else if (range){
						$sel_e.append('<option value="' + txt_val + '">' + txt_val + '' + opt.unit + ' ' + txt_e2 +'' + txt_s2 + '</option>');
					}
				}
			}
			
		}
		
		if (acc) {
			$('[data-sliderselect="' + opt.id + '"]').find('.ui-slider-min').on('change', function(){
				per_min = (($(this).val() - min) / (max - min)) * 100;
				per_min = perStep(per_min);
				actSel($(this).find('option:selected').index(), 'min');
				act($btn_s, 'min');
			});
			$('[data-sliderselect="' + opt.id + '"]').find('.ui-slider-max').on('change', function(){
				per_max = (($(this).val() - min) / (max - min)) * 100,
				per_max = perStep(per_max);
				actSel($(this).find('option:selected').index(), 'max');
				act($btn_e, 'max');
			});
		}

		$('body	.ui-slider-wrap button').on('touchmove.uislider', function(e){
			e.preventDefault()
		});

		$btn.off('mousedown.sliderstart touchstart.sliderstart').on('mousedown.sliderstart touchstart.sliderstart', function(e){
			e.preventDefault();
			var $this = $(this),
				minmax = $this.data('btn'),
				moving = false;

			$(doc).off('mousemove.slidermove touchmove.slidermove').on('mousemove.slidermove touchmove.slidermove', function(e){
				moving = true;
				($('html').is('.ui-m')) ? per($this, event, minmax) : per($this, e, minmax);
				sliderTooltip({ now_1:((per_min / step_w) * unit_sum) + min, now_2:((per_max / step_w) * unit_sum) + min, per_min:perStep(per_min), per_max:perStep(per_max) });
				
			}).off('mouseup.sliderend touchcancel.slidermove touchend.slidermove').on('mouseup.sliderend touchcancel.slidermove touchend.slidermove', function(e){
				$this.closest('.ui-slider').find('.ui-slider-wrap button').removeClass('on');
				moving ? act($this, minmax) : '';
				$(doc).off('mousemove.slidermove mouseup.sliderend touchmove.slidermove');
			});
		});
		
		/* 접근성 이슈 : 키보드와 스크리리더기의 키 중복 */
		$btn_s.off('keyup.' + opt.id).on('keyup.' + opt.id, function(e){
			e.preventDefault();
			keyCode = e.keyCode || e.which;
			p = per_min;
			
			var $btnthis = $(this),
				$barthis = $btnthis.closest('.ui-slider').find('.ui-slider-bar');

			if(keyCode == 39 || keyCode == 40) {
				per_min = per_min + step_w;
				if (per_min > per_max) {
					per_min = per_max;
					alert('최대값을 수정하세요');
				} else {
					$btnthis.css(dir, per_min + '%').find('.ui-slider-txt').text(((per_min / step_w) * unit_sum) + min);
					$barthis.css(dir,per_min + '%').css(siz,(per_max - per_min) + '%');
				}
			}
			
			if(keyCode == 37 || keyCode ==  38) {
				per_min = per_min - step_w;
				if (per_min < 0) {
					per_min = 0;
					alert('최소값입니다.');
				} else {
					$btnthis.css(dir, per_min + '%').find('.ui-slider-txt').text(((per_min / step_w) * unit_sum) + min);
					$barthis.css(dir,per_min + '%').css(siz,(per_max - per_min) + '%');
				}
			}
			
			sliderTooltip({ now_1:((per_min / step_w) * unit_sum) + min, now_2:((per_max / step_w) * unit_sum) + min, per_min:per_min, per_max:per_max });
			sliderCallback({ callback:callback, now_1:((per_min / step_w) * unit_sum) + min, now_2:((per_max / step_w) * unit_sum) + min });
		});
		
		$btn_e.off('keyup.' + opt.id).on('keyup.' + opt.id, function(e){
			e.preventDefault();
			keyCode = e.keyCode || e.which;
			p = per_max;
			
			var $btnthis = $(this),
				$barthis = $btnthis.closest('.ui-slider').find('.ui-slider-bar');
			
			if(keyCode == 39 || keyCode == 40) {
				per_max = per_max + step_w;
				if (per_max > 100) {
					per_max = 100;
					alert('최대값입니다');
				} else {
					$btnthis.css(dir, per_max + '%').find('.ui-slider-txt').text(((per_max / step_w) * unit_sum) + min);
					$barthis.css(dir,per_min + '%').css(siz, (per_max - per_min) + '%');
				}
			}
			
			if(keyCode == 37 || keyCode ==  38) {
				per_max = per_max - step_w;
				if (per_max < per_min) {
					per_max = per_min;
					alert('최소값을 수정하세요.');
				} else {
					$btnthis.css(dir, per_max + '%').find('.ui-slider-txt').text(((per_max / step_w) * unit_sum) + min);
					$barthis.css(dir,per_min + '%').css(siz, (per_max - per_min) + '%');
				}
			}
			
			sliderTooltip({ now_1:((per_min / step_w) * unit_sum) + min, now_2:((per_max / step_w) * unit_sum) + min, per_min:per_min, per_max:per_max });
			sliderCallback({ callback:callback, now_1:((per_min / step_w) * unit_sum) + min, now_2:((per_max / step_w) * unit_sum) + min });
		});
		
		function act($this, minmax){
			if (minmax === 'min') {
				per_min = perStep(per_min);
				!range ? $bar.css(siz, per_min + '%').css(dir, 0) : $bar.css(siz, per_max - per_min + '%').css(dir, per_min + '%');
				lmt_min = per_min;
				if (acc) {
					now_sum.forEach(function(v, i){
						(v === ((per_min / step_w) * unit_sum) + min) ? actSel(i, minmax) : '';
					});
				}

				$this.css(dir, per_min + '%').addClass('on').find('.ui-slider-txt').text(((per_min / step_w) * unit_sum) + min);
			} else {
				per_max = perStep(per_max);
				$bar.css(siz, (per_max - per_min) + '%').css(dir,per_min + '%');

				lmt_max = per_max;
				if (acc) {
					now_sum.forEach(function(v, i){
						(v === ((per_max / step_w) * unit_sum) + min) ? actSel(i, minmax): '';
					});
				}
				$this.css(dir, per_max + '%').addClass('on').find('.ui-slider-txt').text(((per_max / step_w) * unit_sum) + min);
			}

			sliderTooltip({ now_1: ((per_min / step_w) * unit_sum) + min, now_2: ((per_max / step_w) * unit_sum) + min, per_min: per_min, per_max: per_max });
			sliderCallback({ callback:callback, now_1:Number(((per_min / step_w) * unit_sum) + min), now_2:Number(((per_max / step_w) * unit_sum) + min) });
		}
		function actSel(n, minmax){
			if (minmax === 'min') {
				range ? $sel_e.find('option').removeAttr('disabled') : '';
				$sel_s.find('option').eq(n).prop('selected', 'selected');
				range ? $sel_e.find('option:lt('+ n +')').prop('disabled', 'disabled') : '';
			} else {
				$sel_s.find('option').removeAttr('disabled');
				$sel_e.find('option').eq(n).prop('selected', 'selected');
				$sel_s.find('option:gt('+ n +')').prop('disabled', 'disabled');
			}
		}
		function perStep(v){
			var n = ((v % step_w) >= step_w / 2) ? 1 : 0;
			return (Math.floor(v / step_w) + n) * step_w;
		}
		function per($this, e, minmax){
			var value_l;
			slider_w = !vertical ? $bg.outerWidth() : $bg.outerHeight();
			if (!vertical) {
				if (e.touches !== undefined) {
					value_l = e.touches[0].pageX - $bg.offset().left - 0;
				}
				if (e.touches === undefined) {
					if (e.pageX !== undefined) {
						value_l = e.pageX - $bg.offset().left - 0;
					}
					//ie
					if (e.pageX === undefined) {
						value_l = e.clientX - $bg.offset().left - 0;
					}
				}
			} else {
				if (e.touches !== undefined) {
					value_l = e.touches[0].pageY - $bg.offset().top - 0;
				}
				if (e.touches === undefined) {
					if (e.pageX !== undefined) {
						value_l = e.pageY - $bg.offset().top - 0;
					}
					//ie
					if (e.pageX === undefined) {
						value_l = e.clientY - $bg.offset().top - 0;
					}
				}
			}

			p = (value_l <= 0) ? 0 : (value_l >= slider_w) ? slider_w - 0 : value_l;
			p = (p / slider_w) * 100;
			rev ? p = 100 - p : ''; 
			p > 50 ? Math.floor(p/10) * 10 : Math.ceil(p/10) * 10;
			p = p.toFixed(0);
			p = p < 0 ? 0 : p > 100 ? 100 : p;


			if (minmax === 'min') {
				lmt_min = 0;
				isNaN(lmt_max) ? lmt_max = per_max : '';
				p * 1 >= lmt_max * 1 ? p = lmt_max: '';
				per_min = p; 
				!range ? $bar.css(siz, per_min + '%').css(dir, 0) : $bar.css(siz, lmt_max - per_min + '%').css(dir, per_min + '%');
			}  
			 
			if (minmax === 'max') {
				lmt_max = 100;
				isNaN(lmt_min) ? lmt_min = per_min : '';
				p * 1 <= lmt_min * 1 ? p = lmt_min: '';
				per_max = p;
				$bar.css(siz, per_max - per_min + '%');
			}
			$this.css(dir, p + '%');
		}

		function sliderCallback(opt){
			$(doc).off('mouseup.sliderend touchcancel.slidermove touchend.slidermove');
			opt.callback ? opt.callback({ id:id, per_min:per_min, per_max:per_max, min: opt.now_1, max: opt.now_2 }) : '';
		}

		function sliderTooltip(opt){
			var $tooltip = $('#' + id).find('.ui-slider-tooltip'),
				tooltip_w, 
				bar_w,
				timer, 
				per_min = opt.per_min,
				per_max = opt.per_max,
				n_min = opt.now_1,
				n_max = opt.now_2,
				in_s = (per_min === 0) ? txt_s : '',
				in_e = (per_max === 100) ? txt_e : '',
				in_se = (per_min === 0) ? txt_s : (per_max === 100) ? txt_e : '';

			!range ? in_e = (per_min === 100) ? txt_e : '' : '';

			if (per_min === 0 && per_max === 100) {
				$tooltip.text('전체');
			} else if (n_min === n_max) {
				$tooltip.text(n_min.toFixed(0) + '' + unit + ' ' + in_se);
			} else {
				if (!range) {
					$tooltip.text(n_min.toFixed(0) + '' + unit + '' + in_s + '' + in_e);
				} else {
					$tooltip.text(n_min.toFixed(0) + '' + unit + '' + in_s + ' ~ '+ n_max.toFixed(0) + '' + unit + '' + in_e);
				}
			}

			clearTimeout(timer);
			timer = setTimeout(function(){
				var tt_l, tt_ml;

				if (!vertical) {
					tooltip_w = $tooltip.outerWidth();
					bar_w = $('#' + id).find('.ui-slider-bar').outerWidth();
				} else {
					tooltip_w = $tooltip.outerHeight();
					bar_w = $('#' + id).find('.ui-slider-bar').outerHeight();
				}

				if (!range) {
					tt_l = per_min + '%';
					tt_ml = (per_min === 0) ? 0 : (per_min === 100) ? tooltip_w * -1 : (tooltip_w / 2) * -1;
				} else {
					if (per_min === 0 && tooltip_w > bar_w) {
						tt_l = '0%';
						tt_ml = 0;
					} else if (per_max === 100 && tooltip_w > bar_w) {
						tt_l = '100%';
						tt_ml = tooltip_w * -1;
					} else {
						tt_l = per_min + ((per_max - per_min)/ 2) + '%';
						tt_ml = (tooltip_w / 2) * -1;
					}
				}

				$tooltip.css(dir, tt_l).css('margin-' + dir, tt_ml);
			},0);
		}
	}

})(jQuery, window, document);