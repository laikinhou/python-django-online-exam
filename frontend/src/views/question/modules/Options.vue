<template>
  <el-select-v2
    v-model="value"
    style="width: 170px"
    multiple
    size="medium"
    filterable
    remote
    :remote-method="remoteMethod"
    clearable
    :options="options"
    :loading="loading"
    placeholder="请输入搜索内容"
    @change="handleChange"
    @focus="remoteMethod"
  />
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { getOptionListApi } from '@/api/question';
import { QuestionOption, SelectOption } from '@/types/common';

const props = defineProps<{
  data: number[] | undefined;
}>();

const emits = defineEmits<{
  (e: 'update:data', value: number[]): void;
  (e: 'change', data: SelectOption[]): void;
}>();

const loading = ref<boolean>(false);
const value = ref<string[]>([]);

const options = reactive<SelectOption[]>([]);

const remoteMethod = (query: string) => {
  loading.value = true;
  getOptionListApi({
    pageNo: 1,
    pageSize: 50,
    search: query,
  }).then((res) => {
    loading.value = false;
    options.splice(
      0,
      options.length,
      ...res.results.map((item: QuestionOption) => ({
        value: item.id.toString(),
        label: item.content,
      })),
    );
  });
};

const handleChange = (val: string[]) => {
  emits(
    'change',
    options.filter((item) => val.includes(item.value)),
  );
  emits(
    'update:data',
    val.map((item: string) => Number(item)),
  );
};

onMounted(() => {
  if (props.data) {
    // 如果传入的数据不为空，则设置默认值
    const { data } = props;
    getOptionListApi({
      pageNo: 1,
      pageSize: 50,
      id__in: data.join(','),
    }).then((res) => {
      options.splice(
        0,
        options.length,
        ...res.results.map((item: QuestionOption) => ({
          value: item.id.toString(),
          label: item.content,
        })),
      );

      value.value = data.map((item: number) => item.toString());
    });
  }
});
</script>

<style lang="less" scoped></style>
