import { useEffect, useState } from "react";
import countriesService from './services/countries'
import Countries from "./components/Countries";
import Country from './components/Country'

function App() {
  const [countryName, setCountryName] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [countryDetails, setCountryDetails] = useState(null)

  const handleCountryNameInput = (event) => {
    let name=event.target.value
    setCountryName(name)

    if (name === '') {
      setFilteredCountries([])
    } else {
      setFilteredCountries(countries.filter(country => 
        country.name.common.toLowerCase().search(name.toLowerCase()) !== -1 ? country.name.common : null))
    }
    setCountryDetails(null)
  }

  const handleShowClick = (event) => {
    let name = event.target.value
    countriesService.getOne(name)
        .then(country => setCountryDetails(country))
    setFilteredCountries(filteredCountries.filter(country => 
      country.name.common.search(name) !== -1 ? country.name.common : null))
    setCountryDetails(null)
  }

  const weatherDetails = (weatherProps) => {
    console.log(weatherProps)
  }

  useEffect(() => {
    countriesService.getAll()
      .then(countryList => {
        let formattedCountryList = countryList.map(country => (({name, cca2}) => ({name, cca2}))(country))
        setCountries(formattedCountryList)
      })
  },[])

  let displaySection = ''

  if (filteredCountries.length <=10) {
    if (filteredCountries.length === 1) {
      if (countryDetails === null) {
        countriesService.getOne(filteredCountries[0].name.common)
          .then(country => setCountryDetails(country))
      } else
      {
        displaySection = <Country countryDetails={countryDetails} weatherProps={(props) => weatherDetails(props)}/>
      }  
    } else
    {
      displaySection = <Countries countryList={filteredCountries} onClickingShow={handleShowClick}/>
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
