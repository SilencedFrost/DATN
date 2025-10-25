<script setup>
import { computed } from 'vue'

import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()

const imageBase = import.meta.env.VITE_IMAGE_BASE

const repeat = 150

const horizontalImageCount = computed(() => Math.ceil(width.value / repeat) + 1)

const verticalImageCount = computed(() => Math.ceil(height.value / repeat / 2))
</script>
<template>
  <div class="d-flex flex-fill bg-primary">
    <div class="fixed-top">
      <router-link class="text-white ms-2 fs-1" to="/"
        ><i class="bi bi-house-fill"></i
      ></router-link>
    </div>
    <div v-for="verticalIndex in verticalImageCount" :key="verticalIndex">
      <div v-for="horizontalIndex in horizontalImageCount" :key="horizontalIndex">
        <img
          :src="imageBase + '/logos/logo-warning.png'"
          :style="{
            maxWidth: `${repeat}px`,
            left: `${repeat * (horizontalIndex - 1)}px`,
            top: `${repeat * (verticalIndex * 2 - 2)}px`,
          }"
          class="position-fixed p-3 opacity-25"
        />
        <img
          :src="imageBase + '/logos/logo-warning.png'"
          :style="{
            maxWidth: `${repeat}px`,
            left: `${repeat * (horizontalIndex - 1.5)}px`,
            top: `${repeat * (verticalIndex * 2 - 1)}px`,
          }"
          class="position-fixed p-3 opacity-25"
        />
      </div>
    </div>
    <router-view />
  </div>
</template>
