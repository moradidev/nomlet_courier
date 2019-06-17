function isArrayOrString(variable) {
  if (typeof variable === typeof [] || typeof variable === typeof '') {
    return true
  }
  return false
}

export default ({router, store, Vue}) => {
  var helper = {}
  helper.register = (data) => {
    return store.dispatch('auth/register', {data: data})
  }
  helper.loggedIn = () => {
    return store.getters['auth/isLoggedIn']
  }
  helper.check = (roles) => {
    return store.getters['auth/check'](roles)
  }
  helper.login = (data) => {
    return store.dispatch('auth/login', {data: data})
  }
  helper.logout = () => {
    return store.dispatch('auth/logoutUser')
  }
  helper.fetch = () => {
    return store.dispatch('auth/fetch')
  }
  helper.user = () => {
    return store.getters['auth/user']
  }
  Vue.prototype.$auth = helper
}
