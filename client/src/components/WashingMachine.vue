<script setup>
import { ref } from 'vue';
import washingMachine from '../assets/washing-machine.png'

const status = ref('Idle') //this is dummy javascript. You can remove it
</script>

<template>
    <div>
        <img class="washingMachine":src="washingMachine" alt="Washing Machine" />
        <h1 class="status">Status: {{ status }}</h1> <!--Change this if you want-->
        <button @click="status = status === 'Idle' ? 'Running' : 'Idle'">Toggle</button> <!--this is also dummy javascript that you can remove-->
    </div>
</template>

<style scoped>
 .washingMachine {
    width: 150px;
    height: auto;
 }

.status {
    padding-top: 10px;
 }
</style>