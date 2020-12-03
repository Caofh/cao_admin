/* eslint-disable */

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { check } from './check'

Vue.use(VueRouter)

const router = new VueRouter({
  base: '/',
  mode: 'history',
  routes
})

// 路由前置守卫，在载入前
router.beforeEach((to, from, next) => {

  // 所有页面的路由守卫，在页面载入前的校验，通过校验，才会进入当前页面的模版组件
  if (!check()) return

  // 缓存当前路由信息
  cacheCurRoute(router, to)

  /* 
    根据是否有子路由来决定是否打开转场效果。
    有子路由时，才开启转场效果，无子路由转场关闭，避免切换nav导航时，转场效果导致页面闪动
  */
  useTransition(router, to)

  // 进入页面
  next()

})

// 路由后置守卫，在载入后
router.afterEach((route) => {
  // console.log(route)
})

// 缓存当前路由信息
function cacheCurRoute(router, to) {
  router.app.$options.store.commit('setCurRoute', to)
}

/* 
  根据是否有子路由来决定是否打开转场效果。
  有子路由时，才开启转场效果，无子路由转场关闭，避免切换nav导航时，转场效果导致页面闪动
*/
function useTransition(router, to) {
  let headerName = to.matched && to.matched[0] && to.matched[0].name ? to.matched[0].name : '' // 找到一级路由的name
  let curRouter = router.options.routes.filter(item => item.name === headerName) // 筛选当前一级路由
  // 存在子路由的使用转场效果
  if (curRouter && curRouter[0] && curRouter[0].children && curRouter[0].children.length) {
    router.app.$options.store.commit('setAni', true)
  } else {
    router.app.$options.store.commit('setAni', false)
  }
}


export default router
