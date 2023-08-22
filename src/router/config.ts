import type { RouteRecordRaw } from "vue-router";
import Layout from '@/components/Layout/index.vue'
export const asyncRoutes:RouteRecordRaw[]= [
  {
    path: "/login",
    component: () => import("@/views/login.vue"),
    meta:{
      title:'路由',
      icon:'Avatar',
      iconType:'el'
    },
  },
  {
    path: "/login1",
    component: () => import("@/components/Layout/components/PageLayout.vue"),
    meta:{
      title:'路由1',
      icon:'Avatar',
      iconType:'el'
    },
    children:[
      {
        path: "/login2",
        component: () => import("@/views/login1.vue"),
        meta:{
          title:'子路由1',
          activeMenu:"/login",
        },
      },
      {
        path: "/login3",
        component: () => import("@/views/login2.vue"),
        meta:{
          title:'子路由2',
          activeMenu:"/login"
        },
      },
    ]
  },
]
export const defaultRoutes:RouteRecordRaw[] = [
  {
    path: "/",
    component: Layout,
    name: 'index',
    redirect: "/login",
    children: asyncRoutes
  },
]