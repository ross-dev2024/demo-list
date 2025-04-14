import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface Recipe {
  id: number
  name: string
  cookingTime: string
  calories: string
  image: string
}

export const useRecipeStore = defineStore('recipe', () => {
  // state
  const recipes = ref<Recipe[]>([])
  const searchQuery = ref('')
  const showRecipes = ref(false)
  const selectedRecipe = ref<Recipe | null>(null)

  // レシピデータ（写真とレシピが一致）
  const recipeData = [
    // Page 1
    {
      name: 'Grilled Salmon with Herbs',
      cookingTime: '20 min',
      calories: '350 cal',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format'
    },
    {
      name: 'Fish Tacos with Avocado',
      cookingTime: '25 min',
      calories: '320 cal',
      image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&auto=format'
    },
    {
      name: 'Mediterranean Salad Bowl',
      cookingTime: '15 min',
      calories: '280 cal',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format'
    },
    {
      name: 'Blueberry Pancakes Stack',
      cookingTime: '20 min',
      calories: '400 cal',
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&auto=format'
    },
    {
      name: 'Classic Margherita Pizza',
      cookingTime: '30 min',
      calories: '450 cal',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format'
    },
    {
      name: 'Avocado Toast with Eggs',
      cookingTime: '10 min',
      calories: '300 cal',
      image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500&auto=format'
    },
    {
      name: 'Shrimp Scampi Pasta',
      cookingTime: '25 min',
      calories: '420 cal',
      image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&auto=format'
    },
    {
      name: 'Chicken Caesar Salad',
      cookingTime: '20 min',
      calories: '350 cal',
      image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&auto=format'
    },
    {
      name: 'Asian Vegetable Stir Fry',
      cookingTime: '15 min',
      calories: '250 cal',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format'
    },
    {
      name: 'Gourmet Beef Burger',
      cookingTime: '30 min',
      calories: '650 cal',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format'
    },
    {
      name: 'Quinoa Buddha Bowl',
      cookingTime: '25 min',
      calories: '380 cal',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format'
    },
    {
      name: 'Tuna Poke Bowl',
      cookingTime: '20 min',
      calories: '400 cal',
      image: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=500&auto=format'
    },
    {
      name: 'Berry Greek Yogurt Parfait',
      cookingTime: '10 min',
      calories: '280 cal',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format'
    },
    {
      name: 'Italian Caprese Sandwich',
      cookingTime: '15 min',
      calories: '350 cal',
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format'
    },
    {
      name: 'Homemade Vegetable Soup',
      cookingTime: '35 min',
      calories: '200 cal',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&auto=format'
    },
    {
      name: 'Teriyaki Chicken Bowl',
      cookingTime: '25 min',
      calories: '420 cal',
      image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=500&auto=format'
    },

    // Page 2
    {
      name: 'Assorted Sushi Rolls',
      cookingTime: '45 min',
      calories: '500 cal',
      image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&auto=format'
    },
    {
      name: 'Creamy Mushroom Risotto',
      cookingTime: '35 min',
      calories: '450 cal',
      image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&auto=format'
    },
    {
      name: 'Korean Beef Stir Fry',
      cookingTime: '20 min',
      calories: '380 cal',
      image: 'https://images.unsplash.com/photo-1606850246029-dd00bd5a0d5f?w=500&auto=format'
    },
    {
      name: 'Indian Vegetable Curry',
      cookingTime: '30 min',
      calories: '320 cal',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format'
    },
    {
      name: 'Spanish Seafood Paella',
      cookingTime: '40 min',
      calories: '550 cal',
      image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=500&auto=format'
    },
    {
      name: 'Fresh Greek Salad',
      cookingTime: '15 min',
      calories: '250 cal',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&auto=format'
    },
    {
      name: 'Spicy BBQ Chicken Wings',
      cookingTime: '35 min',
      calories: '480 cal',
      image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500&auto=format'
    },
    {
      name: 'Spinach and Feta Quiche',
      cookingTime: '45 min',
      calories: '400 cal',
      image: 'https://images.unsplash.com/photo-1591119478469-305d68e89950?w=500&auto=format'
    },
    {
      name: 'Mexican Street Tacos',
      cookingTime: '25 min',
      calories: '420 cal',
      image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=500&auto=format'
    },
    {
      name: 'Roasted Vegetable Lasagna',
      cookingTime: '50 min',
      calories: '480 cal',
      image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=500&auto=format'
    },
    {
      name: 'Hawaiian Poke Bowl',
      cookingTime: '20 min',
      calories: '380 cal',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&auto=format'
    },
    {
      name: 'Grilled Chicken Wrap',
      cookingTime: '15 min',
      calories: '350 cal',
      image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&auto=format'
    },
    {
      name: 'Chinese Fried Rice',
      cookingTime: '20 min',
      calories: '400 cal',
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&auto=format'
    },
    {
      name: 'Thai Green Curry',
      cookingTime: '30 min',
      calories: '300 cal',
      image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&auto=format'
    },
    {
      name: 'Grilled Ribeye Steak',
      cookingTime: '25 min',
      calories: '500 cal',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format'
    },
    {
      name: 'Pesto Pasta Salad',
      cookingTime: '20 min',
      calories: '380 cal',
      image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&auto=format'
    },

    // Page 3
    {
      name: 'Classic Chicken Noodle Soup',
      cookingTime: '40 min',
      calories: '320 cal',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&auto=format'
    },
    {
      name: 'BBQ Chicken Pizza',
      cookingTime: '30 min',
      calories: '420 cal',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format'
    },
    {
      name: 'Club Sandwich',
      cookingTime: '10 min',
      calories: '350 cal',
      image: 'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?w=500&auto=format'
    },
    {
      name: 'Loaded Beef Burrito',
      cookingTime: '25 min',
      calories: '480 cal',
      image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=500&auto=format'
    },
    {
      name: 'Sesame Tofu Stir Fry',
      cookingTime: '20 min',
      calories: '280 cal',
      image: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=500&auto=format'
    },
    {
      name: 'Mediterranean Pasta Salad',
      cookingTime: '15 min',
      calories: '300 cal',
      image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&auto=format'
    },
    {
      name: 'Garlic Shrimp Pasta',
      cookingTime: '30 min',
      calories: '450 cal',
      image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&auto=format'
    },
    {
      name: 'Spinach Mushroom Omelet',
      cookingTime: '15 min',
      calories: '280 cal',
      image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=500&auto=format'
    },
    {
      name: 'Asian Beef Noodles',
      cookingTime: '25 min',
      calories: '420 cal',
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format'
    },
    {
      name: 'Mediterranean Wrap',
      cookingTime: '15 min',
      calories: '350 cal',
      image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&auto=format'
    },
    {
      name: 'English Fish and Chips',
      cookingTime: '35 min',
      calories: '600 cal',
      image: 'https://images.unsplash.com/photo-1579208030886-b937da0925dc?w=500&auto=format'
    },
    {
      name: 'Mediterranean Quinoa Salad',
      cookingTime: '20 min',
      calories: '300 cal',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format'
    },
    {
      name: 'Red Thai Curry',
      cookingTime: '35 min',
      calories: '420 cal',
      image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&auto=format'
    },
    {
      name: 'Caprese Panini',
      cookingTime: '10 min',
      calories: '280 cal',
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format'
    },
    {
      name: 'Fish Tacos with Slaw',
      cookingTime: '25 min',
      calories: '380 cal',
      image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&auto=format'
    },
    {
      name: 'Vietnamese Pho Soup',
      cookingTime: '40 min',
      calories: '350 cal',
      image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500&auto=format'
    }
  ]

  // actions
  function initializeRecipes() {
    recipes.value = recipeData.map((recipe, index) => ({
      id: index + 1,
      ...recipe
    }))
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  function setShowRecipes(show: boolean) {
    showRecipes.value = show
  }

  function setSelectedRecipe(recipe: Recipe | null) {
    selectedRecipe.value = recipe
  }

  // computed
  const filteredRecipes = computed(() => {
    if (!searchQuery.value) return recipes.value
    const query = searchQuery.value.toLowerCase()
    return recipes.value.filter(recipe => 
      recipe.name.toLowerCase().includes(query)
    )
  })

  return {
    // state
    recipes,
    searchQuery,
    showRecipes,
    selectedRecipe,
    
    // actions
    initializeRecipes,
    setSearchQuery,
    setShowRecipes,
    setSelectedRecipe,
    
    // computed
    filteredRecipes
  }
}) 