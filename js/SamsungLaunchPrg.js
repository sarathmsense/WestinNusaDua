////// Samsung Program to Call build in applications
var  launchApplication = function(appName,control_name,control_data) {
        try {
        if(appName ==="org.tizen.ep-hotel-btplayer") {
        var appControl = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/view");
        }
        else {
        var appControl = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/view ",
        null,
        null,
        null,
        [
        new tizen.ApplicationControlData(control_name,[control_data])]);
        // ApplicationControlDataArrayReplyCallback instance
        }
        var appControlReplyCallback = {
        // callee sent a reply
            onsuccess: function() {
            console.log("inside success");
        },

        // callee returned failure
        onfailure: function() {
            console.log('The launch application control failed');
        }
        };

        tizen.application.launchAppControl(appControl, appName
        , function(){console.log("launchAppControl API execute success !!");
        }
        , function(e){console.log(" launchAppControl API triggered error !!" + e.message);
        }
        , appControlReplyCallback
        );
        } 
        catch(error) {
            console.log("Error occured :: " + error.message);
        }
};
function prodctinfo(){

    try {
        var userAgent = navigator.userAgent
        document.getElementById("logtext").innerHTML += "<br> userAgent "+ userAgent;

        var strversion = webapis.productinfo.getVersion();
        // console.log(" version value = " + strversion);
        document.getElementById("logtext").innerHTML += "<br> version version = " + strversion;
        var strfirm = webapis.productinfo.getFirmware();
        document.getElementById("logtext").innerHTML += "<br> version firmware = " + strfirm;
        var strduid = webapis.productinfo.getDuid();
        document.getElementById("logtext").innerHTML += "<br> version DUID = " + strduid;
        var strmdle = webapis.productinfo.getModelCode();
        document.getElementById("logtext").innerHTML += "<br> version model = " + strmdle;
        var strgetSmartTVServerType = webapis.productinfo.getSmartTVServerType();
        document.getElementById("logtext").innerHTML += "<br> version strgetSmartTVServerType = " + strgetSmartTVServerType;
        var strSmartTVServerVersion = webapis.productinfo.getSmartTVServerVersion();
        document.getElementById("logtext").innerHTML += "<br> version strSmartTVServerVersion = " + strSmartTVServerVersion;
      } catch (error) {
        console.log(" error code = " + error.code);
      }
      
}

function getVersion() {
    var version;
    try {
        version = webapis.productinfo.getVersion();
    } catch (e) {
        logger.error(e.message);
    }
    return version;
}
function getFirmware() {
    var strFimware;
    try {
        strFimware = webapis.productinfo.getFirmware();
    } catch (e) {
        logger.error(e.message);
    }
    return strFimware;
}
function getDuid() {
    var strDuid;
    try {
        strDuid = webapis.productinfo.getDuid();
    } catch (e) {
        logger.error(e.message);
    }
    return strDuid;
}
function getModelCode() {
    var strModelCode;
    try {
        strModelCode = webapis.productinfo.getModelCode();
    } catch (e) {
        logger.error(e.message);
    }
    return strModelCode;
}
function getSmartTVServerType() {
    var strTVServerType;
    try {
        strTVServerType = webapis.productinfo.getSmartTVServerType();
    } catch (e) {
        logger.error(e.message);
    }
    return strTVServerType;
}
function getSmartTVServerVersion() {
    var strTVServerVersion;
    try {
        strTVServerVersion = webapis.productinfo.getSmartTVServerVersion();
    } catch (e) {
        logger.error(e.message);
    }
    return strTVServerVersion;
}
function getRealModel() {
    var strRealModel;
    try {
        strRealModel = webapis.productinfo.getRealModel();
    } catch (e) {
        logger.error(e.message);
    }
    return strRealModel;
}
function getUserAgent() {    
    var userAgent;
    try {
        userAgent = navigator.userAgent;
    } catch (e) {
        logger.error(e.message);
    }
    return userAgent;
}
function showProductInfo() {
    jsonObj = [];
    item = {};       
    var productInfo = getProductInfo();
    Object.getOwnPropertyNames(productInfo).map(function (propName) {      
        item [propName] = productInfo[propName];       
    });
    jsonObj.push(item);       
    // console.log(jsonObj);
    // return jsonObj;
    return JSON.stringify(jsonObj);
    // document.getElementById("logtext").innerHTML += "<br> jsonObj "+ JSON.stringify(jsonObj);
}

function getProductInfo(guestroomno) {
   
    var productInfo = {
        Version: getVersion(),      
        tvFirmware: getFirmware(),
        tvDuid: getDuid(),
        tvModelCode: getModelCode(),
        tvSmartTVServerType: getSmartTVServerType(),      
        tvSmartTVServerVersion: getSmartTVServerVersion(),
        tvRealModel: getRealModel(),
        tvUserAgent: getUserAgent()     
    };  
    // productInfo.Room = guestroomno;
    // productInfo['Room']=guestroomno;
    return productInfo;
}

function sendProductinfo(guestroomno){
    $.ajax({
        type: 'POST',
        url: "http://" + middleware_ip + "/"+Projctfldr+"/api_productinfo.php?room="+guestroomno,
        data: showProductInfo(),
        success: function(data) { alert('data: ' + data); },
        contentType: "application/json",
        dataType: 'json'
    });
}