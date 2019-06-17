export default async ({  app, store, Vue,}) => {
  var helper = {}
  helper.create = (data) => {
    return store.dispatch('messages/createMessage', {data: data})
  }
  helper.getMessages = (pagination, filter) => {
    return store.dispatch('messages/getMessages', {pagination: pagination, filter: filter})
  }
  helper.edit = (data, id) => {
    return store.dispatch('messages/editMessage', {data: data, id: id})
  }
  helper.delete = (id) => {
    return store.dispatch('messages/deleteMessage', {id: id})
  }
  Vue.prototype.$messages = helper
}
