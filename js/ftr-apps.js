var index = -1;
var ul = document.querySelector('ul');
var nodes = document.querySelectorAll('li');
var selected = 0;
var liSelected;

var flag = 0;
var count = 0, totalLen = $('#my-modal .cnt-col .cnt-cl').length;
var app_caption = $('.cont-list .col.act').attr('data-description');
$('.data-desc').html(app_caption)


document.getElementById("my-modal").addEventListener('keydown', function (e) {

  var keyCode = e.keyCode

  if (keyCode === 37) {

    count--
    if (count < 0) count = totalLen - 1;
    console.log(totalLen);
  } else if (keyCode === 39) {
    count++
    if (count >= totalLen) count = 0;
  }
  // console.log(count)
  $('#my-modal .cnt-col .cnt-cl').removeClass('act').eq(count).addClass('act')

  if (keyCode === 13) {
    var modal_button = $('.modal .cnt-cl.act button').data("clear");
    setTimeout(() => {
      flag = 0;
    }, 2000);
    //console.log(modal_button);
    if (modal_button == 'no') {
      $('.modal').modal('hide');
      $('.modal .cnt-cl').removeClass('act')
      window.location.reload();
    }

    if (modal_button == 'yes') {
      $('.modal').modal('hide');
      $('.mess_success').fadeIn(1000);
      $('.data-desc').hide();
      fn_clear_credential();
      setTimeout(() => {
        flag = 0;
      }, 2000);
    }
  }
});





