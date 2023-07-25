import axios from 'axios'
const baseUrl = 'https://balinkrish2000-friendly-goldfish-g7jwqp45756cv6xp-3002.preview.app.github.dev/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl,newObject)
    return request.then(response => response.data)
}

const personService = { getAll , create }

export default personService