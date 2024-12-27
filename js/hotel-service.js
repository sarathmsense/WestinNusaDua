var comn_htl_data = null;
var count =0;
var totalLen = "";
var str_room = queryString("room");
var str_fromurl1 = queryString("fromurl");
  $(document).on("keyup", function (e) {
    
    var keyCode = e.keyCode;

    if (keyCode === 40) {
      count++;
      if (count >= totalLen) count = 0;
      console.log("count",count);
      $(".cnt-col .cnt-cl").removeClass("act").eq(count).addClass("act");
      let menu_select = $(".cnt-cl.act").data("id").toLowerCase();
      console.log(menu_select,"menu_select");
      if (str_fromurl1 =="guest_dir") {
        fn_htlInfo_data(menu_select,comn_htl_data);
        console.log("1");        
      }
      
      carouselCaptionUpdate();
      fnch_logwriter(menu_select, str_room,0);
    } else if (keyCode === 38) {
      count--;
      if (count < 0) count = totalLen - 1;
      $(".cnt-col .cnt-cl").removeClass("act").eq(count).addClass("act");
      let menu_select = $(".cnt-cl.act").data("id").toLowerCase();
      // fn_htlInfo_data(menu_select,comn_htl_data);
      if (str_fromurl1 =="guest_dir") {
        fn_htlInfo_data(menu_select,comn_htl_data);
        console.log("2");
      }
      carouselCaptionUpdate();
      fnch_logwriter(menu_select, str_room,0);
    }
    if (e.keyCode == 39) {
      carouselCaptionUpdate()
      $("#carouselExampleControlsNoTouching").carousel("next");
    }
    if (e.keyCode == 37) {
      carouselCaptionUpdate()
      $("#carouselExampleControlsNoTouching").carousel("prev");
    }


    if (e.keyCode == 10182 || e.keyCode == 10009) {
      bckbtnpressed();
    }
    if (e.keyCode == 10071) {
      homepageshowing();
    }
  });

console.log(baseURL + "json/WestinNusaDua.json");

  

function get_htlinfo_data(){
  $.ajax({
    type: "GET",
    url: baseURL + "json/WestinNusaDua.json", //LIVE server
    // url: "downloadfile/MsenseChannelMap.xml",
    contentType: "application/json",
    timeout: 5000,
    dataType: "json",
    success: function (data) {
      $(".col-cnte").css("display","block")
      comn_htl_data=data;
      fn_htlInfo_data("services",comn_htl_data);
    },
    error: function () {
        show_msg_guest("Please check network connectivity. (ID02)")
    }
  });
}
function fn_htlInfo_data(menu_select,data) {
  document.querySelector(".carousel-indicators").innerHTML = "";
  document.querySelector(".carousel-inner").innerHTML = "";
  document.querySelector(".carousel-control").innerHTML = "";
  let carouselArrow = "";
  let carouselindicators = "";
  let carouseldata = "";
  let menudata = "";

      console.log("data", data);
      $(".top-hdr img").attr("src", data.nusaDua.logo);
     var data1 = data.nusaDua.guest_menus[menu_select]; // console.log("data2", data1);
      let values = data1.menu_images;
      let menu_values = data1.guest_menus;
  console.log("data1", menu_values);
  menu_values.map((el, i) => {
    menudata += `<div class="col-12 cnt-cl mt-2 ${i == 0 ? "act" : ""}" data-id="${el.data_id}">
        <span href="" class="loc-url"> ${el.content}</span>
      </div>`;
    });
      values.map((el, i, arr) => {
        if (arr.length > 1) {
          carouselindicators += `
                  <li data-target="#carousel" data-slide-to="${i}"
                  class="${i == 0 ? "active" : ""}" >${el.caption}</li>`;
          carouselArrow = `<button class="carousel-control-prev" type="button" data-target="#carouselExampleControlsNoTouching"
                                data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-target="#carouselExampleControlsNoTouching"
                                data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </button>`;

        }
        carouseldata += `
                    <div class="carousel-item ${i == 0 ? "active" : ""} h-100" data-caption="${el.caption}">
                        <div class="d-flex sld-inner align-items-center" data-caption="${el.caption}">
                           <img src="${baseURL + el.image}" class="img-fluid pic-height">
                              <div class="carousel-caption d-none d-md-block text-white ${el.text?"":"invisible"}">
                                <h4>${el.text?el.text:""}</h4>
                              </div>
                        </div>
                    </div>
                  `;
        if (i == 0) $(".cption-slde").html(`${el.caption?el.caption:""}`);
      });
       document.querySelector(".carousel-inner").insertAdjacentHTML("beforeend", carouseldata);
      if ($(".menu-sec > div").length == 0)
       document.querySelector(".menu-sec").insertAdjacentHTML("beforeend", menudata);
      if (values.length>1) {
        document.querySelector(".carousel-indicators").insertAdjacentHTML("beforeend", carouselindicators);
        document.querySelector(".carousel-control").insertAdjacentHTML("beforeend", carouselArrow);
      }

      carouselCaptionUpdate();
      totalLen = $(".cnt-col .cnt-cl").length;


}


function carouselCaptionUpdate() {
  $(".carousel").bind("slid.bs.carousel", function () {
    $(".cption-slde").html("");
    if ($(".carousel-item.active").attr("data-caption") != "undefined") {
      let active_caption = $(".carousel-item.active").attr("data-caption");
      $(".cption-slde").html(active_caption);
    }
  });
}
