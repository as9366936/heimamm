<template>
  <!-- 新增对话框 -->
  <el-dialog
    fullscreen
    class="add-dialog"
    center
    title="新增题库"
    :visible.sync="$parent.addFormVisible"
  >
    <el-form ref="addForm" :model="addForm" :rules="addFormRules">
      <el-form-item label="学科" prop="subject" :label-width="formLabelWidth">
        <el-select v-model="addForm.subject" placeholder="请选择学科">
          <el-option
            v-for="(item, index) in $parent.subjectList"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阶段" prop="step" :label-width="formLabelWidth">
        <el-select v-model="addForm.step" placeholder="请选择阶段">
          <el-option label="初级" value="1"></el-option>
          <el-option label="中级" value="2"></el-option>
          <el-option label="高级" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" prop="enterprise" :label-width="formLabelWidth">
        <el-select v-model="addForm.enterprise" placeholder="请选择企业">
          <el-option
            v-for="(item, index) in $parent.enterpriseList"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" prop="city" :label-width="formLabelWidth">
        <el-cascader
          size="large"
          :props="{ expandTrigger: 'hover', value: 'label'}"
          :options="options"
          v-model="addForm.city"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="题型" prop="type" :label-width="formLabelWidth">
        <el-radio-group v-model="addForm.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" prop="difficulty" :label-width="formLabelWidth">
        <el-radio-group v-model="addForm.difficulty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">苦难</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.addFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">新 增</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入 新增接口
import { questionAdd } from "../../../../api/question.js";
// 导入 省市区数据
import { regionData } from "element-china-area-data";
export default {
  data() {
    return {
      // 级联选择器的数据
      options: regionData,
      selectedOptions: [],

      // 新增对话框表单
      addForm: {
        // 学科
        subject: "",
        // 阶段
        step: "",
        // 企业
        enterprise: "",
        // 城市
        city: "",
        // 题型
        type: 1,
        // 难度
        difficulty: 1
      },
      // 宽度
      formLabelWidth: "80px",
      // 添加表单的验证规则
      addFormRules: {
        subject: [{ required: true, message: "请选择学科", trigger: "blur" }],
        step: [{ required: true, message: "请选择阶段", trigger: "blur" }],
        enterprise: [
          { required: true, message: "请选择企业", trigger: "blur" }
        ],
        city: [{ required: true, message: "请选择城市", trigger: "blur" }],
        type: [{ required: true, message: "请选择题型", trigger: "blur" }],
        difficulty: [{ required: true, message: "请选择难度", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          // 对
          // 调用接口,发送axios请求
          questionAdd(this.addForm).then(res => {
            // window.console.log(res);
            if (res.code === 200) {
              this.$message.success("新增成功!");
              // 关闭弹框
              this.$parent.addFormVisible = false;
              // 重新渲染学科列表
              this.$parent.getData();
              // 清空已输入的数据
              this.addForm = {};
            } else if (res.code === 201) {
              this.$message.warning("学科编号已存在,请重新输入!");
            }
          });
        } else {
          // 错
          this.$message.error("请检查数据!");
          return false;
        }
      });
    },
    handleChange(value) {
      window.console.log(value);
    }
  }
};
</script>

<style lang="less">
// 新增学科对话框
.add-dialog {
  // 设置宽度
  .el-dialog {
    .el-form {
      width: 60%;
      margin: 0 auto;
    }

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