import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

import HomepageLayout from '@/components/homepage/layout/HomepageLayout.vue'
import Homepage from '@/components/homepage/pages/Homepage.vue'
import AccountLayout from '@/components/account/layout/AccountLayout.vue'
import Account from '@/components/account/pages/Account.vue'
import Cart from '@/components/cart/pages/Cart.vue'
import ProductDetail from '@/components/product/pages/ProductDetail.vue'
import Login from '@/components/auth/pages/Login.vue'
import Search from '@/components/search/pages/Search.vue'
import Signup from '@/components/auth/pages/Signup.vue'
import Generic from '@/components/base/layout/Generic.vue'
import Payment from '@/components/account/pages/Payment.vue'
import Address from '@/components/account/pages/Address.vue'
import ForgotPassword from '@/components/auth/pages/ForgotPassword.vue'
import OrderDetail from '@/components/order/pages/OrderDetail.vue'
import OrderStatus from '@/components/order/pages/OrderStatus.vue'
import AuthLayout from '@/components/auth/layout/AuthLayout.vue'
import SellerProducts from '@/components/seller/pages/SellerProducts.vue'
import SellerLayout from '@/components/seller/layout/SellerLayout.vue'
import SellerDashboard from '@/components/seller/pages/SellerDashboard.vue'
import SellerOrders from '@/components/seller/pages/SellerOrders.vue'
import AdminProducts from '@/components/admin/pages/AdminProducts.vue'
import AdminDashboard from '@/components/admin/pages/AdminDashboard.vue'
import AdminOrders from '@/components/admin/pages/AdminOrders.vue'
import VerifyOtp from '@/components/auth/pages/VerifyOtp.vue'
import ResetPassword from '@/components/auth/pages/ResetPassword.vue'
import AdminLayout from '@/components/admin/layout/AdminLayout.vue'

const routes = [
  { path: '/order', component: OrderDetail, meta: { title: 'Order detail' } },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login, meta: { title: 'Login' } },
      { path: 'register', component: Signup, meta: { title: 'Register' } },
      { path: 'forgot-password', component: ForgotPassword, meta: { title: 'Forgot password' } },
      { path: 'verify-otp', component: VerifyOtp, meta: { title: 'Verify OTP' } },
      { path: 'reset-password', component: ResetPassword, meta: { title: 'Reset Password' } },
    ],
  },
  {
    path: '/',
    component: Generic,
    children: [
      { path: '/search/:keyword?', component: Search, meta: { title: 'Search' } },
      { path: '/product/:id?', component: ProductDetail, meta: { title: 'Product detail' } },
      { path: '/cart', component: Cart, meta: { title: 'Cart', requiresAuth: true } },
      { path: '/status', component: OrderStatus, meta: { title: 'Order status' } },
      {
        path: '/seller',
        component: SellerLayout,
        meta: { title: 'Seller dashboard', requiresAuth: true, authorizationLevelExact: 2 },
        children: [
          { path: '', component: SellerDashboard, alias: 'dashboard' },
          { path: 'products', component: SellerProducts },
          { path: 'orders', component: SellerOrders },
        ],
      },
      {
        path: '/admin',
        component: AdminLayout,
        meta: { title: 'Admin dashboard', requiresAuth: true, authorizationLevelExact: 3 },
        children: [
          { path: '', component: AdminDashboard, alias: 'dashboard'},
          { path: 'products', component: AdminProducts },
          { path: 'orders', component: AdminOrders },
        ],
      },
      {
        path: '/',
        component: HomepageLayout,
        alias: '/home',
        meta: { title: 'Homepage' },
        children: [{ path: '', component: Homepage }],
      },
      {
        path: '/account',
        component: AccountLayout,
        meta: { title: 'My account', requiresAuth: true },
        children: [
          { path: '', component: Account },
          { path: 'payment', component: Payment },
          { path: 'address', component: Address },
        ],
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    console.log('please login deadass')
    next({
      path: '/auth/login',
      query: { redirect: to.fullPath },
    })
  } else if (
    to.meta.authorizationLevelExact &&
    authStore.roleId !== to.meta.authorizationLevelExact
  ) {
    console.log(`Required powah level: ${to.meta.authorizationLevelExact}`)
    console.log(`Your powah level: ${authStore.roleId}`)
    next({ path: '/' })
    alert('Incorrect authorization level')
  } else {
    next()
  }
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})

export default router
