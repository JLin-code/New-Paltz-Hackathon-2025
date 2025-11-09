<script setup>
import WashingMachine from '../components/WashingMachine.vue';
</script>

<template>
    <div class="machine-grid">
        <WashingMachine v-for="i in 6" :key="i" />
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
</style>