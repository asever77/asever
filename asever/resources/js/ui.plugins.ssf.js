/*
title		: ui.plugins.js
description	: direct pc & mobile. UI Components
Version		: v1.0.0
developer	: 조현민
modify		:
	2018-11-26
	- createUiModal : iframe,ios 일 경우 높이값 설정

	2018-11-27
	- createUiTab : 고정탭번호 추가

*/
; (function ($, win, doc, undefined) {

	'use strict';

	var global = "$plugins",
		namespace = "SSF.plugins",
		isMscroll = !$global.uiCheck.ie8;

	//isMscroll = true;

	if (!!win[global]) {
		throw new Error("already exists global!> " + global);
	}

	/* common(global) 중복 ----------------------------------*/
	win[global] = $global.uiNamespace(namespace, {
		uiAjax: function (opt) { return $global.uiAjax(opt); },
		uiLoading: function (opt) { return $global.uiLoading(opt); }
	});

	/* module */
	win[global] = $global.uiNamespace(namespace, {
		uiAccordion: function (opt) { return createUiAccordion(opt); },
		uiAccordionToggle: function (opt) { return createUiAccordionToggle(opt); },
		uiAllcheck: function (opt) { return createUiAllcheck(opt); },
		uiAllcheckInit: function (opt) { return createUiAllcheckInit(opt); },
		uiAllcheckToggle: function (opt) { return createUiAllcheckToggle(opt); },
		uiCaption: function () { return createUiCaption(); },
		uiCFList: function (opt) { return createUiCFList(opt); },
		uiCodinglist: function (opt) { return createUiCodinglist(opt); },
		uiDatepicker: function (opt) { return createUiDatepicker(opt); },
		uiDropdown: function (opt) { return createUiDropdown(opt); },
		uiDropdownToggle: function (opt) { return createUiDropdownToggle(opt); },
		uiDropdownHide: function (opt) { return createUiDropdownHide(opt); },
		uiError: function (opt) { return createUiError(opt) },
		uiErrorTooltip: function (opt) { return createUiErrorTooltip(opt) },
		uiFileUpload: function (opt) { return createUiFileUpload(opt); },
		uiFloating: function (opt) { return createUiFloating(opt); },
		uiFocusTab: function (opt) { return createUiFocusTab(opt); },
		uiForm: function (opt) { return createUiForm(opt); },
		uiFormCheck: function (opt) { return createUiFormCheck(opt); },
		uiFormDisabled: function (opt) { return createUiFormDisabled(opt); },
		uiHasScrollBar: function (opt) { return createHasScrollBar(opt); },
		uiIframePage: function () { return createUiIframePage(); },
		uiInputCancel: function (opt) { return createUiInputCancel(); },
		uiJsonList: function (opt) { return createUiJsonList(opt); },
		uiLiCheck: function () { return createUiLiCheck(); },
		uiModal: function (opt) { return createUiModal(opt); },
		uiModalClose: function (opt) { return createUiModalClose(opt); },
		uiModalResize: function (opt) { return createUiModalResize(opt); },
		uiModalScrollReset: function (opt) { return createUiModalScrollReset(opt); },
		uiPageStep: function (opt) { return createUiPageStep(opt); },
		uiPageStepSlide: function (opt) { return createUiPageStepSlide(opt); },
		uiParaReplaceState: function (opt) { return createUiParaReplaceState(opt); },
		uiPlaceholder: function () { return createUiPlaceholder(); },
		uiPopup: function (opt) { return createUiPopup(opt); },
		uiPrint: function (opt) { return createUiPrint(opt); },
		uiSearch: function (opt) { return createUiSearch(opt); },
		uiSearchTest: function (opt) { return createUiSearchTest(opt); },
		uiSelSort: function (opt) { return createUiSelSort(opt); },
		uiSelect: function (opt) { return createUiSelect(opt); },
		uiSelectVal: function (opt) { return createUiSelectVal(opt); },
		uiScroll: function (opt) { return createUiScroll(opt); },
		uiShowHide: function (opt) { return createUiShowHide(opt); },
		uiSlide: function (opt) { return createUiSlide(opt); },
		uiSlideFnEvt: function (opt) { return createUiSlideFnEvt(opt); },
		uiSlideFnAuto: function (opt) { return createUiSlideFnAuto(opt); },
		uiTab: function (opt) { return createUiTab(opt); },
		uiTabToggle: function (opt) { return createUiTabToggle(opt); },
		uiTextareaAutoHeight: function () { return createUiTextareaAutoHeight(); },
		uiTblScroll: function () { return createUiTblScroll(); },
		uiTbodyCheck: function () { return createUiTbodyCheck(); },
		uiTooltip: function (opt) { return createUiTooltip(opt); },
		uiTrCheck: function () { return createUiTrCheck(); },
		uiTrEvent: function (opt) { return createUiTrEvent(opt); },
	});

	/* uiAccordion  ---------------------------------- */
	win[global].uiAccordion.option = {
		current: null,
		callback: false,
		autoclose: false,
		state: 'toggle',
		motion: true
	};
	function createUiAccordion(opt) {
		if (!$('#' + opt.id).length) {
			return false;
		}

		var opt = $.extend(true, {}, win[global].uiAccordion.option, opt),
			id = opt.id,
			current = opt.current,
			callback = opt.callback,
			autoclose = opt.autoclose,
			$acco = $('#' + id),
			$wrap = $acco.children('.ui-acco-wrap'),
			$pnl = $wrap.children('.ui-acco-pnl'),
			$tit = $wrap.children('.ui-acco-tit'),
			$btn = $tit.find('.ui-acco-btn'),
			len = $wrap.length,
			i = 0,
			optAcco;

		!$pnl ? $pnl = $tit.children('.ui-acco-pnl') : '';

		$acco.data('opt', { id: id, autoclose: autoclose, callback: callback, state: opt.state, motion: opt.motion });

		for (i = 0; i < len; i++) {
			var $accobtn = $wrap.eq(i).find('> .ui-acco-tit > .ui-acco-btn'),
				$accotit = $wrap.eq(i).find('> .ui-acco-tit'),
				$accopln = $wrap.eq(i).find('> .ui-acco-pnl');

			if (!$accopln) {
				$accopln = $accotit.children('.ui-acco-pnl');
			}

			$accotit.attr('id') === undefined ? $accobtn.attr('id', id + '-btn-' + i) : '';
			$accopln.attr('id') === undefined ? $accopln.attr('id', id + '-pnl-' + i) : '';
			$accobtn
				.data('selected', false)
				.attr('data-n', i)
				.attr('aria-expanded', false)
				.attr('aria-controls', $accopln.attr('id'))
				.removeClass('selected')
				.find('.ui-acco-txt').text('열기');
			$accopln
				.attr('data-n', i)
				.attr('aria-labelledby', $accobtn.attr('id'))
				.attr('aria-hidden', true).hide();
		}

		current !== null ? win[global].uiAccordionToggle({ id: id, current: current, motion: false }) : '';

		$btn.off('click.uiacco').on('click.uiacco', function (e) {
			if (!!$(this).closest('.ui-acco-wrap').find('.ui-acco-pnl').length) {
				e.preventDefault();
				optAcco = $(this).closest('.ui-acco').data('opt');
				win[global].uiAccordionToggle({
					id: optAcco.id,
					current: [$(this).closest('.ui-acco-wrap').index()],
					close: optAcco.close,
					callback: callback,
					motion: optAcco.motion
				});
			}
		});
	}
	function createUiAccordionToggle(opt) {
		var id = opt.id,
			$acco = $('#' + id),
			opt = $.extend(true, {}, $acco.data('opt'), opt),
			dataOpt = $acco.data('opt'),
			current = opt.current,
			callback = opt.callback,
			state = opt.state,
			motion = opt.motion,
			autoclose = opt.autoclose,
			open = null,
			$wrap = $acco.children('.ui-acco-wrap'),
			$pnl = $wrap.eq(current).children('.ui-acco-pnl'),
			$tit = $wrap.eq(current).children('.ui-acco-tit'),
			$btn = $tit.find('.ui-acco-btn'),
			len = $wrap.length,
			speed = 200;

		motion === false ? speed = 0 : speed = 200;

		if (current !== 'all') {
			for (var i = 0; i < current.length; i++) {
				$pnl = $wrap.eq(current[i]).children('.ui-acco-pnl');
				$tit = $wrap.eq(current[i]).children('.ui-acco-tit');
				$btn = $tit.find('.ui-acco-btn');

				if (state === 'toggle') {
					!$btn.data('selected') ? act('down') : act('up');
				} else {
					state === 'open' ? act('down') : state === 'close' ? act('up') : '';
				}
			}
		} else if (current === 'all') {
			checking();
		}

		function checking() {
			var c = 0;
			$wrap.each(function (i) {
				c = ($wrap.eq(i).find('> .ui-acco-tit .ui-acco-btn').attr('aria-expanded') === 'true') ? c + 1 : c + 0;
			});

			if (state === 'open') {
				c = 0;
				$acco.data('allopen', false);
			} else if (state === 'close') {
				c = len;
				$acco.data('allopen', true);
			}

			if (c === 0 || !$acco.data('allopen')) {
				$acco.data('allopen', true);
				act('down');
			} else if (c === len || !!$acco.data('allopen')) {
				$acco.data('allopen', false);
				act('up');
			}
		}
		function act(v) {
			var isDown = v === 'down',
				a = isDown ? true : false,
				cls = isDown ? 'addClass' : 'removeClass',
				updown = isDown ? 'slideDown' : 'slideUp',
				txt = isDown ? '닫기' : '열기',
				c = '';

			open = isDown ? true : false;

			if (autoclose === true && isDown) {
				$wrap.each(function (i) {
					$wrap.eq(i).find('> .ui-acco-tit .ui-acco-btn').data('selected', false).removeClass('selected').attr('aria-expanded', false).find('.ui-acco-txt').text('열기');
					$wrap.eq(i).find('> .ui-acco-pnl').attr('aria-hidden', true).stop().slideUp(speed);
				});
			}

			if (current === 'all') {
				$wrap.each(function (i) {
					$wrap.eq(i).find('> .ui-acco-tit .ui-acco-btn').data('selected', a)[cls]('selected').attr('aria-expanded', a).find('.ui-acco-txt').text(txt);
					$wrap.eq(i).find('> .ui-acco-pnl').attr('aria-hidden', !a).stop()[updown](speed, function () {
						$(this).css({ height: '', padding: '', margin: '' }); // 초기화
					});
				});
			} else {
				$btn.data('selected', a).attr('aria-expanded', a)[cls]('selected').find('.ui-acco-txt').text(txt);
				$pnl.attr('aria-hidden', !a).stop()[updown](speed, function () {
					$(this).css({ height: '', padding: '', margin: '' }); // 초기화
				});
			}

			!callback ? '' :
				callback({
					id: id,
					open: open,
					current: current
				});
		}
	}

	/* uiAllcheck  ---------------------------------- */
	win[global].uiAllcheck.option = {
		checked: null,
		callback: false
	};
	function createUiAllcheck(opt) {
		var opt = $.extend(true, {}, win[global].uiAllcheck.option, opt),
			all_id = opt.id,
			checked = opt.checked,
			callback = opt.callback,
			$btn = $('.ui-allcheck[allcheck-id="' + all_id + '"]'),
			is_checked = $btn.is('.checked'),
			$radio = $('#' + all_id).find('input[type="radio"][ui-agree]'),
			len = $radio.length,
			i = 0,
			n = 0;

		if (!!$btn) {
			$btn.off('click.uiallcheckevt').on('click.uiallcheckevt', function () {
				var $this = $(this),
					allId = $this.attr('allcheck-id');

				// 전체동의 체크만 
				// !!$this.data('checked') ?
				// $this.data('checked', false).attr('aria-checked', false).removeClass('checked').find('.ui-allcheck-txt').remove() :
				// $this.data('checked', true).attr('aria-checked', true).addClass('checked').append('<span class="hide ui-allcheck-txt">선택됨</span>');
				$this.find('.ui-allcheck-txt').length > 0 ? '' :
					$this.data('checked', true).addClass('checked').append('<span class="hide ui-allcheck-txt">선택됨</span>');
				$plugins.uiAllcheckToggle({ id: allId, checked: $this.data('checked'), callback: callback });

				if (!!$this.data('checked')) {
					if (!$this.closest('.ui-modal').length && !$this.closest('.html-iframe').length) {
						$global.uiCheck.mobile ?
							$plugins.uiScroll({ value: $(doc).scrollTop() + $('#' + allId).outerHeight() - 53, speed: 200 }) :
							$plugins.uiScroll({ value: $(doc).scrollTop() + $('#' + allId).outerHeight(), speed: 200 });
					} else {
						if (!$this.closest('.html-iframe').length) {
							window.mCustomScrollbar && isMscroll ?
							$this.closest('.ui-modal-cont').mCustomScrollbar(
								"scrollTo",
								$('#' + allId).offset().top + $('#' + allId).outerHeight(),
								{ scrollInertia: 200, scrollEasing: 'linear', timeout: 0 }
							) :
							win[global].uiScroll({ value: $('#' + allId).offset().top + $('#' + allId).outerHeight(), speed: 200 });	
						} else {
							window.mCustomScrollbar && isMscroll ?
								$this.closest('.wrap-iframe').mCustomScrollbar(
									"scrollTo",
									$('#' + allId).offset().top + $('#' + allId).outerHeight(),
									{ scrollInertia: 200, scrollEasing: 'linear', timeout: 0 }
								) :
								win[global].uiScroll({ value: $('#' + allId).offset().top + $('#' + allId).outerHeight(), speed: 200 });
						}
						
					}
				}
			});
		}

		$radio.off('click.uiallcheck').on('click.uiallcheck', function () {
			n = 0;

			allcheckAct({
				id: $(this).closest('.ui-allcheck-box').attr('id'),
				state: false,
				callback: callback
			});
		});
	}
	function createUiAllcheckToggle(opt) {
		var id = opt.id,
			$btn = $('.ui-allcheck[allcheck-id="' + id + '"]'),
			checked = opt.checked,
			callback = opt.callback === undefined ? false : opt.callback;

		allcheckAct({
			id: id,
			state: checked ? 'check' : 'uncheck',
			callback: callback
		});
		callback ? callback({ id: id, result: checked }) : '';
	}
	function createUiAllcheckInit(opt) {
		var id = opt.id,
			$btn = $('.ui-allcheck[allcheck-id="' + id + '"]'),
			checked = null,
			callback = opt.callback === undefined ? false : opt.callback;

		$btn.removeClass('checked').attr('aria-checked', false);
		$('#' + opt.id).find('input[type="radio"][ui-agree]').each(function () {
			$(this).prop('checked', false);
			$('label[for="' + $(this).attr('id') + '"]').removeClass('checked').attr('aria-checked', false);
		});

		callback ? callback({ id: id, result: checked }) : '';
	}
	function allcheckAct(opt) {
		var id = opt.id,
			v = opt.state,
			callback = opt.callback,
			$radio = $('#' + opt.id).find('input[type="radio"][ui-agree]'),
			len = $radio.length,
			n = 0,
			_$radio;

		for (var i = 0; i < len; i++) {
			_$radio = $radio.eq(i);
			if (_$radio.attr('ui-agree') === 'true') {
				if (!!v) {
					v === 'check' ? win[global].uiFormCheck({ id: _$radio.attr('id'), checked: true }) : '';
				} else {
					_$radio.prop('checked') === true ? n = n + 1 : '';
				}
			} else if (_$radio.attr('ui-agree') === 'false') {
				if (!!v) {
					v === 'uncheck' ? win[global].uiFormCheck({ id: _$radio.attr('id'), checked: true }) : '';
				}
			}
		}
		if (id && !v) {
			if (n === len / 2) {
				callback ? callback({ id: opt.id, result: true }) : '';
				$('[allcheck-id="' + opt.id + '"]').data('checked',true).addClass('checked').append('<span class="hide ui-allcheck-txt">선택됨</span>');
			}
			if (n < (len / 2)) {
				callback ? callback({ id: opt.id, result: false }) : '';
				$('[allcheck-id="' + opt.id + '"]').data('checked',false).removeClass('checked').find('.ui-allcheck-txt').remove();
			}
		}
	}

	/* uiCaption ----------------------------------*/
	function createUiCaption() {
		var $cp = $('.ui-caption');

		$cp.text('');
		$cp.each(function () {
			var $this = $(this),
				$table = $this.closest('table'),
				isthead = !!$table.find('> thead').length,
				$th = $table.find('th'),
				th_len = $th.length,
				i = 0,
				cp_txt = '';

			$table.find('caption').attr('role', 'text');

			if (isthead) {
				$th = $table.find('> thead th');
				th_len = $th.length;
			}

			for (i = 0; i < th_len; i++) {
				$th.eq(i).text() !== '' ? cp_txt += $th.eq(i).text() : '';
				i < th_len - 1 ? cp_txt += ', ' : '';
			}
			$this.text(cp_txt + ' 정보입니다.');
		});
	}

	/* uiCFList ----------------------------------*/
	win[global].uiCFList.json = {};
	function createUiCFList(opt) {
		var id = opt.id;

		$global.uiAjax({
			url: '/vanilla/resources/json/cf.json',
			page: false,
			callback: callback
		});

		function callback(v) {
			win[global].uiCFList.json = v;

			var cfExecel = v,
				len_y = Object.keys(cfExecel).length,
				len_cf = 0,
				year,
				y_name,
				vod_info = {},
				html_pnl = '';

			for (var i = 0; i < len_y; i++) {
				y_name = Object.keys(cfExecel)[i];
				year = cfExecel[y_name];
				len_cf = year.length;

				html_pnl += '<section class="ui-tab-pnl">';
				html_pnl += '<h1 class="hide">' + y_name + '</h1>';
				html_pnl += '<ul class="thumb-list">';

				for (var j = 0; j < len_cf; j++) {
					html_pnl += '<li>';
					html_pnl += '<a href="#" role="button" class="ui-CFList-btn" onclick="$plugins.modal.cfVod(' + i + ', ' + j + ')">';
					html_pnl += '<div class="thumb">';
					html_pnl += '<img src="' + year[j].img + '" alt="">';
					html_pnl += '</div>';
					html_pnl += '</a>';
					html_pnl += '<dl class="info">';
					html_pnl += '<dt>';
					html_pnl += '<a href="#" role="button" class="ui-CFList-btn" onclick="$plugins.modal.cfVod(' + i + ', ' + j + ')">' + year[j].tit + '</a>';
					html_pnl += '</dt>';
					html_pnl += '<dd>';
					html_pnl += '<ul class="bul-round">';
					html_pnl += '<li>광고일자 : ' + year[j].date + '';
					html_pnl += '<li>손보협회심의번호 : ' + year[j].num + '</li>';
					html_pnl += '<li>게시일자 : ' + year[j].update + '</li>';
					html_pnl += '</ul>';
					html_pnl += '</dd>';
					html_pnl += '</dl>';
					html_pnl += '</a>';
					html_pnl += '</li>';
				}

				html_pnl += '</ul>';
				html_pnl += '</section>';
			}

			$('#' + id).append(html_pnl);
			$('.ui-CFList-btn').on('click', function (e) {
				e.preventDefault();
			});

			$plugins.uiTab({
				id: 'exeTab1',
				current: 0
			});
		}
	}

	/* uiDatepicker */
	win[global].uiDatepicker.option = {
		selector : false,
		datesplit: '.',
		callback: false
	};
	function createUiDatepicker(opt) {
		var opt = $.extend(true, {}, win[global].uiDatepicker.option, opt),
			baseOpt = win[global].uiDatepicker.option,
			selector = !opt.selector ? '.ui-datepicker' : '#' + opt.selector,
			$datepicker = $(selector),
			callback = opt.callback,
			date = new Date(),
			dateToday = date,
			dateMonths = new Array('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'),
			weekDay = new Array('일', '월', '화', '수', '목', '금', '토'),
			dateSplit = opt.datesplit,
			calVar;

		!!callback ? $datepicker.data('callback', { callback: callback }) : '';

		function add0(x) {
			return ((x < 10) ? "0" + x : x);
		}
		function textDate(d, m, y, whatday) {
			var td = new Date(y, m - 1, d);

			if (whatday === true) {
				return (td.getFullYear() + dateSplit + dateMonths[td.getMonth()] + dateSplit + add0(td.getDate()) + " (" + weekDay[td.getDay()] + ")");
			} else {
				return (td.getFullYear() + dateSplit + dateMonths[td.getMonth()] + dateSplit + add0(td.getDate()));
			}
		}
		function subtractDate(oneDate, anotherDate) {
			return (anotherDate - oneDate);
		}
		function toShortDate(d) {
			var d = new Date(d);

			return (add0(d.getDate()) + dateSplit + add0(d.getMonth() + 1) + dateSplit + d.getFullYear());
		}
		function writeInputDateValue(cObj, obj) {
			var d = $(obj).data("day"),
				v = cObj.inputId,
				$v = $("#" + v);

			(cObj.shortDate) ? d = toShortDate(d) : '';
			$v.val(d).trigger('blur');

			if ($v.closest('.ui-datepicker').data('callback')) {
				var cb = $v.closest('.ui-datepicker').data('callback');
				cb.callback({ id: v, value: d });
			}

			hideCalendar(cObj);
		}
		function calendarObject(opt) {
			this.calId = opt.calId;
			this.inputId = opt.inputId;
			this.buttonId = opt.buttonId;
			this.shortDate = false;
		}
		function matchToday() {
			$('.tbl-datepicker button').each(function () {
				var $this = $(this);

				($this.data('day') == $('.datepicker-wrap .today button.today').data('day')) ? $this.attr('title', $this.attr('title') + ' (오늘)').addClass('today') : '';
			});
		}

		function buildCalendar(date, calendarEl, v) {
			var input_val = $('#' + calendarEl.inputId).val(),
				nVal = input_val.split(dateSplit),
				v = v === 'generate' ? true : false,
				day = !v ? date.getDate() : input_val === '' ? date.getDate() : Number(nVal[2]),
				month = !v ? date.getMonth() : input_val === '' ? date.getMonth() : Number(nVal[1] - 1),
				year = !v ? date.getFullYear() : input_val === '' ? date.getFullYear() : Number(nVal[0]),
				thisMonth = new Date(year, month, 1),
				nextMonth = new Date(year, month + 1, 1),
				firstWeekDay = thisMonth.getDay(),
				daysInMonth = Math.floor((nextMonth.getTime() - thisMonth.getTime()) / (1000 * 60 * 60 * 24)),
				$input = $('#' + calendarEl.inputId).eq(0),
				tit = $input.attr('title'),
				_minDay = new Array(),
				_maxDay = new Array(),
				_calendarHtml = '',
				_isOver = false,
				mm = nextMonth.getMonth(),
				week_day;

			$input.data('min') !== undefined ? _minDay = $input.data('min').split(dateSplit, 3) : ''; // 최소 선택 가능
			$input.data('max') !== undefined ? _maxDay = $input.data('max').split(dateSplit, 3) : ''; // 최대 선택 가능
			month == 2 ? daysInMonth = 31 : '';

			mm < 1 ? mm = 12 : '';
			mm = add0(mm);
			week_day = firstWeekDay;

			_calendarHtml += '<div id="' + calendarEl.calId + '" class="datepicker-wrap">';

			_calendarHtml += '<div class="datepicker-head">';
			_calendarHtml += '<div class="datepicker-head-tit">' + tit + '</div>';
			_calendarHtml += '<div class="datepicker-head-btn">';

			(year < _minDay[0]) || (year == _minDay[0] && dateMonths[month] <= _minDay[1]) ?
				_calendarHtml += '<button type="button" class="ui-datepicker-prev-y disabled" disabled><em class="hide">이전 년도 이동</em></button>' :
				_calendarHtml += '<button type="button" class="ui-datepicker-prev-y"><em class="hide">이전 년도 이동</em></button>';

			(year < _minDay[0]) || (year == _minDay[0] && dateMonths[month] <= _minDay[1]) ?
				_calendarHtml += '<button type="button" class="ui-datepicker-prev disabled" disabled><em class="hide">이전 ' + dateMonths[(month === 0) ? 11 : month - 1] + ' 월로 이동</em></button>' :
				_calendarHtml += '<button type="button" class="ui-datepicker-prev"><em class="hide">이전 ' + dateMonths[(month === 0) ? 11 : month - 1] + ' 월로 이동</em></button>';

			_calendarHtml += '<div class="datepicker-head-date">';
			_calendarHtml += '<span class="year" data-y="' + year + '" role="text"><strong>' + year + '<i>년</i></strong><span class="hide"> - 선택된 년도</span></span>';
			_calendarHtml += '<span class="month" data-m="' + dateMonths[month] + '" role="text"><strong>' + dateMonths[month] + '<i>월</i></strong><span class="hide"> - 선택된 월</span></span>';
			_calendarHtml += '</div>';

			(year > _maxDay[0]) || (year == _maxDay[0] && dateMonths[month] >= _maxDay[1]) ?
				_calendarHtml += '<button type="button" class="ui-datepicker-next disabled" disabled><em class="hide">다음 ' + dateMonths[(month == 11) ? 0 : month + 1] + ' 월로 이동</em></button>' :
				_calendarHtml += '<button type="button" class="ui-datepicker-next"><em class="hide">다음 ' + dateMonths[(month == 11) ? 0 : month + 1] + ' 월로 이동</em></button>';

			(year > _maxDay[0]) || (year == _maxDay[0] && dateMonths[month] >= _maxDay[1]) ?
				_calendarHtml += '<button type="button" class="ui-datepicker-next-y disabled" disabled><em class="hide">다음 년도 이동</em></button>' :
				_calendarHtml += '<button type="button" class="ui-datepicker-next-y"><em class="hide">다음 년도 이동</em></button>';


			_calendarHtml += '</div>';

			_calendarHtml += '<div class="today"><button type="button" class="today" disabled data-day=' + textDate(dateToday.getDate(), dateToday.getMonth() + 1, dateToday.getFullYear(), false) + '><span class="hide">오늘<em> - 해당 년/월로 이동</em></span></button></div>';
			_calendarHtml += '</div>';

			_calendarHtml += '<div class="datepicker-core">';
			_calendarHtml += '<table class="tbl-datepicker">';
			_calendarHtml += '<caption>' + tit + ' 날짜 선택 양식입력 테이블</caption>';
			_calendarHtml += '<thead><tr><th scope="col"><abbr title="일요일">일</abbr></th><th scope="col"><abbr title="월요일">월</abbr></th><th scope="col"><abbr title="화요일">화</abbr></th><th scope="col"><abbr title="수요일">수</abbr></th><th scope="col"><abbr title="목요일">목</abbr></th><th scope="col"><abbr title="금요일">금</abbr></th><th scope="col" class="weekend"><abbr title="토요일">토</abbr></th></tr></thead>';

			_calendarHtml += '<tbody>';
			_calendarHtml += '<tr>';

			for (var week = 0; week < firstWeekDay; week++) {
				if (week === 0) {
					_calendarHtml += '<td>&nbsp;</td>';
				} else if (week == 6) {
					_calendarHtml += '<td>&nbsp;</td>';
				} else {
					_calendarHtml += '<td>&nbsp;</td>';
				}
			}

			for (var dayCounter = 1; dayCounter <= daysInMonth; dayCounter++) {
				week_day %= 7;
				week_day === 0 ? daysInMonth - dayCounter < 7 ? _calendarHtml += '</tr>' : _calendarHtml += '</tr><tr>' : '';

				if (week_day === 0) {
					_calendarHtml += '<td>';
				} else if (week_day == 6) {
					_calendarHtml += '<td>';
				} else {
					_calendarHtml += '<td>';
				}

				if ((year < _minDay[0]) || (year == _minDay[0] && dateMonths[month] < _minDay[1]) || (year == _minDay[0] && dateMonths[month] == _minDay[1] && dayCounter < _minDay[2])) {
					_isOver = true;
					_calendarHtml += '<span title="' + textDate(dayCounter, mm, year, true) + '">' + add0(dayCounter) + '</span></td>';
				} else if ((year > _maxDay[0]) || (year == _maxDay[0] && dateMonths[month] > _maxDay[1]) || (year == _maxDay[0] && dateMonths[month] == _maxDay[1] && dayCounter > _maxDay[2])) {
					_isOver = true;
					_calendarHtml += '<span title="' + textDate(dayCounter, mm, year, true) + '">' + add0(dayCounter) + '</span></td>';
				} else {
					_isOver = false;
					_calendarHtml += '<button type="button" title="' + textDate(dayCounter, mm, year, true) + '" data-day="' + textDate(dayCounter, mm, year, false) + '" value="' + dayCounter + '">' + add0(dayCounter) + '</button>';
					_calendarHtml += '</td>';
				}
				week_day++;
			}

			for (week_day = week_day; week_day < 7; week_day++) { // 빈 셀 채우기
				if (week_day === 0) {
					_calendarHtml += '<td>&nbsp;</td>';
				} else if (week_day == 6) {
					_calendarHtml += '<td>&nbsp;</td>';
				} else {
					_calendarHtml += '<td class="empty">&nbsp;</td>';
				}
			}

			_calendarHtml += '</tbody></table></div>';

			$global.uiCheck.mobile ?
				_calendarHtml += '<button type="button" class="btn-close ui-datepicker-close"><em>날짜 선택창 닫기</em></button>' : '';

			_calendarHtml += '</div>';
			return _calendarHtml;
		}

		function displayCalendar(calendarEl, v) {
			$("#" + calendarEl.calId).empty().append(buildCalendar(date, calendarEl, v));

			win[global].uiFocusTab({ selector: $("#" + calendarEl.calId), type: 'hold' });

			var $calWrap = $('#' + calendarEl.calId),
				timer,
				focusname;

			timer = setTimeout(function () {
				focusname = $calWrap.closest('.ui-datepicker').data('focus');
				focusname !== undefined ? $calWrap.find('.' + focusname).focus() : '';
				focusname = undefined;
			}, 0);

			$calWrap.find('.ui-datepicker-prev').off('click.uidprev').on('click.uidprev', function (e) {
				e.preventDefault();
				var $currentDate = $(this).closest('.datepicker-head').find('.datepicker-head-date'),
					_y = Number($currentDate.find('.year').data('y')),
					_m = Number($currentDate.find('.month').data('m') - 1),
					dateTemp = new Date(_y, _m - 1, 1);

				if ($(this).hasClass('disabled')) {
					alert($('#' + calendarEl.inputId).data('min') + ' 을 벗어난 달은 선택이 불가능 합니다.');
				} else {
					date = dateTemp;
					$(this).closest('.ui-datepicker').data('focus', 'ui-datepicker-prev');
					displayCalendar(calendarEl);
				}
				$(this).eq(0).focus();
				return false;
			});

			$calWrap.find('.ui-datepicker-next').off('click.uidnext').on('click.uidnext', function (e) {
				e.preventDefault();
				var $currentDate = $(this).closest('.datepicker-head').find('.datepicker-head-date'),
					_y = Number($currentDate.find('.year').data('y')),
					_m = Number($currentDate.find('.month').data('m') - 1),
					dateTemp = new Date(_y, _m + 1, 1);

				if ($(this).hasClass('disabled')) {
					alert($('#' + calendarEl.inputId).data('max') + ' 을 벗어난 달은 선택이 불가능 합니다.');
				} else {
					date = dateTemp;
					$(this).closest('.ui-datepicker').data('focus', 'ui-datepicker-next');
					displayCalendar(calendarEl);
				}
				$(this).eq(0).focus();
				return false;
			});

			$calWrap.find('.ui-datepicker-prev-y').off('click.uidprev').on('click.uidprev', function (e) {
				e.preventDefault();
				var $currentDate = $(this).closest('.datepicker-head').find('.datepicker-head-date'),
					_y = Number($currentDate.find('.year').data('y')),
					_m = Number($currentDate.find('.month').data('m') - 1),
					dateTemp = new Date(_y - 1, _m, 1);

				if ($(this).hasClass('disabled')) {
					alert($('#' + calendarEl.inputId).data('min') + ' 을 벗어난 년도는 선택이 불가능 합니다.');
				} else {
					date = dateTemp;
					$(this).closest('.ui-datepicker').data('focus', 'ui-datepicker-prev-y');
					displayCalendar(calendarEl);
				}
				$(this).eq(0).focus();
				return false;
			});

			$calWrap.find('.ui-datepicker-next-y').off('click.uidnext').on('click.uidnext', function (e) {
				e.preventDefault();
				var $currentDate = $(this).closest('.datepicker-head').find('.datepicker-head-date'),
					_y = Number($currentDate.find('.year').data('y')),
					_m = Number($currentDate.find('.month').data('m') - 1),
					dateTemp = new Date(_y + 1, _m, 1);

				if ($(this).hasClass('disabled')) {
					alert($('#' + calendarEl.inputId).data('max') + ' 을 벗어난 년도는 선택이 불가능 합니다.');
				} else {
					date = dateTemp;
					$(this).closest('.ui-datepicker').data('focus', 'ui-datepicker-next-y');
					displayCalendar(calendarEl);
				}
				$(this).eq(0).focus();
				return false;
			});

			$(".ui-datepicker-close").off('click.uidclose').on('click.uidclose', function (e) {
				var $btn = $(this).closest('.ui-datepicker').find('.ui-datepicker-btn');
				$plugins.uiDropdownToggle({ id: $btn.attr('id'), eff: 'st', ps: 'bl', expanded: true });
				$btn.focus();

				win[global].uiScroll({ value: $btn.data('sct'), speed: 200 });
			});
			$calWrap.find('td button').off('click.uidday').on('click.uidday', function (e) {
				e.preventDefault();
				var $btn = $(this).closest('.ui-datepicker').find('.ui-datepicker-btn');

				writeInputDateValue(calendarEl, $(this));
				$plugins.uiDropdownToggle({ id: $btn.attr('id'), eff: 'st', ps: 'bl', expanded: true });
				$btn.focus();
				hideCalendar(calendarEl);
				return false;
			});

			$calWrap.find('button.hidden').off('click.uidatepicker').on('click.uidatepicker', function (e) {
				e.preventDefault();
				hideCalendar(calendarEl);
				$("#" + calendarEl.buttonId).eq(0).focus();
			});

			$calWrap.find('.today button').off('click.uidatepicker').on('click.uidatepicker', function (e) {
				e.preventDefault();
				date = new Date();
				displayCalendar(calendarEl);
				$calWrap.find('td button.today').eq(0).focus();
			});

			var _btnOffset = $("#" + calendarEl.buttonId).offset();
			matchToday();

			return false;
		}

		function hideCalendar(calendarEl) {
			$("#" + calendarEl.calId).animate({
				opacity: 0
			}, 300, function () {
				$(this).remove();
			});
			var $target = $('#' + $("#" + calendarEl.buttonId).data('inp'));
			$target.focus();
			return false;
		}

		$datepicker.each(function (opt) {
			var $this = $(this),
				$btn = $(this).find('.ui-datepicker-btn');

			callback = !!$this.data('callback') ? $this.data('callback') : (opt === undefined || opt.callback === undefined) ? baseOpt.callback : opt.callback;
			win[global].uiDropdown({ id: $btn.attr('id'), eff: 'st', ps: 'bc' });
			$global.uiCheck.mobile ?
				$('#' + $btn.data('inp')).prop('readonly', true) : '';
		});

		$datepicker.find('.ui-datepicker-btn').off('focus.datepicker mouseover.datepicker').on('focus.datepicker mouseover.datepicker', function (e) {
			var $this = $(this),
				dropid = $this.attr('id'),
				_ps = 'bc',
				_ef = 'st';

			if ($(doc).outerHeight() - $this.offset().top - 205 > 350) {
				_ps = 'bc';
				_ef = 'st';
				$('#' + dropid + '_pnl').addClass('type-bottom').removeClass('type-top');
			} else {
				_ps = 'tc';
				_ef = 'sb';
				$('#' + dropid + '_pnl').addClass('type-top').removeClass('type-bottom');
			}
			$this.attr('ps', _ps).attr('eff', _ef);
			!$this.hasClass('selected') ? win[global].uiDropdown({ id: dropid, eff: _ef, ps: _ps }) : '';
		});

		$datepicker.find('.ui-datepicker-btn').off('click.datepicker').on('click.datepicker', function (e) {
			e.preventDefault();

			var $this = $(this),
				dropid = $this.attr('id'),
				inputId = $this.data('inp'),
				regExp = /^([0-9]{4}).([0-9]{2}).([0-9]{2})/g,
				_val = $('#' + inputId).val(),
				reset = regExp.test(_val),
				calspaceHTML;

			$this.data('sct', $(doc).scrollTop());
			!reset ? $('#' + inputId).val('') : '';
			//win[global].uiDropdownHide({ id:dropid });
			$this.closest('.ui-datepicker').find('.datepicker-sec').remove();
			calVar = new calendarObject({
				calId: 'calWrap_' + dropid,
				inputId: inputId,
				buttonId: 'calBtn_' + dropid
			});

			calspaceHTML = '<div class="datepicker-sec" id="' + calVar.calId + '"></div>';
			$this.closest('.ui-datepicker').find('.ui-datepickr-wrap').append(calspaceHTML);
			displayCalendar(calVar, 'generate');
			$datepicker.find('.tbl-datepicker button[data-day="' + $('#' + inputId).val() + '"]').addClass('selected').attr('aria-selected', true);
		});

	}

	/* uidropdown */
	win[global].uiDropdown.openId = '';
	win[global].uiDropdown.option = {
		eff: 'base',
		ps: 'bl',
		dim: false,
		offset: false,
		focus: 'hold',
		expanded: null,
		callback: false
	};
	function createUiDropdown(opt) {
		if (opt === undefined) {
			return false;
		}

		var opt = $.extend(true, {}, win[global].uiDropdown.option, opt),
			id = opt.id,
			$btn = $('#' + id),
			$pnl = $('[data-id="' + id + '"]'),
			eff = opt.eff,
			ps = opt.ps,
			dim = opt.dim,
			offset = opt.offset,
			fc = opt.focus,
			expanded = opt.expanded === null ? $btn.data('expanded') : opt.expanded,
			callback = opt.callback,
			timer;

		$global.uiCheck.mobile ? dim = true : '';
		//set up
		$btn.attr('aria-haspopup', true).data('expanded', false).data('opt', { id: id, eff: eff, ps: ps, offset: offset, dim: dim, expanded: expanded, focus: fc });
		$pnl.attr('aria-hidden', true).addClass(ps).data('opt', { id: id, eff: eff, ps: ps, offset: offset, dim: dim, expanded: expanded, foccus: fc });

		//event
		$btn.off('click.dropdown').on('click.dropdown', function (e) {
			var _opt = $(this).data('opt'),
				__ps = $(this).attr('ps'),
				__ef = $(this).attr('eff');

			$(this).data('sct', $(doc).scrollTop());

			if (!$(this).closest('.ui-drop-pnl').length) {
				win[global].uiDropdownHide({ id: $(this).attr('id') });
			}

			win[global].uiDropdownToggle({
				id: _opt.id,
				eff: __ef !== undefined ? __ef : _opt.eff,
				ps: __ps !== undefined ? __ps : _opt.ps,
				offset: _opt.offset,
				dim: _opt.dim,
				expanded: $(this).data('expanded'),
				callback: callback
			});
		});

		$('.ui-drop-close').off('click.dropclose').on('click.dropclose', function (e) {
			var $pnl_ = $(this).closest('.ui-drop-pnl'),
				thisOpt = $('#' + $pnl_.data('id')).data('opt');

			thisOpt.ing = false;
			thisOpt.expanded = true;

			win[global].uiDropdownToggle(thisOpt);
			$('#' + $pnl_.data('id')).focus();
		});
	}

	function createUiDropdownToggle(opt) {
		win[global].uiDropdown.openId = opt.id
		var id = opt.id,
			$btn = $('#' + id),
			$pnl = $('.ui-drop-pnl[data-id="' + id + '"]'),
			$btns = $('.ui-drop'),
			$pnls = $('.ui-drop-pnl'),
			expanded = opt.expanded,
			dim = opt.dim,
			ps = opt.ps !== undefined ? opt.ps : !!$btn.data('opt').ps ? $btn.data('opt').ps : 'bl',
			eff = opt.eff !== undefined ? opt.eff : !!$btn.data('opt').eff ? $btn.data('opt').eff : 'base',
			fc = opt.focus !== undefined ? opt.focus : !!$btn.data('opt').focus ? $btn.data('opt').focus : false,
			offset = opt.offset === undefined ? false : opt.offset,
			callback = opt.callback === undefined ? false : opt.callback,
			modal_is = !!$btn.closest('.ui-modal').length,
			btn_w = Math.ceil($btn.outerWidth()),
			btn_h = Math.ceil($btn.outerHeight()),
			btn_t = Math.ceil($btn.position().top),
			btn_l = Math.ceil($btn.position().left),
			pnl_w = Math.ceil($pnl.outerWidth()),
			pnl_h = Math.ceil($pnl.outerHeight()),
			scrtop = $(doc).scrollTop(),
			timer,
			eff1 = 10,
			eff2 = 100,
			timer;

		//offset -> position
		if (offset || modal_is) {
			btn_t = Math.ceil($btn.offset().top);
			btn_l = Math.ceil($btn.offset().left);
			modal_is ? btn_t = btn_t - $(win).scrollTop() : '';
		}

		//test 용
		!!$btn.attr('data-ps') ? ps = $btn.attr('data-ps') : '';

		expanded === false ? pnlShow() : pnlHide();

		function pnlShow() {
			var org_t,
				org_l,
				offtop = $btn.offset().top,
				btnh = $btn.outerHeight(),
				winh = $(win).outerHeight();

			$('body').addClass('dim-dropdown');
			$('.ui-drop').removeClass('selected');
			$btn.data('expanded', true).addClass('selected');
			$pnl.attr('aria-hidden', false);
			$pnl.closest('.ui-datepicker').removeAttr('style');

			if (dim) {
				$pnl.after('<div class="drop-backdrop" role="button"></div>');
				$('.drop-backdrop').css('display', 'block').addClass('on');
				$pnl.closest('.ui-datepicker').css('z-index', 1000);
			}

			// if (fc) {
			// 	!!$pnl.closest('.ui-datepicker').length ?
			// 		win[global].uiFocusTab({ selector: '.ui-drop-pnl[data-id="' + opt.id + '"] .datepicker-sec', type: fc, callback: pnlHide }) : '';
			// 	!!$pnl.closest('.ui-combobox').length ?
			// 		win[global].uiFocusTab({ selector: '.ui-drop-pnl[data-id="' + opt.id + '"] .ui-drop-box', type: fc, callback: pnlHide }) : '';
			// 	!!$pnl.closest('.util-menu').length ?
			// 		win[global].uiFocusTab({ selector: '.ui-drop-pnl[data-id="' + opt.id + '"] .ui-drop-box', type: fc, callback: pnlHide }) : '';
			// }

			$(doc).off('click.dropcloseauto');
			setTimeout(function(){
				$(doc).off('click.dropcloseauto').on('click.dropcloseauto', function(e){
					if(!$(e.target).closest('.ui-drop-pnl').length){
						$plugins.uiDropdownToggle({ id:win[global].uiDropdown.openId });
					}
				});
			},10);
		


			switch (ps) {
				case 'bl': $pnl.css({ top: btn_t + btn_h, left: btn_l }); break;
				case 'bc': $pnl.css({ top: btn_t + btn_h, left: btn_l - ((pnl_w - btn_w) / 2) }); break;
				case 'br': $pnl.css({ top: btn_t + btn_h, left: btn_l - (pnl_w - btn_w) }); break;
				case 'tl': $pnl.css({ top: btn_t - pnl_h, left: btn_l }); break;
				case 'tc': $pnl.css({ top: btn_t - pnl_h, left: btn_l - ((pnl_w - btn_w) / 2) }); break;
				case 'tr': $pnl.css({ top: btn_t - pnl_h, left: btn_l - (pnl_w - btn_w) }); break;
				case 'rt': $pnl.css({ top: btn_t, left: btn_l + btn_w }); break;
				case 'rm': $pnl.css({ top: btn_t - ((pnl_h - btn_h) / 2), left: btn_l + btn_w }); break;
				case 'rb': $pnl.css({ top: btn_t - (pnl_h - btn_h), left: btn_l + btn_w }); break;
				case 'lt': $pnl.css({ top: btn_t, left: btn_l - pnl_w }); break;
				case 'lm': $pnl.css({ top: btn_t - ((pnl_h - btn_h) / 2), left: btn_l - pnl_w }); break;
				case 'lb': $pnl.css({ top: btn_t - (pnl_h - btn_h), left: btn_l - pnl_w }); break;
			}

			org_t = parseInt($pnl.css('top')),
				org_l = parseInt($pnl.css('left'));

			switch (eff) {
				case 'base': $pnl.stop().show(0); break;
				case 'fade': $pnl.stop().fadeIn(eff2); break;
				case 'st': $pnl.css({ top: org_t - eff1, opacity: 0, display: 'block' }).stop().animate({ top: org_t, opacity: 1 }, eff2); break;
				case 'sb': $pnl.css({ top: org_t + eff1, opacity: 0, display: 'block' }).stop().animate({ top: org_t, opacity: 1 }, eff2); break;
				case 'sl': $pnl.css({ left: org_l + eff1, opacity: 0, display: 'block' }).stop().animate({ left: org_l, opacity: 1 }, eff2); break;
				case 'sr': $pnl.css({ left: org_l - eff1, opacity: 0, display: 'block' }).stop().animate({ left: org_l, opacity: 1 }, eff2); break;
			}

			if ($global.uiCheck.mobile) {
				clearTimeout(timer);
				timer = setTimeout(function () {
					!$btn.closest('#baseLayer').length ?
						$('#baseMain').css('padding-bottom', winh - (offtop - scrtop)) :
						!!$btn.closest('.ui-datepicker').length ?
							$('#baseLayer').css('padding-bottom', winh - (offtop - scrtop) + $pnl.outerHeight()) :
							$('#baseLayer').css('padding-bottom', winh - (offtop - scrtop));

					!$btn.closest('.ui-datepicker').length ?
						win[global].uiScroll({ value: Math.ceil($(doc).scrollTop() + (winh / 2 - (winh - (offtop - scrtop))) - 30), speed: 100 }) :
						win[global].uiScroll({ value: Math.ceil(scrtop + ($pnl.outerHeight() - (winh - (offtop - scrtop))) + 110), speed: 100 });
				}, 0);
			}

			!!callback ? callback() : '';
		}

		function pnlHide() {
			var org_t = parseInt($pnl.css('top')),
				org_l = parseInt($pnl.css('left'));

			$(doc).off('click.dropcloseauto');
			$('body').removeClass('dim-dropdown');
			$('#baseMain').css('padding-bottom', 0);
			$('#baseLayer').css('padding-bottom', 0);
			$pnl.closest('.ui-datepicker').removeAttr('style');
			$('.drop-backdrop').remove();
			$btn.data('expanded', false).removeClass('selected');
			$pnl.attr('aria-hidden', true);
			
			switch (eff) {
				case 'base': hidend(); break;
				case 'fade': $pnl.stop().fadeOut(eff2, hidend); break;
				case 'st': $pnl.stop().animate({ top: org_t - eff1, opacity: 0 }, eff2, hidend); break;
				case 'sb': $pnl.stop().animate({ top: org_t + eff1, opacity: 0 }, eff2, hidend); break;
				case 'sl': $pnl.stop().animate({ left: org_l + eff1, opacity: 0 }, eff2, hidend); break;
				case 'sr': $pnl.stop().animate({ left: org_l - eff1, opacity: 0 }, eff2, hidend); break;
			}

			function hidend() {
				$pnl.hide().removeAttr('style');
				//$('#' + $pnl.data('id')).focus();
			}
		}
	}

	function createUiDropdownHide(opt) {
		var $drop = opt === undefined ? $('body').find('.ui-drop') : $('.ui-drop').not('#' + opt.id),
			$wrap = opt === undefined ? $('body').find('.ui-drop-pnl') : $('.ui-drop-pnl').not('[data-id="' + opt.id + '"]');

		$('body').removeClass('dim-dropdown');
		$('#baseMain').css('padding-bottom', 0);
		$('#baseLayer').css('padding-bottom', 0);
		$drop.data('expanded', false);
		$wrap.attr('aria-hidden', true).stop().removeAttr('style');
	}

	/* uiScroll  ---------------------------------- */
	win[global].uiScroll.option = {
		value: 0,
		speed: 0,
		callback: false,
		ps: 'top',
		focus: false,
		target: false
	}
	function createUiScroll(opt) {
		var opt = $.extend(true, {}, win[global].uiScroll.option, opt),
			v = opt.value,
			s = opt.speed,
			c = opt.callback,
			p = opt.ps,
			overlap = true,
			f = typeof opt.focus === 'string' ? '#' + opt.focus : opt.focus,
			$target = opt.target === false ? $('html, body') : opt.target;

		if (p === 'top') {
			$target.stop().animate({ 
				scrollTop: v 
			}, {
				duration: s,
				step: function (now) {
					!!c && now !== 0 ? c({ scrolltop: Math.ceil(now), complete: false }) : '';
				},
				complete: function () {
					if (overlap) {
						!!c ? c({ focus: f, complete: true }) : '';
						!!f ? $(f).attr('tabindex', 0).focus() : '';
					} else {
						overlap = true;
					}
				}
			});
		} 

		if (p === 'left') {
			$target.stop().animate({
				scrollLeft: v
			}, {
				duration: s,
				step: function (now) {
					!!c && now !== 0 ? c({ scrollleft: Math.ceil(now), complete: false }) : '';
				},
				complete: function () {
					if (overlap) {
						!!c ? c({ focus: f, complete: true }) : '';
						!!f ? $(f).attr('tabindex', 0).focus() : '';
					} else {
						overlap = true;
					}
				}
			});
		}
	}

	function createHasScrollBar(opt) {
		var $this = $global.uiTypeof(opt.selector);

		return ($this.prop('scrollHeight') == 0 && $this.prop('clientHeight') == 0) || ($this.prop('scrollHeight') > $this.prop('clientHeight'));
	}

	function createUiError(opt) {
		var $this = typeof opt.id === 'string' ? $('#' + opt.id) : opt.id,
			id = typeof opt.id === 'string' ? opt.id : opt.id.attr('id'),
			err = opt.error === undefined ? true : opt.error,
			msg = opt.msg === undefined ? false : opt.msg,
			gid = opt.gid === undefined ? false : opt.gid,
			gerr = opt.gerror === undefined ? null : opt.gerror,
			gmsg = opt.gmsg === undefined ? false : opt.gmsg,
			gobj = opt.gobj === undefined ? false : opt.gobj,
			err_msg = [],
			node = $this[0].nodeName,
			type = $this.attr('type'),
			$wrap,
			//error-wrap
			type_latesbank = !$this.closest('.inp-latestbank').length ? false : true,
			type_address = !$this.closest('.wraptype-addr').length ? false : true,
			type_tel = !$this.closest('.wraptype-tel').length ? false : true,
			type_email = !$this.closest('.wraptype-email').length ? false : true,
			type_datepicker = !$this.closest('.ui-datepicker').length ? false : true,
			type_certinum = !$this.closest('.wraptype-certinum').length ? false : true,
			type_card = !$this.closest('.wraptype-card').length ? false : true,
			type_email2 = !$this.closest('.inp-email-direct').length ? false : true,
			err_html = '',
			timer,
			msg_is = false;

		if (!$global.uiCheck.mobile) {
			$wrap = $this.closest('.error-wrap').length ? $this.closest('.error-wrap') : !!$this.closest('td').length ? $this.closest('td') : $this.closest('.ui-seltoggle-item');
		} else {
			$wrap = $this.closest('.error-wrap').length ? $this.closest('.error-wrap') : $this.closest('dd');
		}

		node = node.toLowerCase();
		$this.data('gid') !== undefined ? gid = $this.data('gid') : '';

		if (!!gid) {
			$('[data-gid="' + gid + '"]').attr('aria-labelledby', gid + '-error');

			if (!!gobj) {
				for (var k = 0, gobj_len = gobj.length; k < gobj_len; k++) {
					$this = typeof gobj[k].id === 'string' ? $('#' + gobj[k].id) : gobj[k].id;
					//gmsg = gobj[k].gmsg === undefined ? false : gobj[k].gmsg,
					err = gobj[k].error === undefined ? true : gobj[k].error,
					node = $this[0].nodeName;
					node = node.toLowerCase();
					
					if (gobj[k].error === true && msg_is === false) {
						$wrap.find('.error-mes').remove();
						$this.attr('aria-labelledby', gid + '-error');
						if (!!gmsg) {
							$wrap.append('<em class="error-mes" aria-hidden="true" data-type="groupError" id="' + gid + '-error">' + gmsg + '</em>');
						}
						msg_is = true;
					}
					errAct($this);
				};
			} else {
				errAct($this);
			}
		} else {
			$wrap.find('.error-mes').remove();
			!!msg ?
				err_html = '<em class="error-mes" aria-hidden="true" id="' + id + '-error">' + msg + '</em>' : '';

			$wrap.append(err_html);
			$this.attr('aria-labelledby', id + '-error');
			errAct($this);
		}

		//그룹에러
		function errAct($obj) {
			$this = $obj;
			if (!$global.uiCheck.mobile) {
				$wrap = $this.closest('.error-wrap').length ? $this.closest('.error-wrap') : !!$this.closest('td').length ? $this.closest('td') : $this.closest('.ui-seltoggle-item');
			} else {
				$wrap = $this.closest('.error-wrap').length ? $this.closest('.error-wrap') : $this.closest('dd');
			}

			if (err === true) {
				switch (node) {
					case 'input':
						// 타입에 따른 에러라인 위치
						if (type_card) {
							$this.closest('.wraptype-card').addClass('error-border');
						}
						else if (type_datepicker) {
							$this.closest('.ui-datepicker').addClass('error-border');
						} else if (type_email2) {
							$this.closest('.inp-email-direct').addClass('error-email');
							$this.addClass('error-border');
						} else {
							$this.addClass('error-border');
						}
						break;

					case 'select':
						$this.closest('.inp-email-direct').addClass('error-email');
						$this.closest('.ui-select').addClass('error-border');
						!!gid && !$('#' + gid + '-error').length ? $wrap.append(err_html) : '';
						break;

					case 'textarea':
						$this.addClass('error-border');
						break;

					case 'button':
						//$this.addClass('error-border');
						break;
				}
				$wrap.find('.error-mes').addClass('on');
			}
			// no error
			else if (err === false && (gerr === null || gerr === false)) {
				//single error, group error : 전체 에러 해지
				$wrap.find('.error-mes').remove();
				errorlineDel();
			}
			else if (err === false && gerr === true) {
				//group error : 전체는 에러
				errorlineDel();
			}

			function errorlineDel() {
				$this.removeClass('error-border').removeAttr('aria-labelledby');
				$this.closest('.wraptype-card').removeClass('error-border');
				$this.closest('.ui-datepicker').removeClass('error-border');
				$this.closest('.ui-select').removeClass('error-border');
			}
		}
	}

	win[global].uiFocusTab.option = {
		callback: false,
		focusnot: false,
		type: 'hold' //hold, sense
	}
	function createUiFocusTab(opt) {
		var opt = $.extend(true, {}, win[global].uiFocusTab.option, opt),
			$focus = $(opt.selector),
			timer,
			$item = $focus.find('.ui-drop-tit, .ui-select-tit, .ui-modal-tit .tit-gnb, .ui-modal-tit .tit-h1, .mCS_yes_scrollbar .mCustomScrollBox, iframe, a:not([data-disabled]), button:not(:disabled), input:not(:disabled), select:not(:disabled), label, textarea:not(:disabled), .mCSB_container [tabindex="0"], .util-header [tabindex="0"]'),
			callback = opt.callback,
			focusnot = opt.focusnot,
			type = opt.type;

		if (!!$item.length) {
			$item.eq(0).addClass('ui-fctab-s').attr('tabindex', 0).attr('holds', true);
			$item.eq(-1).addClass('ui-fctab-e').attr('tabindex', 0).attr('holde', true);
		} else {
			$focus.prepend('<a href="#" class="ui-fctab-s" tabindex="0" holds="true"></a>');
			$focus.append('<a href="#" class="ui-fctab-e" tabindex="0" holde="true"></a>');
			$item = $focus.find('.ui-fctab-s, .ui-fctab-e');
		}

		clearTimeout(timer);
		timer = setTimeout(function () {
			!focusnot ? $item.eq(0).focus() : '';
		}, 0);
		timer = '';

		$focus.find('.ui-fctab-s').off('keydown.holds').on('keydown.holds', function (e) {
			if (type === 'hold') {
				if (e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					$focus.find('.ui-fctab-e').focus();
				}
			} else if (type === 'sense') {
				$focus.off('keydown.modal');
				(e.shiftKey && e.keyCode == 9) ? callback('before') : '';
			}
		});
		$focus.find('.ui-fctab-e').off('keydown.holde').on('keydown.holde', function (e) {
			if (type === 'hold') {
				if (!e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					$focus.find('.ui-fctab-s').focus();
				}
			} else if (type === 'sense') {
				$focus.off('keydown.modal');
				(!e.shiftKey && e.keyCode == 9) ? callback('after') : '';
			}
		});
	}

	/* form ---------------------------------- */
	function createUiForm(opt) {
		var selector = opt === undefined || opt.id === undefined ?
			'input[type="checkbox"], input[type="radio"]' : typeof selector === 'string' ? '#' + opt.id : opt.id,
			$inp = typeof selector === 'string' ? $(selector) : opt.id,
			data_callback,
			data_allcheck,
			callback,
			allcheck;

		$inp.each(function (i) {
			var $this = $inp.eq(i);

			$this.attr('aria-hidden', true);
			data_callback = $this.data('callback');
			data_allcheck = $this.data('allcheck');

			if ($this.attr('id') !== undefined) {
				if (!!data_callback) {
					callback = opt === undefined ? data_callback : opt.callback === undefined ? data_callback : opt.callback;
				} else {
					callback = opt === undefined ? null : opt.callback === undefined ? null : opt.callback;
				}

				if (!!data_allcheck) {
					allcheck = opt === undefined ? data_allcheck : opt.all === undefined ? data_allcheck : opt.all;
				} else {
					allcheck = opt === undefined ? false : opt.all === undefined ? false : opt.all;
				}

				$this.data('callback', callback).data('allcheck', allcheck);
				$this.attr('type') === 'checkbox' ? formCheckAct({ id: $this.attr('id') }) : formApp({ id: $this.attr('id') });
			}
		});

		$inp.off('click.uiform').on('click.uiform', function () {
			var $this = $(this);

			($this.attr('type') === 'checkbox') ? formCheckAct({ id: $this.attr('id'), evt: true }) : formApp({ id: $this.attr('id') });
			$('label[for="' + $this.attr('id') + '"]').focus();

		}).off('focus.uiform').on('focus.uiform', function () {
			$('label[for="' + $(this).attr('id') + '"]').addClass('activated');
		}).off('blur.uiform').on('blur.uiform', function () {
			$('label[for="' + $(this).attr('id') + '"]').removeClass('activated');
		});
	}

	function createUiFormCheck(opt) {
		if (opt === undefined) {
			return false;
		}

		var $inp = $global.uiTypeof(opt.id),
			callback = opt.callback === undefined ? false : opt.callback;


		opt.checked === undefined ?
			$inp.prop('checked') === false ?
				$inp.prop('checked', true) :
				$inp.prop('checked', false) :
			$inp.prop('checked', opt.checked);
	
		formCheckAct({ id: opt.id, evt: true });
		!!callback ? callback() : '';
	}
	function createUiFormDisabled(opt) {
		if (opt === undefined) {
			return false;
		}

		var $inp = $global.uiTypeof(opt.id),
			callback = opt.callback === undefined ? false : opt.callback;

		opt.disabled === undefined ?
			$inp.prop('disabled') === false ?
				$inp.prop('disabled', true) :
				$inp.prop('disabled', false) :
			$inp.prop('disabled', opt.disabled);

		win[global].uiForm({ id: opt.id });
		!!callback ? callback() : '';
	}
	function formCheckAct(opt) {
		var $inp = $('#' + opt.id),
			inpName = $inp.attr('type') === 'checkbox' ? $inp.attr('class') : $inp.attr('name'),
			$inps = $inp.attr('type') === 'checkbox' ? inpName === undefined || inpName === '' ? $inp : $('input.' + inpName) : $('input[name="' + inpName + '"]'),
			$all = $('#' + inpName),
			i = 0,
			n = 0,
			m = 0,
			len = $inps.length;

		var idn;

		
		if (inpName !== undefined) {
			//전체 체크박스
			for (i = 0; i < len; i++) {
				if ($global.uiCheck.ie8) {
					idn = $inps.eq(i).attr('id');
					n = !!$('#' + idn +':checked').length ? 1 : 0;
				}  else {
					n = $inps.eq(i).prop('checked') ? 1 : 0;
				}
				m = m + n;
			}

			formApp({ id: opt.id, evt: opt.evt });
			(m === len) ? act(true) : (m === len - 1 && $all.data('checked') === true) ? act(false) : '';

		} else {
			//기본 체크박스
			formApp({ id: opt.id, evt: opt.evt });
		}

		function act(v) {
			$all.data('checked', v ? true : false);
			if ($global.uiCheck.ie8) {
				!$('#' + inpName +':checked').length ? $all.attr('checked','checked') : $all.removeAttr('checked');
			} else {
				$all.prop('checked') === false ? $all.prop('checked', true) : $all.prop('checked', false);
			}

			formApp({ id: inpName, act: v ? false : true, evt: opt.evt });
		}
	}
	function formApp(opt) {
		var $inp = $global.uiTypeof(opt.id),
			id = $inp.attr('id'),
			$label = $('label[for="' + id + '"]'),
			allcheck = $inp.data('allcheck'),
			callback = $inp.data('callback'),
			act = opt.act === undefined ? false : opt.act,
			evt = opt.evt === undefined ? false : opt.evt,
			$allItemNot,
			dataChecked,
			checkClass;

		$inp.attr('type') === 'radio' ? $label.attr('role', 'radio') : $label.attr('role', 'checkbox');

		if (!!allcheck === true && evt) {
			$allItemNot = $('input.' + id + ':not(:disabled)');
			
			if ($global.uiCheck.ie8) {
				//ie8
				if (!!$('#' + id +':checked').length) {
					dataChecked = true;
					$allItemNot.each(function (i) {
						$allItemNot.eq(i).attr('checked','checked');
						callback = $allItemNot.eq(i).data('callback');
						$('label[for=' + $allItemNot.eq(i).attr('id') + ']:not(.disabled)').addClass('checked').attr('aria-checked', true).attr('role', 'checkbox');
						!!callback ? callback({ id: $allItemNot.eq(i).attr('id'), value: dataChecked }) : '';
					});
				} else {
					dataChecked = false;
					if (act === false) {
						$allItemNot.each(function (i) {
							$allItemNot.eq(i).removeAttr('checked')
							callback = $allItemNot.eq(i).data('callback');
							$('label[for=' + $allItemNot.eq(i).attr('id') + ']:not(.disabled)').removeClass('checked').attr('aria-checked', false).attr('role', 'checkbox');
							!!callback ? callback({ id: $allItemNot.eq(i).attr('id'), value: dataChecked }) : '';
						});
					}
				}

			} else {
				//ie8 외
				if ($inp.prop('checked') === true) {
					dataChecked = true;
					$allItemNot.prop('checked', true).each(function (i) {
						callback = $allItemNot.eq(i).data('callback');
						$('label[for=' + $allItemNot.eq(i).attr('id') + ']:not(.disabled)').addClass('checked').attr('aria-checked', true).attr('role', 'checkbox');
						!!callback ? callback({ id: $allItemNot.eq(i).attr('id'), value: dataChecked }) : '';
					});
				} else if ($inp.prop('checked') === false) {
					dataChecked = false;
					if (act === false) {
						$allItemNot.prop('checked', false).each(function (i) {
							callback = $allItemNot.eq(i).data('callback');
							$('label[for=' + $allItemNot.eq(i).attr('id') + ']:not(.disabled)').removeClass('checked').attr('aria-checked', false).attr('role', 'checkbox');
							!!callback ? callback({ id: $allItemNot.eq(i).attr('id'), value: dataChecked }) : '';
						});
					}
				}
			}
		} else {
			
			if ($global.uiCheck.ie8) {
				if (!!$('#' + id +':checked').length) {
					if ($inp.attr('type') === 'radio') {
						$('input[name="' + $inp.attr('name') + '"]').each(function () {
							$('label[for="' + $(this).attr('id') + '"]').removeClass('checked').attr('aria-checked', false).attr('role', 'radio');
						});
					} 
					dataChecked = true;
				} else {
					$('#' + id).attr('checked')
					dataChecked = false;
				}
			} else {
				if ($inp.prop('checked') === true) {
					if ($inp.attr('type') === 'radio') {
						$('input[name="' + $inp.attr('name') + '"]').each(function () {
							$('label[for="' + $(this).attr('id') + '"]').removeClass('checked').attr('aria-checked', false).attr('role', 'radio');
						});
					} else {
						//$label.addClass('checked');
					}
					dataChecked = true;
				}
				else if ($inp.prop('checked') === false) {
					dataChecked = false;
				}
			}
			
		}
		checkClass = (dataChecked === true) ? 'addClass' : 'removeClass';

		$inp.prop('disabled') === true ?
			$label.addClass('disabled').attr('aria-checked', true).attr('aria-disabled', true) :
			$label.removeClass('disabled').attr('aria-checked', false).attr('aria-disabled', false);
		
		$inp.data('checked', dataChecked);
		$label[checkClass]('checked');

		dataChecked === true ? $label.attr('aria-checked', true) : $label.attr('aria-checked', false);
		!!callback ? callback({ id: opt.id, value: dataChecked }) : '';
	}


	function createUiInputCancel() {
		var $inp = $('.ui-inpcancel'),
			btn_html;

		$inp.each(function (i) {
			var $this = $(this);

			$this.val() === '' ?
				$this.next('.ui-btn-cancel').remove() :
				$this.next('.ui-btn-cancel').length === 0 ?
					$this.after('<button type="button" class="ui-btn-cancel" data-id="' + $this.attr('id') + '"><span>삭제</span></button>') :
					'';

			$inp.eq(i).off('keyup.btncancel').on('keyup.btncancel', function () {
				var _$this = $(this);

				if (_$this.val() === '') {
					_$this.next('.ui-btn-cancel').remove();
				} else {
					!!$('.ui-btn-cancel[data-id="' + _$this.attr('id') + '"]').length ? '' :
						_$this.after('<button type="button" class="ui-btn-cancel" data-id="' + $this.attr('id') + '"><span>삭제</span></button>');
				}
			});
		});

		$(doc).off('click.btncancel').on('click.btncancel', '.ui-btn-cancel', function () {
			$('#' + $(this).data('id')).val('').focus();
			console.log($(this).data('id'));
			$(this).remove();
		});
	}

	function createUiPlaceholder() {
		var $ph = $('[placeholder]'),
			phname = '',
			id = '',
			dec = '';

		$('.ui-placeholder').remove();
		$ph.each(function (i) {
			var $this = $(this);

			phname = $this.attr('placeholder');
			id = $this.attr('id'),
				dec = $this.attr('aria-describedby');
			if (!!$('label[for="' + id + '"]').length) {
				if (!dec) {
					$this.attr('aria-describedby', id + '_ph');
					$this.before('<span class="hide ui-placeholder" id="' + id + '_ph">' + phname + '</span>');
				} else {
					dec = $this.attr('aria-describedby');
					$this.before('<span class="hide ui-placeholder" id="' + dec + '">' + phname + '</span>');
				}
			}
		});
	}

	function createUiSelSort(opt) {
		var $base = $('#' + opt.id),
			$item = $base.find('[class*="ui-selsort-item-"]'),
			len = $item.length,
			current = opt.current;

		$item.hide();
		current === 'all' ? $item.show() : current === null ? $item.hide() : $item.eq(current - 1).show();
	}

	function createUiSelect(opt) {
		var $selwrap = opt !== undefined && opt.id !== undefined ? typeof opt.id === 'string' ? $('#' + opt.id).closest('.ui-select') : opt.id.closest('.ui-select') : $('.ui-select'),
			//id_is = false,
			len = $selwrap.length,
			current = opt === undefined ? null : opt.current === undefined ? null : opt.current,
			_disabled = false,
			_selectd = false,
			_val = '',
			_txt = '',
			j = 0,
			i = 0,
			cls_selected,
			idx, timer, $sel, sel_dis, $opt, opt_len, $sel_current, $opt_current, sel_type,
			_option_wrap = '';

		// opt !== undefined && opt.id !== undefined ?
		// 	typeof opt.id === 'string' ?
		// 		$('#' + opt.id).closest('.ui-select') :
		// 		opt.id.closest('.ui-select') :
		// 	$('.ui-select');

		//id_is ? $selwrap = $(selector).closest('.ui-select') : '';

		for (i = 0; i < len; i++) {
			$sel_current = $selwrap.eq(i);
			$sel = $sel_current.find('select');
			sel_type = $sel.data('type');
			sel_dis = $sel.prop('disabled');
			$opt = $sel.find('option');
			opt_len = $opt.length;
			
			if (!$sel_current.data('load')) {
				$sel_current.data('load', true);
				$sel_current.find('.ui-select-btn').remove();
				$sel_current.find('.ui-select-inp').remove();
				$sel_current.find('.ui-select-wrap').remove();
				$sel_current.find('.dim').remove();

				$sel_current.attr('id') !== undefined ?
					_option_wrap = '<div class="ui-select-wrap" aria-hidden="true" style="min-width:' + $sel_current.outerWidth() + 'px" id="' + $sel_current.attr('id') + '_opt">' :
					_option_wrap = '<div class="ui-select-wrap" aria-hidden="true" style="min-width:' + $sel_current.outerWidth() + 'px">';

				_option_wrap += '<strong class="ui-select-tit">' + $sel.attr('title') + '</strong>';
				_option_wrap += '<div class="ui-select-opts">';

				for (j = 0; j < opt_len; j++) {
					$opt_current = $opt.eq(j);
					if (current !== null) {
						_selectd = current === j ? $opt_current.prop('selected', true) : $opt_current.prop('selected', false);
					} else {
						_selectd = $opt_current.prop('selected');
					}

					_disabled = $opt_current.prop('disabled');
					_selectd ? _val = $opt_current.val() : '';
					_selectd ? _txt = $opt_current.text() : '';
					_selectd ? cls_selected = 'selected' : cls_selected = '';

					if (_disabled) {
						_option_wrap += '<button type="button" class="ui-select-opt disabled ' + cls_selected + '" value="' + $opt_current.val() + '" disabled>';
						_option_wrap += '<b class="ui-select-txt">' + $opt_current.text() + '</b>';
						_selectd ? _option_wrap += '<span class="hide">선택됨</span>' : '';

					} else {
						_option_wrap += '<button type="button" class="ui-select-opt ' + cls_selected + '" value="' + $opt_current.val() + '">';
						_option_wrap += '<b class="ui-select-txt">' + $opt_current.text() + '</b>';
						_selectd ? _option_wrap += '<span class="hide">선택됨</span>' : '';
					}
					_option_wrap += '</button>';
				}
				_option_wrap += '</div>';
				_option_wrap += '<button type="button" class="btn-close"><span>닫기</span></button>';
				_option_wrap += '</div>';
				_option_wrap += '<div class="dim"></div>';

				$sel_current.append('<button type="button" class="ui-select-btn" title="' + $sel.attr('title') + '" data-opened="false">' + _txt + '</button>');
				
				$sel.addClass('off');
				$sel_current.append(_option_wrap);

				sel_dis ? $sel_current.find('.ui-select-btn').prop('disabled', true).addClass('disabled') : '';
				$sel.attr('aria-hidden', true).attr('tabindex', '-1');

				if (window.mCustomScrollbar && isMscroll) {
					$selwrap.find('.ui-select-wrap').mCustomScrollbar({ scrollButtons: { enable: true } });
				}
			} else {
				$sel_current.find('.ui-select-wrap').css('min-width', $sel_current.outerWidth() + 'px')

				for (j = 0; j < opt_len; j++) {
					$opt_current = $opt.eq(j);
					if (current !== null) {
						_selectd = current === j ? $opt_current.prop('selected', true) : $opt_current.prop('selected', false);
					} else {
						_selectd = $opt_current.prop('selected');
					}

					_disabled = $opt_current.prop('disabled');
					_selectd ? _val = $opt_current.val() : '';
					_selectd ? _txt = $opt_current.text() : '';
					_selectd ? cls_selected = 'selected' : cls_selected = '';

					if (_disabled) {
						_option_wrap += '<button type="button" class="ui-select-opt disabled ' + cls_selected + '" value="' + $opt_current.val() + '" disabled>';
						_option_wrap += '<b class="ui-select-txt">' + $opt_current.text() + '</b>';
						_selectd ? _option_wrap += '<span class="hide">선택됨</span>' : '';

					} else {
						_option_wrap += '<button type="button" class="ui-select-opt ' + cls_selected + '" value="' + $opt_current.val() + '">';
						_option_wrap += '<b class="ui-select-txt">' + $opt_current.text() + '</b>';
						_selectd ? _option_wrap += '<span class="hide">선택됨</span>' : '';
					}
					_option_wrap += '</button>';
				}

				$sel_current.find('.ui-select-btn').text(_txt);
				$sel_current.find('.ui-select-opts button').remove();
				$sel_current.find('.ui-select-opts').append(_option_wrap);
				_option_wrap = '';
				sel_dis ? 
					$sel_current.find('.ui-select-btn').prop('disabled', true).addClass('disabled') :
					$sel_current.find('.ui-select-btn').prop('disabled', false).removeClass('disabled');
			}

		}
		_option_wrap = '';
		// $selwrap.each(function(){
		// 	if (!$(this).data('load')) {
		// 		firstMake();	
		// 	} else {
		// 		addMake();
		// 	}
		// })
		

		

		$('.lb-tit, .ui-select-lb').off('click.uiselectlb').on('click.uiselectlb', function (e) {
			if ($('#' + $(this).attr('for')).closest('.ui-select').length) {
				e.preventDefault();
				$('#' + $(this).attr('for')).closest('.ui-select').find('.ui-select-btn').focus();
			}
		});
		$('.ui-select-btn').off('click.uiselectbtn').on('click.uiselectbtn', function (e) {
			var $btn = $(this);

			$btn.data('sct', $(doc).scrollTop());
			if ($global.uiCheck.mobile) {
				optOpen(this);
			} else {
				if ($btn.data('opened') === false) {
					optClose();
					optOpen(this);
				} else {
					optClose();
				}
			}
		});
		$('.ui-select-opt').off('click.uiselectopt').on('click.uiselectopt', function () {
			var $btn = $(this).closest('.ui-select').find('.ui-select-btn');

			optSelect(this);
			optClose();
			//$btn.focus();
			$btn.data('sct') === undefined ? '' : win[global].uiScroll({ value: $btn.data('sct'), speed: 200 });
			//return false;
		});
		$('.ui-select-btn, .ui-select-opt, .ui-fctab-s, .ui-fctab-e').off('focus.uiselect mouseover.uiselect').on('focus.uiselect mouseover.uiselect', function () {
			clearTimeout(timer);
			$(this).closest('.ui-select').find('.ui-select-wrap.on').length > 0 ? clearTimeout(timer) : '';
		});

		if (!$global.uiCheck.mobile) {
			$('.ui-select-opt').off('blur.uiselectblur').on('blur.uiselectblur', function () {
				var $btn = $(this).closest('.ui-select').find('.ui-select-btn');
				clearTimeout(timer);
				timer = setTimeout(function () {
					optClose();
					//$btn.focus();
				}, 20);
			});
		}

		$('.ui-select-wrap .btn-close').off('click.uiselclose').on('click.uiselclose', function (e) {
			optClose();
		});
		$('.ui-select-wrap .btn-ok').off('click.uiselok').on('click.uiselok', function (e) {
			//$(this).closest('.ui-select').find('.ui-select-opt[pick="true"]').index();
			optSelect($(this).closest('.ui-select').find('.ui-select-opt[pick="true"]'));
			optClose();
		})

		function optSelect(t) {
			var $btn = $(t),
				$uisel = $(t).closest('.ui-select'),
				email = !!$uisel.find('.ui-select-inp').length;

			idx = $btn.index();
			$btn.addClass('selected').siblings('.ui-select-opt').removeClass('selected').find('span.hide').remove();
			$btn.append('<span class="hide">선택됨</span>')
			$uisel.find('select option').prop('selected', false).removeAttr('selected').eq(idx).prop('selected', true).attr('selected');
			$uisel.find('select').trigger('change');
			$uisel.find('.ui-select-btn').text($(t).find('.ui-select-txt').text()).focus();
			$uisel.find('.ui-select-btn').attr('title', $uisel.find('select').attr('title'));
		}

		function optOpen(t) {
			var _$sel = $(t),
				_$uisel = _$sel.closest('.ui-select'),
				_$wrap = _$uisel.find('.ui-select-wrap'),
				_$opt = _$wrap.find('.ui-select-opts'),
				offtop = _$uisel.offset().top,
				scrtop = $(doc).scrollTop(),
				wraph = _$wrap.outerHeight(),
				btnh = _$sel.outerHeight(),
				winh = $(win).outerHeight(),
				clsname = 'bottom';

			clsname = winh - ((offtop - scrtop) + btnh) > wraph ? 'bottom' : 'top';

			if (_$sel.closest('.ui-modal-cont').length) {
				clsname = _$sel.closest('.ui-modal-cont').outerHeight() - (offtop - _$sel.closest('.ui-modal-cont').offset().top) > wraph ? 'bottom' : 'top';
			}
			//$('ui-zindex')
			_$sel.closest('.ui-zindex').addClass('on');
			$('body').addClass('dim-dropdown');
			//닫기
			/*
			if (!!_$sel.data('expanded')){
				사용여부 확인필요

				($global.uiCheck.mobile) ? win[global].uiYesScroll() : '';
				_$sel.data('expanded', false).attr('aria-expanded', false);

				if ($global.uiCheck.mobile) {
					// _$opt.removeAttr('style');
					// _$wrap.stop().animate({
					// 	bottom : '-50%'
					// },200, function(){
					// 	_$wrap.css('display','none').removeClass('on top bottom').attr('aria-hidden', true);
					// });
					// _$uisel.find('.dim').stop().animate({
					// 	opacity : 0
					// },200, function(){
					// 	_$uisel.removeClass('on')
					// 	_$uisel.find('.dim').css('display','none');
					// });
				} else {
					_$uisel.removeClass('on');
					_$wrap.removeClass('on top bottom').attr('aria-hidden', true);
				}
			}
			*/
			//열기
			if (!_$sel.data('opened')) {
				_$sel.data('opened', true);
				if (!window.mCustomScrollbar) {
					//모바일
					!_$sel.closest('#baseLayer').length ?
						$('#baseMain').css('padding-bottom', winh - (offtop - scrtop)) : //모달안에 요소가 아닐때
						$('#baseLayer').css('padding-bottom', winh - (offtop - scrtop)); //모달안에 요소일때

					win[global].uiScroll({ value: $(doc).scrollTop() + (winh / 2 - (winh - (offtop - scrtop))) - 30, speed: 100 });
					//win[global].uiFocusTab({ selector: _$wrap, type: 'hold', focusnot: true });

					_$sel.closest('.ui-select').removeClass('len-5 len-4 len-3 len-2 len-1');

					if (_$opt.find('.ui-select-opt').length < 5) {
						_$sel.closest('.ui-select').addClass('len-' + _$opt.find('.ui-select-opt').length);
					}
					var allfocus = 'input, button, select, a, [tabindex="0"], label, textarea',
						alllen = $(allfocus).length;

					_$wrap.addClass('on ' + clsname).attr('aria-hidden', false).css('display', 'block').stop().animate({
						bottom: 0
					}, 200, function () {
						_$opt.css('position', 'fixed');
						_$opt.find('.ui-select-opt').eq(_$uisel.find('.selected').index()).focus();
					});
					_$uisel.addClass('on').find('.dim').css('display', 'block').stop().animate({
						opacity: 0.7
					}, 200);
				} else {
					//pc
					_$uisel.addClass('on');
					_$wrap.addClass('on ' + clsname).attr('aria-hidden', false);
					//win[global].uiFocusTab({ selector: _$opt, type: 'hold', focusnot: true });
					_$opt.find('.ui-select-opt').eq(_$uisel.find('.selected').index()).focus();

					if (_$uisel.find('.selected').length) {
						setTimeout(function () {
							window.mCustomScrollbar ?
								isMscroll ? 
								_$wrap.mCustomScrollbar(
									"scrollTo",
									_$uisel.find('.selected').position().top + _$wrap.scrollTop(),
									{ scrollInertia: 0, scrollEasing: 'linear', timeout: 0 }
								) : 
								win[global].uiScroll({ value: $(doc).scrollTop() + (winh / 2 - (winh - (offtop - scrtop))) - 30, speed: 100 }):
								win[global].uiScroll({ value: $(doc).scrollTop() + (winh / 2 - (winh - (offtop - scrtop))) - 30, speed: 100 });
						}, 300);
					}
				}
			}
		}
		function optClose() {
			var timer = '',
				$select = $('.ui-select'),
				$btn = $('.ui-select-btn'),
				$wrap = $('.ui-select-wrap');

			//($global.uiCheck.mobile) ? win[global].uiYesScroll() : '';
			$select.closest('.ui-zindex').removeClass('on');
			$('body').removeClass('dim-dropdown');
			$btn.data('opened', false);
			if ($global.uiCheck.mobile) {
				$btn.data('opened', false);
				$('.ui-select-opts').removeAttr('style');
				$wrap.css('display', 'block').stop().animate({
					bottom: '-80%'
				}, 200, function () {
					$wrap.css('display', 'none').removeClass('on top bottom').attr('aria-hidden', true);
				});
				$select.find('.dim').stop().animate({
					opacity: 0
				}, 200, function () {
					$('.dim').css('display', 'none');
					$select.removeClass('on');
				});
			} else {
				$select.removeClass('on');
				$wrap.removeClass('on top bottom').attr('aria-hidden', true);
			}

			clearTimeout(timer);
			timer = setTimeout(function () {
				$('#baseMain').css('padding-bottom', 0);
				$('#baseLayer').css('padding-bottom', 0);
			}, 200);
		}
	}

	function createUiSelectVal(opt) {
		var id = typeof opt.id === 'string' ? opt.id : opt.id.attr('id'),
			$wrap = typeof opt.id === 'string' ? $('#' + opt.id).closest('.ui-select') : opt.id.closest('.ui-select'),
			$sel = $('#' + id),
			$opt = $sel.find('option'),
			$opt_ = $wrap.find('.ui-select-opt'),
			callback = opt.callback === undefined ? false : opt.callback,
			current = opt.current,
			timer;

		clearTimeout(timer);
		timer = setTimeout(function () {
			$wrap.find('option').prop('selected', false).eq(current).prop('selected', true);
			$wrap.find('.ui-select-btn').text($opt.eq(current).text());
			$wrap.find('.ui-select-btn').attr('title', $sel.attr('title'));
			$opt_.removeClass('selected');
			$opt_.find('span.hide').remove();
			$opt_.eq(current).addClass('selected').append('<span class="hide">선택됨</span>');
			callback ? callback({ id: id, current: current, val: $opt.eq(current).val() }) : '';
			$sel.trigger('change');
		}, 0);
	}

	

	function createUiFileUpload(opt) {
		var base = {};

		base.id = $('#' + opt.id);
		base.multi = opt.multi === undefined ? false : opt.multi;
		base.accept = opt.accept === undefined ? '' : 'accept="' + opt.accept + '"';
		base.callback = opt.callback === undefined ? false : opt.callback;
		base.n = 0;
		base.txthtml = '<input type="text" class="ui-file-txt inp-base" readonly="readonly" title="첨부파일명">';
		base.delhtml = '<button type="button" class="ui-file-del btn-del">첨부파일 삭제</button>';
		base.filehtml = '<input type="file" value="" ' + base.accept + '" class="ui-file-inp" aria-hidden="true" tabindex="-1" title="첨부파일 불러오기">';
		base.id.data('files', opt.multi);
		base.wraphtml = '<div class="ui-file-wrap"></div>';
		base.btn = base.id.find('.ui-file-btn');
		base.id.append(base.wraphtml);
		base.wrap = base.id.find('.ui-file-wrap');
		base.wrap.append(base.filehtml);
		base.file = base.wrap.find('.ui-file-inp');
		base.timer;

		//event
		$(doc)
			.off('change.' + opt.id).on('change.' + opt.id, '#' + opt.id + ' .ui-file-inp', function () {
				fileChange(base);
			})
			.off('click.fileuploadDel').on('click.fileuploadDel', '.ui-file-del', function () {
				fileDel(this);
			});

		base.btn.off('click.' + opt.id).on('click.' + opt.id, function () {
			fineUpload(base);
		});

		//fn
		function fineUpload(base) {
			if (!base.multi) {
				base.file.trigger('click');
			} else {
				base.wrap = base.id.find('.ui-file-wrap').eq(-1);
				base.file = base.wrap.find('.ui-file-inp');
				base.file.trigger('click');
			}
		}
		function fileDel(v) {
			var $del = $(v),
				$file = $del.closest('.ui-file'),
				len = $file.find('.ui-file-wrap').length,
				idx = $del.closest('.ui-file-wrap').index() - 1,
				$txt = $file.find('.ui-file-txt'),
				$wrap = $del.closest('.ui-file-wrap'),
				file = $txt.val();

			if (!$file.data('files')) {
				if ($wrap.length > 0) {
					$wrap.find('.ui-file-inp').val('');
					$txt.remove();
					$del.remove();
				}
				$file.data('single', false);
			} else {
				(len > 1) ? $file.find('.ui-file-wrap').eq(idx).remove() : '';
			}
			!!base.callback ? base.callback({ id: $file.attr('id'), upload: false, file: file }) : '';
		}
		function fileChange(base) {
			base.v = base.file.val();
			base.v = base.v.split("\\");
			base.n = base.v.length;
			base.n = (base.n === 0) ? 0 : base.n - 1;

			(!base.multi && !base.id.data('single')) ? act('single') : '';
			if (!!base.multi) {
				(!base.id.data('multi')) ? act('multi') : act('add');

				clearTimeout(base.timer);
				base.timer = setTimeout(function () {
					base.wraphtml = '<div class="ui-file-wrap"></div>';
					base.id.append(base.wraphtml);
					base.wrap = base.id.find('.ui-file-wrap').eq(-1);
					base.wrap.append(base.filehtml);
					base.file = base.wrap.find('.ui-file-inp');
				}, 35);
			}
			if (!!base.v && !base.file.val()) {
				base.txt.remove();
				base.del.remove();
				base.id.data('single', false);
			}
			function act(v) {
				v === 'single' ? base.id.data('single', true) : '';
				v === 'multi' ? base.id.data('multi', true) : '';
				v === 'add' ? base.wrap = base.id.find('.ui-file-wrap').eq(-1) : '';

				base.wrap.append(base.txthtml);
				base.wrap.append(base.delhtml);
				base.txt = base.wrap.find('.ui-file-txt');
				base.del = base.wrap.find('.ui-file-del');

				!!base.callback ? base.callback({ id: base.id.attr('id'), upload: true, file: base.v[base.n] }) : '';
			}
			base.txt.val(base.v[base.n]);
		}
	}

	function createUiTextareaAutoHeight() {
		$('.ui-autoheight').each(function () {
			var n = 1;
			// if (!!$plugins.uiHasScrollBar({ selector: $(this) })) {
			// 	n = n + 1
			// 	$(this).addClass('n' + n);
			// }
			
			$(this).off('keyup').on('keyup', function () {
				if (!!$plugins.uiHasScrollBar({ selector: $(this) })) {
					n = n + 1
					$(this).addClass('n' + n);
				}
			});
		});
	}

	function createUiPrint(opt) {
		var $print = $('#' + opt.id),
			clone = $print.clone(),
			html = '',
			clone_iframe;

		html += '<div class="base-print" id="basePrint"></div>';
		

		if (self !== top) {
			//parent.$('body').addClass('print');
			parent.$('body').append(html);
			parent.$('.base-print').append(clone);

			if ($global.uiCheck.ie)	{
				var webBrowser ='<OBJECT ID="previewWeb" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>';
			
				doc.body.insertAdjacentHTML('beforeEnd', webBrowser);
				previewWeb.ExecWB(7,1);
				previewWeb.outerHTML='';
			} else {
				win.parent.print();
			}

			setTimeout(function () {
				//parent.$('body').removeClass('print');
				parent.$('.base-print').remove();
			}, 0);
		} else {
			$('body').append(html);
			$('.base-print').append(clone);
			win.print();

			setTimeout(function () {
				$('.base-print').remove();
			}, 0);
		}

		
	}

	/* layer showhide function ----------------------------------*/
	function createUiParaReplaceState(opt){
		var href = win.location.href,
			renewURL = win.location.search.substring(1),
			hrefs = href.split('?'),
			href_base = hrefs[0],
			href_para = hrefs[1],
			href_paras = href_para === undefined ? false : href_para.split('&'),
			para_len = !!href_paras ? href_paras.length : 0,
			para_tab = null,
			para_tabs = null,
			para_info = null,
			href_new = '',
			n = opt.current,
			tabid = opt.id,
			para_new = true;

		//para값이 있을 경우
		if (!!href_paras) {
			//para 수만큰 돌려 tab을 찾아 현재 탭아이디와 같은 tab 파라미터값만 값을 변경.
			for (var i = 0; i < para_len; i++) {
				para_tab = href_paras[i].split('tab=');

				if (para_tab.length > 1) {
					//tab있는 경우
					para_tabs = para_tab[1].split('+');
					
					if (para_tabs.length > 1) {
						//tab 파라가 여러개일때 +가 있다면 *을 사용한다는 전제조건.
						href_new += '&tab=';
						for (var j = 0; j < para_tabs.length; j++) {
							para_info = para_tabs[j].split('*');

							if (para_info[0] === tabid) {
								j > 0 ? href_new += '+' : '';
								href_new += para_info[0] + '*' + n;
								para_new = false;
							} else {
								j > 0 ? href_new += '+' : '';
								href_new += para_info[0] + '*' + para_info[1];
							}
						}
					} else {
						//tab 파라가 하나이거나 
						href_new += '&tab=';
						para_info = para_tabs[0].split('*');

						if (para_info.length > 1) {
							//*이 있는 경우
							if (para_info[0] === tabid) {
								href_new += para_info[0] + '*' + n;
								para_new = false;
							} else {
								href_new += para_info[0] + '*' + para_info[1];
							}
						} else {
							//기존 tab=1 만 사용하는 겨우
							href_new += n;
							para_new = false;
						}
					}
				} else {
					//tab없는 경우
					href_new += '&';
					href_new += href_paras[i];
				}
			}
			//신규 탭추가
			if (para_new) {
				var paras_new = href_new.split('tab=');

				if (paras_new.length > 1) {
					href_new = paras_new[0] + 'tab=' + tabid + '*' + n + '+' + paras_new[1];
				} else {
					href_new = paras_new[0] + '&tab=' + tabid + '*' + n ; 
				}
			}
			//최종주소 생성
			if (href_new.charAt(0) === '&' ) {
				href_new = href_new.slice(1);
			}
			href_new = href_base + '?' + href_new;
		} else {
			//para 값이 없거나
			href_new = '?tab=' + tabid + '*' + n;
		}

		$global.uiCheck.oldie ? '' :
		history.replaceState(null, null, href_new);
	}

	function createUiTab(opt) {
		var id = opt.id,
			current = isNaN(opt.current) ? 0 : opt.current,
			unres = (opt.unres === undefined) ? false : opt.unres,
			callback = (opt.callback === undefined) ? false : opt.callback,
			tabLabel = (opt.label === undefined) ? false : opt.label,
			control = opt.control === undefined ? true : opt.control,
			tabId = '#' + id,
			$tab = $(tabId),
			$btns = $tab.children('.ui-tab-btns'),
			$btn = $btns.find('.ui-tab-btn'),
			$pnls = $tab.children('.ui-tab-pnls'),
			$pnl = $pnls.children('.ui-tab-pnl'),
			len = $btn.length,
			fix = !!$tab.data('tabnum'),
			ps_l = [],
			i,
			attrs,
			keyCode,
			keyCurrent,
			len,
			cls,
			btn_total = 0,
			para = $global.uiPara('tab'),
			paras,
			paraname,
			//paras = $global.uiPara('tabs'),
			one = 0;
		
		if (!!para) {
			if (para.split('+').length > 1) {
				//2개이상의 탭설정
				//tab=exeTab1-1+Tab_productBanner-3
				paras = para.split('+');

				for (var i = 0; i < paras.length; i++ ) {
					paraname = paras[i].split('*');
					opt.id === paraname[0] ? current = Number(paraname[1]) : '';
				}
			} else {
				//1개 탭 설정
				//tab=1
			 	if (para.split('*').length > 1) {
					paraname = para.split('*');
					opt.id === paraname[0] ? current = Number(paraname[1]) : '';
				} else {
					current = Number(para);
				}
			}
		}
		
		//set up
		$tab.data('callback', callback).data('unres', unres);
		tabLabel ? $btns.attr('aria-label', opt.label) : '';
		$btns.attr('role', 'tablist');
		$btn.attr('role', 'tab');
		$pnl.attr('role', 'tabpanel');

		for (i = 0; i < len; i++) {
			var tabn = fix ? $btn.eq(i).data('tabnum') : i;

			attrs = (current === tabn) ? 'removeAttr' : 'attr';
			cls = (current === tabn) ? 'addClass' : 'removeClass';
			$btn.eq(i).attr('id') === undefined ? $btn.eq(i).attr('id', id + 'Btn' + tabn) : '';
			$pnl.eq(i).attr('id') === undefined ? $pnl.eq(i).attr('id', id + 'Pnl' + tabn) : '';

			if ($global.uiCheck.android4) {
				btn_total = btn_total + Math.floor($btn.eq(i).outerWidth());
				if ($(win).outerWidth() + 10 < btn_total && i + 1 === len) {
					$tab.find('.ui-floating-wrap').css('width', $(win).outerWidth() + 'px');
					$btn.wrapAll('<div class="tab-scrolling"><div style="width:' + (btn_total + 10) + 'px; "></div></div>');
					$tab.addClass('none-flex').removeClass('flex-use');
				}
			}

			if (unres === false) {

				$btn.eq(i).attr('aria-controls', $pnl.eq(i).attr('id'));
				$pnl.eq(i).attr('aria-labelledby', $btn.eq(i).attr('id')).attr('aria-hidden', (current === tabn) ? false : true)[attrs]('tabindex', -1)[cls]('selected');
			} else {
				$pnl.attr('aria-hidden', false).addClass('selected').removeAttr('tabindex');
				callback ? callback(opt) : '';
			}

			if (current === tabn) {
				//$btn.eq(i).attr('aria-selected', true);
				$btn.eq(i).addClass('selected');
				$btn.eq(i).append('<b class="hide">선택됨</b>');
			} else {
				//$btn.eq(i).attr('aria-selected', false);
				$btn.eq(i).removeClass('selected');
				$btn.eq(i).find('b.hide').remove();
			}

			ps_l.push($btn.eq(i).position().left);
		}

		if ($global.uiCheck.android4) {
			$('.ui-tab').not('.none-flex').addClass('flex-use');
		}

		$btn.data('psl', ps_l);
		$plugins.uiScroll({ value: ps_l[current], target: $btn.parent(), speed: 0, ps: 'left' });
		//event
		control ?
			$btn.off('click.uitab').on('click.uitab', function () {
				var $this = $(this);

				$global.uiCheck.mobile ? 
				win[global].uiParaReplaceState({
					id: $this.closest('.ui-tab').attr('id'),
					current: $this.index()
				}) : '';
			
				win[global].uiTabToggle({ 
					id: id, 
					current: $this.index() 
				});

				/*
				var renewURL = location.href,
					basehref,
					remainhref;

				if (renewURL.split('?').length > 1) {
					basehref = renewURL.split('?');
					basehref = basehref[0];
					if (renewURL.split('?tab=').length > 1) {
						renewURL = renewURL.replace(/\?tab=([0-9]+)/ig, '');
						renewURL = renewURL.replace(/\&tabid=([a-zA-Z0-9_]+)/ig, '');
						remainhref = renewURL.split(basehref);
						remainhref = remainhref[1];
						renewURL = basehref;
						renewURL += '?tab=' + $(this).index() + '&tabid=' + id + '' + remainhref;
					} else if (renewURL.split('&tab=').length > 1) {
						renewURL = renewURL.replace(/\&tab=([0-9]+)/ig, '');
						renewURL = renewURL.replace(/\&tabid=([a-zA-Z0-9_]+)/ig, '');
						renewURL += '&tab=' + $(this).index() + '&tabid=' + id;
					}
				} else {
					renewURL += '?tab=' + $(this).index() + '&tabid=' + id;
				}
				history.replaceState(null, null, renewURL);
				*/
			}) : '';
		// .off('keyup.uitab').on('keyup.uitab', function(e){
		// 	var $this = $(this);
		// 	e.preventDefault();
		// 	win[global].uiEventKey({ selector:$this, index:$this.index(), e:event, scope:$this.closest('.ui-tab-btns').find('.ui-tab-btn') });
		// });

	}

	function createUiTabToggle(opt) {
		var id = opt.id,
			$tab = $('#' + id),
			$btns = $tab.children('.ui-tab-btns'),
			$btn = $btns.find('.ui-tab-btn'),
			$pnls = $tab.children('.ui-tab-pnls'),
			$pnl = $pnls.children('.ui-tab-pnl'),
			ps_l = $btn.data('psl'),
			current = isNaN(opt.current) ? 0 : opt.current,
			unres = (opt.unres === undefined) ? $tab.data('unres') : opt.unres,
			callback = opt.callback === undefined ? $tab.data('callback') : opt.callback;

		$btn.find('b.hide').remove();
		$btn.eq(current).append('<b class="hide">선택됨</b>');
		$btn.removeClass('selected').eq(current).addClass('selected').focus();
		$plugins.uiScroll({ value: ps_l[current], target: $btn.parent(), speed: 300, ps: 'left' });

		var h_add = 15;
		if ($global.uiCheck.mobile) {
			$tab.hasClass('mgt-n') ? h_add = 0 : h_add = 0;
			$global.uiCheck.mobile ? $plugins.uiScroll({ value: $tab.position().top + h_add, speed: 100 }) : '';
		}

		if ($tab.data('unres') === false) {
			$pnl.attr('aria-hidden', true).removeClass('selected').attr('tabindex', '-1').eq(current).addClass('selected').attr('aria-hidden', false).removeAttr('tabindex');
		}

		(!!callback) ? callback(opt) : '';
	}

	/* uimodal ----------------------------------------- */
	win[global].uiModal.option = {
		autofocus: true,
		endfocus: null,
		full: false,
		remove: false,
		ps: 'center',
		callback: false,
		closecallback: false,
		space: 10,
		words: false,
		btntxt1: false,
		btntxt2: false,
		sys_type: false,
		termsTit: false,
		termsUrl: false,
		cf_year: false,
		cf_n: false,
		iname: false,
		ititle: '빈프레임',
		isrc: false,
		icallback: false,
		born: false,
		sctarray : []
	};
	function createUiModal(opt) {
		var opt = $.extend(true, {}, win[global].uiModal.option, opt);

		if ($('#' + opt.id + '[opened="true"]').length > 0) {
			return false;
		}

		if (!!opt.isrc && !$('#' + opt.id).length) {
			//ifarme modal : 아이프레임주소와 아이디 필수
			var iname = opt.iname,
				ititle = opt.ititle,
				isrc = opt.isrc,
				iwidth = opt.iwidth === undefined ? $global.uiCheck.mobile ? '100%' : 965 : opt.iwidth,
				iheight = opt.iheight === undefined ? $global.uiCheck.mobile ? '100%' : $(win).outerHeight() - 20 : opt.iheight,
				icallback = opt.icallback,
				remove = opt.remove,
				iclosecallback = opt.iclosecallback,
				modal_html = '';

			var parasrc = opt.isrc;
			if (opt.isrc.split('?').length > 1) {
				parasrc = parasrc + '&uiType=F' 
			} else {
				parasrc = parasrc + '?uiType=F' 
			}

			if ($global.uiCheck.mobile) {
				iwidth = '100%';
				iheight = $(win).outerHeight();
			} 

			modal_html += '<section class="ui-modal iframe-modal" id="' + opt.id + '" aria-hidden="true">';
			modal_html += '<div class="ui-modal-wrap">';
			modal_html += '<div class="ui-modal-iframe" data-orgw="' + iwidth + '" data-orgh="' + iheight + '" style="height:' + iheight + 'px;">';
			modal_html += '<iframe id="' + iname + '" name="' + iname + '" src="' + parasrc + '" width="' + iwidth + '" height="' + iheight + '" title="' + ititle + '" orgw="' + iwidth + '" orgh="' + iheight + '"></iframe>';
			modal_html += '</div>';
			!$global.uiCheck.mobile ?
				modal_html += '<button type="button" class="btn-close ui-modal-closecallback" onclick="$plugins.uiModalClose({ id:\'' + opt.id + '\', remove: ' + remove + ' })"><span>닫기</span></button>' : '';
			modal_html += '</div>';
			modal_html += '</section>';

			if (!!opt.born) {
				var $local = typeof opt.born === 'string' ? $('#' + string) : opt.born;

				$local.append(modal_html);
			} else {
				!!$('#baseLayer').length ? $('#baseLayer').prepend(modal_html) : $('body').append(modal_html);
			}

			$('#' + opt.id).data('iccb', { callback: iclosecallback });

			$(doc).off('click.closecallback').on('click.closecallback', '.ui-modal-closecallback', function () {
				if (!!$(this).closest('.ui-modal').data('iccb')) {
					var cc = $(this).closest('.ui-modal').data('iccb');
					!!cc && !!cc.callback ? cc.callback() : '';
				}
			});

			if ($global.uiCheck.ie8) {
				$('#' + opt.id).data('iframeload', true);
			} 
			
			$('#' + iname).on('load', function(){
				$('#' + opt.id).data('iframeload', true);
				win[global].callback !== undefined ? frames[iname].$plugins.callback.modal(opt.id) : '';
				!!icallback ? icallback() : '';

				/* 2018-11-26 : IOS iframe fixed bug */
				if ($global.uiCheck.mobile && $global.uiCheck.ios) {
					frames[iname].$('#wrapIframe').css({ 
						'max-height':$(win).outerHeight(),
						'overflow' : 'scroll'
					});
				} 

			});
			// document.getElementById(iname).onload = function () {
			// 	$('#' + opt.id).data('iframeload', true);
			// 	win[global].callback !== undefined ? frames[iname].$plugins.callback.modal(opt.id) : '';
			// 	!!icallback ? icallback() : '';
			// };
			
			uiModalOpen(opt);
		}

		if (!opt.link) {
			//모달코드가 이미 페이지안에 있을 경우
			($('#' + opt.id).attr('aria-hidden') === 'true') ? uiModalOpen(opt) : '';
		} else {
			//aJax 모달 
			var paralink = opt.link;
			if (opt.link.split('?').length > 1) {
				paralink = paralink + '&uiType=L' 
			} else {
				paralink = paralink + '?uiType=L' 
			}

			!!$('#' + opt.id).length ?
				uiModalOpen(opt) :
				$global.uiAjax({
					id: !!opt.born ? opt.born : !$('#baseLayer').length ? opt.born = $('body') : 'baseLayer',
					url: paralink,
					page: true,
					prepend:true,
					type: opt.type === 'post' ? opt.type : 'GET',
					add: true,
					callback: function () {
						uiModalOpen(opt);
					}
				});
		}
	}
	function uiModalOpen(opt) {
		var $modal = $('#' + opt.id),
			$modalWrap = $modal.find('.ui-modal-wrap'),
			$modalTit = $modal.find('.ui-modal-tit'),
			$modalCont = $modal.find('.ui-modal-cont'),
			$modalFoot = $modal.find('.ui-modal-footer'),
			autofocus = opt.autofocus,
			born = opt.born,
			endfocus = opt.endfocus === null ? document.activeElement : '#' + opt.endfocus,
			w = (opt.width === undefined) ? Math.ceil($modal.outerWidth()) : opt.width,
			h = (opt.height === undefined) ? Math.ceil($modal.outerHeight()) : opt.height,
			titH,
			titF,
			full = opt.full,
			remove = opt.remove,
			ps = opt.ps, 
			callback = opt.callback,
			closecallback = opt.closecallback,
			modalSpace = opt.space,
			winH = $(win).outerHeight(),
			winW = $(win).outerWidth(),
			overH = winH <= h,
			overW = winW <= w,
			timer,
			timer_resize,
			layN,
			re_num = 0,
			re_timer,
			//system
			words = opt.words,
			btntxt1 = opt.btntxt1,
			btntxt2 = opt.btntxt2,
			sys_type = opt.type,
			//terms
			termsTit = opt.termsTit,
			termsUrl = opt.termsUrl,
			//cf
			cf_year = opt.cf_year,
			cf_n = opt.cf_n,
			//iframe
			iname = opt.iname,
			ititle = opt.ititle,
			isrc = opt.isrc,
			iwidth = (opt.iwidth === undefined) ? $modal.find('iframe').attr('width') : opt.iwidth,
			iheight = (opt.iheight === undefined) ? $modal.find('iframe').attr('height') : opt.iheight,
			icallback = opt.icallback,
			//state
			is_mobile = $global.uiCheck.mobile,
			is_full_h,
			is_full_w,
			is_iframe,
			zidx,
			iw,
			ih,
			__h,
			laywrap_h,
			h_cont = 'auto';
		
		modalType();
		

		//MODAL TYPE -------------------------------------------------
		function modalType(){
			//type terms modal
			if (termsUrl) {
				if (is_mobile) {
					full = true;
					modalSpace = 0;
					$modal.addClass('type-full');
				}	
				$global.uiAjax({ id: opt.id + '_cont', url: termsUrl, page: true });
				$modalTit.find('.tit-h1').text(termsTit);
			}

			//type alert & comfirm modal
			if (words) {
				words && is_mobile ? opt.width = winW > 400 ? 400 : winW - (modalSpace * 2) : '';
				$modal.find('#modalAlertTxt').append(words);
				$modal.find('.ui-partial').removeClass('warning-type1 warning-type2 warning-type3').addClass(sys_type);
				!!btntxt1 ? $modal.find('#__confirm').text(btntxt1) : '';
				!!btntxt2 ? $modal.find('#__cancel').text(btntxt2) : '';
			}

			//type cf modal
			if (cf_year !== false) {
				var cf_html = '',
					cf_json = win[global].uiCFList.json,
					name_y = Object.keys(cf_json)[cf_year],
					cf_info = cf_json[name_y][cf_n];

				if ($global.uiCheck.ie8) {
					cf_html += '<div class="player">';
					cf_html += '<object classid="clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95" id="uiCfPlayer" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,0,02,902" width="520" height="360">';
					cf_html += '<param name="src" value="' + cf_info.mov + '">';
					cf_html += '<param name="controller" value="true">';
					cf_html += '<param name="autoplay" value="false">';
					cf_html += '<param name="autostart" value="0">';
					cf_html += '<param name="pluginspage" value="http://www.apple.com/quicktime/download/"> ';
					cf_html += '</object>';
					cf_html += '</div>';
				} else {
					cf_html += '<div class="player">';
					cf_html += '<button type="button" class="btn-cfplay" style="background-image:url('+cf_info.img+')">';
					cf_html += '<span class="hide">'+cf_info.tit+' 영상보기</span>';
					cf_html += '</button>';
					cf_html += '<div class="player-mp4">';
					cf_html += '<video id="uiCfPlayer" controls preload="auto" src="' + cf_info.mp4 + '" autoplay poster="' + cf_info.img + '" width="520" height="320">';
					cf_html += '</video>';
					cf_html += '</div>';
					cf_html += '</div>';
				}
				cf_html += '<div class="player-txt mgt-m">';
				cf_html += '<ul class="bul-round">';
				cf_html += '<li>광고일자: ' + cf_info.date + '</li>';
				cf_html += '<li>손보협회심의번호: ' + cf_info.num + '</li>';
				cf_html += '<li>개시일자: ' + cf_info.update + '</li>';
				cf_html += '<li><span>내용보기</span> ' + cf_info.txt + '</li>';
				cf_html += '</ul>';
				cf_html += '</div>';

				$('#__modalCF_cont').append(cf_html);
				$('#__modalCF').find('.tit-h1').text(cf_info.tit);
				$('.btn-cfplay').on('click', function(){
					doc.getElementById('uiCfPlayer').play();
					$(this).hide();
				})
			}

			//type 다이렉트club > 신용카드할인/혜택 > 포인트 결제 : 이용안내 modal
			opt.id === '__modalPointInfo' ? callback() : '';
			//opt.id === 'modal_PP020601_006' ? opt.height = $(win).outerHeight() : '';

			//type full modal
			if (full & is_mobile) {
				modalSpace = 0;
				$modal.addClass('type-full');
			}
			
			win[global].uiModal.option.sctarray.push($(win).scrollTop());

			modalReady();
			clearTimeout(timer);
			
			timer = setTimeout(function () {
				modalApp({ resize: false  });
			}, 50);
		}

		
		//MODAL READY -------------------------------------------------
		function modalReady(){
			$('body').addClass('modal-open modal-ria');
			$('#baseWrap').attr('aria-hidden', true);
			$modal.attr('opened', true)
				.data('opt', opt)
				.data('endfocus', endfocus)
				.data('autofocus', autofocus)
				.data('scrolltop', $(win).scrollTop())
				.attr('aria-hidden', false)
				.find('.tit-h1').eq(0).attr('id', opt.id + '-tit');

			$modal.siblings('.ui-modal').attr('aria-hidden', true);
			//single or multi modal
			layN = $('.ui-modal[opened="true"]').length;
			opt.zindex !== undefined ? opt.zindex !== null ? zidx = opt.zindex : zidx = layN : zidx = layN;
			$modal.css({
				zIndex: born ? zidx + 20 : zidx,
				position: 'fixed'
			}).attr('n', zidx).addClass('hide-scroll2');

			//모달생성 설정
			is_mobile ? $modal.css({ display: 'block', top: '100%', opacity: 0 }) : $modal.css({ display: 'block', top: '50%', opacity: 0 });
		}

		//MODAL APPLICATION -------------------------------------------------
		//- resize: resize이벤트 일 경우 true, 아닌 경우 false
		function modalApp(v) {
			if ($(win).outerWidth() > $modal.outerWidth() && $(win).outerHeight() > $modal.outerHeight() && v.resize && !is_mobile) {
				$('body').removeClass('modal-full');
				return false; //리사이징으로 변화가 없을 시
			} 

			//초기화 및 세팅
			winH = $(win).outerHeight();
			winW = $(win).outerWidth();
			
			if (v.resize) {
				$('body').addClass('modal-full');
				return false;
			} 
			$modalCont.css({ 
				height: 'auto' ,
				maxHeight: 'none',
				minHeight: 'none'
			});

			$modal.css({ height: 'auto' });
			//!full ? $modal.css({ height: 'auto' }) : '';
			//modal height 100 작거나 iframeload 전 일때 재 실행, resize 옵션 false 일경우
	
			if ($modalCont.outerHeight() < 100 && $modal.data('iframeload') === undefined && !v.resize ) {
				//$plugins.page.formReset();
				if (re_num === 0) {
					$global.uiLoading({ visible: true });
					re_num = re_num + 1;
				}

				re_timer = setTimeout(function () {
					modalApp({ resize: false  });
				}, 500);

				return false;
			} 

			//modal content load ok!! 
			titH = !!$modalTit.length ? $modalTit.outerHeight() : 0;
			titF = !!$modalFoot.outerHeight() ? $modalFoot.outerHeight() : 0;

			//$modalCont height setup
			if (full) {
				!!titH && !!titF ? __h = Math.ceil(winH - titH - titF - (modalSpace * 2)) : '';//title, footer
				!!titH && !titF ? __h = Math.ceil(winH - titH - (modalSpace * 2)) : '';//only title
				!titH && !!titF ? __h = Math.ceil(winH - titF - (modalSpace * 2)) : '';//only footer
				!titH && !titF ? __h = Math.ceil(winH - (modalSpace * 2)) : '';//not title, footer
				h_cont = __h;

				if (!is_mobile) {
					$modalCont.css('max-height', __h);
					$modalCont.css('height', __h);
				}
			} else {
				if (!opt.height) {
					$modalCont.css('max-height', 'auto');
					laywrap_h = $modalWrap.outerHeight();
					laywrap_h > winH ? laywrap_h = winH : '';
					!!titH && !!titF ? __h = Math.ceil(laywrap_h - titH) : '';//title, footer
					!!titH && !titF ? __h = Math.ceil(laywrap_h - titH) : '';//only title
					!titH && !!titF ? __h = Math.ceil(laywrap_h) : '';//only footer
					!titH && !titF ? __h = Math.ceil(laywrap_h) : '';//not title, footer
					winH < __h + (modalSpace * 2) + titH + titF ? __h =  winH - titF - titH - (modalSpace * 2) : '';
					h_cont = __h;
					$modalCont.css('max-height', __h);
					$modalCont.css('height', __h);
				} else {
					$modalCont.css('max-height', Math.ceil(opt.height - titH));
					$modalCont.css('height', Math.ceil(opt.height - titH));
				}
			}

			h = (opt.height === undefined) ? Math.ceil($modal.outerHeight()) : opt.height;
			w = (opt.width === undefined) ? Math.ceil($modal.outerWidth()) : opt.width;

			//resize일 경우 원래 크기로 돌아가기.
			// if (!!$modal.data('orgw') || !!$modal.data('orgh') && !is_mobile) {
			// 	h = Number($modal.data('orgh'));
			// 	w = Number($modal.data('orgw'));
			// }

			overH = winH <= h;
			overW = winW <= w;

			if (!is_mobile) {
				overW ? $('body').addClass('modal-full') : $('body').removeClass('modal-full');
			}

			is_full_h = overH || full;
			is_full_w = overW || full;
			is_iframe = !!$modal.find('.ui-modal-iframe').length;
			iw = $modal.find('.ui-modal-iframe').data('orgw');
			ih = $modal.find('.ui-modal-iframe').data('orgh');

			//full ? is_full_h = true : '';
			// if (is_full_h) {
			// 	//full
			// 	$modalCont.css({ height: Math.ceil(winH - (titH + titF) - (modalSpace * 2)) + 'px' });
			// 	winH < ih ?
			// 		$modal.find('.ui-modal-iframe iframe').attr('height', winH - (modalSpace * 2)) :
			// 		$modal.find('.ui-modal-iframe iframe').attr('height', ih);

			// 	$modal.css('height', winH - (modalSpace * 2));
			// } else {
			// 	!!words ? $modalCont.css({ hegiht: 'auto', maxHeight: 'none' }) : '';
			// 	h = !!titF ? h + titF : h;
			// 	$modal.css('height', h);
			// }

			!!words ? $modalCont.css({ maxHeight: 'none' }) : '';
				h = !!titF ? h + titF : h;
				$modal.css('height', h);

			if (!v.resize) {
				if (is_mobile) {
					//modal
					$modal.css({
						opacity: 0,
						top: is_full_h ? '100%' : '50%',
						left: is_full_w ? 0 : '50%',
						width: is_full_w ? '100%' : w,
						height: is_full_h ? '100%' : h,
						marginTop: is_full_h ? 0 : (h / 2) * -1,
						marginLeft: is_full_w ? 0 : (w / 2) * -1
					});
				} else {
					//desktop
					$modal.css({
						opacity: v.resize ? 1 : 0,
						top: '50%',
						left: '50%',
						width: w,
						height: words ? 'auto' : h,
						marginTop: (h / 2) * -1,
						marginLeft: is_iframe ? (iw / 2) * -1 : (w / 2) * -1
					});
				}

				$global.uiLoading({ visible: false });

				//modal backdrop setup
				if (layN === 1) {
					modalBackdrop('open', born);
				} else {
					$('body').removeClass('modal-full');
					$modal.attr('aria-hidden', false);
					//if (!words) { $modal.css({ top: 0 }); }
					if (!$modal.closest('#baseLayer').length || !!born) {
						$('#baseLayer').addClass('under').find('.modal-backdrop').css('opacity', 0);

						if (!!$('body > .modal-backdrop').length) {
							$('body > .modal-backdrop').css('z-index', zidx + 20 - 1).attr('n', layN + 20 - 1);
						} else {
							$('body').append('<div class="modal-backdrop out on" style="display:block; width:101%; height:101%; opacity:0.7; z-index:' + (zidx + 20 - 1) + '" n="'+ (layN + 20 - 1) +'" ></div>');
						}
					} else {
						$('.modal-backdrop').css('z-index', layN - 1).attr('n', layN);
					}
				}

				//$modalCont.css('height', h_cont - 1);

				//alert, confirm modal 제외
				if (!words) {
					if (window.mCustomScrollbar && !iname && isMscroll) {
						//pc모드, 아이프레임X,
						$modalCont.mCustomScrollbar({ scrollButtons: { enable: true } });
					}
				}
				if (is_mobile && full) {
					//모바일 전체모달레이어 show 모션 효과
					//$modal.find('.ui-floating').removeClass('.ui-fixed-top').find('.ui-floating-wrap').removeAttr('style');
					$modal.css({ 'min-height': $(win).outerHeight(), background: '#fff' })
						.animate({
							opacity: 1, 
							top: 0
						}, 500, 'easeInOutQuart', function () {
							$('body').addClass('modal-full');
							modalCompleted();
						});
				} else {
					$modal.css('opacity', 1);
					modalCompleted();
				}
			}
			function modalCompleted() {
				!!callback ? callback() : '';				

				win[global].uiFocusTab({
					selector: '#' + opt.id
				});
				$modal.data('orgw', w).data('orgh', h);
				
				window.mCustomScrollbar && isMscroll ?
					setTimeout(function () {
						$modalCont.mCustomScrollbar('update');
					}, 0) : '';

				if (is_iframe) {
					//$global.uiCheck.ie8 ? frames[opt.iname].$plugins.page.formReset() : '';
					if (!$global.uiCheck.ie8) {
						window.mCustomScrollbar && isMscroll ?
							frames[opt.iname].$('.wrap-iframe').mCustomScrollbar({ scrollButtons: { enable: true } }) : '';
						// win[global].callback !== undefined ? frames[opt.iname].$plugins.callback.modal(opt.id) : '';
					}
				}

				!!words ? '' : 
				win[global].callback !== undefined ? $plugins.callback.modal(opt.id) : '';

				//!words ? win[global].uiModalResize({ id: opt.id }) : '';
			}
		}

		//event 
		if (!is_mobile) {
			$(win).resize(function () {
				clearTimeout(timer_resize);
				timer_resize = setTimeout(function(){
					if ($('.ui-modal[aria-hidden="false"]').length) {
						//$('.ui-modal[aria-hidden="false"] .ui-modal-cont').removeAttr('style');
						modalApp({ resize: true });
					}
				},100);
			});
		}
		$modal.find('.ui-modal-close').off('click.uilayerpop').on('click.uilayerpop', function (e) {
			e.preventDefault();
			win[global].uiModalClose({ id: opt.id, closecallback: closecallback });
		});
	}
	function createUiModalResize(opt) {
		var opt = $.extend(true, {}, $('#' + opt.id).data('opt'), opt),
			$modal = $('#' + opt.id),
			_opt = $modal.data('opt'),
			$modalWrap = $modal.find('.ui-modal-wrap'),
			$modalTit = $modal.find('.ui-modal-tit'),
			$modalCont = $modal.find('.ui-modal-cont'),
			$modalFoot = $modal.find('.ui-modal-footer'),
			titF,
			titH,
			w = _opt.width === undefined ? Math.ceil($modal.outerWidth()) : _opt.width,
			h = _opt.height === undefined ? Math.ceil($modal.outerHeight()) : _opt.height,
			words = _opt.words === undefined ? false : _opt.words,
			termsUrl = _opt.termsUrl === undefined ? false : _opt.termsUrl,
			modalSpace = 10,
			full = _opt.full === undefined ? false : _opt.full,
			winH = $(win).outerHeight(),
			winW = $(win).outerWidth(),
			overH = winH <= h,
			overW = winW <= w,
			iname = _opt.iname === undefined ? false : _opt.iname,
			h_cont,
			timer,
			is_full_w,
			is_full_h,
			layN,
			is_iframe,
			zidx,
			iw,
			ih,
			__h,
			laywrap_h,
			is_mobile = $global.uiCheck.mobile;

		if (is_mobile) {
			return false;
		}
		//초기화 및 세팅
		$modalCont.css({ height: 'auto', maxHeight: 'none' });
		$modal.css({ height: 'auto', width: 'auto' });
		$modal.find('.mCustomScrollBox').css({ maxHeight: 'none' });

		titH = !!$modalTit.length ? $modalTit.outerHeight() : 0;
		titF = !!$modalFoot.outerHeight() ? $modalFoot.outerHeight() : 0;
		
		setTimeout(function(){
			review();
		},100);

		function review(){
			
			if (full) {
				if (!opt.height) {
					!!titH && !!titF ? __h = Math.ceil(winH - (titH)) : '';
					!!titH && !titF ? __h = Math.ceil(winH - titH) : '';
					!titH && !!titF ? __h = Math.ceil(winH) : '';
					!titH && !titF ? __h = Math.ceil(winH) : '';
					$modalCont.css('max-height', __h);
					$modalCont.css('height', __h);
					h_cont = __h;
				} else {
					$modalCont.css('max-height', Math.ceil(opt.height - (titH)));
					$modalCont.css('height',  Math.ceil(opt.height - (titH)));
				}
			} else {
				if (!opt.height) {
					//$modalCont.css('max-height', 'none');
					laywrap_h = $modal.find('.ui-modal-wrap').outerHeight();
					if (laywrap_h > winH) {
						laywrap_h = winH;
						!!titH && !!titF ? __h = Math.ceil(laywrap_h - (titH)) : '';
						!!titH && !titF ? __h = Math.ceil(laywrap_h - titH) : '';
						!titH && !!titF ? __h = Math.ceil(laywrap_h) : '';
						!titH && !titF ? __h = Math.ceil($modalWrap.height()) : '';
						__h = __h;
						$modalCont.css('max-height', __h);
						$modalCont.css('height',  __h);
						h_cont = __h;
					} 
				} else {
					$modalCont.css('max-height', Math.ceil(opt.height - (titH)));
					$modalCont.css('height', Math.ceil(opt.height - (titH)));
				}
			}

			h = (opt.height === undefined) ? Math.ceil($modal.outerHeight()) : opt.height;
			w = (opt.width === undefined) ? Math.ceil($modal.outerWidth()) : opt.width;

			overH = winH <= h;
			overW = winW <= w;

			//|| !words
			if (!is_mobile || !words) {
				if (overW) {
					full = true;
					$modal.addClass('modal-full');
				} else {
					full = false;
					$modal.removeClass('modal-full');
				}
			}

			is_full_h = overH || full;
			is_full_w = overW || full;

			is_iframe = !!$modal.find('.ui-modal-iframe').length;
			iw = $modal.find('.ui-modal-iframe').data('orgw');
			ih = $modal.find('.ui-modal-iframe').data('orgh');
			
			//full ? is_full_h = true : '';
			if (is_full_h) {
				//full
				$modalCont.css({ height: Math.ceil(winH - (titH + titF) - (modalSpace * 2)) + 'px' });
				winH < ih ?
					$modal.find('.ui-modal-iframe iframe').attr('height', winH - (modalSpace * 2)) :
					$modal.find('.ui-modal-iframe iframe').attr('height', ih);

				$modal.css('height', winH - (modalSpace * 2));
			} else {
				!!words ? $modalCont.css('hegiht','auto') : '';
				h = !!titF ? h + titF : h;
				$modal.css('height', h);
			}

			$modal.animate({
				top: is_full_h ? modalSpace : '50%',
				left: is_full_w ? modalSpace : '50%',
				width: w,
				height: is_full_h ? winH - (modalSpace * 2) : words ? 'auto' : h,
				marginTop: is_full_h ? 0 : (h / 2) * -1,
				marginLeft: is_full_w ? 0 : (w / 2) * -1
			},200);
		}
		// if (is_full_h) {
		// 	$modalCont.css({ height: Math.ceil(winH - (titH + titF) - (modalSpace * 2)) + 'px' });
		// 	$modalWrap.css('overflow', 'hidden');
		// 	$modalCont.css({ height: Math.ceil(winH - (titH + titF) - (modalSpace * 2)) + 'px' });
		// } else {
		// 	if (words) {
		// 		$modalCont.css({ height: 'auto' });
		// 	}
		// 	if (termsUrl) {
		// 		$modalCont.css({ height: h_cont - 1 });
		// 	}
		// }

		// var is_iframe = !!$modal.find('.ui-modal-iframe').length,
		// 	iw = $modal.find('.ui-modal-iframe').data('orgw'),
		// 	ih = $modal.find('.ui-modal-iframe').data('orgh');

		// $modal.css({
		// 	top: is_full_h ? modalSpace : '50%',
		// 	left: is_full_w ? modalSpace : '50%',
		// 	width: is_full_w ? is_mobile ? '100%' : winW - (modalSpace * 2) : is_iframe ? iw : w,
		// 	height: is_full_h ? is_iframe ? winH : winH - (modalSpace * 2) : h,
		// 	marginTop: is_full_h ? 0 : (h / 2) * -1,
		// 	marginLeft: is_full_w ? 0 : (w / 2) * -1
		// });
		// is_full_w ?
		// 	$modal.find('.ui-modal-iframe iframe').attr('width', winW - (modalSpace * 2)).attr('height', winH - (modalSpace * 2)) :
		// 	$modal.find('.ui-modal-iframe iframe').attr('width', $modal.find('.ui-modal-iframe').data('orgw')).attr('height', $modal.find('.ui-modal-iframe').data('orgh'));

	}
	function createUiModalScrollReset(v) {
		var $this = $('#' + v),
			c_h = $this.find('.mCSB_container').outerHeight(),
			w_h = $this.find('.ui-modal-cont').outerHeight();

		if (c_h < w_h) {
			//$this.find('.ui-modal-cont').css('height', 'auto');
			win[global].uiModalResize({ id: v });
		} else {
			if (!!$this.length) {
				if (Math.abs(w_h - c_h) < 10) {
					$this.addClass('hide-scroll');
					$this.find('.mCSB_2_scrollbar').attr('tabindex', '-1');
				} else {
					$this.removeClass('hide-scroll').removeClass('hide-scroll2');
					$this.find('.mCSB_2_scrollbar').removeAttr('tabindex');
				}
			} else {
				return false;
			}
		}
	}
	$plugins.uiModal.focusid = '';
	function createUiModalClose(opt) {
		var now_callback = opt === undefined || opt.callback === undefined ? false : opt.callback,
			opt = $.extend(true, {}, $('#' + opt.id).data('opt'), opt),
			$modal = $('#' + opt.id),
			$modalshow = $('.ui-modal[opened="true"]'),
			layN = $modalshow.length,
			autofocus = opt.autofocus,
			endfocus = opt.endfocus === null ? typeof $modal.data('endfocus') === 'string' ? '#' + $modal.data('endfocus') : $modal.data('endfocus') : '#' + opt.endfocus,
			layRemove = opt.remove,

			closecallback = !!now_callback ? now_callback : opt.closecallback,
			full = opt.full, 
			termsTit = opt.termsTit, 
			sct = $modal.data('scrolltop') === undefined ? 0 : $modal.data('scrolltop'),
			ps = opt.ps,
			wst = $(win).scrollTop(),
			winH = $(win).outerHeight(),
			h = Math.ceil($modal.outerHeight()),
			fst;

		endfocus === '#' || endfocus === '' || endfocus === null || endfocus === undefined ? 
			endfocus = 'body' : '';

		opt.endfocus !== undefined && opt.endfocus !== null && !!endfocus ? 
		 	sct = $(endfocus).offset().top : '';

		$global.uiCheck.mobile ? !!termsTit ? full = true : '' : '';

		$('#__modalCF_cont').css('display', 'none');
		
		if (!!$('#uiCfPlayer').length) {
			$global.uiCheck.ie8 ? 
			doc.getElementById('uiCfPlayer').stop() : doc.getElementById('uiCfPlayer').pause();
		}

		if (layN < 2) {
			$modal.removeAttr('opened');
			if ($global.uiCheck.mobile && full) {
				$('body').removeClass('modal-full');
				$modal.attr('aria-hidden', true).stop().animate({
					top: '100%',
					marginTop:0
				}, 450, 'easeInOutQuart', closed);
			} else {
				$modal.attr('aria-hidden', true).stop().animate({
					opacity: 0
				}, 200, 'easeOutQuart', closed);
			}

			if (opt.id !== '__modalAlert' && opt.id !== '__modalConfirm' && opt.id !== '__modalAction') {
				$('html, body').stop().animate({
					scrollTop: sct
				}, 0, function () {
					autofocus ? $(endfocus).attr('tabindex', 0).focus() : '';
				});
			}

			win[global].uiModal.option.sctarray.pop();
			$('#baseLayer').removeClass('under');
			modalBackdrop('close');
		} else {
			//multi
			var z = layN - 1;
			$global.uiCheck.mobile ? 
			$('body').addClass('modal-full') : '';
			$modal.attr('aria-hidden', true).stop().animate({
				opacity: 0
			}, 200, function () {
				layRemove === true ? $modal.remove() : $modal.removeAttr('style').removeClass('scrollpop').removeAttr('opened');
				autofocus ? $(endfocus).attr('tabindex', 0).focus() : '';

				$('.ui-modal[n="' + z + '"]').attr('aria-hidden', false);
				
				$('html, body').stop().animate({
					scrollTop: Number(win[global].uiModal.option.sctarray.slice(-1)[0])
				}, 0, function () {
					win[global].uiModal.option.sctarray.pop();
					//autofocus ? $(endfocus).attr('tabindex', 0).focus() : '';
				});
				closecallback ? closecallback({ id: opt.id }) : '';
			});

			if (!!$modal.closest('#baseLayer').length) {
				$('#baseLayer').removeClass('under');
				$('.modal-backdrop').css('z-index', z - 1).attr('n', $('.modal-backdrop').attr('n') - 1);
			} else {
				if ($('body > .ui-modal[opened="true"]').length > 1) {
					var zz = $('body > .modal-backdrop').attr('n');

					$('body > .modal-backdrop').css('z-index', zz - 1).attr('n', zz - 1);
					
				} else {
					$('#baseLayer').removeClass('under');
					$('body > .modal-backdrop').remove();
					$('.modal-backdrop').css('opacity', '0.7');
				}
			}
		}

		function closed(v) {
			$('#baseWrap').removeAttr('aria-hidden');
			parent.$('body').removeClass('frame-modal-view');

			$('.ui-modal-close').off('click.uilayerpop');
			layRemove === true ? $modal.remove() : $modal.removeAttr('style').removeAttr('opened');

			!$(endfocus).length ? endfocus = 'body' : '';

			$modal.removeClass('modal-full');
			$('body').removeClass('modal-open modal-full modal-ria');
			$(doc).off('keyup.uilayerpop');

			closecallback ? closecallback({ id: opt.id }) : '';
		}
	}
	function modalBackdrop(value, born) {
		var $backdrop,
			timer,
			$wrap = !!$('#baseLayer').length ? $('#baseLayer') : $('body');

		born ? $wrap = $('body') : '';

		if (value === 'open' && !$('body').data('bgmodal')) {
			$('body').data('bgmodal', true);
			$wrap.find('.modal-backdrop').length ? '' : $wrap.append('<div class="modal-backdrop"></div>');
			$backdrop = $('.modal-backdrop');
			$backdrop.css('display', 'block');

			clearTimeout(timer);
			timer = setTimeout(function () {
				$backdrop.stop().animate({
					opacity: 0.7,
					width: '101%',
					height: '101%',
				}, 200).addClass('on');
			}, 0);
		} else {
			$('body').data('bgmodal', false);
			$('.modal-backdrop').stop().animate({
				opacity: 0
			}, 200, function () {
				$(this).remove();
			}).removeClass('on');
		}
	}


	function createUiErrorTooltip(opt) {
		var $tip = typeof opt.id === 'string' ? $('#' + opt.id) : opt.id,
			id = opt.id === undefined ? null : $tip.attr('id') + '_tip',
			show = opt.show === undefined ? true : opt.show,
			time = opt.time === undefined ? null : opt.time,
			msg = opt.msg === undefined ? '' : opt.msg;

		//setting
		if (!$('#' + id).length && id !== null) {
			$tip.attr('aria-describedby', id);
			$('#baseLayer').append('<div class="ui-tooltip type-auto" id="' + id + '" role="tooltip" aria-hidden="true"><span class="tt-arrow"></span><div class="tip-cont">' + msg + '</div></div>');
		}

		show ? win[global].uiTooltip({ id: id, visible: show, ps: 'left' }) : win[global].uiTooltip({ visible: false });

		if (!!time && id !== null) {
			setTimeout(function () {
				win[global].uiTooltip({ visible: false });
				$tip.removeAttr('aria-describedby');
				$('#' + id).remove();
			}, time);
		}

		if (id !== null) {
			$tip.off('blur.tooltiperror').on('blur.tooltiperror', function () {
				win[global].uiTooltip({ visible: false })
			});
		}
	}

	function createUiTooltip(opt) {
		var $btn = $('.ui-tooltip-btn'),
			visible = opt === undefined || opt.visible === undefined ? null : opt.visible,
			$tip = opt === undefined || opt.id === undefined ? false : typeof opt.id === 'string' ? $('#' + opt.id) : opt.id,
			sp = 10,
			off_t,
			off_l,
			w,
			h,
			bw,
			bh,
			st,
			sl,
			id = opt === undefined || opt.id === undefined ? '' : $tip.attr('id'),
			ps = opt === undefined || opt.ps === undefined ? false : opt.ps,
			timer;

		if (visible !== null) {
			visible ? tooltipSet(id) : tooltipHide();
		}

		$btn
			.off('mouseover.tooltip focus.tooltip').on('mouseover.tooltip focus.tooltip', function () {
				tooltipSet($(this).attr('aria-describedby'));
			})
			.off('mouseleave.tooltip').on('mouseleave.tooltip', function () {
				tooltipHideDelay();
				$('.ui-tooltip').on('mouseover', function () {
					clearTimeout(timer);
				}).on('mouseleave', function () {
					tooltipHide();
				});
			})
			.off('touchcancel.tooltip blur.tooltip').on('touchcancel.tooltip blur.tooltip', function () {
				tooltipHide();
			});

		function tooltipSet(v) {
			var $t = $('[aria-describedby="' + v + '"]');
			$('#' + v).removeClass('ps-ct ps-cb ps-lt ps-lb ps-rt ps-rb');

			id = v;
			off_t = $t.offset().top;
			off_l = $t.offset().left;
			w = $t.outerWidth();
			h = $t.outerHeight();
			bw = $(win).innerWidth();
			bh = $(win).innerHeight();
			st = $(doc).scrollTop();
			sl = $(doc).scrollLeft();

			tooltipShow(off_t, off_l, w, h, bw, bh, st, sl, id, false);
		}
		function tooltipHide(isfocus, _id) {
			$('.ui-tooltip').removeAttr('style').attr('aria-hidden', true).removeClass('ps-ct ps-cb ps-lt ps-lb ps-rt ps-rb');
		}
		function tooltipHideDelay() {
			timer = setTimeout(tooltipHide, 0);
		}
		function tooltipShow(off_t, off_l, w, h, bw, bh, st, sl, id, isfocus) {
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
				if (!$global.uiCheck.ie8) {
					ps_l = ps_l;
					ps_r = ps_r;
				}

				($global.uiCheck.ie) ? '' : off_t = off_t;
			}

			if (!!$id.closest('.type-fixed-bottom').length) {
				off_t = off_t - $('.ui-modal-tit').outerHeight();
			}

			$id.addClass(cursorCls).attr('aria-hidden', false).css({
				display: 'block'
			}).css({
				top: pst ? off_t + h + sp : off_t - th - sp,
				left: psl ? ps_l : ps_r
			});
		}
	}

	function createUiFloating(opt) {
		var id = opt.id,
			ps = opt.ps === undefined ? 'bottom' : opt.ps,
			add = opt.add === undefined ? false : typeof opt.add === 'string' ? $('#' + opt.add) : opt.add,
			fix = opt.fix === undefined ? true : opt.fix,
			callback = opt.callback === undefined ? false : opt.callback,
			$id = $('#' + id),
			$idwrap = $id.find('.ui-floating-wrap'),
			$add = add,
			$addwrap = !!add ? $add.find('.ui-floating-wrap').length ? $add.find('.ui-floating-wrap') : $add : '',
			c = 'ui-fixed-' + ps,
			timer;

		(!!fix) ? $id.addClass(c) : '';

		if ($id.length) {
			clearTimeout(timer);
			timer = setTimeout(act, 300);
		}

		$(win).off('scroll.' + id).on('scroll.' + id, function () {
			
			if ($id.length && !$('body').data('unfloating')) {
				act();
				clearTimeout(timer);
				timer = setTimeout(act, 500);
			}
		});

		function act() {
			$idwrap.css('overflow', 'hidden');

			var tt = Math.ceil($id.offset().top),
				th = Math.ceil($idwrap.outerHeight()),
				st = $(win).scrollTop(),
				wh = Math.ceil($global.uiCheck.mobile ? window.screen.height : $(win).outerHeight()),
				dh = Math.ceil($(doc).outerHeight()),
				lh = (!!add) ? $add.outerHeight() : 0,
				lt = (!!add) ? dh - ($add.offset().top).toFixed(0) : 0,
				lb = 0,
				_lb;

			$idwrap.removeAttr('style');
			$id.data('fixbottom', th);

			if (!!add) {
				if ($add.data('fixbottom') === undefined) {
					$add.data('fixbottom', th + $addwrap.outerHeight());
				}
			}

			(!!add) ? lh = lh + Number($add.data('fixtop') === undefined ? 0 : $add.data('fixtop')) : '';
			(!!callback) ? callback({ id: id, scrolltop: st, boundaryline: tt - lh }) : '';
			$id.css('height', th);

			if (ps === 'top') {
				if (fix === true) {
					if (tt - lh <= st) {
						$id.removeClass(c).data('fixtop', false);
						$idwrap.css('top', 0);
					} else {
						$id.addClass(c).data('fixtop', lh);
						$idwrap.css('top', lh);
					}
				}
				else {
					if (tt - lh <= st) {
						$id.addClass(c).data('fixtop', lh);
						$idwrap.css('top', lh);
					} else {
						$id.removeClass(c).data('fixtop', false);
						$idwrap.css('top', 0);
					}
				}
			} else if (ps === 'bottom') {
				if (!!add) {
					lb = th + Number($add.data('fixbottom'));
					$id.data('fixbottom', lb);
				}
				_lb = (lb - th < 0) ? 0 : lb - th;

				if (fix === true) {
					if (tt + th + _lb - wh <= st) {
						$id.removeClass(c);
						$idwrap.removeAttr('style');
					} else {
						$id.addClass(c)
						$idwrap.css('bottom', _lb);
					}

				} else {
					if (tt + th + _lb - wh <= st) {
						$id.addClass(c);
						$idwrap.css('bottom', _lb);
					} else {
						$id.removeClass(c);
						$idwrap.removeAttr('style');
					}
				}
			}
		}
	}

	function createUiShowHide(opt) {
		var $this = $('#' + opt.id),
			current = opt.current,
			show = opt.show,
			$item = $this.find('[class*="ui-showhide-"]');

		if (current === 'all') {
			show ? $item.css('display', 'block').attr('aria-hidden', false) : $item.css('display', 'none').attr('aria-hidden', true);
		} else {
			show ? $item.eq(current).css('display', 'block').attr('aria-hidden', false) : $item.eq(current).css('display', 'none').attr('aria-hidden', true);
		}
	}

	function createUiPageStep(opt) {
		var $page = $('#' + opt.id),
			$wrap = $page.find('.ui-pagestep-wrap'),
			$tit = $page.find('.ui-pagestep-tit'),
			$item = $page.find('.ui-pagestep-item'),
			$prcs = $page.find('.ui-pagestep-prcs'),
			$prcs_step = $prcs.find('.process-step li'),
			$next = $page.find('.ui-pagestep-next'),
			$prev = $page.find('.ui-pagestep-prev'),
			len = $item.length,
			type = opt.type === undefined ? false : opt.type,
			current = opt.current === undefined ? 0 : opt.current,
			callback = opt.callback === undefined ? false : opt.callback,
			effect = opt.effect === undefined ? 'slide' : opt.effect,
			w = $page.outerWidth();

		type ? $page.data('type', type) : '';

		if ($tit.length) {
			$tit.each(function () {
				$(this).removeClass('show').attr('aria-hidden', true);
			});
		}

		$item.each(function () {
			$(this).removeClass('show').attr('aria-hidden', true);
		});

		$prcs.attr('role', 'img').attr('aria-label', '총 ' + $prcs_step.length + '단계중 현재 ' + (current + 1) + '' + $prcs_step.eq(current).find('strong').text() + ' 진행중');
		$prcs_step.removeClass('selected').eq(current).addClass('selected');
		$tit.eq(current).addClass('show').attr('aria-hidden', false);
		$item.eq(current).addClass('show').attr('aria-hidden', false);
		$('body').data('steppage', current + 1);

		$next.off('click.uipagenext').on('click.uipagenext', function (e) {
			e.preventDefault();
			win[global].uiPageStepSlide({ id: opt.id, move: 'next', callback: callback, effect: effect });
		});
		$prev.off('click.uipageprev').on('click.uipageprev', function (e) {
			e.preventDefault();
			win[global].uiPageStepSlide({ id: opt.id, move: 'prev', callback: callback, effect: effect });
		});
	}

	function createUiPageStepSlide(opt) {
		var $page = $('#' + opt.id),
			$wrap = $page.find('.ui-pagestep-wrap'),
			$tit = $page.find('.ui-pagestep-tit'),
			$item = $page.find('.ui-pagestep-item'),
			$prcs = $page.find('.ui-pagestep-prcs'),
			$prcs_step = $prcs.find('.process-step li'),
			len = $prcs_step.length,
			move = opt.move === undefined ? 'next' : opt.move,
			type = $page.data('type') === 'modal' ? true : false,
			callback = opt.callback === undefined ? false : opt.callback,
			effect = opt.effect === undefined ? 'slide' : opt.effect,
			n = $page.find('.ui-pagestep-item[aria-hidden="false"]').index(),
			w = $page.outerWidth();

		if (move === 'next') {
			if (effect === 'fade') {
				nextAct();
			} else {
				$item.eq(n + 1).addClass('show').attr('aria-hidden', false);
				$tit.eq(n + 1).addClass('show').attr('aria-hidden', false);
				$wrap.stop().animate({
					'left': w * -1 + 'px'
				}, 200, function () {
					nextAct();
				});
			}
		} else if (move === 'prev') {
			if (effect === 'fade') {
				prevAct();
			} else {
				$item.eq(n - 1).addClass('show').attr('aria-hidden', false);
				$tit.eq(n - 1).addClass('show').attr('aria-hidden', false);
				$wrap.css('left', w * -1).stop().animate({
					'left': 0
				}, 200, function () {
					prevAct();
				});
			}
		}

		if (!type) {
			$('html, body').stop().animate({
				scrollTop: 0
			});
		}
		function nextAct() {
			$wrap.css('left', 0);
			$item.removeClass('show').attr('aria-hidden', true);
			$item.eq(n).removeClass('show').attr('aria-hidden', true);
			$item.eq(n + 1).addClass('show').attr('aria-hidden', false).focus();
			$tit.removeClass('show').attr('aria-hidden', true);
			$tit.eq(n).removeClass('show').attr('aria-hidden', true);
			$tit.eq(n + 1).addClass('show').attr('aria-hidden', false);
			$prcs_step.removeClass('selected').eq(n + 1).addClass('selected');
			type ? $plugins.uiModalResize({ id: $page.closest('.ui-modal').attr('id') }) : '';
			callback ? callback({ current: n + 1, id: opt.id }) : '';
			$prcs.attr('role', 'img').attr('aria-label', '총 ' + len + '단계중 현재 ' + (n + 2) + '' + $prcs_step.eq(n + 1).find('strong').text() + ' 진행중').attr('tabindex', 0).focus();
			$('body').data('steppage', n + 2);

		}
		function prevAct() {
			$item.removeClass('show').attr('aria-hidden', true);
			$item.eq(n).removeClass('show').attr('aria-hidden', true);
			$item.eq(n - 1).addClass('show').attr('aria-hidden', false).focus();
			$tit.removeClass('show').attr('aria-hidden', true);
			$tit.eq(n).removeClass('show').attr('aria-hidden', true);
			$tit.eq(n - 1).addClass('show').attr('aria-hidden', false);
			$prcs_step.removeClass('selected').eq(n - 1).addClass('selected');
			type ? $plugins.uiModalResize({ id: $page.closest('.ui-modal').attr('id') }) : '';
			callback ? callback({ current: n - 1, id: opt.id }) : '';
			$prcs.attr('role', 'img').attr('aria-label', '총 ' + len + '단계중 현재 ' + (n) + '' + $prcs_step.eq(n - 1).find('strong').text() + ' 진행중').attr('tabindex', 0).focus();
			$('body').data('steppage', n);
		}
	}

	function createUiPopup(opt) {
		var link = opt.link,
			name = (!opt.name) ? 'new popup' : opt.name,
			width = (!opt.width) ? 790 : opt.width,
			height = (!opt.height) ? 620 : opt.height,
			align = (!opt.align) ? 'center' : opt.align,
			top = (opt.top === undefined) ? 0 : opt.top,
			left = (opt.left === undefined) ? 0 : opt.left,
			toolbar = (!opt.toolbar) ? 'no' : opt.toolbar,
			location = (!opt.location) ? 'no' : opt.location,
			menubar = (!opt.menubar) ? 'no' : opt.menubar,
			status = (!opt.status) ? 'no' : opt.status,
			resizable = (!opt.resizable) ? 'no' : opt.resizable,
			scrollbars = (!opt.scrollbars) ? 'yes' : opt.scrollbars,
			specs;

		if (align === 'center') {
			left = ($(win).outerWidth() / 2) - (width / 2);
			top = ($(win).outerHeight() / 2) - (height / 2);
		}

		specs = 'width=' + width + ', height=' + height + ', left=' + left + ', top=' + top;
		specs += ', toolbar=' + opt.toolbar + ', location=' + opt.location + ', resizable=' + opt.resizable + ', status=' + opt.status + ', menubar=' + opt.menubar + ', scrollbars=' + opt.scrollbars;

		win.open(link, name, specs);
	}



	win[global].uiTrCheck.option = {
		callback: false
	};
	function createUiTrCheck() {
		var $tbl = $('.ui-trcheck'),
			len = $tbl.length,
			i = 0,
			j = 0,
			$tr = '',
			tr_len = 0,
			baseOpt = win[global].uiTrCheck.option,
			callback = baseOpt.callback,
			timer;

		for (i = 0; i < len; i++) {
			$tr = $tbl.eq(i).find('tbody tr');
			tr_len = $tr.length;

			for (j = 0; j < tr_len; j++) {
				if (!$tr.eq(j).find('td:eq(0) input').prop('disabled')) {
					!!$tr.eq(j).find('td:eq(0) input').prop('checked') ? $tr.eq(j).addClass('selected') : $tr.eq(j).removeClass('selected');
				}
			}
		}

		$(doc)
			.off('click.uitrck').on('click.uitrck', '.ui-trcheck input[type="radio"]', function () {
				(!!$(this).prop('checked')) ? $(this).closest('tr').addClass('selected focus').siblings('tr').removeClass('selected focus') : '';
			})
			.off('focus.uitrck').on('focus.uitrck', '.ui-trcheck input[type="radio"]', function () {
				(!!$(this).prop('checked')) ? $(this).closest('tr').addClass('focus').siblings('tr').removeClass('focus') : '';
			})
			.off('blur.uitrck').on('blur.uitrck', '.ui-trcheck input[type="radio"]', function () {
				$(this).closest('tr').removeClass('focus');
			})

			.off('change.uitrck').on('change.uitrck', '.ui-trcheck input[type="checkbox"]', function () {
				(!!$(this).prop('checked')) ? $(this).closest('tr').addClass('selected focus') : $(this).closest('tr').removeClass('selected focus');
			})
			.off('focus.uitrck').on('focus.uitrck', '.ui-trcheck td:eq(0) input[type="checkbox"]', function () {
				(!!$(this).prop('checked')) ? $(this).closest('tr').addClass('focus') : $(this).closest('tr').removeClass('focus');
			});
	}

	win[global].uiTbodyCheck.option = {
		callback: false
	};
	function createUiTbodyCheck() {
		var $tbl = $('.ui-tbodycheck'),
			len = $tbl.length,
			i = 0,
			j = 0,
			$tr = '',
			tr_len = 0,
			baseOpt = win[global].uiTbodyCheck.option,
			callback = baseOpt.callback;

		for (i = 0; i < len; i++) {
			$tr = $tbl.eq(i).find('tbody');
			tr_len = $tr.length;

			for (j = 0; j < tr_len; j++) {
				if (!$tr.eq(j).find('td:eq(0) input').prop('disabled')) {
					!!$tr.eq(j).find('td:eq(0) input').prop('checked') ? $tr.eq(j).addClass('selected') : $tr.eq(j).removeClass('selected');
				}
			}
		}

		$(doc)
			.off('click.uitbodyck').on('click.uitbodyck', '.ui-tbodycheck input[type="radio"]', function () {
				!!$(this).prop('checked') ? $(this).closest('tbody').addClass('selected focus').siblings('tbody').removeClass('selected focus') : '';
			})
			.off('change.uitbodyck').on('change.uitbodyck', '.ui-tbodycheck input[type="checkbox"]', function () {
				!!$(this).prop('checked') ? $(this).closest('tbody').addClass('selected focus') : $(this).closest('tbody').removeClass('selected focus');
			})
			.off('focus.uitbodyck').on('focus.uitbodyck', '.ui-tbodycheck input[type="checkbox"]', function () {
				(!!$(this).prop('checked')) ? $(this).closest('tr').addClass('focus') : $(this).closest('tr').removeClass('focus');
			})
			.off('focus.uitbodyck').on('focus.uitbodyck', '.ui-tbodycheck input[type="radio"]', function () {
				(!!$(this).prop('checked')) ? $(this).closest('tr').addClass('focus').siblings('tr').removeClass('focus') : '';
			})
			.off('blur.uitbodyck').on('blur.uitbodyck', '.ui-tbodycheck input[type="radio"]', function () {
				$(this).closest('tbody').removeClass('focus');
			});
	}

	function createUiLiCheck() {
		var $ul = $('.ui-licheck'),
			len = $ul.length,
			i = 0,
			j = 0,
			$li = '',
			li_len = 0;

		for (i = 0; i < len; i++) {
			$li = $ul.eq(i).find('li');
			li_len = $li.length;

			for (j = 0; j < li_len; j++) {
				!!$li.eq(j).find('input').hasClass('checked') ?
					$li.eq(j).addClass('selected').find('button').append('<b class="hide">선택됨</b>') :
					$li.eq(j).removeClass('selected').find('button b.hide').remove();
			}
		}

		$(doc).off('click.uilick').on('click.uilick', '.ui-licheck button', function () {
			if (!$(this).hasClass('checked')) {
				$(this).addClass('checked').append('<b class="hide">선택됨</b>').closest('li').siblings('li').find('button').removeClass('checked').find('b.hide').remove();
			}
		});

	}

	function createUiTblScroll() {
		var $tbl = $('.tbl-scroll'),
			coln = 5,
			len = $tbl.length,
			$thead = '',
			$tbody = '',
			h = 0,
			i = 0;

		$tbl.css({
			'min-height':0,
			'max-height':'100%'
		});
		for (i = 0; i < len; i++) {
			coln = !!$tbl.eq(i).data('col') ? $tbl.eq(i).data('col') : 5;
			$thead = $tbl.eq(i).find('.tbl-scroll-head');
			$tbody = $tbl.eq(i).find('.tbl-scroll-body');
			h = 0;

			if ($tbody.find('tbody tr').length > coln) {
				for (var j = 0; j < coln; j++) {
					h = h + $tbody.find('tbody tr').eq(j).outerHeight();
				}
				$tbl.eq(i).addClass('is-scr');
				$tbody.css('min-height', h + 'px');
				if (!!$tbody.find('col').eq(-1).attr('class')) {
					$thead.find('col').eq(-1).removeClass().addClass($tbody.find('col').eq(-1).attr('class') + '-scr');
				}
			} else {
				$tbl.eq(i).removeClass('is-scr');
				$tbody.removeAttr('style');
			}
		}
	}

	function createUiTrEvent(opt) {
		var callback = null;

		if (opt === undefined) {
			callback = false;
		} else {
			callback = opt.callback === undefined ? false : opt.callback;
		}

		$('.ui-trevt-btn').off('click.trevent').on('click.trevent', function () {
			$(this).addClass('selected').attr('aria-selected', true).siblings().removeClass('selected').attr('aria-selected', false);
			callback ? callback($(this).data('value')) : '';
		}).off('keyup.trevent').on('keyup.trevent', function (e) {
			var keyCode = e.keyCode || e.which;

			if (keyCode === 32) {
				$(this).addClass('selected').attr('aria-selected', true).siblings().removeClass('selected').attr('aria-selected', false);
				callback ? callback($(this).data('value')) : '';
			}

		});
	}

	//사용여부확인 필요
	function createUiIframePage() {
		var iframeIs = $global.uiPara('pageType');

		if (iframeIs === 'iframe') {
			$('body').addClass('type-iframe');
		}
	}

	function createUiJsonList(opt) {
		var j_data = opt.json,
			$id = $('#' + opt.id),
			$list = $id.find('.ui-listjson-list'),
			$page = $id.find('.ui-listjson-paging'),
			type = opt.type === undefined ? 'csc' : opt.type,
			list = '',
			paranot = opt.paranot === undefined ? false : opt.paranot,
			len = j_data.length,
			//page = opt.page,
			page = $global.uiPara('itemmum') === undefined || paranot ?
				opt.page : (opt.json.length - Number($global.uiPara('itemmum'))) % opt.view === 0 ?
					((opt.json.length - Number($global.uiPara('itemmum'))) / opt.view) + 1 :
					(opt.json.length - Number($global.uiPara('itemmum'))) % opt.view < 0 ? 1 :
						Math.ceil((opt.json.length - Number($global.uiPara('itemmum'))) / opt.view),
			min = page === 1 ? 0 : opt.view * (page - 1),
			max = opt.view * page > len ? len : opt.view * page,
			i = min,
			paging_all = Math.ceil(len / opt.view),
			html_paging = '',
			pagediv = opt.pagewrap * Math.ceil(page / opt.pagewrap),
			pagediv2 = opt.pagewrap * (Math.ceil(page / opt.pagewrap) - 1),
			n = pagediv2;

		pagediv > paging_all ? pagediv = paging_all : '';
		$id.data('json', j_data).data('n', page).data('view', opt.view).data('all', paging_all).data('pagewrap', opt.pagewrap).data('type', opt.type);

		if (type === 'csc') {
			for (i; i < max; i++) {
				list += '<li class="ctg-car">';
				$global.uiCheck.mobile ?
					list += '<a href="/m/claim/' + j_data[i].mid + '.html">' :
					list += '<a href="/claim/' + j_data[i].id + '.html">';
				list += '<div class="num">' + j_data[i].num + '</div>';
				list += '<dl class="info" role="text">';
				list += '<dt>' + j_data[i].tit + '</dt>';
				list += '<dd>' + j_data[i].txt + '</dd>';
				list += '</dl>';
				list += '</a>';
				list += '</li>';
			}
			$list.find('li').remove();
		}

		if (type === 'winnerlist') {
			if (max < 1) {
				list += '<tr>';
				list += '<td colspan="3" class="none">확인 가능한 게시물이 없습니다.</td>';
				list += '</tr>';
			} else {
				for (i; i < max; i++) {
					list += '<tr>';
					list += '<td class="txt-l">' + j_data[i].tit + '</td>';
					if ($global.uiCheck.mobile) {
						list += '<td class="txt-l">' + j_data[i].date + '</td>';
						list += '<td><a href="/m/helpdesk/MP060702_002.html?winnerfile=' + j_data[i].file + '" class="btn-normal"><span>당첨자 보기</span></a></td>';
					} else {
						list += '<td>' + j_data[i].date + '</td>';
						list += '<td><a href="/helpdesk/PP060702_002.html?winnerfile=' + j_data[i].file + '" class="btn-normal"><span>당첨자 보기</span></a></td>';
					}
					list += '</tr>';
				}
			}

			$list.find('tr').remove();
		}
		$list.append(list);

		if (max > 0) {
			html_paging += '<div class="paging-wrap">';

			if (pagediv <= opt.pagewrap) {
				html_paging += '<button type="button" class="btn-page-first" disabled>맨 처음 페이지</button>';
				html_paging += '<button type="button" class="btn-page-prev" disabled>이전 페이지</button>';
			} else {
				html_paging += '<button type="button" class="btn-page-first">맨 처음 페이지</button>';
				html_paging += '<button type="button" class="btn-page-prev">이전 페이지</button>';
			}

			for (n; n < pagediv; n++) {

				var current = (n + 1);
				page === current ?
					html_paging += '<button type="button" data-n="' + current + '" class="btn-pageitem current"><span>' + current + '</span><span class="hide">현재페이지</span></button>' :
					html_paging += '<button type="button" data-n="' + current + '" class="btn-pageitem"><span>' + current + '</span><span class="hide">페이지</span></button>';
			}

			if (pagediv >= paging_all) {
				html_paging += '<button type="button" class="btn-page-next" disabled>다음 페이지</button>';
				html_paging += '<button type="button" class="btn-page-last" disabled>맨 마지막 페이지</button>';
			} else {
				html_paging += '<button type="button" class="btn-page-next">다음 페이지</button>';
				html_paging += '<button type="button" class="btn-page-last">맨 마지막 페이지</button>';
			}

			html_paging += '</div>';

			$page.find('.paging-wrap').remove();
		}

		$page.append(html_paging);


		$page.find('.btn-pageitem').off('click.paging').on('click.paging', function () {
			var $this = $(this).closest('.ui-listjson');

			win[global].uiJsonList({ json: $this.data('json'), id: $this.attr('id'), page: Number($(this).data('n')), view: Number($this.data('view')), pagewrap: Number($this.data('pagewrap')), paranot: true, type: $this.data('type') });
			$this.data('n', $(this).data('n'));
		});
		$page.find('.btn-page-next').off('click.paging').on('click.paging', function () {
			var $this = $(this).closest('.ui-listjson'),
				page_next = Number($this.data('n')) === Number($this.data('all')) ? Number($this.data('all')) : Number($this.data('n')) + 1;//한칸씩 이동

			page_next = pagediv + 1;

			win[global].uiJsonList({ json: $this.data('json'), id: $this.attr('id'), page: page_next, view: Number($this.data('view')), pagewrap: Number($this.data('pagewrap')), paranot: true, type: $this.data('type') });
			$this.data('n', page_next);
		});
		$page.find('.btn-page-prev').off('click.paging').on('click.paging', function () {
			var $this = $(this).closest('.ui-listjson'),
				page_prev = Number($this.data('n')) === 1 ? 1 : Number($this.data('n')) - 1;//한칸씩 이동

			page_prev = paging_all === pagediv ? Math.floor(paging_all / opt.pagewrap) * opt.pagewrap : pagediv - 3;

			win[global].uiJsonList({ json: $this.data('json'), id: $this.attr('id'), page: page_prev, view: Number($this.data('view')), pagewrap: Number($this.data('pagewrap')), paranot: true, type: $this.data('type') });
			$this.data('n', page_prev);
		});
		$page.find('.btn-page-first').off('click.paging').on('click.paging', function () {
			var $this = $(this).closest('.ui-listjson');

			win[global].uiJsonList({ json: $this.data('json'), id: $this.attr('id'), page: 1, view: Number($this.data('view')), pagewrap: Number($this.data('pagewrap')), paranot: true, type: $this.data('type') });
			$this.data('n', 1);
		});
		$page.find('.btn-page-last').off('click.paging').on('click.paging', function () {
			var $this = $(this).closest('.ui-listjson');

			win[global].uiJsonList({ json: $this.data('json'), id: $this.attr('id'), page: Number($this.data('all')), view: Number($this.data('view')), pagewrap: Number($this.data('pagewrap')), paranot: true, type: $this.data('type') });
			$this.data('n', Number($this.data('all')));
		});
	}

	function createUiCodinglist(opt) {
		var dataExecel;

		win[global].uiAjax({ url: opt.url, page: false, callback: callback });
		function callback(v) {
			dataExecel = v;

			var len = dataExecel.list.length,
				i = 0,
				state, date, enddate, pub, dev, id, idm, pop, tab, memo, overl, full, ifm,
				d1, d2, d3, d4, d5, d6, d7, d8,
				r1, r2, r3, r4,
				d1_, d2_, d3_, d4_, d5_, d6_, d7_, d8_,
				c1, c2, c3, c4, c5, c6, c7, c8,
				endsum = 0, delsum = 0, tstsum = 0, ingsum = 0, watsum = 0, chksum = 0, num = -1,
				ctg_state = [],
				ctg_pub = [],
				ctg_dev = [],
				ctg_date = [],
				ctg_enddate = [],
				ctg_mdate = [],
				ctg_menu = [],
				ctg_dev = [],
				cls2 = '',
				cls = '',
				root = '',
				depth = '',
				table = '';

			for (i = 0; i < len; i++) {
				state = dataExecel.list[i].state || '';
				date = dataExecel.list[i].date || '';
				enddate = dataExecel.list[i].enddate || '';
				pub = dataExecel.list[i].pub || '';
				dev = dataExecel.list[i].dev || '';
				id = dataExecel.list[i].id || '';
				idm = dataExecel.list[i].idm || '';
				full = dataExecel.list[i].full || '';
				pop = dataExecel.list[i].pop || '';
				ifm = dataExecel.list[i].ifm || '';
				tab = dataExecel.list[i].tab || '';
				memo = dataExecel.list[i].memo || '';
				d1 = dataExecel.list[i].d1 || '';
				d2 = dataExecel.list[i].d2 || '';
				d3 = dataExecel.list[i].d3 || '';
				d4 = dataExecel.list[i].d4 || '';
				d5 = dataExecel.list[i].d5 || '';
				d6 = dataExecel.list[i].d6 || '';
				d7 = dataExecel.list[i].d7 || '';
				d8 = dataExecel.list[i].d8 || '';
				r1 = dataExecel.list[i].r1 || '';
				r2 = dataExecel.list[i].r2 || '';
				r3 = dataExecel.list[i].r3 || '';
				r4 = dataExecel.list[i].r4 || '';
				overl = dataExecel.list[i].overlab || '';

				r1 === '' ? root += '' : root += '/' + r1;
				(dataExecel.list[i].r2 !== undefined && dataExecel.list[i].r2 !== '') ? root += '/' + r2 : '';
				(dataExecel.list[i].r3 !== undefined && dataExecel.list[i].r3 !== '') ? root += '/' + r3 : '';
				(dataExecel.list[i].r4 !== undefined && dataExecel.list[i].r4 !== '') ? root += '/' + r4 : '';

				(d1 !== '') ? d1_ = dataExecel.list[i - 1 < 0 ? 0 : i].d1 : d1 = d1_;

				(dataExecel.list[i].d1 === '') ?
					(d2 !== '') ? d2_ = dataExecel.list[i - 1 < 0 ? 0 : i].d2 : d2 = d2_ :
					(!!dataExecel.list[i - 1 < 0 ? 0 : i].d2) ? d2_ = dataExecel.list[i - 1 < 0 ? 0 : i].d2 : d2_ = '';

				(dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '') ?
					(d3 !== '') ? d3_ = dataExecel.list[i - 1 < 0 ? 0 : i].d3 : d3 = d3_ :
					(!!dataExecel.list[i - 1 < 0 ? 0 : i].d3) ? d3_ = dataExecel.list[i - 1 < 0 ? 0 : i].d3 : d3_ = '';

				(dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '' && dataExecel.list[i].d3 === '') ?
					(d4 !== '') ? d4_ = dataExecel.list[i - 1 < 0 ? 0 : i].d4 : d4 = d4_ :
					(!!dataExecel.list[i - 1 < 0 ? 0 : i].d4) ? d4_ = dataExecel.list[i - 1 < 0 ? 0 : i].d4 : d4_ = '';

				(dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '' && dataExecel.list[i].d3 === '' && dataExecel.list[i].d4 === '') ?
					(d5 !== '') ? d5_ = dataExecel.list[i - 1 < 0 ? 0 : i].d5 : d5 = d5_ :
					(!!dataExecel.list[i - 1 < 0 ? 0 : i].d5) ? d5_ = dataExecel.list[i - 1 < 0 ? 0 : i].d5 : d5_ = '';

				(dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '' && dataExecel.list[i].d3 === '' && dataExecel.list[i].d4 === '' && dataExecel.list[i].d5 === '') ?
					(d6 !== '') ? d6_ = dataExecel.list[i - 1 < 0 ? 0 : i].d6 : d6 = d6_ :
					(!!dataExecel.list[i - 1 < 0 ? 0 : i].d6) ? d6_ = dataExecel.list[i - 1 < 0 ? 0 : i].d6 : d6_ = '';

				(dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '' && dataExecel.list[i].d3 === '' && dataExecel.list[i].d4 === '' && dataExecel.list[i].d5 === '' && dataExecel.list[i].d6 === '') ?
					(d7 !== '') ? d7_ = dataExecel.list[i - 1 < 0 ? 0 : i].d7 : d7 = d7_ :
					(!!dataExecel.list[i - 1 < 0 ? 0 : i].d7) ? d7_ = dataExecel.list[i - 1 < 0 ? 0 : i].d7 : d7_ = '';

				!!dataExecel.list[i].d1 ? d1 = dataExecel.list[i].d1 : '';
				!!dataExecel.list[i].d2 ? d2 = dataExecel.list[i].d2 : '';
				!!dataExecel.list[i].d3 ? d3 = dataExecel.list[i].d3 : '';
				!!dataExecel.list[i].d4 ? d4 = dataExecel.list[i].d4 : '';
				!!dataExecel.list[i].d5 ? d5 = dataExecel.list[i].d5 : '';
				!!dataExecel.list[i].d6 ? d6 = dataExecel.list[i].d6 : '';
				!!dataExecel.list[i].d7 ? d7 = dataExecel.list[i].d7 : '';
				!!dataExecel.list[i].d8 ? d8 = dataExecel.list[i].d8 : '';

				endsum = (state === "완료") ? endsum + 1 : endsum;
				tstsum = (state === "검수") ? tstsum + 1 : tstsum;
				ingsum = (state === "진행") ? ingsum + 1 : ingsum;
				delsum = (state === "제외") ? delsum + 1 : delsum;
				watsum = (state === "대기") ? watsum + 1 : watsum;
				chksum = (state === "체크") ? chksum + 1 : chksum;
				var x = (i === 0) ? 0 : i - 1,
					z1 = dataExecel.list[i].d1 !== dataExecel.list[x].d1;
				c1 = (z1) ? ' c1' : '';
				c2 = (dataExecel.list[i].d2 !== dataExecel.list[x].d2) ? ' c2' : '';
				c3 = (dataExecel.list[i].d3 !== dataExecel.list[x].d3) ? ' c3' : '';
				c4 = (dataExecel.list[i].d4 !== dataExecel.list[x].d4) ? ' c4' : '';
				c5 = (dataExecel.list[i].d5 !== dataExecel.list[x].d5) ? ' c5' : '';
				c6 = (dataExecel.list[i].d6 !== dataExecel.list[x].d6) ? ' c6' : '';
				c7 = (dataExecel.list[i].d7 !== dataExecel.list[x].d7) ? ' c7' : '';
				c8 = (dataExecel.list[i].d8 !== dataExecel.list[x].d8) ? ' c8' : '';

				cls2 = state === '체크' ? 'chk' : state === '진행' ? 'ing' : state === '완료' ? 'end' : state === '검수' ? 'tst' : state === '제외' ? 'del' : state === '약관' ? 'trm' : '';
				cls = cls2 + c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8;

				ctg_state.push(dataExecel.list[i].state);
				ctg_pub.push(dataExecel.list[i].pub);
				ctg_dev.push(dataExecel.list[i].dev);
				state !== '제외' ? ctg_date.push(dataExecel.list[i].date) : '';
				ctg_enddate.push(dataExecel.list[i].enddate);
				ctg_menu.push(dataExecel.list[i].d2);

				var imgroot = $global.uiCheck.mobile ? "m" : "d";

				if (state !== '제외' && i === 0) {
					table += '<table>';
					table += '<caption>코딩리스트</caption>';
					table += '<colgroup>';
					table += '<col class="col1">';
					table += '<col class="col2">';
					table += '<col class="col3">';
					table += '<col class="col4">';
					table += '<col class="col4">';
					//table += '<col class="col5">';
					//table += '<col class="col7">';
					table += '<col class="col6">';
					table += '<col class="col6">';
					table += '<col class="col4">';
					table += '</colgroup>';
					table += '<colgroup>';
					(dataExecel.list[i].d1 !== undefined) ? table += '<col class="col8 n1">' : '';
					(dataExecel.list[i].d2 !== undefined) ? table += '<col class="col8 n2">' : '';
					(dataExecel.list[i].d3 !== undefined) ? table += '<col class="col8 n3">' : '';
					(dataExecel.list[i].d4 !== undefined) ? table += '<col class="col8 n4">' : '';
					(dataExecel.list[i].d5 !== undefined) ? table += '<col class="col8 n5">' : '';
					(dataExecel.list[i].d6 !== undefined) ? table += '<col class="col8 n6">' : '';
					(dataExecel.list[i].d7 !== undefined) ? table += '<col class="col8 n7">' : '';
					(dataExecel.list[i].d8 !== undefined) ? table += '<col class="col8 n8">' : '';
					table += '</colgroup>';
					table += '<col class="col9">';
					table += '<thead>';
					table += '<th scope="col">' + state + '</th>';
					table += '<th scope="col">' + date + '</th>';
					table += '<th scope="col">' + enddate + '</th>';
					table += '<th scope="col">' + pub + '</th>';
					table += '<th scope="col">' + dev + '</th>';
					//table += '<th scope="col">IMG</th>';
					//table += '<th scope="col">'+ root +'</th>';
					table += '<th scope="col">' + pop + '</th>';
					table += '<th scope="col">' + tab + '</th>';
					table += '<th scope="col">' + id + '</th>';
					(dataExecel.list[i].d1 !== undefined) ? table += '<th scope="col">' + d1 + '</th>' : '';
					(dataExecel.list[i].d2 !== undefined) ? table += '<th scope="col">' + d2 + '</th>' : '';
					(dataExecel.list[i].d3 !== undefined) ? table += '<th scope="col">' + d3 + '</th>' : '';
					(dataExecel.list[i].d4 !== undefined) ? table += '<th scope="col">' + d4 + '</th>' : '';
					(dataExecel.list[i].d5 !== undefined) ? table += '<th scope="col">' + d5 + '</th>' : '';
					(dataExecel.list[i].d6 !== undefined) ? table += '<th scope="col">' + d6 + '</th>' : '';
					(dataExecel.list[i].d7 !== undefined) ? table += '<th scope="col">' + d7 + '</th>' : '';
					(dataExecel.list[i].d8 !== undefined) ? table += '<th scope="col">' + d8 + '</th>' : '';
					table += '<th scope="col">' + memo + '</th>';
					table += '</thead>';
					table += '</tbody>';
				}
				else if (state !== '제외') {
					num = num + 1;
					$global.uiCheck.mobile ?
						table += '<tr class="' + cls + '" >' :
						table += '<tr class="' + cls + '">';
					table += '<td class="state"><span>' + state + '</span></td>';
					table += '<td class="date"><span>' + date + '</span></td>';
					table += '<td class="enddate"><span>' + enddate + '</span></td>';
					table += '<td class="name pub"><span>' + pub + '</span></td>';
					table += '<td class="name dev"><span>' + dev + '</span></td>';
					/*
					if (!!id) {
						table += '<td class="img"><span><a href="/vanilla/resources/json/design/'+ imgroot + '/'+ id +'.png" target="design"><img src="/vanilla/resources/json/design/img.png" alt=""></a></span></td>';
					} else {
						table += '<td class="img"></td>';
					}
					*/
					var popIs = !!pop ? 'P' : '',
						tabIs = tab === 'S' ? 'S' : tab === '' ? '' : 'T',
						full = !!full ? true : false;

					//table += '<td class="root"><span>' + root + '/</span></td>';
					table += '<td class="txt-c"><span>' + popIs + '</span></td>';
					table += '<td class="txt-c"><span>' + tabIs + '</span></td>';

					if (!pop) {
						table += (id !== '') ?
							(overl !== '') ?
								tabIs === 'T' ?
									'<td class="id ico_pg"><span><a href="' + root + '/' + overl + '.html?tab=' + (tab - 1) + '" target="coding">' + overl + '</a></span><span class="overl">' + id + '</span></td>' :
									'<td class="id ico_pg"><span><a href="' + root + '/' + overl + '.html" target="coding">' + overl + '</a></span><span class="overl">' + id + '</span></td>' :
								'<td class="id ico_pg"><span><a href="' + root + '/' + id + '.html" target="coding">' + id + '</a></span></td>' :
							'<td class="id "><span></span></td>';
					} else {
						table += id !== '' ? overl !== '' ? ifm === '' ? pop === '1' ? tabIs === 'T' ?
							'<td class="id ico_pg"><span><button type="button" onclick="$plugins.uiModal({ id:\'modal_' + overl + '\', full:' + full + ', link:\'' + root + '/' + overl + '.html?tab=' + (tab - 1) + '\'});">' + overl + '</button><span class="overl">' + id + '</span></td>' :
							'<td class="id ico_pg"><span><button type="button" onclick="$plugins.uiModal({ id:\'modal_' + overl + '\', full:' + full + ', link:\'' + root + '/' + overl + '.html\'});">' + overl + '</button><span class="overl">' + id + '</span></td>' :
							'<td class="id ico_pg"><span><button type="button" onclick="$plugins.uiModal({ id:\'__modalTerms\', link:\'/modal/modalTerms.html\', remove:true, termsTit:\'약관제목\', termsUrl:\'/terms/' + overl + '.html\' });">' + overl + '</button><span class="overl">' + id + '</span></td>' :
							'<td class="id ico_pg"><span><button type="button" onclick="$plugins.uiModal({ iframe:true, isrc:\'/modal/' + overl + '_iframe.html\', iname:\'name_' + overl + '\', id:\'modal_' + overl + '\', full:' + full + ' });">' + overl + '</button><span class="overl">' + id + '</span></td>' :
							(ifm === '') ?
								(pop === '1') ?
									tabIs === 'T' ?
										'<td class="id ico_pg"><span><button type="button" onclick="$plugins.uiModal({ id:\'modal_' + id + '\', full:' + full + ', link:\'' + root + '/' + id + '.html?tab=' + (tab - 1) + '\'});">' + id + '</button></td>' :
										'<td class="id ico_pg"><span><button type="button" onclick="$plugins.uiModal({ id:\'modal_' + id + '\', full:' + full + ', link:\'' + root + '/' + id + '.html\' });">' + id + '</button></td>' :
									'<td class="id ico_pg"><span><button type="button" onclick="$plugins.uiModal({ id:\'__modalTerms\', link:\'/modal/modalTerms.html\', remove:true, termsTit:\'약관제목\', termsUrl:\'/terms/' + id + '.html\' });">' + id + '</button></td>' :
								'<td class="id ico_pg"><span><button type="button" onclick="$plugins.uiModal({ iframe:true, isrc:\'/modal/' + id + '_iframe.html\', iname:\'name_' + id + '\', id:\'modal_' + id + '\', full:' + full + ' });">' + id + '</button></td>' :
							'<td class="id "><span></span></td>';
					}
					(dataExecel.list[i].d1 !== '') ? table += '<td class="d d1"><span>' + d1 + '</span></td>' : table += '<td class="d"></td>';
					(dataExecel.list[i].d2 !== '') ? table += '<td class="d d2"><span>' + d2 + '</span></td>' : table += '<td class="d"></td>';
					(dataExecel.list[i].d3 !== '') ? table += '<td class="d d3"><span>' + d3 + '</span></td>' : table += '<td class="d"></td>';
					(dataExecel.list[i].d4 !== '') ? table += '<td class="d d4"><span>' + d4 + '</span></td>' : table += '<td class="d"></td>';
					(dataExecel.list[i].d5 !== '') ? table += '<td class="d d5"><span>' + d5 + '</span></td>' : table += '<td class="d"></td>';
					(dataExecel.list[i].d6 !== '') ? table += '<td class="d d6"><span>' + d6 + '</span></td>' : table += '<td class="d"></td>';
					(dataExecel.list[i].d7 !== '') ? table += '<td class="d d7"><span>' + d7 + '</span></td>' : table += '<td class="d"></td>';
					(dataExecel.list[i].d8 !== '') ? table += '<td class="d d8"><span>' + d8 + '</span></td>' : table += '<td class="d"></td>';
					(dataExecel.list[i].memo === '') ? table += '<td class="memo none"><span>' + memo + '</span></td>' : table += '<td class="memo"><span>' + memo + '</span></td>';
					table += '</tr>';
					(i === len - 1) ? table += '</tbody>' : '';
					(i === len - 1) ? table += '</table>' : '';
				}
				root = '';
			}
			$('#' + opt.id).html(table);
			table = '';

			var info = ''
			info += '<ul class="ui-codinglist-info">';
			info += '<li>진행율(완료+검수+체크) : <span class="n_all">0</span> / <span class="total">0</span> (<span class="per0">0</span>%)</li>';
			info += '<li>완료 : <span class="n_end">0</span> (<span class="per1">0</span>%)</li>';
			info += '<li>검수 : <span class="n_tst">0</span> (<span class="per2">0</span>%)</li>';
			info += '<li>체크 : <span class="n_chk">0</span> (<span class="per5">0</span>%)</li>';
			info += '<li>진행 : <span class="n_ing">0</span> (<span class="per3">0</span>%)</li>';
			info += '<li>대기 : <span class="n_wat">0</span> (<span class="per4">0</span>%)</li>';
			info += '</ul>';
			$('#' + opt.id).prepend(info);

			if (!$('.ui-codinglist-info .total').data('data')) {
				$('.ui-codinglist-info .total').data('data', true).text(len - delsum - 1);
				$('.ui-codinglist-info .n_all').text(endsum + tstsum + chksum);
				$('.ui-codinglist-info .per0').text(((endsum + tstsum + chksum) / (len - delsum - 1) * 100).toFixed(0));
				$('.ui-codinglist-info .n_end').text(endsum);
				$('.ui-codinglist-info .per1').text((endsum / (len - delsum - 1) * 100).toFixed(0));
				$('.ui-codinglist-info .n_tst').text(tstsum);
				$('.ui-codinglist-info .per2').text((tstsum / (len - delsum - 1) * 100).toFixed(0));
				$('.ui-codinglist-info .n_ing').text(ingsum);
				$('.ui-codinglist-info .per3').text((ingsum / (len - delsum - 1) * 100).toFixed(0));
				$('.ui-codinglist-info .n_wat').text(watsum);
				$('.ui-codinglist-info .per4').text((watsum / (len - delsum - 1) * 100).toFixed(0));
				$('.ui-codinglist-info .n_chk').text(chksum);
				$('.ui-codinglist-info .per5').text((chksum / (len - delsum - 1) * 100).toFixed(0));
			}

			var sel = '';
			sel += '<div class="ui-codinglist-sel">';
			sel += '<button type="button" class="btn-base"><span>전체</span></button>';
			sel += '<select id="uiCLstate" data-ctg="state">';
			sel += '<option value="0">상태선택</option>';
			sel += '</select>';
			sel += '<select id="uiCLpub" data-ctg="pub">';
			sel += '<option value="0">퍼블선택</option>';
			sel += '</select>';
			sel += '<select id="uiCLdev" data-ctg="dev">';
			sel += '<option value="0">개발선택</option>';
			sel += '</select>';
			sel += '<select id="uiCLDate" data-ctg="date">';
			sel += '<option value="0">일정선택</option>';
			sel += '</select>';
			sel += '<select id="uiCLdepth" data-ctg="d2">';
			sel += '<option value="0">메뉴선택</option>';
			sel += '</select>';
			sel += '<a href="/guide/coding_list.html" class="btn-base"><span>PC</span></a>';
			sel += '<a href="/m/guide/coding_list.html" class="btn-base"><span>Mobile</span></a>';
			sel += '</div>';
			$('#' + opt.id).prepend(sel);

			selectoption('uiCLstate', ctg_state);
			selectoption('uiCLpub', ctg_pub);
			selectoption('uiCLDate', ctg_date, true);
			selectoption('uiCLdepth', ctg_menu);
			selectoption('uiCLdev', ctg_dev);
			selectAct();

			function selectoption(id, optarray, v) {
				var $sel = $('#' + id);
				var nn = 1,
					nnn = 1;
				if (!$sel.data('data')) {
					var optionArray = [],
						optionSum = [],
						j = 0,
						optionHtml = '';
					v ? optarray.push('일정') : '';
					optarray.splice(0, 1);

					// 숫자 .sort(function(a,b){return a-b}) , 문자 sort()
					optionArray = optarray.slice().sort().reduce(function (a, b) {
						if (a.slice(-1)[0] !== b && b !== '') {
							a.push(b);
							v ? optionSum.push(nn) : '';
							nn = 1;
						} else {
							nn = nn + 1;
						}
						return a;
					}, []);

					var alen = optionArray.length;
					for (j; j < alen; j++) {
						if (v) {
							if (j < alen - 1) {
								optionHtml += '<option value="' + optionArray[j] + '">' + optionArray[j] + ' [' + optionSum[j + 1] + ']</option>';
							}
						} else {
							optionHtml += '<option value="' + optionArray[j] + '">' + optionArray[j] + '</option>';
						}
					}
					$sel.data('data', true).append(optionHtml);
				}
			}

			function selectAct() {
				$('.ui-codinglist-sel select').on('change', function () {
					var $this = $(this),
						v = $this.val(),
						c = $this.data('ctg'),
						$sel = $('#' + opt.id + ' .' + c);

					if (v === '0') {
						$sel.closest('tr').removeClass('hidden');
					} else {
						$this.siblings().find('option:eq(0)').prop('selected', true);
						$sel.each(function (i) {
							v === 'all' ? $sel.closest('tr').removeClass('hidden') :
								v !== $sel.find('span').eq(i).text() ?
									$(this).closest('tr').addClass('hidden') : $(this).closest('tr').removeClass('hidden');
						});
					}
				});
			}

			$('.ui-codinglist-sel button').on('click', function (e) {
				$('#' + opt.id + ' tr').removeClass('hidden');
				$('.ui-codinglist-sel select').find('option:eq(0)').prop('selected', true);
			});

			$('.ui-codinglist table a, .ui-codinglist table button').off('click.uicoding').on('click.uicoding', function () {
				$(this).closest('tr').addClass('selected').siblings().removeClass('selected');
			});
		}
	}

	win[global].uiSlide.options = {
		current: 0,
		multi: false,
		loop: true,
		items: 1,
		eff: 'slide',
		dot: true,
		nav: true,
		auto: true,
		play: false,
		gauge: true,
		speed: 300,
		autoTime: 3000,
		callback: false,
		pagenumber: false,
		/* multi use */
		margin: 0,
		mouseDrag: true,
		touchDrag: true
	};
	function createUiSlide(opt) {
		win[global].uiSlide[opt.id] = {};
		var base = win[global].uiSlide[opt.id];

		base.root = $('#' + opt.id);
		base.tit = base.root.find('.ui-slide-tit');
		base.wrap = base.root.find('.ui-slide-wrap');
		base.itemwrap = base.root.find('.ui-slide-item-wrap');
		base.item = base.root.find('.ui-slide-item');
		base.itemtit = base.root.find('.ui-slide-item-tit');
		base.opt = $.extend(true, {}, win[global].uiSlide.options, opt);

		if (!base.root.is('.load')) {
			base.root.addClass('load');
			uiSlideSet(base);
		}
	}
	function uiSlideSet(base) {
		var base = base;

		base.opt.len = base.item.length;
		base.opt.w = base.item.eq(base.opt.current).outerWidth();
		base.opt.h = base.item.eq(base.opt.current).outerHeight();
		base.opt.winw = $(win).outerWidth();
		base.opt.docw = $(doc).outerHeight();

		//multi
		base.multi = {};
		base.multi.is = base.opt.multi;
		if (base.multi.is) {
			base.multi.w = [0]; //items width array
			base.multi.h = [];
			base.multi.ww = 0; //itemwrap width
			base.multi.rw = base.root.outerWidth(); //slide width
			base.root.addClass('ui-slide-multi n' + base.opt.items);
			base.itemwrap.addClass('ui-slide-multi-item');

			for (var i = 0; i < base.opt.len; i++) {
				base.item.eq(i).css('margin-right', (i !== base.opt.len - 1) ? base.opt.margin : 0);
				base.multi.h.push(base.item.eq(i).outerHeight());
				base.multi.ww = base.multi.ww + base.item.eq(i).outerWidth() + Number((i !== base.opt.len - 1) ? base.opt.margin : 0);
				base.multi.w.push(base.multi.ww);
			}
			base.itemwrap.css('width', base.multi.ww);
			base.itemwrap.data('left', 0);
		}

		if (!base.multi.is) {
			base.item.attr('aria-hidden', true).css('left', base.opt.w).eq(base.opt.current).attr('aria-hidden', false).css('left', 0);
			base.item.find('a, button, label, input').attr('tabindex', '-1');
			base.item.eq(base.opt.current).find('a, button, label, input').removeAttr('tabindex');
		}

		base.opt.pagenumber ? base.root.append('<div class="ui-slide-pagenum" aria-label="총 ' + base.opt.len + '개중 현재 ' + (base.opt.current + 1) + '번째">' + (base.opt.current + 1) + '/' + base.opt.len + '</div>') : '';

		base.wrap.css('height', base.opt.h);
		base.itemwrap.css('height', base.opt.h);
		base.item.eq(base.opt.current).css('height', base.opt.h);
		base.evt = {};
		base.evt.offsetX = 0;
		base.evt.offsetY = 0;
		base.evt.activate = false;
		base.evt.swap = 'off';
		base.evt.cancel = false;
		base.evt.xaxis = false;
		base.evt.movX = 0;
		base.evt.movY = 0;
		base.auto = {};
		base.timer = {};
		base.timers = {};
		base.fade = {};
		base.fade.opacity = 0;

		//control
		(base.opt.dot) ? uiSlideDot(base) : '';
		(base.opt.nav) ? uiSlideNav(base) : '';
		(base.opt.auto) ? uiSlideAuto(base) : '';
		(base.opt.gauge) ? uiSlideGauge(base) : '';

		uiSlideReset(base);
		uiSlideEvtType(base);
		uiSlideEvt(base);

		base.root.data('base', base);
	}
	function uiSlideDot(base) {
		var base = base,
			i, dotwrap, dotdiv, selected, txt, html_dot = '';

		dotwrap = doc.createElement("div");
		dotdiv = doc.createElement("div");
		$(dotwrap).addClass('ui-slide-dot-wrap');
		$(dotdiv).addClass('ui-slide-dot-div');
		txt = base.item.eq(i).find(".ui-slide-item-tit").text() === undefined ? '' : base.item.eq(i).find(".ui-slide-item-tit").text();

		for (i = 0; i < base.opt.len; i++) {
			selected = (base.opt.current === i) ? true : false;

			selected ?
				html_dot += '<button class="ui-slide-dot selected" type="button">' + txt + '</button>' :
				html_dot += '<button class="ui-slide-dot" type="button">' + txt + '</button>';
		}
		$(dotdiv).append(html_dot);
		base.root.prepend(dotwrap);
		base.dotwrap = base.root.find('.ui-slide-dot-wrap');
		base.dotwrap.append(dotdiv);
		base.dotdiv = base.dotwrap.find('.ui-slide-dot-div');
		base.dotbtn = base.dotdiv.find('.ui-slide-dot');
	}
	function uiSlideNav(base) {
		var base = base,
			navwrap, $navwrap, eqNext, eqPrev, txt_p, txt_n;

		eqNext = base.opt.current + 1 >= base.opt.len ? 0 : base.opt.current + 1;
		eqPrev = base.opt.current - 1 < 0 ? base.opt.len - 1 : base.opt.current - 1;

		navwrap = doc.createElement("div");
		$navwrap = $(navwrap);
		txt_p = base.item.eq(eqPrev).find(".ui-slide-item-tit").text() === undefined ? '' : base.item.eq(eqPrev).find(".ui-slide-item-tit").text();
		txt_n = base.item.eq(eqNext).find(".ui-slide-item-tit").text() === undefined ? '' : base.item.eq(eqNext).find(".ui-slide-item-tit").text();

		$navwrap.addClass('ui-slide-nav-wrap');
		$navwrap.append('<button type="button" class="ui-slide-prev"><span class="hide">이전</span> <span>' + txt_p + '</span></button>');
		$navwrap.append('<button type="button" class="ui-slide-next"><span class="hide">다음</span> <span>' + txt_n + '</span></button>');
		base.root.append(navwrap);

		base.nav = base.root.find('.ui-slide-nav-wrap');
		base.nav.prev = base.nav.find('.ui-slide-prev');
		base.nav.next = base.nav.find('.ui-slide-next');
	}
	function uiSlideAuto(base) {
		var base = base,
			dotwrap, autobtn;

		if (!base.root.find('.ui-slide-dot-wrap').length) {
			dotwrap = doc.createElement("div");
			$(dotwrap).addClass('ui-slide-dot-wrap');
			base.root.prepend(dotwrap);
			base.dotwrap = base.root.find('.ui-slide-dot-wrap');
		}
		if (!!base.opt.play) {
			autobtn = '<button type="button" class="ui-slide-auto" state="play"><span>정지</span></button>';
		} else {
			autobtn = '<button type="button" class="ui-slide-auto" state="stop"><span>자동 진행</span></button>';
		}
		base.dotwrap.prepend(autobtn);
		base.autobtn = base.dotwrap.find('.ui-slide-auto');
		(base.opt.play && base.opt.auto) ? uiSlideAutoEvt(base, true) : '';
	}
	function uiSlideGauge(base) {
		var base = base,
			gaugewrap = doc.createElement("div"),
			$gaugewrap = $(gaugewrap);

		$gaugewrap.addClass('ui-slide-gauge');
		$gaugewrap.append('<div class="ui-slide-gauge-bar"></div>');
		base.root.append(gaugewrap);

		base.gauge = base.root.find('.ui-slide-gauge');
		base.gauge.bar = base.gauge.find('.ui-slide-gauge-bar');
	}
	function uiSlideReset(base) {
		var base = base;

		$(win).resize(function () {
			clearTimeout(base.timers);
			base.timers = setTimeout(function () {
				if (base.opt.winw !== $(win).outerWidth()) {
					base.opt.len = base.item.length;
					base.opt.w = base.item.eq(base.opt.current).outerWidth();
					base.opt.h = base.item.eq(base.opt.current).outerHeight();
					base.opt.winw = $(win).outerHeight();
					base.opt.docw = $(doc).outerHeight();
					base.evt.activate = false; //현재 모션 여부

					if (base.multi.is) {
						base.multi.w = [0]; //items width array
						base.multi.h = [];
						base.multi.ww = 0; //itemwrap width
						base.multi.rw = base.root.outerWidth(); //slide width
						base.root.addClass('ui-slide-multi n' + base.opt.items);
						base.itemwrap.addClass('ui-slide-multi-item');

						for (var i = 0; i < base.opt.len; i++) {
							base.item.eq(i).css('margin-right', (i !== base.opt.len - 1) ? base.opt.margin : 0);
							base.multi.h.push(base.item.eq(i).outerHeight());
							base.multi.ww = base.multi.ww + base.item.eq(i).outerWidth() + Number((i !== base.opt.len - 1) ? base.opt.margin : 0);
							base.multi.w.push(base.multi.ww);
						}
						base.itemwrap.css({ width: base.multi.ww, left: 0 });
						base.itemwrap.data('left', 0);
					}
				}
			}, 200);
		});
	}
	function uiSlideEvtType(base) {
		var base = base,
			types = ['as', 'ever', 'j', 'o'];

		if (base.opt.mouseDrag === true && base.opt.touchDrag === true) {
			types = ['touchstart.uiSlide mousedown.uiSlide', 'touchmove.uiSlide mousemove.uiSlide', 'touchend.uiSlide touchcancel.uiSlide mouseup.uiSlide', 'click.uiSlide'];
		}
		else if (base.opt.mouseDrag === false && base.opt.touchDrag === true) {
			types = ['touchstart.uiSlide', 'touchmove.uiSlide', 'touchend.uiSlide touchcancel.uiSlide', 'click.uiSlide'];
		}
		else if (base.opt.mouseDrag === true && base.opt.touchDrag === false) {
			types = ['mousedown.uiSlide', 'mousemove.uiSlide', 'mouseup.uiSlide', 'click.uiSlide'];
		}

		base.evt.start = types[0];
		base.evt.move = types[1];
		base.evt.end = types[2];
		base.evt.click = types[3];
	}
	function uiSlideEvtCurrent(base) {
		var base = base;

		//이전 다음 번호생성
		base.evt.next = (base.opt.current + 1 >= base.opt.len) ? 0 : base.opt.current + 1;
		base.evt.prev = (base.opt.current - 1 < 0) ? base.opt.len - 1 : base.opt.current - 1;
	}
	function uiSlideEvt(base) {
		var base = base;

		base.opt.past = base.opt.current;

		//click event
		base.root.off(base.evt.click).on(base.evt.click, 'button', function () {
			var $this = $(this);

			if (!base.evt.activate) {
				uiSlideEvtCurrent(base);

				if ($this.hasClass('ui-slide-next')) {
					actfn(base.evt.next, 'next');
				} else if ($this.hasClass('ui-slide-prev')) {
					actfn(base.evt.prev, 'prev');
				} else if ($this.hasClass('ui-slide-dot')) {
					actfn($this.index(), base.opt.past < $this.index() ? 'next' : 'prev');
				} else if ($this.hasClass('ui-slide-auto')) {
					$this.attr('state') === 'play' ? uiSlideAutoEvt(base, false) : uiSlideAutoEvt(base, true);
				}
			}
		});
		function actfn(c, d) {
			base.opt.current = c;
			base.dir = d;
			uiSlideAct(base);
			base.opt.auto ? uiSlideAutoEvt(base, false) : '';
		}

		if (!base.multi.is) {
			base.item.off(base.evt.start).on(base.evt.start, function (event) {
				if (!base.evt.activate) {
					uiSlideDragStart(base, event);
				}
			});
		} else {
			base.itemwrap.off(base.evt.start).on(base.evt.start, function (event) {
				if (!base.evt.activate) {
					uiSlideDragStart(base, event);
				}
			});
		}
	}
	function uiSlideAutoEvt(base, v) {
		//자동실행 v값이 true이면 실행, false이면 정지
		var base = base;

		if (v === true) {
			base.opt.play = false;
			base.autobtn.attr('state', 'play').find('span').text('정지');
			base.timer = win.requestAFrame(autoRAF);
			//base.timer = window.requestAFrame(autoRAF);
		} else {
			base.opt.play = true;
			base.autobtn.attr('state', 'stop').find('span').text('자동 진행');
			win.cancelAFrame(base.timer);
			//window.cancelAFrame(base.timer);
		}

		function autoRAF(timestamp) {
			var tstamp = !timestamp ? base.timer : timestamp.toFixed(0),
				limit = !timestamp ? base.opt.autoTime / 10 : base.opt.autoTime,
				progress;

			(!base.startA) ? base.startA = tstamp : '';
			progress = tstamp - base.startA;

			if (progress < limit) {
				base.opt.gauge ?
					base.gauge.bar.css('width', (progress / limit * 100).toFixed(0) + '%') : '';
				base.timer = win.requestAFrame(autoRAF);
				/*base.timer = window.requestAFrame(autoRAF);*/
			} else {
				base.opt.current = (base.opt.current + 1 >= base.opt.len) ? 0 : base.opt.current + 1;
				base.dir = 'next';
				base.startA = null;
				base.opt.gauge ?
					base.gauge.bar.css('width', '100%') : '';

				uiSlideAct(base, callbackAuto);

			}
		}
		function callbackAuto() {
			base.timer = win.requestAFrame(autoRAF);
			/*base.timer = window.requestAFrame(autoRAF);*/
		}
	}
	function uiSlideGetTouches(event) {
		//터치 이벤트가 undefined 가 아니라면
		if (event.touches !== undefined) {
			return { x: event.touches[0].pageX, y: event.touches[0].pageY };
		}
		if (event.touches === undefined) {
			if (event.pageX !== undefined) {
				return { x: event.pageX, y: event.pageY };
			}
			//ie
			if (event.pageX === undefined) {
				return { x: event.clientX, y: event.clientY };
			}
		}
	}
	function uiSlideEvtDrag(base) {
		var base = base;

		if (base.evt.swap === 'on') {
			$(doc).off(base.evt.move).on(base.evt.move, function (event) {
				base.root.data('touch', 'move');
				uiSlideDragMove(base, event);
			});
			$(doc).off(base.evt.end).on(base.evt.end, function (event) {
				base.root.data('touch', 'end');
				uiSlideDragEnd(base, event);
			});
		} else if (base.evt.swap === 'off') {
			$(doc).off(base.evt.move);
			$(doc).off(base.evt.end);
		}
	}
	function uiSlideDragStart(base, event) {
		var ev = event.originalEvent || event || win.event,
			base = base;

		base.evt.offsetX = uiSlideGetTouches(ev).x;
		base.evt.offsetY = uiSlideGetTouches(ev).y;
		base.evt.swap = 'on';
		base.evt.yaxis = false;

		uiSlideEvtCurrent(base);
		if (!base.multi.is) {
			switch (base.opt.eff) {
				case 'slide':
					startLeft(base.opt.w, base.opt.w * -1);
					break;
				case 'fade':
					startLeft(0, 0);
					break;
				//The default value is 'slide'. So no default value is required.
			}
		}
		function startLeft(n, p) {
			base.item.eq(base.evt.next).css('left', n);
			base.item.eq(base.evt.prev).css('left', p);
		}

		uiSlideEvtDrag(base);
		//$('body').on('touchstart.bodyscroll', uiSlideLockTouch);
		// /
	}
	function uiSlideDragEnd(base, event) {
		var ev = event.originalEvent || event || win.event,
			base = base;

		base.evt.swap = 'off';
		base.evt.xaxis = false;
		uiSlideEvtDrag(base);
		//$('body').off('touchstart.bodyscroll', NETIVE.uiSlide.lockTouch);
		if (!base.multi.is) {
			if (Math.abs(base.evt.movX) > base.opt.w / 5) {
				if (base.evt.movX < 0) {
					base.opt.current = base.evt.next;
					base.dir = 'next';
				} else if (base.evt.movX > 0) {
					base.opt.current = base.evt.prev;
					base.dir = 'prev';
				}
				base.evt.cancel = false;
				uiSlideAct(base);
			} else if (base.evt.movX !== 0) {
				base.evt.cancel = true;
				uiSlideAct(base);
			}
		} else {
			var n = 0;
			for (var i = 0; i < base.multi.w.length; i++) {
				if (Number(base.multi.w[i]) > Number(base.itemwrap.css('left').replace(/[^0-9]/g, ""))) {
					n = i;
					break;
				}
			}
			if (base.multi.ps === 'prev') {
				n = n - 1 < 0 ? 0 : n - 1;
			}

			base.itemwrap.stop().animate({
				left: (base.multi.ww - base.multi.rw) < base.multi.w[n] ? (base.multi.ww - base.multi.rw) * -1 : base.multi.w[n] * -1
			}, 200, function () {
				base.itemwrap.data('left', base.multi.w[n] * -1);
			});
		}
	}
	function uiSlideDragMove(base, event) {
		var ev = event.originalEvent || event || win.event,
			base = base;

		base.evt.movX = parseInt(base.evt.offsetX - uiSlideGetTouches(ev).x, 10) * -1;
		base.evt.movY = parseInt(base.evt.offsetY - uiSlideGetTouches(ev).y, 10) * -1;

		uiSlideAutoEvt(base, false);

		//single drag scope
		if (Math.abs(base.evt.movX) > base.opt.w && !base.multi.is) {
			base.evt.movX = (base.evt.movX < 0) ? base.opt.w * -1 : base.opt.w;
		}
		if (base.multi.is) {
			base.multi.ps = (base.evt.movX < 0) ? 'next' : 'prev';
		}

		if (Math.abs(base.evt.movY) > 2 && Math.abs(base.evt.movX) < 2 && base.evt.xaxis === false) {
			base.evt.swap = 'off';
			base.evt.yaxis = true;
			uiSlideEvtDrag(base);
		}
		else if (base.evt.yaxis === false) {
			base.evt.xaxis = true;

			if (base.opt.eff === 'slide') {
				//single slide mode
				if (!base.multi.is) {
					base.item.eq(base.opt.current).css('left', base.evt.movX);
					base.item.eq(base.evt.next).css('left', base.opt.w + base.evt.movX);
					base.item.eq(base.evt.prev).css('left', (base.opt.w * -1) + base.evt.movX);
				}
				//multi slide mode
				else if (base.multi.is) {
					//multi drag scope
					if (base.evt.movX + Number(base.itemwrap.data('left')) > 0) {
						base.itemwrap.css('left', 0).data('left', 0);
					} else if (base.evt.movX + Number(base.itemwrap.data('left')) < (base.multi.ww - base.multi.rw) * -1) {
						base.itemwrap.css('left', (base.multi.ww - base.multi.rw) * -1).data('left', (base.multi.ww - base.multi.rw) * -1);
					} else {
						base.itemwrap.css('left', base.evt.movX + Number(base.itemwrap.data('left'))).data('movx', base.evt.movX + Number(base.itemwrap.data('left')));
					}
				}
			}

			//fade mode
			else if (base.opt.eff === 'fade') {
				base.fade.opacity = ((base.opt.w - Math.abs(base.evt.movX)) / base.opt.w).toFixed(2);
				base.item.css({ opacity: 0, zIndex: 0 }).eq(base.opt.current).css({ opacity: base.fade.opacity, zIndex: 1 });
				(base.evt.movX < 0) ?
					base.item.eq(base.evt.next).css({ opacity: 1 - base.fade.opacity, zIndex: 0 }) :
					base.item.eq(base.evt.prev).css({ opacity: 1 - base.fade.opacity, zIndex: 0 });
			}
		}
	}
	function uiSlideAct(base, callbackAuto) {
		var base = base,
			$current = base.item.eq(base.opt.current),
			$past = base.item.eq(base.opt.past),
			w = base.opt.w,
			h = base.opt.h;

		if (base.opt.past !== base.opt.current || base.evt.cancel) {
			if (base.dir === 'next' && base.evt.movX === 0) {
				$current.css('left', w);
			} else if (base.dir === 'prev' && base.evt.movX === 0) {
				$current.css('left', w * -1);
			} else {
				if (base.evt.cancel) {
					$current.css('left', base.evt.movX);
				} else {
					base.evt.movX < 0 ? $current.css('left', w + base.evt.movX) : $current.css('left', (w * -1) + base.evt.movX);
				}
			}

			base.item.removeClass('on').attr('aria-hidden', true);
			base.item.find('a, button, label, input').attr('tabindex', '-1');
			$current.addClass('on').attr('aria-hidden', false);
			$current.find('a, button, label, input').removeAttr('tabindex');
			base.start = null;
			uiSlideStep(base, callbackAuto);

			base.opt.pagenumber ? $('.ui-slide-pagenum').attr('aria-label', '총 ' + base.opt.len + '개중 현재 ' + (base.opt.current + 1) + '번째').text((base.opt.current + 1) + '/' + base.opt.len) : '';
		}
	}
	function uiSlideStep(base, callbackAuto) {
		switch (base.opt.eff) {
			case 'slide':
				(!base.multi.is) ? uiSlideStepSlide(base, callbackAuto) : uiSlideStepMulti(base, callbackAuto);
				break;
			case 'fade':
				uiSlideStepFade(base, callbackAuto);
				break;
		}

		base.opt.w = base.item.eq(base.opt.current).outerWidth();
		base.opt.h = base.item.eq(base.opt.current).outerHeight();
		base.wrap.css('height', base.opt.h);
		base.itemwrap.css('height', base.opt.h);
		base.item.eq(base.opt.current).css('height', base.opt.h);
	}
	function uiSlideStepMulti(base, callbackAuto) {
		base.itemwrap.data('left', base.itemwrap.data('movx'));
	}
	function uiSlideStepFade(base, callbackAuto) {
		var base = base,
			step = (base.opt.speed / 16).toFixed(0),
			per = Math.ceil(100 / step),
			n = 0,
			opa = 0,
			tstamp,
			progress;

		win.requestAFrame(stepRAF);
		base.evt.activate = true;

		function stepRAF(timestamp) {
			if (!!timestamp) {
				tstamp = timestamp.toFixed(0);
				(!base.start) ? base.start = tstamp : '';
				progress = tstamp - base.start;
				opa = Number((per * n) / 100);

				base.fade.opacity !== 0 ? opa = opa + (1 - Number(base.fade.opacity)) : '';
				opa = opa.toFixed(2);
				n = n + 1;

				if (!base.evt.cancel) {
					base.item.eq(base.opt.past).css({
						left: 0,
						opacity: 1 - opa < 0 ? 0 : 1 - opa,
						zIndex: 0
					});
					base.item.eq(base.opt.current).css({
						left: 0,
						opacity: opa > 1 ? 1 : opa,
						zIndex: 1
					});
				}
				//cancle step
				else {
					//next cancel
					if (base.evt.movX < 0) {
						base.item.eq(base.opt.current).css({
							left: 0,
							opacity: 1,
							zIndex: 1
						});
						base.item.eq(base.evt.next).css({
							left: 0,
							opacity: 0,
							zIndex: 0
						});
					}
					//prev cancel
					else {
						base.item.eq(base.opt.current).css({
							left: 0,
							opacity: 1,
							zIndex: 1
						});
						base.item.eq(base.evt.prev).css({
							left: 0,
							opacity: 0,
							zIndex: 0
						});
					}
				}
				//ing or end
				(progress < base.opt.speed) ? win.requestAFrame(stepRAF) : uiSlideEnd(base, callbackAuto);
			}
			//animated
			else {
				base.item.eq(base.opt.current).stop().animate({
					left: 0,
					opacity: 1,
					zIndex: 1
				}, 300, function () {
					uiSlideEnd(base, callbackAuto)
				});

				if (!base.evt.cancel) {
					base.item.eq(base.opt.past).stop().animate({
						left: 0,
						opacity: 0,
						zIndex: 0
					}, 300);
				}
			}
		}
	}
	function uiSlideStepSlide(base, callbackAuto) {
		var base = base,
			tstamp, progress, m, n,
			j = (base.dir === 'next') ? [-1, 1] : [1, -1],
			nn = 0,
			px_add = (base.opt.w / (base.opt.speed / 16)) - 16,
			px;

		win.requestAFrame(stepRAF);
		base.evt.activate = true;

		function stepRAF(timestamp) {
			//requestAnimationFrame
			if (!!timestamp) {
				tstamp = timestamp.toFixed(0);
				(!base.start) ? base.start = tstamp : '';
				progress = tstamp - base.start;

				m = base.evt.movX < 0 ? base.evt.movX : base.evt.movX * -1;
				px = progress + (px_add * nn);
				n = Math.ceil(px - m);
				nn = nn + 1;
				//next & prev step
				if (!base.evt.cancel) {
					base.item.eq(base.opt.past).css({
						left: Math.min(n, base.opt.w) * j[0] + 'px',
						zIndex: 1
					});
					base.item.eq(base.opt.current).css({
						left: Math.max(base.opt.w - n, 0) * j[1] + 'px',
						zIndex: 1
					});
				}
				//cancle step
				else {
					//next cancel
					if (base.evt.movX < 0) {
						base.item.eq(base.opt.current).css({
							left: Math.min(base.evt.movX + px, 0),
							zIndex: 1
						});
						base.item.eq(base.evt.next).css({
							left: Math.min((base.opt.w + base.evt.movX) + px, base.opt.w),
							zIndex: 1
						});
					}
					//prev cancel
					else {
						base.item.eq(base.opt.current).css({
							left: Math.max(base.evt.movX - px, 0),
							zIndex: 1
						});
						base.item.eq(base.evt.prev).css({
							left: Math.max(((base.opt.w * -1) + base.evt.movX) - px, base.opt.w * -1),
							zIndex: 1
						});
					}
				}
				//ing or end
				(px < base.opt.w) ? win.requestAFrame(stepRAF) : uiSlideEnd(base, callbackAuto);
			}
			//animated
			else {
				base.item.eq(base.opt.current).stop().animate({
					left: 0,
					zIndex: 1
				}, 300, function () {
					uiSlideEnd(base, callbackAuto)
				});

				if (!base.evt.cancel) {
					base.item.eq(base.opt.past).stop().animate({
						left: base.opt.w * j[0] + 'px',
						zIndex: 1
					}, 300);
				}
			}
		}
	}
	function uiSlideEnd(base, callbackAuto) {
		var base = base;

		base.item.css('z-index', 0);
		base.item.eq(base.opt.current).css('z-index', 1);

		(!base.evt.cancel) ? base.opt.past = base.opt.current : '';
		base.evt.activate = false;
		base.evt.cancel = false;
		base.evt.movX = 0;
		base.evt.movY = 0;
		base.root.data('base', base);
		base.fade.opacity = 0;
		base.opt.gauge ?
			base.gauge.bar.css('width', 0) : '';

		(base.opt.nav) ? uiSlideNavTxt(base) : '';
		(base.opt.dot) ? uiSlideDotChg(base) : '';
		!!callbackAuto ? callbackAuto() : '';
		!!base.opt.callback ? uiSlideCallback(base) : '';
	}
	function uiSlideNavTxt(base) {
		var base = base,
			txt_p, txt_n;

		txt_p = base.item.eq(base.opt.current - 1 < 0 ? base.opt.len - 1 : base.opt.current - 1).find('.ui-slide-item-tit').html() === undefined ?
			'' : base.item.eq(base.opt.current - 1 < 0 ? base.opt.len - 1 : base.opt.current - 1).find('.ui-slide-item-tit').html();
		txt_n = base.item.eq(base.opt.current + 1 >= base.opt.len ? 0 : base.opt.current + 1).find('.ui-slide-item-tit').html() === undefined ?
			'' : base.item.eq(base.opt.current + 1 >= base.opt.len ? 0 : base.opt.current + 1).find('.ui-slide-item-tit').html();

		base.nav.prev.html('<span class="hide">이전</span><span>' + txt_p + '</spaan>');
		base.nav.next.html('<span class="hide">다음</span><span>' + txt_n + '</spaan>');
	}
	function uiSlideDotChg(base) {
		var base = base;

		base.dotbtn.removeClass('selected').eq(base.opt.current).addClass('selected');
	}
	function uiSlideCallback(base) {
		var base = base,
			v = { 'id': base.opt.id, 'current': base.opt.current };
		base.opt.callback(v);
	}
	function createUiSlideFnEvt(opt) {
		var base = $('#' + opt.id).data('base');

		base.opt.current = opt.current;
		base.dir = base.opt.past < base.opt.current ? 'next' : 'prev';

		uiSlideAct(base);
	}
	function createUiSlideFnAuto(opt) {
		var base = $('#' + opt.id).data('base');

		uiSlideAutoEvt(base, opt.play)
	}

	/* search */
	function createUiSearch(opt) {
		var $uiUtlSrch = $('#uiUtlSrch');
		//if (!$('body').data('searchload')) {
		//	$('body').data('searchload', true);

			$('head')
				.append('<script src="/vanilla/resources/js/rts.min.js"></script>')
				.append('<link rel="stylesheet" type="text/css" href="/search/rts.min.css">');

			$global.uiAjax({ id: 'uiSearchSolution', url: '/search/index.html', page: true });

			$("#directRealTimeSearch").samsungfireRealTimeSearchPlugin({
				targetSite: "direct",
				isPc: true,
				uselatestGoodsList: true,
				useRelationList: false,
				useHelpAdviser: false,
				useAdviserService: false,
				useFavoriteGoods: false,
				jsonMenuLocation: "/search/search.json",
				jsonRelationLocation: "/search/relation.json",
				jsonAdviserLocation: "/search/adviser.json",
				jsonGoodsLocation: "/search/goods.json"
			});
		//}
	}

	function createUiSearchTest(opt) {
		var $uiUtlSrch = $('#uiUtlSrch_test');

		if (!$uiUtlSrch.data('searchload')) {
			$uiUtlSrch.data('searchload', true);
			$('head')
				.append('<script src="/vanilla/resources/js/rts.min.js"></script>')
				.append('<link rel="stylesheet" type="text/css" href="/search_sf/rts.min.css">');

			$global.uiAjax({ id: 'uiSearchSolution', url: '/search_sf/index.html', page: true });

			$("#realTimeSearch").samsungfireRealTimeSearchPlugin({
				targetSite: "www",
				isPc: true,
				uselatestGoodsList: true,
				useRelationList: true,
				useHelpAdviser: false,
				useAdviserService: false,
				useFavoriteGoods: false,
				jsonMenuLocation: "/search_sf/search.json",
				jsonRelationLocation: "/search_sf/relation.json",
				jsonAdviserLocation: "",
				jsonGoodsLocation: ""
			});
		}
	}

	// 사용여부확인필요
	function err_callback() {
		$('body').removeClass('scroll-no').removeClass('dim-dropdown');
		$('#baseWrap').removeAttr('style');
		win[global].uiScroll({ value: $('#baseWrap').data('sct'), speed: 0 });
	}

	//modal Alert & Confirm
	//warning-type1: !(경고), warning-type2: ?(선택), warning-type3: √(확인)
	// $plugins.modal.confirm(txt, confirmCallback, cancelCallback, confirmButton, cancelButton, type ) type은 기본으로 '알림'. 4가지 타입 '알림', '선택', '확인', '오류'
	$plugins.modal = {
		pointInfo: function (t, i) {
			var title = title === undefined ? '약관' : title,
				url = url === undefined ? false : url;

			$plugins.uiModal({
				id: '__modalPointInfo',
				link: $global.uiCheck.mobile ? '/m/modal/modalPointInfo.html' : '/modal/modalPointInfo.html',
				full: $global.uiCheck.mobile ? true : false,
				remove: true,
				callback: function () {
					$('#__modalPointInfo_tit').html(t);
					$('#__modalPointInfo_cont').html(i);
					if ($('body.type-iframe').length) {
						parent.$('body').addClass('frame-modal-view');
					}
				}

			});
		},
		confirm: function (txt, confirmCallback, cancelCallback, confirmButton, cancelButton, type, size, zidx) {
			var btn = confirmButton === undefined ? '확인' : confirmButton,
				btn2 = cancelButton === undefined ? '취소' : cancelButton,
				s = size === undefined ? 410 : size,
				type = type === undefined ? '알림' : type,
				z = zidx === undefined ? null : zidx,
				class_name = 'warning-type1',
				linkadr = $global.uiCheck.mobile ? '/m/modal/modalConfirm.html' : '/modal/modalConfirm.html';

			switch (type) {
				case '알림': class_name = 'warning-type1';
					break;

				case '선택': class_name = 'warning-type2';
					break;

				case '확인': class_name = 'warning-type3';
					break;

				case '오류': class_name = 'warning-type4';
					break;
			}

			$plugins.uiModal({ id: '__modalConfirm', link: linkadr, words: txt, btntxt1: btn, btntxt2: btn2, type: class_name, autofocus: false, width:s, zindex:z });

			$('#__confirm').off('click.confirm').on('click.confirm', function () {
				$plugins.uiModalClose({ id: '__modalConfirm', remove: true, callback: confirmCallback })
			});
			$('#__cancel, .btn-close').off('click.confirm').on('click.confirm', function () {
				$plugins.uiModalClose({ id: '__modalConfirm', remove: true, callback: cancelCallback })
			});
		},
		// $plugins.modal.alert(txt, confirmCallback, confirmButton, type, size, z-index) type은 기본으로 '알림'. 4가지 타입 '알림', '선택', '확인', '오류'
		alert: function (txt, confirmCallback, confirmButton, type, size, zidx) {
			var btn = confirmButton === undefined ? '확인' : confirmButton,
				type = type === undefined ? '알림' : type,
				s = size === undefined ? 410 : size,
				z = zidx === undefined ? null : zidx,
				class_name = 'warning-type1',
				linkadr = $global.uiCheck.mobile ? '/m/modal/modalAlert.html' : '/modal/modalAlert.html';

			switch (type) {
				case '알림': class_name = 'warning-type1';
					break;

				case '선택': class_name = 'warning-type2';
					break;

				case '확인': class_name = 'warning-type3';
					break;

				case '오류': class_name = 'warning-type4';
					break;

				case '순단': class_name = 'warning-type5';
					break;
			}

			$plugins.uiModal({ id: '__modalAlert', link: linkadr, words: txt, btntxt1: btn, type: class_name, autofocus: false, width:s, zindex:z });

			$('#__confirm, .btn-close').off('click.alert').on('click.alert', function () {
				$plugins.uiModalClose({ id: '__modalAlert', remove: true, callback: confirmCallback })
			});
		},
		terms: function (title, url) {
			//$plugins.modal.terms('개인정보 수집/이용 동의 (SKT)', '/terms/phone_skt_01.html');
			var title = title === undefined ? '약관' : title,
				url = url === undefined ? false : url;

			if (!!url) {
				$('body.type-iframe').length ?
					parent.$plugins.uiModal({
						id: '__modalTerms',
						link: '/modal/modalTerms.html',
						remove: true,
						termsTit: title,
						termsUrl: url
					}) :
					$plugins.uiModal({
						id: '__modalTerms',
						link: '/modal/modalTerms.html',
						remove: true,
						termsTit: title,
						termsUrl: url
					});
			}
		},
		cfVod: function (y, n) {
			$plugins.uiModal({
				id: '__modalCF',
				link: '/modal/modalCF.html',
				remove: true,
				cf_year: y,
				cf_n: n
			});
		}
	}

})(jQuery, window, document);

