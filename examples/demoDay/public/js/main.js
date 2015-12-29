$("#magic").click(function () {
  // alert($("#song").val());
  // alert($("input[name=optradio]:checked").val());
  // $("#myCarousel").css("display", "block");
  // alert($("#song").val());
  $("#hexdots").show();
  $.ajax({
    type: "POST",
    url: "/demoDay",
    data: {
      song: $("#song").val(),
      license: $("input[name=optradio]:checked").val()
    },
    cache: false,
    success: function (msg) {
      // alert(msg.images[0]);
      $("#img1").attr("src", msg.images[0]);
      $("#img2").attr("src", msg.images[1]);
      $("#cc1").html(msg.artist);
      $("#p1").html("Hotttness in Echonest: " + msg.hotttnesss);
      $("#cc2").html(msg.artist);
      $("#p2").html("Hotttness in Echonest: " + msg.hotttnesss);
      $("#hexdots").hide();
      $("#myCarousel").show();
    },
    error: function () {
      $("#hexdots").hide();
      // alert("failure");
      // $("#myCarousel").show();
    }
  });

})
