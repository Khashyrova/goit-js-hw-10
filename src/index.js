import './css/styles.css';
import debounce from "lodash.debounce";
import Notiflix from 'notiflix';
import  fetchCountries  from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    container: document.querySelector('.country-list'),
    inputEl: document.querySelector('#search-box'),
    countryContainer: document.querySelector('.country-info')
}

refs.inputEl.addEventListener('input', debounce(fetchCountriesList, DEBOUNCE_DELAY))

function fetchCountriesList(event) {
    const inputValue = event.target.value.trim()
    
    if (!inputValue )  {
        resetMarkup(refs.container)
        resetMarkup(refs.countryContainer)
        return;
    }
    fetchCountries(inputValue)
        .then(countries => {
            if (countries.length > 10) {
                resetMarkup(refs.countryContainer)
                resetMarkup(refs.container)
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name!")
            }
            else if (countries.length >= 2 && countries.length <= 10) {
                const markupList = `${countries.map(fetchListCountries).join("")}`
                resetMarkup(refs.container)
                resetMarkup(refs.countryContainer)
                refs.container.insertAdjacentHTML('beforeend', markupList);
                resetMarkup(refs.countryContainer)
                Notiflix.Notify.success("There is more then one country with you request!")
            }
            else {
                const markupCard = `${countries.map(fetchCardCountry).join("")}`
                
                resetMarkup(refs.container)
                resetMarkup(refs.countryContainer)
                refs.countryContainer.insertAdjacentHTML('beforeend', markupCard);
                Notiflix.Notify.success("There is one country with that name!")
            }
        }).catch(error => {
            console.log(error)
        })
        
}
function fetchListCountries({ name, flags, alt }) {
      return `<li class="country-list__item">
        <img class="country-list__img" src="${flags.svg}" alt="${alt}" />
        <p class="country-list__text">${name.official}</p>
      </li>`;
    }
        
function fetchCardCountry({ name, flags, alt, capital, population, languages }) {
        return  `<img class="country-list__img-card" src="${flags.svg}" alt="${alt}" />
                <h1 class="country-list__title">${name.official}</h1>
                <p class="country-list__text">Capital: <span class="text">${capital}</span></p>
                <p class="country-list__text">Population: <span class="text">${population}</span></p>
                <p class="country-list__text">Languages: <span class="text">${Object.values(languages)}</span></p> 
        `
        }
      
function resetMarkup(element) {
  element.innerHTML = '';
}