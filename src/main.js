import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import {Vue3Mq} from "vue3-mq"
// import firebase from '@/firebase/index.js'
import '@/css/share.css'
import '@/css/reset.css'

createApp(App)
  .use(router)
  .use(store)
  .use(Vue3Mq, {
    breakpoints: { 
      md: 0,
      lg: 600,
    }
  })
  // .use(firebase)
  .mount('#app')
