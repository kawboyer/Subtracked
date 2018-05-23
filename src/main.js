// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import firebase from 'firebase'
import Vuelidate from 'vuelidate'

Vue.use(VueMaterial)
Vue.use(Vuelidate)

Vue.config.productionTip = false

let app = null;

// Wait for Firebase Auth to init before creating the app
firebase.auth().onAuthStateChanged(() => {
  
  // Init app if not already created
  if(!app){
    
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }

})