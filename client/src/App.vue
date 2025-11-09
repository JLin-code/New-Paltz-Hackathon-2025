<script setup>
import Navbar from './components/Navbar.vue';
import BoutonHall from './pages/BoutonHall.vue';
</script>

<template>
  <div>
    <header>
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </header>

    <!-- Routed pages will render here -->
    <router-view />
  </div>
</template>

<style scoped>
</style>
