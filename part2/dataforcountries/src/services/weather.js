import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const iconUrl = 'https://openweathermap.org/img/wn'

const getCurrent = (country) => {
    const a = axios.get(
        `${baseUrl}lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
    const b = a.then(weather =>  getIcon(weather.data.weather[0].icon))
}

const getIcon = (id) => {
    const request = axios.get(`${iconUrl}/${id}@2x.png`)
    return request.then(response => response.data)
}

const weatherService = { getCurrent, getIcon }

export default weatherService