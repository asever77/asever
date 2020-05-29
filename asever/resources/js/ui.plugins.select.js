;(function ($, win, doc, undefined) {

	'use strict';

	var $ui = win.$plugins,
        namespace = 'netiveUI.plugins';

	/* ------------------------------------------------------------------------
	* name : select(radio & checkbox)
	* Ver. : v1.0.0
	* date : 2018-12-21
	* EXEC statement
	* - $plugins.uiSelect({ option });
	* - $plugins.uiSelectAct({ option });
	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {
		uiSelect: function (opt) {
			return createUiSelect(opt);
		},
		uiSelectAct: function (opt) {
			return createUiSelectAct(opt);
		}
	});
	$ui.uiSelect.option = {
		id: false, 
		current: null,
		customscroll: true,
		vchecktype: false,
		callback: false
	};
	function createUiSelect(opt) {
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, $ui.uiSelect.option, opt),
			current = opt.current,
			callback = opt.callback,
			customscroll = opt.customscroll,
			vchecktype = opt.vchecktype,
			id = opt.id,
			is_id = id === false ? false : true,
			$ui_select = is_id ? typeof id === 'string' ? $('#' + opt.id).closest('.ui-select') : id.find('.ui-select') : $('.ui-select'),

			keys = $ui.option.keys,
			len = $ui_select.length,

			_disabled = false,
			_selected = false,
			_hidden = false,
			_val = '',
			_txt = '',
			_hid = '',
			hiddenCls = '',

			$sel,
			$sel_current,
			$opt,
			$opt_current,
			optSet,

			sel_id,
			list_id,
			opt_id,
			opt_id_selected,
			sel_n,
			sel_tit,
			sel_dis,
			opt_len,

			id_opt,
			id_optname,
			idx,
			timer_opt,
			timer,
			_option_wrap = '';

		//init
		$ui.browser.mobile ? customscroll = false : '';

		$ui_select.find('.ui-select-btn').remove();
		$ui_select.find('.ui-select-wrap').remove();
		$ui_select.find('.dim').remove();

		//select set
		for (var i = 0; i < len; i++) {
			$sel_current = $ui_select.eq(i);
			$sel = $sel_current.find('select');
			sel_id = $sel.attr('id');
			list_id = sel_id + '_list';
			sel_dis = $sel.prop('disabled');
			sel_tit = $sel.attr('title');
			_hid = '';

			(!$sel.data('callback') || !!callback) ? $sel.data('callback', callback) : '';

			customscroll
				? _option_wrap += '<div class="ui-select-wrap ui-scrollbar" id="' + sel_id + '_scroll" style="min-width:' + $sel_current.outerWidth() + 'px">'
				: _option_wrap += '<div class="ui-select-wrap" style="min-width:' + $sel_current.outerWidth() + 'px">';

			$ui.browser.mobile ?
				_option_wrap += '<div class="ui-select-opts" role="listbox" id="' + list_id + '" aria-hidden="false">' :
				customscroll ?
					_option_wrap += '<div class="ui-select-opts ui-scrollbar-item" role="listbox" id="' + list_id + '" aria-hidden="false" tabindex="-1">' :
					_option_wrap += '<div class="ui-select-opts" role="listbox" id="' + list_id + '" aria-hidden="false" tabindex="-1">';

			optSet = function (t){
				(t !== undefined) ? $sel = $(t).closest('.ui-select').find('select') : '';
				$opt = $sel.find('option');
				opt_len = $opt.length;
				sel_id = $sel.attr('id');
				opt_id = sel_id + '_opt';

				for (var j = 0; j < opt_len; j++) {
					$opt_current = $opt.eq(j);
					_hidden = $opt_current.prop('hidden');

					if (current !== null) {
						if (current === j) {
							_selected = true;
							$opt_current.prop('selected', true).attr('selected');
						} else {
							_selected = false;
							$opt_current.prop('selected', false).removeAttr('selected');
						}
					} else {
						_selected = $opt_current.prop('selected');
					}

					_disabled = $opt_current.prop('disabled');
					_selected ? _val = $opt_current.val() : '';
					_selected ? _txt = $opt_current.text() : '';
					_selected && _hidden ? _hid = 'opt-hidden' : '';
					hiddenCls =  _hidden ? 'hidden' : '';
					_selected ? opt_id_selected = opt_id + '_' + j : '';
					_selected ? sel_n = j : '';
					id_optname = $sel.attr('id') + '_opt';
					id_opt = id_optname + '_' + j;

					if ($ui.browser.mobile) {
						_disabled ?
							_selected ?
								_option_wrap += '<button type="button" role="option" id="' + opt_id + '_' + j + '" class="ui-select-opt disabled selected '+ hiddenCls + '" value="' + $opt_current.val() + '" disabled tabindex="-1">' :
								_option_wrap += '<button type="button" role="option" id="' + opt_id + '_' + j + '" class="ui-select-opt disabled '+ hiddenCls + '" value="' + $opt_current.val() + '" disabled tabindex="-1">' :
							_selected ?
								_option_wrap += '<button type="button" role="option" id="' + opt_id + '_' + j + '" class="ui-select-opt selected '+ hiddenCls + '" value="' + $opt_current.val() + '">' :
								_option_wrap += '<button type="button" role="option" id="' + opt_id + '_' + j + '" class="ui-select-opt '+ hiddenCls + '" value="' + $opt_current.val() + '">';
					} else {
						_disabled ?
							_selected ?
								_option_wrap += '<button type="button" role="option" id="' + opt_id + '_' + j + '" class="ui-select-opt disabled selected '+ hiddenCls + '" value="' + $opt_current.val() + '" disabled tabindex="-1">' :
								_option_wrap += '<button type="button" role="option" id="' + opt_id + '_' + j + '" class="ui-select-opt disabled '+ hiddenCls + '" value="' + $opt_current.val() + '" disabled tabindex="-1">' :
							_selected ?
								_option_wrap += '<button type="button" role="option" id="' + opt_id + '_' + j + '" class="ui-select-opt selected '+ hiddenCls + '" value="' + $opt_current.val() + '" tabindex="-1">' :
								_option_wrap += '<button type="button" role="option" id="' + opt_id + '_' + j + '" class="ui-select-opt '+ hiddenCls + '" value="' + $opt_current.val() + '" tabindex="-1">';
					}

					_option_wrap += '<span class="ui-select-txt">' + $opt_current.text() + '</span>';
					_option_wrap += '</button>';
				}

				if (t !== undefined) {
					$sel.closest('.ui-select').find('.ui-select-opts button').remove();
					$sel.closest('.ui-select').find('.ui-select-opts').append(_option_wrap);
					_option_wrap = '';
					eventFn();
				}
			}
			optSet();

			_option_wrap += '</div>';

			$ui.browser.mobile ? _option_wrap += '<button type="button" class="btn-close"><span>닫기</span></button>' : '';
			$ui.browser.mobile ? _option_wrap += '<div class="dim"></div>' : '';
			_option_wrap += '</div>';

			var html_btn = '<button type="button" class="ui-select-btn '+ _hid +'" id="' + sel_id + '_inp" role="combobox" aria-autocomplete="list" aria-owns="' + list_id + '" aria-haspopup="true" aria-expanded="false" aria-activedescendant="' + opt_id_selected + '" data-n="' + sel_n + '" data-id="' + sel_id + '"';
			!!vchecktype
				? html_btn += ' vchecktype=' + vchecktype + '>' + _txt + '</button>'
				: html_btn += '>' + _txt + '</button>';

			$sel_current.append(html_btn);
			$sel.addClass('off').attr('aria-hidden', true).attr('tabindex', -1);
			$sel_current.append(_option_wrap);
			sel_dis ? $sel_current.find('.ui-select-btn').prop('disabled', true).addClass('disabled') : '';
			_option_wrap = '';
			html_btn = '';
		}

		//event
		eventFn();
		function eventFn(){
			$(doc).off('click.dim').on('click.dim', '.dim-dropdown', function () {
				if ($('body').data('select-open')) {
					optBlur();
				}
			});
			$('.ui-select-btn').off('click.ui keydown.ui mouseover.ui focus.ui mouseleave.ui').on({
				'click.ui': selectClick,
				'keydown.ui': selectKey,
				'mouseover.ui': selectOver,
				'focus.ui': selectOver,
				'mouseleave.ui': selectLeave
			});
			$('.ui-select-opt').off('click.ui mouseover.ui').on({
				'click.ui': optClick,
				'mouseover.ui': selectOver
			});
			$('.ui-select-wrap').off('mouseleave.ui').on({ 'mouseleave.ui': selectLeave });
			$('.ui-select-wrap').off('blur.ui').on({ 'blur.ui': optBlur });
			$('.ui-select select').off('change.ui').on({ 'change.ui': selectChange });
			$('.ui-select-label').off('click.ui').on('click.ui', function () {
				var idname = $(this).attr('for');

				setTimeout(function () {
					$('#' + idname + '_inp').focus();
				}, 0);
			});
		}
		function selectLeave() {
			$('body').data('select-open', true);
		}
		function selectChange() {
			$(this).closest('.ui-select').data('fn');
			$ui.uiSelectAct({
				id:$(this).attr('id'),
				current:$(this).find('option:selected').index(),
				callback:$(this).data('callback'), original:true
			});
		}
		function optBlur() {
			optClose();
		}
		function selectClick() {
			optSet(this);
			var $btn = $(this);
			$btn.data('sct', $(doc).scrollTop());
			optExpanded(this);
		}
		function optClick() {
			var t = this,
				sct = $(t).closest('.ui-select').find('.ui-select-btn').data('sct');

			$ui.uiSelectAct({ id: $(t).closest('.ui-select').find('.ui-select-btn').data('id'), current: $(t).index() })
			$(t).closest('.ui-select').find('.ui-select-btn').focus();
			optClose();
			//$ui.uiScroll({ value: sct, speed: 200 });
		}
		function selectOver() {
			$('body').data('select-open', false);
		}
		function selectKey(e) {
			var t = this,
				$btn = $(this),
				id = $btn.data('id'),
				$opt = $('#' + id + '_list').find('.ui-select-opt'),
				$wrap = $('#' + id + '_list').closest('.ui-select-wrap'),
				n = Number($('#' + id + '_list').find('.selected').index()),
				nn,
				wrap_h = $wrap.outerHeight(),
				len = $opt.length,
				n_top = 0;

			if (e.altKey) {
				if (e.keyCode === keys.up) {
					optOpen(t);
				}
				e.keyCode === keys.down && optClose();
				return;
			}

			switch (e.keyCode) {
				case keys.up:
				case keys.left:
					nn = n - 1 < 0 ? 0 : n - 1;
					n_top = $opt.eq(nn).position().top;
					optScroll($wrap, n_top, wrap_h, 'up');
					optPrev(e, id, n, len);
					break;

				case keys.down:
				case keys.right:
					nn = n + 1 > len - 1 ? len - 1 : n + 1;
					n_top = $opt.eq(nn).position().top;
					optScroll($wrap, n_top, wrap_h, 'down');
					optNext(e, id, n, len);
					break;
			}
		}
		function optExpanded(t) {
			if ($ui.browser.mobile) {
				optOpen(t)
			} else {
				if ($(t).attr('aria-expanded') === 'false') {
					optClose();
					optOpen(t);
				} else {
					optClose();
				}
			}
		}
		function optScroll($wrap, n_top, wrap_h, key) {
			var oph = 56;
		}
		function optPrev(e, id, n, len) {
			e.preventDefault();
			n === 0 ? n = 0 : n = n - 1;
			$ui.uiSelectAct({ id: id, current: n });
		}
		function optNext(e, id, n, len) {
			e.preventDefault();
			n === len - 1 ? n = len - 1 : n = n + 1;
			$ui.uiSelectAct({ id: id, current: n });
		}
		function optOpen(t) {
			var $body = $('body'),
				_$sel = $(t),
				_$uisel = _$sel.closest('.ui-select'),
				_$wrap = _$uisel.find('.ui-select-wrap'),
				_$opts = _$wrap.find('.ui-select-opts'),
				_$opt = _$opts.find('.ui-select-opt'),

				offtop = _$uisel.offset().top,
				scrtop = $(doc).scrollTop(),
				wraph = _$wrap.outerHeight(),
				btn_h = _$sel.outerHeight(),
				opt_h = _$opt.outerHeight(),
				win_h = $(win).outerHeight(),
				clsname = 'bottom';

			clsname = win_h - ((offtop - scrtop) + btn_h) > wraph ? 'bottom' : 'top';

			$body.addClass('dim-dropdown');
			$body.data('scrolling') === 'yes' ? $ui.uiScrollingCancel() : '';

			$plugins.uiScrollBarReset({
				id: _$wrap.attr('id')
			});
			

			if (!_$sel.data('expanded')) {
				_$sel.data('expanded', true).attr('aria-expanded', true);
				_$uisel.addClass('on');
				_$wrap.addClass('on ' + clsname).attr('aria-hidden', false);
				_$opts.find('.ui-select-opt').eq(_$uisel.find(':checked').index());
				customscroll ? _$wrap.css('min-width', _$opts.outerWidth()) :
					$ui.uiScroll({ target: _$wrap, value: Number(opt_h * _$uisel.find(':checked').index()), speed: 0 });
			}

			if (_$wrap.outerHeight() > _$opts.outerHeight()) {
				_$wrap.css({
					'min-height': _$opts.outerHeight(),
					overflow: 'hidden'
				});
				$plugins.uiScrollBarReset({
					id: _$wrap.attr('id')
				});
			} else {
				customscroll
					? $ui.uiScrollBar({
						id: _$wrap.attr('id'),
						top: _$wrap.find('.selected').index() * _$wrap.find('.ui-select-opt').outerHeight()
					}) : '';
			}
		}

		function optClose() {
			var $body = $('body'),
				$select = $('.ui-select'),
				$btn = $('.ui-select-btn'),
				$wrap = $('.ui-select-wrap');

			$body.data('scrolling') === 'no' ? $ui.uiScrolling() : '';
			$body.removeClass('dim-dropdown');
			$btn.data('expanded', false).attr('aria-expanded', false);
			$select.removeClass('on');
			$wrap.removeClass('on top bottom').attr('aria-hidden', true);
		}
	}
	function createUiSelectAct(opt) {
		var id = typeof opt.id === 'string' ? opt.id : opt.id.attr('id'),
			$uisel = typeof opt.id === 'string' ? $('#' + opt.id).closest('.ui-select') : opt.id.closest('.ui-select'),
			$sel = $('#' + id),
			$opt = $sel.find('option'),
			$opt_ = $uisel.find('.ui-select-opt'),
			callback = opt.callback === undefined ?  $sel.data('callback') === undefined ? false : $sel.data('callback') : opt.callback,
			current = opt.current,
			org = opt.original === undefined ? false : opt.original;

		!org ? $uisel.find('option').prop('selected', false).eq(current).prop('selected', true) : '';
		//!org ? $uisel.find('option').prop('selected', false).eq(current).prop('selected', true).trigger('change') : '';
		//trigger 오류 확인필요


		!$opt.eq(current).prop('hidden')
			? $sel.closest('.ui-select').find('.ui-select-btn').removeClass('opt-hidden')
			: $sel.closest('.ui-select').find('.ui-select-btn').addClass('opt-hidden');
		$uisel.find('.ui-select-btn').text($opt.eq(current).text());
		$opt_.removeClass('selected').eq(current).addClass('selected');

		callback ? callback({ id: id, current: current, val: $opt.eq(current).val() }) : '';
	}

})(jQuery, window, document);