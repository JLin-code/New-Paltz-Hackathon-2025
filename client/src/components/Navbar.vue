<script setup>
import { ref } from 'vue';

const burgerActive = ref(false);
const parkerDropdown = ref(false);
const peregrineDropdown = ref(false);
const southDropdown = ref(false);
</script>

<template>
    <div>
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <RouterLink to="/" class="navbar-item">
      <img src="/laundry.png" alt="Logo" style="max-height: 2.5rem;">
    </RouterLink>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" 
    :class="{ 'is-active': burgerActive }" @click="burgerActive = !burgerActive">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': burgerActive }">
    <div class="navbar-start"></div>
    
    <div class="navbar-center">
      
      <!-- Parker Complex Dropdown -->
      <div class="navbar-item has-dropdown" :class="{ 'is-active': parkerDropdown }" @click="parkerDropdown = !parkerDropdown">
        <a class="navbar-link">
          Parker Complex
        </a>
        <div class="navbar-dropdown">
          <RouterLink to="/BlissHall" class="navbar-item">Bliss Hall</RouterLink>
          <RouterLink to="/BoutonHall" class="navbar-item">Bouton Hall</RouterLink>
          <RouterLink to="/CapenHall" class="navbar-item">Capen Hall</RouterLink>
          <RouterLink to="/GageHall" class="navbar-item">Gage Hall</RouterLink>
          <RouterLink to="/ScudderHall" class="navbar-item">Scudder Hall</RouterLink>
          <RouterLink to="/ShangoCollegeHall" class="navbar-item">Shango/College Hall</RouterLink>
        </div>
      </div>

      <!-- Peregrine Complex Dropdown -->
      <div class="navbar-item has-dropdown" :class="{ 'is-active': peregrineDropdown }" @click="peregrineDropdown = !peregrineDropdown">
        <a class="navbar-link">
          Peregrine Complex
        </a>
        <div class="navbar-dropdown">
          <RouterLink to="/AshokanHall" class="navbar-item">Ashokan Hall</RouterLink>
          <RouterLink to="/AwoostingHall" class="navbar-item">Awoosting Hall</RouterLink>
          <RouterLink to="/MinnewaskaHall" class="navbar-item">Minnewaska Hall</RouterLink>
          <RouterLink to="/MohonkHall" class="navbar-item">Mohonk Hall</RouterLink>
          <RouterLink to="/ShawangunkHall" class="navbar-item">Shawangunk Hall</RouterLink>
        </div>
      </div>

      <!-- South Complex Dropdown -->
      <div class="navbar-item has-dropdown" :class="{ 'is-active': southDropdown }" @click="southDropdown = !southDropdown">
        <a class="navbar-link">
          South Complex
        </a>
        <div class="navbar-dropdown">
          <RouterLink to="/EsopusHall" class="navbar-item">Esopus Hall</RouterLink>
          <RouterLink to="/LenapeHall" class="navbar-item">Lenape Hall</RouterLink>
          <RouterLink to="/RidgeviewHall" class="navbar-item">Ridgeview Hall</RouterLink>
        </div>
      </div>

    </div>

    <div class="navbar-end"></div>
  </div>
</nav>
    </div>
</template>

<style scoped>

.navbar-center {
   flex-grow: 1; 
   display: flex; 
   justify-content: center; 
   align-items: center;
}

@media screen and (max-width: 1023px) {
  .navbar-center {
    display: block;      
    text-align: center;  
  }
}

</style>