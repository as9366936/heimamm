<template>
  <div class="user-box">
    <!-- 头部卡片 -->
    <el-card class="headCard">
      <!-- 头部表单 -->
      <el-form :inline="true" :model="userForm" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input v-model="userForm.username" class="shortInput"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="userForm.email" class="longInput"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="userForm.role_id" class="longInput" placeholder="请选择角色">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clearData">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-plus" type="primary" @click="addFormVisible = true">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容卡片 -->
    <el-card class="contentCard">
      <!-- 内容表单 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role_id" label="角色">
          <template slot-scope="scope">
            <span v-if="scope.row.role_id === 2">管理员</span>
            <span v-else-if="scope.row.role_id === 3">老师</span>
            <span v-else>学生</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span class="forbidden" v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{scope.row.status === 1?"禁用": "启用"}}</el-button>
            <el-button type="text" @click="deleteData(scope.row)">删除</el-button>
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
import { userList, userRemove, userStatus } from "../../../api/user.js";
export default {
  name: "user",
  // 注册组件
  components: {
    addDialog,
    editDialog
  },
  data() {
    return {
      // 头部表单
      userForm: {
        // 用户名称
        username: "",
        // 用户邮箱
        email: "",
        // 角色
        role_id: ""
      },
      // 内容表单
      tableData: [],

      // 是否显示新增对话框
      addFormVisible: false,
      // 是否显示编辑对话框
      editFormVisible: false,
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
      userList({
        page: this.page,
        limit: this.limit,
        // 展开运算符(扩展运算符)
        ...this.userForm
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
      // for (let key in this.userForm){
      //   // 获取每一个属性
      //   this.userForm[key] = "";
      // }
      (this.userForm = {}),
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
          userRemove({ id: item.id }).then(res => {
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
      userStatus({ id: item.id }).then(res => {
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
    this.getData();
  }
};
</script>

<style lang="less">
.user-box {
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