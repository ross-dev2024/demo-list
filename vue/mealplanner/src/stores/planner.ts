import { defineStore } from 'pinia'

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

interface PlannerState {
  mealPlan: {
    [key: string]: DayPlan
  }
}

export const usePlannerStore = defineStore('planner', {
  state: (): PlannerState => ({
    mealPlan: {
      MONDAY: { recipes: [] },
      TUESDAY: { recipes: [] },
      WEDNESDAY: { recipes: [] },
      THURSDAY: { recipes: [] },
      FRIDAY: { recipes: [] },
      SATURDAY: { recipes: [] },
      SUNDAY: { recipes: [] }
    }
  }),

  actions: {
    addRecipe(day: string, recipe: Recipe) {
      this.mealPlan[day].recipes.push(recipe)
    },

    removeRecipe(day: string, recipeId: number) {
      this.mealPlan[day].recipes = this.mealPlan[day].recipes.filter(
        recipe => recipe.id !== recipeId
      )
    },

    clearDay(day: string) {
      this.mealPlan[day].recipes = []
    }
  }
}) 