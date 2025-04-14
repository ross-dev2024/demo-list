<template>
  <div class="content-wrapper">
    <div class="planner-header">
      <h1>YOUR 7-DAY MEAL PLANNER</h1>
      <div class="header-actions">
        <el-button type="primary" :icon="Calendar">Edit Date</el-button>
      </div>
    </div>

    <div class="planner-content">
      <div v-for="day in weekDays" :key="day" class="day-section">
        <div class="day-header" :class="{ 'active-day': day === 'MONDAY' }">
          <h2>{{ day }}</h2>
        </div>
        <div class="day-content">
          <template v-if="plannerStore.mealPlan[day].recipes.length > 0">
            <div v-for="recipe in plannerStore.mealPlan[day].recipes" :key="recipe.id" class="recipe-item">
              <div class="recipe-image">
                <img :src="recipe.image" :alt="recipe.name">
              </div>
              <div class="recipe-details">
                <h3>{{ recipe.name }}</h3>
                <p>Cooking time: {{ recipe.cookingTime }}</p>
              </div>
              <div class="recipe-actions">
                <el-button type="danger" :icon="Delete" circle @click="removeRecipe(day, recipe.id)" />
              </div>
            </div>
          </template>
          <div v-else class="empty-day">
            <el-button circle class="add-recipe-btn">+</el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="planner-footer">
      <el-button type="success" size="large">
        Download Meal Plan
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Calendar, Edit, Delete } from '@element-plus/icons-vue'
import { usePlannerStore } from '../stores/planner'

const plannerStore = usePlannerStore()
const weekDays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']

const removeRecipe = (day: string, recipeId: number) => {
  plannerStore.removeRecipe(day, recipeId)
}
</script>

<style scoped>
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.planner-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.planner-header h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin: 0;
}

.day-section {
  margin-bottom: 20px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.day-header {
  background: #f5f7fa;
  padding: 15px 20px;
  border-bottom: 1px solid #e4e7ed;
}

.day-header.active-day {
  background: #e1f3e8;
}

.day-header h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #2c3e50;
}

.day-content {
  padding: 20px;
  min-height: 100px;
}

.recipe-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  margin-bottom: 10px;
}

.recipe-image {
  width: 80px;
  height: 80px;
  margin-right: 15px;
}

.recipe-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.recipe-details {
  flex: 1;
}

.recipe-details h3 {
  margin: 0 0 5px;
  font-size: 1rem;
}

.recipe-details p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.recipe-actions {
  margin-left: 10px;
}

.empty-day {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background: #f5f7fa;
  border-radius: 4px;
}

.add-recipe-btn {
  font-size: 24px;
}

.planner-footer {
  margin-top: 40px;
  text-align: center;
}
</style> 