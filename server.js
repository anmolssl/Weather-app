const express = require("express");
const https = require("https");
const http = require("http");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(__dirname + '/static'));
app.set("view engine", "ejs");

app.use(bodyParser.json());

http.get("http://ip-api.com/json/", function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
        locationData = JSON.parse(data);

        var lat = locationData.lat;
        var long = locationData.lon;

        app.post("/coords", function(req, res) {
            lat = req.body.latitude;
            long = req.body.longitude;
            
        });

        app.get("/", function(req, res) {

            var url;
            // "https://api.openweathermap.org/data/2.5/weather?q=" + coords + ",India&appid=0f2b7a5fb36d9e2067a0b8919d60962e&units=metric"
            // "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=0f2b7a5fb36d9e2067a0b8919d60962e&units=metric"
            if (lat && long) {
                url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=0f2b7a5fb36d9e2067a0b8919d60962e&units=metric";
            } else {
                url = "https://api.openweathermap.org/data/2.5/weather?q=" + coords + ",India&appid=0f2b7a5fb36d9e2067a0b8919d60962e&units=metric";
            }
            
            https.get(url, function(response) {
                console.log(response.statusCode);
        
                response.on('data', function(data) {
                    const weatherData = JSON.parse(data);
                    console.log(weatherData);
                    var temp = Math.round(weatherData.main.temp);
                    var windSpeed = (weatherData.wind.speed * 3.6).toFixed(1);
                    var pressure = weatherData.main.pressure;
                    var humidity = weatherData.main.humidity;
                    var windDirection = weatherData.wind.deg;
                    var visibility = weatherData.visibility/1000;
                    var cityName = weatherData.name;
                    var countryCode = weatherData.sys.country;
        
                    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    const date = new Date();
                    var day = weekday[date.getDay()];
                    var month = monthNames[date.getMonth()];
                    var todayDate = date.getDate();
        
                    res.render("pages/index.ejs", {weatherLocation: cityName + ", " + countryCode, temperature: temp, visibility: visibility, windDirection: windDirection, humidity: humidity, pressure: pressure, windSpeed: windSpeed, day: day, month: month, date: todayDate});
                });
            });
        
        });

    })
})

app.listen(PORT, function() {
    console.log("Server started on 3000");
});
