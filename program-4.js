// Write a JavaScript program that implements a function that performs a series of asynchronous operations in sequence using 'async/await'.

// note: here async operations refers to async functions. your task is to write multiple async functions using promises and call them in sequence in a function using async/await

const getCountryCapital = async function (country) {
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
  } catch (error) {
    console.error(`Error fetching capital: ${error.message}`);
  }
};

const getCountryPopulation = async function (country) {
  try {
    const url = `https://restcountries.com/v3.1/name/${country}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch population for ${country}`);
    }

    const [countryData] = await res.json();
    console.log(
      `${countryData.name.common}'s Population is ${(
        countryData.population / 1000000
      ).toFixed(2)} million`
    );
  } catch (error) {
    console.error(`Error fetching population: ${error.message}`);
  }
};

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

const getCountryInfo = async function (country) {
  try {
    console.log(`Getting Country Info for ${country}....`);
    await delay(1000);
    await getCountryCapital(country);
    await delay(1000);
    await getCountryPopulation(country);
  } catch (error) {
    console.error(`Error in getCountryInfo: ${error.message}`);
  }
};

getCountryInfo("india");
