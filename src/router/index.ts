import { createRouter, createWebHashHistory } from 'vue-router'
import { defaultRoutes,asyncRoutes } from './config'

export const router = createRouter({
  history:createWebHashHistory(),
  routes:defaultRoutes.concat(asyncRoutes),
})