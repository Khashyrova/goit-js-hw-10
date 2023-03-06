const URL = 'https://restcountries.com/v3.1/name';

function fetchCountries(name) {
  return fetch(
    `${URL}/${name}?fields=name,capital,population,flags,alt,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(`Bad request ${response.status}`);
    }
    return response.json();
  });
}

export default fetchCountries;
