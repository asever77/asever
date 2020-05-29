//domain 
var uiDomainCheck = window.location.hostname ;

console.log = function(){};

try{
	var $parentDocument = parent.document;
}catch(e){
	if (!$('.mode-preview').length) {
		if (uiDomainCheck.indexOf('youravon.com') > -1) {
			document.domain = 'youravon.com';
		} else if (uiDomainCheck.indexOf('avon.com') > -1) {
			document.domain = 'avon.com';
		}
	}
}

// if (uiDomainCheck.indexOf('youravon.com') > -1) {
// 	document.domain = 'youravon.com';
// } else if (uiDomainCheck.indexOf('avon.com') > -1) {
// 	document.domain = 'avon.com';
// } 

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

//jQuery closest
HTMLElement.prototype.closestByClass = function(className) {
    var target = this;
    while (!target.parentElement.classList.contains(className)) {
        target = target.parentElement;
        if (target.parentElement === null) {
            throw new Error('Not found.');
        }
    }
    return target;
};

//utils module
;(function ($, win, doc, undefined) {

	'use strict';

	var global = '$plugins';
	var namespace = 'netiveUI.plugins';

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
	
	
	//jquery easing add
	var easings = {
		linear : function(t,b,c,d){return c*t/d+b;},
		easeInQuad : function(t,b,c,d){return c*(t/=d)*t+b;},
		easeOutQuad : function(t,b,c,d){return -c*(t/=d)*(t-2)+b;},
		easeInOutQuad : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return -c/2*((--t)*(t-2)-1)+b;},
		easeOutInQuad : function(t,b,c,d){if(t < d/2)return easings.easeOutQuad(t*2,b,c/2,d);return easings.easeInQuad((t*2)-d,b+c/2,c/2,d);},
		easeInCubic : function(t,b,c,d){return c*(t/=d)*t*t+b;},
		easeOutCubic : function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},
		easeInOutCubic : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},
		easeOutInCubic : function(t,b,c,d){if(t<d/2)return easings.easeOutCubic(t*2,b,c/2,d);return easings.easeInCubic((t*2)-d,b+c/2,c/2,d);},
		easeInQuart : function(t,b,c,d){return c*(t/=d)*t*t*t+b;},
		easeOutQuart : function(t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b;},
		easeInOutQuart : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return -c/2*((t-=2)*t*t*t-2)+b;},
		easeOutInQuart : function(t,b,c,d){if(t<d/2)return easings.easeOutQuart(t*2,b,c/2,d);return easings.easeInQuart((t*2)-d,b+c/2,c/2,d);},
		easeInQuint : function(t,b,c,d){return c*(t/=d)*t*t*t*t+b;},
		easeOutQuint : function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},
		easeInOutQuint : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},
		easeOutInQuint : function(t,b,c,d){if(t<d/2)return easings.easeOutQuint(t*2,b,c/2,d);return easings.easeInQuint((t*2)-d,b+c/2,c/2,d);},
		easeInSine : function(t,b,c,d){return -c*Math.cos(t/d*(Math.PI/2))+c+b;},
		easeOutSine : function(t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;},
		easeInOutSine : function(t,b,c,d){return -c/2*(Math.cos(Math.PI*t/d)-1)+b;},
		easeOutInSine : function(t,b,c,d){if(t<d/2)return easings.easeOutSine(t*2,b,c/2,d);return easings.easeInSine((t*2)-d,b+c/2,c/2,d);},
		easeInExpo : function(t,b,c,d){return (t===0)? b : c*Math.pow(2,10*(t/d-1))+b-c*0.001;},
		easeOutExpo : function(t,b,c,d){return (t==d)? b+c : c*1.001*(-Math.pow(2,-10*t/d)+1)+b;},
		easeInOutExpo : function(t,b,c,d){if(t===0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b-c*0.0005;return c/2*1.0005*(-Math.pow(2,-10*--t)+2)+b;},
		easeOutInExpo : function(t,b,c,d){if(t<d/2)return easings.easeOutExpo(t*2,b,c/2,d);return easings.easeInExpo((t*2)-d,b+c/2,c/2,d);},
		easeInCirc : function(t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-1)+b;},
		easeOutCirc : function(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;},
		easeInOutCirc : function(t,b,c,d){if((t/=d/2)<1)return -c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;},
		easeOutInCirc : function(t,b,c,d){if (t<d/2)return easings.easeOutCirc(t*2,b,c/2,d);return easings.easeInCirc((t*2)-d,b+c/2,c/2,d);},		
		easeInElastic : function(t,b,c,d,a,p){if(!t)return b;if((t/=d)==1)return b+c;var s,p=(!p||typeof(p)!='number')? d*.3 : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},
		easeOutElastic : function(t,b,c,d,a,p){if(!t)return b;if((t/=d)==1)return b+c;var s,p=(!p||typeof(p)!='number')? d*.3 : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);return (a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b);},
		easeInOutElastic : function(t,b,c,d,a,p){if(t===0)return b;if((t/=d/2)==2)return b+c;var s,p=d*(.3*1.5),a=0;var s,p=(!p||typeof(p)!='number')? d*(.3*1.5) : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return -.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},
		easeOutInElastic : function(t,b,c,d,a,p){if (t<d/2)return easings.easeOutElastic(t*2,b,c/2,d,a,p);return easings.easeInElastic((t*2)-d,b+c/2,c/2,d,a,p);},
		easeInBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;return c*(t/=d)*t*((s+1)*t-s)+b;},
		easeOutBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},
		easeInOutBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},
		easeOutInBack : function(t,b,c,d,s){if(t<d/2)return easings.easeOutBack(t*2,b,c/2,d,s);return easings.easeInBack((t*2)-d,b+c/2,c/2,d,s);},			
		easeInBounce : function(t,b,c,d){return c-easings.easeOutBounce(d-t,0,c,d)+b;},
		easeOutBounce : function(t,b,c,d){if((t/=d)<(1/2.75))return c*(7.5625*t*t)+b;else if(t<(2/2.75))return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;else if(t<(2.5/2.75))return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;else return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;},
		easeInOutBounce : function(t,b,c,d){if(t<d/2)return easings.easeInBounce(t*2,0,c,d)*.5+b;else return easings.easeOutBounce(t*2-d,0,c,d)*.5+c*.5+b;},
		easeOutInBounce : function(t,b,c,d){if(t<d/2)return easings.easeOutBounce(t*2,b,c/2,d);return easings.easeInBounce((t*2)-d,b+c/2,c/2,d);}
	};
	var easing;
	for (easing in easings) {
		$.easing[easing] = (function(easingname) {
			return function(x, t, b, c, d) {
				return easings[easingname](t, b, c, d);
			};
		})(easing);
	}

	//html5 tag & device size class 
	(function () {
		var devsize = [1920, 1600, 1440, 1280, 1024, 940, 840, 720, 600, 480, 400, 360];
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

	
	//components option 
	win[global].option = {
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

	//
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
			device,
			j;

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

		//doc.querySelector('html').classList.add(browser.os, clsBrowser, clsMobileSystem, clsMobile);
		$('html').addClass(browser.os);
		$('html').addClass(clsBrowser);
		$('html').addClass(clsMobileSystem);
		$('html').addClass(clsMobile);

	})();

	win[global] = win[global].uiNameSpace(namespace, {
		uiAjax: function (opt) {
			return createUiAjax(opt);
		},
		uiScroll: function (opt) {
			return createUiScroll(opt);
		},
		uiPara: function (v) {
			return createUiPara(v);
		},
		uiParaParent: function (v) {
			return createUiParaParent(v);
		},
		uiParaArray: function (v) {
			return createUiParaArray(v);
		},
		uiHasScrollBar: function (opt) {
			return createUiHasScrollBar(opt);
		},
		uiHasScrollBarX: function (opt) {
			return createUiHasScrollBarX(opt);
		},
		uiScrollBar: function (opt) {
			return createuiScrollBar(opt);
		},
		uiScrollBarAct: function (opt) {
			return createuiScrollBarAct(opt);
		},
		uiScrollBarReset: function (opt) {
			return createuiScrollBarReset(opt);
		},
		uiScrollBarCancel: function (opt) {
			return createuiScrollBarCancel(opt);
		},
		uiFocusTab: function (opt) {
			return createUiFocusTab(opt);
		},
		
		uiPopup: function (opt) {
			return createUiPopup(opt);
		},
        uiCookieSet: function (opt) {
			return creaeteUiCookieSet(opt);
		},
		uiCookieGet: function (opt) {
			return creaeteUiCookieGet(opt);
		},
		uiCookieDel: function (opt) {
			return creaeteUiCookieDel(opt);
		},
		uiValueCheck: function(opt) {
			return createUivalueCheck(opt);
		},
		uiTblScroll: function (opt) {
			return createUiTblScroll(opt);
		},
		uiTblFixTd: function (opt) {
			return createUiTblFixTd(opt);
		},
		uiCaption: function () {
			return createUiCaption();
		},
		uiError: function (opt) {
			return createUiError(opt);
		},
		uiInputClear: function () {
			return createUiInputClear();
		},
		uiPlaceholder: function () {
			return createUiPlaceholder();
		},
		uiLoading: function (opt) {
			return createUiLoading(opt);
		},
		uiLoadingEnd: function (opt) {
			return createUiLoadingEnd(opt);
		},
		uiSimpleModalOpen: function (opt) {
            return createUiSimpleModalOpen(opt);
        },
        uiSimpleModalClose: function (opt) {
            return createUiSimpleModalClose(opt);
        },
		uiImgMapPoint: function (opt) {
			return createUiImgMapPoint(opt);
		},
		uiImgMapPointGet: function (opt) {
			return createUiImgMapPointGet(opt);
		},
		uiImgMapPointShowhide: function (opt) {
			return createUiImgMapPointShowhide(opt);
		},
		uiAccordion: function (opt) {
			return createUiAccordion(opt);
		},
		uiAccordionToggle: function (opt) {
			return createUiAccordionToggle(opt);
		},
		uiDropdown: function (opt) {
			return createUiDropdown(opt);
		},
		uiDropdownToggle: function (opt) {
			return createUiDropdownToggle(opt);
		},
		uiDropdownHide: function () {
			return createUiDropdownHide();
		},
		uiFloating: function (opt) {
			return createUiFloating(opt);
		},
		uiScrollBox: function (opt) {
			return createUiScrollBox(opt);
		},
		uiTab: function (opt) {
			return createUiTab(opt);
		},
		uiTabAct: function (opt) {
			return createUiTabAct(opt);
		},
		uiTooltip: function (opt) {
			return createUiTooltip(opt);
		},
		uiSelect: function (opt) {
			return createUiSelect(opt);
		},
		uiSelectAct: function (opt) {
			return createUiSelectAct(opt);
		},
		ui360: function(opt){
			return createUi360(opt);
		},
		uiProduct360: function(opt){
			return createUiProduct360(opt);
		},
		uiSlider: function (opt) {
			return createUiSlider(opt);
		}
	});
    
	win[global].onlypub = $('#onlyPub').length ? true : false;
    function createNameSpace(identifier, module) {
		var name = identifier.split('.');

		var	w = win,
			p,
			i = 0;

		if (!!identifier) {
			for (i = 0; i < name.length; i += 1) {
				(!w[name[i]]) ? (i === 0) ? w[name[i]] = {} : w[name[i]] = {} : '';
				w = w[name[i]];
			}
		}

		if (!!module) {
			for (p in module) {
				if (!w[p]) {
					w[p] = module[p];
				} else {
					//throw new Error("module already exists! >> " + p);
				}
			}
		}
		return w;
	}

	win[global].dpi = window.devicePixelRatio >= 3 ? 3 : window.devicePixelRatio >= 2 ? 2 : 1;
	win[global].uiLoading.timer = {};
	function createUiLoading(opt) {
		var loading = '',
			$selector = opt.id === undefined ? $('body') : opt.id === '' ? $('body') : typeof opt.id === 'string' ? $('#' + opt.id) : opt.id;

		opt.id === undefined ?
			loading += '<div class="ui-loading">':
			loading += '<div class="ui-loading" style="position:absolute">';
			loading += '<div class="ui-loading-wrap" id="uiLoadingWrap">';
			loading += '<div class="loading-avon">';
            loading += '<span></span>';
            loading += '<span></span>';
            loading += '<span></span>';
            loading += '<span></span>';
            loading += '<span></span>';
            loading += '<span></span>';
            loading += '<span></span>';
            loading += '<span></span>';
			loading += '<span></span>';
			loading += '</div>';
			loading += '</div>';
			loading += '</div>';
			loading += '</div>';

		clearTimeout(win[global].uiLoading.timer);
		opt.visible === true && !$('body').data('loading') ? showLoading() : opt.visible === false ? hideLoading() : '';
				
		function showLoading(){
			clearTimeout(win[global].uiLoading.timer);
			$('body').data('loading', true);
			$selector.prepend(loading);

			// var animation = bodymovin.loadAnimation({
			// 	container: document.getElementById('uiLoadingWrap'),
			// 	renderer: 'svg',
			// 	loop: true,
			// 	autoplay: true,
			// 	path: '/resources/data/loading.json'
			// })
			$selector.find('.ui-loading').stop().animate({ 'opacity':1 });
		}
		function hideLoading(){
			clearTimeout(win[global].uiLoading.timer);
			win[global].uiLoading.timer = setTimeout(function(){
				$selector.find('.ui-loading').stop().animate({ 'opacity':0 }, function(){
					$('.ui-loading').remove();
					$('body').data('loading', false);
				});
			},100);
		}
	}
	function createUiLoadingEnd(opt) {
		var timer,
			cb =  opt.callback;	
		
		if (!!win[global].onlypub) {
			endcheck();
			
		} else{
			cb();
		}

		function endcheck(){
			if ($('body').data('loading')) {
				clearTimeout(timer);
				timer = setTimeout(function(){
					endcheck();
				},10);
			} else  {
				cb();
			} 
		}
		
	}

	win[global].uiValueCheck.option = {
		first: false
	};
	function createUivalueCheck(opt){
		var opt = $.extend(true, {}, win[global].uiValueCheck.option, opt),
			type = opt.type,
			target = opt.target,
			first = opt.first,
			msg = opt.message,
			callback = opt.callback,
			error,
			err;

		if (first && target.val().length === 0) {
			return false;
		}

		var	regex,
			reg_id = /^[a-z0-9][a-z0-9_\-]{4,19}$/,
			reg_pw = /^[A-Za-z0-9`\-=\\\[\];',\./~!@#\$%\^&\*\(\)_\+|\{\}:"<>\?]{8,16}$/,
			reg_phone = /^((01[1|6|7|8|9])[1-9][0-9]{6,7})$|(010[1-9][0-9]{7})$/,
			reg_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			reg_email_id = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^()[\]\\.,;:\s@\"]+)*)|(\".+\"))$/,
			reg_email_address = /^((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
			reg_kr = /^[가-힣]{2,}$/,
			reg_en = /^[a-zA-Z]{2,}$/,
			reg_tel = /^[0-9\*]+$/,
			reg_number = /^[0-9]+$/;

		target.val().length === 0 ? err = false : '';
		!err && !!target.attr('required') ? err = true : '';
		switch(type){
			case 'test': 
				valueCheck(reg_kr, target, 'error message', err);
				break;

			case 'id': 
				target.val().length > 0 ? msg ='5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.' : '';
				valueCheck(reg_id, target, msg, err);
				break;

			case 'pw': 
				(target.val().length < 8 && target.val().length > 0) || target.val().length > 16 ? msg = '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.' : '';
				valueCheck(reg_pw, target, msg, err);
				break;

			case 'email':  
				valueCheck(reg_email, target, msg, err);
				break;

			case 'email_id':  
				valueCheck(reg_email_id, target, '정확한 이메일 아이디를 입력해주세요.', err);
				break;

			case 'email_address': 
				valueCheck(reg_email_address, target, '정확한 이메일 주소를 입력해주세요.', err);
				break;


			case 'number': 
				valueCheck(reg_number, target, '숫자로만 입력하세요', err);
				break;

			case 'phone': 
				var str = target.val();
				target.val(str.replace(/\-/g,''));
				
				valueCheck(reg_tel, target, msg, err, 'tel');
				//phoneFomatter(target.val(),0);
				break;

			case 'kr': 
				valueCheck(reg_kr, target, '한글로만 2자 이상 입력하세요.', err);
				break;
			case 'en': 
				valueCheck(reg_en, target, '한글로만 2자 이상 입력하세요.', err);
				break;
		}
		
		function phoneFomatter(num, type){
			var formatNum = '';
			
			if (num.length === 11) {
				if (type === 0) {
					formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
				} else {
					formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
				}
			} else if (num.length === 8) {
				formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
			} else {
				if (num.indexOf('02') === 0) {
					if (type === 0) {
						if (num.length === 9) {
							formatNum = num.replace(/(\d{2})(\d{3})(\d{4})/, '$1-****-$3');
						} else {
							formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-****-$3');
						}
					} else {
						if (num.length === 9) {
							formatNum = num.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
						} else {
							formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
						}
					}
				} else {
					if (type === 0) {
						formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3');
						
					} else {
						formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
					}
				}
			}
			return target.val(formatNum);
		}

		function valueCheck(reg, target, msg, err, type){
			if (reg.test(target.val())) {
				error = false;
			} else {
				error = true;
			}

			if (err !== undefined) {
				error = err;
			}

			win[global].uiError({ 
				selector:target, 
				error: error, 
				message: msg 
			});
			
			type === 'tel' ? phoneFomatter(target.val()) : '';

			callback ? callback() : '';
			// target.value = '';
			// target.focus();
		}
		
	}


	win[global].uiAjax.option = {
		page: true,
		add: false,
		prepend: false,
		type: 'GET',
		callback: false,
		errorCallback: false,
		contType: 'application/x-www-form-urlencoded; charset=euc-kr'

	};
	function createUiAjax(opt) {
		if (opt === undefined) {
			return false;
		}

		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiAjax.option, opt),
			$id = $('#' + opt.id),
			callback = opt.callback === undefined ? false : opt.callback,
			errorCallback = opt.errorCallback === undefined ? false : opt.errorCallback;

		$.ajax({
			type: opt.type,
			url: opt.url,
			cache: false,
			async: false,  
			headers: {
				"cache-control": "no-cache",
				"pragma": "no-cache"
			},
			error: function (request, status, err) {
				errorCallback ? errorCallback() : '';
			},
			success: function (v) {
				opt.page ? opt.add ? opt.prepend ? $id.prepend(v) : $id.append(v) : $id.html(v) : '';
				callback ? callback(v) : '';
			}
		});
	}



	win[global].uiScroll.option = {
		value: 0,
		speed: 0,
		callback: false,
		ps: 'top',
		btnwidth: false,
		focus: false,
		target: false
	};
	function createUiScroll(opt){
		if (opt === undefined) {
			return false;
		}

		var opt = $.extend(true, {}, win[global].uiScroll.option, opt),
			v = opt.value,
			s = opt.speed,
			c = opt.callback,
			p = opt.ps,
			bw = opt.btnwidth,
			overlap = false,
			f = typeof opt.focus === 'string' ? $('#' + opt.focus) : opt.focus,
			$target = opt.target === false ? $('html, body') : opt.target;
		
		if (p === 'top') {
			$target.stop().animate({ 
				scrollTop : v 
			}, { 
				duration: s,
				step: function(now) { 

					!!c && now !== 0 ? c({ scrolltop:Math.ceil(now), complete:false }) : '';
				},
				complete: function(){
					if (overlap) {
						!!c ? c({ focus:f, complete:true }) : '';
						!!f ? f.attr('tabindex', 0).focus() : '';
					} else {
						overlap = true;
					}
				}
			});
		} else if (p === 'left') {
			$target.stop().animate({ 
				scrollLeft : v 
			}, { 
				duration: s,
				step: function(now) { 
					!!c && now !== 0 ? c({ scrollleft:Math.ceil(now), complete:false }) : '';
				},
				complete: function(){
					!!c ? c({ focus:f, complete:true }) : '';
					!!f ? f.attr('tabindex', 0).focus() : '';
				}
			});
		} else if (p === 'center') {
			var w = $target.outerWidth();
			$target.stop().animate({ 
				scrollLeft : v - (w / 2) + (bw / 2)
			}, { 
				duration: s,
				step: function(now) { 
					!!c && now !== 0 ? c({ scrollleft:Math.ceil(now), complete:false }) : '';
				},
				complete: function(){
					!!c ? c({ focus:f, complete:true }) : '';
					!!f ? f.attr('tabindex', 0).focus() : '';
				}
			});
		}
	}

	function createUiPara(paraname){
		var _tempUrl = win.location.search.substring(1),
			_tempArray = _tempUrl.split('&'),
			_tempArray_len = _tempArray.length,
			_keyValue;

		for (var i = 0, len = _tempArray_len; i < len; i++) {
			_keyValue = _tempArray[i].split('=');

			if (_keyValue[0] === paraname) {
				return _keyValue[1];
			}
		}
	}

	function createUiParaParent(paraname){
		var _tempUrl = parent.window.location.search.substring(1),
			_tempArray = _tempUrl.split('&'),
			_tempArray_len = _tempArray.length,
			_keyValue;

		for (var i = 0, len = _tempArray_len; i < len; i++) {
			_keyValue = _tempArray[i].split('=');

			if (_keyValue[0] === paraname) {
				return _keyValue[1];
			}
		}
	}

	function createUiParaArray(para){
		var _tempUrl = para,
			_tempArray = _tempUrl.split('&'),
			_tempArray_len = _tempArray.length,
			_keyValue = [];

		for (var i = 0, len = _tempArray_len; i < len; i++) {
			_keyValue.push(_tempArray[i].split('='));
		}
		return _keyValue;
	}

	win[global].uiScrollBar.option = {
		id: false,
		callback:false,
		top: 0
	};
	win[global].uiScrollBar.timer = {};
	win[global].uiScrollBar.overlapExe = 0;
	function createuiScrollBarAct(opt) {
		if (!!$('html.ui-m').length || !!$('html.ios').length || !!$('html.mac').length) {
			return false;
		} 

		var $this = $('#' + opt.id),
			targetId = opt.targetid, 
			$item = $this.find('> .ui-scrollbar-item'),
			$bar = $this.find('> .ui-scrollbar-barwrap .ui-scrollbar-bar');

		$item.css('top',0);
		$bar.css('top',0);

		

		var	item_h = $item.outerHeight(),
			target_top = targetId === undefined ? 0 : $('#' + targetId).offset().top,
			this_top =  $this.offset().top,
			this_h = $this.outerHeight(),
			barwrap_h = $this.find('> .ui-scrollbar-barwrap').outerHeight(true),
			bar_h = $bar.outerHeight(true),
			per ;

		$this.data('tabmove', true);

		if (item_h - (target_top - this_top) < this_h ) {
			$item.css('top', (item_h - this_h) * -1);
			$bar.css('top', Math.floor(barwrap_h - bar_h)  + 'px');
		} else {
			per = (target_top - this_top) / (item_h - this_h) * 100;
			$item.css('top', (target_top - this_top) * -1);
			$bar.css('top', Math.floor((barwrap_h - bar_h) / 100) * per + 'px');
		}
	}

	function createuiScrollBarReset(opt){
		if (!!$('html.ui-m').length || !!$('html.ios').length || !!$('html.mac').length) {
			return false;
		} 

		var opt = $.extend(true, {}, win[global].uiScrollBar.option, opt),
			sid = opt.id,
			$base = !sid ? $('.ui-scrollbar') : $('#' + opt.id);

		
		$base.data('ready',false).removeClass('ready').removeAttr('style');
		$('.ui-scrollbar').off('keydown.bb');
		$('.ui-scrollbar').off('mousewheel.aa DOMMouseScroll.aa');
		$base.find('> .ui-scrollbar-barwrap').remove();
		$base.find('> .ui-scrollbar-item').removeAttr('style');

		sid ? win[global].uiScrollBar(sid) : win[global].uiScrollBar();
	}
	function createuiScrollBarCancel(opt){
		var opt = $.extend(true, {}, win[global].uiScrollBar.option, opt),
			sid = opt.id,
			$base = !sid ? $('.ui-scrollbar') : $('#' + opt.id);

		$base.data('ready',false).removeClass('ready').removeAttr('style');
		$('.ui-scrollbar').off('keydown.bb');
		$('.ui-scrollbar').off('mousewheel.aa DOMMouseScroll.aa');
		$base.find('> .ui-scrollbar-barwrap').remove();
		$base.find('> .ui-scrollbar-item').removeAttr('style');
	}
	
	function createuiScrollBar(opt) {
		if (!!$('html.ui-m').length || !!$('html.ios').length || !!$('html.mac').length) {
			return false;
		} 

		var opt = $.extend(true, {}, win[global].uiScrollBar.option, opt),
			sid = opt.id,
			$base = !sid ? $('.ui-scrollbar') : $('#' + opt.id),
			callback = opt.callback,
			bar_t,
			bar_l;

		
		$base.each(function (i) {
			var $this = $(this),
				p_w = Math.floor($this.parent().width()),
				p_h = Math.floor($this.parent().height());

			// if (Number($(win).outerWidth()) > 960) {
			if ($plugins.breakpoint) {
				$this.addClass('ready').css({
					width: p_w,
					height: p_h
				});
			}

			if (win[global].uiHasScrollBar({ selector: $this }) && !$plugins.browser.mobile) {
				scrollbarReady($this, i);
			}

			if (win[global].uiHasScrollBarX({ selector: $this }) && !$plugins.browser.mobile) {
				scrollbarReady($this, i);
			}

			scrollbarReady($this, i);

			if (opt.top > 0 && $this.children('.ui-scrollbar-item').position().top === 0) {
				var wrap_h = $this.innerHeight(),
					item_h = $this.children('.ui-scrollbar-item').outerHeight(true),
					max_y = item_h - wrap_h;

				wheelAct($this, Math.abs(opt.top * -1), wrap_h, item_h, max_y, true);
			}
		});
		scrollbarEvent();

		function scrollbarReady(wrap_this, i) {
			var $wrap = wrap_this,
				$item = $wrap.children('.ui-scrollbar-item'),
				html_scrollbar = '',
				is_scrollY = true, //win[global].uiHasScrollBar({ selector: wrap_this }) && !$plugins.browser.mobile,
				is_scrollX = win[global].uiHasScrollBarX({ selector: wrap_this }) && !$plugins.browser.mobile;

			if (!$wrap.data('ready') || !$wrap.attr('id')) {
				!$wrap.attr('id') ?
					$wrap.css('overflow', 'hidden').attr('tabindex', 0).attr('id', 'uiScrollBar_' + i).data('ready', true) :
					$wrap.css('overflow', 'hidden').attr('tabindex', 0).data('ready', true);

				if (is_scrollY && $wrap.outerHeight() < $item.outerHeight()) {
					html_scrollbar += '<div class="ui-scrollbar-barwrap type-y" >';
					html_scrollbar += '<button type="button" class="ui-scrollbar-bar" aria-hidden="true" tabindex="-1" data-scrollxy="y"><span class="hide">scroll button</span></button>';
					html_scrollbar += '</div>';
					html_scrollbar += '</div>';
				}
				if (is_scrollX && $wrap.outerWidth() < $item.outerWidth()) {
					html_scrollbar += '<div class="ui-scrollbar-barwrap type-x" >';
					html_scrollbar += '<button type="button" class="ui-scrollbar-bar" aria-hidden="true" tabindex="-1" data-scrollxy="x"><span class="hide">scroll button</span></button>';
					html_scrollbar += '</div>';
					html_scrollbar += '</div>';
				}

				$wrap.prepend(html_scrollbar);
				$wrap.find('> .ui-scrollbar-barwrap.type-y .ui-scrollbar-bar').css('height', Math.floor($wrap.innerHeight() / ($item.outerHeight(true) / 100)) + '%');

				if (is_scrollX) {
					$wrap.find('> .ui-scrollbar-barwrap.type-x .ui-scrollbar-bar').css('width', Math.floor($wrap.innerWidth() / ($item.outerWidth(true) / 100)) + '%');
				}
			}

			// if ($wrap.outerWidth() < 10) {
			// 	win[global].uiScrollBarReset({
			// 		id: sid
			// 	});
			// }
		}

		function scrollbarEvent() {
			$('.ui-scrollbar').off('mouseover.uiscrbar focus.uiscrbar').on({
				'mouseover.uiscrbar': mouseEventAct,
				'focus.uiscrbar': keyEventAct
			});
		}
		function mouseEventAct(e) {
			e.preventDefault();
			e.stopPropagation();

			var $this = $(this),
				wrap_h = $this.innerHeight(),
				item_h = $this.children('.ui-scrollbar-item').outerHeight(true),
				is_y = $this.find('.type-y').length,
				max_y = item_h - wrap_h;

			if (is_y) {
				$this.off('mousewheel.aa DOMMouseScroll.aa').on('mousewheel.aa DOMMouseScroll.aa', function (e) {
					e.preventDefault();
					e.stopPropagation();
					if ($(this).data('tabmove')) {
						$this.scrollTop(0);
						$this.children('.ui-scrollbar-item').css('top', 0);
						$this.find('> .ui-scrollbar-barwrap > .ui-scrollbar-bar').css('top', 0);
						$('.ui-scrollbar-barwrap').show();
						$(this).data('tabmove', false);
					}
					if (e.originalEvent.wheelDelta) {
						wheelAct($this, e.originalEvent.wheelDelta, wrap_h, item_h, max_y);
					} else if (e.detail) {
						wheelAct($this, (e.detail * -1), wrap_h, item_h, max_y);
					}

				});
			}

			$('.ui-scrollbar-bar').off('mousedown.bar touchstart.bar').on('mousedown.bar touchstart.bar', function (e) {
				e.preventDefault();
				$('body').addClass('scrollbar-move');
				dragMoveAct(e, this);
			});

		}
		function dragMoveAct(e, t) {
			var $bar = $(t),
				y_s = 0,
				t_s = $bar.position().top,
				s_h = $bar.closest('.ui-scrollbar-barwrap').innerHeight() - $bar.outerHeight(true),
				x_s = 0,
				l_s = $bar.position().left,
				s_w = $bar.closest('.ui-scrollbar-barwrap').innerWidth() - $bar.outerWidth(true),
				$item = $bar.closest('.ui-scrollbar').children('.ui-scrollbar-item'),
				bar_unit = s_h / 100,
				wrap_unit = ($bar.closest('.ui-scrollbar').innerHeight() - $item.outerHeight(true)) / 100,
				w_sh = $item.outerHeight(true) - $bar.closest('.ui-scrollbar').innerHeight(),
				moving = false;

			if ($bar.data('scrollxy') === 'x') {
				bar_unit = s_w / 100;
				wrap_unit = ($bar.closest('.ui-scrollbar').innerWidth() - $item.outerWidth(true)) / 100,
					w_sh = $item.outerWidth(true) - $bar.closest('.ui-scrollbar').innerWidth()
			}

			bar_t = $bar.position().top;
			bar_l = $bar.position().left;

			if (e.touches === undefined) {
				if (e.pageY !== undefined) {
					y_s = e.pageY;
				}
				if (e.pageX !== undefined) {
					x_s = e.pageX;
				}
				if (e.pageY === undefined) {
					y_s = e.clientY;
				}
				if (e.pageX === undefined) {
					x_s = e.clientX;
				}
			}

			$(doc).off('mousemove.bar touchmove.bar').on('mousemove.bar touchmove.bar', function (e) {
				moving = true;
				if ($bar.data('scrollxy') === 'x') {
					dragAct($bar, $item, e, x_s, l_s, s_w, w_sh, bar_unit, wrap_unit, 'x');
				} else {
					dragAct($bar, $item, e, y_s, t_s, s_h, w_sh, bar_unit, wrap_unit, 'y');
				}

			}).off('mouseup.bar touchcancel.bar touchend.bar').on('mouseup.bar touchcancel.bar touchend.bar', function () {
				$('body').removeClass('scrollbar-move');
				$(doc).off('mousemove.bar mouseup.bar touchmove.bar');
			});
		}
		function keyEventAct(e) {
			$('.ui-scrollbar').off('keydown.bb').on('keydown.bb', function (e) {
				var $this = $(this),
					wrap_h = $this.innerHeight(),
					item_h = $this.children('.ui-scrollbar-item').outerHeight(true),
					max_y = item_h - wrap_h,
					keys = win[global].option.keys;

				switch (e.keyCode) {
					case keys.tab:
						win[global].uiScrollBarAct({
							id: $this.attr('id')
						});
						break;

					case keys.up:
						e.preventDefault();
						e.stopPropagation();
						wheelAct($this, 120, wrap_h, item_h, max_y);
						break;

					case keys.down:
						e.preventDefault();
						e.stopPropagation();
						wheelAct($this, -120, wrap_h, item_h, max_y);
						break;
				}
			});
		}
		function wheelAct(wrap_this, wheelDelta, wrap_h, item_h, max_y, notmotion) {
			var $this = wrap_this,
				delta = -Math.max(-1, Math.min(1, wheelDelta)),
				$this_barwrap = $this.find('> .ui-scrollbar-barwrap.type-y'),
				$this_bar = $this_barwrap.find('> .ui-scrollbar-bar'),
				$this_item = $this.children('.ui-scrollbar-item'),
				item_top = $this_item.position().top,
				bar_space = $this_barwrap.innerHeight() - $this_bar.outerHeight(true),
				sp = notmotion ? 0 : 300,
				v,
				wh,
				ms = 3;

			win[global].uiScrollBar.overlapExe = win[global].uiScrollBar.overlapExe + 1;

			switch (win[global].uiScrollBar.overlapExe) {
				case 1: ms = 3; break;
				case 2: ms = 2; break;
				case 3: ms = 1.5; break;
				case 4: ms = 1; break;
				default: ms = 0.5; break;
			}

			delta > 0 ?
				wh = item_top - (wrap_h / ms) :
				wh = item_top + (wrap_h / ms);

			v = Math.ceil(wh);

			if (v > 0) {
				v = 0;
			} else if (Math.abs(v) > max_y) {
				v = max_y * -1;
				item_top = max_y * -1;
			}

			clearTimeout(win[global].uiScrollBar.timer);
			win[global].uiScrollBar.timer = setTimeout(function () {
				var v_bar = (v / (max_y / 100)) * (bar_space / 100);

				Math.ceil(v_bar) > bar_space ? v_bar = bar_space * -1 : '';

				if (v < 1 && $this_item.outerHeight() > $this.outerHeight()) {
					$this_bar.css('opacity', 1);
					$this_bar.stop().animate({
						'top': v_bar * -1 + 'px'
					}, sp);

					$this_item.stop().animate({
						'top': v + 'px'
					}, sp, 'easeInOutQuad', function () {
						win[global].uiScrollBar.overlapExe = 0;
					});
				} else {
					$this_item.css('top',0);
					$this_bar.css({ 
						top:0, 
						opacity: 0.5
					});
				}
			}, 100);

			!!callback ? callback(v) : '';
		}
		function dragAct(bar_this, item_this, e, y_s, t_s, s_h, w_sh, bar_unit, wrap_unit, ps) {
			var $bar = bar_this,
				$item = item_this,
				per = 0,
				v = 0,
				v_item = 0,
				w = 0,
				w_item = 0;;

			if (e.touches === undefined) {
				if (e.pageY !== undefined) {
					v = (e.pageY) - y_s + t_s;
				}
				if (e.pageY === undefined) {
					v = (e.clientY) - y_s + t_s;
				}
				if (e.pageX !== undefined) {
					w = (e.pageX) - y_s + t_s;
				}
				if (e.pageX === undefined) {
					w = (e.clientX) - y_s + t_s;
				}

				
				if (ps === 'y') {
					v < 0 ? v = 0 : '';
					s_h < v ? v = s_h : '';
					per = Math.ceil(v / s_h * 100);
					v_item = Math.ceil(wrap_unit * per);

					if (v_item < 1 && $item.outerHeight() > $item.closest('.ui-scrollbar').outerHeight()) {
						$bar.css('opacity', 1);
						$bar.css('top', v + 'px');
						$item.css('top', v_item + 'px');
					} else {
						$item.css('top',0);
						$bar.css({ 
							top:0, 
							opacity: 0.5
						});
					}
				} else {
					w < 0 ? w = 0 : '';
					s_h < w ? w = s_h : '';
					$bar.css('left', w + 'px');
					per = Math.ceil(w / s_h * 100);
					w_item = Math.ceil(wrap_unit * per);
					$item.css('left', w_item + 'px');
				}
			}

			!!callback ? callback(v_item) : '';
		}
	}

	function createUiHasScrollBar(opt) {
		var $this = opt.selector;
		return ($this.prop('scrollHeight') == 0 && $this.prop('clientHeight') == 0) || ($this.prop('scrollHeight') > $this.prop('clientHeight'));
	}
	function createUiHasScrollBarX(opt) {
		var $this = opt.selector;
		return ($this.prop('scrollWidth') == 0 && $this.prop('clientWidth') == 0) || ($this.prop('scrollWidth') > $this.prop('clientWidth'));
	}

	win[global].uiFocusTab.option = {
		focusitem : '.ui-select-tit, iframe, a:not([data-disabled]), button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), label, [role="button"]',
		callback: false,
		focusnot: false,
		type: 'hold' //'hold', 'sense'
	};
	function createUiFocusTab(opt){
		if (opt === undefined) {
			return false;
		}
		
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiFocusTab.option, opt),
			$focus = $(opt.selector),
			$item = $focus.find(opt.focusitem),
			callback = opt.callback,
			focusnot = opt.focusnot,
			type = opt.type,
			timer; 

		if (!!$item.length) {
			$item.eq(0).addClass('ui-fctab-s').attr('tabindex', 0).attr('holds', true);
			$item.eq(-1).addClass('ui-fctab-e').attr('tabindex', 0).attr('holde', true);
		} else {
			$focus.prepend('<div class="ui-fctab-s" tabindex="0" holds="true"></div>');
			$focus.append('<div class="ui-fctab-e" tabindex="0" holde="true"></div>');
			$item = $focus.find('.ui-fctab-s, .ui-fctab-e');
		}
		
		clearTimeout(timer);
		timer = setTimeout(function(){
			!focusnot ? $item.eq(0).focus() : '';
		},0);
		timer = '';

		$focus.find('.ui-fctab-s').off('keydown.holds').on('keydown.holds', function (e) {
			if (type === 'hold') {
				if (e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					$focus.find('.ui-fctab-e').focus();
				}
			} else if (type === 'sense') {
				$focus.off('keydown.holds');
				(e.shiftKey && e.keyCode == 9) ? callback('before') : '';
			}
		});
		$focus.find('.ui-fctab-e').off('keydown.holde').on('keydown.holde', function (e) {
			if (type === 'hold') {
				if (!e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					$focus.find('.ui-fctab-s').focus();
				}
			} else if (type === 'sense') {
				$focus.off('keydown.holds');
				(!e.shiftKey && e.keyCode == 9) ? callback('after') : '';
			}
		});
	}


	win[global].uiPopup.option = {
		name: 'new popup',
		width: 790,
		height: 620,
		align: 'center',
		top: 0,
		left: 0,
		toolbar: 'no',
		location: 'no',
		memubar: 'no',
		status: 'no',
		resizable: 'no',
		scrolbars: 'yes'
	};
	function createUiPopup(opt) {
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiPopup.option, opt),
			specs;

		if (opt.align === 'center') {
			opt.left = ($(win).outerWidth() / 2) - (opt.width / 2);
			opt.top = ($(win).outerHeight() / 2) - (opt.height / 2);
		}

		specs = 'width=' + opt.width + ', height='+ opt.height + ', left=' + opt.left + ', top=' + opt.top;
		specs += ', toolbar=' + opt.toolbar + ', location=' + opt.location + ', resizable=' + opt.resizable + ', status=' + opt.status + ', menubar=' + opt.menubar + ', scrollbars=' + opt.scrollbars;
		
		win.open(opt.link, opt.name , specs);
	}

	function creaeteUiCookieSet(opt){
		var cookieset = opt.name + '=' + opt.value + ';',
			expdate;
		if (opt.term) {
			expdate = new Date();
			expdate.setTime( expdate.getTime() + opt.term * 1000 * 60 * 60 * 24 ); // term 1 is a day
			cookieset += 'expires=' + expdate.toGMTString() + ';';
		}
		(opt.path) ? cookieset += 'path=' + opt.path + ';' : '';
		(opt.domain) ? cookieset += 'domain=' + opt.domain + ';' : '';
		document.cookie = cookieset;
	}
	function creaeteUiCookieGet(opt){
		var match = ( document.cookie || ' ' ).match( new RegExp(opt.name + ' *= *([^;]+)') );
		return (match) ? match[1] : null;
	}
	function creaeteUiCookieDel(opt){
		var expireDate = new Date();

		expireDate.setDate(expireDate.getDate() + -1);
		win[global].uiCookieSet({ name:opt.name, term:'-1' });
	}

	win[global].uiTblScroll.option = {
		selector: '.ui-tblscroll',
		customscroll: false,
		rown: 5
	}
	function createUiTblScroll(opt){
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiTblScroll.option, opt),
			$tbl = $(opt.selector),
			rown = opt.rown,
			customscroll = opt.customscroll,
			len = $tbl.length,
			$thead = '',
			$tbody = '',
			h = 0,
			i = 0,
			clone_colgroup,
			clone_thead,
			clone_tbl = '';

		for (i = 0; i < len; i++) {
			$tbl.eq(i).find('.tbl-scroll-thead').remove();
			$tbl.eq(i).find('.tbl-scroll-tbody').removeAttr('style');

			rown = !!$tbl.eq(i).data('row') ? $tbl.eq(i).data('row') : rown,
			$tbody = $tbl.eq(i).find('.tbl-scroll-tbody');
			clone_colgroup = $tbody.find('colgroup').clone();
			clone_thead = $tbody.find('thead tr').clone();
			h = 0;

			clone_tbl += '<div class="tbl-scroll-thead">';
			clone_tbl += '<table class="txt-c" aria-hidden="true" tabindex="-1">';
			clone_tbl += '</table>';
			clone_tbl += '</div>'

			$tbl.eq(i).prepend(clone_tbl);
			clone_tbl = '';
			$tbl.eq(i).find('.tbl-scroll-thead table').append(clone_colgroup);
			$tbl.eq(i).find('.tbl-scroll-thead table').append(clone_thead);
			$thead = $tbl.eq(i).find('.tbl-scroll-thead');
			$thead.find('th').each(function(){
				$(this).replaceWith('<td>'+ $(this).text() +'</td>');
			});

			if ($tbody.find('tbody tr').length > rown) {
				for (var j = 0; j < rown; j++) {
					h = h + $tbody.find('tbody tr').eq(j).outerHeight();
				}
				
				if (customscroll) {
					$tbl.eq(i).removeClass('is-scr');
					$tbody.addClass('ui-scrollbar').find('.tbl-base').addClass('ui-scrollbar-item');
				} else {
					$tbl.eq(i).addClass('is-scr');
					$tbody.removeClass('ui-scrollbar').find('.tbl-base').removeClass('ui-scrollbar-item');
				}
				$tbody.css('max-height', h + 'px');
			}
			customscroll ? win[global].uiScrollBar(): '';
		}
	}
	function createUiTblFixTd(opt) {
		var tbl = $('.ui-fixtd');

		tbl.each(function(i){
			var tbln = tbl.eq(i),
			tbl_col = tbln.find('col'),
			tbl_tr = tbln.find('tr'),
			col_len = tbl_col.length,
			fix_sum = col_len - tbln.attr('fix'),
			len = tbl_tr.length,
			tit = [];

			tbln.attr('current', 1).attr('total', col_len);

			for (var i = 0; i < len; i++) {
				for (var j = 0; j < fix_sum; j++) {
					var tr_this = tbl_tr.eq(i),
						td_this = tr_this.find('> *').eq(j - fix_sum),
						jj = (j + 1);

					td_this.addClass('ui-fixtd-n' + jj).data('n', j);
					if (tr_this.closest('thead').length) {
						tit.push(td_this.text());
						td_this.prepend('<button type="button" class="ui-fixtd-btn" data-btn="prev" data-idx="'+ jj +'">이전</button>');
						td_this.append('<button type="button" class="ui-fixtd-btn" data-btn="next" data-idx="'+ jj +'">다음</button>');
					}
					tbl_col.eq(j - fix_sum).addClass('ui-fixtd-n' + jj);
				}
			}
		});

		tbl.find('.ui-fixtd-btn').off('click.uifixtd').on('click.uifixtd', function(){
			var tbl_this = $(this).closest('.ui-fixtd'),
				this_sum =  Number(tbl_this.attr('total') - tbl_this.attr('fix'));

			var n = Number($(this).data('idx'));

			if ($(this).data('btn') === 'next') {
				tbl_this.attr('current', n + 1 > this_sum ? n = 1 : n + 1);
			} else {
				tbl_this.attr('current', n - 1 <= 0 ? n = this_sum : n - 1);
			}
		});
	}
	function createUiCaption(){
		var $cp = $('.ui-caption');

		$cp.text('');
		$cp.each(function(){
			var $table = $(this).closest('table'),
				isthead = !!$table.find('> thead').length,
				$th = $(this).closest('table').find('> tbody th'),
				th_len = $th.length,
				i = 0,
				cp_txt = '';
			if (isthead) {
				$th = $(this).closest('table').find('> thead th');
				th_len = $th.length
			}

			for (i = 0; i < th_len; i++) {
				if ($th.eq(i).text() !== '') {
					cp_txt += $th.eq(i).text();
				}
				if (i < th_len - 1) {
					cp_txt += ', ';
				}
			}
			$(this).text(cp_txt);
		});
	}

	function createUiError(opt){
		var msg = opt.message, 
			err = opt.error, 
			$this = typeof opt.selector === 'string' ? $('#' + opt.selector) : opt.selector,
			$wrap = opt.wrapper === undefined ? $this.parent() : $this.closest(opt.wrapper),
			id = $this.attr('id'),
			err_html = '<em class="ui-error-msg" aria-hidden="true" id="'+ id +'-error">'+ msg +'</em>';

		//generate error message
		$this.attr('aria-labelledby', id + '-error');

		!$('#'+ id +'-error').length ? $wrap.append(err_html) : $wrap.find('.ui-error-msg').text(msg) ;
		
		//error 여부에 따른 설정
		if (err) {
			$('#'+ id +'-error').attr('aria-hidden', false);
			$wrap.addClass('ui-error-true');
			$this.addClass('ui-error-item');
			$this.closest('.ui-select').addClass('ui-error-select');
		} else {
			$('#'+ id +'-error').attr('aria-hidden', true).remove();
			$wrap.find('.ui-error-item').length === 1 ? $wrap.removeClass('ui-error-true') : '';
			$this.removeClass('ui-error-item');
			$this.closest('.ui-select').removeClass('ui-error-select');
		}
	}

	function createUiInputClear(){
		var $inp = $('.ui-inpcancel');

		$inp.each(function(i){
			var $this = $(this),
				inpId = $this.attr('id') !== undefined ? $this.attr('id') + '_cancel' : false,
				html_cancel = '';

			if ($this.val() === '') {
				$this.next('.ui-btn-cancel').remove()
			} else {
				if ($this.next('.ui-btn-cancel').length === 0) {

					html_cancel += '<button type="button" class="ui-btn-cancel"';
					!!inpId ? html_cancel += ' id="'+ inpId +'"': '';
					html_cancel += '><span>clear input</span></button>';
					$this.after(html_cancel);
					html_cancel = '';
				} 
			}	
		});

		$(doc).off('keyup.inpcancel').on('keyup.inpcancel', '.ui-inpcancel', function(){
			var _$this = $(this),
				_inpId = _$this.attr('id') !== undefined ? _$this.attr('id') + '_cancel' : false,
				_html_cancel = '';;

			if (_$this.val() === '') {
				_$this.next('.ui-btn-cancel').remove();
			} else {
				if (!_$this.next('.ui-btn-cancel').length) {

					_html_cancel += '<button type="button" class="ui-btn-cancel"';
					!!_inpId ? _html_cancel += ' id="'+ _inpId +'"': '';
					_html_cancel += '><span>clear input</span></button>';
					_$this.after(_html_cancel);
					_html_cancel = '';
				} 
			}
		});

		//event
		$(doc).off('click.inpcancel').on('click.inpcancel', '.ui-btn-cancel', function(){
			$(this).prev().val('').focus();
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

	win[global].uiSimpleModalOpen.option = {
        wrap: 'baseWrap',
        full: false,
        ps: 'center',
		remove: false,
        w: false,
		h: false,
		editmode: false,
    }
    function createUiSimpleModalOpen(v) {
        var opt = $.extend(true, {}, win[global].uiSimpleModalOpen.option, v),
            wrap = opt.wrap,
            id = opt.id,
            src = opt.src,
            full = opt.full,
            ps = opt.ps,
			remove = opt.remove,
            w = opt.width,
			h = opt.height,
			editmode = opt.editmode,
			scr_t = $(win).scrollTop(),
            endfocus = opt.endfocus === undefined ? document.activeElement : '#' + opt.endfocus,
            callback = opt.callback === undefined ? false : opt.callback,
			closeCallback = opt.closeCallback === undefined ? false : opt.closeCallback,
			timer;

        if (!!src && !$('#' + opt.id).length) {
            $plugins.uiAjax({
                id: wrap,
                url: src,
                add: true,
                callback: function(){
                    act();
                }
            });
        } else {
            act();
        }

        function act(){
            var $modal = $('#' + id);

            $('.ui-modal-simple').removeClass('current');
			$("html, body").addClass('not-scroll');
			$('#baseMain').css('margin-top', '-' + scr_t + 'px');

			try {
				var p_h = $(parent.window).outerHeight(true);
				!win[global].breakpoint ? $plugins.common.menuShowHide(false) : '';
				parent.$('#uiBrochureIframe').css('height', p_h + 'px');
			} catch(err) { }
			
			$modal.attr('n', $('.ui-modal-simple.open').length).addClass('n' + $('.ui-modal-simple.open').length + ' current').data('scrolltop', scr_t).data('closecallback', closeCallback);
            !!w ? $modal.find('.ui-modal-cont').css('width', w) : '';
			!!h ? $modal.find('.ui-modal-cont').css('height', h) : '';
            !!full ? $modal.addClass('ready type-full') : $modal.addClass('ready type-normal');
            $('html').addClass('is-modal');
			
			editmode ? ps = 'edit' : '';

            switch (ps) {
                case 'center' :
                    $modal.addClass('ps-center');
                    break;
                case 'top' :
                    $modal.addClass('ps-top');
                    break;
                case 'bottom' :
                    $modal.addClass('ps-bottom');
                    break;
				case 'bottom' :
                    $modal.addClass('ps-edit');
                    break;
            }

            clearTimeout(timer);
            timer = setTimeout(function(){

                $modal.addClass('open').data('endfocus', endfocus);
                callback ? callback(opt) : '';

				$('html').off('click.uimodaldim').on('click.uimodaldim', function(e){
					if(!$(e.target).closest('.ui-modal-wrap').length) {
						var openN = [];
						$('.ui-modal-simple.open').each(function(){
							$(this).attr('n') !== undefined ?
								openN.push($(this).attr('n')) : '';
						});

						$plugins.uiSimpleModalClose({ 
							id: $('.ui-modal-simple.open[n="'+ Math.max.apply(null, openN) +'"]').attr('id'), 
							remove: remove,
							callback: closeCallback
						});
					}
				});

				// if (!$modal.find('.ui-modal-close').length) {
				// 	// $modal.append('<button type="button" class="ui-modal-close type-trans"><span class="hidden">modal close</span></button>');
				// 	// $('.ui-modal-close').off('click.uimodal').on('click.uimodal', function(){
				// 	// 	$plugins.uiSimpleModalClose({ 
				// 	// 		id: $(this).closest('.ui-modal-simple').attr('id'), 
				// 	// 		remove: remove,
				// 	// 		callback: closeCallback
				// 	// 	});
				// 	// });
				// }

                // if ($modal.find('.ui-modal-wrap').outerHeight() > $(win).outerHeight(true) - 20) {
				// 	if (!full) {
				// 		$modal.find('.ui-modal-cont').css('height', '100%');
				// 	} else {
				// 		$modal.find('.ui-modal-wrap').css('height', 'calc(100% - 60px)');
				// 	}
                // } 

				$plugins.uiScrollBarReset();

				if( $(win).outerHeight() < $modal.find('.ui-modal-wrap').outerHeight() && $plugins.breakpoint) {
					$modal.addClass('is-over');
				} else {
					$modal.removeClass('is-over');
				}

				if ($('#' + id ).hasClass('type-copybook')) {
					$plugins.uiScrollBarCancel();
				}

			},150);

			$(doc).find('.btn-bar').off('click.updownc').on('click.updownc', function(e){
				var $modal = $('#' + $(this).closest('.ui-modal-simple').attr('id')),
					$wr = $modal.find('.ui-modal-wrap');
  
				if (!$modal.find('.ui-modal-wrap.full').length) {
					$wr.addClass('full');
				} else {
					$wr.removeClass('full');
				}
				win[global].uiScrollBarReset();
			});

			$(doc).find('.ui-modalclose').off('click.close').on('click.close', function(e){
				var $modal = $('#' + $(this).closest('.ui-modal-simple').attr('id'));
				// 	$wr = $modal.find('.ui-modal-wrap');

				$plugins.uiSimpleModalClose({ 
					id: $(this).closest('.ui-modal-simple').attr('id'), 
					remove: remove,
					callback: closeCallback
				});
				
			});

			if ($plugins.browser.mobile) {
				$(doc).find('.ui-modal-head').off('mousedown.updown touchstart.updown').on('mousedown.updown touchstart.updown', function(e){
					//e.preventDefault();
					var $this = $(this),
						y, y_s, moving = false,
						wrap_h2 = $this.closest('.ui-modal-wrap').outerHeight();

					(e.touches !== undefined) ? y_s =  e.touches[0].pageY : '';
					if (e.touches === undefined) {
						(e.pageY !== undefined) ? y_s = e.pageY : '';
						(e.pageY === undefined) ? y_s = e.clientY : '';
					}

					$(doc).find('.ui-modal-head').off('mousemove.updown touchmove.updown').on('mousemove.updown touchmove.updown', function(e){
						moving = true;

						(e.touches !== undefined) ? y =  e.touches[0].pageY : '';
						if (e.touches === undefined) {
							(e.pageY !== undefined) ? y = e.pageY : '';
							(e.pageY === undefined) ? y = e.clientY : '';
						}

						var m_y = y - y_s; 

						$(this).closest('.ui-modal-wrap').css('height', wrap_h2 - m_y + 'px');
					}).off('mouseup.sliderend touchcancel.updown touchend.updown').on('mouseup.sliderend touchcancel.updown touchend.updown', function(e){
						if (moving) {
							if (y_s > y) {
								$modal.find('.ui-modal-wrap').removeAttr('style').addClass('full');
							} else {
								$modal.find('.ui-modal-wrap').removeAttr('style').removeClass('full');
								
								win[global].uiSimpleModalClose({
									id : $this.closest('.ui-modal-simple').attr('id'),
									remove: remove,
									callback: closeCallback
								});
							} 
						}  
						$(doc).find('.ui-modal-head').off('mousemove.updown mouseup.sliderend touchmove.updown');
					});
				});
			}
        }
    }
    win[global].uiSimpleModalClose.option = {
        remove: false
    }
    function createUiSimpleModalClose(v) {
        var opt = $.extend(true, {}, win[global].uiSimpleModalClose.option, v),
            id = opt.id,
            remove = opt.remove,
            $modal = $('#' + id),
            endfocus = opt.endfocus === undefined ? $modal.data('endfocus') : '#' + opt.endfocus,
            callback = opt.callback === undefined ? false : opt.callback;
        
        var timer;

        $modal.removeClass('open');
		if (!$('.ui-modal-simple.open').length) {
			$('html').off('click.uimodaldim');
			$('html').removeClass('is-modal');
		}
        $('.ui-modal-simple.open.n' + ($('.ui-modal-simple.open').length - 1)).addClass('current');
		
		$("html, body").removeClass('not-scroll');
		$('#baseMain').removeAttr('style');


		//!$plugins.common.iframeReSize.sub ? $plugins.common.iframeFull(false) : '';
		
		win[global].uiScroll({
			value: Number($modal.data('scrolltop'))
		});
		
        clearTimeout(timer);
        timer = setTimeout(function(){
            $modal.removeClass('ready ps-bottom ps-top ps-center type-normal type-full n0 n1 n2 n3 n4 n5 n6 n7');
			$modal.removeAttr('n');
            //$('body').css('overflow', 'initial');
			
            callback ? callback(opt) : '';
            remove ? $modal.remove() : '';
            !!endfocus ? endfocus.focus() : '';
			!win[global].breakpoint ? $plugins.common.menuShowHide(true) : '';
			if (id === 'modalVideo') {
				if (!!$('#modalVideo video').attr('id')) {
                    var myPlayer = bc($('#modalVideo video').attr('id'));
                    myPlayer.pause();
                }
			}
			// if (!$plugins.parentHeadHide) {
			// 	$plugins.common.parentScrollTopInfo(false);
			// }
        },150);
    }

	/* set */
	win[global].uiImgMapPoint.info = [];
	win[global].uiImgMapPoint.n = 0;
	function createUiImgMapPoint(opt){
		var $uimap = $('#' + opt.id), 
			$img = $uimap.find('.ui-mapimg-img'),
			callback = opt.callback,
			item = opt.data === undefined ? null : opt.data,
			currentTemplate = ($("#currentTemplate", Granite.author.ContentFrame.getDocument().context).val() == undefined) ? "" : $("#currentTemplate", Granite.author.ContentFrame.getDocument().context).val();

			isCorebook = (currentTemplate.indexOf("whatsnew-page") > 0 || currentTemplate != "whatsnew-page") ? true : false;

		var html_point = '';

		$uimap.addClass('visible edit');
		$uimap.append('<div class="wide-bg"></div>')
		
		function editorSet(){
			var i18n_search_campId = (win[global].onlypub) ? "campaign id" : Granite.I18n.get("Campaign Id") ;
			var i18n_product_search = (win[global].onlypub) ? "product search" : Granite.I18n.get("Product search") ;
			var i18n_search = (win[global].onlypub) ? "Search" : Granite.I18n.get("Search") ;
			var i18n_close = (win[global].onlypub) ? "product search" : Granite.I18n.get("Close") ;
			var i18n_product_Id = (win[global].onlypub) ? "Product Id" : Granite.I18n.get("Product Id") ;
			var i18n_product_display_name = (win[global].onlypub) ? "Product Display Name" : Granite.I18n.get("Product Display Name") ;
			var i18n_link = (win[global].onlypub) ? "Link" : Granite.I18n.get("Link") ;
			var i18n_list_price = (win[global].onlypub) ? "list Price" : Granite.I18n.get("list Price") ;
			var i18n_hit_price = (win[global].onlypub) ? "hit Price" : Granite.I18n.get("hit Price") ;
			var i18n_prp_price = (win[global].onlypub) ? "prp Price" : Granite.I18n.get("prp Price") ;
			var i18n_reg_price = (win[global].onlypub) ? "reg Price" : Granite.I18n.get("reg Price") ;
			var i18n_category_id = (win[global].onlypub) ? "Category Id" : Granite.I18n.get("Category Id") ;
			var i18n_category_name = (win[global].onlypub) ? "Category Name" : Granite.I18n.get("Category Name") ;
			var i18n_profile_no = (win[global].onlypub) ? "Profile No" : Granite.I18n.get("Profile No") ;
			var i18n_product_seo = (win[global].onlypub) ? "Product SEO" : Granite.I18n.get("Product SEO") ;
			var i18n_demo_content = (win[global].onlypub) ? "Demo content" : Granite.I18n.get("Demo content") ;
			var i18n_ar_content = (win[global].onlypub) ? "AR content" : Granite.I18n.get("AR content") ;
			var i18n_position = (win[global].onlypub) ? "Position" : Granite.I18n.get("Position") ;
			var i18n_top = (win[global].onlypub) ? "Top" : Granite.I18n.get("Top") ;
			var i18n_right = (win[global].onlypub) ? "Right" : Granite.I18n.get("Right") ;
			var i18n_bottom = (win[global].onlypub) ? "Bottom" : Granite.I18n.get("Bottom") ;
			var i18n_left = (win[global].onlypub) ? "Left" : Granite.I18n.get("Left") ;
			var i18n_delete = (win[global].onlypub) ? "Delete" : Granite.I18n.get("Delete") ;
			var i18n_confirm = (win[global].onlypub) ? "Confirm" : Granite.I18n.get("Confirm") ;
			var i18n_wideview = (win[global].onlypub) ? "Wide view" : Granite.I18n.get("Wide view") ;
			
			$uimap.append('<div class="ui-mapimg-edit"></div>');
			html_point += '<div class="ui-mapimg-edit-group">';
			html_point += '<div class="ui-mapimg-edit-wrap grid-wrap">';
			html_point += '	<div class="grid-col" grid="12-8-4">';
			html_point += '		<button type="button" class="btn-base ui-mapimg-edit-search" disabled><span>' + i18n_product_search + '</span></button>';
			html_point += '		<div class="ui-mapimg-srch">';
			html_point += '			<div class="ui-mapimg-srch-wrap">';

			if (!isCorebook) {
				html_point += '				<input type="text" value="" class="inp-base inputCampIdSearch" placeholder="' + i18n_search_campId + '" title="' + i18n_search_campId + '">';
			}

			html_point += '				<input type="text" value="" class="inp-base inputSearch" placeholder="search" title="' + i18n_product_search + '">';
			html_point += '				<button type="button" class="btn-base search"><span>' + i18n_search + '</span></button>';
			html_point += '				<button type="button" class="btn-base searchClose"><span>' + i18n_close + '</span></button>';
			html_point += '			</div>';
			html_point += '			<div class="ui-mapimg-srch-result">';
			html_point += '				<button type="button" disabled><span>product name</span></button>';
			html_point += '				<button type="button" disabled><span>product name</span></button>';
			html_point += '			</div>';
			html_point += '		</div>';
			html_point += '	</div>';

			if (!isCorebook) {
				html_point += '	<div class="grid-col" grid="12-8-4">';
				html_point += '		<label for="mapImgEditCampaignId">' + i18n_search_campId + '</label>';
				html_point += '		<input type="text" value="" class="inp-base ui-mapimg-edit-tit" placeholder="' + i18n_search_campId + '" id="mapImgEditCampaignId" title="' + i18n_search_campId + '" disabled>';
				html_point += '	</div>';
			}

			html_point += '	<div class="grid-col" grid="12-8-4">';
			html_point += '		<label for="mapImgEditProductId">' + i18n_product_Id + '</label>';
			html_point += '		<input type="text" value="" class="inp-base ui-mapimg-edit-tit" placeholder="' + i18n_product_Id + '" id="mapImgEditProductId" title="' + i18n_product_Id + '" disabled>';
			html_point += '	</div>';
			
			html_point += '	<div class="grid-col" grid="12-8-4">';
			html_point += '		<label for="mapImgEditDisplayName">' + i18n_product_display_name + '</label>';
			html_point += '		<input type="text" value="" class="inp-base ui-mapimg-edit-tit" placeholder="' + i18n_product_display_name + '" id="mapImgEditDisplayName" title="' + i18n_product_display_name + '" disabled>';
			html_point += '	</div>';
			
			html_point += '	<div class="grid-col" grid="12-8-4">';
			html_point += '		<label for="mapImgEditLink">' + i18n_link + '</label>';
			html_point += '		<input type="text" value="" class="inp-base ui-mapimg-edit-link" placeholder="' + i18n_link + '" id="mapImgEditLink" title="' + i18n_link + '" disabled>';
			html_point += '	</div>';

			html_point += '	<div class="grid-col" grid="12-8-2">';
			html_point += '		<label for="mapImgEditListPrice">' + i18n_list_price + '</label>';
			html_point += '		<input type="tel" value="" class="inp-base ui-mapimg-edit-price" placeholder="' + i18n_list_price + '" id="mapImgEditListPrice" title="' + i18n_list_price + '" disabled>';
			html_point += '	</div>';

			html_point += '	<div class="grid-col" grid="12-8-2">';
			html_point += '		<label for="mapImgEditSlngPrice">' + i18n_hit_price + '</label>';
			html_point += '		<input type="tel" value="" class="inp-base ui-mapimg-edit-discount" placeholder="' + i18n_hit_price + '" id="mapImgEditSlngPrice" title="' + i18n_hit_price + '" disabled>';
			html_point += '	</div>';
			
			if (!isCorebook) {
				html_point += '	<div class="grid-col" grid="12-8-2">';
				html_point += '		<label for="mapImgEditProductSeo">' + i18n_prp_price + '</label>';
				html_point += '		<input type="tel" value="" class="inp-base ui-mapimg-edit-prpPrice" placeholder="' + i18n_prp_price + '" id="mapImgEditPrpPrice" title="' + i18n_prp_price + '" disabled>';
				html_point += '	</div>';
				
				html_point += '	<div class="grid-col" grid="12-8-2">';
				html_point += '		<label for="mapImgEditProductSeo">' + i18n_reg_price + '</label>';
				html_point += '		<input type="tel" value="" class="inp-base ui-mapimg-edit-regPrice" placeholder="' + i18n_reg_price + '" id="mapImgEditRegPrice" title="' + i18n_reg_price + '" disabled>';
				html_point += '	</div>';
			}
			
			html_point += '	<div class="grid-col" grid="12-8-2">';
			html_point += '		<label for="mapImgEditCategoryId">' + i18n_category_id + '</label>';
			html_point += '		<input type="tel" value="" class="inp-base ui-mapimg-edit-categoryId" placeholder="' + i18n_category_id + '" id="mapImgEditCategoryId" title="' + i18n_category_id + '" disabled>';
			html_point += '	</div>';
			
			html_point += '	<div class="grid-col" grid="12-8-2">';
			html_point += '		<label for="mapImgEditCategoryName">' + i18n_category_name + '</label>';
			html_point += '		<input type="text" value="" class="inp-base ui-mapimg-edit-categoryName" placeholder="' + i18n_category_name + '" id="mapImgEditCategoryName" title="' + i18n_category_name + '" disabled>';
			html_point += '	</div>';
			
			html_point += '	<div class="grid-col" grid="12-8-2">';
			html_point += '		<label for="mapImgEditProfileNo">' + i18n_profile_no + '</label>';
			html_point += '		<input type="tel" value="" class="inp-base ui-mapimg-edit-ProfileNo" placeholder="' + i18n_profile_no + '" id="mapImgEditProfileNo" title="' + i18n_profile_no + '" disabled>';
			html_point += '	</div>';
			
			html_point += '	<div class="grid-col" grid="12-8-2">';
			html_point += '		<label for="mapImgEditProductSeo">' + i18n_product_seo + '</label>';
			html_point += '		<input type="text" value="" class="inp-base ui-mapimg-edit-productSeoName" placeholder="' + i18n_product_seo + '" id="mapImgEditProductSeo" title="' + i18n_product_seo + '" disabled>';
			html_point += '	</div>';
			
			html_point += '	<div class="grid-col" grid="12-8-4">';
			html_point += '		<input type="checkbox" class="ui-mapimg-edit-ar" id="mapImgEditAR" disabled>';
			html_point += '		<label for="mapImgEditAR" class="lb-check" >' + i18n_ar_content + '</label>';
			html_point += '	</div>';
			
			if (!isCorebook) {
				html_point += '	<div class="grid-col" grid="12-8-4">';
				html_point += '		<input type="checkbox" id="mapImgEditDEMO" disabled>';
				html_point += '		<label for="mapImgEditDEMO" class="lb-check" >' + i18n_demo_content + '</label>';
				html_point += '	</div>';
			}

			html_point += '	<div class="grid-col" grid="12-8-4">';
			html_point += '		<label for="mapImgEditPs">' + i18n_position + '</label>';
			html_point += '		<select title="box positiion select" id="mapImgEditPs" disabled>';
			html_point += '			<option value="ps-t">' + i18n_top + '</option>';
			html_point += '			<option value="ps-r">' + i18n_right + '</option>';
			html_point += '			<option value="ps-b">' + i18n_bottom + '</option>';
			html_point += '			<option value="ps-l">' + i18n_left + '</option>';
			html_point += '		</select>';
			html_point += '	</div>';

			html_point += '	<input type="hidden" id="mapImgEditProductName"/>';
			html_point += '	<input type="hidden" id="mapImgEditOnlyInd"/>';
			html_point += '</div>';

			html_point += '<div class="btn-wrap">';
			html_point += '<input type="checkbox" id="mapImgWide" disabled>';
			html_point += '<label for="mapImgWide" class="lb-check" >'+ i18n_wideview +'</label>';
			html_point += '<button type="button" class="btn-base ui-mapimg-edit-del" disabled><span>' + i18n_delete + '</span></button>';
			html_point += '<button type="button" class="btn-base ui-mapimg-edit-confirm" disabled><span>' + i18n_confirm + '</span></button>';
			html_point += '</div">';


			html_point += '</div>';

			$uimap.find('.ui-mapimg-edit').append(html_point);
			html_point = '';
		}
		editorSet();

		// opt.img === undefined ? '' : $img.html('<img src="'+ opt.img[1] +'" srcset="'+  opt.img[0] +' 1x, '+ opt.img[1] +' 2x, '+ opt.img[2] +' 3x" alt="'+ opt.alt +'">');
		$uimap.find('.wide-bg').css('background-image',$uimap.find('.ui-dpi-img').css('background-image'));

		//data set
		if (item !== null) {
			var list = item.list,
				len = list.length;

			var i18n_prp = (win[global].onlypub) ? "PRP" : Granite.I18n.get("PRP") ;
			var i18n_reg = (win[global].onlypub) ? "reg." : Granite.I18n.get("reg.") ;
			
			for (var i = 0; i < len; i++) {
				var p_campaignId = list[i].campaignId,
					p_productId = list[i].productId,
					p_productName = list[i].productName,
					p_productDisplayName = list[i].productDisplayName,
					p_onlyInd = list[i].onlyInd,
					p_categoryId = list[i].categoryId,
					p_categoryName = list[i].categoryName,
					p_profileNo = list[i].profileNo,
					p_productSeoName = list[i].productSeoName,
					p_listPrice = list[i].listPrice,
					p_hitPrice = list[i].hitPrice,
					p_prpPrice = list[i].prpPrice,
					p_regPrice = list[i].regPrice,
					p_arYn = list[i].arYn,
					p_demoYn = list[i].demoYn,
					p_link = list[i].link,
					p_cls = list[i].ps,
					p_l = Number(list[i].p_l),
					p_t = Number(list[i].p_t);

				html_point += '<div class="ui-mapimg-point '+ p_cls +'" style="left:'+ p_l +'%; top:'+ p_t +'%;" data-n="'+ win[global].uiImgMapPoint.n +'" data-ps="'+ p_cls +'" data-left="'+ p_l +'" data-top="'+ p_t +'">';
				html_point += '	<div class="ui-mapimg-div">';
				html_point += '		<div class="ui-mapimg-info">';
				html_point += '			<input type="hidden" value="'+ p_link +'">';
				html_point += '			<dl>';
				html_point += '				<dt>'+ p_productDisplayName +'</dt>';
				html_point += '				<dd>';
				html_point += '					<del>' + p_listPrice +'</del>';
				html_point += '					<strong>' + p_hitPrice + '</strong>';
				html_point += '				</dd>';
				
				if(!isCorebook){
					if ( p_prpPrice != "" || p_regPrice != "") {
						html_point += '				<dd>';
						
						if ( p_prpPrice != "") {
							html_point += '					<strong>12' + i18n_prp + ' ' + p_prpPrice + '</strong>';
						}
						if (p_regPrice != "") {
							html_point += '					<strong>12' + i18n_reg + ' ' + p_regPrice + '</strong>';
						}
						html_point += '				</dd>';
					}
				}
				
				html_point += '			</dl>';
                html_point += '	<button type="button" class="ui-maping-modify"><span>modify</span></button>';

				html_point += '		</div>';
				p_arYn 
					? html_point += '<button type="button" class="btn-ar"><span class="hidden">AR view</span></buttton>'
					: '';
				html_point += '	</div>';
				html_point += '</div>';
				
				var item_id = win[global].uiImgMapPoint.n;
				var item_num = 'n' + win[global].uiImgMapPoint.n;

				win[global].uiImgMapPoint.info[item_id] = {
					"num" : 'n'+ win[global].uiImgMapPoint.n,
					"campaignId" : p_campaignId,
					"productId" : p_productId,
					"productName" : p_productName,
					"productDisplayName" : p_productDisplayName,
					"p_onlyInd" : p_onlyInd,
					"categoryId" : p_categoryId,
					"categoryName" : p_categoryName,
					"profileNo" : p_profileNo,
					"productSeoName" : p_productSeoName,
					"listPrice" : p_listPrice,
					"hitPrice" : p_hitPrice,
					"prpPrice" : p_prpPrice,
					"regPrice" : p_regPrice,
					"demoYn" : p_demoYn,
					"arYn" : p_arYn,
					"link" :p_link,
					"ps" : p_cls,
					"p_l" : p_l,
					"p_t" : p_t
				}

				win[global].uiImgMapPoint.n = win[global].uiImgMapPoint.n + 1;
			}
			$uimap.find('.ui-mapimg-wrap').append(html_point);
			html_point = '';

			callback(win[global].uiImgMapPoint.info);
		}

		evt();

		//add point
		function pointInfo(v, e) {
			var $uimap = $(v).closest('.ui-mapimg'),
				wrap = $uimap.find('.ui-mapimg-img'),
				wrap_w = wrap.outerWidth(),
				wrap_h = wrap.outerHeight(),
				per_left = Math.round((e.pageX - wrap.offset().left) / wrap_w * 100),
				per_top = Math.round((e.pageY - wrap.offset().top) / wrap_h * 100),
				cls_1 = 'ps-b';

			html_point = '';
			html_point += '<div class="ui-mapimg-point '+ cls_1 +'" style="left:'+ per_left +'%; top:'+ per_top +'%" data-n="'+ win[global].uiImgMapPoint.n +'" data-left="'+ per_left +'" data-top="'+ per_top +'" data-ps="'+ cls_1 +'">';
			html_point += '	<div class="ui-mapimg-div">';
			html_point += '		<div class="ui-mapimg-info">';
			html_point += '			<input type="hidden" value="">';
			html_point += '			<dl>';
			html_point += '				<dt>Please enter</dt>';
			html_point += '				<dd>';
			html_point += '					<del>$0</del>';
			html_point += '					<strong>$0</strong>';
			html_point += '				</dd>';
			
			if (!isCorebook) {
				html_point += '				<dd>';
				html_point += '					<strong>$0</strong>';
				html_point += '					<strong>$0</strong>';
				html_point += '				</dd>';
			}
			
			html_point += '			</dl>';
			html_point += '	<button type="button" class="ui-maping-modify"><span>modify</span></button>';
			html_point += '		</div>';
			html_point += '	</div>';
			html_point += '</div>';
			
			$uimap.find('.ui-mapimg-wrap').append(html_point);
			html_point = '';
			
			var v_i = win[global].uiImgMapPoint.n;
			var v_n = 'n' + win[global].uiImgMapPoint.n;

			win[global].uiImgMapPoint.info[v_i] = {
				"num" : v_n,
				"campaignId" : '',
				"productId" : '',
				"productName" : '',
				"productDisplayName" : '',
				"onlyInd" : '',
				"categoryId" : '',
				"categoryName" : '',
				"profileNo" : '',
				"productSeoName" : '',
				"listPrice" : '',
				"hitPrice" : '',
				"prpPrice" : '',
				"regPrice" : '',
				"demoYn" : false,
				"arYn" : false,
				"link" : '',
				"ps" : cls_1,
				"p_l" : per_left,
				"p_t" : per_top
			}

			evt();
			$('.ui-mapimg-point').removeClass('actived');
			win[global].uiImgMapPoint.n = win[global].uiImgMapPoint.n + 1;
		}

		function evt(){
			var $mapimg = $('.ui-mapimg'),
				$point = $('.ui-mapimg-point');

			$(doc).find('.ui-mapimg-edit-search').off('click.srch').on('click.srch', function(){
				var $this = $('.ui-mapimg-srch');
				!$this.hasClass('on') ?
					$this.addClass('on'):
					$this.removeClass('on');
			});
			
			var pointstop = false; 

			$(doc).find(".searchClose").off("click.srchClose").on("click.srchClose", function(){
				$(".ui-mapimg-srch").removeClass("on");
			});

			$(doc).find('.ui-maping-modify').off('mousedown.modify touchstart.modify').on('mousedown.modify touchstart.modify', function(e){
				pointstop = true;
				$(this).closest('.ui-mapimg').addClass('view-modify');
			});
			
			$img.off('click.mappoint').on('click.mappoint', function(e){
				var $map = $(this).closest('.ui-mapimg');

				if ($map.hasClass('editing')) {
					$map.removeClass('editing');
					$map.find('.ui-mapimg-point').removeClass('on');
					discountFn(this, true);
				} else {
					$map.find('.ui-mapimg-point').removeClass('on');
					discountFn(this, true);
					pointInfo(this, e);
				}
			});	

			$point.off('click.actived').on('click.actived', function(){
				$point.removeClass('actived');
				$(this).addClass('actived');
			});
			$mapimg.find('.ui-mapimg-edit-del').off('click.mapimg').on('click.mapimg', function(){
				var v = confirm("Are you sure you want to delete?");
				if (v) {
					var v_i = $mapimg.find('.ui-mapimg-point.on').attr('data-n');
					var v_n = 'n' + $mapimg.find('.ui-mapimg-point.on').attr('data-n');
					$mapimg.removeClass('editing').removeClass('view-modify');
					$mapimg.find('.ui-mapimg-point.on').remove();
					discountFn(this, true);					
					delete  win[global].uiImgMapPoint.info[v_i];
				}  
			});
			$mapimg.find('.ui-mapimg-edit-close').off('click.mapimg').on('click.mapimg', function(){
				discountFn(this, true);
			});

			$mapimg.find('.ui-mapimg-view').off('click.mapimg').on('click.mapimg', function(){
				if ($('.ui-mapimg').hasClass('type-list')) {
					$('.ui-mapimg').removeClass('type-list');
				} else {
					$('.ui-mapimg').addClass('type-list');
					
					win[global].uiScrollBar();
				}
			});
			$mapimg.find('.ui-mapimg-hide').off('click.mapimg').on('click.mapimg', function(){
				$mapimg.removeClass('type-list');
			});

			$mapimg.find('.ui-mapimg-edit-confirm').off('click.mapimg').on('click.mapimg', function(){
				var v_campaignId = $mapimg.find('#mapImgEditCampaignId').val(),
					v_productId = $mapimg.find('#mapImgEditProductId').val(),
					v_productName = $mapimg.find('#mapImgEditProductName').val(),
				 	v_productDisplayName = $mapimg.find('#mapImgEditDisplayName').val(),
				 	v_onlyInd = $mapimg.find('#mapImgEditOnlyInd').val(),
				 	v_categoryId = $mapimg.find('#mapImgEditCategoryId').val(),
				 	v_categoryName = $mapimg.find('#mapImgEditCategoryName').val(),
				 	v_profileNo = $mapimg.find('#mapImgEditProfileNo').val(),
				 	v_productSeoName = $mapimg.find('#mapImgEditProductSeo').val(),
				 	v_listPrice = $mapimg.find('#mapImgEditListPrice').val(),
				 	v_hitPrice = $mapimg.find('#mapImgEditSlngPrice').val(),
				 	v_prpPrice = $mapimg.find('#mapImgEditPrpPrice').val(),
				 	v_regPrice = $mapimg.find('#mapImgEditRegPrice').val(),
				 	v_demoYn = $mapimg.find('#mapImgEditDEMO').prop('checked'),
				 	v_arYn = $mapimg.find('#mapImgEditAR').prop('checked'),
					v_link = $mapimg.find('#mapImgEditLink').val(),
					v_ps = $mapimg.find('#mapImgEditPs').val(),
					v_l = $mapimg.find('.ui-mapimg-point.on').data('left'),
					v_t = $mapimg.find('.ui-mapimg-point.on').data('top'),
					v_i = $mapimg.find('.ui-mapimg-point.on').attr('data-n'),
					v_n = 'n' + $mapimg.find('.ui-mapimg-point.on').attr('data-n');

				$mapimg.find('.ui-mapimg-point.on .ui-mapimg-info dt').html(v_productDisplayName);
				$mapimg.find('.ui-mapimg-point.on .ui-mapimg-info dd del').html("$" + v_listPrice);
				$mapimg.find('.ui-mapimg-point.on .ui-mapimg-info dd strong').html("$" + v_hitPrice);
				$mapimg.find('.ui-mapimg-point.on .ui-mapimg-info input').val(v_link);
				$mapimg.find('.ui-mapimg-point.on').removeClass('ps-t ps-l ps-r ps-c ps-b').addClass(v_ps);
				$mapimg.find('.ui-mapimg-point.on').attr("data-ps", v_ps);

				if (v_arYn) {
					!$mapimg.find('.ui-mapimg-point.on .ui-mapimg-div .btn-ar').length
					? $mapimg.find('.ui-mapimg-point.on .ui-mapimg-div').append('<button type="button" class="btn-ar"><span class="hidden">AR view</span></buttton>')
					: '';
				} else {
					$mapimg.find('.ui-mapimg-point.on .ui-mapimg-div .btn-ar').remove();
				}

				if (win[global].uiImgMapPoint.info[v_i] === undefined) {
					win[global].uiImgMapPoint.info[v_i] = {
						"num" : v_n,
						"campaignId" : v_campaignId,
						"productId" : v_productId,
						"productName" : v_productName,
						"productDisplayName" : v_productDisplayName,
						"onlyInd" : v_onlyInd,
						"categoryId" : v_categoryId,
						"categoryName" : v_categoryName,
						"profileNo" : v_profileNo,
						"productSeoName" : v_productSeoName,
						"listPrice" : v_listPrice,
						"hitPrice" : v_hitPrice,
						"prpPrice" : v_prpPrice,
						"regPrice" : v_regPrice,
						"demoYn" : v_demoYn,
						"arYn" : v_arYn,
						"link" :v_link,
						"ps" : v_ps,
						"p_l" : v_l,
						"p_t" : v_t
					}
				} else { 
					win[global].uiImgMapPoint.info[v_i].campaignId = v_campaignId;
					win[global].uiImgMapPoint.info[v_i].productId = v_productId;
					win[global].uiImgMapPoint.info[v_i].productName = v_productName;
					win[global].uiImgMapPoint.info[v_i].productDisplayName = v_productDisplayName;
					win[global].uiImgMapPoint.info[v_i].onlyInd = v_onlyInd;
					win[global].uiImgMapPoint.info[v_i].categoryId = v_categoryId;
					win[global].uiImgMapPoint.info[v_i].categoryName = v_categoryName;
					win[global].uiImgMapPoint.info[v_i].profileNo = v_profileNo;
					win[global].uiImgMapPoint.info[v_i].productSeoName = v_productSeoName;
					win[global].uiImgMapPoint.info[v_i].listPrice = v_listPrice;
					win[global].uiImgMapPoint.info[v_i].hitPrice = v_hitPrice;
					win[global].uiImgMapPoint.info[v_i].prpPrice = v_prpPrice;
					win[global].uiImgMapPoint.info[v_i].regPrice = v_regPrice;
					win[global].uiImgMapPoint.info[v_i].demoYn = v_demoYn;
					win[global].uiImgMapPoint.info[v_i].arYn = v_arYn;
					win[global].uiImgMapPoint.info[v_i].link = v_link;
					win[global].uiImgMapPoint.info[v_i].ps = v_ps;
					win[global].uiImgMapPoint.info[v_i].p_l = v_l;
					win[global].uiImgMapPoint.info[v_i].p_t = v_t;
				}

				discountFn(this, true);
				$mapimg.removeClass('editing').removeClass('view-modify');
				callback(win[global].uiImgMapPoint.info);
			});

			$('.ui-mapimg-point').off('mousedown.sliderstart touchstart.sliderstart').on('mousedown.sliderstart touchstart.sliderstart', function(e){
				e.preventDefault();
				
				var $this = $(this),
					$mapimg = $this.closest('.ui-mapimg'),
					$wrap = $this.closest('.ui-mapimg-wrap'),
					mapPointInfo = win[global].uiImgMapPoint.info[$this.data("n")],
					tit = $this.find('dt').text(),
					listPrice = $this.find('dd del').text().replace("$", ""),
					hitPrice = $this.find('dd strong').text().replace("$", ""),
					demoYn = !!$this.find('.btn-demo').length,
					arYn = !!$this.find('.btn-ar').length,
					link = $this.find('input').val(),
					ps = $this.attr('data-ps'),
					wrap_w = $wrap.outerWidth(),
					wrap_h = $wrap.outerHeight(),
					off_tw = $wrap.offset().top,
					off_lw = $wrap.offset().left,
					off_t = $this.offset().top,
					off_l = $this.offset().left,
					moving = false,
					item_h = $this.outerHeight(),
					y, x;
				
				$mapimg.addClass('edit').addClass('editing');
				$point.removeClass('on');
				$this.addClass('on active');
				
				$mapimg.find('#mapImgEditCampaignId').val(mapPointInfo.campaignId).prop('disabled', false);
				$mapimg.find('#mapImgEditProductId').val(mapPointInfo.productId).prop('disabled', false);
				$mapimg.find('#mapImgEditDisplayName').val(mapPointInfo.productDisplayName).prop('disabled', false);
				$mapimg.find('#mapImgEditOnlyInd').val(mapPointInfo.onlyInd).prop('disabled', false);
				$mapimg.find('#mapImgEditListPrice').val(mapPointInfo.listPrice).prop('disabled', false);
				$mapimg.find('#mapImgEditSlngPrice').val(mapPointInfo.hitPrice).prop('disabled', false);
				$mapimg.find('#mapImgEditPrpPrice').val(mapPointInfo.prpPrice).prop('disabled', false);
				$mapimg.find('#mapImgEditRegPrice').val(mapPointInfo.regPrice).prop('disabled', false);
				$mapimg.find('#mapImgEditCategoryId').val(mapPointInfo.categoryId).prop('disabled', false);
				$mapimg.find('#mapImgEditCategoryName').val(mapPointInfo.categoryName).prop('disabled', false);
				$mapimg.find('#mapImgEditProfileNo').val(mapPointInfo.profileNo).prop('disabled', false);
				$mapimg.find('#mapImgEditProductSeo').val(mapPointInfo.productSeoName).prop('disabled', false);
				$mapimg.find('#mapImgEditLink').val(mapPointInfo.link).prop('disabled', false);
				$mapimg.find('#mapImgEditDEMO').prop('disabled', false).prop('checked', false);
				$mapimg.find('#mapImgEditAR').prop('disabled', false).prop('checked', mapPointInfo.arYn);
				$mapimg.find('#mapImgEditPs').val(mapPointInfo.ps).prop('selected', true).prop('disabled', false);
				$mapimg.find('.btn-base').prop('disabled', false);

				$this.css({
					top: off_t - off_tw + 'px', 
					left: off_l - off_lw + 10 + 'px'
				});

				$(doc).off('mousemove.slidermove touchmove.slidermove').on('mousemove.slidermove touchmove.slidermove', function(e){
					if (pointstop) {
						pointstop = false;
						return false;
					}
					moving = true;

					if (e.touches !== undefined) {
						y =  e.touches[0].pageY;
						x =  e.touches[0].pageX;
					}
					if (e.touches === undefined) {
						if (e.pageY !== undefined) {
							y = e.pageY;
							x = e.pageX;
						}
						//ie
						if (e.pageY === undefined) {
							y = e.clientY;
							x = e.clientX;
						}
					}

					$this.css({
						top: y - off_tw + 'px', 
						left: x - off_lw + 'px'
					});
					
				}).off('mouseup.sliderend touchcancel.slidermove touchend.slidermove').on('mouseup.sliderend touchcancel.slidermove touchend.slidermove', function(e){
					if (moving) {
						var per_left = Math.round((x  - $wrap.offset().left) / wrap_w * 100),
							per_top = Math.round((y - $wrap.offset().top) / wrap_h * 100);

						$this.css({
							top: per_top + '%', 
							left: per_left + '%'
						}).data('left', per_left).data('top', per_top);

					}  
					$this.removeClass('active');
					$(doc).off('mousemove.slidermove mouseup.sliderend touchmove.slidermove');
				});
			});

			function discountFn(v, disabled){
				var $wrap = $(v).closest('.ui-mapimg');
				
				$('.ui-mapimg-point').removeClass('on actived');
				$wrap.find('#mapImgEditCampaignId').prop('disabled', disabled);
				$wrap.find('#mapImgEditProductId').prop('disabled', disabled);
				$wrap.find('#mapImgEditDisplayName').prop('disabled', disabled);
				$wrap.find('#mapImgEditListPrice').prop('disabled', disabled);
				$wrap.find('#mapImgEditSlngPrice').prop('disabled', disabled);
				$wrap.find('#mapImgEditPrpPrice').prop('disabled', disabled);
				$wrap.find('#mapImgEditRegPrice').prop('disabled', disabled);
				$wrap.find('#mapImgEditCategoryId').prop('disabled', disabled);
				$wrap.find('#mapImgEditCategoryName').prop('disabled', disabled);
				$wrap.find('#mapImgEditProfileNo').prop('disabled', disabled);
				$wrap.find('#mapImgEditProductSeo').prop('disabled', disabled);
				$wrap.find('#mapImgEditLink').prop('disabled', disabled);
				$wrap.find('#mapImgEditPs').prop('disabled', disabled);
				$wrap.find('#mapImgEditDEMO').prop('disabled', disabled);
				$wrap.find('#mapImgEditAR').prop('disabled', disabled);
				$wrap.find('.btn-base').prop('disabled', disabled);
			}
		}
	}

    /* get */
	function createUiImgMapPointGet(opt){
		var wrap = $('#' + opt.id),
			item = opt.data,
			list = item.list,
			len = list.length,
			html_point = '',
			isWhatsNew = false,
			currentTemplate = ($("#currentTemplate").val() == undefined) ? "" : $("#currentTemplate").val();

		isWhatsNew = (currentTemplate.indexOf("whatsnew-page") > 0) ? true : false;

		opt.img === undefined 
			? '' 
			: wrap.find('.ui-mapimg-img').html('<img src="'+ opt.img[1] +'" srcset="'+  opt.img[0] +' 1x, '+ opt.img[1] +' 2x, '+ opt.img[2] +' 3x" alt="'+ opt.alt +'">');

		for (var i = 0; i < len; i++) {
			var per_left = Number(list[i].p_l),
				per_top = Number(list[i].p_t),
				p_productId = list[i].productId,
				p_productDisplayName = list[i].productDisplayName,
				p_productSeoName = list[i].productSeoName,
				p_listPrice = (list[i].listPrice == undefined) ? "" : convterCurrency(list[i].listPrice),
				p_hitPrice = (list[i].hitPrice == undefined) ? "" : convterCurrency(list[i].hitPrice),
				p_prpPrice = (list[i].prpPrice == undefined) ? "" : convterCurrency(list[i].prpPrice),
				p_regPrice = (list[i].regPrice == undefined) ? "" : convterCurrency(list[i].regPrice),
				p_profileNo = list[i].profileNo,
				p_demoYn = list[i].demoYn,
				p_arYn = list[i].arYn,
				p_link = list[i].link,
				cls = list[i].ps;

			html_point += '<div aria-hidden="true" class="ui-mapimg-point '+ cls +'" style="left:'+ per_left +'%; top:'+ per_top +'%;">';
			html_point += '	<div class="ui-mapimg-div">';
			html_point += '		<div class="ui-mapimg-info">';
			html_point += '			<button class="dev-product-quickshop" type="button" data-link="'+ p_link +'" data-product-id="' + p_productId + '" data-product-seo-name="' + p_productSeoName + '">';
			html_point += '				<dl>';
			
			if (p_productDisplayName != undefined && p_productDisplayName != "") {
				html_point += '					<dt>'+ p_productDisplayName +'</dt>';
			}
			
			html_point += '					<dd>';
			
			if (win[global].onlypub) {
				html_point += '					<div>';
				html_point += '						<strong>'+ p_hitPrice +'</strong>';
				html_point += '						<del>'+ p_listPrice +'</del>';
				html_point += '					</div>';
			} else {
				html_point += '					<div>';
				
				if (isWhatsNew && p_demoYn) {
					html_point += '					<span>'+ Granite.I18n.get("DEMO")+'</span>';
				}

				if (p_hitPrice != "" && (p_listPrice != p_hitPrice)) {
					html_point += '						<strong>'+ Granite.I18n.get("currency", p_hitPrice)+'</strong>';
				}
				
				if (p_hitPrice == "" && p_listPrice != "") {
					html_point += '					<strong>'+ Granite.I18n.get("currency", p_listPrice) +'</strong>';
				} else if (p_listPrice != "") {
					html_point += '					<del>'+ Granite.I18n.get("currency", p_listPrice) +'</del>';
				}
				
				if (isWhatsNew) {
					if (p_prpPrice != "") {
						html_point += '				<span>' + Granite.I18n.get("PRP") +'</span>';
						html_point += '				<strong>' + Granite.I18n.get("currency", p_prpPrice) +'</strong>';
					} 
					
					if (p_regPrice != "") {
						html_point += '				<span>' + Granite.I18n.get("reg.") + '</span>';
						html_point += '				<strong>' + Granite.I18n.get("currency", p_regPrice)+'</strong>';
					}
				}
			}
			
			html_point += '					</dd>';
			html_point += '				</dl>';
			html_point += '			</button>';
			html_point += '		</div>';

			if (win[global].onlypub) {
				p_arYn 
				? html_point += '<button type="button" class="btn-ar"><span class="hidden">Try on</span></buttton>'
				: '';
			} else {
				p_arYn 
				? html_point += '<button type="button" class="btn-ar avon-ar" data-type="virtual-try-on" data-prd-id="' + p_productId + '"><span class="hidden">' + Granite.I18n.get("Try on") + '</span></buttton>'
						: '';
			}
			html_point += '	</div>';
			html_point += '</div>';
		}

		wrap.find('.ui-mapimg-wrap').append(html_point);
		wrap.closest('.swiper-slide').css('overflow','visible');
		html_point = '';

		wrap.find('.ui-mapimg-hide').off('click.mapimg').on('click.mapimg', function(){
			wrap.removeClass('type-list');
			wrap.find('.ui-mapimg-list.full').removeClass('full');
		});

		wrap.find('.btn-bar').off('click.list touchstart.list').on('click.list touchstart.list', function(){
			if (!wrap.find('.ui-mapimg-list.full').length) {
				wrap.find('.ui-mapimg-list').addClass('full');
				win[global].uiScrollBar();
			} else {
				wrap.removeClass('type-list');
				wrap.find('.ui-mapimg-list').removeClass('full');
			}

		});

		wrap.find('.ui-mapimg-img, .ui-mapimg-point').off('click.mapimg');

		$('html').off('click.imgpick').on('click.imgpick', function(e){
			if(!!$(e.target).closest('.ui-mapimg-wrap').length) {
				var $this = $(e.target).closest('.ui-mapimg-wrap').find('.ui-mapimg-img'),
					$map = $this.closest('.ui-mapimg');

				$plugins.uiImgMapPointShowhide({
					id : $map.attr('id'),
					visible: !$map.data('visible')
				});
			}
		});
		
		if (!win[global].onlypub) {
			win.wishNQuickShop.init();
		}
	}
	function convterCurrency(price){
		var temp = "";
		temp = Number(price).toFixed(2);
		return temp.replace(".00", "");
	}
	function createUiImgMapPointShowhide(opt){
		var $map = opt.id === undefined ? $('.ui-mapimg') : $('#' + opt.id),
			$point = $map.find('.ui-mapimg-point'),
			auto = opt.auto === undefined ? false : opt.auto,
			timer;

		if (opt.visible) {
			$map.removeClass('visible ing');
			$map.data('visible', true);
			$point.off('transitionend.mapimg');
			$map.addClass('on').stop().animate({
				opacity:1
			}, 200, function(){
				$point.attr('aria-hidden', false);
				$map.addClass('visible');
			});			
		} else {
			$map.data('visible', false);
			$map.removeClass('on').addClass('ing');
			$point.attr('aria-hidden', true).on('transitionend.mapimg', function(){
				$map.removeClass('visible ing');
			});
		}

		if (auto) {
			clearTimeout(timer);
			timer = setTimeout(function(){
				$plugins.uiImgMapPointShowhide({
					id : opt.id,
					visible: false
				});
			}, 2000);
		}
	}

	win[global].uiAccordion.option = {
	 	current: null,
		autoclose: false,
		callback: false,
		level: 3
	};
	function createUiAccordion(opt){
		if (opt === undefined || !$('#' + opt.id).length) {
			return false;
		}

		var opt = $.extend(true, {}, win[global].uiAccordion.option, opt),
			id = opt.id,
			current = opt.current,
			callback = opt.callback,
			autoclose = opt.autoclose,
			level = opt.lavel,
			$acco = $('#' + id),
			$wrap = $acco.children('.ui-acco-wrap'),
			$pnl = $wrap.children('.ui-acco-pnl'),
			$tit = $wrap.children('.ui-acco-tit'),
			$btn = $tit.find('.ui-acco-btn'),
			len = $wrap.length, 
			keys = win[global].option.keys,
			i = 0, 
			optAcco,
			para = win[global].uiPara('acco'),
			paras,
			paraname;
		
		//set up
		if (!!para) {
			if (para.split('+').length > 1) {
				//2개이상 설정
				//acco=exeAcco1*2+exeAcco2*3
				paras = para.split('+');

				for (var i = 0; i < paras.length; i++ ) {
					paraname = paras[i].split('*');
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
		$acco
			.attr('role','presentation')
			.data('opt', { 
				id:id, 
				close: autoclose, 
				callback: callback
			});
		$tit.attr('role','heading')
			.attr('aria-level', level);
		$pnl.attr('role','region');

		for (i = 0; i < len; i++) {
			var $accobtn = $wrap.eq(i).find('> .ui-acco-tit > .ui-acco-btn'),
				$accotit = $wrap.eq(i).find('> .ui-acco-tit'),
				$accopln = $wrap.eq(i).find('> .ui-acco-pnl');
			
			!$accopln ? $accopln = $accotit.children('.ui-acco-pnl') : '';
			$accotit.attr('id') === undefined ? $accobtn.attr('id', id + '-btn' + i) : '';
			$accopln.attr('id') === undefined ? $accopln.attr('id', id + '-pnl' + i) : '';
			
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

			i === 0 ? $accobtn.attr('acco-first', true) : '';
			i === len - 1 ? $accobtn.attr('acco-last', true) : ''
		}
		
		current !== null ? 
			win[global].uiAccordionToggle({ 
				id: id, 
				current: current, 
				motion: false 
			}) : '';

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
				win[global].uiAccordionToggle({ 
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
		//모션
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
						$(this).css({ height: '', padding: '', margin: '' }); // 초기화
					});
				});
			} else {
				$btn.data('selected', a).attr('aria-expanded', a)[cls]('selected')
					.find('.ui-acco-arrow').text(txt);
				$pnl.attr('aria-hidden', !a).stop()[updown](speed, function(){
					$(this).css({ height: '', padding: '', margin: '' }); // 초기화
				});
			}
		}
	}


	win[global].uiDropdown.option = {
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
		if (opt === undefined) {
			return false;
		}

		var opt = $.extend(true, {}, win[global].uiDropdown.option, opt),
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
			win[global].uiDropdownToggle({ id: pnl_opt.id });
			$('#' + pnl_opt.id).focus();
		})
		.off('click.bd').on('click.bd', function(e){
			//dropdown 영역 외에 클릭 시 판단
			if (!!$('body').data('dropdownOpened')){
				if ($(doc).find('.ui-drop-pnl').has(e.target).length < 1) {
					win[global].uiDropdownHide();
				}
			}
		});

		!back_close ? $(doc).off('click.bd') : '';

		function action(t) {
			var $this = $(t),
				btn_opt = $this.data('opt');

			$this.data('sct', $(doc).scrollTop());
			win[global].uiDropdownToggle({ id: btn_opt.id });
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
					win[global].uiDropdownHide();
				}
			}

			$btn.attr('aria-expanded', true);
			$pnl.attr('aria-hidden', false).attr('tabindex', 0).addClass('on');

			//focus hold or sense
			hold ?	
				win[global].uiFocusTab({ selector:'.ui-drop-pnl[data-id="'+ id +'"]', type:'hold' }):
				win[global].uiFocusTab({ selector:'.ui-drop-pnl[data-id="'+ id +'"]', type:'sense', callback:pnlHide });

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

	win[global].uiFloating.option = {
		ps: 'bottom',
		add: false,
		fix: true,
		callback: false
	};
	function createUiFloating(opt) {
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiFloating.option, opt),
			id = opt.id,
			ps = opt.ps,
			add = opt.add,
			fix = opt.fix,
			callback = opt.callback,
			$id = $('#' + id),
			$idwrap = $id.find('.ui-floating-wrap'),
			$add = $('#' + add),
			$addwrap = $add.find('.ui-floating-wrap').length ? $add.find('.ui-floating-wrap') : $add,
			c = 'ui-fixed-' + ps,
			timer;
		
		!!fix ? $id.addClass(c) : '';
		
		if ($id.length) {
			clearTimeout(timer);
			timer = setTimeout(act, 300);
		}
		
		$(win).off('scroll.'+ id ).on('scroll.'+ id, function(){
			if ($id.length) {
				act();
				clearTimeout(timer);
				timer = setTimeout(act, 500);
			}
		});
		
		function act(){
			var tt = Math.ceil($id.offset().top),
				th = Math.ceil($idwrap.outerHeight()),
				st = $(win).scrollTop(),
				wh = Math.ceil( win[global].browser.mobile ? window.screen.height : $(win).outerHeight() ),
				dh = Math.ceil($(doc).outerHeight()),
				lh = (!!add) ? $add.outerHeight() : 0 ,
				lt = (!!add) ? dh - ($add.offset().top).toFixed(0) : 0,
				lb = 0, 
				_lb;
			
			$idwrap.removeAttr('style');
			$id.data('fixbottom', th);

			if (!!add) {
				if ($add.data('fixbottom') === undefined) {
					$add.data('fixbottom', th + $addwrap.outerHeight());
				}
			}

			!!add ? lh = lh + Number($add.data('fixtop') === undefined ? 0 : $add.data('fixtop')) : '';
			!!callback ? callback({ id:id, scrolltop:st, boundaryline: tt - lh }) : '';
			$id.css('height', th);

			// 상단으로 고정
			if (ps === 'top') {
				// 고정 > 흐름
				if (fix === true) {
					if (tt - lh <= st) { 
						$id.removeClass(c).data('fixtop', false);
						$idwrap.removeAttr('style');
					} else { 
						$id.addClass(c).data('fixtop', lh);
						$idwrap.css('top', lh);
					}
				} 
				// 흐름 > 고정	
				else {
					if (tt - lh <= st) { 
						$id.addClass(c).data('fixtop', lh);
						$idwrap.css('top', lh);
					} else { 
						$id.removeClass(c).data('fixtop', false);
						$idwrap.removeAttr('style');
					}
				}
			} 
			// 하단으로 고정
			else if (ps === 'bottom') {
				if (!!add) { 
					lb = th + Number($add.data('fixbottom'));
					$id.data('fixbottom', lb);
				}
				_lb = (lb - th < 0) ? 0 : lb - th;
				// 고정 > 흐름
				if (fix === true) {
					if (tt + th + _lb - wh <= st) { 
						$id.removeClass(c);
						$idwrap.removeAttr('style');
					} else {
						$id.addClass(c)
						$idwrap.css('bottom', _lb);
					}
						
				// 흐름 > 고정		
				} else {
					if (tt + th + _lb - wh <= st) {
						$id.addClass(c);
						$idwrap.css('bottom', _lb);
					} else {
						$id.removeClass(c);
						$idwrap.removeAttr('style');
					}
				}
			}
		}
	}

	win[global].uiScrollBox.idx = 0;
	win[global].uiScrollBox.active = false;
	function createUiScrollBox(opt) {
		if (!$('.ui-scrollbox').length){
			return false;
		}

        var callback = opt === undefined ? false : opt.callback === undefined ? false : opt.callback,
            len = $('.ui-scrollbox-item').length,
            g = 0;

		$('.ui-scrollbox-item').eq(0).addClass('visibled');
		$('.ui-scrollbox-item').eq(g).addClass('visible');
		callback ? callback({ current:g }) : '';
		win[global].uiScrollBox.idx = g;

		$('#baseWrap').off('scroll.scrollbox').on('scroll.scrollbox', function(){
			var v = $(this).scrollTop();

			$('.ui-scrollbox-item').each(function(i){
				var $this = $(this),
					vod_t = Math.floor($this.position().top),
					vod_h = vod_t + Math.floor($this.outerHeight() / 2),
					vod_h2 = vod_t - Math.floor($this.outerHeight() / 2);

				if ((v <= vod_t || v < vod_h) && !!$this.find('.swiper-slide-active video').length) {
					$this.addClass('visible').siblings().removeClass('visible');
					
					if (v > vod_h || v < vod_h2) {
						$plugins.common.vodPlayPause({
							item: 'all',
							status: 'pause'
						});
					} else if (v < vod_h && v > vod_h2) {
						var $cardnews = $this.find('.swiper-slide-active .collection-cardnews-cover'),
                        	$cardnews_vod = $cardnews.find('> .view').find('.ui-brightcove');

						if ($cardnews.length){
							if ($cardnews_vod.length) {
								$plugins.common.vodPlayPause({
									item: $cardnews.find('> .view video'),
									status: 'play'
								});
							}
						} else {
							$plugins.common.vodPlayPause({
								item: $this.find('.swiper-slide-active video'),
								status: 'play'
							});
						}
						
					}
					win[global].uiScrollBox.idx = $this.index();

					return false;
				} else {
					$plugins.common.vodPlayPause({
						item: 'all',
						status: 'pause'
					});
				}
			});
		});

		// setup();
        // function setup(){
		// 	if ($('.ui-scrollbox-item').eq(g).length) {
		// 		if ($('#baseWrap').outerHeight() / 2 > $('.ui-scrollbox-item').eq(g).position().top + $('.ui-scrollbox-item').eq(g).outerHeight() ) {
		// 			g = g + 1;
		// 			$('.ui-scrollbox-item').eq(g).addClass('visible');
		// 			//callback ? callback({ current:g }) : '';
		// 			setup();
		// 		} 
		// 	}
        // }

        // $('#baseWrap').off('scroll.scrollbox').on('scroll.scrollbox', function(){
			
		// 	win[global].uiScrollBox.active = true;
        //     var $wrap = $('#baseWrap'),
        //         win_h = $wrap.outerHeight(),
        //         scr_t = $wrap.scrollTop(),
        //         add_h = (win_h / 2),
        //         item = $('.ui-scrollbox-item'),
		// 		n = g,
		// 		nn = n + 1 >= len ? len - 1 : n + 1;
			
		// 	item.length === n ? n = n - 1 : '';
		// 	if ( Math.abs(win_h - Math.floor(item.eq(n).position().top + item.eq(n).outerHeight())) - add_h < scr_t) {
		// 		item.eq(g).addClass('visible');
		// 		g = g + 1;
		// 		g >= len ? g = len - 1 : '';

		// 		win[global].uiScrollBox.idx = n;
		// 		callback ? callback({ current:n}) : '';
		// 	} else {
		// 		item.eq(g).removeClass('visible');
		// 		item.eq(0).addClass('visible');
		// 		g = g - 1;
		// 		g < 0 ? g = 0 : '';
		// 	}
		// 	if ( Math.abs(win_h - Math.floor(item.eq(nn).position().top)) < scr_t) {
		// 		item.eq(n).addClass('arrival');
		// 	} else {
		// 		item.eq(n).removeClass('arrival');
		// 	}			
        // });
    }

	win[global].uiTab.option = {
		current: 0,
		unres: false,
		label: false,
		callback: false,
		align : 'center'
	};
	function createUiTab(opt) {
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiTab.option, opt),
			id = opt.id,
			current = isNaN(opt.current) ? 0 : opt.current,
			unres = opt.unres,
			callback = opt.callback,
			tabLabel = opt.label,
			align = opt.align,
			keys = win[global].option.keys,
			$tab = $('#' + id),
			$btns = $tab.children('.ui-tab-btns'),
			$btn = $btns.find('.ui-tab-btn'),
			$pnls = $tab.children('.ui-tab-pnls'),
			$pnl = $pnls.children('.ui-tab-pnl'),
			para = win[global].uiPara('tab'), // tab=idname-1
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
			para = win[global].uiPara('tab'),
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
		win[global].uiScroll({ 
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
			win[global].uiTabAct({ id: id, current: $(this).index(), align:align }); 
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
				win[global].uiTabAct({ id: id, current: n - 1, align:align }): 
				win[global].uiTabAct({ id: id, current: m - 1, align:align});
			}
			function downRightKey(e) {
				e.preventDefault();
				!$this.attr('tab-last') ? 
				win[global].uiTabAct({ id: id, current: n + 1, align:align }): 
				win[global].uiTabAct({ id: id, current: 0, align:align });
			}
			function endKey(e) {
				e.preventDefault();
				win[global].uiTabAct({ id: id, current: m - 1, align:align });
			}
			function homeKey(e) {
				e.preventDefault();
				win[global].uiTabAct({ id: id, current: 0, align:align });
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

	win[global].uiTooltip.option = {
		visible: null,
		id: false,
		ps: false
	};
	function createUiTooltip(opt){
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiTooltip.option, opt),
			$btn = $('.ui-tooltip-btn'),
			$tip = opt.id ? typeof opt.id === 'string' ? $('#' + opt.id) : opt.id : false,
			visible = opt.visible,
			id = opt.id ? $tip.attr('id') : '',
			
			sp = 10,
			ps = opt.ps,
			off_t, off_l, w, h, bw, bh, st, sl, timer,
			class_ps = 'ps-ct ps-cb ps-lt ps-lb ps-rt ps-rb';

		if (visible !== null) {
			visible ? tooltipSet(id) : tooltipHide();
		}

		// $btn
		// .on('click', function(e){
		// 	e.preventDefault();
		// 	tooltipSet($(this).attr('aria-describedby'));
		// });

		$btn
		.off('mouseover.ui focus.ui').on('mouseover.ui focus.ui', function(e){
			e.preventDefault();
			tooltipSet($(this).attr('aria-describedby'));
		})
		.off('mouseleave.ui ').on('mouseleave.ui', function(){
			tooltipHideDelay();

			$('.ui-tooltip')
				.on('mouseover.ui', function(){
					clearTimeout(timer);
				})
				.on('mouseleave.ui', function(e){
					tooltipHideDelay();
				});
		})

		$btn
		.off('touchstart.uitooltip').on('touchstart.uitooltip', function(e){
			e.preventDefault();
			if (!$(this).data('view')){
				$(this).data('view', true);
				tooltipHide();
				tooltipSet($(this).attr('aria-describedby'));
			} else {
				$(this).data('view', false);
				tooltipHide();
			}

			// $(doc).off('click.bdd').on('click.bdd', function(e){
			// 	//dropdown 영역 외에 클릭 시 판단
			// 	if (!!$('body').data('dropdownOpened')){
			// 		if ($('.ui-tooltip').has(e.target).length < 1) {
			// 			tooltipHide();
			// 		}
			// 	}
			// });
		});

		function tooltipSet(v) {
			var $t = $('[aria-describedby="'+ v +'"]');

			$('#' + v).removeClass(class_ps);

			id = v;
			off_t = $t.offset().top;
			off_l =$t.offset().left;
			w = $t.outerWidth();
			h = $t.outerHeight();
			bw = $(win).innerWidth();
			bh = $(win).innerHeight();
			st = $(doc).scrollTop();
			sl = $(doc).scrollLeft();
			
			tooltipShow(off_t, off_l, w, h, bw, bh, st, sl, id, false);
		}
		function tooltipHide() {
			$('.ui-tooltip').removeAttr('style').attr('aria-hidden', true).removeClass(class_ps);
		}
		function tooltipHideDelay(){
			timer = setTimeout(tooltipHide, 100);
		}

		function tooltipShow(off_t, off_l, w, h, bw, bh, st, sl, id) {
			var $id = $('#' + id),
				pst = (bh / 2 > (off_t - st) + (h / 2)) ? true : false,
				psl = (bw / 2 > (off_l - sl) + (w / 2)) ? true : false,
				tw = $id.outerWidth(),
				th = $id.outerHeight(),
				ps_l, ps_r, cursorCls = 'ps-';
				
			if (psl) {
				if (off_l - sl > tw / 2) {
					cursorCls += 'c';
					ps_l = off_l - (tw / 2) + (w / 2);
				} else {
					cursorCls += 'l';
					ps_l = off_l;
				}
			} else {
				if (bw - (off_l - sl + w) > tw / 2) {
					cursorCls += 'c';
					ps_r = Math.ceil(off_l) - (tw / 2) + (w / 2);
				} else {
					cursorCls += 'r';
					ps_r = off_l - tw + w;
				}
			}

			ps ? cursorCls = 'ps-l' : '';
			ps ? ps_l = off_l : '';
			ps ? psl = true : '';
			pst ? cursorCls += 'b' : cursorCls += 't';

			if (!!$id.attr('modal')) {
				if (!win[global].browser.oldie) {
					ps_l = ps_l;
					ps_r = ps_r;
				}

				win[global].browser.ie ? '' : off_t = off_t;
			}

			if (!!$id.closest('.type-fixed-bottom').length) {
				off_t = off_t - $('ui-modal-tit').outerHeight();
			}

			$id.addClass(cursorCls).attr('aria-hidden', false).css({ 
				display:'block'
			}).css({
				top : pst ? off_t + h + sp : off_t - th - sp,
				left : psl ? ps_l : ps_r
			});
		}
	}

	win[global].uiSelect.option = {
		id: false, 
		current: null,
		customscroll: true,
		vchecktype: false,
		callback: false
	};
	function createUiSelect(opt) {
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiSelect.option, opt),
			current = opt.current,
			callback = opt.callback,
			customscroll = opt.customscroll,
			vchecktype = opt.vchecktype,
			id = opt.id,
			is_id = id === false ? false : true,
			$ui_select = is_id ? typeof id === 'string' ? $('#' + opt.id).closest('.ui-select') : id.find('.ui-select') : $('.ui-select'),

			keys = win[global].option.keys,
			len = $ui_select.length,

			_disabled = false,
			_selected = false,
			_hidden = false,
			_val = '',
			_txt = '',
			_hid = '',
			hiddenCls = '',

			$sel,
			$sel_current,
			$opt,
			$opt_current,
			optSet,

			sel_id,
			list_id,
			opt_id,
			opt_id_selected,
			sel_n,
			sel_tit,
			sel_dis,
			opt_len,

			id_opt,
			id_optname,
			idx,
			timer_opt,
			timer,
			_option_wrap = '';

		//init
		win[global].browser.mobile ? customscroll = false : '';

		$ui_select.find('.ui-select-btn').remove();
		$ui_select.find('.ui-select-wrap').remove();
		$ui_select.find('.dim').remove();

		//select set
		for (var i = 0; i < len; i++) {
			$sel_current = $ui_select.eq(i);
			$sel = $sel_current.find('select');
			sel_id = $sel.attr('id');
			list_id = sel_id + '_list';
			sel_dis = $sel.prop('disabled');
			sel_tit = $sel.attr('title');
			_hid = '';

			(!$sel.data('callback') || !!callback) ? $sel.data('callback', callback) : '';

			customscroll
				? _option_wrap += '<div class="ui-select-wrap ui-scrollbar" id="' + sel_id + '_scroll" style="min-width:' + $sel_current.outerWidth() + 'px">'
				: _option_wrap += '<div class="ui-select-wrap" style="min-width:' + $sel_current.outerWidth() + 'px">';

			win[global].browser.mobile ?
				_option_wrap += '<div class="ui-select-opts" role="listbox" id="' + list_id + '" aria-hidden="false">' :
				customscroll ?
					_option_wrap += '<div class="ui-select-opts ui-scrollbar-item" role="listbox" id="' + list_id + '" aria-hidden="false" tabindex="-1">' :
					_option_wrap += '<div class="ui-select-opts" role="listbox" id="' + list_id + '" aria-hidden="false" tabindex="-1">';

			optSet = function (t){
				(t !== undefined) ? $sel = $(t).closest('.ui-select').find('select') : '';
				$opt = $sel.find('option');
				opt_len = $opt.length;
				sel_id = $sel.attr('id');
				opt_id = sel_id + '_opt';

				for (var j = 0; j < opt_len; j++) {
					$opt_current = $opt.eq(j);
					_hidden = $opt_current.prop('hidden');

					if (current !== null) {
						if (current === j) {
							_selected = true;
							$opt_current.prop('selected', true).attr('selected');
						} else {
							_selected = false;
							$opt_current.prop('selected', false).removeAttr('selected');
						}
					} else {
						_selected = $opt_current.prop('selected');
					}

					_disabled = $opt_current.prop('disabled');
					_selected ? _val = $opt_current.val() : '';
					_selected ? _txt = $opt_current.text() : '';
					_selected && _hidden ? _hid = 'opt-hidden' : '';
					hiddenCls =  _hidden ? 'hidden' : '';
					_selected ? opt_id_selected = opt_id + '_' + j : '';
					_selected ? sel_n = j : '';
					id_optname = $sel.attr('id') + '_opt';
					id_opt = id_optname + '_' + j;

					if (win[global].browser.mobile) {
						_disabled ?
							_selected ?
								_option_wrap += '<button type="button" role="option" id="' + opt_id + '_' + j + '" class="ui-select-opt disabled selected '+ hiddenCls + '" value="' + $opt_current.val() + '" disabled tabindex="-1">' :
								_option_wrap += '<button type="button" role="option" id="' + opt_id + '_' + j + '" class="ui-select-opt disabled '+ hiddenCls + '" value="' + $opt_current.val() + '" disabled tabindex="-1">' :
							_selected ?
								_option_wrap += '<button type="button" role="option" id="' + opt_id + '_' + j + '" class="ui-select-opt selected '+ hiddenCls + '" value="' + $opt_current.val() + '">' :
								_option_wrap += '<button type="button" role="option" id="' + opt_id + '_' + j + '" class="ui-select-opt '+ hiddenCls + '" value="' + $opt_current.val() + '">';
					} else {
						_disabled ?
							_selected ?
								_option_wrap += '<button type="button" role="option" id="' + opt_id + '_' + j + '" class="ui-select-opt disabled selected '+ hiddenCls + '" value="' + $opt_current.val() + '" disabled tabindex="-1">' :
								_option_wrap += '<button type="button" role="option" id="' + opt_id + '_' + j + '" class="ui-select-opt disabled '+ hiddenCls + '" value="' + $opt_current.val() + '" disabled tabindex="-1">' :
							_selected ?
								_option_wrap += '<button type="button" role="option" id="' + opt_id + '_' + j + '" class="ui-select-opt selected '+ hiddenCls + '" value="' + $opt_current.val() + '" tabindex="-1">' :
								_option_wrap += '<button type="button" role="option" id="' + opt_id + '_' + j + '" class="ui-select-opt '+ hiddenCls + '" value="' + $opt_current.val() + '" tabindex="-1">';
					}

					_option_wrap += '<span class="ui-select-txt">' + $opt_current.text() + '</span>';
					_option_wrap += '</button>';
				}

				if (t !== undefined) {
					$sel.closest('.ui-select').find('.ui-select-opts button').remove();
					$sel.closest('.ui-select').find('.ui-select-opts').append(_option_wrap);
					_option_wrap = '';
					eventFn();
				}
			}
			optSet();

			_option_wrap += '</div>';

			win[global].browser.mobile ? _option_wrap += '<button type="button" class="btn-close"><span>닫기</span></button>' : '';
			win[global].browser.mobile ? _option_wrap += '<div class="dim"></div>' : '';
			_option_wrap += '</div>';

			var html_btn = '<button type="button" class="ui-select-btn '+ _hid +'" id="' + sel_id + '_inp" role="combobox" aria-autocomplete="list" aria-owns="' + list_id + '" aria-haspopup="true" aria-expanded="false" aria-activedescendant="' + opt_id_selected + '" data-n="' + sel_n + '" data-id="' + sel_id + '"';
			!!vchecktype
				? html_btn += ' vchecktype=' + vchecktype + '>' + _txt + '</button>'
				: html_btn += '>' + _txt + '</button>';

			$sel_current.append(html_btn);
			$sel.addClass('off').attr('aria-hidden', true).attr('tabindex', -1);
			$sel_current.append(_option_wrap);
			sel_dis ? $sel_current.find('.ui-select-btn').prop('disabled', true).addClass('disabled') : '';
			_option_wrap = '';
			html_btn = '';
		}

		//event
		eventFn();
		function eventFn(){
			$(doc).off('click.dim').on('click.dim', '.dim-dropdown', function () {
				if ($('body').data('select-open')) {
					optBlur();
				}
			});
			$('.ui-select-btn').off('click.ui keydown.ui mouseover.ui focus.ui mouseleave.ui').on({
				'click.ui': selectClick,
				'keydown.ui': selectKey,
				'mouseover.ui': selectOver,
				'focus.ui': selectOver,
				'mouseleave.ui': selectLeave
			});
			$('.ui-select-opt').off('click.ui mouseover.ui').on({
				'click.ui': optClick,
				'mouseover.ui': selectOver
			});
			$('.ui-select-wrap').off('mouseleave.ui').on({ 'mouseleave.ui': selectLeave });
			$('.ui-select-wrap').off('blur.ui').on({ 'blur.ui': optBlur });
			$('.ui-select select').off('change.ui').on({ 'change.ui': selectChange });
			$('.ui-select-label').off('click.ui').on('click.ui', function () {
				var idname = $(this).attr('for');

				setTimeout(function () {
					$('#' + idname + '_inp').focus();
				}, 0);
			});
		}
		function selectLeave() {
			$('body').data('select-open', true);
		}
		function selectChange() {
			$(this).closest('.ui-select').data('fn');
			win[global].uiSelectAct({
				id:$(this).attr('id'),
				current:$(this).find('option:selected').index(),
				callback:$(this).data('callback'), original:true
			});
		}
		function optBlur() {
			optClose();
		}
		function selectClick() {
			optSet(this);
			var $btn = $(this);
			$btn.data('sct', $(doc).scrollTop());
			optExpanded(this);
		}
		function optClick() {
			var t = this,
				sct = $(t).closest('.ui-select').find('.ui-select-btn').data('sct');

			win[global].uiSelectAct({ id: $(t).closest('.ui-select').find('.ui-select-btn').data('id'), current: $(t).index() })
			$(t).closest('.ui-select').find('.ui-select-btn').focus();
			optClose();
			//win[global].uiScroll({ value: sct, speed: 200 });
		}
		function selectOver() {
			$('body').data('select-open', false);
		}
		function selectKey(e) {
			var t = this,
				$btn = $(this),
				id = $btn.data('id'),
				$opt = $('#' + id + '_list').find('.ui-select-opt'),
				$wrap = $('#' + id + '_list').closest('.ui-select-wrap'),
				n = Number($('#' + id + '_list').find('.selected').index()),
				nn,
				wrap_h = $wrap.outerHeight(),
				len = $opt.length,
				n_top = 0;

			if (e.altKey) {
				if (e.keyCode === keys.up) {
					optOpen(t);
				}
				e.keyCode === keys.down && optClose();
				return;
			}

			switch (e.keyCode) {
				case keys.up:
				case keys.left:
					nn = n - 1 < 0 ? 0 : n - 1;
					n_top = $opt.eq(nn).position().top;
					optScroll($wrap, n_top, wrap_h, 'up');
					optPrev(e, id, n, len);
					break;

				case keys.down:
				case keys.right:
					nn = n + 1 > len - 1 ? len - 1 : n + 1;
					n_top = $opt.eq(nn).position().top;
					optScroll($wrap, n_top, wrap_h, 'down');
					optNext(e, id, n, len);
					break;
			}
		}
		function optExpanded(t) {
			if (win[global].browser.mobile) {
				optOpen(t)
			} else {
				if ($(t).attr('aria-expanded') === 'false') {
					optClose();
					optOpen(t);
				} else {
					optClose();
				}
			}
		}
		function optScroll($wrap, n_top, wrap_h, key) {
			var oph = 56;
		}
		function optPrev(e, id, n, len) {
			e.preventDefault();
			n === 0 ? n = 0 : n = n - 1;
			win[global].uiSelectAct({ id: id, current: n });
		}
		function optNext(e, id, n, len) {
			e.preventDefault();
			n === len - 1 ? n = len - 1 : n = n + 1;
			win[global].uiSelectAct({ id: id, current: n });
		}
		function optOpen(t) {
			var $body = $('body'),
				_$sel = $(t),
				_$uisel = _$sel.closest('.ui-select'),
				_$wrap = _$uisel.find('.ui-select-wrap'),
				_$opts = _$wrap.find('.ui-select-opts'),
				_$opt = _$opts.find('.ui-select-opt'),

				offtop = _$uisel.offset().top,
				scrtop = $(doc).scrollTop(),
				wraph = _$wrap.outerHeight(),
				btn_h = _$sel.outerHeight(),
				opt_h = _$opt.outerHeight(),
				win_h = $(win).outerHeight(),
				clsname = 'bottom';

			clsname = win_h - ((offtop - scrtop) + btn_h) > wraph ? 'bottom' : 'top';

			$body.addClass('dim-dropdown');
			$body.data('scrolling') === 'yes' ? win[global].uiScrollingCancel() : '';

			$plugins.uiScrollBarReset({
				id: _$wrap.attr('id')
			});
			

			if (!_$sel.data('expanded')) {
				_$sel.data('expanded', true).attr('aria-expanded', true);
				_$uisel.addClass('on');
				_$wrap.addClass('on ' + clsname).attr('aria-hidden', false);
				_$opts.find('.ui-select-opt').eq(_$uisel.find(':checked').index());
				customscroll ? _$wrap.css('min-width', _$opts.outerWidth()) :
					win[global].uiScroll({ target: _$wrap, value: Number(opt_h * _$uisel.find(':checked').index()), speed: 0 });
			}

			if (_$wrap.outerHeight() > _$opts.outerHeight()) {
				_$wrap.css({
					'min-height': _$opts.outerHeight(),
					overflow: 'hidden'
				});
				$plugins.uiScrollBarReset({
					id: _$wrap.attr('id')
				});
			} else {
				customscroll
					? win[global].uiScrollBar({
						id: _$wrap.attr('id'),
						top: _$wrap.find('.selected').index() * _$wrap.find('.ui-select-opt').outerHeight()
					}) : '';
			}
		}

		function optClose() {
			var $body = $('body'),
				$select = $('.ui-select'),
				$btn = $('.ui-select-btn'),
				$wrap = $('.ui-select-wrap');

			$body.data('scrolling') === 'no' ? win[global].uiScrolling() : '';
			$body.removeClass('dim-dropdown');
			$btn.data('expanded', false).attr('aria-expanded', false);
			$select.removeClass('on');
			$wrap.removeClass('on top bottom').attr('aria-hidden', true);
		}
	}
	function createUiSelectAct(opt) {
		var id = typeof opt.id === 'string' ? opt.id : opt.id.attr('id'),
			$uisel = typeof opt.id === 'string' ? $('#' + opt.id).closest('.ui-select') : opt.id.closest('.ui-select'),
			$sel = $('#' + id),
			$opt = $sel.find('option'),
			$opt_ = $uisel.find('.ui-select-opt'),
			callback = opt.callback === undefined ?  $sel.data('callback') === undefined ? false : $sel.data('callback') : opt.callback,
			current = opt.current,
			org = opt.original === undefined ? false : opt.original;

		!org ? $uisel.find('option').prop('selected', false).eq(current).prop('selected', true) : '';
		!org ? $uisel.find('option').prop('selected', false).eq(current).prop('selected', true).trigger('change') : '';
		//trigger 오류 확인필요


		!$opt.eq(current).prop('hidden')
			? $sel.closest('.ui-select').find('.ui-select-btn').removeClass('opt-hidden')
			: $sel.closest('.ui-select').find('.ui-select-btn').addClass('opt-hidden');
		$uisel.find('.ui-select-btn').text($opt.eq(current).text());
		$opt_.removeClass('selected').eq(current).addClass('selected');

		callback ? callback({ id: id, current: current, val: $opt.eq(current).val() }) : '';
	}

	function createUiProduct360(opt){
		var $wrap = $(opt.canvasId),
			imgLen = $plugins.onlypub ? 51 : 78, //51 , 78
			imgPath = opt.path,
			imgName = opt.file,
			fileName = null,
			html_360 = '',
			img_array = [],
			loadimg = 0;

		$wrap.addClass('ui-360-wrap');
		
		if (!$wrap.find('.ui-360-item').length) {
			
			for (var i = 1; i < imgLen + 1; i++) {
				fileName = imgName.split('{col}');
				fileName = imgPath + fileName[0] + i + fileName[1];
				html_360 += '<img src="'+ fileName +'" class="ui-360-item lazy n'+ i +'" alt="" >';
				img_array.push(fileName);
				if (i === 1) {
					$wrap.append('<div class="ui-360-bg"></div>');
				}
			}
			
			$wrap.append(html_360);
			$plugins.uiLoading({
				id: $wrap,
				visible:true
			});
			
			$wrap.find('.ui-360-item').each(function(i){
				
				var newImage = new Image();
				newImage.src = img_array[i];

				newImage.onload = function(){
					loadimg = loadimg + 1;
					if (loadimg === imgLen) {
						var iw = Math.round($wrap.find('.ui-360-item').eq(0).outerWidth());
						$wrap.css('width', iw + 'px');
						$wrap.closest('.ui-modal-wrap').find('.ui-modal-head').css('width', iw + 'px');
						$wrap.closest('.ui-modal-wrap').find('type-item360-arr').css('width', iw + 'px');
						$plugins.uiLoading({
							visible:false
						});
					}
				};
			});
		}
		html_360 = '';

		var $item360 = $(doc).find('.ui-modal-simple.type-item360'),
			evtHandle = ['mousewheel.aab DOMMouseScroll.aab', 'mousedown.aab touchstart.aab' , 'mousemove.aab touchmove.aab', 'mouseup.aab touchcancel.aab touchend.aab'],
			angle_n = 0,
			angle_prev = 0;

		$item360.off(evtHandle[1]).on(evtHandle[1], function(e){
			var $this = $(this),
				x, x_s, _x,
				r = 10,
				ps = 'left',
				angle_now = 1,
				eTouches = e.touches === undefined ? e.originalEvent.touches : e.touches;

			(eTouches !== undefined) ? x_s =  eTouches[0].pageX : '';

			if (eTouches === undefined) {
				(e.pageX !== undefined) ? x_s = e.pageX : '';
				(e.pageX === undefined) ? x_s = e.clientX : '';
			}
			$this.find('.type-item360-arr').fadeOut(200);

			$item360.off(evtHandle[2]).on(evtHandle[2], function(e){
				var eTouches = e.touches === undefined ? e.originalEvent.touches : e.touches;

				(eTouches !== undefined) ? x =  eTouches[0].pageX : '';
				if (eTouches === undefined) {
					(e.pageX !== undefined) ? x = e.pageX : '';
					(e.pageX === undefined) ? x = e.clientX : '';
				}

				ps = x_s - x > _x ? 'left' : 'right';
				_x = x_s - x;

				var angle_ing = Math.round(Math.abs(_x) / r) + angle_prev;

				if (ps === 'left') {
					if (angle_now !== angle_ing) {
						angle_n = angle_n + 1;
					}
					angle_now = angle_ing ;
					angle_n > imgLen ? angle_n = 0 :'';
				} else {
					if (angle_now !== angle_ing) {
						angle_n = angle_n - 1;
					}
					angle_now = angle_ing ;
					angle_n < 0 ? angle_n = imgLen :'';
				}

				$this.find('.ui-360-item').css('opacity',0);

				angle_n === 0 ?
					$this.find('.ui-360-item.n1').css('opacity',1):
					$this.find('.ui-360-item.n' + angle_n).css('opacity',1);

			}).off(evtHandle[3]).on(evtHandle[3], function(){
				angle_prev = angle_n;
				angle_prev < 0 || angle_prev > imgLen ? angle_prev = 0 : '';

				$item360.off(evtHandle[2]);
				$this.find('.type-item360-arr').fadeIn(200);

				
			});
		});
	}

	function createUi360(opt){
		/**
		 * Filename: canvas360.js
		 *
		 * Creates a 360 view using an array of images using a canvas element.
		 */

		canvas360({
			canvasId: opt.canvasId,
			framesPath: opt.path || '',
			framesFile: opt.file,
			canvasWidth : parseInt(opt.w) || $(win).outerWidth(),
			canvasHeight : parseInt(opt.h) || $(win).outerHeight(),
			framesReverse: !!$(this).data('framesreverse') || false
		});
		
		function canvas360(params) {

			params = params || {};
			params.canvasId = params.canvasId || false;
			params.canvasWidth = params.canvasWidth || 608;
			params.canvasHeight = params.canvasHeight || 1080;
			params.framesPath = params.framesPath || 'img/360/';
			params.framesFile = params.framesFile || '';
			params.framesCount = params.framesCount || 78; //51
			params.framesReverse = params.framesReverse || false;
			params.logoImagePath = params.logoImagePath || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAAXCAMAAAD+89sVAAAA2FBMVEUAAAD///////////////////z///////////////////////////////////////3//////////fj//////////////vn//////vf/////////++z//////////////////////////////////////////////////////////////////v7////////////////+3Vv9zwr////90SL+56391Db92FP+9NT++On8ywD+7a7+44H90y7+5ZT+44f+6Lv+4XD////9zhr8ygD9zRT8zA391CndTDoyAAAAQnRSTlMAPdnwKAxHHzIEQ51QTS83mBAVVKpXGiQIw70BekrTavdczciQfrCKYIFxhKW3ZOIrr8/rui6zkayn7q6hxG5jgKx0TLk6AAADaklEQVRIx8WU55KiQBCAG5YkUTIo4IquskY2XM6z6L3/G90Ey8F1rup+3X5VCjTNfDM9AZLUHQMjVdwMCGNpV9yvbP0UbvUTaQoYtW0TUFKd49LMd98/PD+///AjAELg6m0GDF0xfBCBEDL5bYMvd+jMzGBhzpMOS3yZoksAHn533fHl5dB13eEnAGxJOAXKLUJDgZq+8LjcBh0RbupcpjcLgNceGyE5vowtEmpmHI7d7zFYLJlSIbQWym8QMri8papiAARlj++3JMMCPwgC3y9xYC7hP1WytbIsNTUk+ZXXdS99uhdcP26vEbr/m1zlRQgi/AGfnyHx5Lg3cMLDvbFpm4yAVef55Ob2HzvE7biId2QpDU6whcXk1SLHbEc41SHzebkirKjXb3wfaVy+RJgVqN3hrD0cjkc8748TnOkj+WYJALuhVYSa6WiM0jQ1p5SovA+ZqQygP/SadCqXMVVFUhTpLN+TZxev8+OBTjXl8+Pjt4eH7461nQM8jdAIYCYo+3hwkuN603+xPEd9hrA7yYNzWd8x6bf3D1+/fPy0GdXV7eKOvlvSLypadvGcp3zOyXyG12WX74d0AclOArBiSrrbIiBkv6g0n8m35006YVkFvmh4CMu/yrkpWOA/shT4nPq47AV7zdYmaxZH+Sa9R6+RGiaHDXuei+UX+1yhihWrfFqTIZAMdkTQRtkhBBEaRZad2nEYhrHZvHbf0n4DYfbPcgfay0Mm759PNzQjlEcrU45mT9y1h0v3E9BDhn8lkIuP1zVvpPZYeHvOqJFETprl1fG66nWlBDYtwGCLQ4QimQNgeJLJzpukmUeRtTJY2DWMbAwDKYyLFPzYDjTT9SXP4Eg00w/XVrRZl6w53SRRhmmYiVBOUsdjEKD6KsvwE7eMp7HCHiHz8QvhByAOs10tguz+QhG8mEzMcAeZq8V2bLu9tua2t3PgmmJlOJPsOt6sATamUL5PPL0yruPlEFQ9r2JbauGCZOsGlmj9jCZ6nItGaE2LJQipXdPdpNfxzVAJXU+GKwJLc+/WIkfROmtd5KiGIKYiW1G6jPnStJnsyySJBCXRayXwqkww8saHKBRO7Q7EtOSX9cSKHcYhGcBUa4RrVIqdqSieTJ1GETr0AP6BwLAdR8rgTZgUtg9vhTM1VPh//AHAidcBf3YHngAAAABJRU5ErkJggg==';

			params.loaderBarColor = params.loaderBarColor || '#ffffff';
			params.loaderFillColor = params.loaderFillColor || '#fecd18';
			params.loaderFillGradient = params.loaderFillGradient || false;
			params.loaderFillColor2 = params.loaderFillColor2 || '#ffffff';

			var frameImages = [];

			var strokeX = 0;
			var strokeY = 0;
			var strokeWidth = 0;
			var strokeHeight = 0;
			var countFrames = 0;
			var loadPercent = 0;
			var curFrame = 0;
			var frameCount = 0;
			var animDirection = 0;
			var countFrames = 0;
			var animatingFrames = false;

			var imagePositionX = 0;
			var imagePositionY = 0;

			//***** Swipe Detection Code

			var HORIZONTAL = 1;
			var VERTICAL = 2;
			var AXIS_THRESHOLD = 30;
			var GESTURE_DELTA = 30;

			var direction = HORIZONTAL;

			/** Extend the window with a custom function that works off of either the
			 * new requestAnimationFrame functionality which is available in many modern
			 * browsers or utilizes the setTimeout function where not available.
			 */

			window.requestAnimFrame = (function () {
				return window.requestAnimationFrame || // Chromium
					window.webkitRequestAnimationFrame || // WebKit
					window.mozRequestAnimationFrame || // Mozilla
					window.oRequestAnimationFrame || // Opera
					window.msRequestAnimationFrame || // IE
					function (callback, element) {
						window.setTimeout(callback, 17);
					};
			})();

			var onswipeleft = function (delta) {
				var deltaDif = Math.ceil(delta / (GESTURE_DELTA / 2));
				countFrames += deltaDif;
				countFrames > params.framesCount ? countFrames = params.framesCount : '';
				animDirection = 1;

				if (!animatingFrames) {
					animatingFrames = true;
					animateFrames();
				}
			}
			var onswiperight = function (delta) {
				var deltaDif = deltaDif = Math.ceil(delta / (GESTURE_DELTA / 2));
				countFrames += deltaDif;
				animDirection = 2;
				countFrames > params.framesCount ? countFrames = params.framesCount : '';

				if (!animatingFrames) {
					animatingFrames = true;
					animateFrames();
				}
			}
			var inGesture = false;

			var _originalX = 0;
			var _originalY = 0;

			var mousedown = function (event) {
				event.preventDefault();
				inGesture = true;
				_originalX = (event.touches) ? event.touches[0].pageX : event.pageX;
				_originalY = (event.touches) ? event.touches[0].pageY : event.pageY;

				// Only iphone
				if (event.touches && event.touches.length != 1) {
					inGesture = false;
				}
			}
			var mouseup = function () {
				inGesture = false;
			}
			var mousemove = function (event) {
				event.preventDefault();
				var delta = 0;
				var currentX = (event.touches) ? event.touches[0].pageX : event.pageX;
				var currentY = (event.touches) ? event.touches[0].pageY : event.pageY;
				var vDirection;

				if (inGesture) {

					if (direction == HORIZONTAL) {
						delta = Math.abs(currentY - _originalY);
					} else {
						delta = Math.abs(currentX - _originalX);
					}
					if (delta > AXIS_THRESHOLD) {
						//inGesture = false;
					}
				}

				if (inGesture) {
					if (direction == HORIZONTAL && !params.framesReverse) {
						delta = Math.abs(currentX - _originalX);
						if (currentX > _originalX) {
							vDirection = 0;
						} else {
							vDirection = 1;
						}
					} else if (direction == HORIZONTAL && params.framesReverse) {
						delta = Math.abs(currentX - _originalX);
						if (currentX < _originalX) {
							vDirection = 0;
						} else {
							vDirection = 1;
						}
					} else {
						delta = Math.abs(currentY - _originalY);
						if (currentY > _originalY) {
							vDirection = 2;
						} else {
							vDirection = 3;
						}
					}

					if (delta >= GESTURE_DELTA) {

						var handler = null;
						switch (vDirection) {
							case 0:
								handler = onswiperight;
								break;
							case 1:
								handler = onswipeleft;
								break;
						}
						if (handler != null) {
							handler(delta);
						}
						_originalX = (event.touches) ? event.touches[0].pageX : event.pageX;
						_originalY = (event.touches) ? event.touches[0].pageY : event.pageY;
						//inGesture = false;
					}
				}
			}
			//***** End swipe detection Code

			var canvas = null;
			var context = null;
			var self = this;
			var number_format = function (number, decimals) {
				number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
				var n = !isFinite(+number) ? 0 : +number, prec = !isFinite(+decimals) ? 0 : Math.abs(decimals), sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep, dec = (typeof dec_point === 'undefined') ? '.' : dec_point, s = '', toFixedFix = function (n, prec) {
					var k = Math.pow(10, prec);
					return '' + Math.round(n * k) / k;
				};
				// Fix for IE parseFloat(0.55).toFixed(0) = 0;
				s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
				if (s[0].length > 3) {
					s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
				}
				if ((s[1] || '').length < prec) {
					s[1] = s[1] || '';
					s[1] += new Array(prec - s[1].length + 1).join('0');
				}
				return s.join(dec);
			}
			
			var startPreload = function () {
				$plugins.uiLoading({
					wrap:$('#pop360'),
					visible:true
				});
				for (var i = 0; i < params.framesCount; i++) {
					frameImages[i] = new Image();

					var repVal = ((i < 9) ? '' : '') + (i + 1);
					frameImages[i].src = params.framesPath + params.framesFile.replace('{col}', repVal);
					
				}
				setTimeout(function () {
					preloadImages();
				}, 20);

			}
			var preloadImages = function () {
				for (var i = 0; i < params.framesCount; i++) {
					if (frameImages[i].complete) {
						loadPercent++;
					}
				}

				if (loadPercent >= params.framesCount) {
					drawFrame();
					return;
				} else {
					setTimeout(function () {
						preloadImages();
					}, 200);
				}
			}
			var animateFrames = function () {
				if (animDirection == 1) {
					curFrame++;
				}

				if (animDirection == 2) {
					curFrame--;
				}

				frameCount++;
				if (curFrame < 0) {
					curFrame = params.framesCount - 1;
				}
				if (curFrame > (params.framesCount - 1)) {
					curFrame = 0;
				}
				drawFrame();

				if (frameCount < countFrames) {
					requestAnimFrame(function () {
						animateFrames();
					});
					
				} else {
					animDirection = 0;
					countFrames = 0;
					frameCount = 0;
					animatingFrames = false;
				}
			}
			var drawFrame = function () {
				$plugins.uiLoading({
					wrap:$('#pop360'),
					visible:false
				});

				if (curFrame > (params.framesCount - 1)) {
					curFrame = 0;
				}
				if (curFrame < 0) {
					curFrame = (params.framesCount - 1);
				}

				var currentImage = frameImages[curFrame];

				if (curFrame >= 0 && curFrame < (params.framesCount - 1)) {
					var scale = Math.min(params.canvasWidth / currentImage.width, params.canvasHeight / currentImage.height);
					var x = (params.canvasWidth / 2) - (currentImage.width / 2) * scale,
						y = (params.canvasHeight / 2) - (currentImage.height / 2) * scale;

					if (win[global].breakpoint) { // in PC
						var w = currentImage.width < currentImage.width * scale ? currentImage.width : currentImage.width * scale,
							h = currentImage.height < currentImage.height * scale ? currentImage.height : currentImage.height * scale;
						$('.type-item360 .ui-modal-head').css('width', w);
					} else { // in Mobile
						scale = params.canvasWidth / currentImage.width;
						var w = currentImage.width * scale,
							h = currentImage.height * scale;
					}

					var minW = Math.min(params.canvasWidth, w),
						maxW = Math.max(params.canvasWidth, w),
						minH = Math.min(params.canvasHeight, h),
						maxH = Math.max(params.canvasHeight, h);
						
					if (win[global].breakpoint) { // in PC
						x = (maxW - minW) / 2;
						y = (maxH - minH) / 2;
						$plugins.common.setCanvas360(x, y, w, h);
					} else { 
						x = 0;
						y = (params.canvasHeight - h) / 2;
					}
					context.drawImage(currentImage, x, y, w, h);
				}

			}
			if (params.canvasId) {
				// Set the variable elem to the object with the specified params.canvasId
				var elem = document.querySelector(params.canvasId);

				// If the element is not an object then show a message letting the user know.
				if (!elem) {
					return;
				} else {
					canvas = document.createElement("canvas");
					canvas.width = win[global].breakpoint ?  params.canvasWidth : params.canvasWidth;
					canvas.height = win[global].breakpoint ?  params.canvasHeight : params.canvasHeight;

					elem.className += ' canvas360Wrapper';
					elem.style.width = win[global].breakpoint ? ((canvas.width) + 'px') : ((canvas.width) + 'px');
					elem.style.height = win[global].breakpoint ? ((canvas.height) + 'px') : ((canvas.height) + 'px');
					elem.innerHTML = '';
					elem.appendChild(canvas);
					context = canvas.getContext('2d');
					canvas.onmousedown = mousedown;
					canvas.ontouchstart = mousedown;
					canvas.onmousemove = mousemove;
					canvas.ontouchmove = mousemove;

					window.onkeypress = function (event) {
						var k = event.keyCode || event.charCode;
						if (!k)
							return;
						if (k == 37) {// left arrow
							if (params.framesReverse) {
								onswiperight();
							} else {
								onswipeleft();
							}
						} else if (k == 39) {// right arrow
							if (params.framesReverse) {
								onswipeleft();
							} else {
								onswiperight();
							}
						}
					}

					// Fix Andriod 4 Chrome bug.
					if (win[global].breakpoint) {
						$('body').off('mousedown.i360').on('mousedown.i360', function () { 
							$('.type-item360.open').addClass('ready-360');
							$('body').off('touchstart.i360');
						});
					} else {
						$('body').off('touchstart.i360').on('touchstart.i360', function () { 
							$('.type-item360.open').addClass('ready-360');
							$('body').off('touchstart.i360');
						});
					}
					

					// Set a mouseup event on the canvas.
					window.onmouseup = mouseup;

					// Start the preload method.
					startPreload();

				}

			}

		}
			

	}




	win[global].uiSlider.option = {
		vertical: false,  
		range: false,  
		reverse : false, 
		stepname: false,
		callback: false,
		pointArray: false,

		unit: '',
		txt_s:'',
		txt_e:'',

		now: [0],
		step: 10,
		min: 0,
		max: 100,
	}
	function createUiSlider(opt) {
		var opt = $.extend(true, {}, win[global].uiSlider.option, opt),
			$slider = $('#' + opt.id),
			$wrap = $slider.find('.ui-slider-wrap'),
			$divwrap = $slider.find('.ui-slider-divwrap'),
			$bg = $wrap.find('.ui-slider-bg'),
			$btn = $wrap.find('button'),
			$btn_s = $wrap.find('.ui-slider-btn-s'),
			$bar = $bg.find('.ui-slider-bar'),
			vertical = opt.vertical,
			rev = opt.reverse,
			pointArray = opt.pointArray,
			stepname = opt.stepname; 

		
		if (!!$slider.hasClass('loaded')) {
			return false;
		}

		$slider.addClass('loaded');
		rev ? $slider.addClass('type-reverse') : $slider.removeClass('type-reverse');
		vertical ? $slider.addClass('type-vertical') : $slider.removeClass('type-vertical');

		var	step = opt.step,
			id = opt.id,
			min = opt.min,
			max = opt.max,
			callback = opt.callback,
			txt_e2 = '', 
			txt_s2 = '',
			slider_w = !vertical ? $bg.outerWidth() : $bg.outerHeight(),
			step_w = 100 / step,
			unit_sum = (max - min) / step,
			now_s = opt.now[0] < min ? min : opt.now[0],
			now_e = opt.now[1] > max ? max : opt.now[1],
			per_min = ((now_s - min) / (max - min)) * 100,
			per_max = ((now_e - min) / (max - min)) * 100,
			div_w = Math.ceil(slider_w / step),
			lmt_max,
			now_sum = [],
			sliderstep = [],
			p, 
			txt_val,
			dir = !vertical ? rev ? 'right' : 'left' : rev ? 'bottom' : 'top',
			siz = !vertical ? 'width' : 'height';

		$wrap.find('.ui-slider-tooltip').remove();
		$divwrap.find('span').remove();
 		$btn_s.css(dir, per_min + '%').find('.ui-slider-txt').text(((per_min / step_w) * unit_sum) + min);
		$bar.css(siz,per_min + '%').css(dir,0);

		for (var i = 0; i < step + 1; i++) {
			txt_e2 = (i === step) ? opt.txt_e : '';
			txt_s2 = (i === 0) ? opt.txt_s : '';
			txt_val = parseInt(min + (unit_sum * i));
			now_sum.push(txt_val);

			if (stepname) {
				$divwrap.append('<button type="button" class="ui-slider-div n'+ i +'" style="'+ dir +':' + step_w * i + '%; '+ siz +':' + div_w + 'px; margin-'+ dir +':' + (div_w / 2) * -1 + 'px"><em>' + stepname[i] + '</em></button>');
			} else {
				$divwrap.append('<button type="button" class="ui-slider-div n'+ i +'" style="'+ dir +':' + step_w * i + '%; '+ siz +':' + div_w + 'px; margin-'+ dir +':' + (div_w / 2) * -1 + 'px"><em>' + txt_val + ' ' + txt_e2 + '' + txt_s2 + '</em></button>');
			}

			sliderstep.push(parseInt(min + (unit_sum * i)));
		}

		scrollPositionBtn();
		sliderCallback({ 
			callback:callback, 
			now_1:((per_min / step_w) * unit_sum) + min
		});
		
		$('body').find('.ui-slider-wrap button').on('touchmove.uislider', function(e){
			e.preventDefault();
		});
		$('body').find('.type-viewall .viewall-panel-wrap').off('touchstart.sc3').on('touchstart.sc3', function(){
			$('body').find('.ui-slider-divwrap').removeClass('on');
			scrollPositionBtn();
		});
		$('body').find('.ui-slider-div').off('click.sbtn').on('click.sbtn', function(){
			per_min = (($(this).index() - min) / (max - min)) * 100;
			act($btn_s, 'min');
			$('.type-viewall .ui-modal-cont').off('scroll.sc');
		});
		$btn.off('mousedown.sliderstart touchstart.sliderstart').on('mousedown.sliderstart touchstart.sliderstart', function(e){
			e.preventDefault();
			var $this = $(this),
				minmax = $this.data('btn'),
				moving = false;
			
			$('body').find('.ui-slider-divwrap').addClass('on');
			$('.type-viewall .ui-modal-cont').off('scroll.sc');

			$(doc).off('mousemove.slidermove touchmove.slidermove').on('mousemove.slidermove touchmove.slidermove', function(e){
				moving = true;

				($('html').is('.ui-m')) ? per($this, event, minmax) : per($this, e, minmax);
			}).off('mouseup.sliderend touchcancel.slidermove touchend.slidermove').on('mouseup.sliderend touchcancel.slidermove touchend.slidermove', function(e){
				$this.closest('.ui-slider').find('.ui-slider-wrap .ui-slider-btn-s').removeClass('on');
				moving ? act($this, minmax) : '';
				$(doc).off('mousemove.slidermove mouseup.sliderend touchmove.slidermove');
			});
		});

		function scrollPositionBtn(){
			$('.type-viewall .ui-modal-cont').off('scroll.sc').on('scroll.sc', function(){
				scrollPoint($(this).scrollTop());
			});
		}
		
		function scrollPoint(v){
			var n = v,
				len = $('[id^="quickNavi_"]').length;

			if (!!$('[id*="quickNavi_"]').length){
				var len = $('[id^="quickNavi_"]').length;
				for (var i = 0; i < len; i++) {
					var $tit = $('#quickNavi_' + i);
				    pointArray.push(Math.floor($tit.position().top));
				}
			}

			for (var i = 0; i < len; i++) {
				if (n > pointArray[i] && n < pointArray[i + 1]) {
					per_min = ((i - min) / (max - min)) * 100;

					$('.ui-slider-btn-s').css('top',  per_min + '%');
					$('.ui-slider-divwrap .ui-slider-div').removeClass('on');
					$('.ui-slider-divwrap .ui-slider-div').eq(i).addClass('on');
					break;
				} 
			}
		}

		function act($this){
			$bar.css(siz, per_min + '%').css(dir, 0);
			$this.css(dir, per_min + '%').addClass('on').find('.ui-slider-txt').text(((per_min / step_w) * unit_sum) + min);

			sliderCallback({ 
				callback:callback, 
				now_1:Number(((per_min / step_w) * unit_sum) + min),
			});
		}

		function per($this, e){
			var value_l;

			slider_w = !vertical ? $bg.outerWidth() : $bg.outerHeight();

			if (!vertical) {
				if (e.touches !== undefined) {
					value_l = e.touches[0].pageX - $bg.offset().left - 0;
				}
				if (e.touches === undefined) {
					if (e.pageX !== undefined) {
						value_l = e.pageX - $bg.offset().left - 0;
					}
					//ie
					if (e.pageX === undefined) {
						value_l = e.clientX - $bg.offset().left - 0;
					}
				}
			} else {
				if (e.touches !== undefined) {
					value_l = e.touches[0].pageY - $bg.offset().top - 0;
				}
				if (e.touches === undefined) {
					if (e.pageX !== undefined) {
						value_l = e.pageY - $bg.offset().top - 0;
					}
					//ie
					if (e.pageX === undefined) {
						value_l = e.clientY - $bg.offset().top - 0;
					}
				}
			}

			p = (value_l <= 0) ? 0 : (value_l >= slider_w) ? slider_w - 0 : value_l;
			p = (p / slider_w) * 100;
			rev ? p = 100 - p : ''; 
			p > 50 ? Math.floor(p/10) * 10 : Math.ceil(p/10) * 10;
			p = p.toFixed(0);
			p = p < 0 ? 0 : p > 100 ? 100 : p;
			isNaN(lmt_max) ? lmt_max = per_max : '';
			p * 1 >= lmt_max * 1 ? p = lmt_max: '';
			per_min = p; 
			$bar.css(siz, per_min + '%').css(dir, 0);
			$this.css(dir, p + '%');
		}

		function sliderCallback(opt){
			$(doc).off('mouseup.sliderend touchcancel.slidermove touchend.slidermove');
			opt.callback ? opt.callback({ 
				id:id, 
				per_min:per_min, 
				min: Math.round(opt.now_1) 
			}) : '';
		}
	}
})(jQuery, window, document);	