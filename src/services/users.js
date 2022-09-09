import axios from 'axios'

const baseUrl = '/api'

const getUser = async id => {
  const user = await axios.get(`${baseUrl}/users/${id}`)
  return user.data
}

const login = async credentials => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  return response.data
}

const register = async user => {
  const response = await axios.post(`${baseUrl}/users`, user)
  return response.data
}

export default { getUser, login, register }