export function campaignsList(state, data) {
  state.campaigns = data.data
  state.paginate = {
    page: data.current_page,
    rowsNumber: data.total,
    rowsPerPage: data.per_page,
    descending: data.sorting.descending,
    sortBy: data.sorting.sort
  }
}
export function campaignErrors(state, data) {
  state.errors.errors = data.errors
  state.errors.hasError = data.hasError
}
export function setCampaign(state, data) {
  state.campaign = data.campaign
  var t = state.campaign.jalaali_expire_at.split(' ')[1]
  var d = state.campaign.jalaali_expire_at.split(' ')[0]
  state.campaign.expire_at= d + ' ' + t
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
export function campaignDelete(state,id){
  let index = state.campaigns.findIndex(campaign =>campaign.id == id)
  state.campaigns.splice(index,1)
}
export function vouchersList(state, data) {
  state.vouchers = data.data
  state.paginate = {
    page: data.current_page,
    rowsNumber: data.total,
    rowsPerPage: data.per_page,
    descending: data.sorting.descending,
    sortBy: data.sorting.sort
  }
}
export function voucherErrors(state, data) {
  state.errors.errors = data.errors
  state.errors.hasError = data.hasError
}
export function setVoucher(state, data) {
  state.voucher = data.voucher
}
export function setVoucherStatus(state, data) {
  let options = []
  data.map((v) => {
    options.push({
      label: v.name,
      value: v.id
    })
  })
  state.voucherStatuses = options
}