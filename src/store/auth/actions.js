import {axiosInstance} from 'boot/axios'
import {LocalStorage, SessionStorage} from 'quasar'


export function login(state, {data}) {
  return axiosInstance.post('/login', data.body).then(function (response) {
    let token = response.data.data.token.access_token
    state.commit('setUser', {user: response.data.data.user, token:token, rules: [response.data.data.rules]})
    axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token
    if (data.rememberMe) {
      LocalStorage.set('token', token)
    } else {
      SessionStorage.set('token', token)
    }
  })
}
export function getUser(state) {
  let token =  LocalStorage.getItem('token')
  axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token
  axiosInstance.get('/get/user').then(function (response) {
    state.commit('setUser', {user: response.data.data.user, token: token, rules: [response.data.data.rules]})
  })
}
export function logoutUser(state) {
  if (LocalStorage.has('token')) {
    LocalStorage.remove('token')
  } else if (SessionStorage.has('token')) {
    SessionStorage.remove('token')
  }
  state.commit('setUser', {user: {}, token: '', rules:[]})
}
