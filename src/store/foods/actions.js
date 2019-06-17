import {axiosInstance} from 'boot/axios'
import {Notify} from 'quasar'
import qs from 'qs'

export function getFoods(state, {pagination, filter}) {
  state.commit('foodErrors', {hasError: false, errors: {}})
  axiosInstance.get('/foods/list?' + qs.stringify(pagination)).then(function (response) {
    state.commit('foodsList', response.data.data)
  }).catch(function (error) {
    if (error.response) {
      Notify.create({type: 'negative', message: error.response.message})
    }
  })
}

export function createFood(state, {data}) {
  return new Promise((resolve, reject) => {
    return axiosInstance.post('/foods/add', data)
      .then(function (response) {
        state.commit('foodErrors', {hasError: false, errors: {}})
        Notify.create({type: 'positive', message: response.data.message})
        resolve(response)
      })
      .catch(function (error) {
        state.commit('foodErrors', {hasError: true, errors: {}})
        if (error.response) {
          state.commit('foodErrors', {hasError: true, errors: error.response.data.data.errors})
          Notify.create({type: 'negative', message: error.response.data.message})
        }
      })
  })
}

export function editFood(state, {data, id}) {
  return new Promise((resolve, reject) => {
    return axiosInstance.put('foods/edit/' + id, data)
      .then(function (response) {
        state.commit('foodErrors', {hasError: false, errors: {}})
        Notify.create({type: 'positive', message: response.data.message})
        resolve(response)
      })
      .catch(function (error) {
        state.commit('foodErrors', {hasError: true, errors: {}})
        if (error.response) {
          state.commit('foodErrors', {hasError: true, errors: error.response.data.data.errors})
          Notify.create({type: 'negative', message: error.response.data.message})
        }
      })
  })
}

export function getFood(state, {id}) {
  axiosInstance.get('/foods/get/' + id)
    .then(function (response) {
      state.commit('setFood', {food: response.data.data})
    })
    .catch(function (error) {
      if (error.response){
        Notify.create({type: 'negative', message: error.response.data.message})
      }
    })
}
export function getStatus(state) {
  axiosInstance.get('/categories/status')
    .then(function (response) {
      state.commit('setStatus', response.data.data)
    })
    .catch(function (error) {
      if (error.response){
        Notify.create({type: 'negative', message: error.response.message})
      }
    })
}
export function getTaxonomy(state) {
  axiosInstance.get('/taxonomies/get/active')
    .then(function (response) {
      state.commit('setTaxonomy', response.data.data)
    })
    .catch(function (error) {
      if (error.response){
        Notify.create({type: 'negative', message: error.response.message})
      }
    })
}
export function getCategory(state) {
  axiosInstance.get('/categories/get/active')
    .then(function (response) {
      state.commit('setCategory', response.data.data)
    })
    .catch(function (error) {
      if (error.response){
        Notify.create({type: 'negative', message: error.response.message})
      }
    })
}
