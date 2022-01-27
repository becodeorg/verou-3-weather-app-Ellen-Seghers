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
    //On clicking the SUBMIT button or pressing ENTER the application will display the weather for the next 5 days
    function getLocationInformation(event){
        if(event.key == "Enter"){
            console.log(inputField)
            fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + inputField.value + '&appid=' + APIKey.key + '&units=metric')
                .then(response => response.json())
                .then(data => createWeatherGraph(data.list));
        }
    }

/**
 * Grab the necessary data from the weather data object and put in arrays.
 * @param weatherData (object) Weather data from location.
 */
//loop over array and display weather for each timestamp
function createWeatherGraph(weatherData){
    //Clear the arrays
    date = [];
    temperature = [];
    minTemperature = [];
    maxTemperature = [];
    //create for loop that loops over data
    for(let i = 0; i < weatherData.length; i++){
        console.log(weatherData[i]);
        //push the data for every object in the arrays
        date.push(weatherData[i].dt_txt.split(":")[0]+"h");
        temperature.push(weatherData[i].main.temp);
        minTemperature.push(weatherData[i].main.temp_min);
        maxTemperature.push(weatherData[i].main.temp_max);
    }
    showsGraphic();
}

//Make 4 arrays (1 for date, 1 for temperature, 1 for min temperature, 1 for max temperature)
let date = [ ];
let temperature = [ ];
let minTemperature = [ ];
let maxTemperature = [ ];

//Make a variable with a graph in it
const config = {
    type: 'line',
    data: {
        labels: date,
        datasets: [{
            label: "Temperature",
            backgroundColor: 'rgb(255, 255, 26)',
            borderColor: 'rgb(255, 255, 26)',
            data: temperature,
        },{
            label: "Min. Temperature",
            backgroundColor: 'rgb(77, 195, 255)',
            borderColor: 'rgb(77, 195, 255)',
            data: minTemperature,
        },{
            label: "Max. Temperature",
            backgroundColor: 'rgb(255, 64, 0)',
            borderColor: 'rgb(255, 64, 0)',
            data: maxTemperature,
        }]
    },
    options: {}
};

let myChart = new Chart(
    document.getElementById("graphic"),
    config
);

//Update the data
function showsGraphic (){
    myChart.config.data.labels = date;
    myChart.config.data.datasets[0].data = temperature;
    myChart.config.data.datasets[1].data = minTemperature;
    myChart.config.data.datasets[2].data = maxTemperature;
    //Update the graphic
    myChart.update();
}



