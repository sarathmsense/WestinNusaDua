// window.onload can work without <body onload="">
window.onload = init;

var init = function () {
    console.log('init() called');
    console.log('ruchi');
    // registKeys();
    getSourceInfo();
	// launchSource("TV");
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
	function signalStateChangeCB(state) {
		console.log("Signal state changed to: " + state);
		// document.getElementById('spkmsg').innerHTML +="Signal state changed to: " + state+"<br/>"; 
		if(state === 'SIGNAL_STATE_OK'){
			function change(res, type) {
				// document.getElementById('spkmsg').innerHTML += ("Switched to new resolution: " + res.width + "x" + res.height);
				
				var res = tizen.tvwindow.getVideoResolution();
				console.log("Video resolution: " + res.width + "x" + res.height + " pixels"+res.aspectRatio);
				// document.getElementById('spkmsg').innerHTML +="Video resolution: " + res.width + "x" + res.height + " pixels"+res.aspectRatio+"<br/>"; 
				console.log("Frequency: " + res.frequency +"Hz");
				if (res.aspectRatio === "ASPECT_RATIO_16x9") {
					console.log("Widescreen is now turned on");
				}
				}
				tizen.tvwindow.addVideoResolutionChangeListener(change);
			
		}
	}
	tizen.tvchannel.addSignalStateChangeListener(signalStateChangeCB);		
	console.log("after addSignalStateChangeListener");
    // add eventListener for keydown
    // document.addEventListener('keydown', onKeyDown, false);
	
};


