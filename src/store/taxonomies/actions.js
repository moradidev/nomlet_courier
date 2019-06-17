import {axiosInstance} from 'boot/axios'
import {Notify} from 'quasar'
import qs from 'qs'

export function getTaxonomies(state, {pagination, filter}) {
  state.commit('taxonomyErrors', {hasError: false, errors: {}})
  axiosInstance.get('/taxonomies/list?' + qs.stringify(pagination)).then(function (response) {
    state.commit('taxonomiesList', response.data.data)
  }).catch(function (error) {
    if (error.response) {
      Notify.create({type: 'negative', message: error.response.message})
    }
  })
}

export function createTaxonomy(state, {data}) {
  axiosInstance.post('/taxonomies/add', data)
    .then(function (response) {
      state.commit('taxonomyErrors', {hasError: false, errors: {}})
      Notify.create({type: 'positive', message: response.data.message})
      this.$router.push({path:'/taxonomies'})
    })
    .catch(function (error) {
      state.commit('taxonomyErrors', {hasError: true, errors: {}})
      if (error.response) {
        state.commit('taxonomyErrors', {hasError: true, errors: error.response.data.data.errors})
        Notify.create({type: 'negative', message: error.response.data.message})
      }
    })
}

export function editTaxonomy(state, {data, id}) {
  axiosInstance.put('taxonomies/edit/' + id, data)
    .then(response => {
      state.commit('taxonomyErrors', {hasError: false, errors: {}})
      Notify.create({type: 'positive', message: response.data.message})
      this.$router.push({path:'/taxonomies'})
    }).catch(function (error) {
    state.commit('taxonomyErrors', {hasError: true, errors: {}})
    if (error.response) {
      state.commit('taxonomyErrors', {hasError: true, errors: error.response.data.errors})
    }
  })
}

export function getTaxonomy(state, {id}) {
  axiosInstance.get('/taxonomies/get/' + id)
    .then(function (response) {
      state.commit('setTaxonomy', {taxonomy: response.data.data})
    })
    .catch(function (error) {
      if (error.response){
        Notify.create({type: 'negative', message: error.response.data.message})
      }
    })
}
export function uploadAppBanner(state,{data}) {
  axiosInstance.post('/upload',{dir:'taxonomies',image:data}).then(response=>{
    console.log(response)
  })
  
}
export function getStatus(state) {
  axiosInstance.get('/taxonomies/status')
    .then(function (response) {
      state.commit('setStatus', response.data.data)
    })
    .catch(function (error) {
      if (error.response){
        Notify.create({type: 'negative', message: error.response.message})
      }
    })
}
