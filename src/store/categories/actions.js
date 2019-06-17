import {axiosInstance} from 'boot/axios'
import {Notify} from 'quasar'
import qs from 'qs'

export function getCategories(state, {pagination, filter}) {
  state.commit('categoryErrors', {hasError: false, errors: {}})
  axiosInstance.get('/categories/list?' + qs.stringify(pagination)).then(function (response) {
    state.commit('categoriesList', response.data.data)
  }).catch(function (error) {
    if (error.response) {
      Notify.create({type: 'negative', message: error.response.message})
    }
  })
}

export function createCategory(state, {data}) {
  return new Promise((resolve, reject) => {
    return axiosInstance.post('/categories/add', data)
      .then(function (response) {
        state.commit('categoryErrors', {hasError: false, errors: {}})
        Notify.create({type: 'positive', message: response.data.message})
        resolve(response)
      })
      .catch(function (error) {
        state.commit('categoryErrors', {hasError: true, errors: {}})
        if (error.response) {
          state.commit('categoryErrors', {hasError: true, errors: error.response.data.data.errors})
          Notify.create({type: 'negative', message: error.response.data.message})
        }
      })
  })

}

export function editCategory(state, {data, id}) {
  return new Promise((resolve, reject) => {
    return axiosInstance.put('categories/edit/' + id, data)
      .then(function (response) {
        state.commit('categoryErrors', {hasError: false, errors: {}})
        Notify.create({type: 'positive', message: response.data.message})
        resolve(response)
      })
      .catch(function (error) {
        state.commit('categoryErrors', {hasError: true, errors: {}})
        if (error.response) {
          state.commit('categoryErrors', {hasError: true, errors: error.response.data.data.errors})
          Notify.create({type: 'negative', message: error.response.data.message})
        }
      })
  })
}

export function getCategory(state, {id}) {
  axiosInstance.get('/categories/get/' + id)
    .then(function (response) {
      state.commit('setCategory', {category: response.data.data})
    })
    .catch(function (error) {
      if (error.response) {
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
      if (error.response) {
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
      if (error.response) {
        Notify.create({type: 'negative', message: error.response.message})
      }
    })
}
