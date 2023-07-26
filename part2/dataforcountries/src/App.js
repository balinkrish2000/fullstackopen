import { useState } from "react";
import countriesService from './services/countries'
import Countries from "./components/Countries";
import Country from './components/Country'

function App() {
  const [countryName, setCountryName] = useState('')
  const [countries, setCountries] = useState([])
  const [countryDetails, setCountryDetails] = useState(null)

  const handleCountryNameInput = (event) => {
    setCountryName(event.target.value)
    countriesService.getAll()
      .then(countryList => {
          let filteredCountryList = countryList.filter(country => 
          country.name.common.toLowerCase().search(countryName.toLowerCase()) !== -1 ? country.name.common : null)
          setCountries(filteredCountryList)
      })
  }

  let displaySection = ''

  if (countries.length <=10) {
    if (countries.length === 1) {
      if (countryDetails === null) {
        countriesService.getOne(countries[0].name.common)
          .then(country => setCountryDetails(country))
      } else
      {
        displaySection = <Country countryDetails={countryDetails}/>
      }  
    } else
    {
      displaySection = <Countries countryList={countries}/>
    }
  } else
  {
    displaySection = <div>'Too may matches, specify another filter'</div>
  }

  return (
    <div>
      find countries
      <input value={countryName}
          onChange={handleCountryNameInput}       
      />
      {displaySection}
    </div>
  );
}

export default App;
