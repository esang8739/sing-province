<template>
  <el-card style="width: 100%; height: 100%; min-width: 1200px">
    <h1 style="font-weight: 400; font-size: 28px; transform: translateX(45%)">
      节目审批
    </h1>

    <div class="content">
      <!-- 节目信息区域 -->
      <div class="singer" style="margin-left: 14px">
        <div>学校名称：<el-input v-model="schoolName"></el-input></div>
        <div>作品名称：<el-input v-model="songName"></el-input></div>
        <div>创作时间：<el-input v-model="setTime"></el-input></div>
        <div>作品类型：<el-input v-model="songClass"></el-input></div>
        <div>作品时长：<el-input v-model="songTime"></el-input></div>
        <div>
          演唱者&nbsp&nbsp&nbsp&nbsp：<el-input v-model="singer"></el-input>
        </div>
      </div>
      <!-- 表格区域 -->
      <div class="tableInfamation">
        <div class="tableOne">
          <span>词作者信息：</span>
          <el-table :data="makeWord" style="width: 50%" border>
            <el-table-column
              key="1"
              label="姓名"
              prop="word_name"
              header-align="center"
              align="center"
            >
            </el-table-column>
            <el-table-column
              key="2"
              prop="word_phone"
              label="联系方式"
              header-align="center"
              align="center"
            >
            </el-table-column>
            <el-table-column
              key="3"
              prop="word_card"
              label="身份证"
              header-align="center"
              align="center"
            >
            </el-table-column>
          </el-table>
        </div>
        <div class="tableTwo">
          <span>曲作者信息：</span>
          <el-table :data="makeSong" style="width: 50%" border>
            <el-table-column
              key="1"
              label="姓名"
              prop="song_name"
              header-align="center"
              align="center"
            >
            </el-table-column>
            <el-table-column
              key="2"
              prop="song_phone"
              label="联系方式"
              header-align="center"
              align="center"
            >
            </el-table-column>
            <el-table-column
              key="3"
              prop="song_card"
              label="身份证"
              header-align="center"
              align="center"
            >
            </el-table-column>
          </el-table>
        </div>
        <div class="tableThree">
          <span>项目负责人：</span>
          <el-table :data="maker" style="width: 50%" border>
            <el-table-column
              key="1"
              label="姓名"
              prop="manage_name"
              header-align="center"
              align="center"
            >
            </el-table-column>
            <el-table-column
              key="2"
              prop="manage_phone"
              label="联系方式"
              header-align="center"
              align="center"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 歌曲内容区域 -->
      <div class="mp3" style="margin-top: 35px; margin-left: 14px">
        <label>音频（选报/MP3格式）</label><br /><br /><br />
        <a :href="this.scr" download="filename" target="filename">点击下载</a>
        <iframe name="filename" style="display: none"></iframe>

        <audio id="aud" controls="controls" :src="this.scr"></audio>

        <div class="png">
          <!-- 歌谱 -->
          <div class="geci">
            <span>歌&nbsp&nbsp&nbsp词：</span>
            <img :src="this.original_word" alt="" />
          </div>
          <!-- 承诺书 -->
          <div class="chengn">
            <span>承诺书：</span>
            <img :src="this.commitment" alt="" />
          </div>
        </div>
        <div class="bnt">
          <el-button type="danger" @click="dialogVisible = true"
            >驳回</el-button
          >
          <el-button type="success" @click="psaabnt">通过</el-button>
        </div>
      </div>

      <!-- 弹窗区域 -->
      <el-dialog title="驳回理由" :visible.sync="dialogVisible" width="30%">
        <el-input type="textarea" v-model="recordReason"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="danger" @click="notPassdBnt">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      schoolName: "", //学校名
      songName: "", //作品名称
      setTime: "", //创作时间

      songClass: "", //作品类型
      songTime: "", //作品时长
      singer: "", //演唱者

      scr: "", //歌曲链接
      stuId: "", //歌曲id
      tableName: "", //曲目类型
      dialogVisible: false, //控制对话框

      recordReason: "", //驳回理由
      original_word: "", //歌谱
      commitment: "", //承诺书

      makeWord: [], //作词这信息
      makeSong: [], //作曲者信息
      maker: [], //项目负责人
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
          const list = res.data.data[0];
          this.maker = res.data.data[1];
          this.makeSong = res.data.data[2];
          this.makeWord = res.data.data[3];

          this.schoolName = list[0].school_name;
          this.songName = list[0].original_info;
          this.setTime = list[0].original_howtime;

          this.songClass = list[0].original_class;
          this.songTime = list[0].original_time;
          this.singer = list[0].original_author;

          this.original_word = list[0].original_word;
          this.commitment = list[0].original_word;
          this.scr = list[0].original_mp3;
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
  width: 200px;
  height: 30px;
}
.content {
  min-width: 1500px;
  position: relative;
  margin-top: 65px;
  .songInfamation,
  .singer {
    margin-top: -60px;
    > div {
      display: inline-block;
      margin: 15px 58px;
    }
  }
  .mp3 {
    position: relative;
    #aud {
      position: absolute;
      top: 18px;
      left: 36%;
    }
  }
  img {
    width: 200px;
    height: 100px;
    transition: all 0.6s;
  }
  img:hover {
    width: 600px;
    height: 300px;
  }
  .bnt {
    position: absolute;
    bottom: -86px;
    left: 27%;
    .el-button {
      margin-left: 150px;
    }
  }
  .png {
    position: absolute;
    top: -382px;
    left: 870px;
    img {
      vertical-align: middle;
    }
    div {
      margin-top: 50px;
    }
  }
}
</style>
