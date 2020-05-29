'use strict';

//Polyfill
if (!Object.create) {
	Object.create = function (o) {
		if (arguments.length > 1) {
			throw new Error('Sorry the polyfill Object.create only accepts the first parameter.');
		}
		function F() {}
		F.prototype = o;
		return new F();
	};
}
if (!Array.indexOf){ 
	Array.prototype.indexOf = function(obj){ 
		for(var i=0; i<this.length; i++){ 
			if(this[i]==obj){ return i; } 
		} 
		return -1; 
	};
}
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(callback,thisArg) {
		var T,k;
		if(this === null) {
			throw new TypeError('error');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if(typeof callback !== "function"){
			throw new TypeError('error');
		}
		if(arguments.length > 1){
			T = thisArg;
		}
		k = 0;
		while(k < len){
			var kValue;
			if(k in O) {
				kValue = O[k];
				callback.call(T, kValue, k, O);
			}
			k++;
		}
	};
}
if (!Array.isArray) {
	Array.isArray = function(arg){
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}
if (!Object.keys){
	Object.keys = (function() {
		'use strict';
		var hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({ toDtring : null }).propertyIsEnumerable('toString'),
			dontEnums = [
				'toString',
				'toLocaleString',
				'valueOf',
				'hasOwnProperty',
				'isPrototypeOf',
				'propertyIsEnumerable',
				'constructor'
			],
			dontEnumsLength = dontEnums.length;
		
		return function(obj) {
			if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
				throw new TypeError('Object.keys called on non=object');
			}
			var result = [], prop, i;
			for (prop in obj) {
				if (hasOwnProperty.call(obj, prop)) {
					result.push(prop);
				}
			}
			if (hasDontEnumBug) {
				for (i=0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) {
						result.push(dontEnums[i]);
					}
				}
			}
			return result;
		};
	}()); 
}
if (!Element.prototype.matches) {
  	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
if (!Element.prototype.closest) {
	console.log('cloeset')
	Element.prototype.closest = function(s) {
		var el = this;

    	do {
      		if (el.matches(s)) return el;
      		el = el.parentElement || el.parentNode;
    	} while (el !== null && el.nodeType === 1);
    	return null;
	};
}

//jQuery closest
// HTMLElement.prototype.closestByClass = function(className) {
//     var target = this;
//     while (!target.parentElement.classList.contains(className)) {
//         target = target.parentElement;
//         if (target.parentElement === null) {
//             throw new Error('Not found.');
//         }
//     }
// 	console.log('closestByClass:', className, target);
//     return target;
// };

//utils module
var pluginsName = 'aseverUI.plugins';

;(function (win, doc, undefined) {
	console.log('global js');

	'use strict';

	var global = '$plugins';
	var namespace = 'aseverUI.plugins';

	//jquery - on,off
	var events = (function(){
		function addRemove(op, events, cb){
			if (cb) {
				events.split(' ').forEach(name => {
					var ev = name.split('.')[0];

					cb = cb || this._eventsNS[name];
					this[op + 'EventListener'].call(this, ev, cb);

					if (op == 'add') { 
						this._eventsNS[name] = cb;
					} else {
						if (this._eventsNS !== undefined) {
							delete this._eventsNS[name];
						}
					} 
				});
			}
		}

		function on(events, cb){
			this._eventsNS = this._eventsNS || {}; // save the _eventsNS on the DOM element itself
			addRemove.call(this, 'add', events, cb);
			return this;
		}

		function off(events, cb){
			addRemove.call(this, 'remove', events, cb);
			return this;
		}

		// need to work on this method, it is the hardest.
		// currently I do not know how to dispatch real events (with namespace) like UIEvent, KeyboardEvent, PointerEvent and so no
		function trigger(eventName, data){
			var e;

			// Don't do events on text and comment nodes
			if( elem.nodeType === 3 || elem.nodeType === 8 || !eventName ) {
				return
			}

			try {
				e = new CustomEvent(eventName);
			}
			catch(err){ 
				console.warn(err) 
			}
			this.dispatchEvent(e);
		}

		return { on, off, trigger };
	})()

	// Extend the DOM with these above custom methods
	window.on = document.on = Element.prototype.on = events.on;
	window.off = document.off = Element.prototype.off = events.off;
	window.trigger = document.trigger = Element.prototype.trigger = events.trigger;

	

	//global namespace
	if (!!win[global]) {
		throw new Error("already exists global!> " + global);
	} else {
        win[global] = createNameSpace(namespace, {
            uiNameSpace: function (identifier, module) { 
                return createNameSpace(identifier, module); 
            }
        });
    }

	function createNameSpace(identifier, module) {
		var name = identifier.split('.');
		var w = win,
			p,
			i = 0;

		if (!!identifier) {
			for (i = 0; i < name.length; i += 1) {
				if (!w[name[i]]) {
					if (i === 0) {
						w[name[i]] = {};
					} else {
						w[name[i]] = {};
					} 
				} 
				w = w[name[i]];
			}
		}

		if (!!module) {
			for (p in module) {
				if (!w[p]) {
					w[p] = module[p];
				} else {
					throw new Error("module already exists! >> " + p);
				}
			}
		}
		return w;
	}

	//html5 tag & device size class 
	(function () {
		var devsize = [1920, 1600, 1440, 1280, 1024, 960, 840, 720, 600, 480, 400, 360];
		var html5tags = ['article', 'aside', 'details', 'figcaption', 'figure', 'footer', 'header', 'hgroup', 'nav', 'main', 'section', 'summary'];
		var width = document.documentElement.offsetWidth,
			colClass = width >= devsize[5] ? 'col12' : width > devsize[8] ? 'col8' : 'col4',
			i = 0,
			size_len = devsize.length,
			max = html5tags.length,
			sizeMode,
			timer;

		win[global].breakpoint = width >= devsize[5] ? true : false;

		var deviceSizeClassName = function(w) {
			for (var i = 0; i < size_len; i++) {
				if (w >= devsize[i]) {
					sizeMode = devsize[i];
					win[global].breakpoint = width >= devsize[5] ? true : false;
					break;
				} else {
					w < devsize[size_len - 1] ? sizeMode = 300 : '';
				}
			}
		};

		for (i = 0; i < max; i++) {
			doc.createElement(html5tags[i]);
		}

		deviceSizeClassName(width);
		var sizeCls = 's' + sizeMode;

		doc.documentElement.classList.add(sizeCls);
		doc.documentElement.classList.add(colClass);
		win.addEventListener('resize', function() {
			clearTimeout(timer);			
			timer = setTimeout(function () {
				var dcHtml = doc.querySelector('html');
				
				width = win.innerWidth; 
				// document.body.offsetWidth === $(win).outerWidth()
				// win.innerWidth : scroll 포함된 width (+17px)
				// win.outerWidth === screen.availWidth 
				deviceSizeClassName(width);

				colClass = width >= devsize[5] ? 'col12' : width > devsize[8] ? 'col8' : 'col4';
				dcHtml.classList.remove('s1920', 's1600', 's1440', 's1280', 's1024', 's940', 's840', 's720', 's600', 's480', 's400', 's360', 's300', 'col12', 'col8', 'col4');
				win[global].breakpoint = width >= devsize[5] ? true : false;

				deviceSizeClassName(width);
				sizeCls = 's' + sizeMode;
				dcHtml.classList.add(sizeCls);
				dcHtml.classList.add(colClass);
			}, 100);
		});
	})();

	//requestAnimationFrame
	win.requestAFrame = (function () {
		return win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.oRequestAnimationFrame ||
			//if all else fails, use setTimeout
			function (callback) {
				return win.setTimeout(callback, 1000 / 60); //shoot for 60 fp
			};
	})();
	win.cancelAFrame = (function () {
		return win.cancelAnimationFrame || win.webkitCancelAnimationFrame || win.mozCancelAnimationFrame || win.oCancelAnimationFrame ||
			function (id) {
				win.clearTimeout(id);
			};
	})();

	//components option win[global].option.effect.easeInQuad
	win[global].option = {
		pageName: function() {
			var page = document.URL.substring(document.URL.lastIndexOf("/") + 1),
				pagename = page.split('?');

			return pagename[0]
		},
		keys: { 
			'tab': 9, 'enter': 13, 'alt': 18, 'esc': 27, 'space': 32, 'pageup': 33, 'pagedown': 34, 'end': 35, 'home': 36, 'left': 37, 'up': 38, 'right': 39, 'down': 40
		},
		effect: {
            //http://cubic-bezier.com - css easing effect
			linear: '0.250, 0.250, 0.750, 0.750',
			ease: '0.250, 0.100, 0.250, 1.000',
			easeIn: '0.420, 0.000, 1.000, 1.000',
			easeOut: '0.000, 0.000, 0.580, 1.000',
			easeInOut: '0.420, 0.000, 0.580, 1.000',
			easeInQuad: '0.550, 0.085, 0.680, 0.530',
			easeInCubic: '0.550, 0.055, 0.675, 0.190',
			easeInQuart: '0.895, 0.030, 0.685, 0.220',
			easeInQuint: '0.755, 0.050, 0.855, 0.060',
			easeInSine: '0.470, 0.000, 0.745, 0.715',
			easeInExpo: '0.950, 0.050, 0.795, 0.035',
			easeInCirc: '0.600, 0.040, 0.980, 0.335',
			easeInBack: '0.600, -0.280, 0.735, 0.045',
			easeOutQuad: '0.250, 0.460, 0.450, 0.940',
			easeOutCubic: '0.215, 0.610, 0.355, 1.000',
			easeOutQuart: '0.165, 0.840, 0.440, 1.000',
			easeOutQuint: '0.230, 1.000, 0.320, 1.000',
			easeOutSine: '0.390, 0.575, 0.565, 1.000',
			easeOutExpo: '0.190, 1.000, 0.220, 1.000',
			easeOutCirc: '0.075, 0.820, 0.165, 1.000',
			easeOutBack: '0.175, 0.885, 0.320, 1.275',
			easeInOutQuad: '0.455, 0.030, 0.515, 0.955',
			easeInOutCubic: '0.645, 0.045, 0.355, 1.000',
			easeInOutQuart: '0.770, 0.000, 0.175, 1.000',
			easeInOutQuint: '0.860, 0.000, 0.070, 1.000',
			easeInOutSine: '0.445, 0.050, 0.550, 0.950',
			easeInOutExpo: '1.000, 0.000, 0.000, 1.000',
			easeInOutCirc: '0.785, 0.135, 0.150, 0.860',
			easeInOutBack: '0.680, -0.550, 0.265, 1.550'
		},
        uiComma: function(n){
			//숫자 세자리수마다 , 붙이기
            var parts = n.toString().split(".");

			return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
        },
        partsAdd0 :function(x) {
            //숫자 한자리수 일때 0 앞에 붙이기
            return Number(x) < 10 ? '0' + x : x;
        }
	};

	//device set
	(function () {
		var ua = navigator.userAgent,
			ie = ua.match(/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i),
			deviceInfo = ['android', 'iphone', 'ipod', 'ipad', 'blackberry', 'windows ce', 'samsung', 'lg', 'mot', 'sonyericsson', 'nokia', 'opeara mini', 'opera mobi', 'webos', 'iemobile', 'kfapwi', 'rim', 'bb10'],
			filter = "win16|win32|win64|mac|macintel",
			uAgent = ua.toLowerCase(),
			deviceInfo_len = deviceInfo.length;

		var browser = win[global].browser = {},
			support = win[global].support = {},
			i = 0,
			version,
			device;

		for (i = 0; i < deviceInfo_len; i++) {
			if (uAgent.match(deviceInfo[i]) != null) {
				device = deviceInfo[i];
				break;
			}
		}
		
		browser.local = (/^http:\/\//).test(location.href);
		browser.firefox = (/firefox/i).test(ua);
		browser.webkit = (/applewebkit/i).test(ua);
		browser.chrome = (/chrome/i).test(ua);
		browser.opera = (/opera/i).test(ua);
		browser.ios = (/ip(ad|hone|od)/i).test(ua);
		browser.android = (/android/i).test(ua);
		browser.safari = browser.webkit && !browser.chrome;
		browser.app = ua.indexOf('appname') > -1 ? true : false;

		//touch, mobile 환경 구분
		support.touch = browser.ios || browser.android || (doc.ontouchstart !== undefined && doc.ontouchstart !== null);
		browser.mobile = support.touch && ( browser.ios || browser.android);
		//navigator.platform ? filter.indexOf(navigator.platform.toLowerCase()) < 0 ? browser.mobile = false : browser.mobile = true : '';
		
		//false 삭제
		// for (j in browser) {
		// 	if (!browser[j]) {
		// 		delete browser[j]
		// 	}
		// }
		
		//os 구분
		browser.os = (navigator.appVersion).match(/(mac|win|linux)/i);
		browser.os = browser.os ? browser.os[1].toLowerCase() : '';

		//version 체크
		if (browser.ios || browser.android) {
			version = ua.match(/applewebkit\/([0-9.]+)/i);
			version && version.length > 1 ? browser.webkitversion = version[1] : '';
			if (browser.ios) {
				version = ua.match(/version\/([0-9.]+)/i);
				version && version.length > 1 ? browser.ios = version[1] : '';
			} else if (browser.android) {
				version = ua.match(/android ([0-9.]+)/i);
				version && version.length > 1 ? browser.android = parseInt(version[1].replace(/\./g, '')) : '';
			}
		}

		if (ie) {
			browser.ie = ie = parseInt( ie[1] || ie[2] );
			( 11 > ie ) ? support.pointerevents = false : '';
			( 9 > ie ) ? support.svgimage = false : '';
		} else {
			browser.ie = false;
		}

		var clsBrowser = browser.chrome ? 'chrome' : browser.firefox ? 'firefox' : browser.opera ? 'opera' : browser.safari ? 'safari' : browser.ie ? 'ie ie' + browser.ie : 'other';
		var clsMobileSystem = browser.ios ? "ios" : browser.android ? "android" : 'etc';
		var clsMobile = browser.mobile ? browser.app ? 'ui-a ui-m' : 'ui-m' : 'ui-d';
		var $html = doc.querySelector('html');

		$html.classList.add(browser.os);
		$html.classList.add(clsBrowser);
		$html.classList.add(clsMobileSystem);
		$html.classList.add(clsMobile);
	})();

	win[global].fn = {
		appendHtml : function (el, str) {
			var div = document.createElement('div');

			div.innerHTML = str;
			while (div.children.length > 0) {
				el.appendChild(div.children[0]);
			}
		},
		joinOption : function (a, b){
			var opt = b === undefined ? {} : b,
				opt_base = JSON.parse(JSON.stringify(a)),
				opt_add = opt,
				opt_ajax = Object.assign( opt_base, opt_add);
	
			return opt_ajax;
		},
		getElementIndex : function(element) {
			return [].indexOf.call(element.parentNode.children, element);
		},

		//이벤트 중복 실행 방지
		debounce : function(func, wait, immediate) {
			var timeout;
			return function() {
				var context = this, args = arguments;
				var later = function() {
					timeout = null;
					if (!immediate) func.apply(context, args);
				};
				var callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) func.apply(context, args);
			};
		}
	}


	/* ---------------------------------------
	+ uiLoading
	--------------------------------------- */
	win[global] = win[global].uiNameSpace(namespace, {
		uiLoading: function (opt) {
			return createUiLoading(opt);
		},
	});
	win[global].uiLoading.timerShow = null;
	win[global].uiLoading.moment = true;
	function createUiLoading(opt) {
		var loading = '',
			$body = document.body,
			opt_visible = opt.visible,
			opt_id = opt.id === undefined || opt.id === '' ? null : opt.id,
			$selector = opt_id === null ? $body : typeof opt.id === 'string' ? doc.querySelector('#' + opt.id) : opt.id,
			txt = opt.txt === undefined ? 'Loading' : opt.txt;

		opt_id === null ?
			loading += '<div class="ui-loading">':
			loading += '<div class="ui-loading" style="position:absolute">';
		loading += '<div class="ui-loading-wrap">';
		loading += '<strong class="ui-loading-txt"><span>'+ txt +'</span></strong>';
		loading += '</div>';

		loading += '<button type="button" class="btn-base" style="position:fixed; bottom:10%; right:10%; z-index:100;" onclick="$plugins.uiLoading({ visible:false });"><span>$plugins.uiLoading({ visible:false })</span></button>';

		loading += '</div>';

		if (opt_visible && $body.dataset.loading !== 'true') {
			showLoading();
		} else {
			!opt_visible && hideLoading();
		} 
		
		function showLoading(){
			win[global].fn.appendHtml($body, loading);

			$body.dataset.loading = true;
			win[global].uiLoading.timerShow = setTimeout(function(){
				console.log(opt_visible, 222);
				win[global].uiLoading.moment = false;
				$selector.querySelector('.ui-loading').classList.add('visible');
			}, 10);
		}
		function hideLoading(){
			var $loading = $selector.querySelector('.ui-loading');

			if (!!$loading) {
				clearTimeout(win[global].uiLoading.timerShow);
				$loading.classList.remove('visible');
				$loading.on('transitionend.loading', removeLoading);
				win[global].uiLoading.moment && removeLoading();
			}
		}

		function removeLoading() {
			console.log(opt.visible, 444);
			win[global].uiLoading.moment = true;
			$body.dataset.loading = false;
			$selector.querySelector('.ui-loading').remove();
		}
	}

	
	/* ---------------------------------------
	+ uiPara
	+ option
	+ - paraName: parameter name
	--------------------------------------- */
	win[global] = win[global].uiNameSpace(namespace, {
		uiPara: function (opt) {
			return createUiPara(opt);
		},
	});
	function createUiPara(paraName){
		var _tempUrl = win.location.search.substring(1),
			_tempArray = _tempUrl.split('&'),
			_tempArray_len = _tempArray.length,
			_keyValue;

		for (var i = 0, len = _tempArray_len; i < len; i++) {
			_keyValue = _tempArray[i].split('=');

			if (_keyValue[0] === paraName) {
				return _keyValue[1];
			}
		}
	}

	/* ---------------------------------------
	+ uiAjax
	+ option
	+ - id: #을 제외한 아이디명만 입력(필수)
	+ - url: 링크 주소 입력(필수)
	--------------------------------------- */
	win[global] = win[global].uiNameSpace(namespace, {
		uiAjax: function (option) {
			return createUiAjax(option);
		},
	});
	win[global].uiAjax.option = {
		page: true, //true일 경우 html추가 및 값 전달, false일 경우 값만 전달, (!선택 - 기본값 true)
		add: false, //false일 경우 삭제추가, true일 경우 추가(!선택 - 기본값 false)
		callback: false,
		errorCallback: false,

		type: 'GET',
		cache: false,
		async: true,
		contType: 'application/x-www-form-urlencoded',
		dataType: 'html'
	};
	function createUiAjax(option) {
		if (option === undefined) {
			return false;
		}
		
		var opt = win[global].fn.joinOption(win[global].uiAjax.option, option),
			$id = doc.querySelector('#' + opt.id),
			callback = opt.callback === undefined ? false : opt.callback,
			errorCallback = opt.errorCallback === undefined ? false : opt.errorCallback;
		
		var httpRequest = new XMLHttpRequest();

		if (!httpRequest) {
			alert('XMLHTTP error');
			return false;
		}

		httpRequest.onreadystatechange = alertContent;
		httpRequest.open(opt.type, opt.url, opt.async);
		httpRequest.setRequestHeader('Content-Type', opt.contType);
		httpRequest.send();

		function alertContent(){
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status  === 200) {
					if (opt.add) {
						win[global].fn.appendHtml($id, httpRequest.responseText);
					} else {
						$id.innerHTML = httpRequest.responseText;
					}
					
					!!callback && callback();
				} else {
					!!errorCallback && errorCallback();
					alert('request error');
				}
			}
		}
	}
	

	/* ---------------------------------------
	+ uiAccordion
	+ option
	+ - id: #을 제외한 아이디명만 입력(필수)
	+ - current: [0,1,...] or 'all', null 개별,다수,전체 선택가능 
	--------------------------------------- */
	win[global] = win[global].uiNameSpace(namespace, {
		uiAccordion: function (option) {
			return createUiAccordion(option);
		},
		uiAccordionToggle: function (option) {
			return createUiAccordionToggle(option);
		}
	});
	win[global].uiAccordion.option = {
	 	current: null,
		autoclose: false,
		callback: false,
		add: false,
		level: 3,
		effect: win[global].option.effect.easeInOut,
		effTime: '.2'
	};
	function createUiAccordion(option){
		if (option === undefined) {
			return false;
		}

		var opt =  win[global].fn.joinOption(win[global].uiAccordion.option, option),
			id = opt.id,
			current = opt.current,
			callback = opt.callback,
			autoclose = opt.autoclose,
			level = opt.level,
			add = opt.add,
			effect = opt.effect,
			effTime = opt.effTime;

		var $acco = doc.querySelector('#' + id),
			$wrap = $acco.querySelectorAll(':scope > .ui-acco-wrap');
			
		var len = $wrap.length, 
			keys = win[global].option.keys,
			i = 0, 
			pageName = $plugins.option.pageName(),
			para = win[global].uiPara('acco'),
			paras,
			paraName;

		//set up
		if (!!para && !add) {
			if (para.split('+').length > 1) {
				//2 or more : acco=exeAcco1*2+exeAcco2*3
				paras = para.split('+');

				for (i = 0; i < paras.length; i++ ) {
					paraName = paras[i].split('*');
					opt.id === paraName[0] ? current = [Number(paraName[1])] : '';
				}
			} else {
				//only one : tab=1
			 	if (para.split('*').length > 1) {
					paraName = para.split('*');
					opt.id === paraName[0] ? current = [Number(paraName[1])] : '';
				} else {
					current = [Number(para)];
				}
			}
		}

		if (add !== false) {
			current = [];
			var ss = JSON.parse(sessionStorage.getItem(id));

			autoclose = autoclose || ss.close;
		}

		sessionStorage.setItem(id, JSON.stringify({ 'close': autoclose, 'current': current, 'effTime':effTime, 'effect':effect }) );
		win[global].uiAccordion[id] = callback;

		$wrap.forEach(function(acco, index){
			var acco = acco,
				$tit = acco.querySelector(':scope > .ui-acco-tit'),
				$pnl = acco.querySelector(':scope > .ui-acco-pnl'),
				$btn = $tit.querySelector(':scope > .ui-acco-btn'),
				$pnlWrap,
				$accoPnlParent,
				$accoPnlWrapParent;

			var idBtn = id + '-btn' + index,
				idPnl = id + '-pnl' + index,
				add = add,
				sameCurrent,
				isParentPnl;

			if (add !== false) {
				($btn.getAttribute('aria-expanded') === 'true') && current.push(index);
			}

			if (current === null) {
				sameCurrent = false;
			} else if (current === 'all') {
				sameCurrent = true;
			} else {
				sameCurrent = current.indexOf(index) === 0 ? true : false;
			}

			acco.classList.add(sameCurrent ? 'acco-hide' : 'acco-hide');

			if ($tit.tagName !== 'DT') {
				$tit.setAttribute('role','heading');
				$tit.setAttribute('aria-level', level);
			}
			
			($btn.getAttribute('id') === undefined || $btn.getAttribute('id') === null) && $btn.setAttribute('id', idBtn);
			$btn.setAttribute('title', 'close');
			$btn.setAttribute('data-n', index);
			$btn.setAttribute('data-len', len);
			$btn.setAttribute('aria-expanded', sameCurrent);
			sameCurrent ? $btn.classList.add('selected') : $btn.classList.remove('selected');

			if (!!$pnl) {
				$pnlWrap = $pnl.querySelector(':scope > .ui-acco-pnl-wrap');
				isParentPnl = !!acco.closest('.ui-acco-pnl');
				$pnl.classList.remove('in-acco');

				if (isParentPnl) {
					$accoPnlParent = acco.closest('.ui-acco-pnl');
					$accoPnlWrapParent = $accoPnlParent.querySelector(':scope > .ui-acco-pnl-wrap');
				}

				if ($pnl.getAttribute('id') === undefined || $pnl.getAttribute('id') === null) {
					$pnl.setAttribute('id', idPnl);
					$btn.setAttribute('aria-controls', idPnl);
				} 
				($btn.getAttribute('id') === undefined || $btn.getAttribute('id') === null) && $pnl.setAttribute('aria-labelledby', idBtn);
				$pnl.setAttribute('role','region');
				$pnl.setAttribute('data-n', index);
				$pnl.setAttribute('data-len', len);
				$pnl.setAttribute('aria-hidden', !sameCurrent);
				$pnl.setAttribute('style', 'min-height:0px; transition:min-height '+ effTime +'s cubic-bezier('+ effect +')');
				
				setTimeout(function(){
					$pnl.style.minHeight = sameCurrent ? $pnlWrap.offsetHeight + 'px': '0px';

					if (isParentPnl && sameCurrent) {
						$accoPnlParent.classList.add('in-acco');
						setTimeout(function(){
							$accoPnlParent.style.minHeight = $accoPnlWrapParent.offsetHeight + 'px';
						}, 500);
					}
				}, 500);
			}
			
			$btn.removeAttribute('acco-last');
			(index === 0) && $btn.setAttribute('acco-first', true);
			(index === len - 1) && $btn.setAttribute('acco-last', true);

			if ($btn.getAttribute('acco-set') === 'false' || !$btn.getAttribute('acco-set')) {
				$btn.off('click.acco', eventClick, false).on('click.acco', eventClick, false);
				$btn.off('keydown.acco', eventClick, false).on('keydown.acco', eventKey, false);
				$btn.setAttribute('acco-set', true);
			}
		});
		
		function eventClick(e, i, n){
			var $wrap = null,
				$acco = null,
				idx = null,
				this_id = null;

			if (!!e) {
				$wrap = e.target.closest('.ui-acco-wrap');
				$acco = $wrap.closest('.ui-acco');
				this_id = $acco.getAttribute('id');
				idx = [win[global].fn.getElementIndex($wrap)];
			} else {
				this_id = i;
				idx = n;
			}

			win[global].uiAccordionToggle({ 
				id: this_id, 
				current: idx ,
				add: add
			});
			
		}

		function eventKey(e) {
			var $this = e.target,
				$acco = $this.closest('.ui-acco'),
				n = Number($this.getAttribute('data-n')),
				m = Number($this.getAttribute('data-len')),
				id = $acco.getAttribute('id');

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
				!$this.getAttribute('acco-first') ?
					doc.querySelector('#' + id + '-btn' + (n - 1)).focus():
					doc.querySelector('#' + id + '-btn' + (m - 1)).focus();
			}
			function downRightKey(e) {
				e.preventDefault();
				!$this.getAttribute('acco-last') ? 
					doc.querySelector('#' + id + '-btn' + (n + 1)).focus():
					doc.querySelector('#' + id + '-btn0').focus();
			}
			function endKey(e) {
				e.preventDefault();
				doc.querySelector('#' + id + '-btn' + (m - 1)).focus();
			}
			function homeKey(e) {
				e.preventDefault();
				doc.querySelector('#' + id + '-btn0').focus();
			}
		}
	}
	function createUiAccordionToggle(opt){
		var id = opt.id,
			current = opt.current,
			$acco = doc.querySelector('#' + id),
			$wrap = $acco.querySelectorAll(':scope > .ui-acco-wrap'),
			currentPrev = null,
			ssOpt = JSON.parse(sessionStorage.getItem(id)),
			showAll = false;

		var pnl_close = ssOpt.close,
			effTime = Number(ssOpt.effTime) * 1000 + 100;

		console.log(ssOpt.close, ssOpt.effTime, opt);

		if ($wrap.length === $acco.querySelectorAll(':scope > .acco-show').length) {
			showAll = true;
		}

		$wrap.forEach(function(acco, index){
			var acco = acco,
				$tit = acco.querySelector(':scope > .ui-acco-tit'),
				$btn = $tit.querySelector(':scope > .ui-acco-btn'),
				$pnl = acco.querySelector(':scope > .ui-acco-pnl');

			if ($btn.getAttribute('aria-expanded') === 'true') {
				currentPrev = index;
			}
			
			var closeAll = function (){
				acco.classList.remove('acco-show');
				acco.classList.add('acco-hide');
				$btn.setAttribute('title', 'open');
				$btn.classList.remove('selected');
				$btn.setAttribute('aria-expanded', false);
				$pnl.setAttribute('aria-hidden', true);
				$pnl.style.minHeight = 0 + 'px';
			}

			pnl_close && closeAll();

			if (current === 'all') {
				if (showAll) {
					closeAll();
				} else {
					acco.classList.remove('acco-hide');
					acco.classList.add('acco-show');
					$btn.setAttribute('title', 'close');
					$btn.classList.add('selected');
					$btn.setAttribute('aria-expanded', true);
					$pnl.setAttribute('aria-hidden', false);
					$pnl.style.minHeight = acco.querySelector(':scope > .ui-acco-pnl > .ui-acco-pnl-wrap').offsetHeight + 'px';
				}
			} else {
				current.find(function(n) {
					var $currentAcco,
						$currentAccoTit,
						$currentAccoBtn,
						$currentAccoPnl,
						$currentAccoPnlWrap,
						$currentAccoPnlParent,
						$currentAccoPnlWrapParent;

					var isParentPnl = false;

					if (Number(n) === index) {
						$currentAcco = $wrap[Number(n)];
						$currentAccoTit = $currentAcco.querySelector(':scope > .ui-acco-tit');
						$currentAccoBtn = $currentAccoTit.querySelector(':scope > .ui-acco-btn');
						$currentAccoPnl = $currentAcco.querySelector(':scope > .ui-acco-pnl');
						$currentAccoPnlWrap = $currentAccoPnl.querySelector(':scope > .ui-acco-pnl-wrap');
						isParentPnl = !!$currentAcco.closest('.ui-acco-pnl');
						$currentAccoPnl.classList.remove('in-acco');

						if (isParentPnl) {
							$currentAccoPnlParent = $currentAcco.closest('.ui-acco-pnl');
							$currentAccoPnlWrapParent = $currentAccoPnlParent.querySelector(':scope > .ui-acco-pnl-wrap');
						}

						if (currentPrev === n) {
							$currentAccoPnl.style.minHeight = 0 + 'px';
							$currentAcco.classList.remove('acco-show');
							$currentAcco.classList.add('acco-hide');
							$currentAccoBtn.classList.remove('selected');
							$currentAccoBtn.setAttribute('title', 'open');
							$currentAccoBtn.setAttribute('aria-expanded', false);
							$currentAccoPnl.setAttribute('aria-hidden', true);
						} else {
							$currentAccoPnl.style.minHeight = $currentAccoPnlWrap.offsetHeight + 'px';
							$currentAcco.classList.remove('acco-hide');
							$currentAcco.classList.add('acco-show');
							$currentAccoBtn.classList.add('selected');
							$currentAccoBtn.setAttribute('title', 'close');
							$currentAccoBtn.setAttribute('aria-expanded', true);
							$currentAccoPnl.setAttribute('aria-hidden', false);
						}	

						if (isParentPnl) {
							$currentAccoPnlParent.classList.add('in-acco');
							setTimeout(function(){
								$currentAccoPnlParent.style.minHeight = $currentAccoPnlWrapParent.offsetHeight + 'px';
							}, effTime);
						}

						//callback
						if (!!win[global].uiAccordion[id]) {
							win[global].uiAccordion[id]({
								id: id,
								current : current
							});
						}
					}
				});
			}
		});
	}

})(window, document);

