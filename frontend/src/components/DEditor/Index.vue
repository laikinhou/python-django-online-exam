<template>
  <ckeditor
    :editor="editor"
    v-model="editorData"
    :config="editorConfig"
    @blur="onEditorBlur"
  ></ckeditor>
</template>

<script lang="ts" setup>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ref, reactive } from 'vue';

const props = defineProps<{
  data: string;
}>();

const emits = defineEmits<{ (e: 'update:data', data: string): void }>();

const editorData = ref<string>(props.data || '');
const editor = ref<any>(ClassicEditor);
const editorConfig = reactive({
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    'blockQuote',
    'undo',
    'redo',
  ],
});

// 失去焦点时保存数据
const onEditorBlur = () => {
  emits('update:data', editorData.value);
};
</script>

<style lang="less" scoped></style>
