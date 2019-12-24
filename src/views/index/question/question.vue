<template>
  <div class="question-box">
    <!-- 头部卡片 -->
    <el-card class="headCard">
      <!-- 头部表单 -->
      <el-form :inline="true" :model="questionForm" class="demo-form-inline">
        <el-form-item label="学科">
          <el-select v-model="questionForm.status" class="longInput" placeholder="请选择学科">
            <el-option
              v-for="(item, index) in subjectList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段">
          <el-select v-model="questionForm.step" class="longInput" placeholder="请选择阶段">
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <el-select v-model="questionForm.status" class="longInput" placeholder="请选择企业">
            <el-option
              v-for="(item, index) in enterpriseList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型">
          <el-select v-model="questionForm.type" class="longInput" placeholder="请选择题型">
            <el-option label="单选" value="1"></el-option>
            <el-option label="多选" value="2"></el-option>
            <el-option label="简答" value="3"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="难度">
          <el-select v-model="questionForm.difficulty" class="longInput" placeholder="请选择难度">
            <el-option label="简单" value="1"></el-option>
            <el-option label="一般" value="2"></el-option>
            <el-option label="困难" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="questionForm.rid" class="longInput"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="questionForm.status" class="longInput" placeholder="请选择状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-input v-model="questionForm.rid" class="longInput" placeholder="选择日期"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="标题">
          <el-input v-model="questionForm.rid" class="titleInput"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData" class="search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clearData" class="clear">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-plus" type="primary" @click="addFormVisible = true">新增题库</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容卡片 -->
    <el-card class="contentCard">
      <!-- 内容表单 -->
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="title" label="题目"></el-table-column>
        <el-table-column prop="name" label="学科.阶段"></el-table-column>
        <el-table-column prop="type" label="题型"></el-table-column>
        <el-table-column prop="username" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span class="forbidden" v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="访问量"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{scope.row.status === 1?"禁用": "启用"}}</el-button>
            <el-button type="text" @click="deleteData(scope.row)" v-remove="['老师', '学生']">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 新增对话框 -->
    <addDialog></addDialog>
    <!-- 编辑对话框 -->
    <editDialog ref="editDialog"></editDialog>
  </div>
</template>

<script>
// 导入组件
import addDialog from "./components/addDialog.vue";
import editDialog from "./components/editDialog.vue";
// 导入接口
import {
  questionList,
  questionRemove,
  questionStatus
} from "../../../api/question.js";
import { enterpriseList } from "../../../api/enterprise.js";
import { subjectList } from "../../../api/subject.js";
export default {
  name: "question",
  // 注册组件
  components: {
    addDialog,
    editDialog
  },
  data() {
    return {
      // 头部表单
      questionForm: {},
      // 内容表单
      tableData: [],
      // 定义企业数据
      enterpriseList: [],
      // 定义学科数据
      subjectList: [],
      // 是否显示新增对话框
      addFormVisible: false,
      // 是否显示编辑对话框
      editFormVisible: false,
      // 分页相关的数据
      // 页码
      page: 1,
      // 页容量
      limit: 4,
      // 容量数组
      pageSizes: [2, 4, 6, 8],
      // 总条数
      total: 0
    };
  },
  methods: {
    // 获取数据
    getData() {
      // 传递一个参数
      questionList({
        page: this.page,
        limit: this.limit,
        // 展开运算符(扩展运算符)
        ...this.questionForm
      }).then(res => {
        // window.console.log(res);
        if (res.code === 200) {
          // 保存表格数据
          this.tableData = res.data.items;
          // 保存总条数
          this.total = res.data.pagination.total;
        }
      });
    },
    // 清空搜索的数据
    clearData() {
      // for (let key in this.questionForm){
      //   // 获取每一个属性
      //   this.questionForm[key] = "";
      // }
      (this.questionForm = {}),
        // 重新获取数据
        this.getData();
    },
    // 页容量改变
    // size 页容量
    handleSizeChange(size) {
      // window.console.log(size);
      // 改变页容量的时候,默认返回第一页
      this.page = 1;
      // 保存页容量
      this.limit = size;
      // 重新获取数据
      this.getData();
    },
    // 页码改变
    // 当前的页数
    handleCurrentChange(page) {
      // window.console.log(page);
      // 保存页码
      this.page = page;
      // 重新获取数据
      this.getData();
    },
    // 清除数据
    deleteData(item) {
      this.$confirm("是否要删除该数据?", "友情提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 调用移除接口
          questionRemove({ id: item.id }).then(res => {
            // window.console.log(res);
            if (res.code === 200) {
              // 提示用户
              this.$message.success("删除成功!");
              // 重新获取数据
              this.getData();
            }
          });
        })
        .catch(() => {});
    },
    // 点击切换状态
    changeStatus(item) {
      // 调用切换状态的接口
      questionStatus({ id: item.id }).then(res => {
        // window.console.log(res);
        if (res.code === 200) {
          // 重新获取数据
          this.getData();
          // 提示一下
          this.$message.success("状态修改成功!");
        }
      });
    },
    // 开始编辑
    showEdit(item) {
      // 显示编辑对话框
      this.editFormVisible = true;
      // 复杂类型的赋值 是引用地址赋值
      // JSON.parse(JSON.stringify(item)); 深拷贝  function无法拷贝
      this.$refs.editDialog.editForm = JSON.parse(JSON.stringify(item));
    }
  },
  created() {
    // 调用 数据获取接口
    this.getData();
    // 获取企业数据
    enterpriseList().then(res => {
      // window.console.log(res);
      this.enterpriseList = res.data.items;
    });
    // 获取学科数据
    subjectList().then(res => {
      // window.console.log(res);
      this.subjectList = res.data.items;
    });
  }
};
</script>

<style lang="less">
.question-box {
  // 头部卡片
  .headCard {
    margin-bottom: 19px;

    .el-card__body {
      padding-left: 11px;
    }

    .el-form-item {
      margin-right: 0;

      .el-form-item__label {
        padding: 0 30px 0;
      }
    }

    .titleInput {
      width: 388px;
    }

    .longInput {
      width: 150px;
    }
    // 头部表单文字
    .el-form-item__label {
      color: #7a7c7f;
      font-weight: bold;
    }

    .search {
      margin-left: 11px;
      margin-right: 11px;
    }

    .clear {
      margin-right: 10px;
    }
    // 头部表单按钮中的文字
    .el-form-item__content {
      span,
      .el-icon-plus {
        font-weight: bold;
      }
    }
  }
  // 内容卡片
  .contentCard {
    thead {
      color: #7a7c7f;
      font-weight: bold;
    }

    tbody {
      color: #5a5d62;
      font-weight: bold;
      // 禁用按钮颜色
      .forbidden {
        color: #ff3d3d;
      }
      // 内容按钮文字加粗
      .el-button--text {
        span {
          font-weight: bold;
        }
      }
    }
    // 分页器
    .el-pagination {
      margin-top: 30px;
      // 行内块居中
      text-align: center;
    }
  }
}
</style>