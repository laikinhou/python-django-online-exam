<template>
  <template v-for="(item, i) in routes">
    <el-sub-menu
      v-if="item.children && item.children.length > 0"
      :key="i"
      :index="`${index}-${i}`"
    >
      <template #title>
        <i :class="item.icon"></i>
        <span>{{ item.title }}</span>
      </template>
      <MenuItem :routes="item.children" :index="`${index}-${i}`"></MenuItem>
    </el-sub-menu>
    <el-menu-item v-else :key="item.path" :index="`${index}-${i}`">
      <i :class="item.icon"></i>
      <router-link :to="item.path">{{ item.title }}</router-link>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import type { RouteInfo } from '@/store/types';

defineProps<{
  routes: RouteInfo[];
  index: string;
}>();
</script>

<style lang="less" scoped>
.el-menu {
  border: 0;
}

li a {
  text-decoration: none;
  color: #fff;
  font-size: 15px;
}

div span {
  font-size: 16px;
  font-weight: 600;
}
</style>