/* var onKeyDown = function(event) {
	var keyCode = event.keyCode;
	document.getElementById('spkmsg').innerHTML +='key code='+keyCode+"<br/>";
	
	switch(keyCode){
		case 49: //1 arrow	
			
			 function successCB(windowRect, type) {
			        // You will get exactly what you put as rectangle argument of show() through windowRect.
			        // expected result : ["0", "0px", "50%", "540px"]
				 
				 var tuneOptionDVBAnalog = {};
					tuneOptionDVBAnalog.broadcastStandard = "DVB";
					tuneOptionDVBAnalog.channelType = "ATV";
					tuneOptionDVBAnalog.frequency = 63752;
					tuneOptionDVBAnalog.modulationType = "PAL";
					tuneOptionDVBAnalog.soundSystem = "AUTO";
					tuneOptionDVBAnalog.colorsSystem = "AUTO";
					window.b2bapis.b2bbroadcast.tuneDirect(tuneOptionDVBAnalog, function() {console.log("success");}, function() {console.log("error");});
									 
			        console.log("Rectangle : [" + windowRect[0] + ", " + windowRect[1] + ", " + windowRect[2] + ", " + windowRect[3] + "]");
			    }
			tizen.tvwindow.show(successCB, null, ["0px", "0px", "1920px", "1080px"], "MAIN", "BEHIND");
			break;
		case 50: //2 arrow
			
			console.log("hi");
			if (webapis.avplay.getState() === 'PLAYING') 
			{
			webapis.avplay.stop();
			webapis.avplay.close();
			}
			
			//launchSource("TV");
			 function successCB1(windowRect, type) {
			        // You will get exactly what you put as rectangle argument of show() through windowRect.
			        // expected result : ["0", "0px", "50%", "540px"]
				 console.log("Rectangle : [" + windowRect[0] + ", " + windowRect[1] + ", " + windowRect[2] + ", " + windowRect[3] + "]");
				 var tuneOptionDVBDigitalAir = {};
				 tuneOptionDVBDigitalAir.broadcastStandard = "DVB"; 
				 tuneOptionDVBDigitalAir.channelType = "DTV";
				 tuneOptionDVBDigitalAir.frequency =306000;//482000;//546000
				 tuneOptionDVBDigitalAir.modulationType = "QAM64";
				 tuneOptionDVBDigitalAir.bandwidth = "8Mhz";
				 tuneOptionDVBDigitalAir.programNumber=104;//2;//300//200 //service ID
				 tuneOptionDVBDigitalAir.major = 24;//22; //channel no for DVB
				 b2bapis.b2bbroadcast.tuneDirect(tuneOptionDVBDigitalAir, function() {console.log("success");}, function() {console.log("error");});
			    }
			tizen.tvwindow.show(successCB1, null, ["0px", "0px", "1920px", "1080px"], "MAIN", "BEHIND");
			
			 
			
			break;
		case 51: //3 arrow
			console.log("hi1");
			if (webapis.avplay.getState() === 'PLAYING') 
			{
				console.log("player state");
			webapis.avplay.stop();
			webapis.avplay.close();
			}
			//launchSource("TV");
			 function successCB2(windowRect, type) {
			        // You will get exactly what you put as rectangle argument of show() through windowRect.
			        // expected result : ["0", "0px", "50%", "540px"]
				 console.log("Rectangle : [" + windowRect[0] + ", " + windowRect[1] + ", " + windowRect[2] + ", " + windowRect[3] + "]");
				 
				 var tuneOptionDVBDigitalAirDigital = {};
				 tuneOptionDVBDigitalAirDigital.broadcastStandard = "DVB";
				 tuneOptionDVBDigitalAirDigital.channelType = "DTV";
				 tuneOptionDVBDigitalAirDigital.frequency =306000//482000;//546000
				 tuneOptionDVBDigitalAirDigital.modulationType = "QAM64";
				 tuneOptionDVBDigitalAirDigital.bandwidth = "8Mhz";
				 tuneOptionDVBDigitalAirDigital.programNumber=106//2001//2;//960; //service ID//614
				 tuneOptionDVBDigitalAirDigital.major =16;//10 //2; //channel no for DVB
				 b2bapis.b2bbroadcast.tuneDirect(tuneOptionDVBDigitalAirDigital, function(e) {console.log("success"+e);}, function() {console.log("error");});
								 
			     
			    }
			tizen.tvwindow.show(successCB2, null, ["0px", "0px", "1920px", "1080px"], "MAIN", "BEHIND");
			
			
			break;
		case 52: //4 arrow
			 function successCB8(windowRect, type) {
			        // You will get exactly what you put as rectangle argument of show() through windowRect.
			        // expected result : ["0", "0px", "50%", "540px"]
				 
				 var tuneOptionDVBDigitalCable = {};
				 tuneOptionDVBDigitalCable.broadcastStandard = "DVB";
				 tuneOptionDVBDigitalCable.channelType = "CDTV";
				 tuneOptionDVBDigitalCable.frequency =306000;
				 tuneOptionDVBDigitalCable.modulationType = "QAM64";
				 tuneOptionDVBDigitalCable.bandwidth = "8Mhz";
				 tuneOptionDVBDigitalCable.symbolRate = 6875;//6900;
				 tuneOptionDVBDigitalCable.programNumber=105;//2;//1027;//2;//200; //service ID
				 tuneOptionDVBDigitalCable.major = 23; //channel no for DVB
				 b2bapis.b2bbroadcast.tuneDirect(tuneOptionDVBDigitalCable, function() {console.log("success");}, function() {console.log("error");});
								 
			     console.log("Rectangle : [" + windowRect[0] + ", " + windowRect[1] + ", " + windowRect[2] + ", " + windowRect[3] + "]");
			    }
			tizen.tvwindow.show(successCB8, null, ["0px", "0px", "1920px", "1080px"], "MAIN", "BEHIND");
			break;
		case 415: //Play arrow
			
			 function successCB3(windowRect, type) {
			        // You will get exactly what you put as rectangle argument of show() through windowRect.
			        // expected result : ["0", "0px", "50%", "540px"]
				 
				 var tuneOptionDVBDigitalCable1 = {};
				 tuneOptionDVBDigitalCable1.broadcastStandard = "DVB";
				 tuneOptionDVBDigitalCable1.channelType = "CDTV";
				 tuneOptionDVBDigitalCable1.frequency = 306000//200000;
				 tuneOptionDVBDigitalCable1.modulationType = "QAM64";
				 tuneOptionDVBDigitalCable1.bandwidth = "8Mhz";
				 tuneOptionDVBDigitalCable1.symbolRate = 6875//6900;
				 tuneOptionDVBDigitalCable1.programNumber=106//960; //service ID
				 tuneOptionDVBDigitalCable1.major = 16; //channel no for DVB
				 b2bapis.b2bbroadcast.tuneDirect(tuneOptionDVBDigitalCable1, function() {document.getElementById('spkmsg').innerHTML +="success";}, function() {document.getElementById('spkmsg').innerHTML +="error";});
								 
			     console.log("Rectangle : [" + windowRect[0] + ", " + windowRect[1] + ", " + windowRect[2] + ", " + windowRect[3] + "]");
			    }
			tizen.tvwindow.show(successCB3, null, ["0px", "0px", "1920px", "1080px"], "MAIN", "BEHIND");
			break;
		case 53: //5 arrow
			 function successCB4(windowRect, type) {
			        // You will get exactly what you put as rectangle argument of show() through windowRect.
			        // expected result : ["0", "0px", "50%", "540px"]
				 
				 var tuneOptionDVBSatellite = {};
				 tuneOptionDVBSatellite.broadcastStandard = "DVB";
				 tuneOptionDVBSatellite.channelType = "SDTV";
				 tuneOptionDVBSatellite.frequency = 12596000;
				 tuneOptionDVBSatellite.modulationType = "QPSK";
				 tuneOptionDVBSatellite.bandwidth = "8Mhz";
				 tuneOptionDVBSatellite.satelliteId = "HOTBIRD_13E";//"ASTRA_19_2E";
				 tuneOptionDVBSatellite.programNumber = 8208//service id
				 tuneOptionDVBSatellite.polarization = "POL_HL";
				 
				 b2bapis.b2bbroadcast.tuneDirect(tuneOptionDVBSatellite, function() {document.getElementById('spkmsg').innerHTML +="success";}, function() {document.getElementById('spkmsg').innerHTML +="error";});
								 
			     console.log("Rectangle : [" + windowRect[0] + ", " + windowRect[1] + ", " + windowRect[2] + ", " + windowRect[3] + "]");
			    }
			tizen.tvwindow.show(successCB4, null, ["0px", "0px", "1920px", "1080px"], "MAIN", "BEHIND");
			
			break;
		case 55: //7 key
			if (webapis.avplay.getState() === 'PLAYING') 
			{
				console.log("player state");
			webapis.avplay.stop();
			webapis.avplay.close();
			}
			b2bapis.b2bbroadcast.setHotelDrmForensicData("0345678bcfghijklmnopqrstuvw", function() {console.log("[tuneDirect] success : ");}, function() {console.log("error");});
			function successCBATSC1(){
			console.log("[tuneDirect] example 2");
			 var tuneOptionATSC = {};
			 tuneOptionATSC.broadcastStandard = "ATSC";
			 tuneOptionATSC.channelType = "CDTV";
			 tuneOptionATSC.ptc = 51;
			 tuneOptionATSC.minor = 1;	
			 tuneOptionATSC.major = 51;
			 tuneOptionATSC.modulationType = "QAM";
			b2bapis.b2bbroadcast.tuneDirect(tuneOptionATSC,function() {console.log("[tuneDirect] success : ");}, function() {console.log("error");});	
			}
			tizen.tvwindow.show(successCBATSC1, null, ["0px", "0px", "1920px", "1080px"], "MAIN", "BEHIND");
			break;
		case 56: //8 key
			if (webapis.avplay.getState() === 'PLAYING') 
			{
				console.log("player state");
				webapis.avplay.stop();
				webapis.avplay.close();
			}
			function successCBATSC(){
			
			console.log("[tuneDirect] example 1");
			 var tuneOptionATSC_dtv = {};
			 tuneOptionATSC_dtv.broadcastStandard = "ATSC";
			 tuneOptionATSC_dtv.channelType = "CDTV";
			 tuneOptionATSC_dtv.ptc = 83;
			 tuneOptionATSC_dtv.minor = 2;	
			 tuneOptionATSC_dtv.major = 83;
			 tuneOptionATSC_dtv.modulationType = "QAM";
			b2bapis.b2bbroadcast.tuneDirect(tuneOptionATSC_dtv,function() {console.log("[tuneDirect] success : ");}, function(e) {console.log("error"+e.message);});	
			}
			tizen.tvwindow.show(successCBATSC, null, ["0px", "0px", "1920px", "1080px"], "MAIN", "BEHIND");
			break;
		case 57: //9 key
			if (webapis.avplay.getState() === 'PLAYING') 
			{
				console.log("player state");
				webapis.avplay.stop();
				webapis.avplay.close();
			}
			function successCBATSC2(){
			console.log("[tuneDirect] example 3");
			 var tuneOptionATSC_cable = {};
			 tuneOptionATSC_cable.broadcastStandard = "ATSC";
			 tuneOptionATSC_cable.channelType = "CDTV";
			 tuneOptionATSC_cable.ptc = 7;
			 tuneOptionATSC_cable.minor = 1;	
			 tuneOptionATSC_cable.major = 10;
			 tuneOptionATSC_cable.modulationType = "VSB8";
			b2bapis.b2bbroadcast.tuneDirect(tuneOptionATSC_cable,function() {console.log("[tuneDirect] success : ");}, function() {console.log("error");});	
			}
			tizen.tvwindow.show(successCBATSC2, null, ["0px", "0px", "1920px", "1080px"], "MAIN", "BEHIND");
			break;
		case 48: //0 key
			if (webapis.avplay.getState() === 'PLAYING') 
			{
				console.log("player state");
				webapis.avplay.stop();
				webapis.avplay.close();
			}
			function successCBATSC3(){
			console.log("[tuneDirect] example 4");
			 var tuneOptionATSC_dtv1 = {};
			 tuneOptionATSC_dtv1.broadcastStandard = "ATSC";
			 tuneOptionATSC_dtv1.channelType = "DTV";
			 tuneOptionATSC_dtv1.ptc = 34;
			 tuneOptionATSC_dtv1.modulationType = "QAM64";
			 tuneOptionATSC_dtv1.programNumber= 3,
			b2bapis.b2bbroadcast.tuneDirect(tuneOptionATSC_dtv1,function() {console.log("[tuneDirect] success : ");}, function() {console.log("error");});	
			}
			tizen.tvwindow.show(successCBATSC3, null, ["0px", "0px", "1920px", "1080px"], "MAIN", "BEHIND");
			break;
		case 10009: //RETURN button
			tizen.application.getCurrentApplication().exit();
			break;
		case 10182: //Exit button
			tizen.application.getCurrentApplication().exit();
			break;
	}
};
 */


