import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Recipe } from './recipe'

export const useFavoriteStore = defineStore('favorite', () => {
  const favoriteRecipes = ref<Recipe[]>([])

  // LocalStorageから初期データを読み込む
  const loadFavorites = () => {
    const saved = localStorage.getItem('favoriteRecipes')
    if (saved) {
      favoriteRecipes.value = JSON.parse(saved)
    }
  }

  // 変更があった時にLocalStorageに保存
  watch(favoriteRecipes, (newValue) => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(newValue))
  }, { deep: true })

  const addToFavorites = (recipe: Recipe) => {
    if (!favoriteRecipes.value.some((r: Recipe) => r.id === recipe.id)) {
      favoriteRecipes.value.push(recipe)
    }
  }

  const removeFromFavorites = (recipeId: number) => {
    favoriteRecipes.value = favoriteRecipes.value.filter((r: Recipe) => r.id !== recipeId)
  }

  const isFavorite = (recipeId: number) => {
    return favoriteRecipes.value.some((r: Recipe) => r.id === recipeId)
  }

  // 初期データの読み込み
  loadFavorites()

  return {
    favoriteRecipes,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  }
}) 