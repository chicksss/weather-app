const apiKey = '4902a21478a9a0446af7dfbba9a1dfff'; // Removed the trailing space
const cityId = '1725864'; // Use the city ID instead of city name
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}`;
// const lat = '15.8008'; // Latitude for Tokyo
// const lon = '120.4127'; // Longitude for Tokyo
//const dailyWeaher = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;

//const dailyWeaher = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=15.8008&lon=120.4127&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;
// Function to get weather data
async function getWeather() {
  try {
    const response = await fetch(apiUrl);
    //const resDaily = await fetch(dailyWeaher);
     
     if (!response.ok) {
      throw new Error('Current weather response was not ok');
    }
    // if (!resDaily.ok) {
    //   throw new Error('Daily forecast response was not ok');
    // }

    const weatherData = await response.json();
   // const data = await resDaily.json();

    //const dailyForecast = data.daily;

    // const forecastList = document.getElementById('forecastList');
    // forecastList.innerHTML = ''; // Clear existing data
  
    // dailyForecast.slice(0, 3).forEach((day, index) => {
    //       const date = new Date(day.dt * 1000); // Convert Unix timestamp to Date
    //       const temp = day.temp.day; // Day temperature
    //       const weatherDescription = day.weather[0].description;

    //       const listItem = document.createElement('li');
    //       listItem.innerHTML = `Day ${index + 1} - ${date.toDateString()}: ${temp}°C, ${weatherDescription}`;
    //       forecastList.appendChild(listItem);
    //     });


    const tempCelsius = kelvinToCelsius(weatherData.main.temp);
    const tempFahrenheit = kelvinToFahrenheit(weatherData.main.temp);

    //console.log(`Forecast: ${weatherDaily}`);

    console.log(`Weather in ${weatherData.name}:`);
    console.log(`Temperature: ${tempCelsius.toFixed(2)}°C / ${tempFahrenheit.toFixed(2)}°F`);
    console.log(`Weather: ${weatherData.weather[0].description}`);

    // Display data in the HTML
    document.getElementById('weather').innerHTML = `${weatherData.name}`;

    document.getElementById('cel').innerHTML = `${tempCelsius.toFixed(2)}°C`;
  
   // document.getElementById('temp').innerHTML = `Temperature in  ${tempCelsius.toFixed(2)}°C / ${tempFahrenheit.toFixed(2)}°F`;

    document.getElementById('panahon').innerHTML =`${weatherData.weather[0].description}`;
    if (weatherData.weather[0].description.trim().toLowerCase() === "overcast clouds") {
      let weaimg = 'cloudy.png';
      document.getElementById('imgWeather').src = weaimg;
     // document.getElementById('imgWeather').innerHTML = `<img src="${weaimg}" alt="Cloudy Weather">`;
      document.getElementById('imgWeather').classList.add('h-96', 'w-96');
    } else if (weatherData.weather[0].description.trim().toLowerCase() === "sunny"){
      let weaimgSunny = 'sunny.png';
      document.getElementById('imgWeather').src = weaimgSunny;
      document.getElementById('imgWeather').classList.add('h-96', 'w-96');
    }
    


    const d = new Date();
    let hour =  d.getHours();
   // document.getElementById('time').innerHTML = hour;

    if(hour >= 6 && hour <=11){
      document.getElementById('timeGet').textContent = "Morning";
      
    }
    else if((hour >= 12 && hour <= 17)){
      document.getElementById('timeGet').textContent = "Goodafternoon";
      document.getElementById('bgColor').classList = "bg-[url('hapon.jpg')]";

      document.getElementById('namePlace').innerHTML = `${weatherData.name}`;

      // if($weatherData.weather[0].description){
      //   document.getElementById('weder').classList = "bg";
      // }
    }else{
      //document.getElementById('timeGet').textContent = "Good Evening";
     
      document.getElementById('bgColor').classList = "bg-[url('gabi.jpg')] bg-center bg-fixed bg-no-repeat";
      
      document.getElementById('textColor').classList = "text-[#e0e1dd]";
    }
    

  
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

// Helper functions to convert Kelvin to Celsius and Fahrenheit
function kelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}

function kelvinToFahrenheit(kelvin) {
  return (kelvin - 273.15) * 9/5 + 32;
}

// Call the function
getWeather();
