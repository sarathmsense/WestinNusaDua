var index = -1;
var ul_elmnt = "";
var var_nodes_list = "";
var selected = 0;
var liSelected;
var num = 0;
var currentChannel_index = 0;
var totalnoofchannel = 0;
var previoutime2 = 0;
var previoutime1 = 0;
let per_item_hgt = 0;
let start_section =1;
let end_section =4;
var count = 0;
var selected = 0;

function fn_load_ulemnt(){
     // *** Dynamic channels load ***/
     per_item_hgt = ($(".cont-list").find('div[data-index=1]').height()) + 15;
     ul_elmnt = document.querySelector('ul');
     var_nodes_list = document.querySelectorAll('li');
     $('.cont-list').equalHeights();
     $(".wrapper").addClass('act');
     setTimeout(function () {
     $('.wrapper').removeClass('act')
     }, 7000);
     // *** End Dynamic channels load ***/
}

function select(el) {
  var s = [].indexOf.call(var_nodes_list, el);
  if (s === -1) return;

  selected = s;

  var elHeight = $(el).height();
  var scrollTop = $(ul_elmnt).scrollTop();
  var viewport = scrollTop + $(ul_elmnt).height();
  var elOffset = elHeight * selected;

  //console.log('select', selected, ' viewport', viewport, ' elOffset', elOffset);
  if (elOffset < scrollTop || (elOffset + elHeight) > viewport)
    $(ul_elmnt).scrollTop(elOffset);

  document.querySelector('li.selected').classList.remove('selected');
  el.classList.add('selected');
}

function tvChannelZoom() {
  $("#list").find('li.selected span').addClass('zoom-in-out-tvlist');
  $("#list").find('li.selected').removeClass("selected-hide");
  setTimeout(function () {
    $("#list").find('li span').removeClass('zoom-in-out-tvlist');
  }, 1000);
}
// tool tip
$(function () {
  setTimeout(function () {
    $(".tip").fadeOut();
  }, 5000);
});

$.fn.equalHeights = function () {
  var max_height = 0;
  $(this).each(function () {
    max_height = Math.max($(this).height(), max_height);
  });
  $(this).each(function () {
    $(this).height(max_height);
  });
};

