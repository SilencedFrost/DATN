<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const imageUrl: string = '/logo-gray.png';
const opacity: number = 0.1;
const repeat: number = 150;

const width = ref(0);
const height = ref(0);

onMounted(() => {
  if (typeof window !== 'undefined') {
    width.value = window.innerWidth;
    height.value = window.innerHeight;

    const handleResize = () => {
      width.value = window.innerWidth;
      height.value = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    onBeforeUnmount(() => window.removeEventListener('resize', handleResize));
  }
});

const horizontalImageCount = computed<number>(() =>
  width.value ? Math.ceil(width.value / repeat) + 1 : 0,
);

const verticalImageCount = computed<number>(() =>
  height.value ? Math.ceil(height.value / repeat / 2) : 0,
);
</script>

<template>
  <div class="d-flex">
    <client-only>
      <template v-if="width && height">
        <div v-for="verticalIndex in verticalImageCount" :key="`v-${verticalIndex}`">
          <div v-for="horizontalIndex in horizontalImageCount" :key="`h-${horizontalIndex}`">
            <img
              :src="imageUrl"
              :style="{
                maxWidth: `${repeat}px`,
                left: `${repeat * (horizontalIndex - 1)}px`,
                top: `${repeat * (verticalIndex * 2 - 2)}px`,
                opacity: opacity,
              }"
              class="position-fixed p-3"
              loading="lazy"
            />
            <img
              :src="imageUrl"
              :style="{
                maxWidth: `${repeat}px`,
                left: `${repeat * (horizontalIndex - 1.5)}px`,
                top: `${repeat * (verticalIndex * 2 - 1)}px`,
                opacity: opacity,
              }"
              class="position-fixed p-3"
              loading="lazy"
            />
          </div>
        </div>
      </template>
    </client-only>
    <div class="d-flex flex-fill justify-content-center align-items-center">
      <nuxt-page />
    </div>
  </div>
</template>
