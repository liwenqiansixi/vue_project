import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from '@/components/Hello'
import index from '@/components/index'
import User from '@/components/User'
// import buycar from '@/component/buycar'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Hello',
    component: Hello
  },
  {
    path: '/index',
    name: 'index',
    component: index
  },
  {
    path: '/user/:id',
    component: User
  }
]
export default new VueRouter({
  routes
})
// import App from '../App'
// export default [{
//   path: '/',
//   component: App,
//   children: [{
//     path: '',
//     component: r => require.ensure([], () => r(require('../components/Hello')), 'Hello')
//   }]
// }]
