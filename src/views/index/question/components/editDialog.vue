<template>
  <!-- 编辑对话框 -->
  <el-dialog
    fullscreen
    @opened="opened"
    class="edit-dialog"
    center
    title="编辑题库"
    :visible.sync="$parent.editFormVisible"
  >
    <el-form ref="editForm" :model="editForm" :rules="editFormRules">
      <el-form-item label="学科" prop="subject" :label-width="formLabelWidth">
        <el-select v-model="editForm.subject" placeholder="请选择学科">
          <el-option
            v-for="(item, index) in $parent.subjectList"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阶段" prop="step" :label-width="formLabelWidth">
        <el-select v-model="editForm.step" placeholder="请选择阶段">
          <el-option label="初级" value="1"></el-option>
          <el-option label="中级" value="2"></el-option>
          <el-option label="高级" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" prop="enterprise" :label-width="formLabelWidth">
        <el-select v-model="editForm.enterprise" placeholder="请选择企业">
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
          v-model="editForm.city"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="题型" prop="type" :label-width="formLabelWidth">
        <el-radio-group v-model="editForm.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" prop="difficulty" :label-width="formLabelWidth">
        <el-radio-group v-model="editForm.difficulty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <el-form-item label="试题标题" prop="title">
        <!-- 隐藏一个input,做非空判断联动 -->
        <el-input v-model="editForm.title" style="display: none"></el-input>
      </el-form-item>
      <div class="title-toolbar"></div>
      <div class="title-content"></div>
      <!-- 选项区域--单选 -->
      <el-form-item v-if="editForm.type === 1" label="单选" prop="single_select_answer">
        <el-radio-group v-model="editForm.single_select_answer" class="choose">
          <!-- 选项A -->
          <div class="radio-box">
            <el-radio label="A">A</el-radio>
            <!-- 输入框 -->
            <el-input v-model="editForm.select_options[0].text"></el-input>
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
            <el-input v-model="editForm.select_options[1].text"></el-input>
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
            <el-input v-model="editForm.select_options[2].text"></el-input>
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
            <el-input v-model="editForm.select_options[3].text"></el-input>
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
      <!-- 选项区域--多选 -->
      <el-form-item v-else-if="editForm.type === 2" label="多选" prop="multiple_select_answer">
        <el-checkbox-group v-model="editForm.multiple_select_answer" class="choose">
          <!-- 选项A -->
          <div class="radio-box">
            <el-checkbox label="A">A</el-checkbox>
            <!-- 输入框 -->
            <el-input v-model="editForm.select_options[0].text"></el-input>
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
            <el-checkbox label="B">B</el-checkbox>
            <!-- 输入框 -->
            <el-input v-model="editForm.select_options[1].text"></el-input>
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
            <el-checkbox label="C">C</el-checkbox>
            <!-- 输入框 -->
            <el-input v-model="editForm.select_options[2].text"></el-input>
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
            <el-checkbox label="D">D</el-checkbox>
            <!-- 输入框 -->
            <el-input v-model="editForm.select_options[3].text"></el-input>
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
        </el-checkbox-group>
      </el-form-item>
      <!-- 选项区域--简答 -->
      <el-form-item v-else-if="editForm.type === 3" label="简答题" prop="short_answer">
        <el-input v-model="editForm.short_answer" type="textarea" :rows="6"></el-input>
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 视频上传区域 -->
      <el-form-item label="解析视频">
        <!-- 上传组件 -->
        <el-upload
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleVideoSuccess"
          :before-upload="beforeVideoUpload"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传视频格式文件</div>
        </el-upload>
        <video class="video" :src="VideoUrl" v-if="VideoUrl" controls></video>
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 答案解析 -->
      <el-form-item label="答案解析" prop="answer_analyze">
        <!-- 隐藏一个input,做非空判断联动 -->
        <el-input v-model="editForm.answer_analyze" style="display: none"></el-input>
      </el-form-item>
      <div class="answer-toolbar"></div>
      <div class="answer-content"></div>
      <!-- 分割线 -->
      <el-divider class="bottom_divider"></el-divider>
      <!-- 试题备注 -->
      <el-form-item label="试题备注" prop="remark">
        <el-input type="textarea" v-model="editForm.remark" :rows="2"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.editFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">编 辑</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入 编辑接口
