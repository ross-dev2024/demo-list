<template>
  <div class="recipes">
    <el-container>
      <el-header>
        <el-menu mode="horizontal" router>
          <el-menu-item index="/">EatWell101</el-menu-item>
          <el-menu-item index="/planner">Meal Planner</el-menu-item>
          <el-menu-item index="/recipes">Recipes</el-menu-item>
        </el-menu>
      </el-header>
      
      <el-main>
        <div class="search-section">
          <el-input
            v-model="searchQuery"
            placeholder="Search recipes..."
            class="search-input"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          
          <div class="filters">
            <el-select v-model="selectedCategory" placeholder="Category">
              <el-option
                v-for="category in categories"
                :key="category"
                :label="category"
                :value="category"
              />
            </el-select>
            
            <el-select v-model="selectedDiet" placeholder="Diet">
              <el-option
                v-for="diet in diets"
                :key="diet"
                :label="diet"
                :value="diet"
              />
            </el-select>
          </div>
        </div>
        
        <el-row :gutter="20">
          <el-col
            v-for="recipe in filteredRecipes"
            :key="recipe.id"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
          >
            <el-card :body-style="{ padding: '0px' }" class="recipe-card">
              <el-image :src="recipe.image" class="recipe-image" />
              <div class="recipe-info">
                <h3>{{ recipe.name }}</h3>
                <p>{{ recipe.description }}</p>
                <div class="recipe-footer">
                  <span>{{ recipe.cookingTime }} min</span>
                  <el-button type="primary" @click="addToPlanner(recipe)">
                    Add to Planner
                  </el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedDiet = ref('')

const categories = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Appetizers',
  'Desserts'
]

const diets = [
  'All',
  'Vegetarian',
  'Vegan',
  'Gluten-free',
  'Keto',
  'Paleo'
]

// Mock recipes data
const recipes = ref([
  {
    id: 1,
    name: 'Baked Fish with Lemon Butter',
    description: 'Delicious baked fish with fresh lemon and herbs',
    image: 'https://placehold.co/400x300?text=Fish+Recipe',
    cookingTime: 30,
    category: 'Dinner',
    diet: 'Gluten-free'
  },
  {
    id: 2,
    name: 'Vegetarian Pasta',
    description: 'Fresh pasta with seasonal vegetables',
    image: 'https://placehold.co/400x300?text=Pasta+Recipe',
    cookingTime: 25,
    category: 'Dinner',
    diet: 'Vegetarian'
  },
  {
    id: 3,
    name: 'Keto Breakfast Bowl',
    description: 'High protein, low carb breakfast bowl',
    image: 'https://placehold.co/400x300?text=Breakfast+Bowl',
    cookingTime: 15,
    category: 'Breakfast',
    diet: 'Keto'
  }
])

const filteredRecipes = computed(() => {
  return recipes.value.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = !selectedCategory.value || recipe.category === selectedCategory.value
    const matchesDiet = !selectedDiet.value || selectedDiet.value === 'All' || recipe.diet === selectedDiet.value
    return matchesSearch && matchesCategory && matchesDiet
  })
})

const addToPlanner = (recipe: any) => {
  // TODO: Implement add to planner functionality
  console.log('Adding to planner:', recipe)
}
</script>

<style scoped>
.recipes {
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

.search-section {
  margin-bottom: 40px;
}

.search-input {
  margin-bottom: 20px;
}

.filters {
  display: flex;
  gap: 20px;
}

.recipe-card {
  margin-bottom: 20px;
  transition: transform 0.3s;
}

.recipe-card:hover {
  transform: translateY(-5px);
}

.recipe-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.recipe-info {
  padding: 20px;
}

.recipe-info h3 {
  margin: 0 0 10px;
  font-size: 1.2rem;
  color: #2c3e50;
}

.recipe-info p {
  color: #666;
  margin-bottom: 15px;
}

.recipe-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.recipe-footer span {
  color: #999;
}
</style> 