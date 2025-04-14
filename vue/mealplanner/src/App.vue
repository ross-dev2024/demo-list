<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<script setup lang="ts">
// Component name needs to be defined for KeepAlive to work
import Home from './views/Home.vue'
</script>

<template>
  <div class="app">
    <el-container>
      <el-header>
        <el-menu mode="horizontal" router>
          <el-menu-item index="/">EatWell101</el-menu-item>
          <el-menu-item index="/planner">Meal Planner</el-menu-item>
          <el-menu-item index="/recipes">Recipes</el-menu-item>
        </el-menu>
      </el-header>
      
      <el-main>
        <router-view v-slot="{ Component }">
          <keep-alive :include="['Home']">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.app {
  height: 100vh;
  overflow: hidden;
  display: flex;
  width: 100%;
}

.el-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.el-header {
  padding: 0;
}

.el-main {
  max-width: none;
  margin: 0;
  padding: 40px 0;
  overflow-y: auto;
  height: calc(100vh - 60px);
  flex: 1;
}
</style>
