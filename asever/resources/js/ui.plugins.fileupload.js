;(function ($, win, doc, undefined) {

	'use strict';

	var $ui = win.$plugins,
        namespace = 'netiveUI.plugins';

    /* ------------------------------------------------------------------------
	* name : file upload
	* Ver. : v1.0.0
	* date : 2018-12-21
	* EXEC statement
	* - $plugins.uiFileUpload({ option });
	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {
		uiFileUpload: function (opt) {
			return createUiFileUpload(opt);
		}
	});
	function createUiFileUpload(opt){
		$(doc).on('change', '.ui-file-inp', function(){
				upload(this);
			})
			.on('click', '.ui-file-del', function(){
				fileDel(this);
			});
			
		//fn
		function upload(t){
			var $this = $(t),
				v = $this[0].files,
				id = $this.attr('id'),
				len = v.length,
				$list = $('.ui-file-list[aria-labelledby="'+ id +'"]');

			$list.find('.ui-file-item').remove();
			$list.find('.ui-file-del').remove();
			for (var i = 0; i < len; i++) {
				$list.append('<div class="ui-file-item n'+ i +'">'+ v[i].name +'</div>');
				
			}
			$list.append('<button type="button" class="ui-file-del btn-del">첨부파일 삭제</button>');
		}
		function fileDel(t){
			var $this = $(t),
				$list = $this.closest('.ui-file-list'),
				id = $list.attr('aria-labelledby'),
				$id = $('#' + id);

			$ui.browser.ie ?
				$id.replaceWith( $id.clone(true) ) : $id.val(''); 
			$list.find('.ui-file-item').remove();
			$this.remove();
		}
		
	}
    
})(jQuery, window, document);