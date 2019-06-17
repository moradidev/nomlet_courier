import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function ({store, ssrContext}) {
  const Router = new VueRouter({
    scrollBehavior: () => ({x: 0, y: 0}),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  Router.beforeEach((to, from, next) => {
    const record = to.matched.find(record => record.meta.auth)
    if (record) {
      if (store.getters['auth/isLoggedIn']) {
        if (store.state.auth.status !== 'success') {
          store.dispatch('auth/getUser')
        }
        next()
        return
      }
      next('/login')
    } else {
      if (store.getters['auth/isLoggedIn']) {
        if (to.path.match('/login')) {
          Router.push('/account')
        }
        return
      }
      next()
    }
  })

  return Router
}
