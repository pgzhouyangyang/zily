<template>
  <div class="login-wrapper">
    <div class="form-wrapper">
        <div class="title">
            <h2>登录</h2>
        </div>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            autocomplete="off"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width:100%"
            type="primary"
            @click="submitForm"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <div class="login-links">
        <router-link class="el-link el-link--primary is-underline" style="vertical-align: top" type="primary" to="/register"> 忘记密码？</router-link>
        <span>
            没有账号？ <router-link class="el-link el-link--primary is-underline" style="vertical-align: top" type="primary" to="/register"> 注册一个</router-link>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {},
      rules: {
          username: [
              {required: true, message: "请输入用户名"}
          ],
          password: [
              {required: true, message: "请输入密码"}
          ]
      },
    };
  },
  methods: {
      submitForm() {
          this.$refs.loginForm.validate(async (valid) => {
          if (valid) {
            try {
              let result = await fetch("/login", {
                  method: "POST",
                  body: JSON.stringify(this.loginForm)
              });
              this.$store.commit("setUserInfo", result.body)
              this.$router.replace(this.$route.query.Rurl || "/");
            } catch (error) {
              // this.$message.error(error.message)
            }
          }
        });
      }
  }
};
</script>
<style scoped>
.login-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;
}
.form-wrapper {
    width: 50%;
    max-width: 400px;
    padding: 30px;
    box-sizing: border-box;
    box-shadow: 0 6px 6px -3px rgba(0, 0, 0, 0.2),
    0 10px 14px 1px rgba(0, 0, 0, 0.14), 0 4px 18px 3px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    background: #fff;
}
.title {
    font-size: 24px;
    font-family: cursive;
    /* letter-spacing: -14px; */
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    line-height: 1;
}
.login-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

@media screen and (max-width:600px) {
    .form-wrapper {
        width: 100%;
        max-width: 100%;
        box-shadow: none;
    }
}
</style>
