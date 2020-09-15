
var searchButton = $(".searchButton");

var apiUrl = "918084d8060d50df0258a5c8181d86ec";

var searchHistory = [];





function loadHistory(){

  for(var i = 0; i < searchHistory.length; i++){

    var cityName = $(".list-group").addClass("list-group-item");
    cityName.attr("data-index", searchHistory[i]);
    cityName.setAtribute(href, "#")
    cityName.append("<button class='buttons' href = '#'>" + searchInput + "</button>");
    
  }
}


var keyCount = 0;

function getData(searchInput){
console.log("inside getData; " + searchInput);


var storedCities = JSON.parse(localStorage.getItem("searchHistory"));
  if (storedCities.length > 0) {
    searchHistory = storedCities;

  // var searchInput = $(".searchInput").val();

  for (var i =0; i < searchHistory.length; i++) {

    var cityName = $(".list-group").addClass("list-group-item");
      cityName.attr("data-index", searchInput);
      cityName.append("<button class='buttons' href = '#'>" + searchInput + "</button>");
      cityName.append("<br>"); 
    }
  }
    

    // Variable for current weather working 
    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiUrl + "&units=imperial";

    // Variable for 5 day forecast working
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiUrl + "&units=imperial";
    

  if (searchInput == ""){
    console.log(searchInput);
  }else{
    $.ajax({
      url:urlCurrent, 
      method: "GET"
    }).then(function(response){


      if(!searchHistory.includes(searchInput)){

      var cityName = $(".list-group").addClass("list-group-item");
      cityName.attr("data-index", searchInput);
      cityName.append("<button class='buttons' href = '#'>" + searchInput + "</button>");
      cityName.append("<br>"); 
      searchHistory.push(searchInput);
      }

      keyCount = keyCount + 1;

            // Start Current Weather append 
            var currentCard = $(".currentWeather").append("<div>").addClass("card-body");
            currentCard.empty();
            var currentName = currentCard.append("<p>");
            // .addClass("card-text");
            currentCard.append(currentName);

            // Adjust Date 
            var timeUTC = new Date(response.dt * 1000);
            currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
            // Add Temp 
            var currentTemp = currentName.append("<p>");
            // .addClass("card-text");
            currentName.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
            // Add Humidity
            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
            // // Add Wind Speed: 
            currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

            // UV Index URL
            var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}`;

            // UV Index
            $.ajax({
                url: urlUV,
                method: "GET"
            }).then(function (response) {

                var currentUV = currentTemp.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
                currentUV.addClass("UV");
                currentTemp.append(currentUV);
                // currentUV.append("UV Index: " + response.value);
                
            });
            
        });

        // Start call for 5-day forecast 
        $.ajax({
            url: urlFiveDay,
            method: "GET"
        }).then(function (response) {
            // Array for 5-days 
            var day = [0, 8, 16, 24, 32];
            var fiveDayCard = $(".fiveDayCard").addClass("card-body");
            var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
            fiveDayDiv.empty();
            // For each for 5 days
            day.forEach(function (i) {
                var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
                FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");

                fiveDayDiv.append("<div class=weekendForecast>" + "<p>" + FiveDayTimeUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");

            })

        });
    }

};

var cityName = $(".list-group").addClass("list-group-item");
$("#searchItems").on("click", function(e){
  $("#cityText").val("");
  console.log(e.target.innerHTML);
  getData(e.target.innerHTML);
});

$("#button-addon2").on("click", function(){
  var cityInfo = $("#cityText").val();
  $("#cityText").val("");
  console.log(cityInfo);
  getData(cityInfo);
});

var input = document.getElementsByClassName("searchInput")[0];
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("button-addon2").click();
    }
});

$(document).ready(function() {
    loadHistory();
    });