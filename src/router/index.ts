import { createRouter, createWebHashHistory } from 'vue-router'
import { defaultRoutes } from './config'

export const router = createRouter({
  history:createWebHashHistory(),
  routes:defaultRoutes,

})