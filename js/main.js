

    var count_position = 0, totalLen = $('.cnt-col .cnt-cl').length;
    let list_row = 8;

    // Android key code highlight back and home button handling *********
   
    var str_fromurl1 = queryString("fromurl");
    var menu_position = 1;
    var msg_shw_flag = 0;
    // document.getElementById("logtext").innerHTML += "<br> str_fromurl1 home: "+ str_fromurl1;             
    if (str_fromurl1 == 'tvchnl') {
        count_position = 2;
        menu_position = 3;
    }
    if (str_fromurl1 == 'vplus') {
        count_position = 0;
        menu_position = 1
    }
    if (str_fromurl1 == 'scrn_cast') {
        count_position = 1;
        menu_position = 2
    }
    if (str_fromurl1 == 'inroom') {
        count_position = 3;
        menu_position = 4
    }
    if (str_fromurl1 == 'spa') {
        count_position = 4;
        menu_position = 5
    }
    if (str_fromurl1 == 'hotel-srvc') {
        count_position = 5;
        menu_position = 6
    }
    if (str_fromurl1 == 'promo') {
        count_position = 6;
        menu_position = 7
    }
    if (str_fromurl1 == 'greet-msg') {
        count_position = 7;
        menu_position = 8;
    }
    // if (str_fromurl1 == 'promo') {
    //     count = 6;
    //     menu_position = 7
    // }


    $('.cnt-cl').each(function (index) {
        var newId = (index + 1);
        // Set the id attribute for the current div
        $(this).attr('id', newId);
    });

    $('.cnt-col .cnt-cl').removeClass('act').eq(count_position).addClass('act')
    // End Android key code highlight back and home button handling *********

    let selected_channel = $('.menu-sec').find('.cnt-cl.act').attr('id');
    let next_channel = Number(selected_channel) + 1;
    if (Number(menu_position) == 8) {
        let total_channel_hgt = $($('.menu-sec')[0]).height();
        let length_channel = $($('.menu-sec').find('.cnt-cl.act')[0]).height();

        let total_hgt = Number(next_channel) * length_channel;
        // let bal_hgt = total_hgt - total_channel_hgt;       

        $('.menu-sec').animate({
            scrollTop: total_hgt + 'px'
        }, 100);
    }

    $(".menu-sec").attr('data-position', menu_position);

    $(document).on('keyup', function (e) {

        var keyCode = e.keyCode
        if (keyCode !== '' && msg_shw_flag ==1) {
            // $('.modal').modal('hide');  
            // msg_shw_flag = 0;
            return;
        }     
        // down arrow
        if (keyCode === 40) {
            // if (e.keyCode === 40) {
            // count++
            // if (count >= totalLen) count = 0
            // console.log(totalLen);

            let selected_channel = $('.menu-sec').find('.cnt-cl.act').attr('id');
            let next_channel = Number(selected_channel) + 1;

            let total_channels = $('.menu-sec').find('.cnt-cl').length;

            let pos = $('.menu-sec').attr('data-position');
            if (Number(pos) != 8) {
                position = Number(pos) + 1;
                $(".menu-sec").attr('data-position', position);
            }

            // console.log(position);
            // console.log(next_channel);

            if (next_channel <= total_channels) {
                $('.menu-sec').find('.cnt-cl.act').removeClass('act');
                $(".menu-sec").find('.cnt-cl[id=' + next_channel + ']').addClass('act');
                document.getElementById("logtext").innerHTML += next_channel;
            }
            else{
                $('.menu-sec').find('.cnt-cl.act').removeClass('act');
                $(".menu-sec").find('.cnt-cl[id=' + 1 + ']').addClass('act');
                $('.menu-sec').animate({
                    scrollTop: 0
                }, 100); 
            }

            // console.log(bal_hgt);
            let current_pos = $('.menu-sec').attr('data-position');
            // console.log(current_pos);
            if (Number(current_pos) == 8) {
                let total_channel_hgt = $($('.menu-sec')[0]).height();
                let length_channel = $($('.menu-sec').find('.cnt-cl.act')[0]).height();

                let total_hgt = Number(next_channel) * length_channel;
                let bal_hgt = total_hgt - total_channel_hgt;

                // console.log(bal_hgt);

                $('.menu-sec').animate({
                    scrollTop: total_hgt + 'px'
                }, 100);
            }

            //arrows
            if (next_channel == total_channels) {
                $('#channel-arrows .arw-dwn').removeClass('act');
                $('#channel-arrows .arw-up').addClass('act');
            }

        }

        // up arrow
        if (keyCode === 38) {

            let selected_channel = $('.menu-sec').find('.cnt-cl.act').attr('id');
            let next_channel = Number(selected_channel) - 1;
            let total_channels = $('.menu-sec').find('.cnt-cl').length;

            let pos = $('.menu-sec').attr('data-position');
            if (Number(pos) != 1) {
                position = Number(pos) - 1;
                $(".menu-sec").attr('data-position', position);
            }

            if (next_channel) {
                $('.menu-sec').find('.cnt-cl.act').removeClass('act');
                $(".menu-sec").find('.cnt-cl[id=' + next_channel + ']').addClass('act');
            }else{
                $('.menu-sec').find('.cnt-cl.act').removeClass('act');
                $(".menu-sec").find('.cnt-cl[id=' + total_channels + ']').addClass('act');                
            }

            let current_pos = $('.menu-sec').attr('data-position');
            if (Number(current_pos) == 1) {
                let length_channel = $($('.menu-sec').find('.cnt-cl.act')[0]).height();

                let total_hgt = Number(next_channel) * length_channel;
                total_hgt = total_hgt - length_channel;

                $('.menu-sec').animate({
                    scrollTop: total_hgt + 'px'
                }, 100);
            }

            //arrows
            if (next_channel == 1) {
                $('#channel-arrows .arw-dwn').addClass('act');
                $('#channel-arrows .arw-up').removeClass('act');
            }

        }


        // else if (keyCode === 38) {
        //     count--
        //     if (count < 0) count = totalLen - 1;
        // }
        // $('.cnt-col .cnt-cl').removeClass('act').eq(count).addClass('act')
        //console.log(count)

        if (e.keyCode === 13) {
            var href = $('.cnt-cl.act .loc-url').attr('href');
            var menu_select = $('.cnt-cl.act').data("id");
            // setTimeout(function () { window.location = (href); }, 500);
            menuHandler(menu_select);
            var str_log = 'Home_page';
            fnch_logwriter(str_log, 0, 0);
        }

        if (e.keyCode == 10182 || e.keyCode == 10009) {
            bckbtnpressed();
        }
        if (e.keyCode == 10071) {
            homepageshowing();
        }

    });

    function menuHandler(menu_select) {

        // var str_log='Home page: move to '+menu_select;
        // fnch_logwriter(str_log,guestroomno,0);

        if (menu_select == "Watch TV") {
            window.location = "tv-channels.html?room=" + guestroomno;
        }
        if (menu_select == "Apps") {
            window.location = "apps.html?room=" + guestroomno;
        }
        if (menu_select == "Connect my Device") {
            window.location = "ottapps.html?room=" + guestroomno;
        }
        if (menu_select == "Vision+") {
            window.location = "ottapps.html?appid=vplus&room=" + guestroomno;
        }
        if (menu_select == "Indining") {
            window.location = "inroom-dining.html?room=" + guestroomno;
        }
        if (menu_select == "spa") {
            window.location = "spa.html?room=" + guestroomno;
            // setTimeout(function () { window.location = ('spa.html'); }, 500);
        }
        if (menu_select == "Guest Directory") {
            window.location = "hotel-about.html?fromurl=guest_dir&room=" + guestroomno;
        }
        if (menu_select == "Messages") {
            window.location = "messages.html?room=" + guestroomno;
        }
        if (menu_select == "Promotion") {
            window.location = "promotion.html?room=" + guestroomno;
        }
    }

    