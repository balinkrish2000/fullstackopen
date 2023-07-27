import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'

const getCurrent = (country) => {
    const request = axios.get(
        `${baseUrl}lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
    return request.then(response => response.data)

}

const weatherService = { getCurrent }

export default weatherService