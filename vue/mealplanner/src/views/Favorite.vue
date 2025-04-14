<!--
  @author: wangjw.dev
  @description: Favorite recipes component for managing saved recipes
-->
<script setup lang="ts">
import { useFavoriteStore } from '../stores/favorite'
import { usePlannerStore } from '../stores/planner'
import { Timer, Food, Star } from '@element-plus/icons-vue'

const favoriteStore = useFavoriteStore()
const plannerStore = usePlannerStore()

const addToPlanner = (recipe: any) => {
  plannerStore.showDaySelector = true
  plannerStore.selectedRecipe = recipe
}

const removeFromFavorites = (recipeId: number) => {
  favoriteStore.removeFromFavorites(recipeId)
}
</script>

<template>
  <div class="favorite-page">
    <h1>お気に入りレシピ</h1>
    
    <div v-if="favoriteStore.favoriteRecipes.length === 0" class="no-favorites">
      <p>まだお気に入りのレシピがありません。</p>
      <p>ホーム画面でレシピをお気に入りに追加してください。</p>
    </div>

    <div v-else class="recipe-grid">
      <el-row :gutter="30">
        <el-col v-for="recipe in favoriteStore.favoriteRecipes" :key="recipe.id" :span="6">
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
              <div class="button-group">
                <el-button
                  type="primary"
                  class="add-button"
                  @click="addToPlanner(recipe)"
                >
                  Add to Planner
                </el-button>
                <el-button
                  type="danger"
                  class="remove-button"
                  @click="removeFromFavorites(recipe.id)"
                >
                  <el-icon><Star /></el-icon>
                  Remove from Favorites
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.favorite-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 40px;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}

.no-favorites {
  text-align: center;
  color: #666;
  margin: 40px 0;
}

.recipe-grid {
  width: 100%;
  padding: 10px 0;
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

.button-group {
  display: grid;
  grid-template-rows: auto auto;
  gap: 8px;
}

.add-button,
.remove-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin: 0;
}

.el-icon {
  vertical-align: middle;
}
</style> 