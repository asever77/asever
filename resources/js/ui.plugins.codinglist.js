;(function ($, win, doc, undefined) {

	'use strict';

	var $ui = win.$plugins,
        namespace = 'netiveUI.plugins';

    /* ------------------------------------------------------------------------
	 * json coding list v1.0 
	 * date : 2018-04-21
	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {
		uiCodinglist: function (opt) {
			return createUiCodinglist(opt);
		}
	});
	function createUiCodinglist(opt) {
		var dataExecel;

		$ui.uiAjax({ 
			url: opt.url, 
			page: false, 
			callback: callback 
		});
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
				pop = dataExecel.list[i].modal || '';
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
				overl = dataExecel.list[i].overlap || '';
				root = dataExecel.list[i].root || '';

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

				var x = (i === 0) ? 0 : i - 1;

				c1 = (dataExecel.list[i].d1 !== dataExecel.list[x].d1) ? ' c1' : '';
				c2 = (dataExecel.list[i].d2 !== dataExecel.list[x].d2) ? ' c2' : '';
				c3 = (dataExecel.list[i].d3 !== dataExecel.list[x].d3) ? ' c3' : '';
				c4 = (dataExecel.list[i].d4 !== dataExecel.list[x].d4) ? ' c4' : '';
				c5 = (dataExecel.list[i].d5 !== dataExecel.list[x].d5) ? ' c5' : '';
				c6 = (dataExecel.list[i].d6 !== dataExecel.list[x].d6) ? ' c6' : '';
				c7 = (dataExecel.list[i].d7 !== dataExecel.list[x].d7) ? ' c7' : '';
				c8 = (dataExecel.list[i].d8 !== dataExecel.list[x].d8) ? ' c8' : '';

				cls2 = 
					state === '체크' ? 'chk' : 
					state === '진행' ? 'ing' : 
					state === '완료' ? 'end' : 
					state === '검수' ? 'tst' : 
					state === '제외' ? 'del' : 
					state === '약관' ? 'trm' : '';

				cls = cls2 + c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8;

				ctg_state.push(dataExecel.list[i].state);
				ctg_pub.push(dataExecel.list[i].pub);
				ctg_dev.push(dataExecel.list[i].dev);
				state !== '제외' ? ctg_date.push(dataExecel.list[i].date) : '';
				ctg_enddate.push(dataExecel.list[i].enddate);
				ctg_menu.push(dataExecel.list[i].d2);

				if (state !== '제외' && i === 0) {
					table += '<table>';
					table += '<caption>코딩리스트</caption>';
					table += '<colgroup>';
					table += '<col class="col-1">';
					table += '<col class="col-2">';
					table += '<col class="col-3">';
					table += '<col class="col-4">';
					//table += '<col class="col-5">';
					table += '<col class="col-6">';
					table += '<col class="col-7">';
					table += '<col class="col-8">';
					table += '</colgroup>';
					table += '<colgroup>';
					(dataExecel.list[i].d1 !== undefined) ? table += '<col class="col-9">' : '';
					(dataExecel.list[i].d2 !== undefined) ? table += '<col class="col-9">' : '';
					(dataExecel.list[i].d3 !== undefined) ? table += '<col class="col-9">' : '';
					(dataExecel.list[i].d4 !== undefined) ? table += '<col class="col-9">' : '';
					(dataExecel.list[i].d5 !== undefined) ? table += '<col class="col-9">' : '';
					(dataExecel.list[i].d6 !== undefined) ? table += '<col class="col-9">' : '';
					(dataExecel.list[i].d7 !== undefined) ? table += '<col class="col-9">' : '';
					(dataExecel.list[i].d8 !== undefined) ? table += '<col class="col-9">' : '';
					table += '</colgroup>';
					table += '<col class="col-10">';
					table += '<thead>';
					table += '<th scope="col">' + state + '</th>';
					table += '<th scope="col">' + date + '</th>';
					table += '<th scope="col">' + enddate + '</th>';
					table += '<th scope="col">' + pub + '</th>';
					//table += '<th scope="col">' + dev + '</th>';
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
					$ui.browser.mobile ?
						table += '<tr class="' + cls + '" >' :
						table += '<tr class="' + cls + '">';
					table += '<td class="state"><span>' + state + '</span></td>';
					table += '<td class="date"><span>' + date + '</span></td>';
					table += '<td class="enddate"><span>' + enddate + '</span></td>';
					table += '<td class="name pub"><span>' + pub + '</span></td>';
					//table += '<td class="name dev"><span>' + dev + '</span></td>';

					var popIs = !!pop ? 'P' : '',
						tabIs = tab === 'S' ? 'S' : tab === '' ? '' : 'T',
						full = !!full ? true : false;

					table += '<td class="txt-c"><span>' + popIs + '</span></td>';
					table += '<td class="txt-c"><span>' + tabIs + '</span></td>';
					console.log(pop)
					//if (!pop) {
						table += id !== '' ? overl !== '' ? tabIs === 'T' ?
							'<td class="id ico_pg"><span><a href="' + root + '/' + overl + '.html?tab=' + (tab - 1) + '" target="coding">' + overl + '</a></span><span class="overl">' + id + '</span></td>' :
							'<td class="id ico_pg"><span><a href="' + root + '/' + overl + '.html" target="coding">' + overl + '</a></span><span class="overl">' + id + '</span></td>' :
							'<td class="id ico_pg"><span><a href="' + root + '/' + id + '.html" target="coding">' + id + '</a></span></td>' :
							'<td class="id "><span></span></td>';
					/*} else {
						table += id !== '' ? overl !== '' ? ifm === '' ? pop === '1' ? tabIs === 'T' ?
							'<td class="id ico_pg"><span><button type="button" onclick="$plugins.uiModal({ id:\'modal_' + overl + '\', full:' + full + ', link:\'' + root + '/' + overl + '.html?tab=' + (tab - 1) + '\'});">' + overl + '</button><span class="overl">' + id + '</span></td>' :
							'<td class="id ico_pg"><span><button type="button" onclick="$plugins.uiModal({ id:\'modal_' + overl + '\', full:' + full + ', link:\'' + root + '/' + overl + '.html\'});">' + overl + '</button><span class="overl">' + id + '</span></td>' :
							'<td class="id ico_pg"><span><button type="button" onclick="$plugins.uiModal({ id:\'__modalTerms\', link:\'/modal/modalTerms.html\', remove:true, terms_tit:\'약관제목\', terms_url:\'/terms/' + overl + '.html\' });">' + overl + '</button><span class="overl">' + id + '</span></td>' :
							'<td class="id ico_pg"><span><button type="button" onclick="$plugins.uiModal({ iframe:true, isrc:\'/modal/' + overl + '_iframe.html\', iname:\'name_' + overl + '\', id:\'modal_' + overl + '\', full:' + full + ' });">' + overl + '</button><span class="overl">' + id + '</span></td>' :
							(ifm === '') ?
								(pop === '1') ?
									tabIs === 'T' ?
										'<td class="id ico_pg"><span><button type="button" onclick="$plugins.uiModal({ id:\'modal_' + id + '\', full:' + full + ', link:\'' + root + '/' + id + '.html?tab=' + (tab - 1) + '\'});">' + id + '</button></td>' :
										'<td class="id ico_pg"><span><button type="button" onclick="$plugins.uiModal({ id:\'modal_' + id + '\', full:' + full + ', link:\'' + root + '/' + id + '.html\' });">' + id + '</button></td>' :
									'<td class="id ico_pg"><span><button type="button" onclick="$plugins.uiModal({ id:\'__modalTerms\', link:\'/modal/modalTerms.html\', remove:true, terms_tit:\'약관제목\', terms_url:\'/terms/' + id + '.html\' });">' + id + '</button></td>' :
								'<td class="id ico_pg"><span><button type="button" onclick="$plugins.uiModal({ iframe:true, isrc:\'/modal/' + id + '_iframe.html\', iname:\'name_' + id + '\', id:\'modal_' + id + '\', full:' + full + ' });">' + id + '</button></td>' :
							'<td class="id "><span></span></td>';
					}
					*/
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
			
			

			var sel = '';
			sel += '<div class="ui-codinglist-sel mgb-xxxs">';
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
			sel += '</div>';
			sel += '<div class="box-srch mgb-xxxs">';
			sel += '<div class="srch-area">';
			sel += '<input type="search" id="uiCodinglistSrchCode" class="inp-srch ui-inpcancel" value="" placeholder="검색어를 입력해주세요.">';
			sel += '</div>';
			sel += '</div>';
			
			$('#' + opt.id).prepend(sel);
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

			if ($('#uiCodinglistSrchCode').val() !== '') {
				var temp = $('.ui-codinglist tbody tr td *:contains('+ $('#uiCodinglistSrchCode').val() +')');

				$('.ui-codinglist tbody tr').hide();
				$(temp).closest('tr').show();
			}
			$.expr[":"].contains = $.expr.createPseudo(function(arg){
				return function(elem) {
					return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
				}
			});
			$('#uiCodinglistSrchCode').on('keyup', function(){
				var k = $(this).val(),
					temp = $('.ui-codinglist tbody tr td *:contains('+ k +')');
				$('.ui-codinglist tbody tr').hide();
				$(temp).closest('tr').show();
			});

			$ui.uiInputClear();

		}
	}


})(jQuery, window, document);