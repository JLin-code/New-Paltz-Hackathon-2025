<script setup>
import { ref } from 'vue';

const burgerActive = ref(false);
</script>

<template>
    <div>
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" 
    :class="{ 'is-active': burgerActive }" @click="burgerActive = !burgerActive">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': burgerActive }">
    <div class="navbar-start">
      <RouterLink to="/" class="navbar-item"><i class="fas fa-home"></i>Home</RouterLink>
      <RouterLink to="/BoutonHall" class="navbar-item"><i class="fas fa-home"></i>Bouton Hall</RouterLink>
      <RouterLink to="/AwoostingHall" class="navbar-item"><i class="fas fa-home"></i>Awoosting Hall</RouterLink>
      <RouterLink to="/EsopusHall" class="navbar-item"><i class="fas fa-home"></i>Esopus Hall</RouterLink>
      <RouterLink to="/RidgeviewHall" class="navbar-item"><i class="fas fa-home"></i>Ridgeview Hall</RouterLink>

    </div>

  </div>
</nav>
    </div>
</template>

<style lang="scss" scoped>

</style>