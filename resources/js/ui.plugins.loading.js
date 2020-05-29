;(function ($, win, doc, undefined) {

	'use strict';

	var $ui = win.$plugins,
        namespace = 'netiveUI.plugins';

    /* ------------------------------------------------------------------------
	* name : loading
	* Ver. : v1.0.0
	* date : 2018-12-21
	* EXEC statement
	* - $plugins.uiLoading({ option });
	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {
		uiLoading: function (opt) {
			return createUiLoading(opt);
		}
	});
	$ui.uiLoading.timer = {};
	function createUiLoading(opt) {
		var loading = '',
			$selector = opt.id === undefined ? $('body') : opt.id === '' ? $('body') : typeof opt.id === 'string' ? $('#' + opt.id) : opt.id,
			txt = opt.txt === undefined ? 'Loading …' : opt.txt;

		opt.id === undefined ?
			loading += '<div class="ui-loading">':
			loading += '<div class="ui-loading" style="position:absolute">';
		loading += '<div class="ui-loading-wrap">';
		loading += '<strong class="ui-loading-txt"><span>'+ txt +'</span></strong>';
		loading += '</div>';
		loading += '<button type="button" class="btn-base" style="position:fixed; bottom:10%; right:10%; z-index:100;" onclick="$plugins.uiLoading({ visible:false });"><span>$plugins.uiLoading({ visible:false })</span></button>';
		loading += '</div>';

		clearTimeout($ui.uiLoading.timer);
		opt.visible === true && !$('body').data('loading') ? showLoading() : opt.visible === false ? hideLoading() : '';
		
		function showLoading(){
			clearTimeout($ui.uiLoading.timer);
			$('body').data('loading', true);
			$selector.prepend(loading);
			$selector.find('.ui-loading').stop().animate({ 'opacity':1 });
		}
		function hideLoading(){
			clearTimeout($ui.uiLoading.timer);
			$ui.uiLoading.timer = setTimeout(function(){
				$selector.find('.ui-loading').stop().animate({ 'opacity':0 }, function(){
					$('.ui-loading').remove();
					$('body').data('loading', false);
				});
			},100);
		}
	}	


})(jQuery, window, document);