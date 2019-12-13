<template>
  <div class="login-box">
    <!-- 表单容器 -->
    <div class="form-box">
      <!-- 标题 -->
      <div class="title-box">
        <img src="../../assets/login-logo.png" alt />
        <span class="title">黑马面面</span>
        <i></i>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- 饿了么的 表单 -->
      <el-form class="login-form" ref="form" :model="form">
        <!-- 手机号 -->
        <el-form-item>
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="form.input"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item>
          <el-input
            show-password
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item>
          <!-- 行 -->
          <el-row>
            <!-- 列 -->
            <el-col :span="18">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="form.captcha"></el-input>
            </el-col>
            <el-col :span="6">
              <img class="captcha" src="../../assets/captcha.jpg" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 用户协议 -->
        <el-form-item>
          <el-checkbox v-model="form.type" class="checked-box">
            <div class="user-deal">
              我已阅读并同意
              <el-link type="primary" :underline="false">用户协议</el-link>和
              <el-link type="primary" :underline="false">隐私条款</el-link>
            </div>
          </el-checkbox>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item>
          <el-button type="primary" class="login-btn">登录</el-button>
          <el-button type="primary" class="register-btn">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img class="login-pic" src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        input: "",
        password: "",
        captcha: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    onSubmit() {
      window.console.log("submit!");
    }
  }
};
</script>

<style lang="less">
.login-box {
  display: flex;
  // 上下居中
  align-items: center;
  // 左右均分
  justify-content: space-around;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );

  .form-box {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    padding: 44px;
    box-sizing: border-box;

    .title-box {
      display: flex;
      align-items: center;

      img {
        // emmet语法
        // w22+h17+mr16
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }

      .title {
        font-size: 24px;
        font-family: SourceHanSansCN;
        margin-right: 14px;
      }

      i {
        width: 1px;
        height: 28px;
        background-color: #c7c7c7;
        margin-right: 12px;
      }

      .sub-title {
        font-size: 22px;
        font-family: PingFangSC;
      }
    }
    // 表单盒子
    .login-form {
      margin-top: 27px;
      // 验证码
      .captcha {
        width: 100%;
        height: 40px;
      }
      // checkbox的样式
      .el-checkbox {
        display: flex;
        align-items: center;

        .el-checkbox__input {
          height: 14px;
        }

        .el-checkbox__label {
          padding-left: 2px;

          .user-deal {
            display: flex;
            align-items: center;
            color: #999999;
          }
        }
      }

      // 按钮区域
      .el-button {
        width: 100%;
        margin: 0;
      }

      .login-btn {
        margin-bottom: 26px;
      }
    }
  }

  .login-pic {
  }
}
</style>