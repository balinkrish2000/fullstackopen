const Weather = ({weatherInfo}) => {
    return (
        <>
            <p>temperature {weatherInfo.temp} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`} alt='loading'/>
            <p>wind {weatherInfo.wind} m/s</p>
        </>
    )
}

export default Weather