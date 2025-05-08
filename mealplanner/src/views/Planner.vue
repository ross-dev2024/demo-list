<template>
  <div class="content-wrapper">
    <div class="planner-header">
      <h1>YOUR 7-DAY MEAL PLANNER</h1>
      <div class="header-actions">
        <!-- <el-button type="primary" :icon="Calendar">Edit Date</el-button> -->
      </div>
    </div>

    <div class="planner-content">
      <div v-for="day in weekDays" :key="day" class="day-section">
        <div class="day-header" :class="{ 'weekend': day === 'SATURDAY' || day === 'SUNDAY' }">
          <h2>{{ day }}</h2>
        </div>
        <div class="day-content">
          <div class="recipe-list">
            <div v-for="(recipe, index) in plannerStore.getRecipesForDay(day)" 
                 :key="index" 
                 class="recipe-item">
              <div class="recipe-image">
                <img :src="recipe.image" :alt="recipe.name">
              </div>
              <div class="recipe-details">
                <h3>{{ recipe.name }}</h3>
                <div class="recipe-meta">
                  <span><el-icon><Timer /></el-icon>{{ recipe.cookingTime }}</span>
                  <span><el-icon><Food /></el-icon>{{ recipe.calories }}</span>
                </div>
              </div>
              <div class="recipe-actions">
                <el-button type="primary" size="small" @click="editRecipe(day, index)">
                  <el-icon><Edit /></el-icon>
                </el-button>
                <el-button type="danger" size="small" @click="removeRecipe(day, index)">
                  <el-icon><Delete /></el-icon>
                </el-button>
              </div>
            </div>
          </div>
          
          <el-button class="add-recipe-btn" @click="showAddRecipe(day)">
            <el-icon><Plus /></el-icon>
            Add Recipe
          </el-button>
        </div>
      </div>
    </div>

    <div class="planner-footer">
      <el-button type="success" size="large">
        Download Meal Plan
      </el-button>
    </div>
  </div>

  <!-- レシピ追加/編集ポップアップ -->
  <el-dialog
    v-model="showRecipeDialog"
    :title="isEditing ? 'Edit Recipe' : 'Add Recipes'"
    width="70%"
    @open="handleDialogOpen"
  >
    <div class="recipe-dialog-content">
      <div class="search-section">
        <el-input
          v-model="searchQuery"
          placeholder="Search recipes by name, cooking time, or calories..."
          class="search-input"
          @input="handleSearch"
          clearable
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        
        <div class="search-filters">
          <el-select v-model="sortBy" placeholder="Sort by" style="width: 120px">
            <el-option label="Name" value="name" />
            <el-option label="Cooking Time" value="cookingTime" />
            <el-option label="Calories" value="calories" />
          </el-select>
        </div>
      </div>

      <div v-if="!isEditing" class="selected-recipes">
        <el-tag
          v-for="recipe in selectedRecipes"
          :key="recipe.id"
          closable
          @close="toggleRecipeSelection(recipe)"
        >
          {{ recipe.name }}
        </el-tag>
      </div>

      <div class="recipe-grid">
        <el-row :gutter="20">
          <el-col v-for="recipe in sortedRecipes" 
                 :key="recipe.id" 
                 :span="6">
            <el-card class="recipe-card" 
                    :class="{ 'selected': isRecipeSelected(recipe) }"
                    @click="toggleRecipeSelection(recipe)">
              <div class="recipe-image-container">
                <img :src="recipe.image" :alt="recipe.name" class="recipe-image" />
                <div v-if="isRecipeSelected(recipe)" class="selected-overlay">
                  <el-icon class="check-icon"><Check /></el-icon>
                </div>
              </div>
              <div class="recipe-info">
                <h3>{{ recipe.name }}</h3>
                <div class="recipe-meta">
                  <span><el-icon><Timer /></el-icon>{{ recipe.cookingTime }}</span>
                  <span><el-icon><Food /></el-icon>{{ recipe.calories }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showRecipeDialog = false">Cancel</el-button>
        <el-button 
          type="primary" 
          @click="confirmRecipeSelection" 
          :disabled="selectedRecipes.length === 0"
        >
          {{ isEditing ? 'Update' : 'Add Selected' }}
          <span v-if="!isEditing && selectedRecipes.length > 0">
            ({{ selectedRecipes.length }})
          </span>
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<!--
  @author: wangjw.dev
  @description: Meal planner component for organizing weekly meals
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Edit, Delete, Plus, Timer, Food, Search, Check } from '@element-plus/icons-vue'
import { usePlannerStore } from '../stores/planner'
import { useRecipeStore } from '../stores/recipe'

const plannerStore = usePlannerStore()
const recipeStore = useRecipeStore()

const weekDays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
const showRecipeDialog = ref(false)
const searchQuery = ref('')
const selectedRecipes = ref<any[]>([])
const currentDay = ref('')
const currentIndex = ref(-1)
const isEditing = ref(false)
const sortBy = ref('name')

const filteredRecipes = computed(() => {
  if (!searchQuery.value) return recipeStore.recipes
  const query = searchQuery.value.toLowerCase()
  return recipeStore.recipes.filter(recipe => 
    recipe.name.toLowerCase().includes(query)
  )
})

