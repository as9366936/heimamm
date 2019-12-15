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
      <el-form class="login-form" :rules="rules" ref="form" :model="form">
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="form.phone"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            show-password
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="captcha">
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
          <el-checkbox v-model="form.checked" class="checked-box">
            <div class="user-deal">
              我已阅读并同意
              <el-link type="primary" :underline="false">用户协议</el-link>和
              <el-link type="primary" :underline="false">隐私条款</el-link>
            </div>
          </el-checkbox>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="submitForm">登录</el-button>
          <el-button type="success" class="register-btn">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img class="login-pic" src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    /**
     * @description: 自定义校验规则函数,检验手机号是否规范
     * @param {type} rule 规则
     * @param {string} value 用户输入的数据
     * @param {function} callback 回调函数
     * @return:
     */
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        // 判断手机号的格式
        //正则
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        // 判断是否符合
        // .test(验证的字符串) 返回的是true 或者 false
        if (reg.test(value) == true) {
          callback();
        } else {
          // 不满足  手机号的格式
          callback(new Error("老铁,你的手机号写错了"));
        }
      }
    };
    return {
      form: {
        phone: "",
        password: "",
        captcha: "",
        checked: false,
      },
      rules: {
        // 手机号
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        // 密码
        password: [
          { required: true, message: "密码不能为空", trigger: "change" },
          {
            min: 6,
            max: 18,
            message: "密码长度为6 到 18",
            trigger: "change"
          }
        ],
        // 验证码
        captcha: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度为4", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    /**
     * @description: 表单验证方法
     * @param {type}
     * @return:
     */
    submitForm() {
      // 是否勾选用户协议
      if (this.form.checked === false) {
        this.$message.warning("请先勾选用户协议!");
      } else {
        this.$refs.form.validate(valid => {
          if (valid) {
            // 验证成功
            this.$message.success("登录成功!");
            // 调用接口
          } else {
            // 验证失败
            this.$message.error("很遗憾,阁下有内容没有填对哦!");
            return false;
          }
        });
      }
    },
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