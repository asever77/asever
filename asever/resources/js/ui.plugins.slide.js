;(function ($, win, doc, undefined) {

	'use strict';

	var $ui = win.$plugins,
        namespace = 'netiveUI.plugins';

    /* ------------------------------------------------------------------------
	 * slide(carousel) v1.0 
	 * date : 2018-04-21
	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {
		uiSlide: function (opt) {
			return createUiSlide(opt);
		},
		uiSlideFnEvt: function (opt) {
			return createUiSlideFnEvt(opt);
		},
		uiSlideFnAuto: function (opt) {
			return createUiSlideFnAuto(opt);
		}
	});
	$ui.uiSlide.options = {
		current:0,
		multi:false,
		loop:true,
		items:1,
		eff:'slide',
		dot:true,
		nav:true,
		auto:true,
		play:false,
		gauge:true,
		resize: true,
		speed:300,
		autoTime:3000,
		callback: false,
		/* multi use */
		margin:0,
		mouseDrag:true,
		touchDrag:true
	};
	function createUiSlide(opt) {
		//option guide
		if (opt === undefined) {
			return false;
		}
		
		$ui.uiSlide[opt.id] = {};
		var base = $ui.uiSlide[opt.id];

		//루트설정
		base.root = $('#' + opt.id);
		base.tit = base.root.find('.ui-slide-tit');
		base.wrap = base.root.find('.ui-slide-wrap');
		base.itemwrap = base.root.find('.ui-slide-itemwrap');
		base.item = base.root.find('.ui-slide-item');
		base.itemtit = base.root.find('.ui-slide-itemtit');

		//옵션저장
		base.opt = $.extend({}, $ui.uiSlide.options, opt);
		
		//중복실행 방지
		if (!base.root.is('.load')) {
			base.root.addClass('load');
			uiSlideSet(base);

			
		}
	}
	function uiSlideSet(base){
		var base = base;

		//기본필요값 설정
		base.opt.len = base.item.length;
		base.opt.w = base.item.eq(base.opt.current).outerWidth();
		base.opt.h = base.item.eq(base.opt.current).outerHeight();
		base.opt.win_w = $(win).outerWidth();
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
			base.itemwrap.addClass('ui-slide-multiitem');
			
			for (var i = 0; i < base.opt.len; i++) {
				base.item.eq(i).css('margin-right', (i !== base.opt.len - 1) ? base.opt.margin: 0 );
				base.multi.h.push(base.item.eq(i).outerHeight());
				base.multi.ww = base.multi.ww + base.item.eq(i).outerWidth() + Number((i !== base.opt.len - 1) ? base.opt.margin : 0);
				base.multi.w.push(base.multi.ww);
			}
			base.itemwrap.css('width', base.multi.ww);
			base.itemwrap.data('left', 0) ;
		}
		
		//current item 설정
		//base.opt.eff !== 'slide' ? base.item.addClass('animated') : '';
		if (!base.multi.is) {
			base.item.attr('aria-hidden', true).css('left', base.opt.w).eq(base.opt.current).attr('aria-hidden', false).css('left',0);
		}
		
		//heigth 설정
		base.wrap.css('height', base.opt.h);
		base.itemwrap.css('height', base.opt.h);
		base.item.eq(base.opt.current).css('height', base.opt.h);

		//이벤트 관련 설정
		base.evt = {};
		base.evt.offsetX = 0;
		base.evt.offsetY = 0;
		base.evt.activate = false; //현재 모션 여부
		base.evt.swap = 'off'; //dragmove,cancel 이벤트 실행여부
		base.evt.cancel = false;
		base.evt.xaxis = false;
		base.evt.movX = 0;
		base.evt.movY = 0;

		//자동진행
		base.auto = {};
		base.timer = {};
		base.timers = {};
		
		//fade effect value
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

		$(win).resize(function(){
			base.itemwrap.find('.ui-slide-item[aria-hidden="true"]').css('left', base.itemwrap.outerWidth());
			uiSlideReset(base);
			uiSlideEvtType(base);
			uiSlideEvt(base);
		});
		base.root.data('base', base);
	}
	function uiSlideDot(base) {
		var base = base,
			i, dotwrap, dotdiv, selected;
		
		dotwrap = doc.createElement("div");
		dotdiv = doc.createElement("div");
		$(dotwrap).addClass('ui-slide-dotwrap');
		$(dotdiv).addClass('ui-slide-dotdiv').attr('role', 'tablist');

		for (i = 0; i < base.opt.len; i++) {
			selected = (base.opt.current === i) ? 'true' : 'false'; 
			$(dotdiv).append('<button class="ui-slide-dot" type="button" role="tab" aria-selected="' + selected + '"><span class="hide">' + base.item.eq(i).find(".ui-slide-itemtit").text() + '</span></button>');
		}
		base.root.prepend(dotwrap);
		base.dotwrap = base.root.find('.ui-slide-dotwrap');
		base.dotwrap.append(dotdiv);
		base.dotdiv = base.dotwrap.find('.ui-slide-dotdiv');
		base.dotbtn = base.dotdiv.find('.ui-slide-dot');
	}
	function uiSlideNav(base) {
		var base = base,
			navwrap, $navwrap, eqNext, eqPrev;
		
		eqNext = base.opt.current + 1 >= base.opt.len ? 0 : base.opt.current + 1;
		eqPrev = base.opt.current - 1 < 0 ? base.opt.len - 1 : base.opt.current - 1;
		
		navwrap = doc.createElement("div");
		$navwrap = $(navwrap);
		
		$navwrap.addClass('ui-slide-navwrap');
		$navwrap.append('<button type="button" class="ui-slide-prev">이전 : <span>' + base.item.eq(eqPrev).find(".ui-slide-itemtit").text() + '</span></button>');
		$navwrap.append('<button type="button" class="ui-slide-next">다음 : <span>' + base.item.eq(eqNext).find(".ui-slide-itemtit").text() + '</span></button>');
		base.root.append(navwrap);
		
		base.nav = base.root.find('.ui-slide-navwrap');
		base.nav.prev = base.nav.find('.ui-slide-prev');
		base.nav.next = base.nav.find('.ui-slide-next');
	}
	function uiSlideAuto(base) {
		var base = base,
				dotwrap, autobtn;

			if (!base.root.find('.ui-slide-dotwrap').length) {
				dotwrap = doc.createElement("div");
				$(dotwrap).addClass('ui-slide-dotwrap');
				base.root.prepend(dotwrap);
				base.dotwrap = base.root.find('.ui-slide-dotwrap');
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
		$gaugewrap.append('<div class="ui-slide-gaugebar"></div>');
		base.root.append(gaugewrap);
		
		base.gauge =  base.root.find('.ui-slide-gauge');
		base.gauge.bar = base.gauge.find('.ui-slide-gaugebar');
	}
	function uiSlideReset(base) {
		var base = base;

		$(win).resize(function(){
			clearTimeout(base.timers);
			base.timers = setTimeout(function(){
				if (base.opt.win_w !== $(win).outerWidth()) {
					base.opt.len = base.item.length;
					base.opt.w = base.item.eq(base.opt.current).outerWidth();
					base.opt.h = base.item.eq(base.opt.current).outerHeight();
					base.opt.win_w = $(win).outerHeight();
					base.opt.docw = $(doc).outerHeight();
					base.evt.activate = false; //현재 모션 여부
					
					if (base.multi.is) {
						base.multi.w = [0]; //items width array
						base.multi.h = [];
						base.multi.ww = 0; //itemwrap width
						base.multi.rw = base.root.outerWidth(); //slide width
						base.root.addClass('ui-slide-multi n' + base.opt.items);
						base.itemwrap.addClass('ui-slide-multiitem');
						
						for (var i = 0; i < base.opt.len; i++) {
							base.item.eq(i).css('margin-right', (i !== base.opt.len - 1) ? base.opt.margin: 0 );
							base.multi.h.push(base.item.eq(i).outerHeight());
							base.multi.ww = base.multi.ww + base.item.eq(i).outerWidth() + Number((i !== base.opt.len - 1) ? base.opt.margin : 0);
							base.multi.w.push(base.multi.ww);
						}
						base.itemwrap.css({ width: base.multi.ww, left: 0 });
						base.itemwrap.data('left', 0) ;
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
	function uiSlideEvtCurrent(base){
		var base = base;
		
		//이전 다음 번호생성
		base.evt.next = (base.opt.current + 1 >= base.opt.len) ? 0 : base.opt.current + 1;
		base.evt.prev = (base.opt.current - 1 < 0) ? base.opt.len - 1 : base.opt.current - 1;
	}
	function uiSlideEvt(base) {
		var base = base;

		base.opt.past = base.opt.current;
		
		//click event
		base.root.off(base.evt.click).on(base.evt.click, 'button', function(){
			var $this = $(this);
			
			if (!base.evt.activate) {
				uiSlideEvtCurrent(base);

				if ($this.hasClass('ui-slide-next')) {
					actfn(base.evt.next, 'next');
				} else if ($this.hasClass('ui-slide-prev')) {
					actfn(base.evt.prev, 'prev');
				} else if ($this.hasClass('ui-slide-dot')) {
					actfn($this.index(), base.opt.past < base.opt.current ? 'next' : 'prev');
				} else if ($this.hasClass('ui-slide-auto')) {
					$this.attr('state') === 'play' && base.opt.auto ? uiSlideAutoEvt(base, false) : uiSlideAutoEvt(base, true);
				}
			}
		});
		function actfn(c, d){
			base.opt.current = c;
			base.dir = d;
			uiSlideAct(base);
			base.opt.auto ? uiSlideAutoEvt(base, false) : '';
		}
		
		if (!base.multi.is) {
			base.item.off(base.evt.start).on(base.evt.start, function(event){
				if (!base.evt.activate) {
					uiSlideDragStart(base, event);
				}
			});
		} else {
			base.itemwrap.off(base.evt.start).on(base.evt.start, function(event){
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

		function autoRAF(timestamp){
			var tstamp = !timestamp ? base.timer : timestamp.toFixed(0),
				limit = !timestamp ? base.opt.autoTime / 10 : base.opt.autoTime,
				progress;

			(!base.startA) ? base.startA = tstamp : '';
			progress = tstamp - base.startA;
			
			if (progress < limit) {
				base.gauge.bar.css('width', (progress / limit * 100).toFixed(0) + '%');
				base.timer = win.requestAFrame(autoRAF);
				/*base.timer = window.requestAFrame(autoRAF);*/
			} else {
				base.opt.current = (base.opt.current + 1 >= base.opt.len) ? 0 : base.opt.current + 1;
				base.dir = 'next';
				base.startA = null;
				base.gauge.bar.css('width', '100%');
				
				uiSlideAct(base, callbackAuto);
				
			}
		}
		function callbackAuto(){
			base.timer = win.requestAFrame(autoRAF);
			/*base.timer = window.requestAFrame(autoRAF);*/
		}
	}
	function uiSlideGetTouches(event) {
		//터치 이벤트가 undefined 가 아니라면
		if (event.touches !== undefined) {
			return { x : event.touches[0].pageX, y : event.touches[0].pageY };
		}
		if (event.touches === undefined) {
			if (event.pageX !== undefined) {
				return { x : event.pageX, y : event.pageY };
			}
			//ie
			if (event.pageX === undefined) {
				return { x : event.clientX, y : event.clientY };
			}
		}
	}
	function uiSlideEvtDrag(base) {
		var base = base;

		if (base.evt.swap === 'on') {
			$(doc).off(base.evt.move).on(base.evt.move, function(event){
				base.root.data('touch', 'move');
				uiSlideDragMove(base, event);
			});
			$(doc).off(base.evt.end).on(base.evt.end, function(event){
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
			switch(base.opt.eff){
			case 'slide': 
				startLeft(base.opt.w, base.opt.w * -1);
				break;
			case 'fade': 
				startLeft(0, 0);
				break;
			//The default value is 'slide'. So no default value is required.
			}
		}
		function startLeft(n,p){
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
			} else if(base.evt.movX !== 0) {
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
			if (base.multi.p === 'prev') {
				n = n - 1 < 0 ? 0 : n - 1;
			}
			
			base.itemwrap.stop().animate({
				left:(base.multi.ww - base.multi.rw) < base.multi.w[n] ? (base.multi.ww - base.multi.rw) * -1 : base.multi.w[n] * -1
			},200 , function(){
				base.itemwrap.data('left', base.multi.w[n] * -1);
			});
		}
	}
	function uiSlideDragMove(base, event) {
		var ev = event.originalEvent || event || win.event,
			base = base;
		
		base.evt.movX = parseInt(base.evt.offsetX - uiSlideGetTouches(ev).x, 10) * -1;
		base.evt.movY = parseInt(base.evt.offsetY - uiSlideGetTouches(ev).y, 10) * -1;
		
		base.opt.auto ? uiSlideAutoEvt(base, false) : '';

		//single drag scope
		if (Math.abs(base.evt.movX) > base.opt.w && !base.multi.is) {
			base.evt.movX = (base.evt.movX < 0) ? base.opt.w * -1 : base.opt.w;
		} 
		if (base.multi.is) {
			base.multi.p = (base.evt.movX < 0) ? 'next' : 'prev';
		}

		//y축이 x축보다 이동이 크고 X축 이동이 5보다 작을때
		if (Math.abs(base.evt.movY) > 2 && Math.abs(base.evt.movX) < 2 && base.evt.xaxis === false) {
			base.evt.swap = 'off';
			base.evt.yaxis = true;
			uiSlideEvtDrag(base);
			//$('body').off('touchstart.bodyscroll', NETIVE.uiSlide.lockTouch);
			//$('html, body').off('touchstart.bodyscroll', NETIVE.uiSlide.lockTouch);
		}
		//X축이 y축보다 이동이 클때	
		else if(base.evt.yaxis === false){
			base.evt.xaxis = true;
			//멀티일때 좌우 끝에서 복원되는 모션 일때 중복실행 방지
			//base.multi.restore : 멀티일때 좌우 끝에서 복원되는 모션
			//if (!base.multi.restore) {
				
				//slide mode
				if (base.opt.eff === 'slide') {
					//single slide mode
					if (!base.multi.is) {
						base.item.eq(base.opt.current).css('left', base.evt.movX);
						base.item.eq(base.evt.next).css('left', base.opt.w + base.evt.movX);
						base.item.eq(base.evt.prev).css('left', (base.opt.w * -1) + base.evt.movX);
					} 
					//multi slide mode
					else if (base.multi.is) {
						// data left 값이 없다면 0으로 설정.
						//base.itemwrap.data('left') ? base.itemwrap.data('left', 0) : '';

						/*clearTimeout(base.multi.timer);
						if (base.evt.movX + Number(base.itemwrap.data('left')) > 0) {
							base.multi.timer = setTimeout(function(){
								NETIVE.uiSlide.restore(base, 0);
							},200);
							base.itemwrap.data('left', 0);
							base.evt.movX = 0;
						} 
						*/

						//multi drag scope 
						if (base.evt.movX + Number(base.itemwrap.data('left')) > 0) {
							//앞부분
							base.itemwrap.css('left', 0).data('left', 0);
						} else if(base.evt.movX + Number(base.itemwrap.data('left')) <  (base.multi.ww - base.multi.rw) * -1){
							//뒷부분
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
			//}
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
			} else if(base.dir === 'prev' && base.evt.movX === 0) {
				$current.css('left', w * -1);
			} else {
				if (base.evt.cancel) {
					$current.css('left', base.evt.movX);
				} else {
					base.evt.movX < 0 ? $current.css('left', w + base.evt.movX) : $current.css('left', (w * -1) + base.evt.movX);
				}
			}
			
			base.item.removeClass('on').attr('aria-hidden', true);
			$current.addClass('on').attr('aria-hidden', false);
			base.start = null;
			uiSlideStep(base, callbackAuto);
		}
	}
	function uiSlideStep(base, callbackAuto) {
		//eff분기
		switch(base.opt.eff){
		case'slide':
			(!base.multi.is) ? uiSlideSteplide(base, callbackAuto) : uiSlideStepMulti(base, callbackAuto);
			break;
		case'fade':
			uiSlideStepFade(base, callbackAuto);
			break;
		}
		
		//heigth 재설정
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

		function stepRAF(timestamp){
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
				},300, function(){
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
	function uiSlideSteplide(base, callbackAuto){
		var base = base,
			tstamp, progress, m, n, 
			j = (base.dir === 'next') ? [-1, 1] : [1, -1],
			nn = 0,
			px_add = (base.opt.w / (base.opt.speed / 16)) - 16,
			px;

			win.requestAFrame(stepRAF);
		base.evt.activate = true;
		
		function stepRAF(timestamp){
			//requestAnimationFrame
			if (!!timestamp) {
				tstamp = timestamp.toFixed(0);
				(!base.start) ? base.start = tstamp : '';
				progress = tstamp - base.start;
				
				m = base.evt.movX < 0 ? base.evt.movX : base.evt.movX * -1; //X축으로 이동값 정수로 변경
				px = progress + (px_add * nn);
				n = Math.ceil(px - m); 
				nn = nn + 1;
				//next & prev step
				if (!base.evt.cancel) {
					base.item.eq(base.opt.past).css({ 
						left: Math.min(n , base.opt.w) * j[0] + 'px',
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
							left: Math.max( ((base.opt.w * -1) + base.evt.movX) - px, base.opt.w * -1 ),
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
				},300, function(){
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
		
		//base.opt.eff !== 'slide' ? base.item.eq(base.opt.current).addClass(base.opt.eff) : '';
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
		!!base.opt.callback ?  uiSlideCallback(base) : '';
	}
	function uiSlideNavTxt(base){
		//이전다음 버튼 명 설정
		var base = base;
		
		base.nav.prev.find('span').text(base.item.eq(base.opt.current - 1 < 0 ? base.opt.len - 1 : base.opt.current - 1).find('.ui-slide-itemtit').text());
		base.nav.next.find('span').text(base.item.eq(base.opt.current + 1 >= base.opt.len ? 0 : base.opt.current + 1).find('.ui-slide-itemtit').text());
	}
	function uiSlideDotChg(base){
		//이전다음 버튼 명 설정
		var base = base;
		
		base.dotbtn.attr('aria-selected', false).eq(base.opt.current).attr('aria-selected', true)
	}
	function uiSlideCallback(base) {
		//callback
		var base = base,
			v = { 'id':base.opt.id, 'current':base.opt.current};
		base.opt.callback(v);		
	}
	function createUiSlideFnEvt(opt) {
		//함수실행
		var base = $('#' + opt.id).data('base');
			
		base.opt.current = opt.current;
		base.dir = base.opt.past < base.opt.current ? 'next' : 'prev';
		
		uiSlideAct(base);
	}
	function createUiSlideFnAuto(opt) {
		//함수실행
		var base = $('#' + opt.id).data('base');

		base.opt.auto ? uiSlideAutoEvt(base, opt.play) : '';

	}
})(jQuery, window, document);