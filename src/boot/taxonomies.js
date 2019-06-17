export default async ({  app, store, Vue,}) => {
  var helper = {}
  helper.create = (data) => {
    return store.dispatch('taxonomies/createTaxonomy', {data: data})
  }
  helper.edit = (data, id) => {
    return store.dispatch('taxonomies/editTaxonomy', {data: data, id: id})
  }
  helper.statuses = () => {
    return store.dispatch('taxonomies/getStatus')
  }
  helper.getTaxonomies = (pagination, filter) => {
    return store.dispatch('taxonomies/getTaxonomies', {pagination: pagination, filter: filter})
  }
  helper.taxonomy = (id) => {
    return store.dispatch('taxonomies/getTaxonomy', {id: id})
  }
  helper.uploadAppBanner = (files) => {
    return store.dispatch('taxonomies/uploadAppBanner', {data: files})
  }
  Vue.prototype.$taxonomies = helper
}
