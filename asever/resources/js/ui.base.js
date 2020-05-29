// ;(function () {
//     console.log('base.js')

//     var head = document.getElementsByTagName('head')[0],
//         script = document.createElement('script'),
//         _reload;

//     script.src = '/vanilla/resources/js/lib/jquery-1.12.4.min.js';
//     head.appendChild(script);

//     // jquery load
//     _reload = function (w, d, $) {
//         if (!$) {
//             setTimeout(function () {
//                 _reload(window, window.document, window.jQuery);
//             }, 100);
//             return;
//         }

//         $(function () {
//             var script_file = '';
//             script_file += '<script src="/vanilla/resources/js/ui.plugins.js"></script>';
//             script_file += '<script src="/vanilla/resources/js/ui.common.js"></script>';
//             script_file += '<script src="/vanilla/resources/js/ui.page.js"></script>';

//             $('head').append(script_file);
//         });
//     }
//     _reload(window, window.document, window.jQuery);
// })();

;(function ($, win, doc, undefined) {
    console.log('base.js')

    var script_file = '';
    //script_file += '<script src="/vanilla/resources/js/lib/jquery.smoothwheel.js"></script>';
    
    script_file += '<script src="/vanilla/resources/js/ui.global.js"></script>';
    script_file += '<script src="/vanilla/resources/js/ui.plugins.js"></script>';
    script_file += '<script src="/vanilla/resources/js/ui.common.js"></script>';
    script_file += '<script src="/vanilla/resources/js/ui.page.js"></script>';

    script_file += '<script src="/vanilla/resources/js/ui.plugins.accordion.js"></script>';
    script_file += '<script src="/vanilla/resources/js/ui.plugins.bricklist.js"></script>';

    script_file += '<script src="/vanilla/resources/js/ui.plugins.capture.js"></script>';
    script_file += '<script src="/vanilla/resources/js/ui.plugins.count.js"></script>';
    script_file += '<script src="/vanilla/resources/js/ui.plugins.codinglist.js"></script>';

    script_file += '<script src="/vanilla/resources/js/ui.plugins.datepicker.js"></script>';
    script_file += '<script src="/vanilla/resources/js/ui.plugins.dropdown.js"></script>';

    script_file += '<script src="/vanilla/resources/js/ui.plugins.fileupload.js"></script>';
    script_file += '<script src="/vanilla/resources/js/ui.plugins.floating.js"></script>';
    script_file += '<script src="/vanilla/resources/js/ui.plugins.floatingrange.js"></script>';

    script_file += '<script src="/vanilla/resources/js/ui.plugins.inputclear.js"></script>';

    script_file += '<script src="/vanilla/resources/js/ui.plugins.loading.js"></script>';

    script_file += '<script src="/vanilla/resources/js/ui.plugins.menu.js"></script>';
    script_file += '<script src="/vanilla/resources/js/ui.plugins.modal.js"></script>';

    script_file += '<script src="/vanilla/resources/js/ui.plugins.print.js"></script>';
    script_file += '<script src="/vanilla/resources/js/ui.plugins.select.js"></script>';
    script_file += '<script src="/vanilla/resources/js/ui.plugins.selection.js"></script>';
    script_file += '<script src="/vanilla/resources/js/ui.plugins.slide.js"></script>';
    script_file += '<script src="/vanilla/resources/js/ui.plugins.slider.js"></script>';

    script_file += '<script src="/vanilla/resources/js/ui.plugins.tab.js"></script>';
    script_file += '<script src="/vanilla/resources/js/ui.plugins.tooltip.js"></script>';

    script_file += '<script src="/vanilla/resources/js/ui.plugins.scrollbox.js"></script>';

    

    $('head').append(script_file);

})(jQuery, window, document);	