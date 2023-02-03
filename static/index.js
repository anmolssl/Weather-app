
// Search for places funciton

$(".search-button").click( function() {
    $(".search-container").css("visibility", "visible");
    $("body").css("overflow", "hidden");
});

$(".search-container span").click( function() {
    $(".search-container").css("visibility", "hidden");
    $("body").css("overflow", "overlay");
});

// updating humidty percentage

var humidityPercentage =  $(".percentage-barfilled").attr("value");
$(".percentage-barfilled").css("width", humidityPercentage + "%")

// updating wind direction

var windDirectionDeg = $(".wind-direction-sign").attr("value");
$(".wind-direction-sign").css("transform", "rotate(" + windDirectionDeg + "deg)");

// On click to fetch user location coords

$(".my-location-btn").click( function() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Your browser doesn't support location tracking");
    }
});


// --------------------Functions Declaring-------------------

// Fetching location coords from browser

function onSuccess(position) {
    coordsDetails = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    }
    sendingCoordsToServer(coordsDetails);
    location.reload();
}

function onError(error) {
    if(error.code === 1) {
        alert("You denied location request");
    } else if (error.code === 2) {
        alert("Location not found");
    } else {
        alert("Something went wrong!");
    }
    $(".my-location-btn").attr("disabled", "true");
}

// Sending location coords to Server

function sendingCoordsToServer(object) {
    var jsonstring = JSON.stringify(object);

    var xhr = new XMLHttpRequest;

    xhr.open('POST', '/coords', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(jsonstring);
    console.log("Coords sent to server");
}
