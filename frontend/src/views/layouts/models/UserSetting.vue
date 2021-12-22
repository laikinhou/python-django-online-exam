<template>
  <div class="settings">
    <el-dropdown>
      <span>
        <i class="iconfont icon-yonghu1"></i>
        {{ userStore.userInfo.nickname || '未登录' }}
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>考试管理</el-dropdown-item>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>登 出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import useUserStoreWithOut from '@/store/modules/user';

const userStore = useUserStoreWithOut();
</script>

<style scoped lang="less">
div.settings {
  float: right;
  margin-right: 1.5vw;

  .el-dropdown {
    color: gainsboro;
  }
}
</style>
