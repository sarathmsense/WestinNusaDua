/* TV Key down pressed */

function fn_tvkey_down_press () {
	
	 if (elementLevel === 0) {
            			var totalsubmenu = $(".content_right ul li").size();
            			$(".content_right ul li").removeClass("highlight2");
						var max = 14;
						
            			if (levelIndices[elementLevel] + 1 >= totalsubmenu) {
							
                		levelIndices[elementLevel] = 0;
           				$(".content_right ul li").siblings(0).show();
						
						$(".content_right ul").each(function(){  							
  							if ($(this).find("li").length > max) {
    							$(this)
      							.find('li:gt('+max+')')
      							.hide()
							}
						});  
			
            			} else {
                				levelIndices[elementLevel]++;

            			}
			
			 			if ( !$(".content_right ul li").eq(levelIndices[elementLevel]).is(':visible') )
						{
							$(".content_right ul li").eq(levelIndices[elementLevel]).show();
				
							if ($(".content_right ul").find("li:visible").length > max) 
								{
    								$(".content_right ul").find('li:visible:first').hide();
								}
				
						}
			

            			$(".content_right ul li").eq(levelIndices[elementLevel]).addClass("highlight2");

            			if (levelIndices[elementLevel] >= "7") {
               				 $(".nav_bottom").show();
						} else {

            				$(".nav_bottom").hide();
            			}
			} 
		else if (elementLevel == 1) {
           
		   if (activeLevel2Class != "") {
				
						var totalLevel2Menu = $("." + activeLevel2Class + " ul li").size();
            			$("." + activeLevel2Class + " ul li").removeClass("sub_highlight");
						var max = 14;
						
            			if (levelIndices[elementLevel] + 1 >= totalLevel2Menu) {
							
                		levelIndices[elementLevel] = 0;
						$("." + activeLevel2Class + " ul li").siblings(0).show();
					
						$("." + activeLevel2Class +  " ul").each(function(){
  							if ($(this).find("li").length > max) {
    							$(this)
      							.find('li:gt('+max+')')
      							.hide()
							}
						});  
			
            			} else {
                				levelIndices[elementLevel]++;

            			}
			
			 			if ( !$("." + activeLevel2Class +  " ul li").eq(levelIndices[elementLevel]).is(':visible') )
						{
							$("." + activeLevel2Class +  " ul li").eq(levelIndices[elementLevel]).show();
				
							if ($("." + activeLevel2Class +  " ul").find("li:visible").length > max) 
							{
    							$("." + activeLevel2Class +  " ul").find('li:visible:first').hide();
							}
				
						}

            			$("." + activeLevel2Class +  " ul li").eq(levelIndices[elementLevel]).addClass("sub_highlight");
			
			
			}
        }
		else if (elementLevel === 2) {
            var totalLevel2Menu = $("." + activeLevel2Class + " ul li").size();
            if (activeLevel2Class !== "") {
                $("." + activeLevel2Class + " ul li").removeClass("sub_highlight");
                if (levelIndices[elementLevel] + 1 >= totalLevel2Menu) {
                    levelIndices[elementLevel] = 0;
                } else {
                    levelIndices[elementLevel]++;
                }
                $("." + activeLevel2Class + " ul li").eq(levelIndices[elementLevel]).addClass("sub_highlight");
            }
        }
		
		
}

/*  TV key up key pressed */

