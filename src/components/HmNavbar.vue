<template>
  <div class="hm-navbar" @click="fn">
    <div class="left">{{ title }}</div>
    <div class="center">{{ content }}</div>
    <div class="right">
      <i class="iconfont iconjiantou1"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "hm-navbar",
  props: {
    title: {
      type: String,
      required: true
    },
    content: String
  },
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

<style scoped lang='less'>
.hm-navbar {
  height: 70px;
  line-height: 70px;
  border-bottom: 1px solid #ccc;
  display: flex;
  margin-left: 20px;
  font-size: 16px;
  .left {
    flex: 2;
    color: #000;
  }
  .center {
    flex: 7;
    text-align: right;
    padding-right: 20px;
    color: #999;
  }
  .right {
    flex: 1;
    text-align: center;
  }
}
</style>