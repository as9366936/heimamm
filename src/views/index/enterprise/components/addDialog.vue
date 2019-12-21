<template>
  <!-- 新增对话框 -->
  <el-dialog class="add-dialog" center title="新增企业" :visible.sync="$parent.addFormVisible">
    <el-form ref="addForm" :model="addForm" :rules="addFormRules">
      <el-form-item label="企业编号" prop="eid" :label-width="formLabelWidth">
        <el-input v-model="addForm.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="addForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" prop="intro" :label-width="formLabelWidth">
        <el-input v-model="addForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" :label-width="formLabelWidth">
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
import { enterpriseAdd } from "../../../../api/enterprise.js";
export default {
  data() {
    return {
      // 新增对话框表单
      addForm: {
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
      addFormRules: {
        eid: [{ required: true, message: "企业编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "企业名称不能为空", trigger: "blur" }],
        short_name: [{ required: true, message: "企业简称不能为空", trigger: "blur" }],
        intro: [{ required: true, message: "企业简介不能为空", trigger: "blur" }],
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          // 对
          // 调用接口,发送axios请求
          enterpriseAdd(this.addForm).then(res => {
            window.console.log(res);
            if (res.code === 200) {
              this.$message.success("新增成功!");
              // 关闭弹框
              this.$parent.addFormVisible = false;
              // 重新渲染企业列表
              this.$parent.getData();
              // 清空已输入的数据
              this.addForm = {};
            }else if(res.code === 201){
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
// 新增企业对话框
.add-dialog {
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