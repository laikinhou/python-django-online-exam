<template>
  <el-dialog
    v-model="dialogVisible"
    :before-close="handleClose"
    :title="title"
    destroy-on-close
  >
    <el-form ref="formRef" :model="form" label-width="120px" :rules="rules">
      <el-form-item label="题目内容" prop="content">
        <DEditor v-model:data="form.content"></DEditor>
      </el-form-item>
      <el-form-item label="题目描述" prop="description">
        <DEditor v-model:data="form.description"></DEditor>
      </el-form-item>
      <div style="display: flex">
        <el-form-item label="难度" prop="level_tag">
          <el-select v-model="form.level_tag" placeholder="请选择">
            <el-option
              v-for="level in levelList"
              :key="level.id"
              :label="level.name"
              :value="level.tag"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="type_tag">
          <el-select v-model="form.type_tag" placeholder="请选择">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.tag"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类" prop="category_tag">
          <el-select v-model="form.category_tag" placeholder="请选择">
            <el-option
              v-for="category in categoryList"
              :key="category.id"
              :label="category.name"
              :value="category.tag"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div style="display: flex">
        <el-form-item label="选项" prop="option_ids">
          <Options
            v-model:data="form.option_ids"
            @change="handleChange"
          ></Options>
        </el-form-item>
        <el-form-item label="答案" prop="anser_ids">
          <el-select v-model="form.anser_ids" multiple placeholder="答案选项">
            <el-option
              v-for="item in optionIds"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, computed, onMounted, ref } from 'vue';
import DEditor from '@/components/DEditor/Index.vue';
import Options from './Options.vue';
import {
  getQuestionCategoryApi,
  getQuestionLevelApi,
  getQuestionTypeApi,
} from '@/api/question';
import {
  QuestionCategory,
  QuestionLevel,
  QuestionType,
  QuestionList,
  FormRule,
  SelectOption,
} from '@/types/common';

const props = defineProps<{
  data: QuestionList;
  visible: boolean;
  title: string;
}>();

const emits = defineEmits<{
  (e: 'update:visible', visible: boolean): void;
  (e: 'changed', data: QuestionList, created: boolean): void;
}>();

const formRef = ref<any>(null);
const isCreated = ref<boolean>(false);
const dialogVisible = computed<boolean>(() => props.visible);
const optionIds = reactive<SelectOption[]>([]);
const form = reactive<QuestionList>({
  id: props.data.id || -1,
  content: props.data.content || '',
  description: props.data.description || '',
  level_tag: props.data.level_tag || '',
  type_tag: props.data.type_tag || '',
  category_tag: props.data.category_tag || '',
  option_ids: props.data.option_ids || [],
  anser_ids: props.data.anser_ids || [],
});

const rules = reactive<FormRule>({
  content: [{ required: true, message: '请输入题目内容', trigger: 'blur' }],
  description: [{ required: true, message: '请输入题目描述', trigger: 'blur' }],
  level_tag: [{ required: true, message: '请选择难度', trigger: 'change' }],
  type_tag: [{ required: true, message: '请选择类型', trigger: 'change' }],
  category_tag: [{ required: true, message: '请选择分类', trigger: 'change' }],
  option_ids: [{ required: true, message: '请选择选项', trigger: 'change' }],
  anser_ids: [{ required: true, message: '请选择答案', trigger: 'change' }],
});

const handleSubmit = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      emits('changed', form, isCreated.value);
      emits('update:visible', false);
    } else {
      return false;
    }
  });
};

const handleClose = () => {
  emits('update:visible', false);
};

const handleChange = (data: SelectOption[]) => {
  optionIds.splice(0, optionIds.length, ...data);
};

const categoryList = reactive<QuestionCategory[]>([]);
const levelList = reactive<QuestionLevel[]>([]);
const typeList = reactive<QuestionType[]>([]);

onMounted(() => {
  getQuestionCategoryApi().then((res) => {
    categoryList.splice(0, categoryList.length, ...res);
    for (let i = 0; i < categoryList.length; i++) {
      if (form.category_tag === categoryList[i].name) {
        form.category_tag = categoryList[i].tag;
      }
    }
  });
  getQuestionLevelApi().then((res) => {
    levelList.splice(0, levelList.length, ...res);
    for (let i = 0; i < levelList.length; i++) {
      if (form.level_tag === levelList[i].name) {
        form.level_tag = levelList[i].tag;
      }
    }
  });
  getQuestionTypeApi().then((res) => {
    typeList.splice(0, typeList.length, ...res);
    for (let i = 0; i < typeList.length; i++) {
      if (form.type_tag === typeList[i].name) {
        form.type_tag = typeList[i].tag;
      }
    }
  });

  // 如果 ID 不是有效值，就设置为空
  if (formRef.value && (props.data.id === undefined || props.data.id >= 0)) {
    formRef.value.resetFields();
    isCreated.value = true;
  }
});
</script>

<style lang="less" scoped>
.dialog-footer {
  text-align: center;
}
</style>
