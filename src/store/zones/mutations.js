export function zonesList(state,data){
  state.zones = data.result.data
  state.paginate = {
    page: data.result.current_page,
    rowsNumber: data.result.total,
    rowsPerPage: data.result.per_page,
    descending: data.sorting.descending,
    sortBy: data.sorting.sort
  }
}

export function zoneCreate(state,data){
  state.zones.push(data)
}

export function zoneErrors(state, data) {
  state.errors.errors = data.errors
  state.errors.hasError = data.hasError
}

export function zoneUpdate() {
  let index = state.zones.findIndex(zone => zone.id == data.id)
  if (index != -1) {
    state.zones.splice(index, 0, data.zone)
  }

}

export function setZone(state, data) {
  state.zone = data.zone
}

export function zoneDelete() {

}

export function setStatus(state,data){
  let options = []
  data.map((v) => {
    options.push({
      label: v.name,
      value: v.id
    })
  })
  state.statuses = options
}
