<script setup lang="ts">
import WeatherReport from "./components/WeatherReport.vue";
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <WeatherReport />
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  min-height: 100vh;
  background-color: #f3f4f6;
}
</style>
