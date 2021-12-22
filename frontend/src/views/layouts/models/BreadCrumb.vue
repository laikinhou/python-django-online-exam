<template>
  <el-breadcrumb separator="/">
    <template v-for="(item, index) in routeList">
      <el-breadcrumb-item
        v-if="item.isLink"
        :key="index"
        :to="{ path: item.path }"
        >{{ item.name }}</el-breadcrumb-item
      >
      <el-breadcrumb-item v-else :key="item.path">{{
        item.name
      }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>

  <!-- 加一条分割线 -->
  <el-divider></el-divider>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute, RouteLocationMatched } from 'vue-router';

const route = useRoute();

const isDashboard = (item: RouteLocationMatched) => {
  const name = item && (item.name as string);
  if (!name) {
    return false;
  }
  return name.trim().toLocaleLowerCase() === 'DashBoard'.toLocaleLowerCase();
};

const routeList = computed(() => {
  const matched = route.matched.filter((item) => item.meta && item.meta.title);
  const result = [];
  if (!isDashboard(matched[0])) {
    result.push({
      name: '首页',
      path: '/',
      isLink: true,
    });
  }

  matched.forEach((item) => {
    if (item.meta && item.meta.title) {
      result.push({
        name: item.meta.title,
        path: item.path,
        isLink: true,
      });
    }
  });

  result[result.length - 1].isLink = false;
  return result;
});
</script>

<style lang="less" scoped></style>
