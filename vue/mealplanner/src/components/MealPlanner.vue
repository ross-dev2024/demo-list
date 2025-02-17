<script setup lang="ts">
import {storeToRefs} from "pinia";

import CalendarDays from "@/components/planner/CalendarDays.vue";

import {usePlannerStore} from "@/stores/planner";

const store = usePlannerStore();
const {recipes} = storeToRefs(store);
</script>

<template>
  <calendar-days
    :date="new Date()"
    :days="7"
    :recipes="recipes"
    :key="`recipes-${recipes.length}`"
  />
</template>