var tv_channels ={
  KeyHandler: function(e) {

  let list_row = 5;
  let per_page_height = 4;
  let position = 1;
  
  totalnoofchannel = arr_listofchannels.length;
  var diff1 = Date.now() - previoutime1;
  if (diff1 < 100)
    return;
  // document.getElementById("logtext").innerHTML += "<br> Keycode : " + e.keyCode;
  //up arrow function
  if (e.keyCode === 38) {  //UP

    //find focus element
    let active_check = $('.cont-list').find('div.act').length;

    if (active_check) {

      //channel list
      let current_index = $($(".cont-list").find('div.act')[0]).attr('data-index');
      let total_index = $(".cont-list").find('div.act').parent().find('div').length;

      // let next_index = Number(current_index) - list_row;
      let next_index = Number(current_index) - list_row;

      // if (next_index < 1) {
      //   next_index = ((total_index + Number(current_index)) - (total_index % list_row));
      //   if (next_index > total_index) {
      //     next_index = next_index - list_row;
      //   }
      // }

      if (next_index < 1) {
        next_index = ((total_index + Number(current_index)) - (total_index % list_row));
        if (next_index > total_index) {
          next_index = next_index - list_row;
          // console.log('next_index Top '  + next_index);
        }

        
        
      }

      if (current_index > 5) {
        $(".cont-list").find('div.act').removeClass('act');
        $("#list").find('li.selected').find('div.col[data-index=' + next_index + ']').addClass('act');
      }

      // if (current_index < 1) {
      //   $(".cont-list").find('div.act').removeClass('act');
      //   $("#list").find('li.selected').find('div.col[data-index=' + next_index + ']').addClass('act');
      // }

      // $(".cont-list").find('div.act').removeClass('act');
      // $("#list").find('li.selected').find('div.col[data-index=' + next_index + ']').addClass('act');

      if((list_row * per_page_height) < next_index) {

        let final_val = next_index - (list_row * per_page_height);
        let extra_row_number = Math.floor(final_val / list_row) + 1;

        //if(next_index % list_row == 1) {
          //  $(".cont-list").animate({scrollTop: per_item_hgt * extra_row_number});
        //}
        // console.log(per_item_hgt * extra_row_number);
      }
      
      // else if(next_index == 1){
      //   $ ('html, body') .animate ({
      //     scrollTop: $(".cont-list") .offset().top + $(".cont-list")[0].scrollHeight
      //   });
      // }

      // console.log(current_index);

      if(current_index <= 30) {
        $(".cont-list").animate({scrollTop: 0}, 100);
      }
      console.log(current_index);
      if(current_index == 30 || current_index == 31 || current_index == 32 || current_index == 33 || current_index == 34|| current_index == 35 || current_index == 36 || current_index == 37 || current_index == 38 || current_index == 39 || current_index == 40 || current_index == 41 || current_index == 42 || current_index == 43 || current_index == 44 || current_index == 45 ) {
        $(".cont-list").animate({scrollTop:  580 - 102}, 100);
      }

      // if (next_index == 1) {
      //   $ ('html, body') .animate ({
      //     scrollTop: $(".cont-list") .offset().top + $(".cont-list")[0].scrollHeight
      //   });
      //   // $(".cont-list").animate({scrollTop: $ ("#SecondDiv") .offset().top + $("#SecondDiv")[0].scrollHeight});
      // }

      // console.log(next_index);

      // if(current_index > 25) {
      //   $(".cont-list").animate({scrollTop: $('.cont-list').height()});
      // }

    } else {

      //tv chennals
      let selected_channel = $('.channel-lst').find('li.selected').attr('id');
      let next_channel = Number(selected_channel) - 1;
      let total_channels = $('.channel-lst').find('li').length;

      let pos = $('#list').attr('data-position');
      if (Number(pos) != 1) {
        position = Number(pos) - 1;
        $("#list").attr('data-position', position);
      }

      if (next_channel) {
        $('.channel-lst').find('li.selected').removeClass('selected');
        $(".channel-lst").find('li[id=' + next_channel + ']').addClass('selected');
      }

      let current_pos = $('#list').attr('data-position');
      if (Number(current_pos) == 1) {
        let length_channel = $($('.channel-lst').find('li.selected')[0]).height();

        let total_hgt = Number(next_channel) * length_channel;
        total_hgt = total_hgt - length_channel;

        $('.channel-lst').animate({
          scrollTop: total_hgt + 'px'
        }, 100);
      }

      //arrows
      if (next_channel == 1) {
        $('#channel-arrows .arw-dwn').addClass('act');
        $('#channel-arrows .arw-up').removeClass('act');
      }
    }
  }

  //down arrow function
  if (e.keyCode === 40) { //Down

    //find focus element
    let active_check = $('.cont-list').find('div.act').length;

    if (active_check) {

      //channel list
      let current_index = $($(".cont-list").find('div.act')[0]).attr('data-index');
      let total_index = $(".cont-list").find('div.act').parent().find('div.col').length;

      let next_index = Number(current_index) + list_row;

      if (next_index > total_index) {
        next_index = (next_index % list_row);
        if (!next_index)
          next_index = list_row;
      }

      $(".cont-list").find('div.act').removeClass('act');
      $("#list").find('li.selected').find('div.col[data-index=' + next_index + ']').addClass('act');

      if((list_row * per_page_height) < next_index) {

        let final_val = next_index - (list_row * per_page_height);
        let extra_row_number = Math.floor(final_val / list_row) + 1;

        start_section += 1;
        end_section += 1;

        //if(next_index % list_row == 1) {
           $(".cont-list").animate({scrollTop: per_item_hgt * extra_row_number}, 100);
        //}
      } else if(next_index <= list_row) {
        start_section = 1;
        end_section = 4;
        $(".cont-list").animate({scrollTop: 0}, 100);
      }

      if(current_index <= 6){
        $(".cont-list").animate({scrollTop: 0}, 100);
      }
      

    } else {

      //tv channels
      let selected_channel = $('.channel-lst').find('li.selected').attr('id');
      let next_channel = Number(selected_channel) + 1;

      let total_channels = $('.channel-lst').find('li').length;

      let pos = $('#list').attr('data-position');
      if (Number(pos) != 6) {
        position = Number(pos) + 1;
        $("#list").attr('data-position', position);
      }

      if (next_channel <= total_channels) {
        $('.channel-lst').find('li.selected').removeClass('selected');
        $(".channel-lst").find('li[id=' + next_channel + ']').addClass('selected');
      }

      let current_pos = $('#list').attr('data-position');
      if (Number(current_pos) == 6) {
        let total_channel_hgt = $($('ul.channel-lst')[0]).height();
        let length_channel = $($('.channel-lst').find('li.selected')[0]).height();

        let total_hgt = next_channel * length_channel;
        let bal_hgt = total_hgt - total_channel_hgt;
        console.log(bal_hgt);
        $('.channel-lst').animate({
          scrollTop: bal_hgt + 'px'
        }, 100);
      }

      //arrows
      if (next_channel == total_channels) {
        $('#channel-arrows .arw-dwn').removeClass('act');
        $('#channel-arrows .arw-up').addClass('act');
      }
    }
  }

  //left arrow function
  if (e.keyCode === 37) {

    let current_index = $($(".cont-list").find('div.act')[0]).attr('data-index');
    let total_index = $(".cont-list").find('div.act').parent().find('div').length;
    let next_index = Number(current_index) - 1;

    $(".cont-list").find('div.act').removeClass('act');
    if (next_index) {

      if (next_index % list_row) {
        $(".channel-lst").find('li.selected').find('div.col[data-index=' + next_index + ']').addClass('act');
        
      } else {
        //debugger;
        tvChannelZoom();
      }
    }

    if (next_index == 0) {
      //debugger;
      tvChannelZoom();
    }

  }

  //right arrow function
 //right arrow function
  if (e.keyCode === 39) {

    //find focus element
    let active_check = $('.cont-list').find('div.act').length;
    $("#list").find('li.selected').addClass('selected-hide');
    if (active_check) {

      let current_index = $($(".cont-list").find('div.act')[0]).attr('data-index');
      var selected_total = Number($(".channel-lst").find('li.selected').find('div.col').length);
      let total_index = $(".cont-list").find('div.act').parent().find('div').length;
      let next_index = Number(current_index) + 1;

      $(".cont-list").find('div.act').removeClass('act');
      if (next_index <= total_index) {  
        $(".channel-lst").find('li.selected').find('div.col[data-index=' + next_index + ']').addClass('act');

        if((list_row * per_page_height) < next_index) {

          let final_val = next_index - (list_row * per_page_height);
          let extra_row_number = Math.floor(final_val / list_row) + 1;

          if(next_index % list_row == 1) {
            start_section += 1;
            end_section += 1;
            $(".cont-list").animate({scrollTop: per_item_hgt * extra_row_number});
          }
        }

        if((list_row * per_page_height) + 1 == next_index) {
          start_section += 1;
          end_section += 1;
          $(".cont-list").animate({scrollTop: per_item_hgt});
        }
      } else {
        //debugger;
        tvChannelZoom();
      }

      if (selected_total < next_index ) {
        tvChannelZoom();
      }

    } else {

      //tv channels
      $($('.channel-lst').find('li.selected').find('div.col[data-index=1]')[0]).addClass('act');
      $(".cont-list").animate({scrollTop: 0});
    }

  }
  //enter tv chanelname
  if (e.keyCode === 13) {
    var tv_channel_name = $('li.selected .col.act').data("id");      
    var ch_no = 0;
    if (tv_channel_name !== undefined) {

      // setTimeout(function(){ channel_handlerv1('a','HDMI2'); }, 1000);
      var ch_number = searchCPL_channel(arr_listofchannels, tv_channel_name);

      if (typeof ch_number !== 'undefined' && ch_number != '' && ch_number.includes(",")) {
        //debugger;
        var arr_chnum_index = ch_number.split(",");
        if (arr_chnum_index != '' && arr_chnum_index.length > 0)
          currentChannel_index = arr_chnum_index[0];
        if (arr_chnum_index != '' && arr_chnum_index.length > 1)
          ch_no = arr_chnum_index[1];
        
        if (ch_no>0){
          $("#tv_channel_list_area").hide();
          $("#tv_channel_playing_area").show();
          $('#tv_Anchor').focus();
          $('body').css('background-color', 'transparent');	
          launchSource("TV");
          fn_play_channel_numpress(ch_no);
          showchlist();
          $('.content_right').show();
          show_hilights(ch_no);
        }
        else
          show_msg_guest('Channel not found');
      }
     
    }
  }

  if (e.keyCode == 10182 || e.keyCode == 10009) {
    bckbtnpressed();
  }
  if (e.keyCode == 10071) {
    homepageshowing();
  }
  previoutime1 = Date.now();
}
};

function show_hilights(ch_no){
  levelIndices[elementLevel] = Number(ch_no - 1);        
  var max=12;
  if (Number(ch_no - 1) >=max){
    // is_tv_script=true;
    // fn_tvkey_down_press();
    if ($(".content_right ul li").length -1 > max)
    {
      $(".content_right ul").each(function(){  
        if ($(this).find("li").length >= max)
        {
          $(".content_right ul li").siblings(0).hide();
        }					
      }); 			
    }        
  var num_hide=Number(ch_no) -2;
    $(".content_right ul").each(function(){
        if ($(this).find("li").length >= max) {
          $(this)
            .find('li:gt('+num_hide+')')
            .show()
      }
    });  
    var hide_num=Number(ch_no)+12;            
    $(".content_right ul").each(function(){
      if ($(this).find("li").length > hide_num) {
        $(this)
        .find('li:gt('+hide_num+')')
        .hide()
      }
    }); 
    $(".content_right ul li").removeClass("highlight2");
    $(".content_right ul li").eq(levelIndices[elementLevel]).addClass("highlight2");
  } else{
    $(".content_right ul li").removeClass("highlight2");
    $(".content_right ul li").eq(levelIndices[elementLevel]).addClass("highlight2");
  } 
}


