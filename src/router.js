import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'
import welcome from './views/contents/welcome.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[{
        path:'/home/welcome',
        name:'welcome',
        component:welcome
      }]
    },
  ]
})
