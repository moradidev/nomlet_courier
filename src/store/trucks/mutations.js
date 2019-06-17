export function trucksList(state, data) {
  state.trucks = data.result.data
  state.paginate = {
    page: data.result.current_page,
    rowsNumber: data.result.total,
    rowsPerPage: data.result.per_page,
    descending: data.sorting.descending,
    sortBy: data.sorting.sort
  }
}

export function truckCreate(state, data) {
  state.trucks.push(data)
}

export function truckUpdate(state, data) {
  let index = state.trucks.findIndex(truck => truck.id == data.id)
  if (index != -1) {
    state.trucks.splice(index,0, data.truck)
  }
}

export function truckUpdateErrors(state, data) {
  state.errors.errors = data.errors
  state.errors.hasError = data.hasError
}

export function truckCreateErrors(state, data) {
  state.errors.errors = data.errors
  state.errors.hasError = data.hasError
}

export function setTruck(state, data) {
  state.truck = data.truck
}

export function truckDelete(state, id) {
  let index = state.trucks.findIndex(truck => truck.id == id)
  state.trucks.splice(index, 1)
}

export function setZone(state, data) {
  let options = []
  data.map((v) => {
    options.push({
      label: v.name,
      value: v.id
    })
  })
  state.zones = options
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

