;(function ($, win, doc, undefined) {

	'use strict';

	var $ui = win.$plugins,
        namespace = 'netiveUI.plugins';

	/* ------------------------------------------------------------------------
	* name : print
	* Ver. : v1.0.0
	* date : 2018-12-21
	* EXEC statement
	* - $plugins.uiPrint({ option });
	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {
		uiPrint: function (opt) {
			return createUiPrint(opt);
		}
	});
	function createUiPrint(opt) {
		var $print = $('#' + opt.id),
			clone = $print.clone(),
			html = '';

		html += '<div class="base-print" id="basePrint"></div>';
		
		function preview_print(){ 
			var webBrowser ='<OBJECT ID="previewWeb" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>';
			
			doc.body.insertAdjacentHTML('beforeEnd', webBrowser);
			previewWeb.ExecWB(7,1);
			previewWeb.outerHTML='';
		} 

		if (self !== top) {
			parent.$('body').append(html);
			parent.$('.base-print').append(clone);
			
			$ui.browser.ie ? preview_print() : win.parent.print();

			setTimeout(function () {
				parent.$('.base-print').remove();
			}, 0);
		} else {
			$('body').addClass('print-ing').append(html);
			$('.base-print').append(clone);
			
			$ui.browser.ie ? preview_print() : win.print();
			
			setTimeout(function () {
				$('body').removeClass('print-ing')
				$('.base-print').remove();
			}, 0);
		}
	}

})(jQuery, window, document);