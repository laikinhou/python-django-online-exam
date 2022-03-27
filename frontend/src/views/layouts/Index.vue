<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-main class="container">
      <!-- 面包屑 -->
      <BreadCrumb></BreadCrumb>

      <RouterView />
    </el-main>
    <el-footer>
      <div class="foot">
        <router-link to="http://beian.miit.gov.cn/">
          陕ICP备2021012706号
        </router-link>
      </div>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import Header from './models/Header.vue';
import BreadCrumb from './models/BreadCrumb.vue';
</script>

<style setup lang="less">
.el-container {
  height: 100%;
}

.foot {
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid gainsboro;

  a {
    color: #8c8c8c;
  }
}
</style>
