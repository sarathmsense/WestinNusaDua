
document.onreadystatechange = function () {
    var state = document.readyState

    if (state == 'interactive') {        
        $('.wrapper').css('visibility', 'hidden')        
   } else if (state == 'complete') {
       setTimeout(function(){         
          $('.wrapper').css('visibility', 'visible')
          $('#loadingDiv').css('visibility', 'hidden')         
       },3000);
   }
    console.log(state);

}
$('body').append('<div id="loadingDiv"><div class="spinner-border text-warning loader" role="status"><span class="sr-only">Loading...</span></div></div>');

