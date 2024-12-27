$(window).on('load', function() {     
    $('#preloader').delay(200).fadeOut(); // will fade out the white DIV that covers the website. 
    $('body').delay(200);
  })

$(document).ready(function () {
    var interval = setInterval(function () {
        var momentNow = moment();
        $('#date-part').html(momentNow.format('dddd') + ' '
            + momentNow.format('DD MMMM  YYYY'));
        $('#time-part').html(momentNow.format('hh:mm A').toLowerCase());
    }, 100); 

});


// room-details

var guestroomno = "";
        $(document).ready(function () {

            fngetroomfromwebapi();
            setTimeout('fngetguestnamefromwebapi()', 2000);
            setInterval('fngetguestnamefromwebapi()', 2000);
            $('.room').css('visibility', 'hidden'); 
        });


        function setState(argstatus) { }
        function fngetroomfromwebapi() {
            //console.log("fngetroomfromwebapi");
            var myarray;
            $.ajax({
                type: "POST",
                url: "./apigetguestname.php",
                success: function (data) {
                    // alert(data); // apple
                    if (data != '') {
                        guestroomno = data;
                        console.log("guestroomno: " + guestroomno);
                    } else {
                    }
                }
            });
        }
        function fngetguestnamefromwebapi() {
            console.log("fngetguestnamefromwebapi");
            if (guestroomno != '') {
                //var guestroomno = '311'
                var url = "http://192.168.10.1/gdetails/gustmngmt.php?roomno=" + guestroomno;
                //var url = "http://103.240.100.20/guestapi/FetchRoomDetails.aspx?roomno=" + guestroomno;
                $.get(url, function (result) {
                    //console.log(result);
                    if (result.errorcode == '1') {
                        $('.whtr').html('Welcome');
                        $('.room').css('visibility', 'hidden'); 
                    } else {
                        $.each(result, function (i, field) {

                            $('.whtr').html('<small>Welcome</small>' + '<span style="color:#ffe300">' + '&nbsp;' + field[0].title + '&nbsp;' + field[0].fname + '&nbsp;' + field[0].lname + '</span>');
                            if (field[0].roomno !== '') {
                                $('.room').css('visibility', 'visible')
                                $('.rm-no').html('Room # ' + field[0].roomno)                               
                            }
                        });
                    }

                });
            }
        }
