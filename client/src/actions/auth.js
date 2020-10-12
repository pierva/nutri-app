import { showLoading, hideLoading } from 'react-redux-loading'

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types"

import AuthService from "../services/auth.service"

export function register (username, email, password) {
  return async (dispatch, getState) => {
    dispatch(showLoading())
    try {
      const response = await AuthService.register(username, email, password)
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message
      })
    } catch (e) {
      dispatch(hideLoading())
      const message = (e.response && e.response.data 
        && e.response.data.message) || e.message || e.toString()
      dispatch( 
        {
          type: REGISTER_FAIL
        }
      )
      return dispatch({
        type: SET_MESSAGE,
        payload: message
      })
    }
    return dispatch(hideLoading())
  }
}

export function login (username, password) {
  return async (dispatch, getState) => {
    dispatch(showLoading())
    try {
      const user = await AuthService.login(username, password)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user }
      })
    } catch (e) {
      dispatch(hideLoading())
      const message = (e.response && e.response.data 
        && e.response.data.message) || e.message || e.toString()
      dispatch({
        type: LOGIN_FAIL
      })

      return dispatch({
        type: SET_MESSAGE,
        payload: message
      })
    }
  }
}

export function logout() {
  AuthService.logout()

  dispatch({
    type: LOGOUT
  })
}