import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Recipe {
  id: number
  name: string
  cookingTime: string
  calories: string
  image: string
}

interface DayPlan {
  recipes: Recipe[]
}

interface MealPlan {
  [key: string]: DayPlan
}

export const usePlannerStore = defineStore('planner', () => {
  const mealPlan = ref<MealPlan>({
    'MONDAY': { recipes: [] },
    'TUESDAY': { recipes: [] },
    'WEDNESDAY': { recipes: [] },
    'THURSDAY': { recipes: [] },
    'FRIDAY': { recipes: [] },
    'SATURDAY': { recipes: [] },
    'SUNDAY': { recipes: [] }
  })

  function addRecipe(day: string, recipe: Recipe) {
    mealPlan.value[day].recipes.push({ ...recipe })
  }

  function removeRecipe(day: string, index: number) {
    mealPlan.value[day].recipes.splice(index, 1)
  }

  function updateRecipe(day: string, index: number, recipe: Recipe) {
    mealPlan.value[day].recipes[index] = { ...recipe }
  }

  function getRecipesForDay(day: string): Recipe[] {
    return mealPlan.value[day].recipes
  }

  return {
    mealPlan,
    addRecipe,
    removeRecipe,
    updateRecipe,
    getRecipesForDay
  }
}) 