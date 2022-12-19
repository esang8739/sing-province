<template>
  <el-card style="width: 100%; height: 100%; min-width: 1200px">
    <h1 style="font-weight: 400; font-size: 28px; transform: translateX(45%)">
      节目审批
    </h1>

    <div class="content">
      <div class="singer" style="margin-left: 20px">
        曲&nbsp&nbsp&nbsp目：<el-input v-model="songName"></el-input>
      </div>
      <div class="songInfamation">
        <div>学校名：<el-input v-model="schoolName"></el-input></div>
        <div>创作时间：<el-input v-model="setTime"></el-input></div>
        <div>作品时长：<el-input v-model="songTime"></el-input></div>
        <div>演唱者：<el-input v-model="singer"></el-input></div>
      </div>
      <div class="mp3" style="margin-top: 35px; margin-left: 20px">
        <label>音频（选报/MP3格式）</label><br /><br /><br />
        <a :href="this.scr">点击下载</a>
        <audio id="aud" controls="controls" :src="this.scr"></audio>
      </div>
      <div class="bnt">
        <el-button type="danger" @click="dialogVisible = true">驳回</el-button>
        <el-button type="success" @click="psaabnt">通过</el-button>
      </div>
      <!-- 弹窗区域 -->
      <el-dialog title="驳回理由" :visible.sync="dialogVisible" width="30%">
        <el-input type="textarea" v-model="recordReason"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="notPassdBnt">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      stuId: "", //歌曲id
      tableName: "", //作品类型
      singer: "", //演唱者
      songName: "", //曲目
      schoolName: "", //学校名
      setTime: "", //创作时间
      songTime: "", //作品时长
      scr: "", //歌曲链接
      dialogVisible: false, //控制对话框
      recordReason: "", //驳回理由
    };
  },
  created() {
    this.getSingInfamation();
  },
  methods: {
    /* 获取歌曲信息 */
    getSingInfamation() {
      this.stuId = localStorage.getItem("stuId");
      this.tableName = localStorage.getItem("tableName");
      this.$http
        .post("/get_song_info", {
          table_name: this.tableName,
          id: this.stuId,
          state: 1,
        })
        .then((res) => {
          this.singer = res.data.data[0].singsong_author;
          this.songName = res.data.data[0].singsong_name;
          this.schoolName = res.data.data[0].school_name;
          this.setTime = res.data.data[0].singsong_howtime;
          this.songTime = res.data.data[0].singsong_time;
          this.scr = res.data.data[0].singsong_url;
        });
    },
    /* 驳回 */
    notPassdBnt() {
      this.$http
        .post("/song_overrule", {
          table_name: this.tableName,
          id: this.stuId,
          why: this.recordReason,
          state: 4,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success("驳回曲目成功！");
            this.$router.push("/Judge");
          } else {
            this.$message.error("操作失败！");
            this.dialogVisible = false;
          }
        });
    },

    /* 通过 */
    psaabnt() {
      this.$http
        .post("/song_pass", {
          table_name: this.tableName,
          id: this.stuId,
          state: 3,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success("该曲目已通过！");
            this.$router.push("/Judge");
          } else {
            this.$message.error("操作失败！");
            this.dialogVisible = false;
          }
        });
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.el-table-column {
  text-align: center;
}
.el-input {
  width: 250px;
  height: 30px;
}
.content {
  position: relative;
  margin-top: 65px;
  .songInfamation {
    margin-top: 40px;
    > div {
      display: inline-block;
      margin: 25px 20px;
    }
  }
  .mp3 {
    position: relative;
    #aud {
      position: absolute;
      top: 95px;
      left: 36%;
    }
  }
  .bnt {
    position: absolute;
    bottom: -300px;
    left: 26%;
    .el-button {
      margin-left: 150px;
    }
  }
}
</style>
