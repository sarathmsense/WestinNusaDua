/////// ***** GRE Standard Guest service message feature ******//////
//// Display message count in the Home screen

var ul = document.querySelector('ul');
var nodes = 0;
var selected = 0;
var str_msg_id = '';
var is_left_sel = 0;
var accesskey = "";
var ischeckout = false;
var ismessage = false;


////******* Message list related functions */

function displaymsgcnt() {
    ///// Remove when PMS enabled
   /*  if ($('.whtr').html()==''){
        document.getElementById("msgCount").innerHTML = '0';
        $('#msgCount').removeClass('active');
        //$('#msgcount').hide;
       // $(".blob.yellow").css('visibility', 'hidden');
        return;
    } */

    var url = 'http://' + middleware_ip + '/AdminPanel/main/template/Api/guestmessagedetails.php?roomno=' + guestroomno + '&count=1&accesskey=testtvapi';
    console.log(url);
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        success: function (response) {
            //alert(response.errorcode);
            if (response == null)
                return;
               // debugger;
            if(response.errorcode == "106"){
                document.getElementById("msgCount").innerHTML = '0';
                $('#msgCount').removeClass('active');
                // $('#msgcount').hide;
                // $(".blob.yellow").css('visibility', 'hidden');
                return;
            }
            if (response.data != undefined && response.data.length !== 0 && response.data != null && response.data != '') {
                var i = 0;
                for (i; i < response.data.length; i++) {
                    var readcnt = response.data[i].readcnt;
                    var unreadcnt = response.data[i].unreadcnt;
                }
                // if(unreadcnt == '0'){
                //     $('#msgcount').hide;
                //     $(".blob.yellow").css('visibility', 'hidden');
                // }

                // var totalcnt =unreadcnt+"/"+readcnt ;
                if(unreadcnt != '0'&& unreadcnt != '' ){
                    $(".blob.yellow").css('visibility', 'visible');
                    $('#msgcount').show;
                    document.getElementById("msgCount").innerHTML = unreadcnt;
                    $('#msgCount').addClass('active');
                }else{
                    document.getElementById("msgCount").innerHTML = '0';
                    $('#msgCount').removeClass('active');
                    //$('#msgcount').hide;
                }
            }
        },
        error: function () {
            console.log("Error loading messages");
        }
    });
}



function displaymessagelist() {
  /*   if (ischeckout)  // Remove comment on PMS Check required
        return; */
    var url = 'http://' + middleware_ip + '/AdminPanel/main/template/Api/guestmessagedetails.php?roomno=' + guestroomno + '&accesskey=testtvapi';
    console.log(url);
    var li_html_from_api = "";
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        success: function (response) {
            if (typeof response !== 'undefined' && response == null)
                return;
            if(response.errorcode === "106"){
                $('#no-msg').show();
                $('#no-msg').text(response.errormsg);
                $('#messageContainer').hide(); 
                $('.cnt-col .cnt-cl').eq(0).addClass('act');
                return;
            }

            if (response.errorcode != undefined && response.errorcode != "00"){
                $('#no-msg').show();
                $('#no-msg').text(response.errormsg);
                $('.cnt-col .cnt-cl').eq(0).addClass('act');
                return;
            }

            if (response.data != undefined && response.data != null && response.data != '' && response.data.length !== 0) {
                $('#no-msg').hide();
                $('#no-msg').text(response.errormsg);
                $('#messageContainer').show(); 
                $('.cnt-col .cnt-cl').eq(0).removeClass('act');
                $('ul li').eq(0).addClass('selected');
                var i=0;
                var readstatus='';
                
                //for (i; i < response.data.length; i++) 
                
                // Reverse iterate through the response.data array to display messages in descending order
                for (var i = response.data.length - 1; i >= 0; i--) {
                    var msgId = response.data[i].msgid;
                    //alert(msgId);
                    var msgTitle = response.data[i].msgtitle;
                    var msgBody = response.data[i].msgbody;
                    msgsplitbody = msgBody.substring(0,30) + "..."
                    var sentOn = response.data[i].sentOn;
                    var readstatus= response.data[i].readstatus;
            
                    var str_html_content='<li cont-list data-msg='+ msgId +'> \
                        <div class="msg-id">'+ msgId +'</div> \
                        <div class="msg-txt"> \
                            <h3>'+ msgTitle +'</h3> \
                            <p>'+ msgsplitbody +'</p> \
                        </div> \
                        <div class="msg-time">'+ sentOn +'</div> \
                        <div class="msg-img"><img src="' + (readstatus === "Read" ? 'images/emailopen.svg' : 'images/email.svg') + '"></div> \
                    </li>';
                    li_html_from_api += str_html_content;                        
                }
                document.getElementById("messageContainer").innerHTML = li_html_from_api;
                $('.msgcontent li').eq(0).addClass("selected");
                nodes = document.querySelectorAll('li');

                select(nodes[selected]);

            }
        },
        error: function () {
            // document.getElementById("logtext").innerHTML +="Error loading messages";
            // console.log("Error loading messages");
        }
    });
}


