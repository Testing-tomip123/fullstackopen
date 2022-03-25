import axios from 'axios'
const Url = '/api/persons'

const fetchAll = async () => {
  const request = axios.get(Url)
  const response = await request
  return response.data
}

const create = async (newPerson) => {
  const request = axios.post(Url, newPerson)
  const response = await request
  return response.data
}

const remove = async (id) => {
  const request = axios.delete(Url + `/` + id.toString())
  const response = await request
  return response
}

const update = async (newPerson, id) => {
  const request = axios.put(Url + `/` + id.toString(), newPerson)
  const response = await request
  return response.data
}

export default { fetchAll: fetchAll, create: create, remove: remove, update: update }