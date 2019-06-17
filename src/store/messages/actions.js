import {axiosInstance} from 'boot/axios'
import {Notify} from 'quasar'
import qs from 'qs'

export function getMessages(state, {pagination, filter}) {
  state.commit('messageErrors', {hasError: false, errors: {}})
  axiosInstance.get('/messages/list?' + qs.stringify(pagination)).then(function (response) {
    state.commit('messagesList', response.data.data)
  }).catch(function (error) {
    if (error.response) {
      Notify.create({type: 'negative', message: error.response.message})
    }
  })
}
export function createMessage(state, {data}) {
  return new Promise((resolve, reject) => {
    return axiosInstance.post('/messages/send', data)
      .then(function (response) {
        state.commit('messageErrors', {hasError: false, errors: {}})
        Notify.create({type: 'positive', message: response.data.message})
        resolve(response)
      })
      .catch(function (error) {
        state.commit('messageErrors', {hasError: true, errors: {}})
        if (error.response) {
          state.commit('messageErrors', {hasError: true, errors: error.response.data.data.errors})
          Notify.create({type: 'negative', message: error.response.data.message})
        }
      })
  })
}
export function deleteMessage(state, {id}) {
  axiosInstance.delete('messages/delete/' + id).then(response => {
    state.commit('messageDelete', id)
    Notify.create({type: 'warning', message: response.data.message})
  }).catch((error)=>{
    Notify.create({type:'warning',message:error.response.data.message})
  })
}

