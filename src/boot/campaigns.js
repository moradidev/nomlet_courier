export default async ({  app, store, Vue,}) => {
  var helper = {}
  helper.create = (data) => {
    return store.dispatch('campaigns/createCampaign', {data: data})
  }
  helper.getCampaigns = (pagination, filter) => {
    return store.dispatch('campaigns/getCampaigns', {pagination: pagination, filter: filter})
  }
  helper.edit = (data, id) => {
    return store.dispatch('campaigns/editCampaign', {data: data, id: id})
  }
  helper.statuses = () => {
    return store.dispatch('campaigns/getStatus')
  }
  helper.campaign = (id) => {
    return store.dispatch('campaigns/getCampaign', {id: id})
  }
  helper.delete = (id) => {
    return store.dispatch('campaigns/deleteCampaign', {id: id})
  }

  helper.createVoucher = (data) => {
    return store.dispatch('campaigns/createCampaign', {data: data})
  }
  helper.getVouchers = (pagination, filter) => {
    return store.dispatch('campaigns/getCampaigns', {pagination: pagination, filter: filter})
  }
  helper.editVouchers = (data, id) => {
    return store.dispatch('campaigns/editCampaign', {data: data, id: id})
  }
  helper.voucherStatuses = () => {
    return store.dispatch('campaigns/getStatus')
  }
  helper.voucherTypes = () => {
    return store.dispatch('campaigns/getStatus')
  }
  helper.voucher = (id) => {
    return store.dispatch('campaigns/getVoucher', {id: id})
  }
  Vue.prototype.$campaigns = helper
}
