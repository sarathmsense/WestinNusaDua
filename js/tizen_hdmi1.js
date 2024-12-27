
var resource_status=false;
//Initialize function
var init = function () {
    console.log('web api tv window init() called');
    
    document.addEventListener('visibilitychange', function() {
        if(document.hidden){
            // Something you want to do when hide or exit.
			console.log("Something you want to do when hide");
			tizen.tvwindow.hide(function() {
				console.log("hidden");
				window.location = "loader.html?fromurl=tvchnl";
			});   
        } else {
            // Something you want to do when resume.
        }
    });
	
    // add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
    		// case 49: // 1 key
    		// 	launchSource("HDMI");
			// break;
			// case 50: // 2 key
			// 	// launchSource("TV");
			// break;
			// case 51: // 3 key
				
			// 	launchSource("Screen Mirroring");
			// break;
	    	// case 37: //LEFT arrow
			
	    	// 	break;
	    	// case 38: //UP arrow
			
	    	// 	break;
	    	// case 39: //RIGHT arrow
	    	// 	break;
	    	// case 40: //DOWN arrow
	    	// 	break;
	    	// case 13: //OK button
	    	// 	break;
	    /* 	case 10009: //RETURN button
	    		handleBack();
	    		break;
			case 10071: //Home button
				handleBack();
				break; */
	    	default:
	    		console.log('Key code : ' + e.keyCode);
	    		break;
    	}
    });
    getSourceInfo();
    getPropValueArray();
};

var getPropValueArray = function() {
 var sourceArray = ["BATTERY" , "CPU", "STORAGE", "DISPLAY", "DEVICE_ORIENTATION", "BUILD", "LOCALE", "NETWORK", "WIFI_NETWORK", "CELLULAR_NETWORK", "SIM", "PERIPHERAL", "MEMORY", "VIDEOSOURCE"];
 var connectedSources;
 function success1CB(videoSource) {
	 console.log("videoSource " + videoSource);
	 connectedSources = videoSource.connected;
     for (var i = 0; i < connectedSources.length; i++) {
    	 console.log("--------------- Source " + i + " ---------------");
         console.log("type = " + connectedSources[i].type);
         console.log("number = " + connectedSources[i].number);
     }
 }

 function error1CB(error) {
     console.log("getPropertyValue() is failed. Error name = "+ error.name + ", Error message = " + error.message);
 }
 
 for(var a = 0; a < sourceArray.length; a++) {
	 console.log("sources " + sourceArray[a]);
	 tizen.systeminfo.getPropertyValue(sourceArray[a], success1CB, error1CB);
 }
 
 
};


var launchSource = function(sourceName) {
	
	var connectedVideoSources;
	 function successCB(source, type) {
		flag_source_chnge_scess=1;
		console.log("setSource() is successfully done. source name = " + source.name + ", source port number = " + source.number);
	//  $("#set_source_info").html($("#set_source_info").html() + "<br>" + "setSource() is successfully done. source name = " + source.name + ", source port number = " + source.number);
		showSource();
		console.log("setSource() is successfully done. source name = " + source.name + ", source port number = " + source.number);
		resource_status=true;
	 }

	 function errorCB(error) {
		flag_source_chnge_scess=0;			
		console.log("setSource() is failed. Error name = "+ error.name + ", Error message = " + error.message);
	    //  $("#set_source_info").html($("#set_source_info").html() + "<br>" + "setSource() is failed. Error name = "+ error.name + ", Error message = " + error.message);
		resource_status=false;
	}

	 function systemInfoSuccessCB(videoSource) {
	     connectedVideoSources = videoSource.connected;
	    //  for (var i = 0; i < connectedVideoSources.length; i++) {
	    // 	 $("#set_source_info").html("");
		// 	 $("#set_source_info").html($("#set_source_info").html() + "<br>" + "--------------- Length " + connectedVideoSources.length + " ---------------");
	    // 	 $("#set_source_info").html($("#set_source_info").html() + "<br>" + "--------------- Source " + i + " ---------------");
	    // 	 $("#set_source_info").html($("#set_source_info").html() + "<br>" + "type = " + connectedVideoSources[i].type);
	    // 	 $("#set_source_info").html($("#set_source_info").html() + "<br>" + "number = " + connectedVideoSources[i].number);
	    // 	 console.log("--------------- Source " + i + " ---------------");
	    //      console.log("type = " + connectedVideoSources[i].type);
	    //      console.log("number = " + connectedVideoSources[i].number);
	    //  }
	     for (var i = 0; i < connectedVideoSources.length; i++) {
	    	 console.log("--------------- Source " + i + " ---------------");
	         console.log("type = " + connectedVideoSources[i].type);
	         console.log("number = " + connectedVideoSources[i].number);
	    	 if (connectedVideoSources[i].type === sourceName && connectedVideoSources[i].number==1) {
	             // set HDMI as input source of TV hole window				
	             tizen.tvwindow.setSource(connectedVideoSources[i], successCB, errorCB);
	             getSourceInfo();
	             break;
	         }
	     }
		 setTimeout(chksrchdmin1, 1000);
	 }
	 function chksrchdmin1(){		
		if (resource_status===false){			
			show_msg_guest('Unable to cast right now. Kindly contact hotel support for further assistance. Press the Home or Exit button to go back.');
            fnch_logwriter('DTH off', guestroomno, 0);
		}
	}
	 function systemInfoErrorCB(error) {
	     console.log("getPropertyValue(VIDEOSOURCE) is failed. Error name = "+ error.name + ", Error message = " + error.message);
	 }

	 try {
	     tizen.systeminfo.getPropertyValue("VIDEOSOURCE", systemInfoSuccessCB, systemInfoErrorCB);
	 } catch (error) {
	     console.log("Error name = "+ error.name + ", Error message = " + error.message);
	 }
};

var showSource = function() {
	function successCB(windowRect, type) {
	      // You will get exactly what you put as rectangle argument of show() through windowRect.
	      // expected result : ["0", "0px", "50%", "540px"]
		//   $("#set_source_info").html($("#set_source_info").html() + "<br>" + "Rectangle : [" + windowRect[0] + ", " + windowRect[1] + ", " + windowRect[2] + ", " + windowRect[3] + "]");
	    //   console.log("Rectangle : [" + windowRect[0] + ", " + windowRect[1] + ", " + windowRect[2] + ", " + windowRect[3] + "]");
	  }

	  try {
	     tizen.tvwindow.show(successCB, null, ["0", "0px", "100%", "1080px"], "MAIN");
	  } catch(error) {
	      console.log("error: " + error.name);
	  } 
};

var hideSource = function() {
	function successCallBack() {
		// handleBack();
	};
	function errorCallBack() {
		handleBack();
	};
	tizen.tvwindow.hide(successCallBack, errorCallBack, "MAIN");
};

var getSourceInfo = function() {
	try {
	     var source = tizen.tvwindow.getSource();
	     console.log("type = " + source.type);
	     console.log("number = " + source.number);
	    //  $("#get_source_info").html("Current source type is " + source.type + " source number is " + source.number);
	 } catch (error) {
		//  $("#get_source_info").html("error occured while getting source info " + "Error name = "+ error.name + ", Error message = " + error.message);
	     console.log("Error name = "+ error.name + ", Error message = " + error.message);
	 }
};

function handleBack() {
	hideSource();
	// window.location = "home.html?fromurl=scrn_cast";
	// window.location.href = 'web_apis_list.html?index=' + getUrlParameter("index");
}

window.onload = init;