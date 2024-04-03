function calculateDaysBetweenDates(begin, getElementById)
function fetchForecastData() {
    fetch('http://localhost:5000/', {
    headers: {
        'Accept': 'application/json'
    }
})
        .then(response => response.json()) // Parse response as JSON
        .then(data => {
            console.log("Received JSON data:", data);

            const currentWeather = data.current_weather;
            const forecastData = data.forecast;

            console.log("Current Weather:", currentWeather); // Log the current weather data
            console.log("Forecast Data:", forecastData); // Log the forecast data

            // Populate current weather information
            let currentWeatherElement = document.getElementById('current-weather');
            currentWeatherElement.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">Current Weather</h5>
                    <p class="card-text"><strong>Description:</strong> ${currentWeather.description}</p>
                    <p class="card-text"><strong>Main:</strong> ${currentWeather.main}</p>
                    <p class="card-text"><strong>Temperature:</strong> ${currentWeather.temperature}°C</p>
                    <img src="https://openweathermap.org/img/wn/${currentWeather.icon}.png" alt="Weather Icon">
                </div>
            `;

            // Populate forecast information
            var forecastContainer = document.getElementById('five-day-forecast');
            forecastContainer.innerHTML = ''; // Clear previous forecast data
            forecastData.forEach(item => {
                var forecastItem = document.createElement('div');
                forecastItem.classList.add('col-md-2', 'mb-3');
                forecastItem.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h6 class="card-title">${item.date}</h6>
                            <p class="card-text"><strong>Description:</strong> ${item.description}</p>
                            <p class="card-text"><strong>Main:</strong> ${item.main}</p>
                            <p class="card-text"><strong>Temperature:</strong> ${item.temperature}°C</p>
                            <img src="https://openweathermap.org/img/wn/${item.icon}.png" alt="Weather Icon">
                        </div>
                    </div>
                `;
                forecastContainer.appendChild(forecastItem);
            });
        })
        .catch(error => console.error('Error fetching forecast data:', error));
}

fetchForecastData();
</script>
</body>
</html>