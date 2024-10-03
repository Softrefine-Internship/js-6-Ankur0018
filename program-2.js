// Write a JavaScript a function that makes an HTTP GET request and returns a Promise that resolves with the response data.

const getCountryData = function (country) {
  return new Promise((resolve, reject) => {
    const url = `https://restcountries.com/v3.1/name/${country}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No country found");
        }
        return res.json();
      })
      .then((data) => {
        resolve(data[0]);
      })
      .catch((error) => reject(error));
  });
};

getCountryData("india")
  .then((data) => {
    console.log(
      `Country: ${data.name.common}, Capital: ${data.capital}, Continent: ${data.continents}`
    );
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
