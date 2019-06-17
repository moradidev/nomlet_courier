export default async ({  app, store, Vue,}) => {
  var helper = {}
  helper.create = (data) => {
    return store.dispatch('categories/createCategory', {data: data})
  }
  helper.getCategories = (pagination, filter) => {
    return store.dispatch('categories/getCategories', {pagination: pagination, filter: filter})
  }
  helper.edit = (data, id) => {
    return store.dispatch('categories/editCategory', {data: data, id: id})
  }
  helper.statuses = () => {
    return store.dispatch('categories/getStatus')
  }
  helper.taxonomies = () => {
    return store.dispatch('categories/getTaxonomy')
  }
  helper.category = (id) => {
    return store.dispatch('categories/getCategory', {id: id})
  }
  helper.uploadAppBanner = (files) => {
    return store.dispatch('categories/uploadAppBanner', {data: files})
  }
  Vue.prototype.$categories = helper
}
