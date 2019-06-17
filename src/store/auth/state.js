import {LocalStorage} from 'quasar'
export default {
  user:{},
  token: LocalStorage.getItem('token') || '',
  status: '',
  rules: []
}