$(document).ready(function () {



  document.addEventListener('keyup', function (e) {


    // console.log(href_val);
    let list_row = 7;
    let position = 1;

    var link_data = 'home.html?fromurl=apps';
    // var data_desc = $(".channel-lst").find('li.selected').find('div.col.act').attr('data-description')
    // console.log(href_val);

    // // console.log('aaaaa');

    if (flag)
      return;

    //up arrow function
    if (e.keyCode === 38) {

      //find focus element
      let active_check = $('.cont-list').find('div.act').length;

      if (active_check) {

        //channel list
        let current_index = $($(".cont-list").find('div.act')[0]).attr('data-index');
        let total_index = $(".cont-list").find('div.act').parent().find('div').length;

        let next_index = Number(current_index) - list_row;

        if (next_index < 1) {
          next_index = ((total_index + Number(current_index)) - (total_index % list_row));
          if (next_index > total_index) {
            next_index = next_index - list_row;
          }
        }

        $(".cont-list").find('div.act').removeClass('act');
        $("#list").find('li.selected').find('div.col[data-index=' + next_index + ']').addClass('act');

        var data_desc = $(".channel-lst").find('li.selected').find('div.col[data-index=' + next_index + ']').attr('data-description');
        $('.data-desc').html(data_desc)


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
    if (e.keyCode === 40) {

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

        var data_desc = $(".channel-lst").find('li.selected').find('div.col[data-index=' + next_index + ']').attr('data-description');
        $('.data-desc').html(data_desc)

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

          console.log(next_index);

          var data_desc = $(".channel-lst").find('li.selected').find('div.col[data-index=' + next_index + ']').attr('data-description');
          // console.log(data_desc);
          $('.data-desc').html(data_desc)


        } else {

          tvChannelZoom();


        }

        console.log(next_index);

      }

      if (next_index == 0) {
        if (data_desc === undefined) {
          $('.data-desc').html('')
        }

        // $('li.selected').data("link", + link_data);
        $('li.selected span').attr('data-link', link_data);
        // console.log(link_data);
        // $('li.selected').find('.txt-sel').data("link", "home.html?fromurl=apps");
        // alert('aaaa')
        // console.log(data_desc);
        tvChannelZoom();

      }

      else {
        $('li.selected span').attr('data-link', '');
      }



    }

    //right arrow function
    if (e.keyCode === 39) {

      //find focus element
      let active_check = $('.cont-list').find('div.act').length;

      if (active_check) {

        let current_index = $($(".cont-list").find('div.act')[0]).attr('data-index');
        let total_index = $(".cont-list").find('div.act').parent().find('div').length;
        let next_index = Number(current_index) + 1;




        $(".cont-list").find('div.act').removeClass('act');
        if (next_index <= total_index) {
          $(".channel-lst").find('li.selected').find('div.col[data-index=' + next_index + ']').addClass('act');
          // console.log(data_desc);
          // console.log(next_index);
          var data_desc = $(".channel-lst").find('li.selected').find('div.col[data-index=' + next_index + ']').attr('data-description');

          $('.data-desc').html(data_desc)
          $('li.selected').find('.txt-sel').data("link", "");

        } else {
          if (data_desc === undefined) {
            $('.data-desc').html('')

          }
          tvChannelZoom();
          $('li.selected span').attr('data-link', link_data);
        }

      } else {

        //tv channels
        $($('.channel-lst').find('li.selected').find('div.col[data-index=1]')[0]).addClass('act');
        var data_desc = $($('.channel-lst').find('li.selected').find('div.col[data-index=1]')[0]).attr('data-description');

        $('.data-desc').html(data_desc)

        $('li.selected span').attr('data-link', '');

      }

    }


    //enter tv chanelname
    if (e.keyCode === 13) {
      var href_val = $('li.selected span').attr('data-link');
      // console.log(href_val);

      if (href_val !== "") {
        // console.log('redirect');
        window.location = "home.html?fromurl=apps";
      }
      if (!$('.cnt-col .cnt-cl').eq(0).hasClass('act')) {

        var tv_channel_name = $('li.selected .col.act').data("id");

        guestroomno = queryString("room");
        // console.log(href_val);
        //fn_tvmenuchannel_chooser(tv_channel_name);

        if (tv_channel_name !== undefined) {
          buttonclichhandler(tv_channel_name);
        }

        if ($("body").hasClass("modal-open")) {
          // $('.cont-list');
        }

      }


      // if (href_val !== "") {
      //   console.log('redirect');
      //   // window.location = "home.html?fromurl=apps";
      // }
    }

    if (e.keyCode == 10182 || e.keyCode == 10009) {
      bckbtnpressed();
    }
    if (e.keyCode == 10071) {
      homepageshowing();
    }
  });

  function buttonclichhandler(levelName) {
    var str_log = 'Apps : move to ' + levelName;
    fnch_logwriter(str_log, guestroomno, 0);

    if (levelName == "Netflix") {
      homescreenpage.launchappfromhtml('com.netflix.ninja', "");
    }
    if (levelName == "Youtube") {
      homescreenpage.launchappfromhtml('com.google.android.youtube.tv', "");
    }
    if (levelName == "Amazon Prime") {
      homescreenpage.launchappfromhtml('com.amazon.amazonvideo.livingroom', "");
    }
    if (levelName == "Disney Hotstar") {
      homescreenpage.launchappfromhtml('in.startv.hotstar', "");
    }
    if (levelName == "Sony Liv") {
      homescreenpage.launchappfromhtml('com.sonyliv', "");
    }
    if (levelName == "Zee5") {
      homescreenpage.launchappfromhtml('com.graymatrix.did', "");
    }
    if (levelName == "iqiyi") {
      homescreenpage.launchappfromhtml('com.iqiyi.i18n.tv', "");
    }
    if (levelName == 'clear') {
      $('.modal').modal('show');
      flag = 1;
      $('#my-modal .cnt-col .cnt-cl').eq(0).addClass('act')
    }

  }

  var total = $('ul li').length;
  var ul = document.querySelector('ul');
  var nodes = document.querySelectorAll('li');
  var selected = 0

  function select(el) {
    var s = [].indexOf.call(nodes, el);
    if (s === -1) return;

    selected = s;

    var elHeight = $(el).height();
    var scrollTop = $(ul).scrollTop();
    var viewport = scrollTop + $(ul).height();
    var elOffset = elHeight * selected;

    //console.log('select', selected, ' viewport', viewport, ' elOffset', elOffset);
    if (elOffset < scrollTop || (elOffset + elHeight) > viewport)
      $(ul).scrollTop(elOffset);

    document.querySelector('li.selected').classList.remove('selected');
    el.classList.add('selected');
  }

  function tvChannelZoom() {
    $("#list").find('li.selected span').addClass('zoom-in-out-tvlist');
    $('li.selected').find('.txt-sel').data("link", "1");
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

  $(document).ready(function () {
    $('.cont-list').equalHeights();
  });

  $(document).ready(function () {
    $(".wrapper").addClass('act');
    setTimeout(function () {
      $('.wrapper').removeClass('act')
    }, 7000);
  });

});
