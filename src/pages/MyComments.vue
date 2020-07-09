<template>
  <div class>
    <hm-header>我的跟帖</hm-header>
    <div class="list">
      <van-list
        :finished="finished"
        v-model="loading"
        @load="onLoad"
        :immediate-check="false"
        offset="50"
        finished-text="我是有底线滴"
      >
        <div class="item" v-for="item in list" :key="item.id">
          <div class="date">{{ item.create_date | date('YYYY-MM-DD hh:mm:ss') }}</div>
          <div class="parent" v-if="item.parent">
            <div class="parent-name">回复: {{ item.parent.user.nickname }}</div>
            <div class="parent-content line1">{{ item.parent.content }}</div>
          </div>
          <div class="content">{{ item.content }}</div>
          <div class="link">
            <div class="post line1">原文: {{ item.post.title }}</div>
            <i class="iconfont iconjiantou1"></i>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  name: "mycomments",
  props: {},
  data() {
    return {
      list: [],
      pageIndex: 1,
      pageSize: 4,
      loading: false,
      finished: false
    };
  },
  methods: {
    async getCommentsList() {
      let res = await this.$axios.get("/user_comments", {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      });
      // console.log(res);
      //   this.list = res.data.data;
      this.list = [...this.list, ...res.data.data];
      //   console.log(this.list);
      this.loading = false;
      if (res.data.data.length < this.pageSize) {
        this.finished = true;
      }
    },
    onLoad() {
      //   console.log("触底 加载更多数据");
      this.pageIndex++;
      this.getCommentsList();
    }
  },
  computed: {},
  created() {
    this.getCommentsList();
  },
  mounted() {}
};
</script>

<style scoped lang='less'>
.item {
  padding: 20px;
  border-bottom: 1px solid #ccc;
  .date {
    font-size: 14px;
    color: #999;
    height: 30px;
    line-height: 30px;
  }
  .parent {
    background: #ddd;
    padding: 10px;
    &-name {
      font-size: 12px;
      color: #999;
      line-height: 20px;
    }
    &-content {
      color: #888;
      font-size: 16px;
    }
  }
  .content {
    font-size: 16px;
    color: #000;
    padding: 10px 0;
  }
  .link {
    font-size: 14px;
    color: #999;
    display: flex;
    justify-content: space-between;
  }
}
</style>