var searchButton = $(".btn");

var apiUrl = "918084d8060d50df0258a5c8181d86ec";

var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  console.log(searchHistory);




function loadHistory(){
  for(var i = 0; i < searchHistory.length; i++){

    var cityName = $(".list-group").addClass("list-group-item");
    cityName.attr("data-index", searchHistory[i]);
    cityName.append("<li>" + searchHistory + "</li>");
    
  }
}

var keyCount = 0;

searchButton.click(function(){

  var searchInput = $(".searchInput").val();

  var cityName = $(".list-group").addClass("list-group-item");
    cityName.attr("data-index", searchInput)


    // Variable for current weather working 
    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiUrl + "&units=imperial";
    // Variable for 5 day forecast working
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiUrl + "&units=imperial";

})
