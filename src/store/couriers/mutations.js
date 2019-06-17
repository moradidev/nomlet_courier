export function couriersList(state, data) {
  state.couriers = data.data
  state.paginate = {
    page: data.current_page,
    rowsNumber: data.total,
    rowsPerPage: data.per_page,
    descending: data.sorting.descending,
    sortBy: data.sorting.sort
  }
}
export function courierErrors(state, data) {
  state.errors.errors = data.errors
  state.errors.hasError = data.hasError
}
export function setCourier(state, data) {
  state.courier = data.courier
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