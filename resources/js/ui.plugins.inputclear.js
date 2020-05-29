;(function ($, win, doc, undefined) {

	'use strict';

	var $ui = win.$plugins,
        namespace = 'netiveUI.plugins';

    /* ------------------------------------------------------------------------
	 * input form
	 * input value clear button v1.0 
	 * $plugins.uiInputClear
	 * date : 2018-05-18
	 * input value 값 입력 시 clear버튼 생성
	 * 
	 * input placeholder v1.0 
	 * date : 2018-04-21
	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {
		uiInputClear: function () {
			return createUiInputClear();
		},
		uiPlaceholder: function () {
			return createUiPlaceholder();
		}
	});
	function createUiInputClear(){
		var $inp = $('.ui-inpcancel');

		$inp.each(function(i){
			var $this = $(this);

			$this.val() === '' ?
				$this.next('.ui-btn-cancel').remove():
				$this.next('.ui-btn-cancel').length === 0 ?
				$this.after('<button type="button" class="ui-btn-cancel" data-id="'+ $this.attr('id') +'"><span>입력내용 지우기</span></button>') : '';

			//이벤트 부분 each함수 밖으로 거내보자.
			$inp.eq(i).off('keyup.inpcancel').on('keyup.inpcancel', function(){
				var _$this = $(this);

				if (_$this.val() === '') {
					_$this.next('.ui-btn-cancel').remove();
				} else {
					!!$('.ui-btn-cancel[data-id="'+ _$this.attr('id') +'"]').length ? '' :
					_$this.after('<button type="button" class="ui-btn-cancel" data-id="'+ _$this.attr('id') +'"><span>입력내용 지우기</span></button>');
				}
			});
		});

		//event
		$(doc).off('click.inpcancel').on('click.inpcancel', '.ui-btn-cancel', function(){
			$('#' + $(this).data('id')).val('').focus();
			$(this).remove();
		});
	}
	function createUiPlaceholder(){
		var $ph = $('[placeholder]'),
			phname = '';

		$('.ui-placeholder').remove();
		$ph.each(function(){
			phname = $(this).attr('placeholder');
			$(this).before('<span class="hide ui-placeholder">' + phname + '</span>')
		})
	}


})(jQuery, window, document);