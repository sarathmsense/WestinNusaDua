var htmlsourcestatus = 0;
var cmdresponse='false';
var varClear=0;
var UrlString="";
var ir_previoutime2=0;

//*** Dynamic channel list common variables */  
var html = "";
//Fetching API data 
var dynamic_chimge_url = "http://" + middleware_ip + "/"+Projctfldr+"/images/chnl_imgs/";
//*** End Dynamic channel list common variables */

function channel_handlerv1(chnum,chname) {    
    var diff = Date.now() - ir_previoutime2; 
    // if(diff < 300)
	// 	return;
    if (irkitip=="" || irkitip=='0' || irkitip=='noip' || chnum==""){
        fn_logwriter("irkitip: "+irkitip+" chnum:"+chnum+ " Ch Name:"+chname);
    }
   
    UrlString="http://"+irkitip+"/setCH?ChNum="+chnum;
    //console.log("UrlString: " + UrlString);

    cmdresponse='true';
    if (varClear!=0)
        clearTimeout(varClear);

    varClear = setTimeout(function(){ if(cmdresponse=='true'){
        fn_logwriter("UrlString: " + UrlString +" No Response");
    }
    }, 4000);
   
   
    UrlString="irhandler.php?runcmd="+chnum+"&strchname="+chname+"&irkitip="+irkitip+"&tvroom="+LGTVRoom;
    
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    //console.log("readyState: "+this.readyState+ " status: "+this.status);
        if (this.readyState == 4 && this.status == 200) { //make it work
            if (chnum.includes("a") && this.responseText=="ok_success")
                setState('1');
            //if (chnum=='S')
            if (chnum=='b' && this.responseText=="ok_success")
                setState('0');
            cmdresponse='false';
            if (this.responseText=="ok_success"){
                var str_log='Ch_NO:'+chnum+' Ch_Name: '+chname;
                fnch_numandname(str_log,LGTVRoom,1,chname,chnum);
            }
        }
    };
    xhttp.open("GET", UrlString);
    xhttp.timeout = 5000;//in millsecond
    xhttp.send();
  
}

function fn_logwriter(logtowrite){
    $.ajax({
        type: "GET",
        //url: "../apichlogwriter.php?strlog="+logtowrite+"&lgtvroom="+LGTVRoom,
		url: "apichlogwriter.php?strlog="+logtowrite+"&lgtvroom="+LGTVRoom,
       success: function(data) {
         
        }
    });
}

function createList(channeljson) {
    var channelList = "";
    // document.getElementById("logtext").innerHTML += "<br>  createList "+JSON.stringify(channeljson);
    for (var i = 0; i < channeljson.length; i++) {
        // console.log(channeljson);
        var id = i + 1;
        channelList += '<div class="col pt-0 bg-white"' +
            'data-id="' + channeljson[i].channelname + '"' +
            'data-index="' + id + '">' +
            '<img src="' + dynamic_chimge_url + channeljson[i].channellogo + '" class="chnl-pic"/>' +
            '<div class="label-logo">' + channeljson[i].channelname + ' </div>' +
            '</div>';
    }
    return channelList;
}
function api_login() {
    // try { 
    var channelSec = document.querySelector(".chnl-sec");
    var var_ulelement = document.createElement('ul');
    channelSec.appendChild(var_ulelement).setAttribute("id", "list");
    $("#list").addClass("channel-lst text-uppercase pl-0 mb-0");
    channelSec.appendChild(var_ulelement).setAttribute("data-position", "1");
    // var API_CH_URL = "./channel_mgmt.json";
    var API_CH_URL = "http://" + middleware_ip + "/AdminPanel/main/template/channelApi/channel_mgmt_fetch.php?hotelid=10&hotelname=westinnusadua";
    // document.getElementById("logtext").innerHTML += "<br>  API_CH_URL " + API_CH_URL;
    var json_result = null;
    $.ajax({
        type: "POST",
        url: API_CH_URL,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            // alert(data); // apple           
            if (data != '') {
                
                var dataObj = data;
                // document.getElementById("logtext").innerHTML += "<br>  data "+dataObj;
                var menu_list = dataObj.data;
                // document.getElementById("logtext").innerHTML += "<br>  menu_list "+typeof menu_list;
                for (var i = 0; i < menu_list.length; i++) {

                    console.log(menu_list[i].Channels, 'Array');
                    var id = i + 1;
                    var className = (i == 0) ? "selected" : "";

                    html += '<li id=' + id + ' class="' + className + '">' +
                        '<span class="txt-sel">' + menu_list[i].category + '</span>' +
                        '<div class="cont-list row">' + createList(menu_list[i].Channels) + '</div>' +
                        '</li>';
                    
                }
                html += "</ul >";
                $('.skelton-main').hide();
                var arrow = '<span class="arw-up"><img src="images/arrow_up.png" alt=""></span><span class="arw-dwn act"><img src="images/arrow_bottom.png" alt=""></span>'
                document.querySelector("#list").insertAdjacentHTML("beforeend", html);
                document.querySelector("#channel-arrows").insertAdjacentHTML("beforeend",arrow)
            } else 
                show_msg_guest('No channel data. Please check WiFi connection ID05');
        }
    });
    
}

