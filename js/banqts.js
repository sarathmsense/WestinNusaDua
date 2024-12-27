$(document).ready(function () {
    var interval = setInterval(function () {
        var momentNow = moment();
        $('#date-part').html(momentNow.format('dddd') + ' '
            + momentNow.format('DD MMMM  YYYY'));
        $('#time-part').html(momentNow.format('hh:mm A').toLowerCase());
    }, 100);    
    
    
    var count = 0, totalLen = $('.cnt-col .cnt-cl').length;
     // Android key code highlight back and home button handling *********
     var url = new URL(window.location.href);
     var str_fromurl1 = url.searchParams.get("fromurl");
     
     if (str_fromurl1 == 'st-marys') {
         count = 0;
     }
     if (str_fromurl1 == 'greenways') {
         count = 1;
     }
     if (str_fromurl1 == 'chamiers') {
         count = 2;
     }
     if (str_fromurl1 == 'gallery') {
         count = 3;
     }
     $('.cnt-col .cnt-cl').removeClass('act').eq(count).addClass('act')
     // End Android key code highlight back and home button handling *********
    //$('.cnt-col .cnt-cl').eq(0).addClass('act');
    $(document).on('keyup', function (e) {
        
        if (e.keyCode === 39) {
            count++
            if(count>=totalLen)count = 0
        }else{
            count--
            if(count<0)count = totalLen-1;
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
        

        if(e.keyCode === 13){
            var room_select = $('.cnt-cl.act').data("id");

            console.log(room_select);
            window.location = (room_select) + '.html';

        }
    });


});