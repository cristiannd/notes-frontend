import axios from 'axios'

const baseUrl = '/api/notes'

const setToken = newToken => {
  const token = `bearer ${newToken}`
  return token
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (content, token) => {
  const newToken = setToken(token)

  const body = {
    content,
  }

  const config = {
    headers: { Authorization: newToken },
  }

  const request = axios.post(baseUrl, body, config)
  return request.then(response => response.data)
}

const update = (id, token) => {
  const newToken = setToken(token)

  const config = {
    headers: {
      Authorization: newToken,
    },
  }

  const request = axios.put(`${baseUrl}/${id}`, {}, config)
  return request.then(response => response.data)
}

export default {
  getAll,
  create,
  update,
}
