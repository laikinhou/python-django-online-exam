<template>
  <div class="list">
    <el-card
      class="box-card card"
      v-for="(item, index) in examList"
      :key="index"
    >
      <template #header>
        <div class="header-title">
          <span>满分：{{ item.score }}分</span>
        </div>
        <div class="header-title">
          <span>限时：{{ item.limit_time }}分钟</span>
        </div>
      </template>
      <div class="body">
        <img :src="item.avatar" alt="" />
        <div class="detail">
          <strong>{{ item.name }}</strong>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { ExamList } from '@/types/common';

const examList = reactive<ExamList[]>([
  {
    id: 1,
    score: 100,
    limit_time: 90,
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    name: '第一次考试',
    description: '这是一个考试描述',
  },
  {
    id: 2,
    score: 100,
    limit_time: 90,
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    name: '第一次考试',
    description: '这是一个考试描述',
  },
  {
    id: 3,
    score: 100,
    limit_time: 90,
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    name: '第一次考试',
    description: '这是一个考试描述',
  },
]);
</script>

<style lang="less" scoped>
.header-title {
  display: inline-block;
  width: 50%;
  text-align: center;

  &:first-child {
    border-right: 1px solid #ccc;
  }
}

.list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .card {
    width: 24%;
    margin-bottom: 10px;
    margin-right: 1%;
  }
}

.body {
  display: flex;
  padding-bottom: 20px;

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .detail {
    p {
      margin-top: 5px;
    }
  }
}
</style>
