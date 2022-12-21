<template>
  <el-card style="width: 100%; height: 100%; min-width: 1200px">
    <h1 style="font-weight: 400; font-size: 28px; transform: translateX(45%)">
      节目审批
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
            v-model="searchValue"
            placeholder="根据学校名称查询"
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
      <!-- 传唱区域 -->
      <div class="singTable" v-if="this.singStatus == 1">
        <el-button type="danger" plain @click="notPassDiaog">驳回</el-button>
        <el-table
          :data="
            singListData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
          stripe
          style="width: 100%"
          ref="materialTable"
          @selection-change="rejectedSing"
          :row-key="getRowKey"
        >
          <el-table-column
            type="selection"
            :reserve-selection="true"
            align="center"
          >
          </el-table-column>
          <el-table-column
            key="7"
            label="活动类型"
            header-align="center"
            align="center"
            >传唱征集
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
            key="singsong_name"
            prop="singsong_name"
            label="节目名称"
            header-align="center"
            align="center"
          >
          </el-table-column>

          <el-table-column
            key="6"
            label="数据操作"
            header-align="center"
            align="center"
          >
            <template #default="scope">
              <el-button @click="moreData(scope.row)">详情</el-button></template
            >
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
        <!-- 弹窗区域 -->
        <el-dialog
          title="批量驳回"
          :visible.sync="centerDialogVisible"
          width="30%"
          center
        >
          <el-input
            type="textarea"
            v-model="recordReason"
            placeholder="请输入您的驳回理由"
          ></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="rejectedSingBnt">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 原创区域 -->
      <div class="singTable" v-if="this.singStatus == 0">
        <el-button type="danger" plain @click="notPassDiaog">驳回</el-button>
        <el-table
          :data="
            singListData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
          stripe
          style="width: 100%"
          @selection-change="rejectedSing"
          row-key="origTable"
        >
          <el-table-column
            type="selection"
            :reserve-selection="true"
            align="center"
          >
          </el-table-column>
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
            key="original_name"
            prop="original_name"
            label="节目名称"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            key="6"
            label="数据操作"
            header-align="center"
            align="center"
          >
            <template #default="scope">
              <el-button @click="moreDataOrig(scope.row)"
                >详情</el-button
              ></template
            >
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
        <!-- 弹窗区域 -->
        <el-dialog
          title="批量驳回"
          :visible.sync="centerDialogVisible"
          width="30%"
          center
        >
          <el-input
            type="textarea"
            v-model="recordReason"
            placeholder="请输入您的驳回理由"
          ></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="rejectedSingBnt">确 定</el-button>
          </span>
        </el-dialog>
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
      singStatus: "1", //记录歌名表头渲染类型
      singListData: [], //歌曲列表数据
      singListValue: "singsong", //下拉框搜索值
      searchValue: "", //搜索框搜索值
      rejectedSingId: [], //批量驳回歌曲id
      rejectedSingName: [], //批量驳回歌曲名字
      centerDialogVisible: false, //批量驳回弹窗
      /* centerDialogVisible1: false, */ //批量驳回弹窗
      recordReason: "", //驳回理由
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
  watch: {
    singListValue(oldValue, newValue) {
      if (oldValue !== newValue) {
        this.$refs.materialTable.clearSelection();
      }
    },
    //监听数据(searchValue)变量的变化，
    searchValue() {
      this.$nextTick(() => {
        this.getAllSing(); //重新请求数据
      });
    },
  },
  created() {
    this.getAllSing();
  },
  methods: {
    /* 获取所有节目 */
    getAllSing() {
      this.$http
        .post("/get_all_song", {
          table_name: this.singListValue,
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
        .post("/get_all_song", {
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
    /* 进入相关节目详情 */
    async moreData(row) {
      const { data: res } = await this.$http.post("/get_song_info", {
        table_name: this.singListValue,
        id: row.id,
        state: 1,
      });
      c(res);
    },
    /* 根据学校名字搜索 */
    searchbtn() {
      this.$http
        .post("/get_song_by_schoolname", {
          table_name: this.singListValue,
          state: 1,
          school_name: this.searchValue,
        })
        .then((res) => {
          this.singListData = res.data.data;
        });
    },
    /* 选择批量驳回歌曲 */
    rejectedSing(val) {
      this.rejectedSingId = [];
      val.forEach((item) => {
        this.rejectedSingId.push(item.id);
      });
    },
    /* 保留选中数据 */
    getRowKey(row) {
      return row.id;
    },
    /* 驳回弹窗 */
    notPassDiaog() {
      if (this.rejectedSingId.length !== 0) {
        this.centerDialogVisible = true;
      } else {
        this.$message.error("请选择需要驳回曲目");
      }
    },
    /* 批量驳回歌曲 */
    rejectedSingBnt() {
      this.$http
        .post("/songs_overrule", {
          table_name: this.singListValue,
          id: this.rejectedSingId,
          state: 4,
          why: this.recordReason,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success("驳回该节目成功!");
            this.getAllSing();
            this.$refs.materialTable.clearSelection();
          } else {
            this.$message.error("驳回该节目失败!");
          }
        });

      this.recordReason = "";
      this.centerDialogVisible = false;
    },
    /* 进入传唱详情 */
    moreData(row) {
      localStorage.setItem("stuId", row.id);
      localStorage.setItem("tableName", this.singListValue);
      this.$router.push("/songDetails");
    },
    /* 进入原创详情 */
    moreDataOrig(row) {
      localStorage.setItem("stuId", row.id);
      localStorage.setItem("tableName", this.singListValue);
      this.$router.push("/origDetails");
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

  .singTable {
    position: relative;
    top: 35px;
    > .el-button {
      position: absolute;
      top: 54px;
      left: 54px;
      width: 55px;
      height: 25px;
      z-index: 1;
      padding: 0;
      font-size: 4px;
    }
  }
}
</style>