//To set TV source
var launchSource = function(sourceName) {
	// document.getElementById('spkmsg').innerHTML +='launchSource<br/>';
    var connectedVideoSources;

    function successCB(source, type) {
        console.log("setSource() is successfully done. source name = " + source.type + ", source port number = " + source.number);
    }

    function errorCB(error) {
        console.log("setSource() is failed. Error name = " + error.type + ", Error message = " + error.message);
    }

    function systemInfoSuccessCB(videoSource) {
        connectedVideoSources = videoSource.connected;
        for (var i = 0; i < connectedVideoSources.length; i++) {
            console.log("--------------- Source " + i + " ---------------");
            console.log("type = " + connectedVideoSources[i].type);
            console.log("number = " + connectedVideoSources[i].number);
            if (connectedVideoSources[i].type === sourceName) {
                tizen.tvwindow.setSource(connectedVideoSources[i], successCB, errorCB);
                getSourceInfo();
                break;
            }
        }
    }
  
    function systemInfoErrorCB(error) {
        console.log("getPropertyValue(VIDEOSOURCE) is failed. Error name = " + error.name + ", Error message = " + error.message);
    }

    try {
        tizen.systeminfo.getPropertyValue("VIDEOSOURCE", systemInfoSuccessCB, systemInfoErrorCB);
    } catch (error) {
        console.log("Error name = " + error.name + ", Error message = " + error.message);
    }
};
//To get TV source
var getSourceInfo = function() {
    try {
        var source = tizen.tvwindow.getSource();
        // document.getElementById("spkmsg").innerHTML += "<br>type = " + source.type;
        // document.getElementById("spkmsg").innerHTML += "<br>number = " + source.number;
    } catch (error) {
        console.log("Error name = " + error.name + ", Error message = " + error.message);
    }
};
function RFPlay(freq,major,pgno){

	function successCB3(windowRect, type) {
		console.log("Rectangle : [" + windowRect[0] + ", " + windowRect[1] + ", " + windowRect[2] + ", " + windowRect[3] + "]");
				 
		var tuneOptionDVBDigitalAirDigital={};
		tuneOptionDVBDigitalAirDigital.broadcastStandard="DVB";
		tuneOptionDVBDigitalAirDigital.channelType="DTV";
		tuneOptionDVBDigitalAirDigital.frequency=freq;
		tuneOptionDVBDigitalAirDigital.modulationType="OFDM";
		tuneOptionDVBDigitalAirDigital.bandwidth="8Mhz";
		tuneOptionDVBDigitalAirDigital.programNumber=pgno;
		tuneOptionDVBDigitalAirDigital.major=major;
		b2bapis.b2bbroadcast.tuneDirect(tuneOptionDVBDigitalAirDigital, function(e) {console.log("success"+e);},function() {console.log("error");});
	}
	if (freq==500 && major==500 && pgno==500)
		tizen.tvwindow.hide(successCB3, hideonerror, null);	
	else
		tizen.tvwindow.show(successCB3, null, ["0px", "0px", "1920px", "1080px"], "MAIN", "BEHIND");
	
	function hideonerror(error) {
		console.log("tizen.tvwindow.hide Error : " + JSON.stringify(error));
	}
}
