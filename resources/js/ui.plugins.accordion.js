;(function ($, win, doc, undefined) {

	'use strict';

	console.log($plugins.uiNameSpace);

	var $ui = win.$plugins,
		namespace = pluginsName;
		
	/* ------------------------------------------------------------------------
	* name : accordion tab  
	* Ver. : v1.0.0
	* date : 2020-05-17
	* EXEC statement
	* - $plugins.uiAccordion({ option });
	* - $plugins.uiAccordionToggle({ option });
	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {
		uiAccordion: function (opt) {
			return createUiAccordion(opt);
		},
		uiAccordionToggle: function (opt) {
			return createUiAccordionToggle(opt);
		}
	});
	$ui.uiAccordion.option = {
	 	current: null,
		autoclose: false,
		callback: false,
		add: false,
		level: 3
	};
	function createUiAccordion(opt){
		if (opt === undefined || !$('#' + opt.id).length) {
			return false;
		}

		var opt = $.extend(true, {}, $ui.uiAccordion.option, opt),
			id = opt.id,
			current = opt.current,
			callback = opt.callback,
			autoclose = opt.autoclose,
			level = opt.level,
			add = opt.add,
			$acco = $('#' + id),
			$wrap = $acco.children('.ui-acco-wrap'),
			$pnl = $wrap.children('.ui-acco-pnl'),
			$tit = $wrap.children('.ui-acco-tit'),
			$btn = $tit.find('.ui-acco-btn'),
			len = $wrap.length, 
			keys = $ui.option.keys,
			i = 0, 
			j = 0, 
			k = 0, 
			optAcco,
			para = $ui.uiPara('acco'),
			paras,
			paraname;

		//set up
		if (add) {
			current = [];
			$acco.find('.ui-acco-btn.selected').each(function(){
				current.push($(this).closest('.ui-acco-wrap').index());
			});

			autoclose = $acco.data('opt').close;
			callback = $acco.data('opt').callback;
		}

		if (!!para && !add) {
			if (para.split('+').length > 1) {
				//2개이상 설정
				//acco=exeAcco1*2+exeAcco2*3
				paras = para.split('+');

				for (j = 0; j < paras.length; j++ ) {
					paraname = paras[j].split('*');
					opt.id === paraname[0] ? current = [Number(paraname[1])] : '';
				}
			} else {
				//1개 탭 설정
				//tab=1
			 	if (para.split('*').length > 1) {
					paraname = para.split('*');
					opt.id === paraname[0] ? current = [Number(paraname[1])] : '';
				} else {
					current = [Number(para)];
				}
			}
		}

		//set up
		!$pnl ? $pnl = $tit.children('.ui-acco-pnl') : '';
		$acco.attr('role','presentation').data('opt', { 
			id: id, 
			close: autoclose, 
			callback: callback
		});
		$tit.attr('role','heading').attr('aria-level', level);
		$pnl.attr('role','region');

		for (i = 0; i < len; i++) {
			var $wrap_i = $wrap.eq(i),
				$accotit = $wrap_i.find('> .ui-acco-tit'),
				$accopln = $wrap_i.find('> .ui-acco-pnl'),
				$accobtn = $accotit.find('> .ui-acco-btn');
			
			if (!$accopln) {
				$accopln = $accotit.children('.ui-acco-pnl');
			}
			if ($accotit.attr('id') === undefined) {
				$accobtn.attr('id', id + '-btn' + i);
			}
			if ($accopln.attr('id') === undefined) {
				$accopln.attr('id', id + '-pnl' + i);
			}
			
			$accobtn
				.data('selected', false)
				.attr('data-n', i)
				.attr('data-len', len)
				.attr('aria-expanded', false)
				.attr('aria-controls', $accopln.attr('id'))
				.removeClass('selected')
				.find('.ui-acco-arrow').text('열기');
			$accopln
				.attr('data-n', i)
				.attr('data-len', len)
				.attr('aria-labelledby', $accobtn.attr('id'))
				.attr('aria-hidden', true).hide();

			if (i === 0) {
				$accobtn.attr('acco-first', true);
			}
			if (i === len - 1) {
				$accobtn.attr('acco-last', true);
			}
		}
		
		if (current !== null) {

			console.log('ㅁㅁㅁ')
			$ui.uiAccordionToggle({ 
				id: id, 
				current: current, 
				motion: false 
			});
		}

		//event
		$btn.off('click.uiaccotab keydown.uiaccotab')
			.on({
				'click.uiaccotab': evtClick,
				'keydown.uiaccotab': evtKeys
			});

		function evtClick(e) {
			if (!!$(this).closest('.ui-acco-wrap').find('.ui-acco-pnl').length) {
				e.preventDefault();
				var $this = $(this);

				optAcco = $this.closest('.ui-acco').data('opt');
				$ui.uiAccordionToggle({ 
					id: optAcco.id, 
					current: [$this.data('n')], 
					close: optAcco.close, 
					callback: optAcco.callback
				});
			}
		}
		function evtKeys(e) {
			var $this = $(this),
				n = Number($this.data('n')),
				m = Number($this.data('len')),
				id = $this.closest('.ui-acco').attr('id');

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
				
				!$this.attr('acco-first') ?
				$('#' + id + '-btn' + (n - 1)).focus():
				$('#' + id + '-btn' + (m - 1)).focus();
			}
			function downRightKey(e) {
				e.preventDefault();

				!$this.attr('acco-last') ? 
				$('#' + id + '-btn' + (n + 1)).focus():
				$('#' + id + '-btn0').focus();
			}
			function endKey(e) {
				e.preventDefault();

				$('#' + id + '-btn' + (m - 1)).focus();
			}
			function homeKey(e) {
				e.preventDefault();
				$('#' + id + '-btn0').focus();
			}
		}
	}
	function createUiAccordionToggle(opt){
		if (opt === undefined) {
			return false;
		}
		
		var id = opt.id,
			$acco = $('#' + id),
			dataOpt = $acco.data('opt'),
			current = opt.current === undefined ? null : opt.current,
			callback = opt.callback === undefined ? dataOpt.callback : opt.callback,
			state = opt.state === undefined ? 'toggle' : opt.state,
			motion = opt.motion === undefined ? true : opt.motion,
			autoclose = dataOpt.close,
			open = null,
			$wrap = $acco.children('.ui-acco-wrap'),
			$pnl,
			$tit,
			$btn,
			len = $wrap.length,
			speed = 200,
			i, c = 0;
		
		(motion === false) ? speed = 0 : speed = 200;

		if (current !== 'all') {
			for (i = 0 ; i < current.length; i++) {
				$pnl = $wrap.eq(current[i]).children('.ui-acco-pnl');
				$tit = $wrap.eq(current[i]).children('.ui-acco-tit');
				$btn = $tit.find('.ui-acco-btn');
				
				if (state === 'toggle') {
					(!$btn.data('selected')) ? act('down') : act('up');
				} else {
					(state === 'open') ? act('down') : (state === 'close') ? act('up') : '';
				}
			}
			!callback ? '' :
				callback({ 
					id:id, 
					open:open, 
					current:current
				});
		} else if (current === 'all') {
			checking();
		}

		function checking() {
			//열린상태 체크하여 전체 열지 닫을지 결정
			c = 0;
			$wrap.each(function(i){
				c = ($wrap.eq(i).find('> .ui-acco-tit .ui-acco-btn').attr('aria-expanded') === 'true') ? c + 1 : c + 0;
			});
			//state option 
			if (state === 'open') {
				c = 0;
				$acco.data('allopen', false);
			} else if (state === 'close') {
				c = len;
				$acco.data('allopen', true);
			}
			//all check action
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
				txt = isDown ? '닫기' : '열기';
			
			open = isDown ? true : false;

			if (autoclose === true && isDown) {
				$wrap.each(function(i){
					$wrap.eq(i).find('> .ui-acco-tit .ui-acco-btn').data('selected', false).removeClass('selected').attr('aria-expanded', false)
						.find('.ui-acco-arrow').text('열기');
					$wrap.eq(i).find('> .ui-acco-pnl').attr('aria-hidden',true).stop().slideUp(speed);
				});
			}

			if (current === 'all') {
				$wrap.each(function(i){
					$wrap.eq(i).find('> .ui-acco-tit .ui-acco-btn').data('selected', a)[cls]('selected').attr('aria-expanded', a)
						.find('.ui-acco-arrow').text(txt);
					$wrap.eq(i).find('> .ui-acco-pnl').attr('aria-hidden', !a).stop()[updown](speed, function(){
						$(this).css({ height: '', padding: '', margin: '' }); //init
					});
				});
			} else {
				$btn.data('selected', a).attr('aria-expanded', a)[cls]('selected')
					.find('.ui-acco-arrow').text(txt);
				$pnl.attr('aria-hidden', !a).stop()[updown](speed, function(){
					$(this).css({ height: '', padding: '', margin: '' }); //init
				});
			}
		}
	}
    
})(jQuery, window, document);