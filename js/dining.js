$(document).ready(function () {
    


    var count = 0,
        totalLen = $('.cnt-col .cnt-cl').length;
        // Android key code highlight back and home button handling *********
    var url = new URL(window.location.href);
    var str_fromurl1 = url.searchParams.get("fromurl");
    
    if (str_fromurl1 == 'chp-chey') {
        count = 0;
    }
    if (str_fromurl1 == 'above-sea-level') {
        count = 1;
    }
    if (str_fromurl1 == 'colony') {
        count = 2;
    }
    if (str_fromurl1 == 'inroom-dining') {
        count = 3;
    }
    $('.cnt-col .cnt-cl').removeClass('act').eq(count).addClass('act')
    // End Android key code highlight back and home button handling *********
    //$('.cnt-col .cnt-cl').eq(0).addClass('act');
    $(document).on('keyup', function (e) {

        if (e.keyCode === 39) {
            count++
            if (count >= totalLen) count = 0
        } else {
            count--
            if (count < 0) count = totalLen - 1;
        }
        //console.log(count)

        if (e.keyCode === 39 || e.keyCode === 37) {
            //console.log(count);
            $('.cnt-col .cnt-cl').removeClass('act').eq(count).addClass('act')

        }

        // if (e.keyCode === 13) {
        //     var href = $('.cnt-cl.act .loc-url').attr('href');  
        //     //alert(href);          
        //     window.location = (href);            
        // }


        if (e.keyCode === 13) {
            var room_select = $('.cnt-cl.act').data("id");

            console.log(room_select);
            if ((room_select).length > 1) {
                window.location = (room_select) + '.html';
            }
            else{
                return false;
            }            

        }

        // $(document).ready(function() {
        //     $('#demo').carousel({
        //     interval: 1000,
        //       wrap: false
        //     })
            
        //     $('#demo').on('slid.bs.carousel', function() {
        //         //alert("slid");
        //     });
          
          
        //   $('#demo').on('slid.bs.carousel', '', function() {
        //   var $this = $(this);
        
        //   $this.children('.carousel-control').show();
        
        //   if($('.carousel-inner .carousel-item:first').hasClass('active')) {
        //     $this.children('.left.carousel-control').hide();
        //   } else if($('.carousel-inner .carousel-item:last').hasClass('active')) {
        //     $this.children('.right.carousel-control').hide();
        //   }
        
        // });
          
          
          
            
            
        // });
    });


});