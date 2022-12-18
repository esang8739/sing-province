<template>
  <el-container style="width: 100vw; height: 100vh; min-width: 1200px">
    <!-- 头部区域 -->
    <el-header
      ><span>校园歌曲征集传唱活动</span>
      <button
        @click="outsys"
        style="
          width: 51px;
          height: 51px;
          background: transparent;
          border: none;
          position: absolute;
          top: 4px;
          right: 16px;
        "
      >
        <img
          src="../assets/images/outsys.png"
          alt=""
          style="width: 100%"
        /></button
    ></el-header>
    <el-container>
      <!-- 侧边导航 -->
      <el-aside>
        <el-menu
          style="background: #ff0000"
          active-text-color="#ff0000"
          active-background-color="#ffffff"
          router
        >
          <el-menu-item index="/Judge">节目审批</el-menu-item>
          <el-menu-item index="/record">审批记录</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="background: #f7f6f6">
        <!-- 主视区 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  methods: {
    outsys() {
      window.sessionStorage.clear();
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="less" scoped>
.main_container {
  height: 100%;
  min-width: 1500px;
}
.el-header,
.el-aside {
  position: relative;
  background: #ff0000;
}
.el-header {
  width: 100%;
  height: 80px;
  font-size: 24px;

  color: #fff;
  span {
    line-height: 55px;
    font-weight: 600;
  }
}
.el-aside {
  width: 256px;
  height: 100%;
}
.el-menu-item {
  font-size: 18px;
  color: #fff;
  padding-left: 30% !important;
}
.el-menu-item:hover {
  outline: 0 !important;
  color: #ff0000 !important;
}
</style>