import { questionEdit } from "../../../../api/question.js";
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

      // 编辑对话框表单
      editForm: {
        // 题型 默认单选
        type: 1,
        // 多选的 答案
        multiple_select_answer: [],
        // 标题
        title: "",
        // 单选的 答案
        answer_analyze: "",
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
      editFormRules: {
        // 学科 subject
        subject: [{ required: true, message: "请选择学科", trigger: "change" }],
        // 阶段 step
        step: [{ required: true, message: "请选择阶段", trigger: "change" }],
        // 企业 enterprise
        enterprise: [
          { required: true, message: "请选择企业", trigger: "change" }
        ],
        // 城市 city
        city: [{ required: true, message: "请选择城市", trigger: "change" }],
        // 题型 type
        type: [{ required: true, message: "请选择题型", trigger: "change" }],
        // 难度 difficulty
        difficulty: [
          { required: true, message: "请选择难度", trigger: "change" }
        ],
        // 标题 title
        title: [
          { required: true, message: "请填写试题的标题", trigger: "change" }
        ],
        // 单选题答案 single_select_answer
        single_select_answer: [
          { required: true, message: "单选题答案不能为空", trigger: "change" }
        ],
        // 多选题答案 multiple_select_answer
        multiple_select_answer: [
          { required: true, message: "多选题答案不能为空", trigger: "change" }
        ],
        // 简答题答案 short_answer
        short_answer: [
          { required: true, message: "简答题答案不能为空", trigger: "change" }
        ],
        // 答案解析 answer_analyze
        answer_analyze: [
          { required: true, message: "答案解析不能为空", trigger: "change" }
        ],
        // 备注 remark
        remark: [{ required: true, message: "备注不能为空", trigger: "change" }]
      },
      // 副文本编辑器, 标题部分
      titleEditor: undefined,
      // 副文本编辑器, 解析部分
      answerEditor: undefined,

      // 本地预览地址
      imageAUrl: "",
      imageBUrl: "",
      imageCUrl: "",
      imageDUrl: "",
      // 文件的上传地址
      uploadUrl: process.env.VUE_APP_BASEURL + "/question/upload",
      // 视频临时地址
      VideoUrl: ""
    };
  },
  methods: {
    submitForm() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          // 对
          // 调用接口,发送axios请求
          questionEdit(this.editForm).then(res => {
            // window.console.log(res);
            if (res.code === 200) {
              this.$message.success("编辑成功!");
              // 关闭弹框
              this.$parent.editFormVisible = false;
              // 重新渲染题目列表
              this.$parent.getData();
              // 清空已输入的数据
              // this.editForm = {};
            } else if (res.code === 201) {
              this.$message.warning(res.message);
            }
          });
        } else {
          // 错
          this.$message.error("请检查数据!");
          return false;
        }
      });
    },
    opened() {
      // 使用 wangeditor
      // var E = window.wangEditor;
      // var editor2 = new E("#div3");
      // editor2.create();

      // 试题标题部分
      if (this.titleEditor === undefined) {
        this.titleEditor = new wangeditor(".title-toolbar", ".title-content");
        // 注册change事件  这里注意this的指向,最好使用箭头函数
        this.titleEditor.customConfig.onchange = html => {
          // html 即变化之后的内容
          // window.console.log(html);
          // 设置给标题
          this.editForm.title = html;
          // window.console.log(this.editForm.title);
        };
        this.titleEditor.create();
        // 设置标题的内容
        this.titleEditor.txt.html(this.editForm.title);
      }
      // 答案解析部分
      if (this.answerEditor === undefined) {
        this.answerEditor = new wangeditor(
          ".answer-toolbar",
          ".answer-content"
        );
        // 注册change事件  这里注意this的指向,最好使用箭头函数
        this.answerEditor.customConfig.onchange = html => {
          // html 即变化之后的内容
          // window.console.log(html);
          // 设置给答案解析
          this.editForm.answer_analyze = html;
        };
        this.answerEditor.create();
        // 设置答案解析的内容
        this.answerEditor.txt.html(this.editForm.answer_analyze);
      }

      // 数组翻转一下
      this.editForm.select_options.reverse();

      // 处理图片地址
      this.imageAUrl =
        process.env.VUE_APP_BASEURL +
        "/" +
        this.editForm.select_options[0].image;
      this.imageBUrl =
        process.env.VUE_APP_BASEURL +
        "/" +
        this.editForm.select_options[1].image;
      this.imageCUrl =
        process.env.VUE_APP_BASEURL +
        "/" +
        this.editForm.select_options[2].image;
      this.imageDUrl =
        process.env.VUE_APP_BASEURL +
        "/" +
        this.editForm.select_options[3].image;

      // 处理视频地址
      this.VideoUrl = process.env.VUE_APP_BASEURL + "/" + this.editForm.video;
      window.console.log(this.editForm);
    },

    // 文件上传成功的钩子
    handleAvatarSuccess(res, file) {
      // 保存头像地址
      this.editForm.select_options[0].image = res.data.url;
      // 生成本地的临时地址
      this.imageAUrl = URL.createObjectURL(file.raw);
    },
    handleBvatarSuccess(res, file) {
      // 保存头像地址
      this.editForm.select_options[1].image = res.data.url;
      // 生成本地的临时地址
      this.imageBUrl = URL.createObjectURL(file.raw);
    },
    handleCvatarSuccess(res, file) {
      // 保存头像地址
      this.editForm.select_options[2].image = res.data.url;
      // 生成本地的临时地址
      this.imageCUrl = URL.createObjectURL(file.raw);
    },
    handleDvatarSuccess(res, file) {
      // 保存头像地址
      this.editForm.select_options[3].image = res.data.url;
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
    },
    // 视频上传成功的钩子
    handleVideoSuccess(res, file) {
      // window.console.log(res);
      // 存入要上传的表单中
      this.editForm.video = res.data.url;
      // 生成本地的临时地址
      this.VideoUrl = URL.createObjectURL(file.raw);
    },
    // 视频上传判断 的逻辑
    beforeVideoUpload(file) {
      const isJPG = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 50; // 不能超过50M
      if (!isJPG) {
        this.$message.error("上传视频只能是 mp4 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传的视频大小不能超过 50MB!");
      }
      return isJPG && isLt2M;
    }
  },

  // mounted 是第一次加载完毕, 但是对话框还没有加载出来
  mounted() {}
};
</script>

<style lang="less">
// 编辑学科对话框
.edit-dialog {
  // 设置宽度
  .el-dialog {
    .el-form {
      width: 60%;
      margin: 0 auto;

      .title-toolbar,
      .answer-toolbar {
        border: 1px solid #c7c7c7;
        border-bottom: none;
      }

      .title-content,
      .answer-content {
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
      .choose {
        width: 100%;
      }
      // 多选框组
      .el-checkbox-group {
        margin-top: 40px;

        .avatar-uploader {
          height: 180px;
        }
      }
      // 单选框
      .radio-box {
        display: flex;
        align-items: center;
        margin-left: 81px;
        margin-bottom: 45px;
        // 多选框样式
        .el-checkbox {
          margin-right: 30px;
        }

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

      // 视频窗大小
      .video {
        width: 660px;
      }

      .bottom_divider {
        margin-top: 59px;
      }
    }
  }
}
</style>