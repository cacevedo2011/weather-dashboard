
var searchButton = $(".searchButton");

var apiUrl = "918084d8060d50df0258a5c8181d86ec";

var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  console.log(searchHistory);




function loadHistory(){
  for(var i = 0; i < searchHistory.length; i++){

    var cityName = $(".list-group").addClass("list-group-item");
    cityName.attr("data-index", searchHistory[i]);
    cityName.append("<li>" + searchHistory[i] + "</li>");

    for (var i = 0; i < repos.length; i++) {
      // format repo name
      var cityName = repos[i].owner.login + "/" + repos[i].name;
    
      // create a container for each repo
      var repoEl = document.createElement("div");
      repoEl.classList = "list-item flex-row justify-space-between align-center";
    
      // create a span element to hold repository name
      var titleEl = document.createElement("span");
      titleEl.textContent = cityName;
    
      // append to container
      repoEl.appendChild(titleEl);

    
  }
}


var keyCount = 0;

searchButton.click(function(){



  var searchInput = $(".searchInput").val();

  var cityName = $(".list-group").addClass("list-group-item");
    cityName.attr("data-index", searchInput);
    cityName.append("<li>" + searchInput + "</li>");



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

                fiveDayDiv.append("<div class=fiveDayColor>" + "<p>" + FiveDayTimeUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");


            })

        });
    }
});

$(document).ready(function() {
    loadHistory();
    });