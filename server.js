require('dotenv').config();

const express = require("express");
const https = require("https");
const http = require("http");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(__dirname + '/static'));
app.set("view engine", "ejs");

app.use(bodyParser.json());

var lat, long;

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/starting.html");
});

app.post("/coords", function(req, res) {
    lat = req.body.latitude;
    long = req.body.longitude;
    
    res.send("/index");
});

app.get("/index", function(req, res) {

    var url;
    // "https://api.openweathermap.org/data/2.5/weather?q=" + coords + ",India&appid=" + process.env.API_KEY + "&units=metric"
    // "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + process.env.API_KEY + "&units=metric"
    if (lat && long) {
        url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + process.env.API_KEY + "&units=metric";
    } else {
        url = "https://api.openweathermap.org/data/2.5/weather?q=" + "Delhi" + ",India&appid=" + process.env.API_KEY + "&units=metric";
    }
    
    https.get(url, function(response) {

        response.on('data', function(data) {
            const weatherData = JSON.parse(data);
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

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/error.html")
});

app.listen(PORT, function() {
    console.log("Server started on 3000");
});
