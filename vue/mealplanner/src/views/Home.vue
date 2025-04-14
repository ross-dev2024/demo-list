<script setup lang="ts">
import { ref } from 'vue'
import { List, Calendar, Download, Search, Timer, Food } from '@element-plus/icons-vue'
import cookingPotSvg from '../assets/images/cooking-pot.svg'
import mealPlannerSvg from '../assets/images/meal-planner.svg'
import groceryBagSvg from '../assets/images/grocery-bag.svg'

// サンプル画像のインポート
const defaultImage = 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format'
const fishTacosImage = 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&auto=format'
const fishFilletsImage = 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format'
const easyTacosImage = 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&auto=format'

const searchQuery = ref('')
const recipes = ref([
  {
    id: 1,
    name: 'Baked Fish with Lemon Butter',
    cookingTime: '10 min',
    calories: '166 cal',
    image: defaultImage
  },
  {
    id: 2,
    name: 'Roasted Halibut Fish Tacos',
    cookingTime: '15 min',
    calories: '137 cal',
    image: fishTacosImage
  },
  {
    id: 3,
    name: 'One-Pan Fish Fillets with Quinoa',
    cookingTime: '25 min',
    calories: '180 cal',
    image: fishFilletsImage
  },
  {
    id: 4,
    name: 'Easy Fish Tacos Recipe',
    cookingTime: '20 min',
    calories: '227 cal',
    image: easyTacosImage
  }
])

const showRecipes = ref(false)

const handleSearch = () => {
  showRecipes.value = true
}

const addToPlanner = (recipe: any) => {
  // TODO: プランナーに追加する処理
  console.log('Adding to planner:', recipe)
}
</script>

<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-menu mode="horizontal" router>
          <el-menu-item index="/">EatWell101</el-menu-item>
          <el-menu-item index="/planner">Meal Planner</el-menu-item>
          <el-menu-item index="/recipes">Recipes</el-menu-item>
        </el-menu>
      </el-header>
      
      <el-main>
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
                v-model="searchQuery"
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
          <div v-if="showRecipes" class="recipe-grid">
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
                    <el-button type="primary" class="add-button" @click="addToPlanner(recipe)">
                      Add to Planner
                    </el-button>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.home {
  height: 100vh;
  overflow: hidden;
  display: flex;
}

.el-container {
  width: 100%;
}

.el-header {
  padding: 0;
}

.el-main {
  max-width: none;
  margin: 0 auto;
  padding: 40px 40px;
  overflow-y: auto;
  height: calc(100vh - 60px);
}

.el-main > div {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 2.5rem;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}

.subtitle {
  text-align: center;
  color: #666;
  max-width: 800px;
  margin: 0 auto 40px;
  font-size: 1.2rem;
  line-height: 1.6;
}

.features {
  margin-top: 60px;
  margin-bottom: 120px;
}

.el-card {
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature-content {
  display: flex;
  align-items: center;
  margin-top: 30px;
}

.feature-number {
  width: 40px;
  height: 40px;
  background-color: #0C713D;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 15px;
}

.feature-text {
  font-size: 1.2rem;
  color: #2c3e50;
  font-weight: bold;
}

.feature-image {
  text-align: center;
  margin-bottom: 20px;
}

.feature-image img {
  width: 150px;
  height: 150px;
  object-fit: contain;
}

.search-section {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  position: relative;
}

.search-box {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  background-color: white;
  padding: 20px;
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

.add-button {
  width: 100%;
}

.el-icon {
  vertical-align: middle;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.features {
  margin: 0;
  padding: 40px 0;
}
</style> 