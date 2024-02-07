import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: () => import('../views/HomeView.vue')
  // },
  {
    path: '/',
    name: 'UserSite',
    component: () => import('../views/UserSite.vue'),
    children: [
      {
        path: '',
        name: 'UserHome',
        component: () => import('@/views/UserHome.vue')
      },
      {
        path: 'products',
        name: 'UserPoducts',
        component: () => import('../views/UserProducts.vue')
      },
      {
        path: 'product',
        name: 'UserPoduct',
        component: () => import('../views/UserProduct.vue')
      },
      {
        path: 'cart',
        name: 'UserCart',
        component: () => import('../views/UserCart.vue')
      }
    ]

  },
  {
    path: '/admin',
    name: 'dashBoard',
    component: () => import('../views/dashBoard/AdminDashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'adminPoduct',
        component: () => import('../views/dashBoard/AdminProducts.vue')
      },
      {
        path: 'orders',
        name: 'adminOrder',
        component: () => import('../views/dashBoard/AdminOrders.vue')
      }
    ]

  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/UserLogin.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
