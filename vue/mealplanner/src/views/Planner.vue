<template>
  <div class="planner">
    <el-container>
      <el-header>
        <el-menu mode="horizontal" router>
          <el-menu-item index="/">EatWell101</el-menu-item>
          <el-menu-item index="/planner">Meal Planner</el-menu-item>
          <el-menu-item index="/recipes">Recipes</el-menu-item>
        </el-menu>
      </el-header>
      
      <el-main>
        <h2>Your 7-Day Meal Planner</h2>
        
        <el-row :gutter="20">
          <el-col :span="16">
            <div class="meal-calendar">
              <div v-for="day in weekDays" :key="day" class="day-plan">
                <h3>{{ day }}</h3>
                <el-card v-if="mealPlan[day]">
                  <template #header>
                    <div class="meal-header">
                      <span>{{ mealPlan[day].name }}</span>
                      <el-button type="text" @click="removeMeal(day)">
                        <el-icon><Delete /></el-icon>
                      </el-button>
                    </div>
                  </template>
                  <p>{{ mealPlan[day].description }}</p>
                </el-card>
                <el-empty v-else description="No meal planned" />
              </div>
            </div>
          </el-col>
          
          <el-col :span="8">
            <div class="actions">
              <el-button type="primary" @click="downloadPlan">
                Download Meal Plan
              </el-button>
              <el-button type="success" @click="getShoppingList">
                Get Shopping List
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Delete } from '@element-plus/icons-vue'

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const mealPlan = ref<Record<string, { name: string; description: string }>>({})

const removeMeal = (day: string) => {
  delete mealPlan.value[day]
}

const downloadPlan = () => {
  // TODO: Implement download functionality
  console.log('Downloading plan...')
}

const getShoppingList = () => {
  // TODO: Implement shopping list generation
  console.log('Generating shopping list...')
}
</script>

<style scoped>
.planner {
  min-height: 100vh;
}

.el-header {
  padding: 0;
}

.el-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

h2 {
  text-align: center;
  margin-bottom: 40px;
  color: #2c3e50;
}

.meal-calendar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.day-plan {
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}

.day-plan h3 {
  margin-bottom: 10px;
  color: #2c3e50;
}

.meal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: sticky;
  top: 20px;
}

.el-button {
  width: 100%;
}
</style> 