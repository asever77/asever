;(function($, win, doc, undefined) {
    console.log('page.js');

    'use strict';

    $plugins.page.accordion = function(){
        console.log('page.js-acco');
        $plugins.uiAccordion({ id:'exeAcco1', current:[0,2], callback:function(v){console.log(v)} });
        $plugins.uiAccordion({ id:'exeAcco2', current:[0,2], autoclose:true });
        $plugins.uiAccordion({ id:'exeAcco3', current:null, autoclose:false });
        $plugins.uiAccordion({ id:'exeAcco4', current:null, autoclose:false });
    }

    $plugins.page.brickList = function(){
        //$('.ui-cardlist').imagesLoaded(function(){
            $plugins.uiBrickList({ id:'uiBrickList1', margin:0, response:true });
        //});
        var img_array = [
            "/asever/resources/img/dummy/@iu16.gif",
            "/asever/resources/img/dummy/@iu15.jpg",
            "/asever/resources/img/dummy/@iu14.jpg",
            "/asever/resources/img/dummy/@iu13.gif",
            "/asever/resources/img/dummy/@iu12.jpg",
            "/asever/resources/img/dummy/@iu11.gif",
            "/asever/resources/img/dummy/@iu10.gif",
            "/asever/resources/img/dummy/@iu9.jpg",
            "/asever/resources/img/dummy/@iu8.jpg",
            "/asever/resources/img/dummy/@iu7.jpg"
            ]
        function randomNum(){
            var n = Math.floor(Math.random() * 10);
            return n;
        }

        
        $('.ui-bricklist .ui-add').on('click', function() {
            var add = '<li class="ui-bricklist-item" role="listitem">' +
                '<div><img src="'+ img_array[randomNum()] +'" alt=""></div>' +
                '</li>' +
                '<li class="ui-bricklist-item" role="listitem">' +
                '<div><img src="'+ img_array[randomNum()] +'" alt=""></div>' +
                '</li>' +
                '<li class="ui-bricklist-item" role="listitem">' +
                '<div><img src="'+ img_array[randomNum()] +'" alt=""></div>' +
                '</li>' +
                '<li class="ui-bricklist-item" role="listitem">' +
                '<div><img src="'+ img_array[randomNum()] +'" alt=""></div>' +
                '</li>' +
                '<li class="ui-bricklist-item" role="listitem">' +
                '<div><img src="'+ img_array[randomNum()] +'" alt=""></div>' +
                '</li>' +
                '<li class="ui-bricklist-item" role="listitem">' +
                '<div><img src="'+ img_array[randomNum()] +'" alt=""></div>' +
                '</li>' +
                '<li class="ui-bricklist-item" role="listitem">' +
                '<div><img src="'+ img_array[randomNum()] +'" alt=""></div>' +
                '</li>' +
                '<li class="ui-bricklist-item" role="listitem">' +
                '<div><img src="'+ img_array[randomNum()] +'" alt=""></div>' +
                '</li>' +
                '<li class="ui-bricklist-item" role="listitem">' +
                '<div><img src="'+ img_array[randomNum()] +'" alt=""></div>' +
                '</li>' +
                '<li class="ui-bricklist-item" role="listitem">' +
                '<div><img src="'+ img_array[randomNum()] +'" alt=""></div>' +
                '</li>' +
                '<li class="ui-bricklist-item" role="listitem">' +
                '<div><img src="'+ img_array[randomNum()] +'" alt=""></div>' +
                '</li>';

            $(this).closest('.ui-bricklist').find('.ui-bricklist-wrap').append(add);
            $plugins.uiBrickListAdd({ id:'uiBrickList1' });
        });
    }

    $plugins.page.capture = function(){
        $('#uiCaptureBtn').on('click',function(){
            $plugins.uiCapture({ id: 'capSct' });
        });
    }

    $plugins.page.countNumber = function(){
        $plugins.uiCountStep({ id:'exeCount1', value: 504025 });
        $plugins.uiCountSlide({ id:'exeCount2', value: 5040.25 });
    }

    $plugins.page.datePicker = function(){
        $plugins.uiDatePicker({ 
            selector:'#uiDatePicker1', 
            openback: function(){
                console.log('open callback gg');
                $('#baseHeader').stop().animate({
                    top:-50
                },200)
            },
            closeback: function(){
                console.log('close callback gg');
                 $('#baseHeader').stop().animate({
                    top:0
                },200)
            }
        });
        $plugins.uiDatePicker({ selector:'#uiDatePicker2' });
    }

    $plugins.page.dropdown = function(){
        $('.drop-ps-change').on('change', function(){
            $(this).closest('.form-item').find('.ui-drop').attr('data-ps', $(this).val());
        });
        $plugins.uiSelect();
        $plugins.uiDropdown({ id:'uiDrop1', eff:'st', ps:'bc', _offset: true });
        $plugins.uiDropdown({ id:'uiDrop2', eff:'sl', ps:'rt' });
        $plugins.uiDropdown({ id:'uiDrop5', eff:'sl', ps:'rb'});
        $plugins.uiTab({ id: 'exeTab1', current:0 });
    }

    $plugins.page.fileupload = function(){

        /* 파일 업로드 */
        $plugins.uiFileUpload(); 
 
    }

    $plugins.page.floating = function(){
        $plugins.uiFloating({ id:'exeFix12', ps:'top', add:'baseHeader',  fix:true });
        $plugins.uiFloating({ id:'exeFix11', ps:'top', add:'exeFix12', fix:true });
        $plugins.uiFloating({ id:'exeFix10', ps:'top', add:'exeFix11', fix:true });

         $plugins.uiFloating({ id:'exeFix1', ps:'top', add:'baseHeader', fix:false });

        
        $plugins.uiFloating({ id:'exeFix2', ps:'top', add:'exeFix1', fix:false });
        $plugins.uiFloating({ id:'exeFix3', ps:'top', add:'exeFix2', fix:false });
        
        
        $plugins.uiFloating({ id:'exeFix6', ps:'bottom', fix:true});
        $plugins.uiFloating({ id:'exeFix5', ps:'bottom', add:'exeFix6', fix:true});
        $plugins.uiFloating({ id:'exeFix4', ps:'bottom', add:'exeFix5', fix:true });

        $plugins.uiFloating({ id:'exeFix7', ps:'bottom', fix:false});
        $plugins.uiFloating({ id:'exeFix8', ps:'bottom', add:'exeFix7', fix:false});
        $plugins.uiFloating({ id:'exeFix9', ps:'bottom', add:'exeFix8', fix:false });

        // $plugins.uiFloating({ id:'exeFix4', ps:'bottom', fix:true });
        // $plugins.uiFloating({ id:'exeFix3', ps:'bottom', fix:false });
        /*
        NETIVE.uiFloating.aside({ id: 'exeFix4', start: 200, end: 200 });
        */

        $('.uiBtnSize').on('click', function(){
            !$(this).hasClass('big') ? $(this).addClass('big') : $(this).removeClass('big');
        })
    }

    $plugins.page.inputformat = function(){
        var n = 3;
        
        
        // $('#uiErrorOn').on('click', function(){
        //     n = 3;
        //     $plugins.uiError({ selector:'a9', error:true, message:'9 오류메세지 내용' });
        //     $plugins.uiError({ selector:'a10', error:true, message:'10 오류메세지 내용' });
        //     $plugins.uiError({ selector:'a11', error:true, message:'11 오류메세지 내용' });
        // });
        // $('#uiErrorOff').on('click', function(){
        //     if (n === 3) {
        //         n = 2;
        //         $plugins.uiError({ selector:'a9', error:false });    
        //     } else if (n === 2) {
        //         n = 1;
        //         $plugins.uiError({ selector:'a10', error:false });
        //     } else {
        //         $plugins.uiError({ selector:'a11', error:false });
        //     }
            
        // });
    }

    $plugins.page.jsoncodinglist = function(){
        $plugins.uiCodinglist({
            id: 'uiCodinglist',
            url: '/asever/resources/data/codinglist.json',
            type: 'text'
        });
    }

    $plugins.page.jsonmenu = function(){

        $plugins.uiMenu({ id:'uiTest', url:'/asever/resources/data/menu.json', ctg:'전체', selected:'G_01_03_02_00', callback:fncallback });
        function fncallback(opt){
            var d1 = opt.d1,
                d2 = opt.d2,
                d3 = opt.d3,
                current = opt.current,
                navi = opt.navi,
                navi_len = navi.length,
                html_navi = '',
                $menu = $('#uiTest');

            $menu.append(d1).append(d2).append(d3);
            $menu.find('.dep-2-wrap').each(function(){
                var menu_html = this;

                $(menu_html).data('dep1')
                $('.dep-1[data-n="'+ $(menu_html).data('dep1') +'"]').append(menu_html);
            });
            $menu.find('.dep-3-wrap').each(function(){
                var menu_html = this;

                $(menu_html).data('dep1')
                $('.dep-1[data-n="'+ $(menu_html).data('dep1') +'"]').find('.dep-2[data-n="'+ $(menu_html).data('dep2') +'"]').append(menu_html);
            });
            $menu.find('.dep-1-wrap').removeClass('hide');
        }
    }

    $plugins.page.modal = function(){
        $('.btn-base').on('click', function(){
            switch($(this).attr('id')){
            case 'modalOpen1':
                $plugins.uiModal({ id:'modal_sample1', link:'/asever/html/modal/modalSample1.html', callback:$plugins.page.callback });
                break;
            case 'modalOpen2':
                $plugins.uiModal({ id:'modal_sample2', link:'/asever/html/modal/modalSample2.html', callback:$plugins.page.callback, width:700 });
                break;
            }

        });
    }

    $plugins.page.popup = function(){
       
    }

    $plugins.page.scrollmove = function(){
        
    }
    
    $plugins.page.select = function(){
        $plugins.uiSelect();
    }

    $plugins.page.selection = function(){
        $plugins.uiSelection();
        $plugins.uiSelection({ id:'uiChk2', all:true, callback:allCheckCallback });
        $plugins.uiSelection({ id:'c3_0', all:true, callback:allCheckCallback });
        $plugins.uiSelection({ id:'c3_4', callback:inpCheckCallback });
        $plugins.uiSelection();
        
        function allCheckCallback(v){
            console.log(v.id, v);
        }

        function inpCheckCallback(v){
            console.log(v)
            if (v.value) {
                $('#abcd input').prop('disabled', false).prop('checked', true).removeAttr('disabled');
                $('#abcd label').removeClass('disabled').addClass('checked');
            } else {
                $('#abcd input').prop('disabled', true).prop('checked', false).attr('disabled');
                $('#abcd label').removeClass('checked').addClass('disabled');
            }
        }
    }

    $plugins.page.slide = function(){
        $plugins.uiSlide();
        $plugins.uiSlide({ id:'slide1', current:0, loop:false, dot:true, eff:'slide', speed:300, callback:callback});
        $plugins.uiSlide({ id:'slide2', eff:'fade', dot:true, speed:350 });
        
        $plugins.uiSlide({ id:'slide3', multi:true, margin:10 });
        
        $plugins.uiSlide({ id:'slide4', items:3, margin:10 }); 

        function callback(v){
            console.log(v);
        }
    }

    $plugins.page.slider = function(){
        //range slider
        $plugins.uiSlider({ 
            id:"uiSlider", 
            vertical:false, 
            reverse:false, 
            range:true, 
            now:[1500, 2500], 
            step:10, 
            min:1000, 
            max:6000, 
            tooltip:true, 
            unit:'만원', 
            txt_s:'이하', 
            txt_e:'이상', 
            acc:true, 
            callback:sliderCallback
        });
        $plugins.uiSlider({ 
            id:"uiSlider2", 
            vertical:false, 
            reverse:true, 
            range:true, 
            now:[1500, 2500], 
            step:10, 
            min:1000, 
            max:6000, 
            tooltip:true,
            unit:'달러', 
            txt_s:'', 
            txt_e:'', 
            acc:true, 
            callback:sliderCallback
        });
        $plugins.uiSlider({ 
            id:"uiSlider3", 
            vertical:true, reverse:false, range:true, 
            now:[1500, 2500], step:10, min:1000, max:6000, 
            tooltip:true, unit:'만원', txt_s:'이하', txt_e:'이상', 
            acc:true, callback:sliderCallback
        });
        $plugins.uiSlider({ 
            id:"uiSlider4", 
            vertical:true, reverse:true, range:true, 
            now:[1500, 2500], step:10, min:1000, max:6000, 
            tooltip:true, unit:'만원', txt_s:'이하', txt_e:'이상', 
            acc:true, callback:sliderCallback
        });

        //slider
        $plugins.uiSlider({
            id:"uiSlider5",
            vertical:false, reverse:false, range:false,
            now:[500], step:10, min:0, max:1000,
            tooltip:true, unit:'만원', txt_s:'', txt_e:'',
            acc:true, callback:sliderCallback
        });
        $plugins.uiSlider({
            id:"uiSlider6",
            vertical:false, reverse:true, range:false,
            now:[500], step:10, min:0, max:1000,
            tooltip:true, unit:'만원', txt_s:'', txt_e:'',
            acc:true, callback:sliderCallback
        });
        $plugins.uiSlider({
            id:"uiSlider7",
            vertical:true, reverse:false, range:false, stepname:['step1','step2','step3','step4','step5','step6','step7','step8','step9','step10', 'step11'], 
            now:[50], step:10, min:0, max:100,
            tooltip:true, unit:'', txt_s:'', txt_e:'',
            acc:true, callback:sliderCallback
        });
        $plugins.uiSlider({
            id:"uiSlider8",
            vertical:true, reverse:true, range:false,
            now:[500], step:10, min:0, max:1000,
            tooltip:true, unit:'만원', txt_s:'', txt_e:'',
            acc:true, callback:sliderCallback
        });
        
        
        function sliderCallback(v){
            console.log(v);
        }

    }

    $plugins.page.slot = function(){
        $plugins.uiSlot({ id: 'uiSlot1', current: 1, auto: false, single:false });
        $plugins.uiSlot({ id: 'uiSlot2', current: 4, auto: false, single:false });
        $plugins.uiSlot({ id: 'uiSlot3', current: 2, auto: false, single:false });
        
        var n = 1,
            win = [];
        
        $('#start').click(function(){
            n = 1;
            win = [];
            $plugins.uiSlotStart({ id: 'uiSlot1'});
            $plugins.uiSlotStart({ id: 'uiSlot2'});
            $plugins.uiSlotStart({ id: 'uiSlot3'}); 
        });
        $('#stop').click(function(){
            if (n < 4) {
                $plugins.uiSlotStop({ id: 'uiSlot' + n, callback: slotMCallback });
                n = n + 1;
            }
        });
        $('#allstop').click(function(){
            win = [];
            $plugins.uiSlotStop({ id: 'uiSlot1', callback: slotMCallback });
            $plugins.uiSlotStop({ id: 'uiSlot2', callback: slotMCallback });
            $plugins.uiSlotStop({ id: 'uiSlot3', callback: slotMCallback }); 
        });

        function slotMCallback(v){
            win.push(v);
            var lucky = 0;
            
            if (win.length === 3) {
                (win[0] === win[1]) ? lucky = lucky + 1 : '';
                (win[0] === win[2]) ? lucky = lucky + 1 : '';
                (win[1] === win[2]) ? lucky = lucky + 1 : '';
                
                switch(lucky){
                case 0: $('#slotResult').text('꽝입니다 ㅎㅎㅎ');
                break;
                case 1: $('#slotResult').text('아깝네요~~~');
                break;
                case 3: $('#slotResult').text('축하합니다.');
                break;
                }
            }
        }

        $('.box').stop().delay(800).animate({
            opacity: 1
        },700);
        
        $plugins.uiBrickList({ id:'uiListcard', margin:10, response:true });
        //$plugins.uiCardListRow({ id:'uiListcard' });  추가
        


        $plugins.uiSlot({ id: 'wuiSlot1', current:1, auto:true, single:true });
        $plugins.uiSlot({ id: 'wuiSlot2', current:9, auto:true, single:true });
        $plugins.uiSlot({ id: 'wuiSlot3', current:3, auto:true, single:true });
        $plugins.uiSlot({ id: 'wuiSlot4', current:5, auto:true, single:true });
        $plugins.uiSlot({ id: 'wuiSlot5', current:7, auto:true, single:true });

        var n = 1,
            j = 1,
            m = [],
            w = [],
            iulen = 6;
        
        $('#allstop2').on('click',function(){
            if (j === 1) {
                $('body').addClass('on');
                slotstop(j);
            } else {
                $('body').removeClass('on');
                j = 1;
                m = [],
                w = [];
            }
        });
       
        function slotstop(j){
            if (j < iulen) {
                setTimeout(function(){
                    $plugins.uiSlotStop({ id: 'wuiSlot' + j, callback: slotCallback });
                    $('#wuiSlot' + j).closest('.ui-bricklist-item').addClass('ok');
                    $('.ui-bricklist-item.n'+ j).find('strong').stop().animate({
                        opacity: 1
                    },500);
                    $('.ui-bricklist-item.n'+ j).find('p').stop().animate({
                        opacity: 1
                    },500);
                },100);
            }
        }

        function slotCallback(v){
            if (j < iulen && j > 1) {
                var len = w.length;
                for (var i = 0; i < len ; i++) {
                    if (w[i] === v) {
                        slotstop(j);
                        break;
                    } else { 
                        if(i === len - 1){
                            w.push(v);
                            j = j + 1;
                            if (j < iulen) {
                                slotstop(j);
                            }
                        }
                    }
                }
            } else if(j === 1) {
                w.push(v);
                j = j + 1;
                slotstop(j);
            }
        }
    }

    $plugins.page.tab = function(){
        
    }

    $plugins.page.table = function(){
        $plugins.uiTblScroll();
        $plugins.uiTblScroll({ selector:'#uiTblSroll1',rown:4 });
        
        $plugins.uiDatePicker();
        $plugins.uiSelection();
        $plugins.uiSelect();
        $plugins.uiSelection({ id:'uiChk2', all:true });
    }   

    $plugins.page.tooltip = function(){
        $plugins.uiTooltip();
    }
        



})(jQuery, window, document);