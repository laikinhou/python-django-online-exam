<template>
  <div class="header">
    <div class="container">
      <el-row justify="space-between">
        <el-col :span="3">
          <div class="home">
            <i class="iconfont icon-shouye" style="color: #409eff"></i>
            <router-link to="/" style="color: #f1f2f6">{{ title }}</router-link>
          </div>
        </el-col>
        <!-- 如果布局为垂直布局，导航菜单就显示在侧边栏 -->
        <el-col :span="18">
          <NavMenu></NavMenu>
        </el-col>
        <el-col :span="3">
          <UserSetting></UserSetting>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavMenu from './NavMenu.vue';
import UserSetting from './UserSetting.vue';

const title = ref(import.meta.env.VITE_APP_TITLE);
</script>

<style lang="less" scoped>
.header {
  background-color: #143453;
  line-height: 60px;
}
</style>
