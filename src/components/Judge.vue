<template>
  <el-card style="width: 100%; height: 100%; min-width: 1200px">
    <h1 style="font-weight: 400; font-size: 28px; transform: translateX(45%)">
      节目审批
    </h1>

    <div class="content">
      <!-- 上方搜索区域 -->
      <div class="title">
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
            type="selection"
            width="55"
            label="全选"
            align="left"
          >
            <!--  <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"
              />
            </template> -->
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
            key="singsong_name"
            prop="singsong_name"
            v-if="this.singStatus == 1"
            label="节目名称"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            key="original_name"
            prop="original_name"
            v-if="this.singStatus == 0"
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
        .post("/get_all_song", {
          table_name: "singsong",
          state: 1,
        })
        .then((res) => {
          this.singListData = res.data.data;
          console.log(this.singListData);
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
    // 页面切换方法
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
      console.log(res);
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.el-table-column {
  text-align: center;
}
.fenye {
  width: 320px;
  margin: 0 50%;
  padding-top: 20px;
  transform: translateX(-50%);
}
</style>
