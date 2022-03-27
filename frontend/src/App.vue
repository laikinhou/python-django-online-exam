<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { useTitle } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { watch, unref } from 'vue';

const title = useTitle();
const { currentRoute } = useRouter();
title.value = import.meta.env.VITE_APP_TITLE as string;

// 监听路由变化，更新标题
watch(
  () => currentRoute.value.path,
  () => {
    const route = unref(currentRoute);
    if (route.name === 'Redirect') {
      return;
    }

    const sTitle = route?.meta?.title as string;
    title.value = sTitle;
  },
);
</script>

<template>
  <RouterView />
</template>

<style>
html,
body,
#app {
  height: 100%;
}
</style>
