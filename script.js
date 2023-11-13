function getWeather() {
    const apiKey = 'a4863a5a050af68008f3168455e30f8f'; // Replace with your API key
    const city = document.getElementById('city').value;
    const weatherInfo = document.getElementById('weather-info');
    const iconContainer = document.getElementById('icon');
    const additionalInfoContainer = document.getElementById('additional-info');

    // Check if the city is provided
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    // Fetch weather data from OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // Display weather icon
            const iconCode = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
            iconContainer.innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;

            // Display additional weather information
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            const result = `
                Temperature: ${temperature} K<br>
                Description: ${description}<br>
                Humidity: ${humidity}%<br>
                Wind Speed: ${windSpeed} m/s
            `;

            additionalInfoContainer.innerHTML = result;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = 'Error fetching weather data. Please try again later.';
        });
}

function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          getWeatherByCoordinates(lat, lon);
      }, error => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please try again or enter a city name manually.');
      });
  } else {
      alert('Geolocation is not supported by your browser.');
  }
}

function getWeatherByCoordinates(lat, lon) {
  const apiKey = 'a4863a5a050af68008f3168455e30f8f'; // Replace with your API key
  const weatherInfo = document.getElementById('weather-info');
  const iconContainer = document.getElementById('icon');
  const additionalInfoContainer = document.getElementById('additional-info');

  // Fetch weather data from OpenWeatherMap API using coordinates
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
          // Display weather icon
          const iconCode = data.weather[0].icon;
          const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
          iconContainer.innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;

          // Display additional weather information
          const temperature = data.main.temp;
          const description = data.weather[0].description;
          const humidity = data.main.humidity;
          const windSpeed = data.wind.speed;

          const result = `
              Temperature: ${temperature} K<br>
              Description: ${description}<br>
              Humidity: ${humidity}%<br>
              Wind Speed: ${windSpeed} m/s
          `;

          additionalInfoContainer.innerHTML = result;
      })
      .catch(error => {
          console.error('Error fetching weather data:', error);
          weatherInfo.innerHTML = 'Error fetching weather data. Please try again later.';
      });
}

// ... (existing getWeather function remains unchanged)

