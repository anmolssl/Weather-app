const express = require("express");
const https = require("https");

const app = express();

app.use(express.static(__dirname + '/'));

var temp;

app.get("/", function(req, res) {
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Chandigarh,India&appid=0f2b7a5fb36d9e2067a0b8919d60962e&units=metric";
    
    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on('data', function(data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            temp = weatherData.main.temp;
        });
    });

    res.render(__dirname + "/index.html", {temp: temp});
});

app.listen(3000, function() {
    console.log("Server started on 3000");
});

