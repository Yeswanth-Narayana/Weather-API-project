//const apiKey = "035df4563c9f50555b21c4f36874facd";

$(document).ready(function() {
  $("#getWeather").click(function() {
    var city = $("#cityName").val();
    //make the default city as delhi
    if (city == "") {
      city = "Delhi";
    }

    var apiKey = "035df4563c9f50555b21c4f36874facd";
    var url =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" +
      apiKey;

    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
      success: function(data) {
        var output = "";
        
        for (var i = 0; i < data.list.length; i += 8) {


          var weather = data.list[i].weather[0].main.toLowerCase();
          var iconUrl = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
          output += "<div class='col-md-4'>";
          output += "<div class='card'>";
          output += "<div class='card-header'>";
          output += "<h4 class='card-title'>" + data.city.name + "</h4>";
          output += "</div>";
          output += "<div class='card-body'>";
          //diplay time in 12 hour format
          output += "<h5 class='card-title'>" + data.list[i].dt_txt + "</h5>";
          output += "<img src='" + iconUrl + "' alt='Weather Icon'>";
          output += "<p class='card-text'>" + data.list[i].weather[0].description + "</p>";
          //make the temperature in celsius from kelvin
          data.list[i].main.temp = Math.round(data.list[i].main.temp - 273.15);
          output += "<p class='card-text'>Temperature: " + data.list[i].main.temp + " °C</p>";
          output += "<p class='card-text'>Humidity: " + data.list[i].main.humidity + " %</p>";
          output += "<p class='card-text'>Wind Speed: " + data.list[i].wind.speed + " m/s</p>";
          output += "</div>";
          output += "</div>";
          output += "</div>";
        }
        $("#weatherForecast").html(output);
      },
      error: function(error) {
        console.log(error);
      }
    });
  });
});
