dpswi -- westin nasa dua bali ---  Gtv dongle

asset page
==============
middleware_checker() --> http://"+middleware_ip+"/"+project_name+"/gettvip.html
    

gettvip.html 
===============
   -->  RoomAdd(); --> gettvip.php --> $roomip = $_SERVER['REMOTE_ADDR']; ( get device ip)

        is_avail=1 -->  is_avail_check($roomip,$tvmac);
       
        is_avail=0 -->  insertott($room_no,$roomip, $tvmac,$str_tvloc);

   -->  isavail();

if Network connected smoothly --> Go to our project page 
if Network doesn't connected --> go to our asset page then loading -->When gettvip is connect then go to our project.

home.html  --> onready --> fngetroomfromwebapi()

01-Jul-2024
===========
--> Mr Bona certified template uploaded and test
--> Vision plus app launch from Home menu
--> Idea to launch Android home launcher



   



