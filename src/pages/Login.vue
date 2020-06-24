<template>
  <div class>
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <hm-input :value="username" @input="username=$event" type="text" placeholder="请输入用户名"></hm-input>
    <hm-input :value="password" @input="password=$event" type="password" placeholder="请输入密码"></hm-input>
    <hm-button>登录</hm-button>
    <div class="link">
      没有账号？去
      <router-link class="a" to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  props: {},
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {},
  created() {},
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
