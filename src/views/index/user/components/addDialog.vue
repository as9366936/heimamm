<template>
  <!-- 新增对话框 -->
  <el-dialog class="userAdd" center title="新增用户" :visible.sync="$parent.addFormVisible">
    <el-form ref="addForm" :model="addForm" :rules="addFormRules">
      <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
        <el-input v-model="addForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="addForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="addForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role_id" :label-width="formLabelWidth">
        <el-select v-model="addForm.role_id" placeholder="请选择角色">
          <el-option label="管理员" value="2"></el-option>
          <el-option label="老师" value="3"></el-option>
          <el-option label="学生" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-select v-model="addForm.status" placeholder="请选择状态">
          <el-option label="禁用" value="0"></el-option>
          <el-option label="启用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户备注" :label-width="formLabelWidth">
        <el-input v-model="addForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.addFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">新 增</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入接口
import { userAdd } from "../../../../api/user.js";
// 导入验证方法
import {checkPhone, checkEmail} from "../../../../utils/validator.js";
export default {
  data() {
    return {
      // 新增对话框表单
      addForm: {
        // 用户名
        username: "",
        // 邮箱
        email: "",
        // 手机号
        phone: "",
        // 角色
        role_id: "",
        // 状态
        status: "",
        // 备注
        remark: ""
      },
      // 宽度
      formLabelWidth: "80px",
      // 添加表单的验证规则
      addFormRules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 1, max: 8, message: "昵称长度为1 到 8位", trigger: "blur" }
        ],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        role_id: [{ required: true, message: "角色不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          // 对
          // 调用接口,发送axios请求
          userAdd(this.addForm).then(res => {
            window.console.log(res);
            if (res.code === 200) {
              this.$message.success("新增成功!");
              // 关闭弹框
              this.$parent.addFormVisible = false;
              // 重新渲染用户列表
              this.$parent.getData();
              // 清空已输入的数据
              this.addForm = {};
            } else if (res.code === 201) {
              this.$message.warning("用户已存在,请重新输入!");
            }
          });
        } else {
          // 错
          this.$message.error("请检查数据!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
// 新增用户对话框
.userAdd {
  // 设置宽度
  .el-dialog {
    width: 503px;

    .el-dialog__header {
      background: linear-gradient(to right, #01c4fa, #1394fa);
      // 文字
      span,
      i {
        color: white;
      }
    }
  }
}
</style>