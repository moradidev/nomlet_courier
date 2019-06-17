import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import zones from './zones'
import trucks from './trucks'
import couriers from './couriers'
import taxonomies from './taxonomies'
import categories from './categories'
import foods from './foods'
import messages from './messages'
import campaigns from './campaigns'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      zones,
      trucks,
      couriers,
      taxonomies,
      categories,
      foods,
      messages,
      campaigns
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
