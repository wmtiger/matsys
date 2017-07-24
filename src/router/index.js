import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      // component: resolve => require(['../pages/Login.vue'], resolve)
      redirect: to => {
        // todo: 这里要改成根据是否有user的token来判断重定向路径
        let test = (new Date().getTime()) % 2
        test = 0
        console.log(test)
        if (test === 0) {
          return {path: '/login'}
        } else {
          return {path: '/index'}
        }
      }
    },
    {
      path: '/login',
      component: resolve => require(['../pages/Login.vue'], resolve)
    },
    {
      path: '/index',
      component: resolve => require(['../pages/index.vue'], resolve)
    }
  ]
})
