<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home'
})
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { List, Calendar, Download, Search, Timer, Food } from '@element-plus/icons-vue'
import { usePlannerStore } from '../stores/planner'
import { useRecipeStore } from '../stores/recipe'
import AppHeader from '../components/AppHeader.vue'
import cookingPotSvg from '../assets/images/cooking-pot.svg'
import mealPlannerSvg from '../assets/images/meal-planner.svg'
import groceryBagSvg from '../assets/images/grocery-bag.svg'

const plannerStore = usePlannerStore()
const recipeStore = useRecipeStore()

// サンプル画像のインポート
const defaultImage = 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format'
const fishTacosImage = 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&auto=format'
const fishFilletsImage = 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format'
const easyTacosImage = 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&auto=format'

// コンポーネントマウント時にレシピを初期化
onMounted(() => {
  recipeStore.initializeRecipes()
})

const weekDays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
const showDaySelector = ref(false)

const handleSearch = () => {
  recipeStore.setShowRecipes(true)
}

const addToPlanner = (recipe: any) => {
  recipeStore.setSelectedRecipe(recipe)
  showDaySelector.value = true
}

const handleDaySelect = (day: string) => {
  if (recipeStore.selectedRecipe) {
    plannerStore.addRecipe(day, recipeStore.selectedRecipe)
    showDaySelector.value = false
    recipeStore.setSelectedRecipe(null)
  }
}
</script>

<template>
  <div class="content-wrapper">
    <h1>Meal Planning Made Easy</h1>
    <p class="subtitle">A magical new way to plan your meals. Groundbreaking organizing features designed to save time, customize your weekly meal plan based on your diet and eating habits.</p>
    
    <div class="features">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card>
            <div class="feature-image">
              <img :src="cookingPotSvg" alt="Choose meals" />
            </div>
            <div class="feature-content">
              <div class="feature-number">1</div>
              <div class="feature-text">Choose Your Meals</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <div class="feature-image">
              <img :src="mealPlannerSvg" alt="Add to planner" />
            </div>
            <div class="feature-content">
              <div class="feature-number">2</div>
              <div class="feature-text">Add To The Meal Planner</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <div class="feature-image">
              <img :src="groceryBagSvg" alt="Download plan" />
            </div>
            <div class="feature-content">
              <div class="feature-number">3</div>
              <div class="feature-text">Download Your Meal Plan</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 検索セクション -->
    <div class="search-section">
      <div class="search-box">
        <el-input
          v-model="recipeStore.searchQuery"
          placeholder="Search recipes..."
          class="search-input"
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-button type="primary" @click="handleSearch">Search</el-button>
      </div>
      
      <!-- <div class="search-options">
        <span class="or-text">OR</span>
        <div class="option-buttons">
          <el-button>Add a recipe from the web</el-button>
        </div>
      </div> -->
    </div>

    <!-- レシピ一覧 -->
    <div v-if="recipeStore.showRecipes" class="recipe-grid">
      <el-row :gutter="30">
        <el-col v-for="recipe in recipeStore.filteredRecipes" :key="recipe.id" :span="6">
          <el-card class="recipe-card" :body-style="{ padding: '0px' }">
            <div class="recipe-image-container">
              <img :src="recipe.image" class="recipe-image" :alt="recipe.name" />
            </div>
            <div class="recipe-info">
              <h3>{{ recipe.name }}</h3>
              <div class="recipe-meta">
                <span>
                  <el-icon><Timer /></el-icon>
                  {{ recipe.cookingTime }}
                </span>
                <span>
                  <el-icon><Food /></el-icon>
                  {{ recipe.calories }}
                </span>
              </div>
              <el-button type="primary" class="add-button" @click="addToPlanner(recipe)">
                Add to Planner
              </el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>

  <!-- 曜日選択ポップアップ -->
  <el-dialog
    v-model="showDaySelector"
    title="Select Day"
    width="800px"
    :show-close="true"
    :close-on-click-modal="true"
  >
    <div class="day-selector">
      <el-button
        v-for="day in weekDays"
        :key="day"
        class="day-button"
        :class="{
          'weekend-button': day === 'SATURDAY' || day === 'SUNDAY'
        }"
        @click="handleDaySelect(day)"
      >
        {{ day }}
      </el-button>
    </div>
  </el-dialog>
</template>

<style scoped>
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

h1 {
  font-size: 2.5rem;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 10px;
  margin-top: 20px;
}

.subtitle {
  text-align: center;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.4;
  margin-bottom: 10px;
}

.features {
  margin-top: 0;
  margin-bottom: 0;
}

.el-card {
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature-content {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.feature-number {
  width: 28px;
  height: 28px;
  background-color: #0C713D;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  margin-right: 8px;
}

.feature-text {
  font-size: 1rem;
  color: #2c3e50;
  font-weight: bold;
}

.feature-image {
  text-align: center;
  margin-bottom: 5px;
}

.feature-image img {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.search-section {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 5px;
  position: relative;
}

.search-box {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  background-color: white;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.search-input {
  flex-grow: 1;
}

.search-options {
  text-align: center;
}

.or-text {
  display: block;
  color: #666;
  margin: 20px 0;
}

.option-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.recipe-grid {
  width: 100%;
  padding: 10px 0;
}

.el-row {
  margin-bottom: 40px !important;
}

.el-col {
  margin-bottom: 60px;
}

.recipe-card {
  overflow: hidden;
  transition: transform 0.3s;
  height: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.recipe-card:hover {
  transform: translateY(-5px);
}

.recipe-image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  background-color: #f5f5f5;
}

.recipe-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.recipe-card:hover .recipe-image {
  transform: scale(1.05);
}

.recipe-info {
  padding: 15px;
}

.recipe-info h3 {
  margin: 0 0 10px;
  font-size: 1rem;
  color: #2c3e50;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recipe-meta {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.recipe-meta span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.add-button {
  width: 100%;
}

.el-icon {
  vertical-align: middle;
}

.day-selector {
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 20px 0;
}

.day-button {
  flex: 1;
  height: 50px;
  font-size: 0.9rem;
  padding: 0 10px;
  white-space: nowrap;
}

.day-button:hover {
  background-color: #e1f3e8;
  border-color: #0C713D;
  color: #0C713D;
}

.weekend-button {
  background-color: #fdf6ec;
  border-color: #e6a23c;
  color: #e6a23c;
}

.weekend-button:hover {
  background-color: #faecd8;
  border-color: #e6a23c;
  color: #e6a23c;
}
</style> 