function fngetguestinfofromwebapi() {
    if (guestroomno != '') {
        var url = "http://" + middleware_ip + "/gdetails/api/v1/gustmngmt.php?roomno=" + guestroomno;
        //console.log("request url " + url);
        fetch(url)
            .then(response => response.json()) //The response is parsed as JSON using the .json() method. 
            .then(data => {
                //debugger;
               // if (data.data.length == 0)
                if(data.errorcode === "1"){
                    $('#no-msg').show();
                    $('#no-msg').text(data.message);
                    //$('#no-msg').text('No records');
                    $('#messageContainer').hide(); 
                    //$('.cnt-col .cnt-cl').eq(0).addClass('act');
                    ischeckout=true;
                    return;
                }else {
                    displaymessagelist()
                    //$('.cnt-col .cnt-cl').eq(0).removeClass('act');
                }
            })
            .catch(error => {
                console.log("Error:", error);
            });
    }
    else{
        //$('#no-msg').show();
    }
}

var message_keyevents = {
    KeyHandler: function (e) {


        if (e.keyCode === 38) { // up
            if(!$('.cnt-col .cnt-cl').eq(0).hasClass('act')){
                select(nodes[selected - 1]);
            }
        }
        if (e.keyCode === 40) { // down
            if(!$('.cnt-col .cnt-cl').eq(0).hasClass('act')){
                select(nodes[selected + 1]);            
            }
        }

        if (e.keyCode === 39) { //Right
            

            if(($('#messageContainer li').length > 0)){
                if($('.cnt-col .cnt-cl').eq(0).hasClass('act')){                    
                    $('.cnt-col .cnt-cl').eq(0).removeClass('act');
                    nodes[selected].classList.add('selected'); // Message list highlight
                }
            }
        }

        if (e.keyCode === 37) { //Left
            

            if(($('#messageContainer li').length > 0)){
                if(!$('.cnt-col .cnt-cl').eq(0).hasClass('act')){
                    document.querySelector('li.selected').classList.remove('selected'); // Message list highlight remove
                    $('.cnt-col .cnt-cl').eq(0).addClass('act'); // home highlight              
                }
            }      
            
        }

        if (e.keyCode == 10182 || e.keyCode == 10009) {
            bckbtnpressed();
        }
        if (e.keyCode == 10071) {
            homepageshowing();
        }

        if (e.keyCode === 13) { // Enter
            if ($('.cnt-col .cnt-cl').eq(0).hasClass('act')) {
                var href = $('.cnt-cl.act .loc-url').attr('href');
                // var menu_select = $('.cnt-cl.act').data("id");
                if (href.length > 0) {
                    setTimeout(function () { window.location = (href); }, 100);
                }
            } 
            else {
                str_msg_id = $('li.selected').attr('data-msg');
                setTimeout(function () { window.location.href = "messagesshow.html?id=" + str_msg_id + "&room=" + guestroomno; }, 500);

            }
            var str_log = 'Home_page';
            fnch_logwriter(str_log, 0, 0);
        }
        e.preventDefault();
    }
};
////*******End Message list related functions */

