<template>
  <div class="toolbar">
    <div class="left">
      <el-button type="primary" size="small" @click="handleNewClick"
        >新建</el-button
      >
    </div>
    <div class="right">
      <el-input
        v-model="search"
        placeholder="请输入考试名称"
        size="small"
        style="margin-right: 5px"
      ></el-input>
      <el-button type="primary" size="small" @click="searchQuestion">
        搜索
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const search = ref<string>('');
const handleNewClick = () => {};

const searchQuestion = () => {};
</script>

<style lang="less" scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  .right {
    display: flex;
    align-items: center;
  }

  .left {
    display: flex;
    align-items: center;
  }
}
</style>
