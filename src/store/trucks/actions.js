import {axiosInstance} from 'boot/axios'
import {Notify} from 'quasar'
import qs from 'qs'

export function getTrucks(state, {pagination, filter}) {
  state.commit('truckUpdateErrors', {})
  state.commit('truckCreateErrors', {})
  axiosInstance.get('/trucks/list?' + qs.stringify(pagination)).then(function (response) {
    state.commit('trucksList', response.data.data)
  }).catch(function (error) {
    Notify.create({type: 'negative', message: error.response.data.message})
  })
}

export function createTruck(state, {data}) {
  axiosInstance.post('/trucks/add', data)
    .then(response => {
      state.commit('truckCreateErrors', {hasError: false, errors: {}})
      state.commit('truckCreate', {trucks: response.data.data})
      Notify.create({type: 'positive', message: response.data.message})
      this.$router.push('/trucks')
    }).catch(function (error) {
    if (error.response) {
      state.commit('truckCreateErrors', {hasError: true, errors: error.response.data.errors})
    } else {
      state.commit('truckCreateErrors', {hasError: true})
    }
  })
}

export function editTruck(state, {data, id}) {
  state.commit('truckUpdateErrors', {})
  axiosInstance.put('trucks/edit/' + id, data)
    .then(response => {
      state.commit('truckUpdateErrors', {hasError: false, errors: {}})
      state.commit('truckUpdate', {truck: response.data.data, id: id})
      Notify.create({type: 'positive', message: response.data.message})
      this.$router.push('/trucks')
    }).catch(function (error) {
    state.commit('truckUpdateErrors', {hasError: true})
    if (error.response) {
      state.commit('truckUpdateErrors', {hasError: true, errors: error.response.data.errors})
    }
  })
}

export function getTruck(state, {id}) {
  axiosInstance.get('trucks/get/' + id)
    .then(response => {
      state.commit('setTruck', {truck: response.data.data},)
    })
}

export function getStatus(state) {
  axiosInstance.get('/trucks/status')
    .then(response => {
      state.commit('setStatus', response.data.data)
    })
    .catch(function (error) {
      Notify.create({type: 'negative', message: error.response.message})
    })
}

export function getZone(state) {
  axiosInstance.get('/zones/free')
    .then(response => {
      state.commit('setZone', response.data.data)
    })
    .catch(function (error) {
      Notify.create({type: 'negative', message: error.response.message})
    })
}