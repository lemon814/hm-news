<template>
  <div class="hm-header">
    <div @click="$router.back()" class="left">
      <i class="iconfont iconjiantou2"></i>
    </div>
    <div class="center">
      <slot></slot>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  name: "MyComponent",
  props: {},
  data() {
    return {};
  },
  methods: {
    fn() {
      this.$emit("click");
    }
  },
  computed: {},
  created() {},
  mounted() {}
};
</script>

<style scoped lang="less">
.hm-header {
  height: 40px;
  line-height: 40px;
  background: #f4f4f4;
  display: flex;
  text-align: center;
  .left {
    width: 30px;
  }
  .center {
    flex: 1;
    font-weight: bold;
  }
  .right {
    width: 30px;
  }
}
</style>
