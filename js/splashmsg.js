var msgId;
var count_b1 = 0, totalLen_b1 = $('#evnt-modal .cnt-col .cnt-cl').length;
$('#evnt-modal .cnt-col .cnt-cl').removeClass('act').eq(count_b1).addClass('act');
$(document).on('keyup', function (e) {

    if (e.keyCode == 37) {
        console.log(e.keyCode);
        jQuery('button.carousel-control-prev').trigger('click');
        $('#carouselEventSplash').carousel();
        count_b1++;
        if (count_b1 >= totalLen_b1) count_b1 = 0
    }

    else if (e.keyCode == 39) {
        console.log(e.keyCode);
        jQuery('button.carousel-control-next').trigger('click');
        $('#carouselEventSplash').carousel();
        count_b1--
        if (count_b1 < 0) count_b1 = totalLen_b1 - 1;
    }

    $('#evnt-modal .cnt-col .cnt-cl').removeClass('act').eq(count_b1).addClass('act');

    if (msg_shw_flag == 0) {
        return;
    }

    if($('#evnt-modal .cnt-col button').length != 0){

        if ($('#evnt-modal .cnt-col .cnt-cl').length != 1) {
            if (e.keyCode == 13) {
               var btn_select = $('#evnt-modal .cnt-cl.act').data("response");
               if (btn_select == 'Home') {
                   $('#evnt-modal').modal('hide');
                   readonstsHome(guestroomno, msgId , 0);
                   msg_shw_flag = 0;
               }
               if (btn_select == 'Dont show again') {
                   $('#evnt-modal').modal('hide');
                   readonstsHome(guestroomno, msgId , 1);
                   msg_shw_flag = 0;
               }
               playHomePageVideo();
            }
        }
        else{
           if (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 13) {
               var btn_select = $('#evnt-modal .cnt-cl.act').data("response");
               if (btn_select == 'Home') {
                   msg_shw_flag = 0;
                   $('#evnt-modal').modal('hide');
                   readonstsHome(guestroomno, msgId , 0);
               }
               if (btn_select == 'Dont show again') {
                   msg_shw_flag = 0;
                   $('#evnt-modal').modal('hide');
                   readonstsHome(guestroomno, msgId , 1);
               }
               playHomePageVideo();
           }
        }
    }
    else{
        // if (e.keyCode === 13) {
            // if (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 13) {
            msg_shw_flag = 0;
            $('#evnt-modal').modal('hide');
            readonstsHome(guestroomno, msgId , 0);
            playHomePageVideo();

        // }
    }

});



