var init = function () {
    console.log('web api tv window init() called');
    
    document.addEventListener('visibilitychange', function() {
        if(document.hidden){
            // Something you want to do when hide or exit.
            console.log("Something you want to do when hide");
			tizen.tvwindow.hide(function() {
				console.log("hidden");
				window.location = "loader.html?fromurl=loader";
			});   	
        } else {
            // Something you want to do when resume.
        }
    });
};
window.onload = init;