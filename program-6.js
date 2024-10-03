// Write a JavaScript function that fetches data from an API and retries the request a specified number of times if it fails.

const fetchDataWithRetry = async function (country, retries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const url = `https://restcountries.com/v3.1/name/${country}`;
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Could not fetch capital for ${country}`);
      }

      const [countryData] = await res.json();
      console.log(
        `${countryData.name.common}'s Capital is ${countryData.capital[0]}`
      );
      return;
    } catch (error) {
      console.error(`Attempt ${attempt} failed: ${error.message}`);

      if (attempt === retries) {
        console.error(`Failed after ${retries} attempts: ${error.message}`);
      } else {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
};

fetchDataWithRetry("India", 5, 2000);
