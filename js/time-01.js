var middleware_ip = '172.17.52.2'; // Lab
// var middleware_ip = '172.18.96.3'; // Nusa Dua live middleware
var Projctfldr = 'tizendpswi';
var guestroomno = 0;
$(window).on('load', function () {
    $('#preloader').delay(200).fadeOut(350); // will fade out the white DIV that covers the website. 
    $('body').delay(300);
})

function YouTubebtnpressed() { 
}
function hdmi_tvon() {    
}
function Netflixbtnpressed() {    
}
function Timeload() {
    $.ajax({
        url: "http://" + middleware_ip + "/"+Projctfldr+"/server_date.php",
        type: "GET",
        dataType: 'text',
        success: function (result) {
            //console.log(result);
            $("#date-part").empty();
            $("#date-part").html('<strong>' + result + '<strong>');
        }
    });
};
setTimeout(Timeload, 300);
setInterval(Timeload, 60 * 1000); // two min

function fngetroomfromwebapi() {
    $.ajax({
        type: "POST",
        url: "http://" + middleware_ip + "/"+Projctfldr+"/api_getroom.php",
        success: function (data) {
            if (data != '') {
                guestroomno = data;
                $('.rm-no').html(guestroomno)
                // console.log("guestroomno: " + guestroomno);
            } else {
            }
        }
    });
}


function fngetguestnamefromwebapi() {
    if (guestroomno != '') {
        var url = "http://" + middleware_ip + "/gdetails/api/v1/gustmngmt.php?roomno=" + guestroomno;
        // console.log("request url " + url);
        fetch(url)
            .then(response => response.json()) //The response is parsed as JSON using the .json() method. 
            .then(data => {
                var json_data_count = Object.keys(data).length; //get json data length 15-dec-23
                //console.log(json_data_count);
                //console.log(data);
                if (json_data_count != '0') {
                    // debugger;
                    if (data.errorcode == '1') {
                        //$('.whtr').html('<small>Welcome</small>');
                        $('.room').css('visibility', 'hidden');
                    } else {
                        var guestData = data.data[0];
                        var welcomeMsg = '<span style="color:#ffe300" class="d-inline-block">&nbsp;' + guestData.title + '&nbsp;' + guestData.fname + '</span>';
                        // var welcomeMsg = '<span style="color:#ffe300">&nbsp;' + guestData.title + '&nbsp;' + guestData.fname + '&nbsp;' + guestData.lname + '</span>';
                        //console.log(guestData.title);
                        $('.whtr').html(welcomeMsg);
                        if (guestData.roomno !== '') {
                            $('.room').css('visibility', 'visible');
                            $('.rm-no').html(guestData.roomno);
                        }
                    }
                }
            })
            .catch(error => {
                console.log("Error:", error);
            });
    }
}
function show_msg_guest(msg)
{
    $('.nt-avlbl').addClass('active');
    $('.nt-avlbl').text(msg);
    setTimeout(function(){			
        $('.nt-avlbl').removeClass('active');
    }, 10000);
}