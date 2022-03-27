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
        placeholder="请输入搜索内容"
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

const emits = defineEmits<{
  (e: 'addClick'): void;
  (e: 'addSearch', search: string): void;
}>();

const search = ref<string>('');

const handleNewClick = () => {
  emits('addClick');
};

const searchQuestion = () => {
  emits('addSearch', search.value);
};
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
