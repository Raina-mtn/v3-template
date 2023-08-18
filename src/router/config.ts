import type { RouteRecordRaw } from "vue-router";
import Layout from '@/components/Layout/index.vue'
export const asyncRoutes:RouteRecordRaw[]= [
  {
    path: "/login",
    component: () => import("@/components/Layout/index.vue"),
    meta:{
      title:'路由1',
    },
    children:[
      {
        path: "/login1",
        component: () => import("@/components/Layout/index.vue"),
        meta:{
          title:'子路由1',
          activeMenu:"/login"
        },
      },
      {
        path: "/login2",
        component: () => import("@/components/Layout/index.vue"),
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
  {
    path: "/login",
    component: () => import("@/components/Layout/index.vue")
  },
]