////*************** Show Message related functions */
function show_Message(arg_msgid) {
    // $('#no-msg').css('display','block'); // jquery css way of show
    // if (ischeckout)
    //     return;
    var url = 'http://' + middleware_ip + '/AdminPanel/main/template/Api/guestmessagedetails.php?roomno=' + guestroomno + '&accesskey=testtvapi';
    console.log(url);
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        success: function (response) {           
            if (response == null)
                return;
            if (response.errorcode != undefined && response.errorcode != '00') {
                $('#no-msg').show();
                $('#no-msg').text(response.errormsg);
                return;
            }
            var output = "";
            if (response.data != undefined && response.data != null && response.data != '') {
                const rpJSON = JSON.stringify(response.data);
                $('#no-msg').hide();
                response.data.forEach(function (element) {
                    var msgId = element.msgid;
                    if (arg_msgid==msgId){
                        if (guestroomno != '')
                            readonsts(guestroomno, msgId, accesskey);
                        var msgTitle = element.msgtitle;
                        var msgBody = element.msgbody;
                     
                        var filepathArray = element.filepath;
                        var fileType  = element.filetype;

                        var images = element.filepath;
                        var filepaths = [];

                        for (var i = 0; i < images.length; i++) {
                            filepaths.push('http://' + middleware_ip + '/AdminPanel/main/template/' + '/' + images[i]);
                        }

                        if (filepathArray !== '') {

                            var  imgpath = 'http://' + middleware_ip + '/aravalli/images/thumbnail_flower-bouquet.gif';
                            
                            //image and content
                            if ( msgBody.toUpperCase().trim() != 'IMAGE' && msgBody.toUpperCase().trim() != 'VIDEO' && fileType == '0' ) {

                                var carouselItems = '';
                                var indicators = '';

                                for (var i = 0; i < filepaths.length; i++) {
                                    var activeClass = i === 0 ? 'active' : '';

                                    if (filepaths.length > 1) {
                                        indicators += '<li data-target="#carouselEvent" data-slide-to="' + i + '" class="' + activeClass + '"></li>';
                                    }

                                    carouselItems += 
                                        '<div class="carousel-item embed-responsive-item servc-sldr ' + activeClass + '">' +   
                                            '<div class="sld-inner bg-dark">' +      
                                                '<div class="evnt-pic" id="img">' +
                                                    '<img src="' + filepaths[i] + '" class="img-fluid pic-height">' +
                                                '</div>' +                                       
                                            '</div>' +
                                        '</div>';
                                }

                                var msgImg = 
                                        '<div id="carouselEvent" class="carousel carousel-fade m-auto msg-crosl img-cont-mess" data-ride="carousel" data-interval="5000">' +                                    
                                            '<div class="row">' +
                                                '<div class="carousel-inner embed-responsive embed-responsive-16by9 restrnt" role="listbox">' +
                                                    (filepaths.length > 1 ? '<ol class="carousel-indicators hlf-sld-indi">' + indicators + '</ol>' : '') +
                                                    
                                                    '<div id="message-list" class="row">' +
                                                        carouselItems +
                                                        '<div class="carousel-caption-stable">' +
                                                            '<h3 class="text-success">' + msgTitle + '</h3>' +
                                                            '<hr class="bg-white">' +
                                                            '<p class="text-white" id="msgbody">' + msgBody + '</p>' +
                                                        '</div>' +
                                                    '</div>' +
                                                '</div>' +
                                        '</div>';


                                output += msgImg;      // Append this messageHtml to the output
                                document.getElementById("message-list").innerHTML = output;
                                return;
                            }
                            //image & video only 
                            if ( msgBody.toUpperCase().trim() == 'IMAGE' || msgBody.toUpperCase().trim() == 'VIDEO' || fileType == '1' ) {
                                
                                var carouselIndicators = '';
                                var carouselItems = '';

                                for (var i = 0; i < filepaths.length; i++) {
                                    var activeClass = i === 0 ? 'active' : '';
                                    
                                    if (filepaths.length > 1) {
                                        carouselIndicators += '<li data-target="#carouselEvent" data-slide-to="' + i + '" class="' + activeClass + '"></li>';
                                    }

                                    var mediaTag = '';
                                    if (fileType == 0) {
                                        mediaTag = '<img src=" '+ filepaths[i] +' " alt="" class="w-100">';
                                    } 
                                    else if (fileType == 1) {
                                        mediaTag = '<video class="img-fluid pic-height" src=" '+ filepaths[i] +' "> </video>';
                                    }

                                    carouselItems += 
                                        '<div class="carousel-item ' + activeClass + '">' +
                                            '<div class="caru-imageOnly">' +
                                                mediaTag +
                                            '</div>' +
                                        '</div>';
                                }

                                var fullImgOnly = 
                                    '<div id="carouselEvent" class="carousel carousel-fade m-auto msg-crosl img-mess" data-ride="carousel" data-interval="5000">' +                                  
                                        '<div class="carousel-inner" role="listbox">' +
                                            (filepaths.length > 1 ? '<ol class="carousel-indicators">' + carouselIndicators + '</ol>' : '') +
                                            carouselItems +
                                        '</div>'
                                    '</div>';

                                output += fullImgOnly;      // Append this messageHtml to the output

                                document.getElementById("message-list").innerHTML = output;

                                return;
                            }
                            
                            
                        }
                        //content only
                        else{
                            var message  =  '<div class="carousel-item embed-responsive-item servc-sldr active splash-contOnly">' +
                                                '<div class="row sld-inner">' +
                                                    '<div class="carousel-caption text-white col-12 text-left pl-3 pr-3 pt-3 " id="msgtitle">' +
                                                        '<h3 class="text-success">' + msgTitle + '</h3>' +
                                                        '<hr class="bg-white">' +
                                                        '<p class="text-white" id="msgbody">' + msgBody + '</p>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>';
                   
                            output += message;  
                            document.getElementById("message-list").innerHTML = output;
                        }
                    }

                    });

                document.getElementById("message-list").innerHTML = output;
                $('#carouselEvent').carousel();

                $('#message-list .carousel-item').each(function (i, item) {
                            
                    if (i === 0) {
                        const firstChild = $(item).find('img, video').first();
                        if (firstChild.prop('tagName').toLowerCase() === 'video') {
                            
                            VideoCallFunction();
                        }
                    }
                });

                document.querySelectorAll('#message-list .carousel-item video').forEach(video => {
                    addVideoEventListenersMessages(video);
                });

                $('#message-list #carouselEvent').on('slid.bs.carousel', function (e) {
                    VideoCallFunction();
                });
            }
            else {
                $('#no-msg').show();
            }
        },
        error: function (xhr, status, error) {
            console.log("Error:", error);
        }

    });
}



