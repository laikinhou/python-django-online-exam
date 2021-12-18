<template>
  <el-menu
    mode="horizontal"
    :unique-opened="true"
    background-color="transparent"
    text-color="gainsboro"
    active-text-color="#409eff"
  >
    <template v-for="(item, index) in routes">
      <el-sub-menu
        v-if="item.children && item.children.length > 0"
        :key="index"
        :index="index.toString()"
      >
        <template #title>
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <MenuItem :routes="item.children" :index="index.toString()"></MenuItem>
      </el-sub-menu>
      <el-menu-item v-else :key="item.path" :index="item.path">
        <i :class="item.icon"></i>
        <router-link :to="item.path">{{ item.title }}</router-link>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { RouteInfo } from '@/store/types';
import usePermissionStoreWithOut from '@/store/modules/permission';
import MenuItem from './MenuItem.vue';

const permissionStore = usePermissionStoreWithOut();

const routes = computed<RouteInfo[]>(() => permissionStore.menus);
</script>

<style lang="less" scoped>
.el-menu {
  border: 0;
}

li a {
  text-decoration: none;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
}

:deep(.el-menu--horizontal li.el-menu-item:not(.is-disabled):hover) {
  background-color: #143453 !important;
}
</style>
