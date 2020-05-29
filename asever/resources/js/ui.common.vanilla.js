;(function(win, doc, undefined) {

    'use strict';
    
    $plugins.common = {
 
        init: function(){
            console.log('init');
            $plugins.uiAjax({ 
                id: 'baseHeader', 
                url: '/vanilla/html/inc/header.html', 
                page: true, 
                callback: $plugins.common.header
            });

            
            console.log('------------------------------------------------------');

            win.off('scroll.win', headerChange).on('scroll.win', headerChange);

            function headerChange(){
                var $body = doc.querySelector('body');
                var sct = window.scrollY || document.documentElement.scrollTop;

                sct > 0 ? $body.classList.add('type-mini') : $body.classList.remove('type-mini');
            }

        },
        header: function(){
            console.log('header load');

            $plugins.uiAccordion({ 
                id: 'exeLNB', 
                current: 'all', 
                autoclose: false, 
                callback: function(v){console.log(v)} 
            });            

            
        },
        baseSetting: function(navi){
            
        },
        footer: function(){
            console.log('footer load');
        }
    };
})(window, document);
