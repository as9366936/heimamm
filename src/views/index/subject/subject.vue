<template>
  <div class="subject-box">
    <!-- 头部卡片 -->
    <el-card class="headCard">
      <!-- 头部表单 -->
      <el-form :inline="true" :model="subjectForm" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="subjectForm.rid" class="shortInput"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="subjectForm.name" class="longInput"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="subjectForm.username" class="shortInput"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="subjectForm.status" class="longInput" placeholder="请选择状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clearData">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-plus" type="primary" @click="addFormVisible = true">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容卡片 -->
    <el-card class="contentCard">
      <!-- 内容表单 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span class="forbidden" v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
            <el-button type="text">{{scope.row.status === 1?"禁用": "启用"}}</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 新增对话框 -->
    <addDialog></addDialog>
  </div>
</template>

<script>
// 导入组件
import addDialog from "./components/addDialog.vue";
// 导入接口
import { subjectList } from "../../../api/subject.js";
export default {
  name: "subject",
  // 注册组件
  components: {
    addDialog
  },
  data() {
    return {
      // 头部表单
      subjectForm: {
        // 学科编号
        rid: "",
        // 学科名称
        name: "",
        // 创建者
        username: "",
        // 状态
        status: ""
      },
      // 内容表单
      tableData: [
        {
          index: "1",
          rid: "QD001",
          name: "前端与移动开发",
          short_name: "前端",
          username: "刘洋洋",
          create_time: "2019-11-21",
          status: "启用"
        },
        {
          index: "1",
          rid: "QD001",
          name: "java",
          short_name: "后端",
          username: "北冰洋",
          create_time: "2019-11-21",
          status: "禁用"
        }
      ],

      // 是否显示新增对话框
      addFormVisible: false,
      // 页数据
      // 页码
      page: 1,
      // 每一页多少条
      limit: 4,
      // 页容量选项 数组
      pageSizes: [2, 4, 6, 8],
      // 总条数
      total: 0
    };
  },
  methods: {
    // 获取数据
    getData() {
      // 传递一个参数
      subjectList({
        page: this.page,
        limit: this.limit,
        // 展开运算符(扩展运算符)
        ...this.subjectForm
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
    clearData(){
      // for (let key in this.subjectForm){
      //   // 获取每一个属性
      //   this.subjectForm[key] = "";
      // }
      this.subjectForm = {},
      // 重新获取数据
      this.getData();
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="less">
.subject-box {
  // 头部卡片
  .headCard {
    margin-bottom: 19px;

    .shortInput {
      width: 100px;
    }

    .longInput {
      width: 149px;
    }
    // 头部表单文字
    .el-form-item__label {
      color: #7a7c7f;
      font-weight: bold;
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