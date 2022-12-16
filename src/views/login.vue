<template>
  <div class="content">
    <h1
      style="
        color: #fff;
        margin-top: 120px;
        margin-bottom: 30px;
        font-size: 60px;
      "
    >
      “新时代风貌”校园歌曲征集传唱活动
    </h1>

    <div class="login">
      <h1 style="color: #000">登陆</h1>

      <el-form
        :model="longinInfamation"
        ref="loginForm"
        class="loginIfamation"
        @keyup.enter.native="login('loginForm')"
      >
        <el-form-item
          prop="province_account"
          :rules="[
            { required: true, message: '请输入您的账号', trigger: 'blur' },
          ]"
        >
          <el-input
            placeholder="请输入账号"
            v-model="longinInfamation.province_account"
            ><i slot="prefix" class="el-icon-user"></i
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="province_account"
          :rules="[
            { required: true, message: '请输入您的密码', trigger: 'blur' },
          ]"
        >
          <el-input
            placeholder="请输入登陆密码"
            v-model="longinInfamation.password"
            ><i slot="prefix" class="el-icon-lock"></i
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="login('loginForm')"
            :disabled="!canUpLgion"
            >登陆</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      longinInfamation: {
        province_account: "",
        password: "",
      },
    };
  },
  computed: {
    canUpLgion() {
      const { province_account, password } = this.longinInfamation;
      return Boolean(province_account && password);
    },
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http
            .post("/login_province", this.longinInfamation)
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success("登陆成功！");
                window.sessionStorage.setItem("token", res.data.data);
                this.$router.push("/main");
              } else {
                this.$message.error("登陆失败！");
              }
            });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  overflow: hidden;
  position: absolute;
  width: 100%;
  min-width: 1200px;
  height: 100%;
  text-align: center;
  background: url(../assets/images/loginbg.png) no-repeat center/100% 100%;
  .login {
    width: 522px;
    height: 465px;
    margin: 0 auto;
    border-radius: 12px;
    background: #fff;
    padding: 30px 80px;
    .loginIfamation {
      font-size: 25px;
      margin-top: 40px;
      /deep/ .el-input__inner {
        margin-top: 20px;
        height: 55px;
        padding-left: 40px;
        ::placeholder {
          font-size: 50px;
        }
      }
      i {
        font-size: 30px;
        line-height: 95px;
      }
      .el-button {
        width: 100%;
        font-size: 24px;
        color: #fff;
        margin-top: 25px;
      }
    }
  }
}
</style>
