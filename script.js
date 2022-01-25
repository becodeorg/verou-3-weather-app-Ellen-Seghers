//In the home page the user can enter the city of his/her choice (think of the right HTML elements here)
    //Import key from config.js file
    import APIKey from "./config.js";

    //Get your input field out of your html
    const inputField = document.querySelector("input");

    //Add an event listener on the input
    inputField.addEventListener("keyup", getLocationInformation);

    /**
     * grab the weather information, based on the location provided by the input field and display it in the html
     * @param event the key up event that was triggered
     */
    function getLocationInformation(event){
        if(event.key == "Enter"){
            console.log(inputField)
            fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + inputField.value + '&appid=' + APIKey.key + '&units=metric')
                .then(response => response.json())
                .then(data => createWeatherGraph(data.list));
        }
    }



//On clicking the SUBMIT button or pressing ENTER the application will display the weather for the next 5 days
    //loop over array and display weather for each timestamp
    function createWeatherGraph(weatherData){
        //create for loop that loops over data
        for(let i = 0; i < weatherData.length; i++){
            console.log(weatherData[i]);
            //extract date, minimum temperature, maximum temperature and temperature
            console.log("Temp: "+weatherData[i].main.temp);
            console.log("Temp-min: " +weatherData[i].main.temp_min);
            console.log("Date:" +weatherData[i].dt_txt);
            console.log("Temp-max" +weatherData[i].main.temp_max);
            console.log("Wind-speed" +weatherData[i].wind.speed);
            //Add a paragraph element to your html
            const paragraph = document.createElement("p");
            document.body.append(paragraph);
            //add text to your paragraph element
            let paragraphText = "";
            paragraphText+= "Date: " +weatherData[i].dt_txt + "<span class=\"tab\"></span>";
            paragraphText+= "Temperature: " + weatherData[i].main.temp + "°C" + "<span class=\"tab\"></span>";
            paragraphText+= "Minimum Temperature: " + weatherData[i].main.temp_min + "°C" + "<span class=\"tab\"></span>";
            paragraphText+= "Maximum Temperature: " + weatherData[i].main.temp_max + "°C" + "<span class=\"tab\"></span>";
            paragraphText+= "Wind Speed: " + weatherData[i].wind.speed + "m/s";
            paragraph.innerHTML = paragraphText;
        }
    }



