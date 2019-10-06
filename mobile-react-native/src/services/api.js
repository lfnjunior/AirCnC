import axios from 'axios'

import connectionUrl from '../services/connectionUrl'

const api = axios.create({
  baseURL: `${connectionUrl}`,
})

export default api
