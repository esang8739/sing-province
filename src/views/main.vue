<template>
  <el-container>
    <el-header><span>校园歌曲征集传唱活动</span></el-header>
    <el-container>
      <el-aside>
        <el-menu style="background: #ff0000" active-text-color="#ff0000" router>
          <el-menu-item index="/Judge">节目审批</el-menu-item>
          <el-menu-item index="/record">审批记录</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.main_container {
  height: 100%;
  min-width: 1500px;
}
.el-header,
.el-aside {
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
