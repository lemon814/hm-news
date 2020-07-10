<template>
  <div class="search">
    <div class="header">
      <div class="left">
        <i class="iconfont iconjiantou"></i>
      </div>
      <div class="center">
        <input v-model="keyword" @keyup.enter="search" type="text" placeholder="请输入搜索的内容" name id />
        <i class="iconfont iconsearch"></i>
      </div>
      <div @click="search" class="right">搜索</div>
    </div>
    <div v-if="postlist.length">
      <hm-post v-for="post in postlist" :key="post.id" :post="post"></hm-post>
    </div>
    <div v-else class="content">
      <p>历史记录</p>
      <div class="list">
        <div class="item" v-for="h in historylist" :key="h">{{ h }}</div>
      </div>
      <p>热门搜索</p>
      <div class="list">
        <div class="item">关晓彤</div>
        <div class="item">关晓彤</div>
        <div class="item">关晓彤</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  props: {},
  data() {
    return {
      keyword: "",
      postlist: [],
      historylist: []
    };
  },
  computed: {},
  watch: {
    keyword(newVal) {
      if (!newVal.trim()) {
        this.postlist = [];
      }
    }
  },
  created() {
    this.historylist = JSON.parse(localStorage.getItem("history")) || [];
  },
  mounted() {},
  methods: {
    async search() {
      if (this.keyword.trim() === "") return;
      this.historylist.unshift(this.keyword);
      let set = new Set(this.historylist);
      this.historylist = [...set];
      localStorage.setItem("history", JSON.stringify(this.historylist));
      let res = await this.$axios.get("/post_search", {
        params: {
          keyword: this.keyword
        }
      });
      //   console.log(res.data);
      this.postlist = res.data.data;
    }
  }
};
</script>

<style scoped lang='less'>
.header {
  height: 40px;
  line-height: 40px;
  background: #eee;
  border-bottom: 1px solid #ccc;
  display: flex;
  padding: 0 10px;
  .left,
  .right {
    width: 50px;
  }
  .right {
    text-align: center;
  }
  .center {
    flex: 1;
    position: relative;
    input {
      height: 30px;
      width: 100%;
      outline: none;
      border: 1px solid #ccc;
      border-radius: 15px;
      text-indent: 30px;
    }
    .iconfont {
      position: absolute;
      left: 10px;
      top: 0;
    }
  }
}
.content {
  padding: 20px;
  p {
    font-weight: bold;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    .item {
      height: 30px;
      padding: 0 10px;
      background: #ddd;
      line-height: 30px;
      text-align: center;
      margin-right: 10px;
      margin-bottom: 10px;
      color: #000;
    }
  }
}
</style>