import { useState,useEffect } from 'react'
import weatherService from '../services/weather'
import Weather from './Weather'

const Country = ({countryDetails}) => {
    const [weatherProperties, setWeatherProperties] = useState({})
    let languages = Object.entries(countryDetails.languages)   

    useEffect(() => {
        weatherService.getCurrent(countryDetails)
            .then(weather => {
                let weatherProperties = {
                    temp: weather.main.temp,
                    wind: weather.wind.speed,
                    icon: weather.weather[0].icon
                }
                setWeatherProperties(weatherProperties)
            })
    },[countryDetails])

    return (
        <div>
            <h1>{countryDetails.name.common}</h1>
            <p>
                capital {countryDetails.capital}<br/>
                area {countryDetails.area}
            </p>
            <h3>languages:</h3>
            <ul>{languages.map((language) => <li key={language[0]}>{language[1]}</li>)}</ul>
            <div><font size='50'>{countryDetails.flag}</font></div>
            <h2>Weather in {countryDetails.capital}</h2>
            <Weather weatherInfo={weatherProperties}/>
        </div>
    )
}

export default Country