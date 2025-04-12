<script setup lang="ts">
import AppLink from '@/components/AppLink.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
<template>
  <v-app-bar flat>
    <v-btn id="hamburger-activator" icon="mdi-menu"></v-btn>
    <v-menu activator="#hamburger-activator">
      <v-list>
        <v-list-item>
          <v-btn flat block>
            <app-link to="/">{{ t('common.home') }}</app-link>
          </v-btn>
          <v-btn flat block>
            <app-link to="/recipes">{{ t('common.recipes') }}</app-link>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-app-bar-title>
      <v-icon icon="mdi-silverware-fork-knife"/>
      {{ t('common.mealPlanner') }}
    </v-app-bar-title>
  </v-app-bar>
</template>
