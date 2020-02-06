
// Input Form
var searchInputEl = $("#searchInputForm")
// The Click Function
searchInputEl.on("click", function(event){
    event.preventDefault();

    if(event.target.matches("button") === true){
        
        var searchInputVal = $("#searchInput").val().trim();

        getTodaysWeather(searchInputVal);   
    }
})


var savedCitiesList = $("#savedCitiesList")

savedCitiesList.on("click",function(buttonEvent){
    buttonEvent.preventDefault();

    if(event.target.matches("button") === true){
        var searchInputVal = buttonEvent.target.getAttribute("id")
        var newCities = ["" + searchInputVal]
            console.log(newCities)
        // newCities.push(searchInputVal)
        
        
        if(searchInputVal){

        } else {

        }

        getTodaysWeather(searchInputVal);   
    }
   
})





function getTodaysWeather(searchInputVal){
    
    searchInputVal = searchInputVal;
    
// console.log(searchInputVal)

    var todaysWeatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchInputVal + "&APPID=84df449c8c088263e2e354a1926ed25a&units=imperial"
    

$.ajax({
    url: todaysWeatherURL,
    method: 'GET'
}).then(function(response){
// console.log(response)
    var iconcode = response.weather[0].icon
        var currentWeatherIcon = "http://openweathermap.org/img/w/" + iconcode + ".png";
// console.log(iconcode)
        
    var currentWeatherIconEl = $("<img>");
        currentWeatherIconEl.attr('src', currentWeatherIcon)

    $("#currentCity").text(response.name);        
    $("#currentCity").append(currentWeatherIconEl);
    $("#currentTempature").text("Temperature: " + response.main.temp + "°F");
    $("#currentHumidity").text("Humidity: " + response.main.humidity + "%");
    $("#currentWindSpeed").text("Wind Speed: " + response.wind.speed + "MPH");

       




        var newCityButton = $("<button>")
            newCityButton.attr("class", "btn btn-primary")
            newCityButton.attr("id", response.name)
            newCityButton.val(response.name)
            newCityButton.text(response.name)

        var listEl = $("<li>")
            listEl.append(newCityButton)

        $("#savedCitiesList").append(listEl)



        var fiveDayForecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + response.name + "&appid=84df449c8c088263e2e354a1926ed25a&units=imperial";

        $.ajax({
            url: fiveDayForecastURL,
            method: 'GET'
        }).then(function(fiveDayForecastResponse){
            console.log(fiveDayForecastResponse)

            var nextWeekHolder = $("#nextWeekHolder");
            console.log(nextWeekHolder)

            nextWeekHolder.empty()

            for(var i = 0; i < fiveDayForecastResponse.cnt; i++){
                
                var fiveDayDateYear = fiveDayForecastResponse.list[i].dt_txt.slice(0 , 4)
                var fiveDayDateMonth = fiveDayForecastResponse.list[i].dt_txt.slice(5 , 7)
                var fiveDayDateDay = fiveDayForecastResponse.list[i].dt_txt.slice(8 , 10)
                
                var nextWeekCard = $("<div>");
                    nextWeekCard.attr("class", "card dayCards");

                var nextWeekCardBody = $("<div>");
                    nextWeekCardBody.attr("class", "card-body");

                var nextWeekCardBodyTitle = $("<h6>");
                    nextWeekCardBodyTitle.attr("class", "card-title");
                    nextWeekCardBodyTitle.text(fiveDayDateDay +"/"+ fiveDayDateMonth +"/"+ fiveDayDateYear);

                var nextWeekCardBodyImg = $("<img>");
                    nextWeekCardBodyImg.attr("src", "http://openweathermap.org/img/w/" + fiveDayForecastResponse.list[i].weather[0].icon + ".png")


                var nextWeekCardBodyTextTemp = $("<p>");
                    nextWeekCardBodyTextTemp.attr("class", "card-text");
                    nextWeekCardBodyTextTemp.text("Temp: " + fiveDayForecastResponse.list[i].main.temp + "°F");

                var nextWeekCardBodyText = $("<p>");
                    nextWeekCardBodyText.attr("class", "card-text");
                    nextWeekCardBodyText.text("Humidity: " + fiveDayForecastResponse.list[i].main.humidity + "%");

                    nextWeekCardBody.append(nextWeekCardBodyTitle);
                    nextWeekCardBody.append(nextWeekCardBodyImg);
                    nextWeekCardBody.append(nextWeekCardBodyTextTemp);
                    nextWeekCardBody.append(nextWeekCardBodyText);
                    nextWeekCard.append(nextWeekCardBody);
                    nextWeekHolder.append(nextWeekCard);

                i += 7;

                // $("nextWeekTitle"+i).text(fiveDayForecastResponse.list[i+8].dt_txt);
                // console.log(i)
                
                // console.log(fiveDayForecastResponse.list[i+5].dt_txt);

            }
            


        })







            var uvIndexLat = response.coord.lat
            var uvIndexLon = response.coord.lon
            var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?appid=84df449c8c088263e2e354a1926ed25a&lat=" + uvIndexLat + "&lon=" + uvIndexLon;
            
            
            $.ajax({
                url: uvIndexURL,
                method: 'GET'
            }).then(function(uvResponse){
                $("#currentUVIndex").text("UV Index: " + uvResponse.value);
            })


            
            







        

})

}
    
    
 


   



 



