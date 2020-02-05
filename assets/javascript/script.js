



var searchInputEl = $("#searchInputForm")

// searchInput = "houston"


searchInputEl.on("click", function(event){
    event.preventDefault();

    if(event.target.matches("button") === true){
        
        getTodaysWeather();
      
    }
})


function getTodaysWeather(){
    
    var searchInputVal = $("#searchInput").val()
    
// console.log(searchInputVal)

    var todaysWeatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchInputVal + "&APPID=84df449c8c088263e2e354a1926ed25a&units=imperial"
    

$.ajax({
        url: todaysWeatherURL,
        method: 'GET'
    }).then(function(response){
        
        console.log(response)
    
        var iconcode = response.weather[0].icon
        console.log(iconcode)
        
        var currentWeatherIcon = "http://openweathermap.org/img/w/" + iconcode + ".png";
        
        var currentWeatherIconEl = $("<img>");
            currentWeatherIconEl.attr('src', currentWeatherIcon)
            // currentWeatherIconEl.attr('id', "iconPic")


       

        $("#currentCity").text(response.name);
        $("#currentTempature").text("Temperature: " + response.main.temp + "°F");
        $("#currentHumidity").text("Humidity: " + response.main.humidity + "%");
        $("#currentWindSpeed").text("Wind Speed: " + response.wind.speed + "MPH");


        var newCityButton = $("<button>")
            newCityButton.val(response.name)
            newCityButton.text(response.name)

        var listEl = $("<li>")
            listEl.append(newCityButton)

        $("#savedCitiesList").append(listEl)



        var fiveDayForecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + response.name + "&appid=84df449c8c088263e2e354a1926ed25a";

        $.ajax({
            url: fiveDayForecastURL,
            method: 'GET'
        }).then(function(fiveDayForecastURL){
            console.log(fiveDayForecastURL);
        })







            var uvIndexLat = response.coord.lat
            var uvIndexLon = response.coord.lon
            var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?appid=84df449c8c088263e2e354a1926ed25a&lat=" + uvIndexLat + "&lon=" + uvIndexLon + "&cnt=5";
            
            
            $.ajax({
                url: uvIndexURL,
                method: 'GET'
            }).then(function(uvResponse){
                $("#currentUVIndex").text("UV Index: " + uvResponse.value);
            })


            for(var i = 0; i < response.length; i++){

            }
            
            







        

})

}
    
    
 


   



 



