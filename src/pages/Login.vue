<template>
  <div class>
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <hm-input
      :value="username"
      @input="username = $event"
      type="text"
      placeholder="请输入用户名"
      :rule="/^1\d{3,10}$/"
      message="用户名格式不对"
      ref="username"
    ></hm-input>
    <hm-input
      :value="password"
      @input="password = $event"
      type="password"
      placeholder="请输入密码"
      :rule="/^\d{3,6}$/"
      message="密码格式不对"
      ref="password"
    ></hm-input>
    <hm-button @click="login">登录</hm-button>
    <div class="link">
      没有账号？去
      <router-link class="a" to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  props: {},
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      // if (!this.$refs.username.validate(this.username)) return;
      // if (!this.$refs.password.validate(this.password)) return;
      let isOk1 = this.$refs.username.validate(this.username);
      let isOk2 = this.$refs.password.validate(this.password);
      if (!isOk1 || !isOk2) {
        this.$toast.fail("校验格式不正确");
        return;
      }

      this.$axios
        .post("/login", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          // console.log(res.data);
          if (res.data.statusCode === 200) {
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("user_id", res.data.data.user.id);
            this.$router.push("/user");
            this.$toast.success("登录成功");
          } else {
            this.$toast.fail("登录失败");
          }
        });
    }
  },
  computed: {},
  created() {
    // console.log("登录", this.$route.params);

    this.username = this.$route.params.username;
    this.password = this.$route.params.password;
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.link {
  text-align: right;
  margin-top: 20px;
  margin-right: 20px;
  font-size: 14px;
  .a {
    color: #0f0;
    text-decoration: none;
  }
}
</style>
