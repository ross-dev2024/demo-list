<template>
  <div class="content-wrapper">
    <div class="recipes-header">
      <h1>Recipes</h1>
      <div class="header-actions">
        <el-button type="primary" :icon="Plus">Add New Recipe</el-button>
      </div>
    </div>

    <div class="recipes-content">
      <!-- レシピ一覧 -->
      <el-row :gutter="30">
        <el-col v-for="recipe in recipes" :key="recipe.id" :span="6">
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
              <div class="recipe-actions">
                <el-button type="primary" @click="editRecipe(recipe)">Edit</el-button>
                <el-button type="danger" @click="deleteRecipe(recipe.id)">Delete</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Timer, Food, Plus } from '@element-plus/icons-vue'

const recipes = ref([
  {
    id: 1,
    name: 'Baked Fish with Lemon Butter',
    cookingTime: '10 min',
    calories: '166 cal',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format'
  },
  {
    id: 2,
    name: 'Roasted Halibut Fish Tacos',
    cookingTime: '15 min',
    calories: '137 cal',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&auto=format'
  }
])

const editRecipe = (recipe: any) => {
  console.log('Edit recipe:', recipe)
}

const deleteRecipe = (id: number) => {
  recipes.value = recipes.value.filter(recipe => recipe.id !== id)
}
</script>

<style scoped>
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.recipes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.recipes-header h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin: 0;
}

.recipes-content {
  margin-bottom: 40px;
}

.recipe-card {
  overflow: hidden;
  margin-bottom: 20px;
  transition: transform 0.3s;
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

.recipe-actions {
  display: flex;
  gap: 10px;
}

.recipe-actions .el-button {
  flex: 1;
}

.el-icon {
  vertical-align: middle;
}
</style> 