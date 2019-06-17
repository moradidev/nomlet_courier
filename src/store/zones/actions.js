
import {axiosInstance} from 'boot/axios'
import {Notify} from 'quasar'
import qs from 'qs'

export function getZones(state, {pagination, filter}) {
  axiosInstance.get('/zones/list?' + qs.stringify(pagination)).then(function (response) {
    state.commit('zonesList', response.data.data)
  }).catch(function (error) {
    Notify.create({type: 'negative', message: error.response.data.message})
  })
}

export function createZone(state, {data}) {
  axiosInstance.post('/zones/add', data)
    .then(function (response) {
      state.commit('zoneErrors', {hasError: false, errors: {}})
      state.commit('zoneCreate', {zones: response.data.data})
      Notify.create({type: 'positive', message: response.data.message})
    })
    .catch(function (error) {
      state.commit('zoneErrors', {hasError: true, errors: error.response.data.data.errors})
      Notify.create({type: 'negative', message: error.response.data.message})
    })
}
export function editZone(state, {data, id}) {
  state.commit('zoneUpdateErrors', {})
  axiosInstance.put('zones/edit/' + id, data)
    .then(response => {
      state.commit('zoneErrors', {hasError: false, errors: {}})
      state.commit('zoneUpdate', {zone: response.data.data, id: id})
      Notify.create({type: 'positive', message: response.data.message})
      this.$router.push('/zones')
    }).catch(function (error) {
    state.commit('zoneErrors', {hasError: true})
    if (error.response) {
      state.commit('zoneErrors', {hasError: true, errors: error.response.data.errors})
    }
  })
}
export function getZone(state, {id}) {
  axiosInstance.get('/zones/get/' + id)
    .then(function (response) {
      state.commit('setZone', {zone: response.data.data})
    })
    .catch(function (error) {
      Notify.create({type: 'negative', message: error.response.data.message})
    })
}

export function getStatus(state) {
  axiosInstance.get('/zones/status')
    .then(function (response) {
      state.commit('setStatus', response.data.data)
    })
    .catch(function (error) {
      $q.notify({type: 'negative', message: error.response.message})
    })
}
