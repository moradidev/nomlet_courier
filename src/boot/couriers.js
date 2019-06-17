export default async ({  app, store, Vue,}) => {
  var helper = {}
  helper.create = (data) => {
    return store.dispatch('couriers/createCourier', {data: data})
  }
  helper.edit = (data, id) => {
    return store.dispatch('couriers/editCourier', {data: data, id: id})
  }
  helper.statuses = () => {
    return store.dispatch('couriers/getStatus')
  }
  helper.getCouriers = (pagination, filter) => {
    return store.dispatch('couriers/getCouriers', {pagination: pagination, filter: filter})
  }
  helper.courier = (id) => {
    return store.dispatch('couriers/getCourier', {id: id})
  }
  Vue.prototype.$couriers = helper
}