function fn_tvkey_up_press () {
	
	
	  if (elementLevel == 0) {
			var totalsubmenu = $(".content_right ul li").size();
            $(".content_right ul li").removeClass("highlight2");
			
			var varhidevalue=0;
			var noofcount=1;
			var max = 14;
			
            if (levelIndices[elementLevel] - 1 < 0) {
				
				if (totalsubmenu<max)
				{
					varhidevalue=0;
				}
				else
				{
					var icount=Math.floor(totalsubmenu/max);
					
					for (j=1;j<=1000;j++)
						{
							if (icount<=j)
							{
								noofcount=j;
								break;
							}
							
						}
					
					if (noofcount>=1)
					{
					varhidevalue= ((noofcount-1)*max ) + ((totalsubmenu-1) -(noofcount*max));
					}
				}
				
                levelIndices[elementLevel] = totalsubmenu-1;
				
				if ($(".content_right ul li").length -1 > max)
				{
				$(".content_right ul").each(function(){  
  				if ($(this).find("li").length > max)
				{
    				$(".content_right ul li").siblings(0).hide();
				}					
				}); 
			
				}
				$(".content_right ul").each(function(){
  					if ($(this).find("li").length > max) {
    					$(this)
      					.find('li:gt('+varhidevalue+')')
      					.show()
					}
				});  
				
				//document.getElementById("spkmsg").innerHTML +="<br> levelIndices[elementLevel  " + levelIndices[elementLevel];
				
            } else {
                levelIndices[elementLevel]--;
             
            }
			
			if ( !$(".content_right ul li").eq(levelIndices[elementLevel]).is(':visible') )
			{
				$(".content_right ul li").eq(levelIndices[elementLevel]).show();
				
				if ($(".content_right ul").find("li:visible").length > max) 
				{
    						$(".content_right ul").find('li:visible:last').hide();
				}
				
			}

            $(".content_right ul li").eq(levelIndices[elementLevel]).addClass("highlight2");
			
			/* 	if (levelIndices[elementLevel] <= show_count) {
            		$(".nav_top").show();
        		} else {
            		$(".nav_top").hide();
        		}
			*/
        } else if (elementLevel == 1) {
			//debugger;
            var totalLevel2Menu = $("." + activeLevel2Class +  " ul li").size();
			$("." + activeLevel2Class +  " ul li").removeClass("sub_highlight");
			
			var max = 14;
			var varhidevalue=0;
			var noofcount=1;
          
            if (levelIndices[elementLevel] - 1 < 0) {
				
				if (totalLevel2Menu<8)
				{
					varhidevalue=0;
				}
				else
				{
					var icount=Math.floor(totalLevel2Menu/8);
					
					for (j=1;j<=1000;j++)
						{
							if (icount<=j)
							{
								noofcount=j;
								break;
							}
							
						}
					
					if (noofcount>=1)
					{
					varhidevalue= ((noofcount-1)*8 ) + ((totalLevel2Menu-1) -(noofcount*8));
					}
				}
				
                levelIndices[elementLevel] = totalLevel2Menu-1;
				
				$("." + activeLevel2Class +  " ul").each(function(){  
  				if ($(this).find("li").length > max)
				{
    				$("." + activeLevel2Class +  " ul li").siblings(0).hide();
				}					
				 });  
			$("." + activeLevel2Class +  " ul").each(function(){
  					//var max = 7;
  					if ($(this).find("li").length > max) {
    					$(this)
						.find('li:gt('+varhidevalue+')')
      					.show()
					}
				});  
				
				
				
            } else {
                levelIndices[elementLevel]--;
             
            }
		
			if ( !$("." + activeLevel2Class +  " ul li").eq(levelIndices[elementLevel]).is(':visible') )
			{
				$("." + activeLevel2Class +  " ul li").eq(levelIndices[elementLevel]).show();
				
				if ($("." + activeLevel2Class +  " ul").find("li:visible").length > max) 
				{
    						$("." + activeLevel2Class +  " ul").find('li:visible:last').hide();
				}
				
			}
			
			
            $("." + activeLevel2Class +  " ul li").eq(levelIndices[elementLevel]).addClass("sub_highlight");
		   
        }
		else if (elementLevel == 2) {

            if (activeLevel2Class != "") {
                $("." + activeLevel2Class + " ul li").removeClass("sub_highlight");
                if (levelIndices[elementLevel] - 1 < 0) {
                    levelIndices[elementLevel] = 0;
                } else {
                    levelIndices[elementLevel]--;
                }
                $("." + activeLevel2Class + " ul li").eq(levelIndices[elementLevel]).addClass("sub_highlight");
            }
        }

}


