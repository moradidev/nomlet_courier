export default async ({  app, store, Vue,}) => {
  var helper = {}
  helper.create = (data) => {
    return store.dispatch('zones/createZone', {data: data})
  }
  helper.edit = (data, id) => {
    return store.dispatch('zones/editZone', {data: data, id: id})
  }
  helper.statuses = () => {
    return store.dispatch('zones/getStatus')
  }
  helper.getZones = (pagination, filter) => {
    return store.dispatch('zones/getZones', {pagination: pagination, filter: filter})
  }
  helper.zone = (id) => {
    return store.dispatch('zones/getZone', {id: id})
  }
  Vue.prototype.$zones = helper
}
