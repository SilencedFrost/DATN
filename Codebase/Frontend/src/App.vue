<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore.js'
import { useCartStore } from '@/stores/cartStore'

const authStore = useAuthStore()
const cartStore = useCartStore()

onMounted(() => {
  authStore.checkSession()
  cartStore.checkCount()
})
</script>

<template>
  <main class="min-vh-100 d-flex flex-column bg-light">
    <router-view />
  </main>
</template>