/*  TV key LEFT key pressed */

function fn_tvkey_left_press () {
	
					categoryContent_UP_flag=0;
	   				show_count=0;
					hide_count=0;
		
       			 if (elementLevel === 0) {
            		elementLevel = 2;			
					fn_add_sorting_list_onview();
            		activeLevel2Class = "sorting_Entertainment";
			
			 		if (levelIndices[elementLevel]  > 0) {
                  
				 		 $(".sub_serial").eq(levelIndices[elementLevel]).show();
					 }else 
			 		{
				 		levelIndices[elementLevel] = 0;
			 		}
          

            		$('.sorting-container').animate({ "opacity": "1" }, "slow");
			
					//alert(levelIndices[elementLevel]);
			
            		$("." + activeLevel2Class + " ul li").removeClass("sub_highlight");
            		$("." + activeLevel2Class + " ul li").eq(levelIndices[elementLevel]).addClass("sub_highlight");
					//$(".sub_serial").eq(1).show();
            		$("." + activeLevel2Class).css("opacity", 1);
			
        			} else if (elementLevel === 1) {
						$("").myPlugin();
			
		
       				 }   else if (elementLevel === 2) {
            				elementLevel = 0;			
            				//document.getElementById("lbl_msg").innerHTML = levelIndices.join(',');

            				$('.sorting-container').animate({ "opacity": "0" }, "fast");

            				$("." + activeLevel2Class + " ul li").removeClass("sub_highlight");
            				$("." + activeLevel2Class + " ul li").eq(levelIndices[elementLevel]).addClass("sub_highlight");
            				$("." + activeLevel2Class).css("opacity", 0);
       				 }
	
}


/*  TV key RIGHT key pressed */

function fn_tvkey_right_press () {
	
		show_count=0;
		hide_count=0;
		//debugger;
		//document.getElementById("spkmsg").innerHTML="right key";
        if (elementLevel === 0) {	
		//document.getElementById("spkmsg").innerHTML="elemtn 0";
            elementLevel = 1;
			fn_rearrange_array();
			fn_addcategorylist_onview();
            activeLevel2Class = "flipbox_Entertainment";
			
			 if (levelIndices[elementLevel]  > 0) {
                  //  $("." + activeLevel2Class + " ul li sub_serial").eq(levelIndices[elementLevel]).show();
				  $(".sub_serial").eq(levelIndices[elementLevel]).show();
			 }else 
			 {
				 levelIndices[elementLevel] = 0;
			 }
         
            $('.flipbox-container').animate({ "opacity": "0.9" }, "slow");
			
			//alert(levelIndices[elementLevel]);
			
            $("." + activeLevel2Class + " ul li").removeClass("sub_highlight");
            $("." + activeLevel2Class + " ul li").eq(levelIndices[elementLevel]).addClass("sub_highlight");
			//$(".sub_serial").eq(1).show();
            $("." + activeLevel2Class).css("opacity", 1);
        }
        else if (elementLevel === 1) {
			//document.getElementById("spkmsg").innerHTML="elemtn 1";
            elementLevel = 0;
            //document.getElementById("lbl_msg").innerHTML = levelIndices.join(',');

            $('.flipbox-container').animate({ "opacity": "0" }, "fast");

            $("." + activeLevel2Class + " ul li").removeClass("sub_highlight");
            $("." + activeLevel2Class + " ul li").eq(levelIndices[elementLevel]).addClass("sub_highlight");
            $("." + activeLevel2Class).css("opacity", 0);
        }
		 else if (elementLevel === 2) {  
		// document.getElementById("spkmsg").innerHTML="elemtn 2";
			$("").mysorting();
		
        }

		
	
}