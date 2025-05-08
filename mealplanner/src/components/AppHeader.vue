<!--
  @author: wangjw.dev
  @description: Application header component with navigation menu
-->
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeIndex = ref('1')

const handleSelect = (key: string) => {
  switch (key) {
    case '1':
      router.push('/')
      break
    case '2':
      router.push('/planner')
      break
    case '3':
      router.push('/favorite')
      break
  }
}
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="1">Home</el-menu-item>
    <el-menu-item index="2">Planner</el-menu-item>
    <el-menu-item index="3">Favorites</el-menu-item>
  </el-menu>
</template>

<style scoped>
.el-menu {
  justify-content: flex-start;
  padding-left: 40px;
}

.el-menu-item {
  font-size: 1.1rem;
}
</style> 