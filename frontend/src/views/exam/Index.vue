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
    <el-pagination
      v-show="pagination.total > 0"
      v-model:currentPage="pagination.currentPage"
      layout="prev, pager, next"
      :page-count="Math.ceil(pagination.total / pagination.pageSize)"
      :total="pagination.total"
      :hide-on-single-page="true"
      @onCurrentChange="handlePageChange"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { ExamList } from '@/types/common';
import { errorMessage } from '@/utils/message';
import getExamListApi from '@/api/exam';

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

const pagination = reactive({
  currentPage: 1,
  pageSize: 12,
  total: 0,
});

const updateData = async (): Promise<void> => {
  getExamListApi({
    pageNo: pagination.currentPage,
    pageSize: pagination.pageSize,
  })
    .then((res) => {
      pagination.total = res.cout;
      examList.splice(0, examList.length, ...res.results);
    })
    .catch(() => {
      errorMessage('获取考试列表失败');
    });
};

const handlePageChange = (): void => {
  updateData();
};

onMounted(() => {
  updateData();
});
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
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .card {
    width: 24%;
    margin-bottom: 10px;
    margin-right: 1%;
  }

  .el-pagination {
    position: absolute;
    left: 0;
    bottom: -30px;
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
