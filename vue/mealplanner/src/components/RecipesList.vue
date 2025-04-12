<script setup lang="ts">
import type {Ref} from "vue";
import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import type {Recipe} from "@/types/spoonacular";
import { useI18n } from 'vue-i18n'

import {usePlannerStore} from "@/stores/planner";
import RecipeTable from "./recipelist/RecipeTable.vue";
import CookingInstructions from "./recipelist/CookingInstructions.vue";
import AppLink from "./AppLink.vue";

const store = usePlannerStore();
const { t } = useI18n();

const {pastRecipes, futureRecipes} = storeToRefs(store);

const dialogVisible: Ref<boolean> = ref(false);
const selectedRecipe: Ref<Recipe | null> = ref(null);

const openPreview = (recipe: Recipe): void => {
  selectedRecipe.value = recipe;
  dialogVisible.value = true;
};

const tab: Ref<string> = ref("upcoming");

onMounted(() => {
  if (futureRecipes.length === 0) {
    tab.value = "past";
  }
});
</script>
<template>
  <div v-if="pastRecipes.length === 0 && futureRecipes.length === 0">
    {{ t('common.noRecipes') }}
  </div>
  <div v-else>
    <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
      <v-tab value="Past" :disabled="pastRecipes.length === 0">{{ t('common.past') }}</v-tab>
      <v-tab value="upcoming" :disabled="futureRecipes.length === 0">{{ t('common.upcoming') }}</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item key="past" value="past">
        <RecipeTable
          :recipes="pastRecipes"
          :title="t('common.pastRecipes')"
          removable
          @openPreview="openPreview"
        />
      </v-window-item>
      <v-window-item key="upcoming" value="upcoming">
        <RecipeTable
          :recipes="futureRecipes"
          :title="t('common.upcomingRecipes')"
          @openPreview="openPreview"
        />
      </v-window-item>
    </v-window>

    <v-dialog v-model="dialogVisible" class="dialog" scrollable>
      <v-card v-if="selectedRecipe">
        <cooking-instructions :id="selectedRecipe.id"/>
        <v-card-actions>
          <v-btn text>
            <app-link :to="`/recipe/${selectedRecipe.id}`">{{ t('common.cookingInstructions') }}</app-link>
          </v-btn>
          <v-spacer/>
          <v-btn @click="dialogVisible = false" icon="mdi-close"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
