import axios from 'axios'
const Url = 'http://localhost:3001/persons'

const fetchAll = async () => {
  const request = axios.get(Url)
  const response = await request
  return response.data
}

const create = async (person) => {
  const request = axios.post(Url, person)
  const response = await request
  return response.data
}

export default { fetchAll: fetchAll, create: create }