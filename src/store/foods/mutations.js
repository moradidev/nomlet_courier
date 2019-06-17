export function foodsList(state, data) {
  state.foods = data.data
  state.paginate = {
    page: data.current_page,
    rowsNumber: data.total,
    rowsPerPage: data.per_page,
    descending: data.sorting.descending,
    sortBy: data.sorting.sort
  }
}
export function foodErrors(state, data) {
  state.errors.errors = data.errors
  state.errors.hasError = data.hasError
}
export function setFood(state, data) {
  state.food = data.food
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
export function setCategory(state, data) {
  let options = []
  data.map((v) => {
    options.push({
      label: v.name,
      value: v.id
    })
  })
  state.categories = options
}