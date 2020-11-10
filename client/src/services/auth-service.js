import axios from 'axios'

import isStorageAvailable from '../utils'
import {AUTH_API_URL} from './endpoint'

/**
 *  !!!!! UPDATE THIS SERVICE TO USE COOKIES RATHER THAN LOCAL STORAGE !!!!
 */

class AuthService {
  async login(username, password) {
    try {
      const response = await axios
        .post(AUTH_API_URL + "signin", { username, password })
      if (response.data.accessToken) {
        if(isStorageAvailable()){
          localStorage.setItem("user", JSON.stringify(response.data))
        }
        return {error: 'LocalStorage not available'}
      }
      return response.data
    }
    catch(e) {
      console.error("UNABLE TO LOGIN")
      console.log(e);
    }
  }

  logout() {
    localStorage.removeItem("user")
  } 

  register(username, email, password) {
    return axios.post(AUTH_API_URL + 'signup', {
      username,
      email,
      password
    })
  }
  
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService()