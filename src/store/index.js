import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import select from './modules/select.js'
import auth from './modules/auth.js'
import data from './modules/data.js'


export default new Vuex.Store({
  modules: {
    select,
    auth,
    data
  },
  plugins: [
    // 端末への一時保存
    createPersistedState({
      paths:[
        "auth", "data"
      ]
    })
  ],
  actions: {

  },
  strict: false //Numerous errors are shown when debug==true
})