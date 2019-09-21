import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'
import welcome from './views/contents/welcome.vue'
import dorm from './views/contents/dorm.vue'
import students from './views/contents/students.vue'
import rooms from './views/contents/rooms.vue'
import maintain from './views/contents/maintain.vue'
import visitor from './views/contents/visitor.vue'
import admin from './views/contents/admin.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home/welcome',
      name: 'home',
      component: Home,
      children:[{
        path:'/home/welcome',
        name:'welcome',
        component:welcome
      },{
        path:'/home/dorm',
        name:'dorm',
        component:dorm
      },{
        path:'/home/students',
        name:'students',
        component:students
      },{
        path:'/home/rooms',
        name:'rooms',
        component:rooms
      },{
        path:'/home/maintain',
        name:'maintain',
        component:maintain
      },{
        path:'/home/visitor',
        name:'visitor',
        component:visitor
      },{
        path:'/home/admin',
        name:'admin',
        component:admin
      }]
    },
  ]
})
