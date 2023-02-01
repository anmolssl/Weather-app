const express = require("express");
const https = require("https");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(__dirname + '/static'));
app.set("view engine", "ejs");



app.get("/", function(req, res) {
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Chandigarh,India&appid=0f2b7a5fb36d9e2067a0b8919d60962e&units=metric";
    
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

            const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const date = new Date();
            var day = weekday[date.getDay()];
            var month = monthNames[date.getMonth()];
            var todayDate = date.getDate();

            res.render("pages/index.ejs", {temperature: temp, visibility: visibility, windDirection: windDirection, humidity: humidity, pressure: pressure, windSpeed: windSpeed, day: day, month: month, date: todayDate});
        });
    });

});

app.listen(PORT, function() {
    console.log("Server started on 3000");
});
