<template>
  <div>
    <hm-floor :count="count-1" v-if="parent.parent" :parent="parent.parent"></hm-floor>
    <div class="hm-floor">
      <div class="header">
        <div class="left">{{ count }}楼 {{ parent.user.nickname }}</div>
        <div class="center">{{ parent.create_date | date2 }}</div>
        <div @click="reply" class="right">回复</div>
      </div>
      <div class="content">{{ parent.content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hm-floor",
  props: {
    parent: Object,
    count: Number
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    reply() {
      // console.log("floor");
      // this.$bus.$emit("reply", 222);
      this.$bus.$emit("reply", this.parent.id, this.parent.user.nickname);
    }
  }
};
</script>

<style scoped lang='less'>
.hm-floor {
  background: #ddd;
  border: 1px solid #000;
  padding: 5px;
  margin-top: -1px;
  .header {
    display: flex;
    .left {
      flex: 1;
    }
    .center {
      flex: 2;
      color: #999;
    }
    .right {
      width: 50px;
      text-align: center;
    }
  }
  .content {
    margin-top: 10px;
  }
}
</style>