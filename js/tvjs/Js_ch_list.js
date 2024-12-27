// JavaScript Document

//https://suite.io/mark-alexander-bain/19by2aa    *************************** Site reference

var arr_listofchannels= [];
var arr_listofchannels_cp= [];
  /*var arr_listofchannels= [
    ["1", "HOTEL INFO", "TAJ TV"],["2", "DW TV", "INTERNATIONAL"],["3", "NHK WORLD", "INTERNATIONAL"],
	["4", "RUSSIA TODAY", "INTERNATIONAL"],["5", "INDIA NEWS", "NEWS"],["6", "RISHTEY", "REGIONAL"] ];   */
  
  arr_listofchannels_cp = arr_listofchannels;

function fn_rearrange_array () {
	
	arr_listofchannels= arr_listofchannels_cp;
 /*	arr_listofchannels= [
    					 ["1", "HOTEL INFO", "TAJ TV"],["2", "DW TV", "INTERNATIONAL"],["3", "NHK WORLD", "INTERNATIONAL"],
	["4", "RUSSIA TODAY", "INTERNATIONAL"],["5", "INDIA NEWS", "NEWS"],["6", "RISHTEY", "REGIONAL"] ];  */
}


var arr_sport1;

//document.getElementById('sel_planet').onchange = sel_category_onchange;

function fn_addlist_onview (options) {
			
			clear_list("id_chnl_list");
			var ul="";

			for(var i = 0; i < arr_listofchannels.length; i++) {
    		var cube = arr_listofchannels[i];
			var columns="";
			var str="";
			sArr = [];
    		for(var j = 0; j < cube.length; j++) {
      
				sArr[j] =cube[j];
		
    		}
			str = sArr.join(",");
			var partsOfStr = str.split(',');
	
	 				ul +=	'<li ><a href="#" id="chnl_tv1"><img src="images/spacer.png"  alt="" /></a><div class="serail_no">' + partsOfStr[0] + '</div> \
	        				<div class="chnl_name">' + partsOfStr[1] + '</div><div class="cls_cate_name">' + partsOfStr[2] + '</div> \
							<div class="cls_ip_address">' + partsOfStr[3] + '</div><div class="cls_ip_port">' + partsOfStr[4] + '</div> \
							<div class="cls_major">' + partsOfStr[5] + '</div><br /></li>';
	
			}


			$('.class_chnl_list').append(ul);
			elementLevel=0;
			levelIndices[elementLevel]=0;
			$( ".cls_cate_name" ).hide();
			$( ".cls_ip_address" ).hide();
			$( ".cls_ip_port" ).hide();
			$( ".cls_major" ).hide();
			$(".content_right ul li").removeClass("highlight2");
			$(".content_right ul li").eq(levelIndices[elementLevel]).addClass("highlight2");


			$(".content_right ul").each(function(){
  			var max = 14
  			if ($(this).find("li").length > max) {
    		$(this)
      			.find('li:gt('+max+')')
      			.hide() 
			} 
			});  

				if(typeof options === "undefined") {
				$(".content_right").animate({ opacity: 0.9 }, 500, "swing");
				$(".content_right").animate({ right: "0.6%" }, 300);
				flipboxContent_hide_flag=1;
				}
}

function clear_list (list) {

			var list = document.getElementById(list);
			while( list.hasChildNodes() ) {
					list.removeChild( list.lastChild );
			}

}


function sel_category_onchange (myselect) {

		clear_list("class_chnl_list");

		switch (myselect) {
			case 0:  //English News
				arr_sport1 = new Array ("NDTV", "CNN","IBN");
				fn_addlist_onview();
				break;
			case 1: //Hindi News
				arr_sport1 = new Array ("Hindi NDTV", "hindi news","hindi news1");
				fn_addlist_onview();
				break;
			case 2: //Sports
				arr_sport1 = new Array ("Star Sports", "Sony 6","Star Sports HD","Star Sports1","Sony Max");
				fn_addlist_onview();
				break;
			case 3: //Movies
				arr_sport1 = new Array ("star Movie", "Sony Fix","Sun Movies");
				fn_addlist_onview();
				break;
			case 10: //All channels
				fn_addlist_onview();
				break;
			case 22: //Sorting list view
				arr_sport1 = new Array ("Number", "Name");
				fn_add_sorting_list_onview();
				break;
		}

}

/* Dynamic Category page */
var arr_category;

function fn_addcategorylist_onview () {
			clear_list("id_category_ul");
			//arr_category = new Array ("All CHANNELS", "TAJ TV","INTERNATIONAL","ENGLISH NEWS", "REGIONAL");
			//arr_category = new Array ("ALL CHANNELS","ENTERTAINMENT", "MOVIES","SPORTS","NEWS", "MUSIC","KIDS","INFOTAINMENT","REGIONAL","LIFESTYLE / LEISURE","RELIGIOUS","INTERNATIONAL");
			arr_category = new Array ("ALL CHANNELS", "HOTEL CHANNEL", "NEWS","INFOTAINMENT","GEC ENGLISH","GEC HINDI","ENGLISH MOVIES","HINDI MOVIES","SPORTS","MUSIC","KIDS","REGIONAL","INTERNATIONAL");
			var li_category="";
			for(var i=0; i < arr_category.length; i++) {
					li_category += '<li class="sub_highlight"> \
                                <div class="sub_serial"> \
                                    <img src="images/img_list_check.png" alt="" /></div> \
                                <div class="sub_chnl">' + arr_category[i] + '</div> \
                                <br /> \
                            </li>' ;
			}
			$('.class_category_ul').append(li_category);
			$( ".sub_serial" ).hide();
			
			$(".class_category_ul").each(function(){
  			var max = 14
  			if ($(this).find("li").length > max) {
    		$(this)
      			.find('li:gt('+max+')')
      			.hide() 
			} 
			});  
}

