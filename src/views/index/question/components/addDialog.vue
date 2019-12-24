<template>
  <!-- 新增对话框 -->
  <el-dialog
    fullscreen
    @opened="opened"
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
        <!-- 将value值 设置为 label的选项 -->
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
      <!-- 分割线 -->
      <el-divider></el-divider>
      <el-form-item label="试题标题" prop="title"></el-form-item>
      <div class="title-toolbar"></div>
      <div class="title-content"></div>
      <!-- 选项区域--单选 -->
      <el-form-item label="单选">
        <el-radio-group v-model="addForm.single_select_answer" class="radio_choose">
          <!-- 选项A -->
          <div class="radio-box">
            <el-radio label="A">A</el-radio>
            <!-- 输入框 -->
            <el-input v-model="addForm.select_options[0].text"></el-input>
            <!-- 上传组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageAUrl" :src="imageAUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项B -->
          <div class="radio-box">
            <el-radio label="B">B</el-radio>
            <!-- 输入框 -->
            <el-input v-model="addForm.select_options[1].text"></el-input>
            <!-- 上传组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleBvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageBUrl" :src="imageBUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项C -->
          <div class="radio-box">
            <el-radio label="C">C</el-radio>
            <!-- 输入框 -->
            <el-input v-model="addForm.select_options[2].text"></el-input>
            <!-- 上传组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleCvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageCUrl" :src="imageCUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项D -->
          <div class="radio-box">
            <el-radio label="D">D</el-radio>
            <!-- 输入框 -->
            <el-input v-model="addForm.select_options[3].text"></el-input>
            <!-- 上传组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleDvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageDUrl" :src="imageDUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
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
// 导入富文本编辑器
import wangeditor from "wangeditor";
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
        difficulty: "",
        // 标题
        title: "",
        // 选项的数据
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ]
      },
      // 宽度
      formLabelWidth: "",
      // 添加表单的验证规则
      addFormRules: {
        subject: [{ required: true, message: "请选择学科", trigger: "change" }],
        step: [{ required: true, message: "请选择阶段", trigger: "change" }],
        enterprise: [
          { required: true, message: "请选择企业", trigger: "change" }
        ],
        city: [{ required: true, message: "请选择城市", trigger: "change" }],
        type: [{ required: true, message: "请选择题型", trigger: "change" }],
        difficulty: [
          { required: true, message: "请选择难度", trigger: "change" }
        ],
        title: [
          { required: true, message: "请填写试题的标题", trigger: "change" }
        ]
      },
      // 副文本编辑器, 标题部分
      titleEditor: undefined,

      // 本地预览地址
      imageAUrl: "",
      imageBUrl: "",
      imageCUrl: "",
      imageDUrl: "",

      // 文件的上传地址
      uploadUrl: process.env.VUE_APP_BASEURL + "/question/upload"
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
    },
    opened() {
      // 使用 wangeditor
      // var E = window.wangEditor;
      // var editor2 = new E("#div3");
      // editor2.create();
      if (this.titleEditor === undefined) {
        this.titleEditor = new wangeditor(".title-toolbar", ".title-content");
        // 注册change事件  这里注意this的指向,最好使用箭头函数
        this.titleEditor.customConfig.onchange = html => {
          // html 即变化之后的内容
          window.console.log(html);
          // 设置给标题
          this.addForm.title = html;
        };
        this.titleEditor.create();
      }
    },
    // 文件上传成功的钩子
    handleAvatarSuccess(res, file) {
      // 保存头像地址
      this.addForm.select_options[0].image = res.data.file_path;
      // 生成本地的临时地址
      this.imageAUrl = URL.createObjectURL(file.raw);
    },
    handleBvatarSuccess(res, file) {
      // 保存头像地址
      this.addForm.select_options[1].image = res.data.file_path;
      // 生成本地的临时地址
      this.imageBUrl = URL.createObjectURL(file.raw);
    },
    handleCvatarSuccess(res, file) {
      // 保存头像地址
      this.addForm.select_options[2].image = res.data.file_path;
      // 生成本地的临时地址
      this.imageCUrl = URL.createObjectURL(file.raw);
    },
    handleDvatarSuccess(res, file) {
      // 保存头像地址
      this.addForm.select_options[3].image = res.data.file_path;
      // 生成本地的临时地址
      this.imageDUrl = URL.createObjectURL(file.raw);
    },
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
    }
  },
  // mounted 是第一次加载完毕, 但是对话框还没有加载出来
  mounted() {}
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

      .title-toolbar {
        border: 1px solid #c7c7c7;
        border-bottom: none;
      }

      .title-content {
        border: 1px solid #c7c7c7;
        height: 100px;
      }

      .el-dialog__header {
        background: linear-gradient(to right, #01c4fa, #1394fa);
        // 文字
        span,
        i {
          color: white;
        }
      }
      .radio_choose {
        width: 100%;
      }
      // 单选框
      .radio-box {
        display: flex;
        align-items: center;
        margin-left: 81px;
        margin-bottom: 45px;

        // 上传组件的样式
        // 头像居中
        .avatar-uploader {
          text-align: center;
          margin-left: 20px;
          margin-right: 16px;
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
    }
  }
}
</style>