function readonsts(roomno, msgId, accesskey) {
    var url = 'http://' + middleware_ip + '/AdminPanel/main/template/Api/ReadandUnreadmsg.php?roomno=' + guestroomno + '&msgid=' + msgId + '&accesskey=testtvapi';
    //console.log(url);
    $.ajax({
        type: "POST",
        url: url,
        dataType: 'json',
        success: function (response) {
        }
    });

}

var showmsg_keyevents = {
    KeyHandler: function (e) {
        // e.preventDefault();
        var keyCode = e.keyCode
        // console.log("keyCode " + keyCode);
        //document.getElementById("logtext").innerHTML += "<br> keyCode " + keyCode;

        // if (e.keyCode == 39) {
        //     $("#carouselExampleControlsNoTouching").carousel("next");
        // }
        // if (e.keyCode == 37) {
        //     $("#carouselExampleControlsNoTouching").carousel("prev");
        // }

        if (e.keyCode === 13) { // Enter

            var href = $('.cnt-cl.act .loc-url').attr('href');
            // var menu_select = $('.cnt-cl.act').data("id");
            if (href.length > 0) {
                setTimeout(function () { window.location = (href); }, 500);
            }
            var str_log = 'Home_page';
            fnch_logwriter(str_log, 0, 0);
        }

        if (e.keyCode == 10182 || e.keyCode == 10009) {
            bckbtnpressed();
        }
        if (e.keyCode == 10071) {
            homepageshowing();
        }
    }
};

////*******End Show Message related functions */




function VideoCallFunction() {
    var videos = document.querySelectorAll('#message-list .carousel-item video');
    
    videos.forEach(video => {
        video.pause();
    });

    var activeItem = document.querySelector('#message-list .carousel-item.active');
    var activeVideo = activeItem.querySelector('video');

    // document.getElementById("logtext").innerHTML += "<br> data "+activeVideo.src+ "video" + activeVideo;

    if (activeVideo) {
        activeVideo.src = activeVideo.src;
        activeVideo.load(); // Reload the activeVideo element to apply the new source
        activeVideo.play(); // Play the activeVideo
    }        
}

function addVideoEventListenersMessages(videoElementId) {

    videoElementId.addEventListener('play', function() {
        setTimeout(() => {
            $('#carouselEvent').carousel('pause');
        }, 2000);
        
    });
    videoElementId.addEventListener('ended', function() {
        $('#carouselEvent').carousel('next');
        $('#carouselEvent').carousel('cycle');
    });
}

