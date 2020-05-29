;(function($, win, doc, undefined) {

    'use strict';
    
    $plugins.common = {
 
        init: function(){
            $plugins.uiAjax({ id:'baseHeader', url:'/asever/html/inc/header.html', page:true, callback:$plugins.common.header });
            $plugins.uiAjax({ id:'baseFooter', url:'/asever/html/inc/footer.html', page:true, callback:$plugins.common.footer });
            
            console.log('------------------------------------------------------')
            
            // !$.browser.mobile ? 
            //     $plugins.uiScrolling({ 
            //         scrollpow: $(win).outerHeight() / 4,
            //         scrlltime : 300,
            //         callback: function(v){headerChange(v)}   
            //     }) : '';
            //$('#baseWrap').smoothWheel();

            $(win).on('scroll', function(){
               headerChange($(win).scrollTop())
            });

            function headerChange(v){
                v > 0 ? $('body').addClass('type-mini'): $('body').removeClass('type-mini');
            }
            
            $plugins.uiCaption();
        },
        
        header: function(){
            console.log('header load');
            $plugins.uiAjax({ id:'baseAside', url:'/asever/html/inc/aside.html', page:true });
            $plugins.common.pageid === undefined ? $plugins.common.pageid = "G00_00_00_00" : '';
            
            var timer = '';
            $('.btn-menu').on('click', function(){
                menuSwitch();
            });
            $(doc).on('click', '.menu-dim', function(){
                menuHide();
            });
            function menuSwitch(){
                !$('.btn-menu').data('on') ? menuShow() :  menuHide();
            }
            function menuShow(){
                $('.btn-menu').data('on', true);
                $('body').addClass('menu-on');
                clearTimeout(timer);
                timer = setTimeout(function(){
                    $('#uiMenu').addClass('on');
                    $('.menu-dim').addClass('on');
                }, 10);
            }
            function menuHide(){
                $('.btn-menu').data('on', false);
                $('#uiMenu').removeClass('on');
                $('.menu-dim').removeClass('on');
                clearTimeout(timer);
                timer = setTimeout(function(){
                    $('body').removeClass('menu-on');
                }, 300);
            }

            $plugins.uiMenu({ 
                url:'/asever/resources/data/menu.json', 
                ctg:'가이드', 
                selected: $plugins.common.pageid, 
                callback: fncallback 
            });
        
            function fncallback(opt){
                var d1 = opt.d1,
                    d2 = opt.d2,
                    d3 = opt.d3,
                    current = opt.current,
                    navi = opt.navi,
                    $gnb = $('#uiGNB'),
                    $lnb = $('#uiLNB'),
                    $menu = $('#uiMenu');

                //menu 구성
                $gnb.append(d1);
                $lnb.append(d1);
                $menu.append(d1);

                $menu.find('.dep-1').each(function(i){
                    $(this).append(d2[i]);
                });

                $lnb.find('.dep-1').not('.selected').remove();
                $lnb.find('.dep-1.selected').append(d2[current[0]]);
                // /$lnb.find('.dep-2-wrap').not('.selected').remove();
                $plugins.common.baseSetting(navi);

                // $menu.find('.dep-3-wrap').each(function(){
                //     var menu_html = this;

                //     $menu.find('.dep-2[data-n="'+ $(menu_html).data('dep2') +'"]').append(menu_html);
                // });
                // $menu.find('.dep-2-wrap').addClass('ui-acco').attr('id','exeGuideMenu');
                // $menu.find('.dep-2').addClass('ui-acco-wrap');
                // $menu.find('.dep-2 > div').addClass('ui-acco-tit');
                // $menu.find('.dep-2-btn').addClass('ui-acco-btn');
                // $menu.find('.dep-3-wrap').addClass('ui-acco-pnl');
                // $menu.find('.dep-3-btn').addClass('ui-ajaxpage-btn');
                // $plugins.uiAccordion({ id:'exeGuideMenu', current:[current[1]] });

                // $plugins.common.baseSetting(navi);

                // $menu.find('.dep-3-btn').on('click', function(){
                //     $menu.find('.dep-3-btn').removeClass('selected').attr('aria-selected', false);
                //     $(this).addClass('selected').attr('aria-selected', true);

                //     if ($.browser.mobile) {
                //         $('#uiMenuToggle').data('on', false);
                //         $('.nav-wrap').fadeOut(200);
                //     } 
                // });
            }
           
            $('#uiMenuToggle').on('click', function(){
                if (!$('#uiMenuToggle').data('on')) {
                    $('#uiMenuToggle').data('on', true);
                    $('.nav-wrap').fadeIn(200);
                } else {
                    $('#uiMenuToggle').data('on', false);
                    $('.nav-wrap').fadeOut(200);
                }
            });
        },
        baseSetting: function(navi){
            var navi_len = navi.length,
                html_navi = '',
                tit = navi[navi.length - 1] === undefined ? '' : navi[navi.length - 1];

            //content title
            $('#uiPageTit').html(tit);

            //head title
            $('head title').text(tit + ' - Netive UI');

            //navigation
            html_navi += '<div class="navi-wrap">';
            for (var i = 0; i < navi_len; i++) {
                i !== 0 ? html_navi += '<span>&gt;</span>' : '';
                html_navi += i === navi_len - 1 ? '<strong>'+ navi[i] +'</strong>' : '<span>'+ navi[i] +'</span>';
            }
            html_navi += '</div>';

            $('#baseMain').prepend(html_navi);
        },
        footer: function(){
            console.log('footer load');
        }
    };

    //modal
    

    //page 
    $plugins.page = {}

    //callback
    $plugins.callback = {
        modal: function(modalId){
            switch(modalId) {
                case 'modalID':
                    break;  

                    
            }
        }
    }
   
    $(doc).ready(function() {
        var timer,
            n = 0;

        pageCodeIs();
        
        function pageCodeIs(){
            console.log('common.js ready?')
            if ($plugins.common.pageid === undefined && n < 10) {
                n = n + 1;
                delayExe();
            } else {
                console.log('common.js ok')
                clearTimeout(timer);
                $plugins.common.init();
                $('body').stop().animate({
                    opacity:1
                }, 150);
            }
        }
        function delayExe(){
            clearTimeout(timer);
            timer = setTimeout(function() {
                console.log('common.js no')
                pageCodeIs();
            }, 0);
        }
	});
})(jQuery, window, document);
