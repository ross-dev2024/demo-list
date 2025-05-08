<!--
  @author: wangjw.dev
  @description: Main application component
-->
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<script setup lang="ts">
// Component name needs to be defined for KeepAlive to work
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <el-container>
    <el-header class="fixed-header">
      <AppHeader />
    </el-header>
    <el-main class="main-content">
      <router-view></router-view>
    </el-main>
  </el-container>
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

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: white;
  padding: 0;
  height: auto !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.main-content {
  padding-top: 80px;
  min-height: calc(100vh - 60px);
}

.el-main {
  padding: 20px;
}
</style>
