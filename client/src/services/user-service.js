import axios from 'axios'
import authHeader from './auth-header'
import { CONT_API_URL } from './endpoint'


class UserService {
  getPublicContent() {
    return axios.get(CONT_API_URL + 'all')
  }

  getUserBoard() {
    return axios.get(CONT_API_URL + 'user', { headers: authHeader() })
  }

  getAdminBoard() {
    return axios.get(CONT_API_URL + 'admin', { headers: authHeader() })
  }
}

export default new UserService()