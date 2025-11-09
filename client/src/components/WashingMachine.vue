<script setup>
import washingMachine from '../assets/washing-machine.png'
</script>

<template>
    <div>
        <img class="washingMachine":src="washingMachine" alt="Washing Machine" />
        <h1 class="status">Status: </h1> <!--Change this if you want-->
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