function displaySplashMsg() {

    var url = 'http://' + middleware_ip + '/AdminPanel/main/template/Api/guestmessagedetails-home.php?roomno=' + guestroomno + '&accesskey=testtvapi';
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        success: function (response) {
           

            if (response == null)
                return;
            if (response.errorcode != undefined && response.errorcode != '00') {
                return;
            }
            if (response.data != undefined && response.data != null && response.data != '') {

                const getLastMsg = (response.data.length - 1);
                const eventData = response.data[getLastMsg];

                var msgtitle = response.data[getLastMsg].msgtitle;
                var msgbody = response.data[getLastMsg].msgbody;
                var msgBtn  = response.data[getLastMsg].Splashbutton;
                msgId = response.data[getLastMsg].msgid;
                var imagesAndVideos = response.data[getLastMsg].filepath;
                var filepaths = [];
                

                var fileType  = response.data[getLastMsg].filetype;


                for (var i = 0; i < imagesAndVideos.length; i++) {
                    filepaths.push('http://' + middleware_ip + '/AdminPanel/main/template//' + imagesAndVideos[i]);
                }

                //Splash msg show or not
                if(eventData.msgdisplaySplash == 'IsAvailable' && eventData.msgshowenable == '0'){
                    msg_shw_flag = 0;
                    $('#evnt-modal').modal('hide');
                }
                else{

                    // msgdisplayformat 0--->popup , 1--->fullscreen
                    if(eventData.msgdisplayFormat == '0'){
                        $('.modal-dialog').addClass('md-modal');
                    }
                    //content only
                    if(eventData.filepath.length <= 0){


                        var contentOnly =
                                    '<div id="carouselEvent" class="carousel carousel-fade m-auto msg-crosl" data-ride="carousel" data-interval="3000">' +
                                        '<div class="row">' +
                                            '<div class="text-white col-12 text-left pt-3 bg-dark" id="msgtitle">' +
                                                '<h3 class="text-success">' + msgtitle + '</h3>' +
                                                '<hr class="bg-white">' +
                                                '<p class="text-white" id="msgbody">' + msgbody + '</p>' +
                                            '</div>' +
                                        '</div>'
                                    '</div>';


                        $('#splsMsgImgContent').innerHTML = '';
                        $('#splsMsgImgOnly').innerHTML = '';
                        document.getElementById("splsMsgContentOnly").innerHTML = contentOnly;

                        $('#splsMsgContentOnly').show();
                        $('#splsMsgImgContent').hide();
                        $('#splsMsgImgOnly').hide();


                    }
                    //image and content
                    else if (eventData.msgbody.toUpperCase().trim() != 'IMAGE' && eventData.msgbody.toUpperCase().trim() != 'VIDEO' && fileType == '0') {

                        // Carousel items HTML string
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
                                '<div id="carouselEvent" class="carousel carousel-fade m-auto msg-crosl " data-ride="carousel" data-interval="5000">' +
                                    '<div class="row img-conte-splash">' +
                                        '<div class="carousel-inner embed-responsive embed-responsive-16by9 restrnt" role="listbox">' +
                                            (filepaths.length > 1 ? '<ol class="carousel-indicators hlf-sld-indi">' + indicators + '</ol>' : '') +

                                            '<div id="message-list" class="row">' +
                                                carouselItems +
                                                '<div class="carousel-caption-stable">' +
                                                    '<h3 class="text-success">' + msgtitle + '</h3>' +
                                                    '<hr class="bg-white">' +
                                                    '<p class="text-white" id="msgbody">' + msgbody + '</p>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                '</div>';


                        $('#splsMsgImgOnly').innerHTML = '';
                        $('#splsMsgContentOnly').innerHTML = '';
                        document.getElementById("splsMsgImgContent").innerHTML = msgImg;

                        $('#splsMsgImgContent').show();
                        $('#splsMsgImgOnly').hide();
                        $('#splsMsgContentOnly').hide();

                        // $('.nav-info').addClass('text-white');
                    }
                    //image Only
                    else if (eventData.msgbody.toUpperCase().trim() == 'IMAGE' || eventData.msgbody.toUpperCase().trim() == 'VIDEO' || fileType == '1') {
                        var carouselIndicators = '';
                        var carouselItems = '';
                        // document.getElementById("logtext").innerHTML +="<br>video play start";

                        for (var i = 0; i < filepaths.length; i++) {
                            var activeClass = i === 0 ? 'active' : '';

                            if (filepaths.length > 1) {
                                carouselIndicators += '<li data-target="#carouselEvent" data-slide-to="' + i + '" class="' + activeClass + '"></li>';
                            }

                            var mediaTag = '';
                            if (fileType == 0) {
                                mediaTag = `<img src="${filepaths[i]}" alt="">`;
                            }
                            else if (fileType == 1) {
                                mediaTag = `<video class="img-fluid pic-height w-100" src="${filepaths[i]}" loop></video>`;
                            }

                            carouselItems +=
                                '<div class="carousel-item d-flex splash-image ' + activeClass + '">' +
                                    '<div class="d-flex justify-content-center min-vh-100 w-100 ' +  ((eventData.msgdisplayFormat == '0') ? " align-items-center " : '') + ' "> ' +
                                        mediaTag +
                                    '</div>' +
                                '</div>';
                        }

                        var fullImgOnly =
                            '<div id="carouselEvent" class="carousel carousel-fade m-auto msg-crosl" data-ride="carousel" data-interval="5000">' +
                                '<div class="carousel-inner" role="listbox">' +
                                    (filepaths.length > 1 ? '<ol class="carousel-indicators">' + carouselIndicators + '</ol>' : '') +
                                    carouselItems +
                                '</div>'
                            '</div>';

                        $('#splsMsgImgContent').innerHTML = '';
                        $('#splsMsgContentOnly').innerHTML = '';
                        document.getElementById("splsMsgImgOnly").innerHTML = fullImgOnly;

                        $('#splsMsgImgOnly').show();
                        $('#splsMsgImgContent').hide();
                        $('#splsMsgContentOnly').hide();

                        $('#splsMsgImgOnly .carousel-item').each(function (i, item) {

                            if (i === 0) {
                                const firstChild = $(item).find('img, video').first();
                                if (firstChild.prop('tagName').toLowerCase() === 'video') {
                                    VideoCallFunction();
                                }
                            }
                        });

                       
                            

                    }


                    $('#carouselEvent').carousel();

                    document.querySelectorAll('#splsMsgImgOnly .carousel-item video').forEach(video => {
                        addVideoEventListenersSplashMsg(video);
                    });

                    $('.modal #splsMsgImgOnly #carouselEvent').on('slid.bs.carousel', function (e) {
                        VideoCallFunction();
                    }); 

                    $('#evnt-modal').modal('show');
                    msg_shw_flag = 1;


                    var buttonContainer = document.querySelector('.button-action');

                    for (var i = 0; i < msgBtn.length; i++) {
                        var button = document.createElement('button');
                        button.type = 'button';
                        button.className = 'btn btn-dark cnt-cl mr-1';
                        if (i === 0) {
                            button.classList.add('act');
                        }
                        button.setAttribute('data-response', ( i == 0 ? msgBtn[i] : 'Dont show again'));
                        button.textContent = msgBtn[i];
                        buttonContainer.appendChild(button);
                    }

                    if (msgBtn.length == 0) {

                        // var splashNavigateMsg = '<span class="badge badge-primary badge-info">' +
                        //                             'Press '+
                        //                             '<span>navigation</span>'+
                        //                             '<img src="images/remote-icon.png"  alt=""> '+
                        //                            ' to open'+
                        //                             '<span> Home page </span>'+
                        //                         '</span>' ;

                        var splashNavigateMsg = '<span class="badge badge-primary badge-info">' +
                                                    'Press '+
                                                    '<span>any key</span>'+
                                                    ' to'+
                                                    '<span> Home</span>'+
                                                '</span>' ;

                        $('.button-action #shw-indi').html(splashNavigateMsg);

                    }

                }

            }
            else {
                $('#no-msg').show();
            }
        },
        error: function () {
            console.log("Error loading messages");
        }
    });
}

