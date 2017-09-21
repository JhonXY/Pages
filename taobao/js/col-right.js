$(function(){
  $("ul.apps-nav li a img").mouseover(function () {
    $(this).parent().next().css({"display":"block","z-index":"1000"}).children().eq(0).attr("src", function () {
      return $(this).attr("data-src")
    })
  }).mouseout(function () {
    $(this).parent().next().css({"display":"none","z-index":"-1"})
  })

  $("ul.conve-list li.conve-float").mouseover(function () {
    $(this).siblings().removeClass("selected")
    $(this).addClass("selected")
    $("div.conve-bd-box").addClass("conve_on")
  })
  $("a.conve-bd-box-close").click(function () {
    $("ul.conve-list li.conve-float").removeClass("selected")
    $("div.conve-bd-box").removeClass("conve_on")
  })
})
