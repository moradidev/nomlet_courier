export function messagesList(state, data) {
  state.messages = data.data
  state.paginate = {
    page: data.current_page,
    rowsNumber: data.total,
    rowsPerPage: data.per_page,
    descending: data.sorting.descending,
    sortBy: data.sorting.sort
  }
}
export function messageErrors(state, data) {
  state.errors.errors = data.errors
  state.errors.hasError = data.hasError
}
export function setMessage(state, data) {
  state.message = data.message
}
export function messageDelete(state,id){
  let index = state.messages.findIndex(message =>message.id == id)
  state.messages.splice(index,1)
}