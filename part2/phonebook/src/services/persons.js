import axios from 'axios'

let baseUrl = '';

if (process.env.NODE_ENV === 'development') {
    baseUrl = 'https://zany-palm-tree-g7jwqp4574pcwrjq-3001.app.github.dev/api/persons'
} else {
    baseUrl = '/api/persons'
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl,newObject)
    return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(() => id)
}

const update = (id, updateObject) => {
    const request = axios.put(`${baseUrl}/${id}`, updateObject)
    return request.then(response => response.data)
}

const personService = { getAll , create , remove , update}

export default personService