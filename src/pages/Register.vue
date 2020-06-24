<template>
  <div class>
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>
    <hm-input :value="username" @input="username=$event" type="text" placeholder="用户名"></hm-input>
    <hm-input :value="nickname" @input="nickname=$event" type="text" placeholder="昵称"></hm-input>
    <hm-input :value="password" @input="password=$event" type="password" placeholder="密码"></hm-input>
    <hm-button>注册</hm-button>
  </div>
</template>

<script>
export default {
  name: "register",
  props: {},
  data() {
    return {
      username: "",
      nickname: "",
      password: ""
    };
  },
  computed: {},
  created() {},
  mounted() {}
};
</script>

<style scoped lang="less"></style>
