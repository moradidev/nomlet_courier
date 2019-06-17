export function categoriesList(state, data) {
  state.categories = data.data
  state.paginate = {
    page: data.current_page,
    rowsNumber: data.total,
    rowsPerPage: data.per_page,
    descending: data.sorting.descending,
    sortBy: data.sorting.sort
  }
}
export function categoryErrors(state, data) {
  state.errors.errors = data.errors
  state.errors.hasError = data.hasError
}
export function setCategory(state, data) {
  state.category = data.category
}
export function setStatus(state, data) {
  let options = []
  data.map((v) => {
    options.push({
      label: v.name,
      value: v.id
    })
  })
  state.statuses = options
}
export function setTaxonomy(state, data) {
  let options = []
  data.map((v) => {
    options.push({
      label: v.name,
      value: v.id
    })
  })
  state.taxonomies = options
}