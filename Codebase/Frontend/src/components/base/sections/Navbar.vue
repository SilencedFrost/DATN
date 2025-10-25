<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import logoImage from '@/assets/images/logo.png'

const authStore = useAuthStore()
const cartStore = useCartStore()

const searchQuery = ref('')
const router = useRouter()

function onSearch() {
  router.push(`/search/${encodeURIComponent(searchQuery.value)}`)
}

function goHome() {
  router.push('/').then(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

const authenticatedList = [
  { url: '/status', text: 'Order' },
  { url: '/account', text: 'Account' },
]
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid d-flex align-items-center">
      <!-- Logo -->
      <div class="navbar-brand flex-shrink-0">
        <img :src="logoImage" alt="" style="width: 50px" @click="goHome" />
      </div>

      <!-- Search -->
      <form class="d-flex flex-fill" @submit.prevent="onSearch">
        <input
          class="form-control me-2 bg-light rounded-5"
          type="search"
          v-model="searchQuery"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-primary rounded-5" type="submit">
          <i class="bi bi-search"></i>
        </button>
      </form>

      <!-- Burger button -->
      <button
        class="navbar-toggler flex-shrink-0 border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar content -->
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav ms-auto">
          <!-- Giỏ hàng -->
          <li v-if="authStore.isLoggedIn" class="nav-item">
            <router-link class="nav-link d-flex align-items-center" to="/cart">
              <div v-if="cartStore.count > 0" class="bg-primary rounded-pill me-2 px-2 text-white">{{ cartStore.count }}</div>
              <i class="bi bi-cart me-2" style="font-size: 20px"></i>
              Cart
            </router-link>
          </li>
          <!-- Account dropdown/collapse -->
          <li class="nav-item dropdown">
            <!-- Desktop dropdown -->
            <a
              class="nav-link dropdown-toggle d-flex align-items-center d-none d-lg-flex"
              href="#"
              id="userDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-person-circle me-2" style="font-size: 20px"></i>
              <span v-if="authStore.isLoggedIn">{{ authStore.username }}</span>
              <span v-else="!authStore.isLoggedIn">Login</span>
            </a>
            <ul class="dropdown-menu" aria-labelledby="userDropdown">
              <div v-if="!authStore.isLoggedIn">
                <li>
                  <router-link class="dropdown-item" to="/auth/login">Login</router-link>
                </li>
                <li>
                  <router-link class="dropdown-item" to="/auth/register">Register</router-link>
                </li>
              </div>
              <div v-if="authStore.isLoggedIn">
                <li>
                  <div class="dropdown-item" @click="authStore.logOut">Log out</div>
                </li>
                <li v-for="item in authenticatedList" :key="item.url">
                  <router-link class="dropdown-item" :to="item.url">{{ item.text }}</router-link>
                </li>
                <li v-if="authStore.roleId === 2">
                  <router-link class="dropdown-item" to="/seller/dashboard"
                    >Seller dash</router-link
                  >
                </li>
                <li v-if="authStore.roleId === 3">
                  <router-link class="dropdown-item" to="/admin/dashboard">Admin dash</router-link>
                </li>
              </div>
            </ul>

            <!-- Mobile collapse -->
            <a
              class="nav-link d-flex align-items-center d-lg-none"
              href="#userOptions"
              data-bs-toggle="collapse"
              aria-expanded="false"
              aria-controls="userOptions"
            >
              <i class="bi bi-person-circle me-2" style="font-size: 20px"></i>
              <span v-if="authStore.isLoggedIn">{{ authStore.username }}</span>
              <span v-else="!authStore.isLoggedIn">Log in</span>
            </a>
          </li>
        </ul>

        <div class="collapse d-lg-none" id="userOptions">
          <ul class="navbar-nav">
            <div v-if="!authStore.isLoggedIn">
              <li class="nav-item">
                <router-link class="nav-link ps-4" to="/auth/login">Login</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link ps-4" to="/auth/register">Register</router-link>
              </li>
            </div>
            <div v-if="authStore.isLoggedIn">
              <li class="nav-item">
                <div class="nav-link ps-4" @click="authStore.logOut">Log out</div>
              </li>
              <li class="nav-item" v-for="item in authenticatedList" :key="item.url">
                <router-link class="nav-link ps-4" :to="item.url">{{ item.text }}</router-link>
              </li>
              <li v-if="authStore.roleId === 2" class="nav-item">
                <router-link class="nav-link ps-4" to="/seller/dashboard">Seller dash</router-link>
              </li>
              <li v-if="authStore.roleId === 3" class="nav-item">
                <router-link class="nav-link ps-4" to="/admin/dashboard">Admin dash</router-link>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-toggler:focus,
.navbar-toggler:active,
.navbar-toggler-icon:focus {
  outline: none;
  box-shadow: none;
}
</style>
