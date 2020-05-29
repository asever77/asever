;(function ($, win, doc, undefined) {

	'use strict';

	var $ui = win.$plugins,
        namespace = 'netiveUI.plugins';

    /* ------------------------------------------------------------------------
	* name : screen capture
	* Ver. : v1.0.0
	* date : 2018-12-21
	* EXEC statement
	* - $plugins.uiCapture({ option });
	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {
		uiCapture: function (opt) {
			return createUiCapture(opt);
		}
	});
	function createUiCapture(opt){
		if (opt === undefined) {
			return false;
		}

		var canvas = "";

		html2canvas(document.getElementById(opt.id), { 
			onrendered : function(canvas) { 
				document.body.appendChild(canvas); 
				canvas.id ="uiCanvas"
				canvas.toBlob(function(blob){ saveAs(blob,"do.png"); }, "image/png");
				$('#uiCanvas').remove();
			}
		});
	}
        
})(jQuery, window, document);