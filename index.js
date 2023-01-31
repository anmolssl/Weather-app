
$(".search-button").click( function() {
    $(".search-container").css("visibility", "visible");
    $("body").css("overflow", "hidden");
});

$(".search-container span").click( function() {
    $(".search-container").css("visibility", "hidden");
    $("body").css("overflow", "overlay");
});
