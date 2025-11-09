<script setup>
import dryer from '../assets/tumble-dryer.png'
</script>

<template>
    <div>
        <img class="dryer":src="dryer" alt="Dryer" />
        <h1 class="status">Status: </h1> <!--Change this if you want-->
    </div>
</template>

<style scoped>
 .dryer {
    width: 200px;
    height: auto;
 }

 .status {
    padding-top: 10px;
 }
</style>