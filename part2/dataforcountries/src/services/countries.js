import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    let request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getOne = (name) => {
    let request = axios.get(`${baseUrl}/name/${name}`)
    return request.then(response => response.data)
} 

const countriesService = {getAll , getOne }

export default countriesService