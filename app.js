const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require('dotenv').config({path:__dirname+'/.env'});

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {
res.sendFile(__dirname + "/index.html")

})


app.post("/", function(req, res){
  const city = req.body.cityName
  const units = "metric"
  const apiKey = process.env.API
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + units + "&appid="+ apiKey
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
      console.log(temp);
      res.write("<p>The weather is currently: " + weatherDescription + "<p>");
      res.write("<h1>The tempterature of " + city +" is currently " + temp + " degrees celcius.</h1>");
      res.write("<img src=" + imageURL +">")
      res.send()
    })
  })
})


app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})
