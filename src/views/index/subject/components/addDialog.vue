<template>
  <!-- 新增对话框 -->
  <el-dialog class="add-dialog" center title="新增学科" :visible.sync="$parent.addFormVisible">
    <el-form ref="addForm" :model="addForm" :rules="addFormRules">
      <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth">
        <el-input v-model="addForm.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="addForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input v-model="addForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="addForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.addFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入接口
import { subjectAdd } from "../../../../api/subject.js";
export default {
  data() {
    return {
      // 新增对话框表单
      addForm: {
        // 学科编号
        rid: "",
        // 学科名称
        name: "",
        // 学科简称
        short_name: "",
        // 学科简介
        intro: "",
        // 学科备注
        remark: ""
      },
      // 宽度
      formLabelWidth: "80px",
      // 添加表单的验证规则
      addFormRules: {
        rid: [{ required: true, message: "学科编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "学科名称不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          // 对
          // 调用接口,发送axios请求
          subjectAdd(this.addForm).then(res => {
            window.console.log(res);
            if (res.code === 200) {
              this.$message.success("新增成功!");
              // 关闭弹框
              this.$parent.addFormVisible = false;
              // 重新渲染学科列表
              this.$parent.getData();
            }else if(res.code === 201){
              this.$message.warning("学科编号已存在,请重新输入!");
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
// 新增学科对话框
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