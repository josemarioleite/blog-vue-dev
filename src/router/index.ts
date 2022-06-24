import routes from './routes'
import { route } from 'quasar/wrappers';
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import vuex from '../store/index'

const $store = vuex.state.isTokenActived

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  })

  router.beforeEach(async (to) => {
    if (to.meta.requiresAuth && !$store) {
      to.name = 'Home'
      return '/'
    }
  })

  return router
})
