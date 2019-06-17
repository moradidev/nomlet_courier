export default async ({app, store, Vue,}) => {
  var helper = {}
  helper.create = (data) => {
    return store.dispatch('foods/createFood', {data: data})
  }
  helper.getFoods = (pagination, filter) => {
    return store.dispatch('foods/getFoods', {pagination: pagination, filter: filter})
  }
  helper.edit = (data, id) => {
    return store.dispatch('foods/editFood', {data: data, id: id})
  }
  helper.statuses = () => {
    return store.dispatch('foods/getStatus')
  }
  helper.taxonomies = () => {
    return store.dispatch('foods/getTaxonomy')
  }
  helper.categories = () => {
    return store.dispatch('foods/getCategory')
  }
  helper.food = (id) => {
    return store.dispatch('foods/getFood', {id: id})
  }
  Vue.prototype.$foods = helper
}
