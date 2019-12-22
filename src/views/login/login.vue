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
              <img class="captcha" @click="changeCaptcha" :src="captchaUrl" alt />
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
          <el-button type="success" class="register-btn" @click="dialogFormVisible = true">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img class="login-pic" src="../../assets/login_banner_ele.png" alt />
    <!-- 注册的对话框 -->
    <el-dialog title="用户注册" :visible.sync="dialogFormVisible">
      <!-- 注册 表单 -->
      <el-form :rules="regRules" ref="regForm" :model="regForm">
        <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
          <!-- 头像上传 -->
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            name="image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <!-- 这里加一个隐藏的input,则可以进行头像的非空验证 -->
          <el-input v-model="regForm.avatar" autocomplete="off" style="display:none"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="username">
          <el-input v-model="regForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="regForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="regForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input show-password v-model="regForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图形码" :label-width="formLabelWidth" prop="code">
          <el-row>
            <el-col :span="16">
              <el-input v-model="regForm.code" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <img @click="reg_changeCaptcha" class="register-captcha" :src="reg_captchaUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth" prop="rcode">
          <el-row>
            <el-col :span="16">
              <el-input v-model="regForm.rcode" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-button
                :disabled="time!=0"
                @click="getMessageCode"
              >{{time == 0 ? "获取用户验证码" : `还有${time}s继续获取`}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <!-- 按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRegister">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import axios from "axios";
// 导入 登录接口
import { login, sendsms, register } from "../../api/login.js";

// 导入并使用token函数
import { setToken } from "../../utils/token.js";

// 导入验证方法
import {checkPhone, checkEmail} from "../../utils/validator.js";

export default {
  name: "login",
  data() {
    return {
      form: {
        phone: "",
        password: "",
        captcha: "",
        // 是否勾选
        checked: false
      },
      // 注册表单
      regForm: {
        username: "",
        email: "",
        phone: "",
        password: "",
        // 头像上传成功返回的地址
        avatar: "",
        // 图片验证码
        code: "",
        // 短信验证
        rcode: ""
      },
      rules: {
        // 手机号
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        // 密码
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 18, message: "密码长度为6 到 18", trigger: "change" }
        ],
        // 验证码
        captcha: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度为4", trigger: "change" }
        ]
      },
      // 注册表单的规则
      regRules: {
        // 头像验证
        avatar: [
          { required: true, message: "请选择一个头像吧", trigger: "change" }
        ],
        // 注册昵称
        username: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
          { min: 1, max: 8, message: "昵称长度为1 到 8位", trigger: "blur" }
        ],
        // 注册邮箱
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        // 注册手机号
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        // 注册密码
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 18, message: "密码长度为6 到 18", trigger: "change" }
        ],
        // 图形码
        code: [
          // { required: true, message: "图形码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "图形码长度为4", trigger: "change" }
        ],
        // 验证码
        rcode: [
          // { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度为4", trigger: "change" }
        ]
      },
      // 验证码地址
      captchaUrl: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      // 注册页面图形码地址
      reg_captchaUrl: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms",
      // 是否显示对话框
      dialogFormVisible: false,
      // 宽度
      formLabelWidth: "60px",
      // 上传地址
      imageUrl: "",
      // 倒计时
      time: 0,
      // 头像上传地址
      uploadUrl: process.env.VUE_APP_BASEURL + "/uploads"
    };
  },
  methods: {
    // 表单验证方法
    submitForm() {
      // 是否勾选用户协议
      if (this.form.checked === false) {
        this.$message.warning("请先勾选用户协议!");
      } else {
        this.$refs.form.validate(valid => {
          if (valid) {
            // 验证成功
            // this.$message.success("登录成功!");
            // 调用接口
            // axios({
            //   url: process.env.VUE_APP_BASEURL + "/login",
            //   method: "post",
            //   // 设置跨域请求可以携带cookie
            //   withCredentials: true,
            //   data: {
            //     phone: this.form.phone,
            //     password: this.form.password,
            //     code: this.form.captcha
            //   }
            // });
            login({
              phone: this.form.phone,
              password: this.form.password,
              code: this.form.captcha
            }).then(res => {
              // window.console.log(res);
              // 错误提示
              if (res.data.code === 202) {
                this.$message.error(res.data.message + "!");
              } else if (res.data.code === 200) {
                this.$message.success("登录成功!");
                // 不建议用这个方法 key 可能会写错
                // localStorage.setItem("token", res.data.data.token);
                // 调用封装好的 token 方法
                setToken(res.data.data.token);
                this.$router.push("/index");
              }
            });
          } else {
            // 验证失败
            this.$message.error("很遗憾,阁下有内容没有填对哦!");
            return false;
          }
        });
      }
    },
    // 注册表单验证方法
    submitRegister() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          // 验证成功
          // this.$message.success("注册成功!");
          // 调用接口
          // axios({
          //   method: "post",
          //   url: process.env.VUE_APP_BASEURL + "/register",
          //   // 设置跨域请求可以携带cookie
          //   withCredentials: true,
          //   data: {
          //     username: this.regForm.username,
          //     email: this.regForm.email,
          //     phone: this.regForm.phone,
          //     password: this.regForm.password,
          //     avatar: this.regForm.avatar,
          //     rcode: this.regForm.rcode
          //   }
          // });
          register({
            username: this.regForm.username,
            email: this.regForm.email,
            phone: this.regForm.phone,
            password: this.regForm.password,
            avatar: this.regForm.avatar,
            rcode: this.regForm.rcode
          }).then(res => {
            // window.console.log(res);
            if (res.data.code == 200) {
              this.$message.success("恭喜,注册成功!");
              this.dialogFormVisible = false;
            } else {
              this.$message.error("注册失败,请重新注册!");
            }
          });
        } else {
          // 验证失败
          this.$message.error("很遗憾,阁下有内容没有填对哦!");
          return false;
        }
      });
    },
    // 重新获取验证码
    changeCaptcha() {
      this.captchaUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&" + Date.now(); // 时间戳
      // 这里login后面注意加上&!!!
    },
    // 注册列表重新获取验证码
    reg_changeCaptcha() {
      this.reg_captchaUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=sendsms&" + Date.now(); // 时间戳
      // 这里login后面注意加上&!!!
    },
    /**
     * @description: 文件上传成功的钩子
     * @param {type} res 接口的响应信息
     * @param {type} file 文件信息
     * @return:
     */
    handleAvatarSuccess(res, file) {
      // window.console.log(res);
      // window.console.log(file);
      // 获取服务器返回的图片地址  注意: 不包含基地址
      // window.console.log(res.data.file_path);
      // 保存头像地址
      this.regForm.avatar = res.data.file_path;
      // 生成本地的临时地址
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    /**
     * @description: 文件上传之前的钩子(回调函数)
     * @param {type} file 文件的信息
     * @return:
     */
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2; // 不能超过2M
      // const isLt2M = file.size / 1024 < 300; // 不能超过300kb

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 或者 png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 获取短信验证码
    getMessageCode() {
      // 手机号判断
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!reg.test(this.regForm.phone)) {
        // 提示用户
        return this.$message.error("请输入正确的手机号");
      }
      // 图形码验证
      if (this.regForm.code == "" || this.regForm.code.length != 4) {
        return this.$message.error("验证码不太对哦!你是机器人吗?手动滑稽");
      }
      // 手机号 图形验证码都OK
      // 开始计时
      this.time = 60;
      const timeID = setInterval(() => {
        this.time--;
        if (this.time == 0) {
          clearInterval(timeID);
          // 计时结束后,刷新
          this.reg_changeCaptcha();
        }
      }, 100);
      // 发送axios请求
      // axios({
      //   method: "post",
      //   url: process.env.VUE_APP_BASEURL + "/sendsms",
      //   // 跨域携带cookie
      //   withCredentials: true,
      //   data: {
      //     code: this.regForm.code,
      //     phone: this.regForm.phone
      //   }
      // });
      sendsms({
        code: this.regForm.code,
        phone: this.regForm.phone
      }).then(res => {
        window.console.log(res);
        if (res.data.code === 200) {
          // 提示用户
          this.$message.success(`验证码为${res.data.data.captcha}`);
        }else if(res.data.code === 0){
          // 验证码错误
          this.$message.error("验证码输入错误");
        }
      });
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

  // 对话框
  .el-dialog {
    width: 603px;
    height: 786px;

    .el-dialog__header {
      text-align: center;
      background: linear-gradient(to right, #01c4fa, #1294fa);
      padding-bottom: 18px;

      .el-dialog__title {
        color: white;
      }
    }

    .el-dialog__body {
      padding-bottom: 0;
    }

    // 按钮居中
    .dialog-footer {
      text-align: center;
    }
  }

  // 注册验证码
  .register-captcha {
    height: 40px;
    width: 100%;
  }

  // 头像的样式
  // 头像居中
  .avatar-uploader {
    text-align: center;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>