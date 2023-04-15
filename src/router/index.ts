import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import About from '@/pages/About.vue'
import Layout from '@/layout/index.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Root',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: {
          title: '首页',
          icon: 'HomeFilled',
          needCache: true,
        },
        component: () => import('@/pages/Home.vue'),
      },
      {
        path: '/other',
        name: 'Other',
        meta: {
          title: '其他',
          icon: 'Location',
          needCache: true,
        },
        children: [
          {
            path: 'about',
            name: 'About',
            meta: {
              title: '关于',
              needCache: true,
            },
            component: About,
          },
          {
            path: '/404',
            name: 'NotFound',
            meta: {
              title: '关于',
              needCache: true,
              hidden: true,
            },
            component: About,
          },
        ],
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
