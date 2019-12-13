<template>
  <div class="login-box">
    <div class="form-box">
      <div class="title-box">
        <img src="../../assets/login-logo.png" alt />
        <span class="title">黑马面面</span>
        <i></i>
        <span class="sub-title">用户登录</span>
      </div>
    </div>
    <img class="login-pic" src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {};
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
  }

  .login-pic {
  }
}
</style>