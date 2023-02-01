
$(".search-button").click( function() {
    $(".search-container").css("visibility", "visible");
    $("body").css("overflow", "hidden");
});

$(".search-container span").click( function() {
    $(".search-container").css("visibility", "hidden");
    $("body").css("overflow", "overlay");
});

var humidityPercentage =  $(".percentage-barfilled").attr("value");
$(".percentage-barfilled").css("width", humidityPercentage + "%")

var windDirectionDeg = $(".wind-direction-sign").attr("value");
$(".wind-direction-sign").css("transform", "rotate(" + windDirectionDeg + "deg)");