/* Function to Display Sorting list Item */

function fn_add_sorting_list_onview () {
			clear_list("id_sorting_ul");
			arr_sport1 = new Array ("Number", "Name");
			var ul_sorting="";
			for(var i=0; i < arr_sport1.length; i++) {
	       				ul_sorting += '<li class="sub_highlight"> \
                                		<div class="sub_serial"> \
                                    	+</div> \
                                		<div class="sub_chnl">' + arr_sport1[i] + '</div> \
                                		<br /> \
                            			</li>' ;
			}
			$('.class_sorting_ul').append(ul_sorting);
}
/* Search Category from list */
function searchCPL(what, find){
			clear_list("id_chnl_list");
			var ul_of_search_category="";
    		for(var i= 0, L= what.length; i<L; i++){
        		if(what[i][2]=== find) 
				{
		  			var cube = what[i];
					var columns="";
					var str="";
					sArr = [];
    				for(var j = 0; j < cube.length; j++) {
						sArr[j] =cube[j];
    				}
					str = sArr.join(",");
					var partsOfStr = str.split(',');
					arr_category_ch.push(partsOfStr[0]);
	 					ul_of_search_category +=	'<li ><a href="#" id="chnl_tv1"><img src="images/spacer.png"  alt="" /></a><div class="serail_no">' + partsOfStr[0] + '</div> \
	        										<div class="chnl_name">' + partsOfStr[1] + '</div><div class="cls_cate_name">' + partsOfStr[2] + '</div> \
													<div class="cls_ip_address">' + partsOfStr[3] + '</div><div class="cls_ip_port">' + partsOfStr[4] + '</div><br /></li>';
				}		
    }
   
				$('.class_chnl_list').append(ul_of_search_category);
			elementLevel=0;
			levelIndices[elementLevel]=0;
			$( ".cls_cate_name" ).hide();
			$( ".cls_ip_address" ).hide();
			$( ".cls_ip_port" ).hide();
			$(".content_right ul li").removeClass("highlight2");
			$(".content_right ul li").eq(levelIndices[elementLevel]).addClass("highlight2");
			$(".content_right").animate({ opacity: 0.9 }, 500, "swing");
			$(".content_right").animate({ right: "0.6%" }, 300);
			flipboxContent_hide_flag=1;
			$(".class_chnl_list").each(function(){
  			var max = 14
  			if ($(this).find("li").length > max) {
    			$(this)
      			.find('li:gt('+max+')')
      			.hide() 
			} 
			});  
}

/* Sorting Array */

function fn_sorting_array (num1) {
	//WITH FIRST COLUMN (Number wise)
	  if(num1=== 1) 
		{
			//fn_rearrange_array();			
     		arr_listofchannels = arr_listofchannels.sort(function(a,b) {
      		return a[0] - b[0];	 
				
    		});
			//sel_category_onchange(10);
			fn_addlist_onview();
		}
		//WITH SECOND COLUMN (name wise)
	  if(num1=== 2) 
		{
			arr_listofchannels = arr_listofchannels.sort(function(a,b) {
 			//return a[1] > b[1];	
			return a[1] > b[1] ? 1 : -1;
 			});
			fn_addlist_onview();
			//sel_category_onchange(10);		
		}
	}
/* End sorting */	

/* Display Right content */

function fn_display_rightcontent () {
				$(".content_right").animate({ opacity: 0.9 }, 500, "swing");
				$(".content_right").animate({ right: "0.6%" }, 300);
				
}
	
/* Display HIDE RIGHT content */

function fn_hide_rightcontent () {
					$(".content_right").animate({ right: "-55%" }, 200, function() { 
																				 
					$(".content_right ul li").removeClass("highlight2");
            		$(".content_right ul li").eq(levelIndices[elementLevel]).addClass("highlight2");
            		$('.flipbox-container').css("opacity", 0);
				    $('.flipboxContent').css("opacity", 0);
					$('.content_right').css("opacity", 0);
            		elementLevel = 0;
            		levelIndices[1] = 0;
					flipboxContent_hide_flag=0;
        			});
					
				
				
}

/* HIDE channel banner */

function fn_hide_banner () {
			
			$(".bottom_pannel").hide();
				
}

/* DISPLAY channel banner */

function fn_show_banner () {
	
			if( $('.bottom_pannel').css("display") == 'none' )
			{			
			$(".bottom_pannel").show();
			}
				
}

/* Search Category from list */
function search_ch_num_fromlist(what, find){			
			
    		for(var i= 0, L= what.length; i<L; i++){
        		if(what[i][0]=== find) 
				{
		  			var cube = what[i];
					var columns="";
					var str="";
					sArr = [];
    				for(var j = 0; j < cube.length; j++) {
						sArr[j] =cube[j];
    				}
					str = sArr.join(",");					
					return str;
				}	
				
    	}
   
   return '';
			
}
function searchCPL_channel(what, find){
	// clear_list("id_chnl_list");
   console.log("find searchCPL "+find);
	//var ul_of_search_category="";
	//debugger;
	for(var i= 0, L= what.length; i<L; i++){
		//console.log(i);
		if(what[i][1]=== find) 
		{
			
			  var cube = what[i];
			var columns="";
			var str="";
			sArr = [];
			for(var j = 0; j < cube.length; j++) {
				sArr[j] =cube[j];
			}
			str = sArr.join(",");
			var partsOfStr = str.split(',');
			if (partsOfStr.length > 1) {
				return i+","+partsOfStr[0];
			
			}
		}		
	}
}

