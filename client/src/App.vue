<script setup>
import Navbar from './components/Navbar.vue';
import BoutonHall from './pages/BoutonHall.vue';
</script>

<template>
  <div>
    <Navbar />

    <!-- Routed pages will render here -->
    <router-view />
  </div>
</template>

<style scoped>
</style>