function readonstsHome(guestroomno, msgId , keyVal) {
    var url = 'http://' + middleware_ip + '/AdminPanel/main/template/Api/ReadandUnreadmsg-home.php?roomno=' + guestroomno + '&msgid=' + msgId + '&accesskey=testtvapi' + '&keyvalue=' + keyVal;
    console.log(url);
    $.ajax({
        type: "POST",
        url: url,
        dataType: 'json',
        success: function (response) {
        }
    });

}


  



function VideoCallFunction() {
    var videos = document.querySelectorAll('#splsMsgImgOnly .carousel-item video');
    console.log(videos,"videos");

    videos.forEach(video => {
        video.pause();
    });

    var activeItem = document.querySelector('#splsMsgImgOnly .carousel-item.active');
    var activeVideo = activeItem.querySelector('video');

    if (activeVideo) {
        activeVideo.src = activeVideo.src;
        activeVideo.load(); // Reload the activeVideo element to apply the new source
        activeVideo.play(); // Play the activeVideo
    }
}


function playHomePageVideo(){
    var videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.pause();
        });
        var activeItem = document.querySelector('#carousel-fade .carousel-item.active');
        console.log(activeItem);

        var activeVideo = activeItem.querySelector('video');
        if (activeVideo) {
            activeVideo.src = activeVideo.src;
            activeVideo.load(); // Reload the activeVideo element to apply the new source
            activeVideo.play(); // Play the activeVideo
        }
}

