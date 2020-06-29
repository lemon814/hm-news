<template>
  <div class>
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>
    <hm-input
      :value="username"
      @input="username = $event"
      type="text"
      placeholder="用户名"
      :rule="/^1\d{3,10}$/"
      message="用户名格式不对"
      ref="username"
    ></hm-input>
    <hm-input
      :value="nickname"
      @input="nickname = $event"
      ref="nickname"
      :rule="/^[\u4e00-\u9fa5]{3,7}$/"
      message="昵称格式不合格"
      type="text"
      placeholder="昵称"
    ></hm-input>
    <hm-input
      :value="password"
      @input="password = $event"
      ref="password"
      :rule="/^\d{3,6}$/"
      message="密码格式不合格"
      type="password"
      placeholder="密码"
    ></hm-input>
    <hm-button @click="register">注册</hm-button>
  </div>
</template>

<script>
export default {
  name: "Register",
  props: {},
  data() {
    return {
      username: "",
      nickname: "",
      password: ""
    };
  },
  methods: {
    register() {
      let isOk1 = this.$refs.username.validate(this.username);
      let isOk2 = this.$refs.nickname.validate(this.nickname);
      let isOk3 = this.$refs.password.validate(this.password);
      if (!isOk1 || !isOk2 || !isOk3) {
        this.$toast.fail("校验格式不正确");
        return;
      }

      this.$axios
        .post("/register", {
          username: this.username,
          nickname: this.nickname,
          password: this.password
        })
        .then(res => {
          // console.log(res);

          if (res.data.statusCode === 200) {
            this.$toast.success("注册成功");
            this.$router.push({
              name: "login",
              params: {
                username: this.username,
                password: this.password
              }
            });
          } else {
            this.$toast.fail(res.data.message);
          }
        });
    }
  },
  computed: {},
  created() {},
  mounted() {}
};
</script>

<style scoped lang="less"></style>
