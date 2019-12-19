<template>
  <div class="subject-box">
    <!-- 头部 -->
    <el-card class="box-card headCard">
      <!-- 头部表单 -->
      <el-form :inline="true" :model="subjectForm" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="subjectForm.number" class="subNumber"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="subjectForm.name" class="subName"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="subjectForm.creator" class="creator"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="subjectForm.state" class="state" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button>清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">+ 新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容 -->
    <el-card class="box-card contentCard">
      <!-- 内容表单 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="number" label="序号"></el-table-column>
        <el-table-column prop="subNumber" label="学科编号"></el-table-column>
        <el-table-column prop="subName" label="学科姓名"></el-table-column>
        <el-table-column prop="shortName" label="简称"></el-table-column>
        <el-table-column prop="creator" label="创建者"></el-table-column>
        <el-table-column prop="dateCreated" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="operate" label="操作"></el-table-column>
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
          number: "1",
          subNumber: "QD001",
          subName: "前端与移动开发",
          shortName: "前端",
          creator: "刘洋洋",
          dateCreated: "2019-11-21",
          status: "启用",
          operate: ""
        },
        {
          number: "1",
          subNumber: "QD001",
          subName: "java",
          shortName: "后端",
          creator: "北冰洋",
          dateCreated: "2019-11-21",
          status: "禁用",
          operate: ""
        }
      ],
      // 当前页
      currentPage: 1,
    };
  },
  methods: {}
};
</script>

<style lang="less">
.subject-box {

  .headCard {
    margin-bottom: 19px;

    .subNumber {
      width: 100px;
      height: 39px;
    }

    .subName {
      width: 149px;
      height: 39px;
    }

    .creator {
      width: 100px;
      height: 39px;
    }

    .state {
      width: 149px;
      height: 39px;
    }
  }

  .contentCard {
    .el-pagination {
      margin-top: 30px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>