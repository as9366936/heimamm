<template>
  <!-- 布局容器 -->
  <el-container class="index-container">
    <el-header class="my-header">
      <div class="left">
        <!-- 图标 -->
        <i class="el-icon-s-fold icon" @click="isCollapse = !isCollapse"></i>
        <img class="logo" src="../../assets/index_logo.png" alt />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img class="user-icon" src="../../assets/kuaijiu.jpg" alt />
        <span class="user-name">李达您好</span>
        <el-button type="primary" size="small">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 这里宽度给auto -->
      <el-aside width="auto" class="my-aside">
        <!-- 导航菜单 -->
        <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-menu-item index="1">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="my-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      // 是否折叠
      isCollapse: true,
    }
  },
};
</script>

<style lang="less">
.index-container {
  height: 100%;
  .my-header {
    // background-color: red;
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;

      .el-icon-s-fold {
        font-size: 24px;
        margin-right: 22px;
        cursor: pointer;
      }

      .logo {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }

      .title {
        font-size: 22px;
        color: #49a1ff;
      }
    }

    .right {
      display: flex;
      align-items: center;

      .user-icon {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 9px;
      }

      .user-name {
        font-size: 14px;
        margin-right: 38px;
      }
    }
  }
  .my-aside {
    // background-color: green;
    // 导航样式
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
  .my-main {
    background-color: blue;
  }
}
</style>