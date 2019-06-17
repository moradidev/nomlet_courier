export function setUser(state, data) {
  state.user = data.user
  state.token = data.token
  state.status = 'success'
  state.rules = data.rules
}
