<script setup>
import { ref } from 'vue';
import dryer from '../assets/tumble-dryer.png'

const status = ref('Idle') //this is dummy javascript. You can remove it
</script>

<template>
    <div>
        <img class="dryer":src="dryer" alt="Dryer" />
        <h1 class="status">Status: {{ status }}</h1> <!--Change this if you want-->
        <button @click="status = status === 'Idle' ? 'Running' : 'Idle'">Toggle</button> <!--this is also dummy javascript that you can remove-->
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