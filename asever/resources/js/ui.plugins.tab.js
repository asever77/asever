;(function ($, win, doc, undefined) {

	'use strict';

	var $ui = win.$plugins,
        namespace = 'netiveUI.plugins';

    /* ------------------------------------------------------------------------
	* name : tab
	* Ver. : v1.0.0
	* date : 2018-12-21
	* EXEC statement
	* - $plugins.uiTab({ option });
	* - $plugins.uiTabAct({ option });
	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {
		uiTab: function (opt) {
			return createUiTab(opt);
		},
		uiTabAct: function (opt) {
			return createUiTabAct(opt);
		}
	});
	$ui.uiTab.option = {
		current: 0,
		unres: false,
		label: false,
		callback: false,
		align : 'center'
	};
	function createUiTab(opt) {
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, $ui.uiTab.option, opt),
			id = opt.id,
			current = isNaN(opt.current) ? 0 : opt.current,
			unres = opt.unres,
			callback = opt.callback,
			tabLabel = opt.label,
			align = opt.align,
			keys = $ui.option.keys,
			$tab = $('#' + id),
			$btns = $tab.children('.ui-tab-btns'),
			$btn = $btns.find('.ui-tab-btn'),
			$pnls = $tab.children('.ui-tab-pnls'),
			$pnl = $pnls.children('.ui-tab-pnl'),
			para = $ui.uiPara('tab'), // tab=idname-1
			len = $btn.length,
			fix = !!$tab.data('tabnum'),
			ps_l = [],
			i, 
			cls, 
			attrs, 
			is_current, 
			id_pnl, 
			id_btn, 
			_$btn, 
			_$pnl,
			para = $ui.uiPara('tab'),
			paras,
			paraname;
		
		
		//set up
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
		$tab.data('opt', opt);
		tabLabel ? $btns.attr('aria-label', tabLabel) : '';
		$btns.attr('role','tablist');
		$btn.attr('role','tab');
		$pnl.attr('role','tabpanel');
		
		for (i = 0; i < len; i++) {
			var tabn = fix ? $btn.eq(i).data('tabnum') : i;

			is_current = current === tabn;
			cls = is_current ? 'addClass' : 'removeClass';
			attrs = is_current ? 'removeAttr' : 'attr';
			_$btn = $btn.eq(i);
			_$pnl = $pnl.eq(i);

			//id make
			_$btn.attr('id') === undefined ? _$btn.attr('id', id + 'Btn' + tabn) : '';
			_$pnl.attr('id') === undefined ? _$pnl.attr('id', id + 'Pnl' + tabn) : '';
			
			id_btn = _$btn.attr('id');
			id_pnl = _$pnl.attr('id');

			_$btn.attr('aria-controls', id_pnl)[attrs]('tabindex', -1)[cls]('selected');

			if (unres === false) {
				_$btn.attr('aria-controls', _$pnl.attr('id'));
				_$pnl.attr('aria-labelledby', id_btn).attr('aria-hidden', (current === tabn) ? false : true)[attrs]('tabindex', -1)[cls]('selected');
			} else {
				is_current ? $pnl.attr('aria-labelledby', id_btn).addClass('selected') : '';
			}

			if (is_current) {
				_$btn.attr('aria-selected', true).addClass('selected').append('<b class="hide">선택됨</b>');
			} else {
				_$btn.attr('aria-selected', false).removeClass('selected').find('b.hide').remove();
			}
				
			ps_l.push(Math.ceil(_$btn.position().left));

			i === 0 ? _$btn.attr('tab-first', true) : '';
			i === len - 1 ? _$btn.attr('tab-last', true) : ''
		}

		callback ? callback(opt) : '';

		$btn.data('psl', ps_l).data('len', len);
		$ui.uiScroll({ 
			value: ps_l[current], 
			target: $btns,
			speed: 0, 
			ps: align
		});

		//event
		$btn.off('click.uitab keydown.uitab')
			.on({
				'click.uitab': evtClick,
				'keydown.uitab': evtKeys
			});

		function evtClick() {
			$ui.uiTabAct({ id: id, current: $(this).index(), align:align }); 
		}
		function evtKeys(e) {
			var $this = $(this),
				n = $this.index(),
				m = Number($this.data('len'));

			switch(e.keyCode){
				case keys.up: upLeftKey(e);
				break;

				case keys.left: upLeftKey(e);
				break;

				case keys.down: downRightKey(e);
				break;

				case keys.right: downRightKey(e);
				break;

				case keys.end: endKey(e);
				break;

				case keys.home: homeKey(e);
				break;
			}

			function upLeftKey(e) {
				e.preventDefault();
				!$this.attr('tab-first') ? 
				$ui.uiTabAct({ id: id, current: n - 1, align:align }): 
				$ui.uiTabAct({ id: id, current: m - 1, align:align});
			}
			function downRightKey(e) {
				e.preventDefault();
				!$this.attr('tab-last') ? 
				$ui.uiTabAct({ id: id, current: n + 1, align:align }): 
				$ui.uiTabAct({ id: id, current: 0, align:align });
			}
			function endKey(e) {
				e.preventDefault();
				$ui.uiTabAct({ id: id, current: m - 1, align:align });
			}
			function homeKey(e) {
				e.preventDefault();
				$ui.uiTabAct({ id: id, current: 0, align:align });
			}
		}
	}
	function createUiTabAct(opt) {
		var id = opt.id,
			$tab = $('#' + id),
			$btns = $tab.children('.ui-tab-btns'),
			$btn = $btns.find('.ui-tab-btn'),
			$pnls = $tab.children('.ui-tab-pnls'),
			$pnl = $pnls.children('.ui-tab-pnl'),
			ps_l = $btn.data('psl'),
			align = opt.align,
			opt = $.extend(true, {}, $tab.data('opt'), opt),
			current = isNaN(opt.current) ? 0 : opt.current,
			unres = opt.unres,
			callback = opt.callback;

		$btn.find('b.hide').remove();
		$btn.eq(current).append('<b class="hide">선택됨</b>');
		$btn.removeClass('selected').eq(current).addClass('selected').focus();

		$plugins.uiScroll({ 
			value: ps_l[current], 
			btnwidth : $btn.outerWidth(),
			target: $btns, 
			speed: 300, 
			ps: align 
		});

		if (unres === false) {
			$pnl.attr('aria-hidden', true).removeClass('selected').attr('tabindex', '-1').eq(current).addClass('selected').attr('aria-hidden', false).removeAttr('tabindex');
		}

		!!callback ? callback(opt) : '';
	}
})(jQuery, window, document);