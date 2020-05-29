;(function ($, win, doc, undefined) {

	'use strict';

	var $ui = win.$plugins,
        namespace = 'netiveUI.plugins';

    /* ------------------------------------------------------------------------
	 * json menu v1.0 
	 * date : 2018-04-21
	 * 수정작업중
	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {
		uiMenu: function (opt) {
			return createUiMenu(opt);
		},
		uiMenuSelected: function (opt) {
			return createUiMenuSelected(opt);
		}
	});
	$ui.uiMenu.map = {};
	$ui.uiMenu.json = {};
	function createUiMenu(opt){
		var dataExecel,
			menu_callback = opt.callback;

		$ui.uiAjax({ url:opt.url, page:false, callback:callback });

		function callback(v){
			dataExecel = v;
			$ui.uiMenu.json = dataExecel;

			var len = dataExecel.menu.length,
				i = 0,
				ctg_sel = opt.ctg === undefined ? '전체' : opt.ctg,
				current = opt.selected,

				use, usem, code, 
				ctg, n1, ol, d1, d2, d3, d4, 
				href, mhref, blank, 
				tit, mtit, 
				
				selected, current_split, code_split, 
				
				navig = [],
				code0, code1, code2, code3, code4,
				aria_sel_1, aria_sel_2, aria_sel_3, aria_sel_4, 
				cls_sel_1, cls_sel_2, cls_sel_3,
				first_d2 = true, first_d3 = true,
				
				current_num = [],
				n_d1 = 0, 
				_n_d1 = null,
				n_d2 = 0, 
				_n_d2 = null,
				n_d3 = 0,
				 _n_d3 = null,

				html_d1 = '<ul class="dep-1-wrap">',
				html_d2 = '',
				html_d3 = '',
				array_d2 = [],
				array_d3 = [],
				d2_n,
				d3_n;

			for (i = 0; i < len; i++) {
				use = dataExecel.menu[i].use;
				usem = dataExecel.menu[i].usem;
				code = dataExecel.menu[i].code;
				ctg = dataExecel.menu[i].ctg;
				ol = dataExecel.menu[i].ol;
				d1 = dataExecel.menu[i].d1;
				d2 = dataExecel.menu[i].d2;
				d3 = dataExecel.menu[i].d3;
				d4 = dataExecel.menu[i].d4;
				href = dataExecel.menu[i].href;
				mhref = dataExecel.menu[i].mhref;
				blank = dataExecel.menu[i].blank;
				tit = dataExecel.menu[i].tit
				mtit = dataExecel.menu[i].mtit

				selected = current === code;
				current_split = current.split('_');
				code_split = code.split('_');

				//G_00_00_00_00
				code0 = current_split[0] === code_split[0];
				code1 = current_split[1] === code_split[1];
				code2 = current_split[2] === code_split[2];
				code3 = current_split[3] === code_split[3];
				code4 = current_split[4] === code_split[4];

				aria_sel_1 = code0 && code1 ? true : false;
				aria_sel_2 = code0 && code1 && code2 ? true : false;
				aria_sel_3 = code0 && code1 && code2 && code3 ? true : false;
				aria_sel_4 = code0 && code1 && code2 && code3 && code4 ? true : false;

				cls_sel_1 = aria_sel_1 ? 'selected' : '';
				cls_sel_2 = aria_sel_2 ? 'selected' : '';
				cls_sel_3 = aria_sel_3 ? 'selected' : '';

				if (use === 'Y' && (ctg === ctg_sel || ctg_sel === '전체')) {
					//메뉴 1depth 
					if (d1 !== '') {
						n_d1 = n_d1 + 1;

						if (aria_sel_1) {
							current_num.push(n_d1 - 1);
							navig.push(tit);
						}
						html_d1 += '<li class="dep-1 '+ cls_sel_1 +'" data-n="'+ n_d1 +'">';
						html_d1 += href === '' ? 
							'<button type="button" class="dep-1-btn '+ cls_sel_1 +'"><span>' + tit + '</span></button>':
							'<a href="'+ href +'" class="dep-1-btn '+ cls_sel_1 +'"><span>' + tit + '</span></a>';
						html_d1 += '</li>';	
					} 

					//메뉴 2depth 
					if (d2 !== '') {
						_n_d1 === null ? _n_d1 = n_d1 : '';
						
						// 두번째 부터 depth1이 달라질떄 ul그룹 새로 생성
						if (_n_d1 !== n_d1) {
							n_d2 = 0;
							html_d2 += '</ul>';

							array_d2.push(html_d2);
							html_d2 = '';

							html_d2 += '<ul class="dep-2-wrap '+ cls_sel_2 +'" data-dep1="'+ n_d1 +'">';
						}
						
						n_d2 = n_d2 + 1;

						if (aria_sel_2) {
							current_num.push(n_d2 - 1);
							navig.push(tit);
						}

						// 처음 시작 한번만
						if (first_d2) {
							html_d2 += '<ul class="dep-2-wrap '+ cls_sel_2 +'" data-dep1="'+ n_d1 +'">';
							first_d2 = false;
						}

						ol ?
							html_d2 += '<li class="dep-2 '+ cls_sel_2 +'" data-n="'+ n_d2 +'" data-ol="'+ ol +'">' :
							html_d2 += '<li class="dep-2 '+ cls_sel_2 +'" data-n="'+ n_d2 +'">';

						html_d2 += '<div>';
						html_d2 += href === '' ? 
							'<button type="button" class="dep-2-btn '+ cls_sel_2 +'" aria-selected="' + aria_sel_2 + '"><span>' + tit + '</span></button>':
							'<a href="'+ href +'" class="dep-2-btn '+ cls_sel_2 +'" aria-selected="' + aria_sel_2 + '"><span>' + tit + '</span></a>';
						html_d2 += '</div>';
						html_d2 += '</li>';

						_n_d1 = n_d1;
					}

					//메뉴 3depth 
					if (d3 !== '') {
						_n_d2 === null ? _n_d2 = n_d2 : '';
						
						if (_n_d2 !== n_d2) {
							n_d3 = 0;
							html_d3 += '</ul>';

							array_d3.push(html_d3);
							html_d3 = '';

							html_d3 += '<ul class="dep-3-wrap '+ cls_sel_3 +'" data-dep1="'+ n_d1 +'" data-dep2="'+ n_d2 +'">';
						}
						n_d3 = n_d3 + 1;

						if (aria_sel_3) {
							current_num.push(n_d3 - 1);
							navig.push(tit);
						}

						if (first_d3) {
							html_d3 += '<ul class="dep-3-wrap '+ cls_sel_3 +'" data-dep1="'+ n_d1 +'"data-dep2="'+ n_d2 +'">';
							first_d3 = false;
						}

						html_d3 += '<li class="dep-3 '+ cls_sel_3 +'" data-n="'+ n_d3 +'">';
						html_d3 += href === '' ? 
							'<button type="button" code="'+ code +'" class="dep-3-btn '+ cls_sel_3 +'" aria-selected="' + aria_sel_3 + '"><span>' + tit + '</span></button>':
							'<a href="'+ href +'" code="'+ code +'" class="dep-3-btn '+ cls_sel_3 +'" aria-selected="' + aria_sel_3 + '"><span>' + tit + '</span></a>';
						html_d3 += '</li>';

						_n_d2 = n_d2;
						
					}
					if (d4 !== '') {
						aria_sel_4  === 'true' ? navig.push(tit) : '';
					}
				}
			}
			html_d1 += '</ul>';
			html_d2 += '</ul>';
			html_d3 += '</ul>';

			array_d2.push(html_d2);
			html_d2 = '';

			!!array_d3.length ? array_d3.push(html_d3) : '';
			html_d3 = '';

			menu_callback({ 
				d1: html_d1, 
				d2: array_d2, 
				d3: array_d3, 
				current: current_num, 
				navi: navig 
			});
		}
	}
	function createUiMenuSelected(opt){
		var $menu = $('#' + opt.id),
			code = opt.code.split('_'),
			d2 = Number(code[2]),
			d3 = Number(code[3]);

		$menu.find('*').removeClass('selected');
		$menu.find('.dep-2-btn').attr('aria-selected', false).attr('aria-expanded',false);
		$menu.find('.dep-3-btn').attr('aria-selected', false);
		$menu.find('.dep-3-wrap').attr('aria-hidden', true).css('display', 'none');
		
		for (var i = 0, len = $ui.uiMenu.json.menu.length; i < len; i++) {
			if ($ui.uiMenu.json.menu[i].code === opt.code) {
				opt.callback($ui.uiMenu.json.menu[i].tit);
			}
		}

		$menu
		.find('.dep-2').eq(d2 - 1).addClass('selected')
		.find('.dep-2-btn').addClass('selected').attr('aria-selected', true).attr('aria-expanded',true);
		$menu
		.find('.dep-2').eq(d2 - 1)
		.find('.dep-3-wrap').addClass('selected').attr('aria-hidden', false).css('display', 'block')
		.find('.dep-3').eq(d3 - 1).addClass('selected')
		.find('.dep-3-btn').addClass('selected').attr('aria-selected', true);
	}

})(jQuery, window, document);