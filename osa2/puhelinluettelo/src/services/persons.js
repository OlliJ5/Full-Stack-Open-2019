import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(res => res.data)
}

const create = (personObject) => {
  const request = axios.post(baseUrl, personObject)
  return request.then(res => res.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(res => res.data)
}

const update = (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson)
  return request.then(res => res.data)
}

export default { getAll, create, remove, update }