;(function ($, win, doc, undefined) {

	'use strict';

	var $ui = win.$plugins,
        namespace = 'netiveUI.plugins';

    $ui = $ui.uiNameSpace(namespace, {
        uiSimpleModalOpen: function (opt) {
            return createUiSimpleModalOpen(opt);
        },
        uiSimpleModalClose: function (opt) {
            return createUiSimpleModalClose(opt);
        }
    });
    $ui.uiSimpleModalOpen.option = {
        wrap: 'BODY',
        full: false,
        ps: 'center'
    }
    function createUiSimpleModalOpen(v) {
        const opt = $.extend(true, {}, $ui.uiSimpleModalOpen.option, v),
            wrap = opt.wrap,
            id = opt.id,
            src = opt.src,
            full = opt.full,
            ps = opt.ps,
            endfocus = opt.endfocus === undefined ? document.activeElement : '#' + opt.endfocus,
            callback = opt.callback === undefined ? false : opt.callback;

        let timer;

        if (!!src) {
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
            const $modal = $('#' + id);

            $('.ui-modal-simple').removeClass('current');
            $modal.addClass('n' + $('.ui-modal-simple.open').length + ' current');
            
            !!full ? $modal.addClass('ready type-full') : $modal.addClass('ready type-normal');
            //$('body').css('overflow', 'hidden');

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
            }

            clearTimeout(timer);
            timer = setTimeout(function(){
                $modal.addClass('open').data('endfocus', endfocus);
                callback ? callback(opt) : '';

                if ($modal.find('.ui-modal-cont').outerHeight() > $(win).outerHeight(true) - 20 && !full) {
                    $modal.find('.ui-modal-wrap').css('height', '100%');
                }

                //$modal.find('.ui-modal-head h1').attr('tabindex', '0').foucs();
            },150);
        }
    }
    $ui.uiSimpleModalClose.option = {
        remove: false
    }
    function createUiSimpleModalClose(v) {
        const opt = $.extend(true, {}, $ui.uiSimpleModalClose.option, v),
            id = opt.id,
            remove = opt.remove,
            $modal = $('#' + id),
            endfocus = opt.endfocus === undefined ? $modal.data('endfocus') : '#' + opt.endfocus,
            callback = opt.callback === undefined ? false : opt.callback;
        
        let timer;

        $modal.removeClass('open');
        $('.ui-modal-simple.open.n' + ($('.ui-modal-simple.open').length - 1)).addClass('current');

        clearTimeout(timer);
        timer = setTimeout(function(){
            $modal.removeClass('ready ps-bottom ps-top ps-center type-normal type-full');
            //$('body').css('overflow', 'initial');

            callback ? callback(opt) : '';
            remove ? $modal.remove() : '';
            !!endfocus ? endfocus.focus() : '';
        },150);
    }

    /* ------------------------------------------------------------------------
    * name : modal layer popup
    * Ver. : v1.0.0
    * date : 2018-12-21
    * EXEC statement
    * - $plugins.uiModal({ option });
    * - $plugins.uiModalClose({ option });
    * - $plugins.uiModalResize({ option });
    * - $plugins.uiCookieModal({ option });
    * - $plugins.uiCookieModalClose({ option });
    ------------------------------------------------------------------------ */
    $ui = $ui.uiNameSpace(namespace, {
        uiModal: function (opt) {
            return createUiModal(opt);
        },
        uiModalClose: function (opt) {
            return createUiModalClose(opt);
        },
        uiModalResize: function (opt) {
            return createUiModalResize(opt);
        },
        uiCookieModal: function (opt) {
            return creaeteUiCookieModal(opt);
        },
        uiCookieModalClose: function (opt) {
            return creaeteUiCookieModalClose(opt);
        }
    });
    $ui.uiModal.option = {
        autofocus: true,
        endfocus: null,
        full: false,
        link: false,
        remove: false,
        ps: 'center',
        callback: false,
        openback: false,
        closeback: false,
        space: 10,
        ajax_type: 'GET',
        open: true,
        mpage: false,
        cutline: 31,

        system_words: false,
        system_btntxt1: false,
        system_btntxt2: false,
        system_class: false,

        terms_tit: false,
        terms_url: false,

        iname: false,
        ititle: '빈프레임',
        isrc: false,
        icallback: false,

        born: false,
        sctarray : []
    };
    function createUiModal(opt) {
        var opt = $.extend(true, {}, $ui.uiModal.option, opt);
        
        if ($('#' + opt.id + '[opened="true"]').length > 0) {
            return false;
        }

        //ifarme modal : 아이프레임주소와 아이디 필수
        if (!!opt.isrc && !$('#' + opt.id).length) {
            var iname = opt.iname,
                ititle = opt.ititle,
                isrc = opt.isrc,
                iwidth = opt.iwidth === undefined ? $ui.browser.mobile ? '100%' : 965 : opt.iwidth,
                iheight = opt.iheight === undefined ? $ui.browser.mobile ? '100%' : $(win).outerHeight() - 20 : opt.iheight,
                icallback = opt.icallback,
                remove = opt.remove,
                iclosecallback = opt.iclosecallback,
                modal_html = '',
                parasrc = opt.isrc;

            if (opt.isrc.split('?').length > 1) {
                parasrc = parasrc + '&uiType=F' 
            } else {
                parasrc = parasrc + '?uiType=F' 
            }

            if ($ui.browser.mobile) {
                iwidth = '100%';
                iheight = $(win).outerHeight();
            } 

            modal_html += '<section class="ui-modal iframe-modal" id="' + opt.id + '" aria-hidden="true">';
            modal_html += '<div class="ui-modal-wrap">';
            modal_html += '<div class="ui-modal-iframe" data-orgw="' + iwidth + '" data-orgh="' + iheight + '" style="height:' + iheight + 'px;">';
            modal_html += '<iframe id="' + iname + '" name="' + iname + '" src="' + parasrc + '" width="' + iwidth + '" height="' + iheight + '" title="' + ititle + '" orgw="' + iwidth + '" orgh="' + iheight + '"></iframe>';
            modal_html += '</div>';
            !$ui.browser.mobile ?
                modal_html += '<button type="button" class="btn-close ui-modal-closecallback" onclick="$plugins.uiModalClose({ id:\'' + opt.id + '\', remove: ' + remove + ' })"><span>닫기</span></button>' : '';
            modal_html += '</div>';
            modal_html += '</section>';

            if (!!opt.born) {
                var $local = typeof opt.born === 'string' ? $('#' + string) : opt.born;

                $local.append(modal_html);
            } else {
                !!$('#baseLayer').length ? $('#baseLayer').prepend(modal_html) : $('body').append(modal_html);
            }

            $('#' + opt.id).data('iccb', { callback: iclosecallback });

            $(doc).off('click.closecallback').on('click.closecallback', '.ui-modal-closecallback', function () {
                if (!!$(this).closest('.ui-modal').data('iccb')) {
                    var cc = $(this).closest('.ui-modal').data('iccb');
                    !!cc && !!cc.callback ? cc.callback() : '';
                }
            });

            if ($ui.browser.ie8) {
                $('#' + opt.id).data('iframeload', true);
            } 
            
            $('#' + iname).on('load', function(){
                $('#' + opt.id).data('iframeload', true);
                //$ui.callback !== undefined ? frames[iname].$ui.callback.modal(opt.id) : '';
                !!icallback ? icallback() : '';

                /* 2018-11-26 : IOS iframe fixed bug */
                // if ($ui.browser.mobile && $ui.browser.ios) {
                // 	frames[iname].find('#wrapIframe').css({ 
                // 		'max-height':$(win).outerHeight(),
                // 		'overflow' : 'scroll'
                // 	});
                // } 

            });
            // document.getElementById(iname).onload = function () {
            // 	$('#' + opt.id).data('iframeload', true);
            // 	$ui.callback !== undefined ? frames[iname].$plugins.callback.modal(opt.id) : '';
            // 	!!icallback ? icallback() : '';
            // };
            
            uiModalOpen(opt);
        }
        console.log(!opt.link)
        if (!opt.link) {
            //모달코드가 이미 페이지안에 있을 경우
            ($('#' + opt.id).attr('aria-hidden') === 'true') ? uiModalOpen(opt) : '';
        } else {
            // Ajax 모달 
            !!$('#' + opt.id).length ?
                uiModalOpen(opt) :
                $ui.uiAjax({
                    id: !!opt.born ? opt.born : !$('#baseLayer').length ? opt.born = $('body') : 'baseLayer',
                    url: opt.link,
                    page: true,
                    prepend:true,
                    type: opt.ajax_type,
                    add: true,
                    callback: function () {
                        uiModalOpen(opt);
                    }
                });
        }
    }
    function uiModalOpen(opt) {
        
        var $modal = $('#' + opt.id),
            $modalWrap = $modal.find('.ui-modal-wrap'),
            $modalTit = $modal.find('.ui-modal-header'),
            $modalCont = $modal.find('.ui-modal-cont'),
            $modalFoot = $modal.find('.ui-modal-footer'),

            autofocus = opt.autofocus,
            born = opt.born,
            endfocus = opt.endfocus === null ? document.activeElement : '#' + opt.endfocus,
            w = opt.width === undefined ? Math.ceil($modal.outerWidth()) : opt.width,
            h = opt.height === undefined ? Math.ceil($modal.outerHeight()) : opt.height,

            full = opt.full,
            mpage = opt.mpage,
            remove = opt.remove,
            ps = opt.ps, 
            callback = opt.callback,
            openback = opt.openback,
            closeback = opt.closeback,
            modalSpace = opt.space,
            open = opt.open,
            cutline = opt.cutline,

            win_h = $(win).outerHeight(),
            win_w = $(win).outerWidth(),
            overH = win_h <= h,
            overW = win_w <= w,
            h_h,
            f_h,

            timer,
            timer_resize,
            layN,
            re_num = 0,
            re_timer,

            //system
            system_words = opt.system_words,
            system_btntxt1 = opt.system_btntxt1,
            system_btntxt2 = opt.system_btntxt2,
            system_class = opt.system_class,

            //terms
            terms_tit = opt.terms_tit,
            terms_url = opt.terms_url,

            //iframe
            iname = opt.iname,
            ititle = opt.ititle,
            isrc = opt.isrc,
            iwidth = (opt.iwidth === undefined) ? $modal.find('iframe').attr('width') : opt.iwidth,
            iheight = (opt.iheight === undefined) ? $modal.find('iframe').attr('height') : opt.iheight,
            icallback = opt.icallback,
            
            //state
            is_mobile = $ui.browser.mobile,
            is_full_h,
            is_full_w,
            is_iframe,
            zidx,
            iw,
            ih,
            __h,
            laywrap_h,
            h_cont = 'auto';
        
        modalType();

        //MODAL TYPE -------------------------------------------------
        function modalType(){
            
            //type terms modal
            if (terms_url) {
                if (is_mobile) {
                    full = true;
                    modalSpace = 0;
                    $modal.addClass('type-full');
                }	
                $ui.uiAjax({ id: opt.id + '_cont', url: terms_url, page: true });
                $modalTit.find('.tit-h1').text(terms_tit);
            }

            //type alert & comfirm modal
            if (system_words) {
                system_words && is_mobile ? opt.width = win_w > 400 ? 400 : win_w - (modalSpace * 2) : '';
                $modal.find('#modalSystemTxt').append(system_words);
                $modal.find('.ui-modal-cont').removeClass().addClass('ui-modal-cont').addClass(system_class);

                !!system_btntxt1 ? $modal.find('#modalSystemBtn1').text(system_btntxt1) : '';
                !!system_btntxt2 ? $modal.find('#modalSystemBtn2').text(system_btntxt2) : '';
            }

            //type full modal
            if (mpage & is_mobile) {
                // /full = true;
                modalSpace = 0;
                $modal.addClass('type-full');
            }
            
            $ui.uiModal.option.sctarray.push($(win).scrollTop());

            console.log($ui.uiModal.option.sctarray)

            open ? modalReady() : '';
        }

        //MODAL READY -------------------------------------------------
        function modalReady(){
            $('body').removeClass('modal-full');
            $('body').addClass('modal-open');
            $('#baseWrap').attr('aria-hidden', true);
            $modal.attr('opened', true)
                .data('opt', opt)
                .data('endfocus', endfocus)
                .data('autofocus', autofocus)
                .data('scrolltop', $(win).scrollTop())
                .attr('aria-hidden', false)
                .find('.tit-h1').eq(0).attr('id', opt.id + '-tit');

            $modal.siblings('.ui-modal').attr('aria-hidden', true);
            
            switch(ps) {
                case 'top' : 
                    $modal.addClass('ps-top');
                    break;
                case 'bottom' : 
                    $modal.addClass('ps-bottom');
                    break;
            }

            //single or period modal
            layN = $('.ui-modal[opened="true"]').length;
            opt.zindex !== undefined ? opt.zindex !== null ? zidx = opt.zindex : zidx = layN : zidx = layN;
            $modal.css({
                zIndex: born ? zidx + 20 : zidx,
                position: 'fixed'
            }).attr('n', zidx);

            //모달생성 설정 
            switch(ps) {
                case 'center':
                    $modal.css({ 
                        display: 'block', 
                        top: is_mobile ? '100%' : '50%', 
                        opacity: 0
                    });
                    break;
                case 'top':
                    $modal.css({ 
                        display: 'block', 
                        opacity: 0
                    });
                    break;
                case 'bottom':
                    $modal.css({ 
                        display: 'block', 
                        bottom: '-100%',
                        opacity: 0
                    });
                    break;
            }
            
            modalApp({ resize: false });
        }

        //MODAL APPLICATION -------------------------------------------------
        //- resize: resize이벤트 일 경우 true, 아닌 경우 false
        function modalApp(v) {
            //초기화 및 세팅
            win_h = $(win).outerHeight();
            win_w = $(win).outerWidth();

            //resize modal 크기 변화가 없을 시
            if (win_w > $modal.outerWidth() && win_h > $modal.outerHeight() && v.resize && !is_mobile) {
                $('body').removeClass('modal-full');
                return false; 
            } 
            
            if (v.resize) {
                $('body').addClass('modal-full');
                return false;
            } 
            
            $modalCont.css({ 
                height: 'auto',
                maxHeight: 'none',
                minHeight: 'none'
            }).attr('tabindex', 0);

            $modal.css({ height: 'auto' });
            //!full ? $modal.css({ height: 'auto' }) : '';
            //modal height 100 작거나 iframeload 전 일때 재 실행, resize 옵션 false 일경우
            if ($modalCont.outerHeight() < cutline && $modal.data('iframeload') === undefined && !v.resize ) {
                if (re_num === 0) {
                    $ui.uiLoading({ visible: true });
                    re_num = re_num + 1;
                }

                re_timer = setTimeout(function () {
                    modalApp({ resize: false  });
                }, 500);

                return false;
            } 

            //modal content load ok!! 
            h_h = !!$modalTit.length ? $modalTit.outerHeight() : 0;
            f_h = !!$modalFoot.outerHeight() ? $modalFoot.outerHeight() : 0;

            var h_type_a = !!h_h && !!f_h,//title, footer
                h_type_b = !!h_h && !f_h,//only title
                h_type_c = !h_h && !!f_h,//only footer
                h_type_d = !h_h && !f_h;//not title, footer

            //$modalCont height setup
            if (full) {
                h_type_a ? __h = Math.ceil(win_h - h_h - f_h - (modalSpace * 2)) : '';
                h_type_b ? __h = Math.ceil(win_h - h_h - (modalSpace * 2)) : '';
                h_type_c ? __h = Math.ceil(win_h - f_h - (modalSpace * 2)) : '';
                h_type_d ? __h = Math.ceil(win_h - (modalSpace * 2)) : '';
                h_cont = __h;

                if (!is_mobile) {
                    $modalCont.css('max-height', __h);
                    $modalCont.css('height', __h);
                }
            } else {
                if (!opt.height) {
                    $modalCont.css('max-height', 'auto');
                    laywrap_h = $modalWrap.outerHeight();

                    laywrap_h > win_h ? laywrap_h = win_h : '';

                    h_type_a ? __h = Math.ceil(laywrap_h - h_h) : '';//title, footer
                    h_type_b ? __h = Math.ceil(laywrap_h - h_h) : '';//only title
                    h_type_c ? __h = Math.ceil(laywrap_h) : '';//only footer
                    h_type_d ? __h = Math.ceil(laywrap_h) : '';//not title, footer

                    win_h < __h + (modalSpace * 2) + h_h + f_h ? __h =  win_h - f_h - h_h - (modalSpace * 2) : '';
                    h_cont = __h;

                    $modalCont.css('max-height', __h);
                    $modalCont.css('height', __h);
                } else {
                    $modalCont.css('max-height', Math.ceil(opt.height - h_h));
                    $modalCont.css('height', Math.ceil(opt.height - h_h));
                }
            }

            h = (opt.height === undefined) ? Math.ceil($modal.outerHeight()) : opt.height;
            w = (opt.width === undefined) ? Math.ceil($modal.outerWidth() + 1) : opt.width;

            //resize일 경우 원래 크기로 돌아가기.
            // if (!!$modal.data('orgw') || !!$modal.data('orgh') && !is_mobile) {
            // 	h = Number($modal.data('orgh'));
            // 	w = Number($modal.data('orgw'));
            // }

            overH = win_h <= h;
            overW = win_w <= w;

            if (!is_mobile) {
                overW ? $('body').addClass('modal-full') : $('body').removeClass('modal-full');
            }

            is_full_h = overH || full || mpage;
            is_full_w = overW || full || mpage;
            is_iframe = !!$modal.find('.ui-modal-iframe').length;
            iw = $modal.find('.ui-modal-iframe').data('orgw');
            ih = $modal.find('.ui-modal-iframe').data('orgh');

            //full ? is_full_h = true : '';
            // if (is_full_h) {
            // 	//full
            // 	$modalCont.css({ height: Math.ceil(win_h - (h_h + f_h) - (modalSpace * 2)) + 'px' });
            // 	win_h < ih ?
            // 		$modal.find('.ui-modal-iframe iframe').attr('height', win_h - (modalSpace * 2)) :
            // 		$modal.find('.ui-modal-iframe iframe').attr('height', ih);

            // 	$modal.css('height', win_h - (modalSpace * 2));
            // } else {
            // 	!!words ? $modalCont.css({ hegiht: 'auto', maxHeight: 'none' }) : '';
            // 	h = !!f_h ? h + f_h : h;
            // 	$modal.css('height', h);
            // }

            !!system_words ? $modalCont.css({ maxHeight: 'none' }) : '';
                h = !!f_h ? h + f_h : h;
                $modal.css('height', h);

            if (!v.resize) {
                if (is_mobile) {
                    //modal
                    switch(ps) {
                        case 'center':
                            $modal.css({
                                opacity: 0,
                                width: is_full_w ? '100%' : w,
                                height: is_full_h ? '100%' : h,
                                left: is_full_w ? 0 : '50%',
                                top: is_full_h ? '100%' : '50%',
                                marginTop: is_full_h ? 0 : (h / 2) * -1,
                                marginLeft: is_full_w ? 0 : (w / 2) * -1
                            });
                            break;
                        case 'top':
                            $modal.css({
                                opacity: 0,
                                width: '100%',
                                height: is_full_h ? '100%' : h,
                                left: 0,
                                top: 0,
                                marginTop: 0,
                                marginLeft: 0
                            });
                            break;
                        case 'bottom':
                            $modal.css({
                                opacity: 0,
                                width: '100%',
                                height: is_full_h ? '100%' : h,
                                left: 0,
                                bottom: 0,
                                marginTop: 0,
                                marginLeft: 0
                            });
                            break;
                    }
                } else {
                    //desktop
                    $modal.css({
                        opacity: v.resize ? 1 : 0,
                        left: '50%',
                        width: w,
                        height: system_words ? 'auto' : h,
                        marginLeft: is_iframe ? (iw / 2) * -1 : (w / 2) * -1
                    });
                    switch(ps) {
                        case 'center':
                            $modal.css({
                                top: '50%',
                                marginTop: (h / 2) * -1,
                            });
                            break;
                        case 'top':
                            $modal.css({
                                top: 0,
                                marginTop: modalSpace,
                            });
                            break;
                        case 'top':
                            $modal.css({
                                bottom: 0,
                                marginTop: modalSpace,
                            });
                            break;
                    }
                }

                $ui.uiLoading({ visible: false });

                //modal backdrop setup
                if (layN === 1) {
                    modalBackdrop('open', born);
                } else {
                    $('body').removeClass('modal-full');
                    $modal.attr('aria-hidden', false);
                    //if (!words) { $modal.css({ top: 0 }); }
                    if (!$modal.closest('#baseLayer').length || !!born) {
                        $('#baseLayer').addClass('under').find('.modal-backdrop').css('opacity', 0);

                        if (!!$('body > .modal-backdrop').length) {
                            $('body > .modal-backdrop').css('z-index', zidx + 20 - 1).attr('n', layN + 20 - 1);
                        } else {
                            $('body').append('<div class="modal-backdrop out on" style="display:block; width:101%; height:101%; opacity:0.7; z-index:' + (zidx + 20 - 1) + '" n="'+ (layN + 20 - 1) +'" ></div>');
                        }
                    } else {
                        $('.modal-backdrop').css('z-index', layN - 1).attr('n', layN);
                    }
                }

                //$modalCont.css('height', h_cont - 1);

                //alert, confirm modal 제외
                if (!system_words) {
                    if (window.mCustomScrollbar && !iname && isMscroll) {
                        //pc모드, 아이프레임X,
                        $modalCont.mCustomScrollbar({ scrollButtons: { enable: true } });
                    }
                }
                $modal.addClass('view');

                if (is_mobile && mpage) {
                    //모바일 전체모달레이어 show 모션 효과
                    //$modal.find('.ui-floating').removeClass('.ui-fixed-top').find('.ui-floating-wrap').removeAttr('style');
                    console.log(ps)
                    if (ps !== 'bottom') {
                        $modal.css({ 'min-height': $(win).outerHeight(), background: '#fff' })
                            .animate({
                                opacity: 1, 
                                top: 0
                            }, 365, 'easeInOutQuart', function () {
                                $('body').addClass('modal-full');
                                modalCompleted();
                            });
                    } else {
                        $modal.css({ 'min-height': $(win).outerHeight(), background: '#fff' })
                            .animate({
                                opacity: 1, 
                                bottom: 0
                            }, 365, 'easeInOutQuart', function () {
                                $('body').addClass('modal-full');
                                modalCompleted();
                            });
                    }
                    
                } else {
                    //$modal.css('opacity', 1);
                    $modal.stop().animate({
                        opacity: 1
                    }, 150, function(){
                        modalCompleted();
                    });
                }
            }
            function modalCompleted() {
                !!callback ? callback() : '';				

                $ui.uiFocusTab({
                    selector: '#' + opt.id
                });
                $modal.data('orgw', w).data('orgh', h);
                
                window.mCustomScrollbar && isMscroll ?
                    setTimeout(function () {
                        $modalCont.mCustomScrollbar('update');
                    }, 0) : '';

                if (is_iframe) {
                    //$ui.browser.ie8 ? frames[opt.iname].$plugins.page.formReset() : '';
                    if (!$ui.browser.ie8) {
                        window.mCustomScrollbar && isMscroll ?
                            frames[opt.iname].$('.wrap-iframe').mCustomScrollbar({ scrollButtons: { enable: true } }) : '';
                        // $ui.callback !== undefined ? frames[opt.iname].$plugins.callback.modal(opt.id) : '';
                    }
                }

                !!system_words ? '' : 
                $ui.callback !== undefined ? $plugins.callback.modal(opt.id) : '';
                !!openback ? openback() : '';

                //!words ? $ui.uiModalResize({ id: opt.id }) : '';
            }
        }

        //event 
        if (!is_mobile) {
            $(win).resize(function () {
                clearTimeout(timer_resize);
                timer_resize = setTimeout(function(){
                    if ($('.ui-modal[aria-hidden="false"]').length) {
                        //$('.ui-modal[aria-hidden="false"] .ui-modal-cont').removeAttr('style');
                        modalApp({ resize: true });
                    }
                },100);
            });
        }
        $modal.find('.ui-modal-close').off('click.uilayerpop').on('click.uilayerpop', function (e) {
            e.preventDefault();
            $ui.uiModalClose({ id: opt.id });
        });
    }
    function createUiModalResize(opt) {
        var opt = $.extend(true, {}, $('#' + opt.id).data('opt'), opt),
            $modal = $('#' + opt.id),
            _opt = $modal.data('opt'),
            $modalWrap = $modal.find('.ui-modal-wrap'),
            $modalTit = $modal.find('.ui-modal-tit'),
            $modalCont = $modal.find('.ui-modal-cont'),
            $modalFoot = $modal.find('.ui-modal-footer'),
            f_h,
            h_h,
            w = _opt.width === undefined ? Math.ceil($modal.outerWidth()) : _opt.width,
            h = _opt.height === undefined ? Math.ceil($modal.outerHeight()) : _opt.height,
            system_words = _opt.system_words === undefined ? false : _opt.system_words,
            terms_url = _opt.terms_url === undefined ? false : _opt.terms_url,
            modalSpace = 10,
            full = _opt.full === undefined ? false : _opt.full,
            win_h = $(win).outerHeight(),
            win_w = $(win).outerWidth(),
            overH = win_h <= h,
            overW = win_w <= w,
            iname = _opt.iname === undefined ? false : _opt.iname,
            h_cont,
            timer,
            is_full_w,
            is_full_h,
            layN,
            is_iframe,
            zidx,
            iw,
            ih,
            __h,
            laywrap_h,
            is_mobile = $ui.browser.mobile;

        if (is_mobile) {
            return false;
        }
        //초기화 및 세팅
        $modalCont.css({ height: 'auto', maxHeight: 'none' });
        $modal.css({ height: 'auto', width: 'auto' });
        $modal.find('.mCustomScrollBox').css({ maxHeight: 'none' });

        h_h = !!$modalTit.length ? $modalTit.outerHeight() : 0;
        f_h = !!$modalFoot.outerHeight() ? $modalFoot.outerHeight() : 0;
        
        setTimeout(function(){
            review();
        },100);

        function review(){
            
            if (full) {
                if (!opt.height) {
                    !!h_h && !!f_h ? __h = Math.ceil(win_h - (h_h)) : '';
                    !!h_h && !f_h ? __h = Math.ceil(win_h - h_h) : '';
                    !h_h && !!f_h ? __h = Math.ceil(win_h) : '';
                    !h_h && !f_h ? __h = Math.ceil(win_h) : '';
                    $modalCont.css('max-height', __h);
                    $modalCont.css('height', __h);
                    h_cont = __h;
                } else {
                    $modalCont.css('max-height', Math.ceil(opt.height - (h_h)));
                    $modalCont.css('height',  Math.ceil(opt.height - (h_h)));
                }
            } else {
                if (!opt.height) {
                    //$modalCont.css('max-height', 'none');
                    laywrap_h = $modal.find('.ui-modal-wrap').outerHeight();
                    if (laywrap_h > win_h) {
                        laywrap_h = win_h;
                        !!h_h && !!f_h ? __h = Math.ceil(laywrap_h - (h_h)) : '';
                        !!h_h && !f_h ? __h = Math.ceil(laywrap_h - h_h) : '';
                        !h_h && !!f_h ? __h = Math.ceil(laywrap_h) : '';
                        !h_h && !f_h ? __h = Math.ceil($modalWrap.height()) : '';
                        __h = __h;
                        $modalCont.css('max-height', __h);
                        $modalCont.css('height',  __h);
                        h_cont = __h;
                    } 
                } else {
                    $modalCont.css('max-height', Math.ceil(opt.height - (h_h)));
                    $modalCont.css('height', Math.ceil(opt.height - (h_h)));
                }
            }

            h = (opt.height === undefined) ? Math.ceil($modal.outerHeight()) : opt.height;
            w = (opt.width === undefined) ? Math.ceil($modal.outerWidth()) : opt.width;

            overH = win_h <= h;
            overW = win_w <= w;

            //|| !words
            if (!is_mobile || !system_words) {
                if (overW) {
                    full = true;
                    $modal.addClass('modal-full');
                } else {
                    full = false;
                    $modal.removeClass('modal-full');
                }
            }

            is_full_h = overH || full;
            is_full_w = overW || full;

            is_iframe = !!$modal.find('.ui-modal-iframe').length;
            iw = $modal.find('.ui-modal-iframe').data('orgw');
            ih = $modal.find('.ui-modal-iframe').data('orgh');
            
            //full ? is_full_h = true : '';
            if (is_full_h) {
                //full
                $modalCont.css({ height: Math.ceil(win_h - (h_h + f_h) - (modalSpace * 2)) + 'px' });
                win_h < ih ?
                    $modal.find('.ui-modal-iframe iframe').attr('height', win_h - (modalSpace * 2)) :
                    $modal.find('.ui-modal-iframe iframe').attr('height', ih);

                $modal.css('height', win_h - (modalSpace * 2));
            } else {
                !!system_words ? $modalCont.css('hegiht','auto') : '';
                h = !!f_h ? h + f_h : h;
                $modal.css('height', h);
            }

            $modal.animate({
                top: is_full_h ? modalSpace : '50%',
                left: is_full_w ? modalSpace : '50%',
                width: w,
                height: is_full_h ? win_h - (modalSpace * 2) : system_words ? 'auto' : h,
                marginTop: is_full_h ? 0 : (h / 2) * -1,
                marginLeft: is_full_w ? 0 : (w / 2) * -1
            },200);
        }
        // if (is_full_h) {
        // 	$modalCont.css({ height: Math.ceil(win_h - (h_h + f_h) - (modalSpace * 2)) + 'px' });
        // 	$modalWrap.css('overflow', 'hidden');
        // 	$modalCont.css({ height: Math.ceil(win_h - (h_h + f_h) - (modalSpace * 2)) + 'px' });
        // } else {
        // 	if (words) {
        // 		$modalCont.css({ height: 'auto' });
        // 	}
        // 	if (terms_url) {
        // 		$modalCont.css({ height: h_cont - 1 });
        // 	}
        // }

        // var is_iframe = !!$modal.find('.ui-modal-iframe').length,
        // 	iw = $modal.find('.ui-modal-iframe').data('orgw'),
        // 	ih = $modal.find('.ui-modal-iframe').data('orgh');

        // $modal.css({
        // 	top: is_full_h ? modalSpace : '50%',
        // 	left: is_full_w ? modalSpace : '50%',
        // 	width: is_full_w ? is_mobile ? '100%' : win_w - (modalSpace * 2) : is_iframe ? iw : w,
        // 	height: is_full_h ? is_iframe ? win_h : win_h - (modalSpace * 2) : h,
        // 	marginTop: is_full_h ? 0 : (h / 2) * -1,
        // 	marginLeft: is_full_w ? 0 : (w / 2) * -1
        // });
        // is_full_w ?
        // 	$modal.find('.ui-modal-iframe iframe').attr('width', win_w - (modalSpace * 2)).attr('height', win_h - (modalSpace * 2)) :
        // 	$modal.find('.ui-modal-iframe iframe').attr('width', $modal.find('.ui-modal-iframe').data('orgw')).attr('height', $modal.find('.ui-modal-iframe').data('orgh'));

    }
    function createUiModalScrollReset(v) {
        var $this = $('#' + v),
            c_h = $this.find('.mCSB_container').outerHeight(),
            w_h = $this.find('.ui-modal-cont').outerHeight();

        if (c_h < w_h) {
            //$this.find('.ui-modal-cont').css('height', 'auto');
            $ui.uiModalResize({ id: v });
        } else {
            if (!!$this.length) {
                if (Math.abs(w_h - c_h) < 10) {
                    $this.addClass('hide-scroll');
                    $this.find('.mCSB_2_scrollbar').attr('tabindex', '-1');
                } else {
                    $this.removeClass('hide-scroll').removeClass('hide-scroll2');
                    $this.find('.mCSB_2_scrollbar').removeAttr('tabindex');
                }
            } else {
                return false;
            }
        }
    }
    $plugins.uiModal.focusid = '';
    function createUiModalClose(opt) {
        var opt = $.extend(true, {}, $('#' + opt.id).data('opt'), opt),
            $modal = $('#' + opt.id),
            $modalshow = $('.ui-modal[opened="true"]'),
            layN = $modalshow.length,
            autofocus = opt.autofocus,
            closeback = opt.closeback,
            endfocus = opt.endfocus === null ? typeof $modal.data('endfocus') === 'string' ? '#' + $modal.data('endfocus') : $modal.data('endfocus') : '#' + opt.endfocus,
            layRemove = opt.remove,
            full = opt.full, 
            terms_tit = opt.terms_tit, 
            sct = $modal.data('scrolltop') === undefined ? 0 : $modal.data('scrolltop'),
            ps = opt.ps,
            wst = $(win).scrollTop(),
            win_h = $(win).outerHeight(),
            h = Math.ceil($modal.outerHeight()),
            fst;

        endfocus === '#' || endfocus === '' || endfocus === null || endfocus === undefined ? 
            endfocus = 'body' : '';

        opt.endfocus !== undefined && opt.endfocus !== null && !!endfocus ? 
            sct = $(endfocus).offset().top : '';

        $ui.browser.mobile ? !!terms_tit ? full = true : '' : '';

        $('#__modalCF_cont').css('display', 'none');
        
        if (!!$('#uiCfPlayer').length) {
            $ui.browser.ie8 ? 
            doc.getElementById('uiCfPlayer').stop() : doc.getElementById('uiCfPlayer').pause();
        }
        $modal.removeClass('view');
        if (layN < 2) {
            $modal.removeAttr('opened');
            if ($ui.browser.mobile && full) {
                $('body').removeClass('modal-full');
                $modal.attr('aria-hidden', true).stop().animate({
                    top: '100%',
                    marginTop:0
                }, 450, 'easeInOutQuart', closed);
            } else {
                switch(ps) {
                    case 'top':
                        $modal.css('top','-10%');
                }
                $modal.attr('aria-hidden', true).stop().animate({
                    opacity: 0
                }, 200, 'easeOutQuart', closed);
            }

            if (opt.id !== '__modalAlert' && opt.id !== '__modalConfirm' && opt.id !== '__modalAction') {
                $('html, body').stop().animate({
                    scrollTop: Number($ui.uiModal.option.sctarray.slice(-1)[0])
                }, 0, function () {
                    autofocus ? $(endfocus).attr('tabindex', 0).focus() : '';
                });
            }

            $ui.uiModal.option.sctarray.pop();
            $('#baseLayer').removeClass('under');
            modalBackdrop('close');
        } else {
            //multi
            var z = layN - 1;
            
            
            $modal.attr('aria-hidden', true).stop().animate({
                opacity: 0
            }, 200, function () {
                layRemove === true ? $modal.remove() : $modal.removeAttr('style').removeClass('scrollpop').removeAttr('opened');
                autofocus ? $(endfocus).attr('tabindex', 0).focus() : '';

                $('.ui-modal[n="' + z + '"]').attr('aria-hidden', false);
                
                $('html, body').stop().animate({
                    scrollTop: Number($ui.uiModal.option.sctarray.slice(-1)[0])
                }, 0, function () {
                    $ui.uiModal.option.sctarray.pop();
                    //autofocus ? $(endfocus).attr('tabindex', 0).focus() : '';
                });

                closeback ? closeback({ id: opt.id }) : '';
                $ui.browser.mobile ? 
                $('body').addClass('modal-full') : '';
            });

            if (!!$modal.closest('#baseLayer').length) {
                $('#baseLayer').removeClass('under');
                $('.modal-backdrop').css('z-index', z - 1).attr('n', $('.modal-backdrop').attr('n') - 1);
            } else {
                if ($('body > .ui-modal[opened="true"]').length > 1) {
                    var zz = $('body > .modal-backdrop').attr('n');

                    $('body > .modal-backdrop').css('z-index', zz - 1).attr('n', zz - 1);
                    
                } else {
                    $('#baseLayer').removeClass('under');
                    $('body > .modal-backdrop').remove();
                    $('.modal-backdrop').css('opacity', '0.8');
                }
            }
        }

        function closed(v) {
            $('#baseWrap').removeAttr('aria-hidden');
            parent.$('body').removeClass('frame-modal-view');

            $('.ui-modal-close').off('click.uilayerpop');
            layRemove === true ? $modal.remove() : $modal.removeAttr('style').removeAttr('opened');

            !$(endfocus).length ? endfocus = 'body' : '';

            $modal.removeClass('modal-full');
            $('body').removeClass('modal-open modal-full modal-ria');
            $(doc).off('keyup.uilayerpop');

            closeback ? closeback({ id: opt.id }) : '';
        }
    }
    function modalBackdrop(value, born) {
        var $backdrop,
            timer,
            $wrap = !!$('#baseLayer').length ? $('#baseLayer') : $('body');

        born ? $wrap = $('body') : '';

        if (value === 'open' && !$('body').data('bgmodal')) {
            $('body').data('bgmodal', true);
            $wrap.find('.modal-backdrop').length ? '' : $wrap.append('<div class="modal-backdrop"></div>');
            $backdrop = $('.modal-backdrop');
            $backdrop.css('display', 'block');

            clearTimeout(timer);
            timer = setTimeout(function () {
                $backdrop.stop().animate({
                    opacity: 0.8,
                    width: '101%',
                    height: '101%',
                }, 200).addClass('on');
            }, 0);
        } else {
            $('body').data('bgmodal', false);
            $('.modal-backdrop').stop().animate({
                opacity: 0
            }, 200, function () {
                $(this).remove();
            }).removeClass('on');
        }
    }
    function creaeteUiCookieModal(opt){
        $ui.uiCookieGet({ name:opt.cookiename }) ? '' : open();
        function open(){
            $ui.uiModal({ id:opt.id, full:opt.full === undefined ? false : opt.full, link: opt.link === undefined ? false : opt.link });
        }
    }
    function creaeteUiCookieModalClose(opt){
        $('#' + opt.cookiename).prop('checked') ?
            $ui.uiCookieSet({ name:opt.cookiename, value:true, term:365 }) : '';
        $ui.uiModalClose({ id:opt.modalid });
    }

    /*
	$plugins.modal.system({
		type : 'confirm' or 'alert'
		btn_confirm_yes : '확인',
		btn_confirm_no : '취소'
		btn_alert : '확인',
		cont_text : '.....'
		width : 410,
		zindex : null,
		state : '알림' or '선택' or '확인' or '오류'

	})
	*/
    $ui.modalOption = {
		type : 'alert',
		btn_confirm_yes : null,
		btn_confirm_no : null,
		btn_alert : '확인',
		cont_text : '확인해주세요.',
		width : 'auto',
		zindex : null,
		state : '알림'
	}
	$ui.modal = {
		system: function (opt){
			var opt = $.extend(true, {}, $ui.modalOption, opt),
				btn_confirm_yes = opt.btn_confirm_yes,
				btn_confirm_no = opt.btn_confirm_no,
				btn_alert = opt.btn_alert,
				cont_text = opt.cont_text,
				w = opt.width,
				z = opt.zindex,
				type = opt.type,
				state = opt.state,
				is_alert = type === 'alert' ? true : false,
				class_name,
				system_url = is_alert ? '/vanilla/html/modal/modalAlert.html' : '/vanilla/html/modal/modalConfirm.html';

			switch (state) {
				case '알림': 
					class_name = 'system-type-a';
					break;

				case '선택': 
					class_name = 'system-type-b';
					break;
					
				case '오류':
					class_name = 'system-type-c';
					break;
			}
			$plugins.uiModal({
				id: 'modalSystem', 
				link: system_url, 
				autofocus: false, 
				width: w, 
				zindex: z ,
				system_words: cont_text, 
				system_btntxt1: is_alert ? btn_alert : btn_confirm_yes, 
				system_btntxt2: is_alert ? null : btn_confirm_no , 
				system_class: class_name
			});

			$('#modalSystemBtn1').off('click.confirm').on('click.confirm', function () {
				$plugins.uiModalClose({ 
					id: 'modalSystem',
					remove: true, 
					closeback: opt.confirmCallback
				});
			});
			$('#modalSystemBtn2, .btn-close').off('click.confirm').on('click.confirm', function () {
				$plugins.uiModalClose({ 
					id: 'modalSystem', 
					remove: true, 
					closeback: opt.cancelCallback 
				});
			});
		},
		
		terms: function (title, url) {
			//$plugins.modal.terms('개인정보 수집/이용 동의 (SKT)', '/terms/phone_skt_01.html');
			var title = title === undefined ? '약관' : title,
				url = url === undefined ? false : url;

			if (!!url) {
				$('body.type-iframe').length ?
					parent.$plugins.uiModal({
						id: '__modalTerms',
						link: '/modal/modalTerms.html',
						remove: true,
						termsTit: title,
						termsUrl: url
					}) :
					$plugins.uiModal({
						id: '__modalTerms',
						link: '/modal/modalTerms.html',
						remove: true,
						termsTit: title,
						termsUrl: url
					});
			}
		}
	}
})(jQuery, window, document);