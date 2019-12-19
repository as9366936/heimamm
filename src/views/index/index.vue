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
        <img class="user-icon" :src=" userInfo.avatar" alt />
        <span class="user-name">{{ userInfo.username }},您好</span>
        <el-button type="primary" size="small" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 这里宽度给auto -->
      <el-aside width="auto" class="my-aside">
        <!-- 导航菜单 下面给上router这个属性,激活导航时以 index 作为 path 进行路由跳转 -->
        <el-menu
          router
          text-color="#686A6E"
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
        >
          <el-menu-item index="/index/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="my-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入并使用token函数
import { removeToken } from "../../utils/token.js";
// 导入 接口 方法  获取用户信息
// import { getUserInfo } from "../../api/user.js";

// 导入 接口 方法  退出登录
import { userLogout } from "../../api/user.js";

export default {
  name: "index",
  data() {
    return {
      // 是否折叠
      isCollapse: false
      // // 用户信息
      // userInfo: "",
    };
  },
  methods: {
    logout() {
      this.$confirm("你确定要离开这个网站吗o(╥﹏╥)o", "友情提示", {
        confirmButtonText: "狠心离开",
        cancelButtonText: "再留一会",
        type: "warning"
      })
        .then(() => {
          // 点击了 "狠心离开" 调用 用户登出方法
          userLogout().then(res => {
            // window.console.log(res);
            if (res.data.code === 200) {
              this.$message.success("拜拜,欢迎下次再来!");
              // 用户已退出,移出token
              removeToken();
              // 清空用户信息
              this.$store.state.userInfo = {};
              // 返回登录页面
              this.$router.push("/login");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "欢迎回来!"
          });
        });
    }
  },
  // 利用计算属性简化Vuex数据获取
  computed: {
    // 用户信息
    userInfo(){
      // 直接返回仓库的用户数据即可
      return this.$store.state.userInfo;
    }
  },
  // 创建完成之前的钩子, 迁移到导航守卫中
  beforeCreate() {
    // if (!getToken()) {
    //   this.$message.warning("嗯哼,暗度陈仓吗?");
    //   this.$router.push("/login");
    // }
  },
  // 迁移到导航守卫中
  created() {
    // window.console.log(this.$route);
    // getUserInfo().then(res => {
    //   // window.console.log(res);
    //   if (res.data.code === 200) {
    //     // 处理用户头像的地址
    //     res.data.data.avatar = `${process.env.VUE_APP_BASEURL}/${res.data.data.avatar}`;
    //     this.userInfo = res.data.data;
    //   }else if(res.data.code === 206){
    //     // 警告
    //     this.$message.warning("Lok'tar ogar! 联盟的走开");
    //     // 把token干掉
    //     removeToken();
    //     // 返回登录页面
    //     this.$router.push('/login');
    //   }
    // });
  }
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
    background-color: #E8E9EC;
  }
}
</style>