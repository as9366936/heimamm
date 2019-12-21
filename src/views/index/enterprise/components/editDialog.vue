<template>
  <!-- 编辑对话框 -->
  <el-dialog class="edit-dialog" center title="编辑企业" :visible.sync="$parent.editFormVisible">
    <el-form ref="editForm" :model="editForm" :rules="editFormRules">
      <el-form-item label="企业编号" prop="eid" :label-width="formLabelWidth">
        <el-input v-model="editForm.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="editForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="editForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" prop="intro" :label-width="formLabelWidth">
        <el-input v-model="editForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" :label-width="formLabelWidth">
        <el-input v-model="editForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.editFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入接口
import { enterpriseEdit } from "../../../../api/enterprise.js";
export default {
  data() {
    return {
      // 编辑对话框表单
      editForm: {
        // 企业编号
        eid: "",
        // 企业名称
        name: "",
        // 企业简称
        short_name: "",
        // 企业简介
        intro: "",
        // 企业备注
        remark: ""
      },
      // 宽度
      formLabelWidth: "80px",
      // 添加表单的验证规则
      editFormRules: {
        eid: [{ required: true, message: "企业编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "企业名称不能为空", trigger: "blur" }],
        short_name: [{ required: true, message: "企业名称不能为空", trigger: "blur" }],
        intro: [{ required: true, message: "企业名称不能为空", trigger: "blur" }],
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          // 对
          // 调用接口,发送axios请求
          enterpriseEdit(this.editForm).then(res => {
            // window.console.log(res);
            if (res.code === 200) {
              this.$message.success("已成功保存新数据!");
              // 关闭弹框
              this.$parent.editFormVisible = false;
              // 重新渲染企业列表
              this.$parent.getData();
            } else if (res.code === 201) {
              this.$message.warning("企业编号已存在,请重新输入!");
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
// 编辑对话框
.edit-dialog {
  // 设置宽度
  .el-dialog {
    width: 602px;

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