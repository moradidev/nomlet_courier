import {axiosInstance} from 'boot/axios'
import {Notify} from 'quasar'
import qs from 'qs'

export function getCouriers(state, {pagination, filter}) {
  state.commit('courierErrors', {hasError: false, errors: {}})
  axiosInstance.get('/couriers/list?' + qs.stringify(pagination)).then(function (response) {
    state.commit('couriersList', response.data.data)
  }).catch(function (error) {
    if (error.response) {
      Notify.create({type: 'negative', message: error.response.message})
    }
  })
}

export function createCourier(state, {data}) {
  axiosInstance.post('/couriers/add', data)
    .then(function (response) {
      state.commit('courierErrors', {hasError: false, errors: {}})
      Notify.create({type: 'positive', message: response.data.message})
      this.$router.push({path:'/couriers'})
    })
    .catch(function (error) {
      state.commit('courierErrors', {hasError: true, errors: {}})
      if (error.response) {
        state.commit('courierErrors', {hasError: true, errors: error.response.data.data.errors})
        Notify.create({type: 'negative', message: error.response.data.message})
      }
    })
}

export function editCourier(state, {data, id}) {
  axiosInstance.put('couriers/edit/' + id, data)
    .then(response => {
      state.commit('courierErrors', {hasError: false, errors: {}})
      Notify.create({type: 'positive', message: response.data.message})
      this.$router.push({path:'/couriers'})
    }).catch(function (error) {
    state.commit('courierErrors', {hasError: true, errors: {}})
    if (error.response) {
      state.commit('courierErrors', {hasError: true, errors: error.response.data.errors})
    }
  })
}

export function getCourier(state, {id}) {
  axiosInstance.get('/couriers/get/' + id)
    .then(function (response) {
      state.commit('setCourier', {courier: response.data.data})
    })
    .catch(function (error) {
      if (error.response){
        Notify.create({type: 'negative', message: error.response.data.message})
      }
    })
}
export function getStatus(state) {
  axiosInstance.get('/couriers/status')
    .then(function (response) {
      state.commit('setStatus', response.data.data)
    })
    .catch(function (error) {
      if (error.response){
        Notify.create({type: 'negative', message: error.response.message})
      }
    })
}
