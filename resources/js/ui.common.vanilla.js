;(function(win, doc, undefined) {

    'use strict';
    
    $plugins.common = {
 
        init: function(){
            console.log('init');
            $plugins.uiAjax({ 
                id: 'baseHeader', 
                url: '/asever/html/inc/header.html', 
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
                autoclose: false
            });
            $plugins.common.menuAjax();
            
        },
        menuAjax: function(){
            console.log(11111111)
            doc.querySelectorAll('.dep-2-btn').forEach(function(btn, index){
                btn.on('click.ajax', function(){
                    $plugins.uiAjax({ 
                        id: 'baseMain', 
                        url: this.getAttribute('data-href'), 
                        page: true, 
                        callback: callbackJs
                    });
                });
            }); 

            function callbackJs(){
                if(typeof(history.pushState) == 'function') {
                   
                    //현재 주소를 가져온다.
                    var renewURL = location.href;
                    //현재 주소 중 page 부분이 있다면 날려버린다.
                    renewURL = renewURL.replace(/\&page=([0-9]+)/ig,'');
                    
                    //새로 부여될 페이지 번호를 할당한다.
                    // page는 ajax에서 넘기는 page 번호를 변수로 할당해주거나 할당된 변수로 변경
                    renewURL += 'loading/';
                    
                    //페이지 갱신 실행!
                    history.pushState({ 'page_id': 1, 'user_id': 5 }, 'loading', renewURL);
                }
            }
        },
        baseSetting: function(navi){
            
        },
        footer: function(){
            console.log('footer load');
        }
    };
})(window, document);
