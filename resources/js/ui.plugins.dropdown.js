;(function ($, win, doc, undefined) {

	'use strict';

	var $ui = win.$plugins,
        namespace = 'netiveUI.plugins';
        
    /* ------------------------------------------------------------------------
	* name : dropdown
	* Ver. : v1.0.0
	* date : 2018-12-21
	* EXEC statement
	* - $plugins.uidropdown({ option });
	* - $plugins.uiDropdownToggle({ option });
	* - $plugins.uiDropdownHide();
	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {
		uiDropdown: function (opt) {
			return createUiDropdown(opt);
		},
		uiDropdownToggle: function (opt) {
			return createUiDropdownToggle(opt);
		},
		uiDropdownHide: function () {
			return createUiDropdownHide();
		},
	});
	$ui.uiDropdown.option = {
		eff: 'base',
		ps: 'bl',
		hold: true,
		auto: false,
		back_close: true,
		openback:false,
		closeback:false,
		dim : false,
		_offset: false,
		_close: true,
		_expanded: false,
		eff_ps: 10,
		eff_speed: 100
	};
	function createUiDropdown(opt){
		if (opt === undefined || !$('#' + opt.id).length) {
			return false;
		}

		var opt = $.extend(true, {}, $ui.uiDropdown.option, opt),
			id = opt.id,
			eff = opt.eff,
			auto = opt.auto,
			ps = opt.ps,
			hold = opt.hold,
			back_close = opt.back_close,
			dim = opt.dim,
			openback = opt.openback,
			closeback = opt.closeback,
			_offset = opt._offset,
			_close = opt._close,
			_expanded = opt._expanded,
			eff_ps = opt.eff_ps,
			eff_speed = opt.eff_speed,
			$btn = $('#' + id),
			$pnl = $('[data-id="'+ id +'"]'); 
				
		//set up

		if (auto) {
			if (Math.abs($(win).scrollTop() - $btn.offset().top - $btn.outerHeight()) < Math.abs($(win).scrollTop() +  $(win).outerHeight() / 1.5)) {
				ps = 'bc';
				eff = 'st';
			} else {
				ps = 'tc';
				eff = 'sb';
			}
		}
		$btn.attr('aria-expanded', false)
			.data('opt', { 
				id: id, 
				eff: eff, 
				ps: ps,
				hold: hold, 
				auto: auto,
				dim: dim,
				openback: openback,
				closeback: closeback,
				_offset: _offset, 
				_close :_close, 
				_expanded: _expanded,
				eff_ps: eff_ps,
				eff_speed: eff_speed
			});
		$pnl.attr('aria-hidden', true).attr('aria-labelledby', id).addClass(ps)
			.data('opt', { 
				id: id, 
				eff: eff, 
				ps: ps,
				hold: hold, 
				auto: auto,
				dim : dim,
				openback: openback,
				closeback: closeback,
				_offset: _offset, 
				_close: _close, 
				_expanded: _expanded,
				eff_ps: eff_ps,
				eff_speed: eff_speed
			});
		
		//event
		$btn.off('click.dropdown').on('click.dropdown', function(e){
			action(this);
		});
		$(doc)
		.off('click.dropdownclose').on('click.dropdownclose', '.ui-drop-close', function(e){
			var pnl_opt = $('#' + $(this).closest('.ui-drop-pnl').data('id')).data('opt');

			pnl_opt._expanded = true;
			$ui.uiDropdownToggle({ id: pnl_opt.id });
			$('#' + pnl_opt.id).focus();
		})
		.off('click.bd').on('click.bd', function(e){
			//dropdown 영역 외에 클릭 시 판단
			if (!!$('body').data('dropdownOpened')){
				console.log($(doc).find('.ui-drop-pnl').has(e.target).length, )
				if ($(doc).find('.ui-drop-pnl').has(e.target).length < 1) {
					$ui.uiDropdownHide();
				}
			}
		});

		!back_close ? $(doc).off('click.bd') : '';

		function action(t) {
			var $this = $(t),
				btn_opt = $this.data('opt');

			$this.data('sct', $(doc).scrollTop());
			$ui.uiDropdownToggle({ id: btn_opt.id });
		}
	}
	function createUiDropdownToggle(opt){
		if (opt === undefined) {
			return false;
		}
		
		var id = opt.id,
			$btn = $('#' + id),
			$pnl = $('.ui-drop-pnl[data-id="'+ id +'"]'),
			defaults = $btn.data('opt'),
			opt = $.extend(true, {}, defaults, opt),
			eff = opt.eff,
			auto = opt.auto,
			ps = opt.ps,
			dim = opt.dim,
			openback = opt.openback,
			closeback = opt.closeback,
			hold = opt.hold,
			_offset = opt._offset,
			_close = opt._close,
			_expanded =  $btn.attr('aria-expanded'),
			eff_ps = opt.eff_ps, 
			eff_speed = opt.eff_speed,
			is_modal = !!$btn.closest('.ui-modal').length,
			btn_w = Math.ceil($btn.outerWidth()),
			btn_h = Math.ceil($btn.outerHeight()),
			btn_t = Math.ceil($btn.position().top),
			btn_l = Math.ceil($btn.position().left),
			pnl_w = Math.ceil($pnl.outerWidth()),
			pnl_h = Math.ceil($pnl.outerHeight());

		//_offset: ture 이거나 modal안의 dropdown 일때 position -> offset 으로 위치 값 변경
		if (_offset || is_modal) {
			btn_t = Math.ceil($btn.offset().top);
			btn_l = Math.ceil($btn.offset().left);
			is_modal ? btn_t = btn_t - $(win).scrollTop(): '';
		}

		//test 
		!!$btn.attr('data-ps') ? ps = $btn.attr('data-ps') : '';

		//위치 자동 설정
		if (auto) {
			if (Math.abs($(win).scrollTop() - $btn.offset().top - $btn.outerHeight()) < Math.abs($(win).scrollTop() +  $(win).outerHeight() / 1.5)) {
				ps = 'bc';
				eff = 'st';
			} else {
				ps = 'tc';
				eff = 'sb';
			}
		}
		
		_expanded === 'false' ? pnlShow(): pnlHide();

		function pnlShow(){
			var org_t, 
				org_l,
				drop_inner = $btn.closest('.ui-drop-pnl').data('id');
			
			//다른 dropdown 닫기가 활성화일때
			if (_close) {
				//dropdown in dropdown 인 경우
				if (!!drop_inner) {
					$('.ui-drop').not('#' + drop_inner).attr('aria-expanded', false);
					$('.ui-drop-pnl').not('[data-id="' + drop_inner +'"]').attr('aria-hidden', true).attr('tabindex', -1).removeAttr('style');
				} else {
					$ui.uiDropdownHide();
				}
			}

			$btn.attr('aria-expanded', true);
			$pnl.attr('aria-hidden', false).attr('tabindex', 0).addClass('on');

			//focus hold or sense
			hold ?	
				$ui.uiFocusTab({ selector:'.ui-drop-pnl[data-id="'+ id +'"]', type:'hold' }):
				$ui.uiFocusTab({ selector:'.ui-drop-pnl[data-id="'+ id +'"]', type:'sense', callback:pnlHide });

			switch (ps) {
				case 'bl': $pnl.css({ top: btn_t + btn_h, left: btn_l }); 
					break;
				case 'bc': $pnl.css({ top: btn_t + btn_h, left: btn_l - ((pnl_w - btn_w) / 2) }); 
					break;
				case 'br': $pnl.css({ top: btn_t + btn_h, left: btn_l - (pnl_w - btn_w) }); 
					break;
				case 'tl': $pnl.css({ top: btn_t - pnl_h, left: btn_l }); 
					break;
				case 'tc': $pnl.css({ top: btn_t - pnl_h, left: btn_l - ((pnl_w - btn_w) / 2) }); 
					break;
				case 'tr': $pnl.css({ top: btn_t - pnl_h, left: btn_l - (pnl_w - btn_w) }); 
					break;
				case 'rt': $pnl.css({ top: btn_t, left: btn_l + btn_w }); 
					break;
				case 'rm': $pnl.css({ top: btn_t - ((pnl_h - btn_h) / 2), left:  btn_l + btn_w  }); 
					break;
				case 'rb': $pnl.css({ top: btn_t - (pnl_h - btn_h), left: btn_l + btn_w }); 
					break;
				case 'lt': $pnl.css({ top: btn_t, left: btn_l - pnl_w }); 
					break;
				case 'lm': $pnl.css({ top: btn_t - ((pnl_h - btn_h) / 2), left: btn_l - pnl_w  }); 
					break;
				case 'lb': $pnl.css({ top: btn_t - (pnl_h - btn_h), left: btn_l - pnl_w }); 
					break; 
				case 'center': $pnl.css({ top: '50%', left: '50%', marginTop: (pnl_h / 2 ) * -1, marginLeft: (pnl_w / 2 ) * -1 }); 
					break;
			}
			
			org_t = parseInt($pnl.css('top')),
			org_l = parseInt($pnl.css('left'));
			
			switch (eff) {
				case 'base': $pnl.stop().show(0); 
					break;
				case 'fade': $pnl.stop().fadeIn(eff_speed); 
					break;
				case 'st': $pnl.css({ top: org_t - eff_ps, opacity: 0, display: 'block' }).stop().animate({ top: org_t, opacity: 1 }, eff_speed); 
					break;
				case 'sb': $pnl.css({ top: org_t + eff_ps, opacity: 0, display: 'block' }).stop().animate({ top: org_t, opacity: 1 }, eff_speed); 
					break;
				case 'sl': $pnl.css({ left: org_l + eff_ps, opacity: 0, display: 'block' }).stop().animate({ left: org_l, opacity: 1 }, eff_speed); 
					break;
				case 'sr': $pnl.css({ left: org_l - eff_ps, opacity: 0, display: 'block' }).stop().animate({ left: org_l, opacity: 1 }, eff_speed); 
					break;
			}

			setTimeout(function(){
				$('body').data('dropdownOpened',true).addClass('dropdownOpened');
			},0);

			!!openback ? openback() : '';
			!!dim ? dimShow($pnl) : '';
			
		}
		function pnlHide(){
			var org_t = parseInt($pnl.css('top')),
				org_l = parseInt($pnl.css('left'));
			
			if ($pnl.closest('.ui-drop-box').length < 1) {
				$('body').data('dropdownOpened',false).removeClass('dropdownOpened');
			}
			$btn.attr('aria-expanded', false).focus();
			$pnl.attr('aria-hidden', true).attr('tabindex', -1).removeClass('on');
			
			switch (eff) {
				case 'base': $pnl.stop().hide(0, pnlHideEnd); 
					break;
				case 'fade': $pnl.stop().fadeOut(eff_speed, pnlHideEnd); 
					break;
				case 'st': $pnl.stop().animate({ top: org_t - eff_ps, opacity: 0 }, eff_speed, pnlHideEnd); 
					break;
				case 'sb': $pnl.stop().animate({ top: org_t + eff_ps, opacity: 0 }, eff_speed, pnlHideEnd); 
					break;
				case 'sl': $pnl.stop().animate({ left: org_l + eff_ps, opacity: 0 }, eff_speed, pnlHideEnd); 
					break;
				case 'sr': $pnl.stop().animate({ left: org_l - eff_ps, opacity: 0 }, eff_speed, pnlHideEnd); 
					break;
			}

			function pnlHideEnd(){
				$pnl.hide().removeAttr('style'); 
			}

			!!closeback ? closeback() : '';
			!!dim ? dimHide() : '';
		}

		
	}
	function dimShow(t){
		$(t).after('<div class="ui-drop-dim"></div>');
		$('.ui-drop-dim').stop().animate({
			opacity:0.7
		})
	}
	function dimHide(){
		$('.ui-drop-dim').stop().animate({
			opacity:0
		},200, function(){
			$(this).remove();
		});
	}
	function createUiDropdownHide(){
		$('body').data('dropdownOpened',false).removeClass('dropdownOpened');
		$('.ui-drop').attr('aria-expanded', false);
		
		$('.ui-drop-pnl[aria-hidden="false"]').each(function(){
			var $pnl = $(this),
				defaults = $pnl.data('opt'),
				opt = $.extend(true, {}, defaults),
				eff = opt.eff,
				eff_ps = opt.eff_ps,
				closeback = opt.closeback,
				eff_speed = opt.eff_speed,
				org_t = parseInt($pnl.css('top')),
				org_l = parseInt($pnl.css('left'));
			
			switch (eff) {
				case 'base': $pnl.stop().hide(0, pnlHideEnd); 
					break;
				case 'fade': $pnl.stop().fadeOut(eff_speed, pnlHideEnd); 
					break;
				case 'st': $pnl.stop().animate({ top: org_t - eff_ps, opacity: 0 }, eff_speed, pnlHideEnd); 
					break;
				case 'sb': $pnl.stop().animate({ top: org_t + eff_ps, opacity: 0 }, eff_speed, pnlHideEnd); 
					break;
				case 'sl': $pnl.stop().animate({ left: org_l + eff_ps, opacity: 0 }, eff_speed, pnlHideEnd); 
					break;
				case 'sr': $pnl.stop().animate({ left: org_l - eff_ps, opacity: 0 }, eff_speed, pnlHideEnd); 
					break;
			}

			function pnlHideEnd(){
				$pnl.hide().removeAttr('style'); 
			}
			$pnl.attr('aria-hidden', true).attr('tabindex', -1);
			!!closeback ? closeback() : '';
		});	

		
		dimHide();
	}

})(jQuery, window, document);