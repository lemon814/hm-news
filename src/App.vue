<template>
  <div class>
    <keep-alive include="home">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  props: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {}
};
</script>

<style scoped lang="less"></style>
