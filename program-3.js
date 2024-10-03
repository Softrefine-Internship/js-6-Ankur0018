//  Write a JavaScript function that takes an array of URLs and downloads the contents of each URL in parallel using Promises.

async function getData(urls) {
  try {
    const fetchPromises = urls.map((url) =>
      fetch(url).then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }
        return response.json();
      })
    );

    const contents = await Promise.all(fetchPromises);

    return contents;
  } catch (error) {
    console.error("Error downloading URLs:", error);
    throw error;
  }
}

const urls = [
  "https://geocode.maps.co/reverse?lat=21.51636750000001&lon=70.43842729712848&api_key=66fbe3d075823082899869int8a5285",
  "https://restcountries.com/v3.1/name/india",
];

getData(urls)
  .then((contents) => {
    console.log(contents);
  })
  .catch((err) => {
    console.error("Failed to fetch content from one or more URLs:", err);
  });
