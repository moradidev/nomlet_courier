import {axiosInstance} from 'boot/axios'
import {Notify} from 'quasar'
import qs from 'qs'

export function getCampaigns(state, {pagination, filter}) {
  state.commit('campaignErrors', {hasError: false, errors: {}})
  axiosInstance.get('/campaigns/list?' + qs.stringify(pagination)).then(function (response) {
    state.commit('campaignsList', response.data.data)
  }).catch(function (error) {
    if (error.response) {
      Notify.create({type: 'negative', message: error.response.message})
    }
  })
}

export function createCampaign(state, {data}) {
  return new Promise((resolve, reject) => {
    return axiosInstance.post('/campaigns/add', data)
      .then(function (response) {
        state.commit('campaignErrors', {hasError: false, errors: {}})
        Notify.create({type: 'positive', message: response.data.message})
        resolve(response)
      })
      .catch(function (error) {
        state.commit('campaignErrors', {hasError: true, errors: {}})
        if (error.response) {
          state.commit('campaignErrors', {hasError: true, errors: error.response.data.data.errors})
          Notify.create({type: 'negative', message: error.response.data.message})
        }
      })
  })
}

export function editCampaign(state, {data, id}) {
  return new Promise((resolve, reject) => {
    return axiosInstance.post('campaigns/edit/' + id, data)
      .then(function (response) {
        state.commit('campaignErrors', {hasError: false, errors: {}})
        Notify.create({type: 'positive', message: response.data.message})
        resolve(response)
      })
      .catch(function (error) {
        state.commit('campaignErrors', {hasError: true, errors: {}})
        if (error.response) {
          state.commit('campaignErrors', {hasError: true, errors: error.response.data.data.errors})
          Notify.create({type: 'negative', message: error.response.data.message})
        }
      })
  })
}

export function getCampaign(state, {id}) {
  axiosInstance.get('/campaigns/get/' + id)
    .then(function (response) {
      state.commit('setCampaign', {campaign: response.data.data})
    })
    .catch(function (error) {
      if (error.response){
        Notify.create({type: 'negative', message: error.response.data.message})
      }
    })
}
export function getStatus(state) {
  axiosInstance.get('/campaigns/status')
    .then(function (response) {
      state.commit('setStatus', response.data.data)
    })
    .catch(function (error) {
      if (error.response){
        Notify.create({type: 'negative', message: error.response.message})
      }
    })
}
export function deleteCampaign(state, {id}) {
  axiosInstance.delete('campaigns/delete/' + id).then(response => {
    state.commit('campaignDelete', id)
    Notify.create({type: 'warning', message: response.data.message})
  }).catch((error)=>{
    Notify.create({type:'warning',message:error.response.data.message})
  })
}

export function getVouchers(state, {pagination, filter},id) {
  state.commit('voucherErrors', {hasError: false, errors: {}})
  axiosInstance.get('/campaigns/vouchers/'+id+'?' + qs.stringify(pagination)).then(function (response) {
    state.commit('vouchersList', response.data.data)
  }).catch(function (error) {
    if (error.response) {
      Notify.create({type: 'negative', message: error.response.message})
    }
  })
}

export function createVoucher(state, {data}) {
  return new Promise((resolve, reject) => {
    return axiosInstance.post('/campaigns/vouchers/add', data)
      .then(function (response) {
        state.commit('voucherErrors', {hasError: false, errors: {}})
        Notify.create({type: 'positive', message: response.data.message})
        resolve(response)
      })
      .catch(function (error) {
        state.commit('voucherErrors', {hasError: true, errors: {}})
        if (error.response) {
          state.commit('voucherErrors', {hasError: true, errors: error.response.data.data.errors})
          Notify.create({type: 'negative', message: error.response.data.message})
        }
      })
  })
}

export function editVouchers(state, {data, id}) {
  return new Promise((resolve, reject) => {
    return axiosInstance.post('campaigns/vouchers/edit/' + id, data)
      .then(function (response) {
        state.commit('voucherErrors', {hasError: false, errors: {}})
        Notify.create({type: 'positive', message: response.data.message})
        resolve(response)
      })
      .catch(function (error) {
        state.commit('voucherErrors', {hasError: true, errors: {}})
        if (error.response) {
          state.commit('voucherErrors', {hasError: true, errors: error.response.data.data.errors})
          Notify.create({type: 'negative', message: error.response.data.message})
        }
      })
  })
}

export function getVoucher(state, {id}) {
  axiosInstance.get('/campaigns/vouchers/get/' + id)
    .then(function (response) {
      state.commit('setVoucher', {voucher: response.data.data})
    })
    .catch(function (error) {
      if (error.response){
        Notify.create({type: 'negative', message: error.response.data.message})
      }
    })
}
export function getVoucherStatus(state) {
  axiosInstance.get('/campaigns/vouchers/statuses')
    .then(function (response) {
      state.commit('setStatus', response.data.data)
    })
    .catch(function (error) {
      if (error.response){
        Notify.create({type: 'negative', message: error.response.message})
      }
    })
}
export function getVoucherType(state) {
  axiosInstance.get('/campaigns/vouchers/types')
    .then(function (response) {
      state.commit('setType', response.data.data)
    })
    .catch(function (error) {
      if (error.response){
        Notify.create({type: 'negative', message: error.response.message})
      }
    })
}