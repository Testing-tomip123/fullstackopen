import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const newAnecdote = { content, votes: 0 }
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const edit = async ({ id, payload }) => {
  const response = await axios.put(`${baseUrl}/${id}`, payload)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, edit }
