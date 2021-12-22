<template>
  <div class="notfound">
    <span>{{ countDown }}秒后跳转到首页</span>
    <p>Page Not Found</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, reactive } from 'vue';

const countDown = ref<number>(5);
/* global TimeoutHandle, IntervalHandle */
const timeHandle = reactive<{
  timeout: TimeoutHandle;
  interval: IntervalHandle;
}>({
  timeout: 0,
  interval: 0,
});

onMounted(() => {
  timeHandle.timeout = setTimeout(() => {
    window.location.href = '/';
  }, 5000);

  timeHandle.interval = setInterval(() => {
    countDown.value -= 1;
  }, 1000);
});

onUnmounted(() => {
  clearTimeout();
});
</script>

<style lang="less" scoped>
.notfound {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(#34d399, #3b82f6);

  span {
    font-size: 15px;
  }

  p {
    font-size: 70px;
    font-weight: 900;
    text-shadow: 1.3333vw 0.6667vw 2vw slategrey;
  }
}
</style>
