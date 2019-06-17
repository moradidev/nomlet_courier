export default async ({  app, store, Vue,}) => {
  var helper = {}
  helper.create = (data) => {
    return store.dispatch('trucks/createTruck', {data: data})
  }
  helper.edit = (data, id) => {
    return store.dispatch('trucks/editTruck', {data: data, id: id})
  }
  helper.statuses = () => {
    return store.dispatch('trucks/getStatus')
  }
  helper.getTrucks = (pagination, filter) => {
    return store.dispatch('trucks/getTrucks', {pagination: pagination, filter: filter})
  }
  helper.truck = (id) => {
    return store.dispatch('trucks/getTruck', {id: id})
  }
  helper.zones = () => {
    return store.dispatch('trucks/getZone')
  }
  Vue.prototype.$trucks = helper
}
