// Write a JavaScript function that fetches data from multiple APIs concurrently and returns a combined result using Promises and 'Promise.all()'.

const renderCountry = function (country) {
  console.log(
    `More info about ${country.name.common} :-  Capital : ${
      country.capital
    } , Continent : ${country.continents} , Population : ${(
      country.population / 1000000
    ).toFixed(2)} million `
  );
};

const whereAmI = function (lat, long) {
  const geocodeAPI = `https://geocode.maps.co/reverse?lat=${lat}&lon=${long}&api_key=66fbe3d075823082899869int8a5285`;

  fetch(geocodeAPI)
    .then((response) => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      return response.json();
    })
    .then((data) => {
      const country = data.address.country;
      const city = data.address.city;
      console.log(`You are in ${city}, ${country}`);

      // Fetch country data and weather data concurrently
      const countryAPI = fetch(
        `https://restcountries.com/v3.1/name/${country}`
      );
      const weatherAPI = fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`
      );

      return Promise.all([countryAPI, weatherAPI]);
    })
    .then((responses) => {
      if (!responses[0].ok) throw new Error("Problem with country data");
      if (!responses[1].ok) throw new Error("Problem with weather data");

      return Promise.all(responses.map((response) => response.json()));
    })
    .then(([countryData, weatherData]) => {
      renderCountry(countryData[0]);

      const weather = weatherData.current_weather;
      console.log(
        `Current weather of your location : ${weather.temperature}°C`
      );
    })
    .catch((err) => console.error(`${err.message}`));
};

whereAmI(21.51636750000001, 70.43842729712848);
