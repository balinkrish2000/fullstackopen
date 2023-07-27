const Country = ({countryDetails}) => {
    let languages = Object.entries(countryDetails.languages)
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
            <p>temperature Celcius</p>
            <p>wind m/s</p>
        </div>
    )
}

export default Country