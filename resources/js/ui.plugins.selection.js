;(function ($, win, doc, undefined) {

	'use strict';

	var $ui = win.$plugins,
        namespace = 'netiveUI.plugins';

    /* ------------------------------------------------------------------------
	* name : selection(radio & checkbox)
	* Ver. : v1.0.0
	* date : 2018-12-21
	* EXEC statement
	* - $plugins.uiSelection({ option });
	* - $plugins.uiSelectionChange({ option });
	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {	
		uiSelection: function (opt) {
			return createUiSelection(opt);
		},
		uiSelectionChange: function (opt) {
			return createUiSelectionChange(opt);
		}
	});
	$ui.uiSelection.option = {
		id: false,
		all: false,
		callback: false
	};
	function createUiSelection(opt){
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, $ui.uiSelection.option, opt),
			id = opt.id,
			is_id = id === false ? false : true,
			$inp = id === false ? $('input[type="checkbox"], input[type="radio"]') : typeof id === 'string' ? $('#' + id) : id,
			len = $inp.length,
			i = 0, 
			$inp_current,
			inp_current_id;
		
		//set
		for (i = 0, len; i < len; i++) {
			$inp_current = $inp.eq(i);
			opt.id = $inp_current;
			inp_current_id = $inp_current.attr('id');
			is_id ? $inp_current.data('exe', false) : '';

			if(!$inp_current.data('exe')) {
				$inp_current.data('exe', true);
				
				if (inp_current_id !== undefined) {
					$inp_current.data('opt', opt);
					$inp_current.attr('type') === 'checkbox' ?
						selectionCheck({ id:inp_current_id })://checkbox
						selectionApp({ id:inp_current_id });//radio
				} 
			}			
		}
		$('body').data('selection', true);

		//event
		$inp.off('click.ui focus.ui blur.ui')
			.on({
				'click.ui': evtFocus,
				'focus.ui': evtAdd,
				'blur.ui': evtRemove
			});

		function evtFocus(){
			labelState($(this).attr('id'), 'focus', $(this).attr('type'));
		}
		function evtAdd(){
			labelState($(this).attr('id'), 'add', $(this).attr('type'));
		}
		function evtRemove(){
			labelState($(this).attr('id'), 'remove', $(this).attr('type'));
		}
		function labelState(id, state, type){
			var $lable = $('label[for="'+ id +'"]');

			switch (state){
				case 'focus' : 
					type === 'checkbox' ?
						selectionCheck({ id:id, evt:true })://checkbox
						selectionApp({ id:id });//radio
					$lable.focus();
					break;

				case 'add' : 
					$lable.addClass('activated');
					break;

				case 'remove' : 
					$lable.removeClass('activated');
					break;
			}
		}
	}
	function selectionCheck(opt){ 
		//opt: id, evt 
		//only checkbox. 전체체크관련 체크단계
		var id = opt.id,
			evt = opt.evt === undefined ? false : opt.evt,
			$inp = $('#'+ id),
			checkgroup = $inp.attr('type') === 'radio' ? 
				$inp.attr('name') : //radio
				$inp.attr('checkgroup'), //checkbox
			$inps = $inp.attr('type') === 'radio' ? 
				$('input[name="' + checkgroup + '"]') : //radio
				$('input[checkgroup="' + checkgroup + '"]'), //checkbox, checkgroup으로 갈지 class 명으로 갈지 선택해야함. ie8에서 사용자속성을 인식못하는경우가 있음.
			$all = $('#'+ checkgroup), //전체체크 input
			i = 0, 
			n = 0, 
			m = 0, 
			len = $inps.length;
		
		//checkgroup이 있다면 실행하여 현재 그룹의 체크된 갯수 파악 
		if (checkgroup !== undefined) {
			for (i = 0; i < len; i++) {
				n = ($inps.eq(i).prop('checked')) ?  1 : 0;
				m = m + n;
			}

			m === len ? 
				act(true) : 
				m === len - 1 && $all.data('checked') === true ? act(false) : '';
		} 
		
		selectionApp({ id:id, evt:evt });
	
		//그룹의 체크된 갯수에 따라 전체체크 checked 선택
		function act(v){
			$all.data('checked', v ? true : false);
			$all.prop('checked') === false ? 
				$all.prop('checked', true) : 
				$all.prop('checked', false);
			selectionApp({ id:checkgroup, act:v ? false : true, evt:evt });
		}
	}
	function selectionApp(opt){
		//opt: id, act, evt
		//checkbox,radio check action
		var $inp = $('#' + opt.id),
			id = $inp.attr('id'),
			$label = $('label[for="'+ id +'"]'),
			inp_opt = $inp.data('opt'),
			allcheck = inp_opt.all,
			callback = inp_opt.callback,
			_opt,
			act = opt.act === undefined ? false : opt.act,
			evt = opt.evt === undefined ? false : opt.evt,
			$allItemNot,
			dataChecked,
			checkClass;
		
		//전체체크 
		if (!!allcheck === true && evt){
			//전체체크에 포함되어 있으면서 disabled가 아닌 input
			$allItemNot = $('input[checkgroup="' + id + '"]:not(:disabled)');
			//class로 처리 시
			//$allItemNot = $('input.' + id + ':not(:disabled)');
			
			//전체체크
			if ($inp.prop('checked') === true) {
				dataChecked = true;
				$allItemNot.prop('checked', true).each(function(i){
					_opt = $allItemNot.eq(i).data('opt');
					$('label[for=' + $allItemNot.eq(i).attr('id') + ']:not(.disabled)').addClass('checked');
					//전체체크시 이벤트 콜백 등 확인필요

					!!_opt.callback ? _opt.callback({ id: $allItemNot.eq(i).attr('id'), value: dataChecked }) : '';
				});
			}
			//전체미체크
			else if($inp.prop('checked') === false) {				
				dataChecked = false;
				if (act === false) {
					$allItemNot.prop('checked', false).each(function(i){
						_opt = $allItemNot.eq(i).data('opt');
						$('label[for=' + $allItemNot.eq(i).attr('id') + ']:not(.disabled)').removeClass('checked');

						!!_opt.callback ? _opt.callback({ id:$allItemNot.eq(i).attr('id'), value: dataChecked }) : '';
					});
				}
			}
		}
		//개별체크
		else {
			if ($inp.prop('checked') === true) {
				if ($inp.attr('type') === 'radio') {
					//radio button
					$('input[name="' + $inp.attr('name') + '"]').each(function(){
						$('label[for="'+ $(this).attr('id') +'"]').removeClass('checked');
					});
				} else {
					//checkbox button
					$label.addClass('checked');
				}
				dataChecked = true;
			} 
			else if ($inp.prop('checked') === false) {
				dataChecked = false;
			}
		}

		checkClass = (dataChecked === true) ? 'addClass' : 'removeClass';
		$inp.prop('disabled') === true ? $label.addClass('disabled') : $label.removeClass('disabled');
		$inp.data('checked', dataChecked);
		$label[checkClass]('checked');
		!!callback ? callback({ id: opt.id, value: dataChecked }) : '';
	}
	function createUiSelectionChange(opt){
		if (opt === undefined || opt.id === undefined) {
			return false;
		}

		var id = opt.id,
			$id = typeof id === 'string' ? $('#'+ id) : id,
			callback = opt.callback === undefined ? false : opt.callback;

		opt.checked !== undefined ? 
			$id.prop('checked', opt.checked) : 
			$id.prop('checked') ? 
				$id.prop('checked', true) : 
				$id.prop('checked', false);

		opt.disabled !== undefined ? 
			$id.prop('disabled', opt.disabled) : 
			$id.prop('disabled') ? 
				$id.prop('disabled', true) : 
				$id.prop('disabled', false);

		!!($id.attr('type') === 'radio' || $id.attr('type') === 'checkbox') ? 
			selectionCheck({ id:id, evt:false }) : '';

		!!callback ? callback() : '';
	}
})(jQuery, window, document);