;(function ($, win, doc, undefined) {

	'use strict';

	var $ui = win.$plugins,
        namespace = 'netiveUI.plugins';

   /* ------------------------------------------------------------------------
	* name : date picker
	* Ver. : v2.0
	* date : 2020-01-02
	* EXEC statement
	* - $plugins.uiDatePicker({ option });
	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {
		uiDatePicker: function (opt) {
			return createUiDatePicker(opt);
		}
	});
	$ui.uiDatePicker.option = {
		selector: '.ui-datepicker',
		period: false,
		title: false,
		date_split: '-',
		openback: false,
		closeback: false,
		dual: false,
		callback: null,
		shortDate: false, //DDMMYYYY
		dateMonths: new Array('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'),
		weekDay: new Array('일', '월', '화', '수', '목', '금', '토')
	};
	function createUiDatePicker(opt) {
		var opt = $.extend(true, {}, $ui.uiDatePicker.option, opt),
			date_split = opt.date_split,
			selector = opt.selector,
			period = opt.period,
			dual = opt.dual,
			openback = opt.openback,
			date_title = opt.title,
			closeback = opt.closeback,
			callback = opt.callback,
			dateMonths = opt.dateMonths,
			weekDay = opt.weekDay,
			shortDate = opt.shortDate,
			$datepicker = $(selector),
			date = new Date(),
			dateToday = date,
			calVar,
			day_start,
			day_end,
			idname = $datepicker.attr('id');

		$ui.uiDatePicker.option.dual = dual;
		$datepicker.data('opt', { callback: callback, shortDate: shortDate, openback: openback, closeback: closeback, period: period });

		//이달의 날짜 텍스트화
		function textDate(d, m, y, whatday) {
			var text_date = new Date(y, m - 1, d);

			if (whatday === true) {
				//요일 추가
				return (text_date.getFullYear() + date_split + dateMonths[text_date.getMonth()] + date_split + $ui.option.partsAdd0(text_date.getDate()) + " (" + weekDay[text_date.getDay()] + ")");
			} else {
				return (text_date.getFullYear() + date_split + dateMonths[text_date.getMonth()] + date_split + $ui.option.partsAdd0(text_date.getDate()));
			}
		}

		//사용여부확인 필요
		function subtractDate(oneDate, anotherDate) {
			return (anotherDate - oneDate);
		}

		//DD.MM.YYYY 순으로 정렬
		function toDDMMYYYY(d) {
			var d = new Date(d);
			return ($ui.option.partsAdd0(d.getDate()) + date_split + $ui.option.partsAdd0(d.getMonth() + 1) + date_split + d.getFullYear());
		}

		//input에 출력
		function writeInputDateValue(calendarEl, obj, end) {
			var d = $(obj).data("day"),
				id = calendarEl.inputId,
				org_id = id,
				opt = $("#" + id).closest('.ui-datepicker').data('opt');

			!!end ? id = id + '_end' : '';

			//DD.MM.YYYY로 설정
			calendarEl.shortDate ? d = toDDMMYYYY(d) : '';

			$("#" + id).val(d);

			//기간설정
			d !== '' ? $("#" + id).closest('.field-inlabel').addClass('activated') : '';
			!!opt.callback ? opt.callback({ id: id, value: d, name: end ? $('#' + id).attr('name') : $('#' + org_id).attr('name')}) : '';
		}

		function calendarObject(opt) {
			this.calId = opt.calId;
			this.dpId = opt.dpId;
			this.inputId = opt.inputId;
			this.buttonId = opt.buttonId;
			this.shortDate = opt.shortDate;
		}

		//사용여부확인 필요
		function matchToday() {
			$('.tbl-datepicker button').not(':disabled').each(function () {
				var $this = $(this);

				$this.data('day') === textDate(dateToday.getDate(), dateToday.getMonth() + 1, dateToday.getFullYear(), false)
					? $this.attr('title', $this.attr('title') + ' (오늘)').addClass('today')
					: '';
			});
		}

		//달력 Build
		function buildCalendar(date, calendarEl, v) {
			var inp_val = $('#' + calendarEl.inputId).val(),
				nVal = inp_val.split(date_split),
				generate = v === 'generate' ? true : false,
				day = !generate ? date.getDate() : inp_val === '' ? date.getDate() : Number(nVal[2]),
				month = !generate ? date.getMonth() : inp_val === '' ? date.getMonth() : Number(nVal[1] - 1),
				year = !generate ? date.getFullYear() : inp_val === '' ? date.getFullYear() : Number(nVal[0]),
				prevMonth = new Date(year, month - 1, 1),
				thisMonth = new Date(year, month, 1),
				nextMonth = new Date(year, month + 1, 1),
				firstWeekDay = thisMonth.getDay(),
				daysInMonth = Math.floor((nextMonth.getTime() - thisMonth.getTime()) / (1000 * 60 * 60 * 24)),
				daysInMonth_prev = Math.floor((thisMonth.getTime() - prevMonth.getTime()) / (1000 * 60 * 60 * 24)),
				$input = $('#' + calendarEl.inputId).eq(0),
				tit = !date_title ? $input.attr('title') : date_title,
				_minDay = new Array(),
				_maxDay = new Array(),
				_calendarHtml = '',
				//_isOver = false,
				mm = nextMonth.getMonth(),
				week_day;

			$input.attr('data-min') !== undefined ? _minDay = $input.attr('data-min').split(date_split, 3) : _minDay[0] = 1910;// 최소 선택 가능
			$input.attr('data-max') !== undefined ? _maxDay = $input.attr('data-max').split(date_split, 3) : _maxDay[0] = 2050;// 최대 선택 가능
			month === 2 ? daysInMonth = 31 : '';

			/* datepicker-head -------------------- */
			_calendarHtml += '<button type="button" class="btn-close ui-datepicker-close"><span>닫기</span></button>';
			_calendarHtml += '<div class="datepicker-head">';
			/* title: datepicker-head-tit */
			if (period && !date_title) {
				_calendarHtml += '<div class="datepicker-head-tit">' + tit + ' ~ '+ $('#' + calendarEl.inputId + '_end').attr('title') +'</div>';
			} else {
				_calendarHtml += '<div class="datepicker-head-tit">' + tit + '</div>';
			}
			

			/* 년월 선택: datepicker-head-select */
			_calendarHtml += '<div class="datepicker-head-select">';
			_calendarHtml += '<div class="ui-select datepicker-head-year">';
			_calendarHtml += '<select title="년도 선택" id="sel_' + calendarEl.inputId + '_year">';

			for (var y = Number(_minDay[0]); y < Number(_maxDay[0]) + 1; y++) {
				_calendarHtml += y === year ? '<option value="' + y + '" selected>' + y + '년</option>' : '<option value="' + y + '">' + y + '년</option>';
			}

			_calendarHtml += '</select>';
			_calendarHtml += '</div>';

			_calendarHtml += '<div class="ui-select datepicker-head-month">';
			_calendarHtml += '<select title="월 선택" id="sel_' + calendarEl.inputId + '_month">';

			for (var m = 1; m < 13; m++) {
				m < 10 ? m = '0' + m : '';
				_calendarHtml += m === month + 1 ? '<option value="' + Number(m) + '" selected>' + m + '월</option>' : '<option value="' + Number(m) + '">' + m + '월</option>';
				m = Number(m);
			}

			_calendarHtml += '</select>';
			_calendarHtml += '</div>';
			_calendarHtml += '</div>';

			/* 년월 선택: button */
			_calendarHtml += '<div class="datepicker-head-btn">';
			_calendarHtml += '<button type="button" class="btn-arrow ui-datepicker-prev-y" title="이전 년도">';
			_calendarHtml += '<span class="hide">이전 ' + (year - 1) + ' 년으로 이동</span></button>';
			_calendarHtml += '<button type="button" class="btn-arrow ui-datepicker-prev" title="이전 달">';
			(dual) 
				? _calendarHtml += '<span class="hide">이전 ' + dateMonths[(month === 0) ? 11 : month - 2] + ' 월로 이동</span></button>'
				: _calendarHtml += '<span class="hide">이전 ' + dateMonths[(month === 0) ? 11 : month - 1] + ' 월로 이동</span></button>';
			_calendarHtml += '<button type="button" class="btn-arrow ui-datepicker-next" title="다음 달">';
			(dual) 
				? _calendarHtml += '<span class="hide">다음 ' + dateMonths[(month == 11) ? 0 : month + 2] + ' 월로 이동</span></button>'
				: _calendarHtml += '<span class="hide">다음 ' + dateMonths[(month == 11) ? 0 : month + 1] + ' 월로 이동</span></button>';
			_calendarHtml += '<button type="button" class="btn-arrow ui-datepicker-next-y" title="다음 년도">';
			_calendarHtml += '<span class="hide">다음 ' + (year + 1) + ' 년으로 이동</span></button>';
			_calendarHtml += '</div>';

			/* today */
			_calendarHtml += '<div class="datepicker-head-today">';
			_calendarHtml += '<button type="button" class="today" data-day=' + textDate(dateToday.getDate(), dateToday.getMonth() + 1, dateToday.getFullYear(), false) + ' title="오늘'+ textDate(dateToday.getDate(), dateToday.getMonth() + 1, dateToday.getFullYear(), true) +'로 이동"><span class="material-icons">flag</span></button>';
			_calendarHtml += '</div>';

			/* datepicker-head-date */
			_calendarHtml += '<div class="datepicker-head-date">';


			if (dual) {
				_calendarHtml += '<div class="datepicker-period-head">';
				_calendarHtml += '<div class="n1">';
				_calendarHtml += '<span class="year" data-y="' + year + '"><strong>' + year + '</strong>년</span> ';
				_calendarHtml += '<span class="month" data-m="' + dateMonths[month] + '"><strong>' + dateMonths[month] + '</strong>월</span>';
				_calendarHtml += '</div>';
				console.log(month)

				_calendarHtml += '<div class="n2">';

				if (month === 11) {
					_calendarHtml += '<span class="year2" data-y="' + (year + 1) + '"><strong>' + (year + 1) + '</strong>년</span> ';
					_calendarHtml += '<span class="month2" data-m="' + dateMonths[0] + '"><strong>' + dateMonths[0] + '</strong>월</span>';
				} else {
					_calendarHtml += '<span class="year2" data-y="' + year + '"><strong>' + year + '</strong>년</span> ';
					_calendarHtml += '<span class="month2" data-m="' + dateMonths[month + 1] + '"><strong>' + dateMonths[month + 1] + '</strong>월</span>';
				}
				_calendarHtml += '</div>';
				_calendarHtml += '</div>';
				
			} else {
				_calendarHtml += '<span class="year" data-y="' + year + '"><strong>' + year + '</strong>년</span> ';
				_calendarHtml += '<span class="month" data-m="' + dateMonths[month] + '"><strong>' + dateMonths[month] + '</strong>월</span>';
			}

			_calendarHtml += '<span class="hide">선택됨</span>';
			_calendarHtml += '</div>';
			_calendarHtml += '</div>';

			/* datepicker-core -------------------- */
			_calendarHtml += '<div class="datepicker-core"></div>';
			// _calendarHtml += '<div class="datepicker-foot">';
			// _calendarHtml += '<button type="button" class="btn-base-s ui-datepicker-close"><span>닫기</span></button>';
			// _calendarHtml += '</div>';


			return _calendarHtml;
		}
		function buildCore(date, calendarEl, v , endminmax) {
			var $base = $('#' + calendarEl.calId),
				$end = $('#' + calendarEl.inputId + '_end'),
				inp_val = $('#' + calendarEl.inputId).val(),
				nVal = inp_val.split(date_split),
				generate = v === 'generate' ? true : false,
				day = !generate ? date.getDate() : inp_val === '' ? date.getDate() : Number(nVal[2]),
				month = !generate ? date.getMonth() : inp_val === '' ? date.getMonth() : Number(nVal[1] - 1),
				year = !generate ? date.getFullYear() : inp_val === '' ? date.getFullYear() : Number(nVal[0]),
				prevMonth = new Date(year, month - 1, 1),
				thisMonth = new Date(year, month, 1),
				nextMonth = new Date(year, month + 1, 1),
				nextMonth2 = new Date(year, month + 2, 1),
				firstWeekDay = thisMonth.getDay(),
				nextWeekDay = nextMonth.getDay(),
				prevWeekDay = prevMonth.getDay(),
				daysInMonth = Math.floor((nextMonth.getTime() - thisMonth.getTime()) / (1000 * 60 * 60 * 24)),
				daysInMonth_prev = Math.floor((thisMonth.getTime() - prevMonth.getTime()) / (1000 * 60 * 60 * 24)),
				daysInMonth_next = Math.floor((nextMonth2.getTime() - nextMonth.getTime()) / (1000 * 60 * 60 * 24)),
				$input = $('#' + calendarEl.inputId).eq(0),
				tit = $input.attr('title'),
				_minDay = new Array(),
				_maxDay = new Array(),
				_calendarHtml = '',
				mm = nextMonth.getMonth(),
				week_day,
				empty_before = daysInMonth_prev - firstWeekDay,
				empty_after = 0,
				endminmax = endminmax === undefined ? false : endminmax;

			// 최소,최대 선택 가능
			if (endminmax) {
				$end.attr('data-min', $input.attr('data-min'));
				$end.attr('data-min') !== undefined ? _minDay = $end.attr('data-min').split(date_split, 3) : _minDay[0] = 1910;
				$end.attr('data-max') !== undefined ? _maxDay = $end.attr('data-max').split(date_split, 3) : _maxDay[0] = 2050;
			} else {
				$input.attr('data-min') !== undefined ? _minDay = $input.attr('data-min').split(date_split, 3) : _minDay[0] = 1910;
				$input.attr('data-max') !== undefined ? _maxDay = $input.attr('data-max').split(date_split, 3) : _maxDay[0] = 2050;
				// if (!!$end.val()) {
				// 	_maxDay = $input.attr('data-max').split(date_split, 3);
				// } else {
				// 	$input.attr('data-max') !== undefined ? _maxDay = $input.attr('data-max').split(date_split, 3) : _maxDay[0] = 2050;
				// }
			}

			month === 2 ? daysInMonth = 31 : '';
			
			if (dual) {
				$base.find('.ui-datepicker-prev span').text('이전 ' + dateMonths[(month - 2 < 0) ? (month - 2 < -1) ? 10 : 11 : month - 2] + '월로 이동');
				$base.find('.ui-datepicker-next span').text('다음 ' + dateMonths[(month + 2 > 11) ? (month + 2 > 12) ? 1 : 0 : month + 2] + '월로 이동');
			} else {
				$base.find('.ui-datepicker-prev span').text('이전 ' + dateMonths[(month - 1 < 0) ? 11 : month - 1] + '월로 이동');
				$base.find('.ui-datepicker-next span').text('다음 ' + dateMonths[(month + 1 > 11) ? 0 : month + 1] + '월로 이동');
			}

			$base.find('.datepicker-head-date').find('.year').data('y', year).find('strong').text(year);
			$base.find('.datepicker-head-date').find('.month').data('m', dateMonths[month]).find('strong').text(dateMonths[month]);

			if (dual) {
				if (month + 1 === 12) {
					$base.find('.datepicker-head-date').find('.year2').data('y', year + 1).find('strong').text(year + 1);
					$base.find('.datepicker-head-date').find('.month2').data('m', dateMonths[0]).find('strong').text(dateMonths[0]);
				} else {
					$base.find('.datepicker-head-date').find('.year2').data('y', year).find('strong').text(year);
					$base.find('.datepicker-head-date').find('.month2').data('m', dateMonths[month + 1]).find('strong').text(dateMonths[month + 1]);
				}
			}

			$base.find('.datepicker-head-year option').prop('selected', false).removeAttr('selected');
			$base.find('.datepicker-head-year option[value="' + year + '"]').prop('selected', true);
			$base.find('.datepicker-head-month option').prop('selected', false).removeAttr('selected');
			$base.find('.datepicker-head-month option[value="' + (month + 1) + '"]').prop('selected', true);

			year <= _minDay[0] && dateMonths[month] <= _minDay[1] ?
				$base.find('.ui-datepicker-prev').addClass('disabled').attr('disabled') :
				$base.find('.ui-datepicker-prev').removeAttr('disabled').removeClass('disabled');

			year <= _minDay[0] ?
				$base.find('.ui-datepicker-prev-y').addClass('disabled').attr('disabled') :
				$base.find('.ui-datepicker-prev-y').removeAttr('disabled').removeClass('disabled');

			year >= _maxDay[0] && dateMonths[month] >= _maxDay[1] ?
				$base.find('.ui-datepicker-next').addClass('disabled').attr('disabled') :
				$base.find('.ui-datepicker-next').removeAttr('disabled').removeClass('disabled');

			year >= _maxDay[0] ?
				$base.find('.ui-datepicker-next-y').addClass('disabled').attr('disabled') :
				$base.find('.ui-datepicker-next-y').removeAttr('disabled').removeClass('disabled');

			//table datepicker
			_calendarHtml += '<table class="tbl-datepicker" data-date="' + year + '' + dateMonths[month] + '">';
			_calendarHtml += '<caption>' + year + '년 ' + dateMonths[month] + '월 일자 선택</caption>';
			_calendarHtml += '<colgroup>';
			_calendarHtml += '<col span="7" class="n1">';
			_calendarHtml += '</colgroup>';
			_calendarHtml += '<thead><tr>';
			_calendarHtml += '<th scope="col" class="day-sun"><abbr title="일요일">' + weekDay[0] + '</abbr></th>';
			_calendarHtml += '<th scope="col"><abbr title="월요일">' + weekDay[1] + '</abbr></th>';
			_calendarHtml += '<th scope="col"><abbr title="화요일">' + weekDay[2] + '</abbr></th>';
			_calendarHtml += '<th scope="col"><abbr title="수요일">' + weekDay[3] + '</abbr></th>';
			_calendarHtml += '<th scope="col"><abbr title="목요일">' + weekDay[4] + '</abbr></th>';
			_calendarHtml += '<th scope="col"><abbr title="금요일">' + weekDay[5] + '</abbr></th>';
			_calendarHtml += '<th scope="col" class="day-sat"><abbr title="토요일">' + weekDay[6] + '</abbr></th>';
			_calendarHtml += '</tr></thead>';
			_calendarHtml += '<tbody><tr>';

			//이전 달
			prevMonthday(firstWeekDay);

			mm < 1 ? mm = 12 : '';
			mm = $ui.option.partsAdd0(mm);
			week_day = firstWeekDay;

			//현재 달
			for (var dayCounter = 1; dayCounter <= daysInMonth; dayCounter++) {
				week_day %= 7;
				week_day === 0 ? daysInMonth - dayCounter < 7 ? _calendarHtml += '</tr>' : _calendarHtml += '</tr><tr>' : '';

				if (week_day === 0) {
					_calendarHtml += '<td class="day-sun">';
				} else if (week_day === 6) {
					_calendarHtml += '<td class="day-sat">';
				} else {
					_calendarHtml += '<td>';
				}
				
				if ((year < _minDay[0]) || (year == _minDay[0] && dateMonths[month] < _minDay[1]) || (year == _minDay[0] && dateMonths[month] == _minDay[1] && dayCounter < _minDay[2])) {
					//선택 불가월
					_calendarHtml += '<button type="button" disabled title="' + textDate(dayCounter, mm, year, true) + '" data-day="' + textDate(dayCounter, mm, year, false)+'">' + $ui.option.partsAdd0(dayCounter) + '</button></td>';
				} else if ((year > _maxDay[0]) || (year == _maxDay[0] && dateMonths[month] > _maxDay[1]) || (year == _maxDay[0] && dateMonths[month] == _maxDay[1] && dayCounter > _maxDay[2])) {
					//선택 불가일
					_calendarHtml += '<button type="button" disabled title="' + textDate(dayCounter, mm, year, true) + '" data-day="' + textDate(dayCounter, mm, year, false)+'">' + $ui.option.partsAdd0(dayCounter) + '</button></td>';
				} else {
					//선택가능 일
					_calendarHtml += '<button type="button" title="' + textDate(dayCounter, mm, year, true) + '" data-day="' + textDate(dayCounter, mm, year, false) + '" value="' + dayCounter + '">' + $ui.option.partsAdd0(dayCounter) + '</button></td>';
				}
				week_day++;
			}

			//다음 달
			nextMonthday(week_day);

			_calendarHtml += '</tr></tbody></table>';

			// period datepicker table
			if (dual) {
				empty_after = 0;
				empty_before = daysInMonth - nextWeekDay;

				_calendarHtml += '<table class="tbl-datepicker type-period" data-date="' + year + '' + dateMonths[month + 1] + '">';
				_calendarHtml += '<caption>' + year + '년 ' + dateMonths[month + 1] + '월 일자 선택</caption>';
				_calendarHtml += '<colgroup>';
				_calendarHtml += '<col span="7" class="n1">';
				_calendarHtml += '</colgroup>';
				_calendarHtml += '<thead><tr>';
				_calendarHtml += '<th scope="col" class="day-sun"><abbr title="일요일">' + weekDay[0] + '</abbr></th>';
				_calendarHtml += '<th scope="col"><abbr title="월요일">' + weekDay[1] + '</abbr></th>';
				_calendarHtml += '<th scope="col"><abbr title="화요일">' + weekDay[2] + '</abbr></th>';
				_calendarHtml += '<th scope="col"><abbr title="수요일">' + weekDay[3] + '</abbr></th>';
				_calendarHtml += '<th scope="col"><abbr title="목요일">' + weekDay[4] + '</abbr></th>';
				_calendarHtml += '<th scope="col"><abbr title="금요일">' + weekDay[5] + '</abbr></th>';
				_calendarHtml += '<th scope="col" class="day-sat"><abbr title="토요일">' + weekDay[6] + '</abbr></th>';
				_calendarHtml += '</tr></thead>';
				_calendarHtml += '<tbody><tr>';

				//이전 달
				prevMonthday(nextWeekDay);

				mm = Number(mm) + 1;
				mm < 1 ? mm = 12 : '';

				if (mm > 12) {
					mm = 1;
					year = year + 1;
				};

				mm = $ui.option.partsAdd0(mm);
				week_day = nextWeekDay;

				//현재 달
				for (var dayCounter = 1; dayCounter <= daysInMonth_next; dayCounter++) {
					week_day %= 7;
					week_day === 0 ? daysInMonth_next - dayCounter < 7 ? _calendarHtml += '</tr>' : _calendarHtml += '</tr><tr>' : '';

					if (week_day === 0) {
						_calendarHtml += '<td class="day-sun">';
					} else if (week_day === 6) {
						_calendarHtml += '<td class="day-sat">';
					} else {
						_calendarHtml += '<td>';
					}

					if ((year < _minDay[0]) || (year == _minDay[0] && dateMonths[month + 1] < _minDay[1]) || (year == _minDay[0] && dateMonths[month + 1] == _minDay[1] && dayCounter < _minDay[2])) {
						_calendarHtml += '<button type="button" disabled title="' + textDate(dayCounter, mm, year, true) + '" data-day="' + textDate(dayCounter, mm, year, false)+'">' + $ui.option.partsAdd0(dayCounter) + '</button></td>';
					} else if ((year > _maxDay[0]) || (year == _maxDay[0] && dateMonths[month + 1] > _maxDay[1]) || (year == _maxDay[0] && dateMonths[month + 1] == _maxDay[1] && dayCounter > _maxDay[2])) {
						_calendarHtml += '<button type="button" disabled title="' + textDate(dayCounter, mm, year, true) + '" data-day="' + textDate(dayCounter, mm, year, false)+'">' + $ui.option.partsAdd0(dayCounter) + '</button></td>';
					} else {
						_calendarHtml += '<button type="button" title="' + textDate(dayCounter, mm, year, true) + '" data-day="' + textDate(dayCounter, mm, year, false) + '" value="' + dayCounter + '">' + $ui.option.partsAdd0(dayCounter) + '</button></td>';
					}
					week_day++;
				}

				//다음 달
				nextMonthday(week_day);

				_calendarHtml += '</tr></tbody></table>';
			}

			//이전달 다시보기
			function prevMonthday(weekDay) {
				for (var week = 0; week < weekDay; week++) {
					empty_before = empty_before + 1;

					if (week === 0) {
						_calendarHtml += '<td class="empty"><button type="button" disabled>' + $ui.option.partsAdd0(empty_before) + '</button></td>';
					} else if (week === 6) {
						_calendarHtml += '<td class="empty"><button type="button" disabled>' + $ui.option.partsAdd0(empty_before) + '</button></td>';
					} else {
						_calendarHtml += '<td class="empty"><button type="button" disabled>' + $ui.option.partsAdd0(empty_before) + '</button></td>';
					}
				}
			}
			//다음달 미리보기
			function nextMonthday(week_day) {
				for (week_day = week_day; week_day < 7; week_day++) {
					empty_after = empty_after + 1;

					if (week_day === 0) {
						_calendarHtml += '<td class="empty"><button type="button" disabled>' + $ui.option.partsAdd0(empty_after) + '</button></td>';
					} else if (week_day == 6) {
						_calendarHtml += '<td class="empty"><button type="button" disabled>' + $ui.option.partsAdd0(empty_after) + '</button></td>';
					} else {
						_calendarHtml += '<td class="empty"><button type="button" disabled>' + $ui.option.partsAdd0(empty_after) + '</button></td>';
					}
				}
			}
			return _calendarHtml;
		}

		//달력 Hide&Remove
		function hideCalendar() {
			const $dp = $('.ui-datepicker.visible'),
				$wrap = $dp.find('.datepicker-sec');
			
			$dp.removeClass('visible');
			$dp.find('.ui-datepicker-btn').data('selected',false);
			$dp.on('transitionend', function(){
				$wrap.remove();
			});

		}
		function datepickerClose(calendarEl) {
			const $btn = $('#' + calendarEl.calId).closest('.ui-datepicker').find('.ui-datepicker-btn'),
				$dp = $("#" + calendarEl.dpId),
				$sec = $('#' + calendarEl.calId);

			$dp.removeClass('visible');
			$dp.find('.ui-datepicker-btn').data('selected',false);
			const closeback = !!$dp.data('opt').closeback ? $dp.data('opt').closeback : false;
			closeback ? closeback() : '';

			$dp.on('transitionend', function(){
				//$ui.uiScroll({ value: $btn.data('sct'), speed: 200 });
				$sec.remove();
			});
		}

		//달력 table
		function reDisplayCalendar(calendarEl, v, endminmax) {
			var $calWrap = $("#" + calendarEl.calId),
				endminmax = endminmax === undefined ? false : endminmax;

			if (endminmax) {
				$calWrap.find('.tbl-datepicker').remove();
				$calWrap.find('.datepicker-core').append(buildCore(date, calendarEl, v, endminmax));
			} else {
				$calWrap.find('.datepicker-core').empty().append(buildCore(date, calendarEl, v, false));
			}
			matchToday();
			dayPeriodSelect(calendarEl);
		}
		//달력 layout
		function displayCalendar(calendarEl, v) {
			const id_ = "#" + calendarEl.calId,
				$dp = $("#" + calendarEl.dpId),
				$calWrap = $(id_);
				
			//date = new Date();
			$calWrap.empty().append(buildCalendar(date, calendarEl, v));
			reDisplayCalendar(calendarEl, v);
			$dp.addClass('visible');
			$ui.uiFocusTab({ selector: $calWrap, type: 'hold' });

			//datepicker event--------------------------------------------------------
			$('.datepicker-head-year select').off('change.uidpsel').on('change.uidpsel', function (e) {
				e.preventDefault();
				yearMonthSelect(this, 'year');
			});
			$('.datepicker-head-month select').off('change.uidpsel').on('change.uidpsel', function (e) {
				e.preventDefault();
				yearMonthSelect(this, 'month');
			});
			$('.ui-datepicker-prev').off('click.uidatepicker').on('click.uidatepicker', function (e) {
				e.preventDefault();
				monthNextPrev(this, 'prev');
			});
			$('.ui-datepicker-next').off('click.uidatepicker').on('click.uidatepicker', function (e) {
				e.preventDefault();
				monthNextPrev(this, 'next');
			});
			$('.ui-datepicker-prev-y').off('click.uidatepicker').on('click.uidatepicker', function (e) {
				e.preventDefault();
				yearNextPrev(this, 'prev');
			});
			$('.ui-datepicker-next-y').off('click.uidatepicker').on('click.uidatepicker', function (e) {
				e.preventDefault();
				yearNextPrev(this, 'next');
			});
			$('.ui-datepicker-close').off('click.uidayclose').on('click.uidayclose', function () {
				datepickerClose(calendarEl);
			});

			function yearMonthSelect(t, v) {
				var $currentDate = $(t).closest('.datepicker-head').find('.datepicker-head-date'),
					$core = $(t).closest('.ui-datepicker').find('.datepicker-core'),
					_y = v === 'year' ?
						$(t).closest('.datepicker-head-year').find('select').eq(0).val() :
						Number($currentDate.find('.year').data('y')),
					_m = v === 'month' ?
						$(t).closest('.datepicker-head-month').find('select').eq(0).val() :
						Number($currentDate.find('.month').data('m') - 1),
					dateTemp = v === 'year' ? new Date(_y, _m, 1) : new Date(_y, _m - 1, 1);

				date = dateTemp;
				reDisplayCalendar(calendarEl, v, period && (!!$core.data('start') || !!$core.data('end')) ? true : false);

				v === 'year' ?
					$calWrap.find('.datepicker-head-year select').eq(0).focus() :
					$calWrap.find('.datepicker-head-month select').eq(0).focus();
			}
			function monthNextPrev(t, v) {
				var $this = $(t),
					$core = $this.closest('.ui-datepicker').find('.datepicker-core'),
					limit = v === 'next' ? 'max' : 'min',
					$currentDate = $this.closest('.datepicker-head').find('.datepicker-head-date'),
					_y = Number($currentDate.find('.year').data('y')),
					_m = Number($currentDate.find('.month').data('m') - 1),
					dateTemp = v === 'next' ? (dual) ? new Date(_y, _m + 2, 1) : new Date(_y, _m + 1, 1) : (dual) ? new Date(_y, _m - 2, 1) : new Date(_y, _m - 1, 1);
					date = dateTemp;
					reDisplayCalendar(calendarEl, v, period && (!!$core.data('start') || !!$core.data('end')) ? true : false);
					$this.eq(0).focus();
			}
			function yearNextPrev(t, v) {
				var $this = $(t),
					$core = $this.closest('.ui-datepicker').find('.datepicker-core'),
					limit = v === 'next' ? 'max' : 'min',
					$currentDate = $this.closest('.datepicker-head').find('.datepicker-head-date'),
					_y = Number($currentDate.find('.year').data('y')),
					_m = Number($currentDate.find('.month').data('m') - 1),
					dateTemp = v === 'next' ? new Date(_y + 1, _m, 1) : new Date(_y - 1, _m, 1);
					date = dateTemp;
					reDisplayCalendar(calendarEl, v, period && (!!$core.data('start') || !!$core.data('end')) ? true : false);
					$this.eq(0).focus();
			}

			if (period) {
				$(doc).off('click.'+ id_).on('click.'+ id_, id_ + ' td button', function (e) {
					e.preventDefault();
					daySelectAct(calendarEl, this);
				}).off('mouseover.'+ id_ +'sel').on('mouseover.'+ id_ +'sel', id_ + ' td button', function () {
					dayHover(this);
				}).off('mouseover.'+ id_ +'sel2').on('mouseover.'+ id_ +'sel2', id_ + ' .type-period td button', function () {
					monthHover(this);
				}).off('mouseleave.'+ id_ +'sel3').on('mouseleave.'+ id_ +'sel3', id_ + ' .tbl-datepicker', function () {
					$('.tbl-datepicker').find('.hover').removeClass('hover');
				});

				$(doc).off('click.'+ id_ +'today').on('click.'+ id_ +'today', id_ + ' .datepicker-head-today button', function () {
					date = new Date();
					reDisplayCalendar(calendarEl);
				}).off('click.'+ id_ +'d').on('click.'+ id_ +'d', id_ + ' .btn-base', function () {
					day_start ? writeInputDateValue(calendarEl, day_start) : '';
					day_end ? writeInputDateValue(calendarEl, day_end, true) : '';

					datepickerClose(calendarEl);
				});
			} else {
				$(doc).off('click.'+ id_).on('click.'+ id_ , id_ + ' td button', function () {
					var $this = $(this);
					writeInputDateValue(calendarEl, $this);
					datepickerClose(calendarEl);
				}).off('click.'+ id_ +'today').on('click.'+ id_+'today', id_ + ' .datepicker-head-today button', function () {
					date = new Date();
					reDisplayCalendar(calendarEl);
					$calWrap.find('td button.today').eq(0).focus();
				});
			}			
			return false;
		}

		function monthHover(t) {
			var $this = $(t),
				$core = $this.closest('.datepicker-core'),
				$tbl = $this.closest('.tbl-datepicker');

			if ($tbl.hasClass('on-start-tbl')) {
				$tbl.prev().addClass('off-tbl')
			}

			if (!!$core.data('start') && !$tbl.hasClass('on-start-tbl')) {
				$tbl.prev().find('tr').addClass('hover').find('td').addClass('hover');
			}
		}
		function dayHover(t) {
			var $this = $(t),
				$core = $this.closest('.datepicker-core');

			if (!!$core.data('start')) {
				$this.closest('td').addClass('hover').prevAll().addClass('hover');
				$this.closest('tr').addClass('hover').prevAll().find('td').addClass('hover');

				$this.closest('td').nextAll().removeClass('hover');
				$this.closest('tr').removeClass('hover').nextAll().find('td').removeClass('hover');
			}
		}
		function daySelectAct(calendarEl, t) {
			var $this = $(t),
				$core = $this.closest('.datepicker-core'),
				n_day = $this.data('day').replace(/\-/g, ''),
				n_day_ = $core.data('day') === undefined ? false : $core.data('day').replace(/\-/g, '');

			if ($ui.uiDatePicker.option.date_split === '.') {
				n_day = $this.data('day').replace(/\./g, '');
				n_day_ = $core.data('day') === undefined ? false : $core.data('day').replace(/\./g, '');
			}

			var sam_day = n_day === n_day_,
				next_day = n_day > n_day_,
				prev_day = n_day < n_day_;

			//첫클릭은 시작, 두번째는 종료
			if (!$core.data('start') && !$core.data('end')) {
				$core.data('end', false);
				$core.data('start', true);
				$core.data('day', n_day);

				//초기화
				$core.find('.selected-end').removeClass('selected-end').removeAttr('aria-selected');
				$core.find('.disabled').removeClass('disabled');
				$core.find('.hover-on').removeClass('hover-on');
				$core.find('.selected-start').removeClass('selected-start').removeAttr('aria-selected');
				$core.find('.selected').removeClass('selected').removeAttr('aria-selected');
				$core.find('td').removeClass('on-start on-end');
				$core.find('tr').removeClass('on-start on-end');

				//선택 및 반영
				$core.addClass('state-ready');
				$this.addClass('selected-start').attr('aria-selected', true);
				if (!!$this.closest('table').hasClass('type-period')) {
					$this.closest('table').prev().find('tr').addClass('disabled').find('td').addClass('disabled').find('button');
				}
				$this.closest('td').addClass('on-start').prevAll().addClass('disabled').find('button');
				$this.closest('tr').addClass('on-start').prevAll().addClass('disabled').find('td').addClass('disabled').find('button');
				$('.on-start').find('tr.on-start').find('button').attr('disabled');

				$('#' + $this.closest('.ui-datepicker').find('.inp-base').attr('id') + '_end').val('');
				
				day_start = $this;
				writeInputDateValue(calendarEl, $this);
				reDisplayCalendar(calendarEl, $this, true);
				//writeInputDateValue(calendarEl, $this, true);
			} else if (next_day || sam_day) {
				$core.data('start', false);
				$core.removeClass('state-ready');
				$core.data('end', true).data('endday', n_day);
				$core.find('.selected-end').removeClass('selected-end').removeAttr('aria-selected');
				$this.addClass('selected-end').attr('aria-selected', true);
				$core.find('.on-ing').removeClass('on-ing');
				$core.find('.on-end').removeClass('on-end');

				$this.closest('td').addClass('on-end');
				$this.closest('tr').addClass('on-end');
				$core.find('.hover').addClass('on-ing');

				$core.addClass('date-ing-on');
				day_end = $this;
				writeInputDateValue(calendarEl, $this, true);
				datepickerClose(calendarEl);
			// } else if (sam_day) {
			// 	$core.data('start', false).data('day', undefined);
			// 	$core.find('td').removeClass('on-start on-end');
			// 	$core.find('tr').removeClass('on-start on-end');

			// 	$this.removeClass('selected-start').removeAttr('aria-selected', true);
			// 	console.log('시작3')
			} else if (prev_day) {
				//초기화
				$core.find('.selected-end').removeClass('selected-end').removeAttr('aria-selected');
				$core.find('.hover-on').removeClass('hover-on');
				$core.find('.selected-start').removeClass('selected-start').removeAttr('aria-selected');
				$core.find('.selected').removeClass('selected').removeAttr('aria-selected');
				$core.data('day', n_day);
				$core.find('td').removeClass('on-start on-end');
				$core.find('tr').removeClass('on-start on-end');

				//선택 및 반영
				$this.addClass('selected-start').attr('aria-selected', true);
				if (!!$this.closest('table').hasClass('type-period')) {
					$this.closest('table').prev().find('tr').addClass('disabled').find('td').addClass('disabled').find('button');
				}
				$this.closest('td').addClass('on-start').prevAll().addClass('disabled').find('button');
				$this.closest('tr').addClass('on-start').prevAll().addClass('disabled').find('td').addClass('disabled').find('button');
				$this.closest('td').addClass('on-start').nextAll().removeClass('disabled').find('button');
				$this.closest('tr').addClass('on-start').nextAll().removeClass('disabled').find('td').removeClass('disabled').find('button');

				$('.on-start').find('tr.on-start').find('button').attr('disabled');

				day_start = $this;
				writeInputDateValue(calendarEl, $this);
			}
		}

		//event
		$datepicker.find('.ui-datepicker-btn').off('click.uidatepicker').on('click.uidatepicker', function () {
			const btn = $(this);

			if (!btn.data('selected')) {
				$('.ui-datepicker-btn').data('selected', false);
				btn.data('selected', true);
				datepickerReady(this);
			} else {
				btn.data('selected', false);
				hideCalendar();
			}
		});
		$datepicker.find('.inp-base').off('focus.uidpinp').on('focus.uidpinp', function () {
			$(this).closest('.inp-datepicker').addClass('focus');
		}).off('blur.uidpinp').on('blur.uidpinp', function () {
			$(this).closest('.inp-datepicker').removeClass('focus');
		});

		//datepicker ready
		function datepickerReady(v) {
			var $this = $(v),
				$this_wrap = $this.closest('.ui-datepicker'),
				$this_inp =  $this_wrap.find('.ui-datepicker-inp'),
				dp_id = $this_wrap.attr('id'),
				inputId = $this_inp.attr('id'),
				regExp = /^([0-9]{4})-([0-9]{2})-([0-9]{2})/g,
				_val = $this_inp.val();
				//_val = $('#' + inputId).val();

			($ui.uiDatePicker.option.date_split === '.') ? regExp = /^([0-9]{4}).([0-9]{2}).([0-9]{2})/g : '';
			
			const openback = !!$this_wrap.data('opt').openback ? $this_wrap.data('opt').openback : false;
			openback ? openback() : '';

			hideCalendar();
			// $('#' + inputId + '_end').val('');
			// period ? $('#' + inputId).val('') : '';

			let reset = regExp.test(_val),
				calspaceHTML = '';

			$this.data('sct', $(doc).scrollTop());
			!reset ? $this_inp.val('') : '';
			date = new Date();
			$this_wrap.find('.datepicker-sec').remove();

			calVar = new calendarObject({
				calId: "calWrap_" + dp_id,
				dpId: dp_id,
				inputId: inputId,
				buttonId: "calBtn_" + dp_id,
				shortDate: shortDate
			});
			(dual) ? $this_wrap.addClass('type-dual') : '';
			calspaceHTML += '<div id="' + calVar.calId + '" class="datepicker-sec">';
			calspaceHTML += '<div class="datepicker-wrap">';
			calspaceHTML += '</div>';
			calspaceHTML += '</div>';

			$this.closest('.ui-datepicker').find('.ui-datepicker-wrap').append(calspaceHTML);
			displayCalendar(calVar, 'generate');

			if (period && dual) {
				$this.closest('.ui-datepicker').find('.ui-datepicker-wrap').addClass('period');
			}
		}

		function dayPeriodSelect(calendarEl) {
			if (period) {

				$datepicker.find('.tbl-datepicker button[data-day="' + $('#' + calendarEl.inputId).val() + '"]').addClass('selected-start').attr('aria-selected', true).closest('td').addClass('on-start').closest('tr').addClass('on-start').closest('table').addClass('on-start-tbl');

				$datepicker.find('.tbl-datepicker button[data-day="' + $('#' + calendarEl.inputId + '_end').val() + '"]').addClass('selected-end').attr('aria-selected', true).closest('td').addClass('on-end').closest('tr').addClass('on-end').closest('table').addClass('on-end-tbl');

				console.log('end val', $('#' + calendarEl.inputId + '_end').val());

				var s = $('#' + calendarEl.inputId).val().replace(/\-/g, '').substring(0, 6),
					e = $('#' + calendarEl.inputId + '_end').val().replace(/\-/g, '').substring(0, 6);

				if ($ui.uiDatePicker.option.date_split === '.') {
					s = $('#' + calendarEl.inputId).val().replace(/\./g, '').substring(0, 6);
					e = $('#' + calendarEl.inputId + '_end').val().replace(/\./g, '').substring(0, 6);
				}

				
				$datepicker.find('.tbl-datepicker').find('.on-start').prevAll().addClass('disabled').find('td').addClass('disabled');
				$datepicker.find('.tbl-datepicker').find('.on-start').nextAll().addClass('hover-on').find('td').addClass('hover-on');
				$datepicker.find('.tbl-datepicker').find('.on-end').prevAll().addClass('hover-on').find('td').addClass('hover-on');
				$datepicker.find('.tbl-datepicker').find('.on-end').nextAll().removeClass('hover-on').find('td').removeClass('hover-on');
				$datepicker.find('.tbl-datepicker').find('.on-start').prevAll().removeClass('hover-on').find('td').removeClass('hover-on');

				if (!$('#' + calendarEl.inputId + '_end').val()) {
					console.log(1)

					$datepicker.find('.hover-on').removeClass('hover-on');
				} else {
					
					$datepicker.find('.tbl-datepicker').each(function () {
						console.log($(this).data('date'))
						if (s < $(this).data('date') && $(this).data('date') < e) {
							$(this).find('td').addClass('hover-on');
						}
					});
				}
			} else {
				$datepicker.find('.tbl-datepicker button[data-day="' + $('#' + calendarEl.inputId).val() + '"]').addClass('selected').attr('aria-selected', true);
			}
		}
	}     
        
})(jQuery, window, document);