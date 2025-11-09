<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import WashingMachine from "../../components/WashingMachine.vue";
import Dryer from "../../components/Dryer.vue";

const route = useRoute();
const hall = ref(null);
const machines = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchHallData = async () => {
  try {
    loading.value = true;
    error.value = null;

    // Fetch hall data by ID
    const hallResponse = await fetch(`/api/halls/${route.params.id}`);
    if (!hallResponse.ok) {
      throw new Error("Failed to fetch hall data");
    }
    const hallData = await hallResponse.json();
    hall.value = hallData.data;

    // Fetch machines for this hall
    const machinesResponse = await fetch(
      `/api/halls/${route.params.id}/machines`
    );
    if (!machinesResponse.ok) {
      throw new Error("Failed to fetch machines data");
    }
    const machinesData = await machinesResponse.json();
    machines.value = machinesData.data;
  } catch (err) {
    error.value = err.message;
    console.error("Error fetching hall data:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchHallData();
});

// Filter machines by type
const washingMachines = computed(() =>
  machines.value.filter((machine) => machine.type === "washer")
);

const dryers = computed(() =>
  machines.value.filter((machine) => machine.type === "dryer")
);
</script>

<template>
  <div v-if="loading" class="loading">Loading hall data...</div>

  <div v-else-if="error" class="error">Error: {{ error }}</div>

  <div v-else-if="hall" class="hall-container">
    <h1 class="hall-title">{{ hall.name }}</h1>

    <div v-if="washingMachines.length > 0" class="machine-section">
      <h2>Washing Machines</h2>
      <div class="machine-grid">
        <WashingMachine
          v-for="machine in washingMachines"
          :key="machine.id"
          :machine="machine"
        />
      </div>
    </div>

    <div v-if="dryers.length > 0" class="machine-section">
      <h2>Dryers</h2>
      <div class="dryer-grid">
        <Dryer v-for="machine in dryers" :key="machine.id" :machine="machine" />
      </div>
    </div>

    <div
      v-if="washingMachines.length === 0 && dryers.length === 0"
      class="no-machines"
    >
      No machines available in this hall.
    </div>
  </div>
</template>

<style scoped>
.hall-container {
  padding: 20px;
}

.hall-title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.machine-section {
  margin-bottom: 40px;
}

.machine-section h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #666;
}

.machine-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding-top: 20px;
}

.dryer-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  padding-top: 20px;
}

.loading,
.error {
  text-align: center;
  padding: 40px;
  font-size: 18px;
}

.error {
  color: #e74c3c;
}

.loading {
  color: #3498db;
}

.no-machines {
  text-align: center;
  padding: 40px;
  color: #999;
  font-style: italic;
}
</style>
