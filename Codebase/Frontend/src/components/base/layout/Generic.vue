<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Navbar from '@/components/base/sections/Navbar.vue'
import Foot from '@/components/base/sections/Footer.vue'

const mainNavbar = ref(null)
let resizeObserver = null

const updateNavbarHeight = () => {
  if (mainNavbar.value) {
    const height = mainNavbar.value.offsetHeight
    document.documentElement.style.setProperty('--navbar-height', `${height}px`)
  }
}

onMounted(() => {
  updateNavbarHeight()
  if (mainNavbar.value) {
    resizeObserver = new ResizeObserver(updateNavbarHeight)
    resizeObserver.observe(mainNavbar.value)
  }
})

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})
</script>

<template>
  <div class="d-flex flex-column h-100 flex-fill">
    <header ref="mainNavbar" class="sticky-top" style="z-index: 9999">
      <navbar />
    </header>
    <main class="d-flex flex-fill">
      <router-view />
    </main>
    <footer>
      <foot />
    </footer>
  </div>
</template>
