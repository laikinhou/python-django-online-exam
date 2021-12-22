<template>
  <el-menu
    mode="horizontal"
    :unique-opened="true"
    background-color="transparent"
    text-color="gainsboro"
    active-text-color="#409eff"
  >
    <MenuItem :items="routes"></MenuItem>
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
</style>
