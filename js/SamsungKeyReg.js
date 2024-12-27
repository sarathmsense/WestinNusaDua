//Samusung remote key registration
var registerKey = function () {
    // var usedspecialKeys = ['Content', 'SmartHub', 'Power'];
    var usedspecialKeys = ['Content', 'SmartHub'];
    var usedKeys=['1','2', '3', '4', '5', '6', '7', '8', '9','0'];
    usedKeys.forEach (
            function (keyName){
                tizen.tvinputdevice.registerKey(keyName);
            }
    );
    tizen.tvinputdevice.registerKey("Source");
    tizen.tvinputdevice.registerKey("Guide");
    tizen.tvinputdevice.registerKey("MediaPlay");
    tizen.tvinputdevice.registerKey("MediaStop");
    tizen.tvinputdevice.registerKey("MediaRewind");
    tizen.tvinputdevice.registerKey("MediaFastForward");
    tizen.tvinputdevice.registerKey("ChannelList");
    tizen.tvinputdevice.registerKey("ChannelUp");
    tizen.tvinputdevice.registerKey("ChannelDown");
    tizen.tvinputdevice.registerKey("Exit");
    tizen.tvinputdevice.registerKey("Teletext");
    tizen.tvinputdevice.registerKey("MediaTrackNext");
    tizen.tvinputdevice.registerKey("MTS");
    tizen.tvinputdevice.registerKey("Search");
    tizen.tvinputdevice.registerKey("Menu");
    webapis.appcommon.registerKey(usedspecialKeys);
};