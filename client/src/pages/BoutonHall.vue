<script setup>
import WashingMachine from '../components/WashingMachine.vue';
import Dryer from '../components/Dryer.vue';
</script>

<template>
    <div class="machine-grid">
        <WashingMachine v-for="i in 6" :key="i" />
    </div>
    <div class="dryer-grid">
        <Dryer v-for="i in 6" :key="i" />
    </div>
</template>

<style scoped>
.machine-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    padding-top: 50px;
}
.dryer-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    padding-top: 50px;
}
</style>