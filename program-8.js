// Write a JavaScript function that fetches data from an API and cancels the request if it takes longer than a specified time.

const fetchWithTimeout = function (url, timeoutSec) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Request timed out"));
    }, timeoutSec * 1000);

    fetch(url)
      .then((response) => {
        clearTimeout(timeout);
        if (!response.ok)
          throw new Error(`Error occurred with Status: ${response.status}`);
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const fetchCountry = function (country) {
  const url = `https://restcountries.com/v3.1/name/${country}`;
  fetchWithTimeout(url, 0.000001)
    .then((data) => {
      console.log(data[0]);
      console.log(
        `Country: ${data[0].name.common}, Population: ${(
          data[0].population / 1000000
        ).toFixed(2)}`
      );
    })
    .catch((err) => console.error(`${err.message}`));
};

fetchCountry("india");
