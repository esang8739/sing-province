<template>
  <el-card style="width: 100%; height: 100%; min-width: 1200px">
    <h1 style="font-weight: 400; font-size: 28px; transform: translateX(45%)">
      审批记录
    </h1>

    <div class="content">
      <!-- 上方搜索区域 -->
      <div class="title">
        <!-- 下拉框搜索 -->
        <div class="activityType">
          <span>活动类型：</span
          ><el-select
            @change="getSingList"
            v-model="singListValue"
            placeholder="请选择"
          >
            <el-option
              v-for="item in singType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <!-- 搜索栏搜索 -->
        <div class="search">
          <el-input
            placeholder="根据学校名称查询"
            v-model="searchValue"
            @keyup.enter.native="searchbtn"
          >
            <i
              slot="suffix"
              class="el-input__icon el-icon-search"
              @click="searchbtn"
            ></i>
          </el-input>
        </div>
      </div>
      <!-- 下方表格区域 -->
      <div class="singTable">
        <el-table
          :data="
            singListData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
          stripe
          style="width: 100%"
        >
          <el-table-column
            key="1"
            label="活动类型"
            header-align="center"
            align="center"
            >原创征集
          </el-table-column>
          <el-table-column
            key="2"
            prop="school_name"
            label="学校名"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            key="3"
            prop="id"
            label="节目编号"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            key="updated_at"
            prop="updated_at"
            label="审批时间"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <!-- 原创征集 -->
          <el-table-column
            key="6"
            v-if="singListValue == 'original'"
            label="审核状态"
            header-align="center"
            align="center"
          >
            <template #default="scope">
              <span
                v-if="scope.row.original_state == '4'"
                style="color: #57bc84"
                >已通过</span
              >
              <span
                v-if="scope.row.original_state !== '4'"
                style="color: #ff1313"
                >已驳回</span
              >
            </template>
          </el-table-column>
          <!-- 传唱征集 -->
          <el-table-column
            key="7"
            v-if="singListValue == 'singsong'"
            label="审核状态"
            header-align="center"
            align="center"
          >
            <template #default="scope">
              <span
                v-if="scope.row.singsong_state == '4'"
                style="color: #57bc84"
                >已通过</span
              >
              <span
                v-if="scope.row.singsong_state !== '4'"
                style="color: #ff1313"
                >已驳回</span
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页区 -->
        <div class="fenye">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total,prev,pager,next"
            :total="singListData.length"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      currentPage: 1, // 当前页码
      pageSize: 6, // 每页显示的行数
      singStatus: "", //记录歌名表头渲染类型
      singListData: [], //歌曲列表数据
      singListValue: "", //下拉框搜索值
      searchValue: "", //搜索框搜索值
      singType: [
        {
          value: "original",
          label: "原创征集",
        },
        {
          value: "singsong",
          label: "传唱征集",
        },
      ],
    };
  },
  created() {
    this.getAllSing();
  },
  methods: {
    /* 获取所有节目 */
    getAllSing() {
      this.singListValue = "singsong";
      this.$http
        .post("/get_all_audit_trail", {
          table_name: "singsong",
          state: 1,
        })
        .then((res) => {
          this.singListData = res.data.data;
        });
    },
    /* 获取节目数据 */
    getSingList() {
      if (this.singListValue == "singsong") {
        this.singStatus = "1";
      } else if (this.singListValue == "original") {
        this.singStatus = "0";
      }
      this.$http
        .post("/get_all_audit_trail", {
          table_name: this.singListValue,
          state: 1,
        })
        .then((res) => {
          this.singListData = res.data.data;
        });
    },
    /* 页面切换方法 */
    handleCurrentChange(val) {
      this.currentPage = val;
    },

    /* 根据学校名字搜索 */
    searchbtn() {
      this.$http
        .post("/audit_trail_by_schoolname", {
          table_name: this.singListValue,
          state: 1,
          school_name: this.searchValue,
        })
        .then((res) => {
          this.singListData = res.data.data;
        });
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.el-table-column {
  text-align: center;
}

.content {
  margin-top: 65px;
  .fenye {
    width: 320px;
    margin: 0 50%;
    padding-top: 50px;
    transform: translateX(-35%);
  }
  .activityType {
    float: left;
  }
  .search {
    float: right;
    width: 298px;
    height: 44px;
    .search {
      input {
        border-radius: 44px;
      }
    }
  }
}
</style>
