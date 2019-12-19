<template>
  <!-- 新增对话框 -->
  <el-dialog class="add-dialog" center title="新增学科" :visible.sync="$parent.addFormVisible">
    <el-form :model="addForm">
      <el-form-item label="学科编号" :label-width="formLabelWidth">
        <el-input v-model="addForm.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" :label-width="formLabelWidth">
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
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
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
    };
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