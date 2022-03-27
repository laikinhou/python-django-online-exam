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
  <el-table :data="tableData" @sort-change="tableSortChange">
    <el-table-column
      v-for="(item, index) in columns"
      :key="index"
      :label="item.label"
      :prop="item.prop"
      :width="item.width"
      :sortable="item.sortable"
      align="center"
    >
      <template
        #default="scope"
        v-if="item.custom || 'content description'.includes(item.prop!)"
      >
        <div v-if="item.prop === 'content'" v-html="scope.row.content"></div>
        <div
          v-else-if="item.prop === 'description'"
          v-html="scope.row.description"
        ></div>
        <div v-else>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-popconfirm
            title="确认删除此问题吗？"
            @confirm="handleDelete(scope.$index, scope.row)"
          >
            <template #reference>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </el-table-column>
  </el-table>
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
  <Edit
    v-if="showEdit"
    v-model:visible="showEdit"
    :data="rowData"
    :title="editTitle"
    @changed="handleEditChange"
  ></Edit>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import {
  getQuestionListApi,
  deleteQuestionApi,
  updateQuestionApi,
  createQuestionApi,
} from '@/api/question';
import Edit from './modules/Edit.vue';
import { errorMessage, successMessage } from '@/utils/message';
import { QuestionList } from '@/types/common';

const search = ref<string>('');
const showEdit = ref<boolean>(false);
const tableData = reactive<QuestionList[]>([]);
const columns = reactive([
  {
    label: '序号',
    prop: 'id',
    width: '80',
  },
  {
    label: '题目',
    prop: 'content',
  },
  {
    label: '描述',
    prop: 'description',
  },
  {
    label: '难度',
    prop: 'level_tag',
  },
  {
    label: '类型',
    prop: 'type_tag',
  },
  {
    label: '分类',
    prop: 'category_tag',
  },
  {
    label: '更新时间',
    prop: 'update_time',
    sortable: 'custom',
  },
  {
    label: '创建人',
    prop: 'creator',
  },
  {
    label: '操作',
    custom: true,
  },
]);

const rowData = ref<QuestionList>({} as never);

const editTitle = ref<string>('编辑题目');
const pagination = reactive({
  currentPage: 1,
  pageSize: 12,
  total: 0,
});

const updateData = () => {
  getQuestionListApi({
    pageNo: pagination.currentPage,
    pageSize: pagination.pageSize,
    search: search.value,
  })
    .then((res) => {
      pagination.total = res.cout;
      tableData.splice(0, tableData.length, ...res.results);
    })
    .catch(() => {
      errorMessage('获取题目列表失败');
    });
};

const handleNewClick = () => {
  showEdit.value = true;
  editTitle.value = '新建题目';
  rowData.value = {} as never;
};

const handleEdit = (_: number, row: any) => {
  showEdit.value = true;
  editTitle.value = '编辑题目';
  rowData.value = row;
};

const handleDelete = (index: number, row: any) => {
  deleteQuestionApi(row.id)
    .then(() => {
      tableData.splice(index, 1);
    })
    .catch(() => {
      errorMessage('删除题目失败');
    });
};

const tableSortChange = (_: string, prop: string, order: number) => {
  getQuestionListApi({
    pageNo: pagination.currentPage,
    pageSize: pagination.pageSize,
    search: search.value,
    ordering: `${order} === 'ascending' ? '' : '-'}${prop}`,
  })
    .then((res) => {
      pagination.total = res.cout;
      tableData.splice(0, tableData.length, ...res.results);
    })
    .catch(() => {
      errorMessage('获取题目列表失败');
    });
};

const handleEditChange = (data: QuestionList, created: boolean) => {
  console.log(data, created);
  if (!data.id || data.id === -1) {
    createQuestionApi(data)
      .then(() => {
        tableData.push(data);
        successMessage('新建题目成功');
      })
      .catch(() => {
        errorMessage('创建题目失败');
      });
  } else {
    updateQuestionApi(data.id, data)
      .then(() => {
        successMessage('更新题目信息成功');
        tableData.splice(
          tableData.findIndex((item) => item.id === data.id),
          1,
          data,
        );
      })
      .catch(() => {
        errorMessage('更新题目失败');
      });
  }
};

const searchQuestion = () => {
  updateData();
};

const handlePageChange = (): void => {
  updateData();
};

onMounted(() => {
  updateData();
});
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

.text-ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
