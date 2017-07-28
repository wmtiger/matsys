import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

let route = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      // component: resolve => require(['../pages/Login.vue'], resolve)
      redirect: to => {
        // todo: 这里要改成根据是否有user的token来判断重定向路径
        let token = store.getters.token
        if (token && token.length > 0) {
          return {path: '/dashboard'}
        } else {
          return {path: '/login'}
        }
      }
    },
    {
      path: '/login',
      component: resolve => require(['@/pages/login.vue'], resolve)
    },
    {
      path: '/dashboard',
      component: resolve => require(['@/pages/dashboard'], resolve),
      children: [
        {
          path: '/OperationLog',
          component: resolve => require(['@/pages/log'], resolve)
        }
      ]
    },
    { path: '/404',
      component: resolve => require(['@/pages/404.vue'], resolve)
    },
    { path: '*', redirect: '/404' }
  ]
})

export default route
