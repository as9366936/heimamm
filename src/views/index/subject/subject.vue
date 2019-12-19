<template>
  <div class="subject-box">
    <!-- 头部卡片 -->
    <el-card class="headCard">
      <!-- 头部表单 -->
      <el-form :inline="true" :model="subjectForm" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="subjectForm.number" class="shortInput"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="subjectForm.name" class="longInput"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="subjectForm.creator" class="shortInput"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="subjectForm.state" class="longInput" placeholder="请选择状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button>清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-plus" type="primary">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容卡片 -->
    <el-card class="contentCard">
      <!-- 内容表单 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科姓名"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <template>
          <span>启用</span>
          <span>禁用</span>
        </template>
        <el-table-column label="操作">
          <template>
            <el-button type="text">编辑</el-button>
            <el-button type="text">禁用</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "subject",
  data() {
    return {
      // 头部表单
      subjectForm: {
        number: "",
        name: "",
        creator: "",
        state: ""
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
          status: "启用",
          operate: ""
        },
        {
          index: "1",
          rid: "QD001",
          name: "java",
          short_name: "后端",
          username: "北冰洋",
          create_time: "2019-11-21",
          status: "禁用",
          operate: ""
        }
      ],
      // 当前页
      currentPage: 1
    };
  },
  methods: {}
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
      color: #7A7C7F;
      font-weight: bold;
    }

    tbody {
      color: #5A5D62;
      font-weight: bold;

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