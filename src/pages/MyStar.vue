<template>
  <div class="mystar">
    <hm-header>我的收藏</hm-header>
    <hm-post v-for="post in list" :key="post.id" :post="post"></hm-post>
  </div>
</template>

<script>
export default {
  name: "MyStar",
  props: {},
  data() {
    return {
      list: []
    };
  },
  computed: {},
  async created() {
    let res = await this.$axios.get("/user_star");
    // console.log(res);
    this.list = res.data.data;
  },
  mounted() {}
};
</script>

<style scoped lang='less'></style>