/* 최근 본상품 추가 함수 */
function setLatestGoods(idx) {
	var storageLatestGoodsString = (localStorage.getItem('directLatestGoods')) ? localStorage.getItem('directLatestGoods') : localStorage.setItem('directLatestGoods', "");
	var storageLatestGoodsArray = [];

	if (localStorage.getItem('directLatestGoods') != "") {
		var newString = storageLatestGoodsString.split(",");
		for (var i = 0; i < newString.length; i++) {
			if (newString[i] != idx) {
				storageLatestGoodsArray.push(Number(newString[i]))
			}
		}
	}
	storageLatestGoodsArray.unshift(Number(idx))
	localStorage.setItem('directLatestGoods', storageLatestGoodsArray);
}
function addLatestGoods(name) {
	var goodsName = [{ g_name: "car", g_num: "0" }, { g_name: "smartM", g_num: "1" }, { g_name: "myDrive", g_num: "2" }, { g_name: "mySweetHome", g_num: "3" }, { g_name: "health", g_num: "4" }, { g_name: "dental", g_num: "5" }, { g_name: "cancer", g_num: "6" }, { g_name: "realLoss", g_num: "7" }, { g_name: "myFetus", g_num: "8" }, { g_name: "myKids", g_num: "9" }, { g_name: "annuity", g_num: "10" }, { g_name: "annuityFD", g_num: "10" }, { g_name: "save", g_num: "11" }, { g_name: "overSeas", g_num: "12" }, { g_name: "study", g_num: "13" }, { g_name: "inTravel", g_num: "14" }, { g_name: "golf", g_num: "15" }, { g_name: "bike", g_num: "16" }];
	for (var i = 0; i < goodsName.length; i++) {
		if (goodsName[i].g_name == name) {
			setLatestGoods(Number(goodsName[i].g_num));
		}
	}
}
//setLatestGoods(0)