function addVideoEventListenersSplashMsg(videoElementId) {
    console.log("work",videoElementId);
    
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




//  All splash show code 

// function displaySplashMsg() {

//     // var url = 'http://' + middleware_ip + '/AdminPanel/main/template/Api/guestmessagedetails-home.php?roomno=' + guestroomno + '&accesskey=testtvapi';
//     var url = 'http://' + middleware_ip + '/AdminPanel/main/template/Api/guestmessagedetails-home.php?roomno=' + guestroomno + '&accesskey=testtvapi';
//     $.ajax({
//         type: "GET",
//         url: url,
//         dataType: 'json',
//         success: function (response) {
//             if (response == null)
//                 return;
//             if (response.errorcode != undefined && response.errorcode != '00') {
//                 return;
//             }
//             if (response.data != undefined && response.data != null && response.data != '') {
//                 for (let index = 0; index < response.data.length; index++) {
//                     const getLastMsg = (response.data.length - 1);
//                     const eventData = response.data[index];
//                     const msgtitle = eventData.msgtitle;
//                     const msgbody = eventData.msgbody;
//                     const msgBtn = response.data[getLastMsg].Splashbutton;
//                     const msgId = eventData.msgid;
//                     const images = eventData.filepath;
//                     const fileType = eventData.filetype;
//                     const filepaths = [];

//                     if( response.data[getLastMsg].msgdisplayFormat == '0'){
//                         $('.modal-dialog').addClass('md-modal');
//                     }

//                     for (let i = 0; i < images.length; i++) {
//                         filepaths.push('http://' + middleware_ip + '/AdminPanel/main/template/' + '/' + images[i]);
//                     }

//                     // Splash msg show or not
//                     if (eventData.msgdisplaySplash === 'IsAvailable' && eventData.msgshowenable === '0') {

//                     }
//                     else {
//                         let carouselItems = '';

//                         //content only
//                         if(eventData.filepath.length <= 0){
//                             carouselItems += '<div class="carousel-item">' +
//                                                 '<div class="content-only row h-100 d-flex justify-content-center align-items-center">' +
//                                                     '<div class="text-white col-12 text-left pt-3 bg-dark" id="msgtitle">' +
//                                                         '<h3 class="text-success">' + msgtitle + '</h3>' +
//                                                         '<hr class="bg-white">' +
//                                                         '<p class="text-white" id="msgbody">' + msgbody + '</p>' +
//                                                     '</div>' +
//                                                 '</div>'
//                                             '</div>';
//                         }
//                         //image or video only
//                         for (let i = 0; i < filepaths.length; i++) {

//                             let mediaTag = '';
//                             let content = '';

//                             if (fileType === '0') { // Image

//                                 if(eventData.msgbody.toUpperCase().trim() != 'IMAGE' && eventData.msgbody.toUpperCase().trim() != 'VIDEO' && fileType == '0'){
//                                     content += '<div class="text-white col-4 text-left bg-dark" id="msgtitle">' +
//                                                     '<h3 class="text-success">' + msgtitle + '</h3>' +
//                                                     '<hr class="bg-white">' +
//                                                     '<p class="text-white" id="msgbody">' + msgbody + '</p>' +
//                                                 '</div>';
//                                 }
//                                 mediaTag = `<img src="${filepaths[i]}" class="img-fluid pic-height ${(content == '' ? '' : 'col-8 p-0')}">`;
//                             }
//                             else if (fileType === '1') { // Video

//                                 if(eventData.msgbody.toUpperCase().trim() != 'IMAGE' && eventData.msgbody.toUpperCase().trim() != 'VIDEO' && fileType == '1'){
//                                     content += '<div class="text-white col-4 text-left pt-3 bg-dark" id="msgVideo">' +
//                                                     '<h3 class="text-success">' + msgtitle + '</h3>' +
//                                                     '<hr class="bg-white">' +
//                                                     '<p class="text-white" id="msgbody">' + msgbody + '</p>' +
//                                                 '</div>';
//                                 }
//                                 mediaTag = `<video class="img-fluid pic-height w-100" src="${filepaths[i]}"></video>`;
//                             }

//                             carouselItems += `
//                                 <div class="carousel-item">
//                                     <div class="row d-flex justify-content-center align-items-center min-vh-100 ${(eventData.msgdisplayFormat === '0') ? 'align-items-center' : ''}">
//                                         ${mediaTag}
//                                         ${(content == '' ? '' : content)}
//                                     </div>
//                                 </div>`;
//                         }

//                         document.getElementById("splash-messages").innerHTML += carouselItems;

//                         //this below one is home and exit buttons (or) press navigation to home page bar
//                         if (msgBtn.length > 0) {
//                             for (let i = 0; i < msgBtn.length; i++) {
//                                 const button = document.createElement('button');
//                                 button.type = 'button';
//                                 button.className = 'btn btn-dark cnt-cl mr-1';
//                                 if (i === 0) {
//                                     button.classList.add('act');
//                                 }
//                                 button.setAttribute('data-response', (i === 0 ? msgBtn[i] : 'Don\'t show again'));
//                                 button.textContent = msgBtn[i];
//                                 buttonContainer.appendChild(button);
//                             }
//                         }else {
//                             const splashNavigateMsg = `
//                                 <span class="badge badge-primary badge-info">
//                                     Press
//                                     <span>navigation</span>
//                                     <img src="images/remote-icon.png" alt="">
//                                     to open
//                                     <span> Home page </span>
//                                 </span>`;
//                             $('.button-action #shw-indi').html(splashNavigateMsg);
//                         }


//                     }
//                 }

// /////////////////////////////////////////////////////////////
//                 $('#splash-messages .carousel-item').first().addClass('active');
//                 let carouselIndicatorHtml = '';
//                 let carouselArrow = "";
//                 var splsMsglength = $('#splash-messages .carousel-item').length;

//                 if (splsMsglength > 1) {
//                     var carouselIndicators = ''; // initialize an empty string
//                     for (var i = 0; i < splsMsglength; i++) {
//                         if (i === 0) {
//                             carouselIndicators += `<li data-target="#carouselEventSplash" data-slide-to="${i}" class="active"></li>`;
//                         } else {
//                             carouselIndicators += `<li data-target="#carouselEventSplash" data-slide-to="${i}"></li>`;
//                         }
//                     }
//                     carouselIndicatorHtml = `<ol class="carousel-indicators">${carouselIndicators}</ol>`;
//                 }
//                 carouselArrow = `<button class="carousel-control-prev" type="button" data-target="#carouselEventSplash"
//                                     data-slide="prev">
//                                     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//                                     <span class="sr-only">Previous</span>
//                                 </button>
//                                 <button class="carousel-control-next" type="button" data-target="#carouselEventSplash"
//                                     data-slide="next">
//                                     <span class="carousel-control-next-icon" aria-hidden="true"></span>
//                                     <span class="sr-only">Next</span>
//                                 </button>`;



//                 document.getElementById("carouselEventSplash").innerHTML += carouselIndicatorHtml;
//                 document.querySelector(".carousel-control").insertAdjacentHTML("beforeend", carouselArrow);

//                 $('.carouselSplashControls .carousel-item').each(function (i, item) {
//                     if (i === 0) {
//                         const firstChild = $(item).find('img, video').first();
//                         if (firstChild && firstChild.length === 1) { // check if firstChild is not null/undefined and is an element node
//                             if ($(firstChild).prop('tagName').toLowerCase() === 'video') {
//                                 VideoCallSplashFunction();
//                             }
//                         }
//                     }
//                 });


//                 $('#evnt-modal').modal('show');
//                 $('#carouselEventSplash').carousel();
//                 msg_shw_flag = 1;


//                 document.querySelectorAll('.carouselSplashControls .carousel-item video').forEach(video => {
//                     addVideoEventListenersSplash(video);
//                 });

//             }
//             else {
//                 $('#no-msg').show();
//             }
//         },
//         error: function () {
//             console.log("Error loading messages");
//         }
//     });
// }

// $('.modal #carouselEventSplash').on('slid.bs.carousel', function (e) {
//     VideoCallSplashFunction();
// });

// function VideoCallSplashFunction() {
//     var videos = document.querySelectorAll('video');
//     videos.forEach(video => {
//         video.pause();
//     });
//     var activeItem = document.querySelector('.carouselSplashControls .carousel-item.active');
//     var activeVideo = activeItem.querySelector('video');
//     if (activeVideo) {
//         activeVideo.src = activeVideo.src;
//         activeVideo.load(); // Reload the activeVideo element to apply the new source
//         activeVideo.play(); // Play the activeVideo
//     }
// }

// function addVideoEventListenersSplash(videoElementId) {
//     videoElementId.addEventListener('play', function() {
//         $('#carouselEventSplash').carousel('pause');
//     });
//     videoElementId.addEventListener('ended', function() {
//         $('#carouselEventSplash').carousel('next');
//         $('#carouselEventSplash').carousel('cycle');
//     });
// }
