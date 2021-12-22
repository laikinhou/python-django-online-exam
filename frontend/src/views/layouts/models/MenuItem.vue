<template>
  <template v-for="(item, i) in items">
    <el-sub-menu
      v-if="item.children && item.children.length > 0"
      :key="i"
      :index="menuIndex(i)"
    >
      <template #title>
        <i :class="item.icon"></i>
        <span>{{ item.title }}</span>
      </template>
      <MenuItem :items="item.children" :index="menuIndex(i)"></MenuItem>
    </el-sub-menu>
    <el-menu-item v-else :key="item.path" :index="menuIndex(i)">
      <i :class="item.icon"></i>
      <router-link :to="item.path">{{ item.title }}</router-link>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import type { RouteInfo } from '@/store/types';

const props = withDefaults(
  defineProps<{
    items: RouteInfo[];
    index?: string | undefined;
  }>(),
  { index: undefined },
);

const menuIndex = (i: number): string => {
  if (props.index === undefined) {
    return i.toString();
  }
  return `${props.index}-${i}`;
};
</script>

<style lang="less" scoped>
li a {
  text-decoration: none;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
}

.el-menu-item:hover {
  background-color: #0a3d62 !important;
}

div span {
  font-size: 16px;
  font-weight: 600;
}

.el-menu-item:hover {
  background-color: #0a3d62 !important;
}
</style>
