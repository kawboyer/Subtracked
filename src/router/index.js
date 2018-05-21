import Vue from 'vue'
import Router from 'vue-router'
import Navbar from '@/components/layout/Navbar'
import Welcome from '@/components/layout/Welcome'
import Footer from '@/components/layout/Footer'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import Subscript from '@/components/home/Subscript'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/subscript/:id',
      name: 'Subscript',
      component: Subscript,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Check to see if route requires auth
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = firebase.auth().currentUser
    if (user) {
      // If user signed in, proceed to route
      next()

    } else {
      // no user signed in, redirect to login
      next({
        name: 'Login'
      })
    }
  } else {
    next()
  }
})

export default router