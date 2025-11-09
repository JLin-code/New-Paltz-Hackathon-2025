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
      <a class="navbar-item">
        Bouton Hall
      </a>

      <a class="navbar-item">
        Awoosting Hall
      </a>

      <a class="navbar-item">
        Ridgeview Hall
      </a>

      <a class="navbar-item">
        Ridgeview Hall
      </a>

    </div>

  </div>
</nav>
    </div>
</template>

<style lang="scss" scoped>

</style>