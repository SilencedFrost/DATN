<script setup lang="ts">
import { ref } from 'vue';

const isViewingPassword = ref<boolean>(false);

const viewPassword = () => {
  isViewingPassword.value = true;

  setTimeout(() => {
    isViewingPassword.value = false;
  }, 500);
};
</script>

<template>
  <div class="card bg-reactive-secondary p-3 form-width">
    <h3 class="text-center text-reactive-primary">Login</h3>
    <hr class="my-2" />
    <form action="#">
      <div class="mb-2">
        <label for="email" class="form-label text-reactive-primary">Email:</label>
        <input
          id="email"
          type="email"
          class="form-control bg-reactive-primary text-reactive-primary"
        />
      </div>
      <div class="mb-2">
        <label for="password" class="form-label text-reactive-primary">Password:</label>
        <div class="input-group">
          <input
            id="password"
            :type="isViewingPassword ? 'text' : 'password'"
            class="form-control bg-reactive-primary text-reactive-primary"
          />

          <button
            class="btn btn-outline-secondary bg-reactive-primary"
            type="button"
            :disabled="isViewingPassword"
            @click="viewPassword"
          >
            <i :class="isViewingPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'" />
          </button>
        </div>
      </div>
      <div class="d-flex flex-column">
        <button class="btn btn-primary text-center mb-2">Sign in</button>
        <button class="btn btn-secondary">
          <i class="bi bi-google me-2" />
          <span>Sign in with google</span>
        </button>
      </div>
    </form>
    <hr class="my-2" />
    <div class="text-center form-text">
      <a href="" class="text-decoration-none text-reactive-secondary">Create account</a>
      |
      <a href="" class="text-decoration-none text-reactive-secondary">Forgot password</a>
    </div>
  </div>
</template>