const sortedRecipes = computed(() => {
  let sorted = [...filteredRecipes.value]
  
  switch (sortBy.value) {
    case 'name':
      sorted.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'cookingTime':
      sorted.sort((a, b) => {
        const timeA = parseInt(a.cookingTime)
        const timeB = parseInt(b.cookingTime)
        return timeA - timeB
      })
      break
    case 'calories':
      sorted.sort((a, b) => {
        const calA = parseInt(a.calories)
        const calB = parseInt(b.calories)
        return calA - calB
      })
      break
  }
  
  return sorted
})

const handleSearch = () => {
  // 必要に応じて追加の検索ロジックを実装
}

const showAddRecipe = (day: string) => {
  currentDay.value = day
  isEditing.value = false
  selectedRecipes.value = []
  showRecipeDialog.value = true
  searchQuery.value = ''
  if (recipeStore.recipes.length === 0) {
    recipeStore.initializeRecipes()
  }
}

const editRecipe = (day: string, index: number) => {
  currentDay.value = day
  currentIndex.value = index
  isEditing.value = true
  const recipe = plannerStore.getRecipesForDay(day)[index]
  selectedRecipes.value = [recipe]
  showRecipeDialog.value = true
  searchQuery.value = ''
  if (recipeStore.recipes.length === 0) {
    recipeStore.initializeRecipes()
  }
}

const removeRecipe = (day: string, index: number) => {
  plannerStore.removeRecipe(day, index)
}

const toggleRecipeSelection = (recipe: any) => {
  const index = selectedRecipes.value.findIndex(r => r.id === recipe.id)
  if (index === -1) {
    selectedRecipes.value.push(recipe)
  } else {
    selectedRecipes.value.splice(index, 1)
  }
}

const isRecipeSelected = (recipe: any) => {
  return selectedRecipes.value.some(r => r.id === recipe.id)
}

const confirmRecipeSelection = () => {
  if (selectedRecipes.value.length === 0 || !currentDay.value) return
  
  if (isEditing.value) {
    plannerStore.updateRecipe(currentDay.value, currentIndex.value, selectedRecipes.value[0])
  } else {
    selectedRecipes.value.forEach(recipe => {
      plannerStore.addRecipe(currentDay.value, recipe)
    })
  }
  
  showRecipeDialog.value = false
  selectedRecipes.value = []
}

const handleDialogOpen = () => {
  if (recipeStore.recipes.length === 0) {
    recipeStore.initializeRecipes()
  }
  sortBy.value = 'name'
}
</script>

<style scoped>
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 40px 0 40px;
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

.day-header.weekend {
  background: #e1f3e8;
}

.day-header h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #2c3e50;
}

.day-content {
  padding: 15px;
  min-height: 100px;
}

.recipe-list {
  margin-bottom: 10px;
}

.recipe-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  margin-bottom: 8px;
  background: #fff;
}

.recipe-image {
  width: 80px;
  height: 60px;
  flex-shrink: 0;
  margin-right: 12px;
}

.recipe-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.recipe-details {
  flex: 1;
  min-width: 0;
  padding-right: 8px;
}

.recipe-details h3 {
  margin: 0 0 4px;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #2c3e50;
}

.recipe-details p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.recipe-meta {
  display: flex;
  gap: 15px;
  font-size: 0.8rem;
  color: #666;
}

.recipe-meta span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.recipe-actions {
  display: flex;
  gap: 8px;
  margin-left: 10px;
}

.add-recipe-btn {
  width: 100%;
  height: 36px;
  border: 1px dashed #dcdfe6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #409EFF;
  transition: all 0.3s;
  background: #fff;
}

.add-recipe-btn:hover {
  border-color: #409EFF;
  color: #409EFF;
  background: #ecf5ff;
}

.add-recipe-btn .el-icon {
  margin-right: 4px;
  font-size: 16px;
}

.planner-footer {
  margin-top: 40px;
  text-align: center;
}

/* ダイアログスタイル */
.recipe-dialog-content {
  padding: 10px 0;
}

.search-section {
  margin-bottom: 12px;
  display: flex;
  gap: 8px;
  align-items: center;
}

.search-input {
  flex: 1;
}

.search-filters {
  display: flex;
  gap: 10px;
}

.recipe-grid {
  max-height: 60vh;
  overflow-y: auto;
}

.recipe-card {
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  position: relative;
}

.recipe-card.selected {
  border: 2px solid #409EFF;
  transform: translateY(-2px);
}

.recipe-image-container {
  height: 140px;
  overflow: hidden;
}

.recipe-card .recipe-image {
  width: 100%;
  height: 100%;
  margin-right: 0;
}

.recipe-info {
  padding: 10px;
}

.recipe-info h3 {
  margin: 0 0 8px;
  font-size: 0.9rem;
  line-height: 1.2;
}

.dialog-footer {
  margin-top: 20px;
  text-align: right;
}

.selected-recipes {
  margin: 8px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.selected-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(64, 158, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.check-icon {
  font-size: 24px;
  color: #409EFF;
  background: white;
  border-radius: 50%;
  padding: 4px;
}

.el-dialog__header {
  padding: 15px 20px !important;
  margin-right: 0;
  border-bottom: 1px solid #e4e7ed;
}

.el-dialog__body {
  padding: 15px 20px !important;
}

.el-dialog__title {
  font-size: 1.1rem;
  font-weight: 600;
}
</style> 