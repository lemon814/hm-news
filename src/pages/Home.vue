<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <i class="iconfont iconnew"></i>
      </div>
      <div @click="$router.push('/search')" class="center">
        <i class="iconfont iconsearch"></i>
        <span>搜索新闻</span>
      </div>
      <div class="right" @click="$router.push('/user')">
        <i class="iconfont iconwode"></i>
      </div>
    </div>
    <van-sticky z-index="999">
      <div class="container" @click="jump2tabsedit">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </van-sticky>
    <van-tabs v-model="active" sticky swipeable>
      <van-tab v-for="tab in tablist" :key="tab.id" :title="tab.name">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            @load="onLoad"
            :immediate-check="false"
            offset="50"
            :finished="finished"
            finished-text="我是有底线滴"
          >
            <hm-post v-for="(post,index) in postlist" :key="index" :post="post"></hm-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "home",
  props: {},
  data() {
    return {
      active: 0,
      tablist: [],
      postlist: [],
      pageIndex: 1,
      pageSize: 4,
      loading: false,
      finished: false,
      refreshing: false
    };
  },
  computed: {},
  watch: {
    active(val) {
      // console.log(val);
      this.pageIndex = 1;
      this.finished = false;
      this.getPostList(this.tablist[val].id);
    }
  },
  created() {
    let activeTabs = JSON.parse(localStorage.getItem("activeTabs"));
    if (activeTabs) {
      this.tablist = activeTabs;
      this.getPostList(this.tablist[this.active].id);
      return;
    }
    this.getTabList();
  },
  mounted() {},
  methods: {
    async getTabList() {
      let res = await this.$axios.get("/category");
      // console.log(res);
      this.tablist = res.data.data;
      this.getPostList(this.tablist[this.active].id);
    },
    async getPostList(id) {
      if (this.postlist.length > 0 && this.pageIndex == 1) {
        this.postlist = [];
      }
      let res = await this.$axios.get("/post", {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      });
      // console.log(res);
      // this.postlist = res.data.data;
      this.postlist = [...this.postlist, ...res.data.data];
      this.loading = false;
      if (res.data.data.length < this.pageSize) {
        this.finished = true;
      }
    },
    onLoad() {
      this.pageIndex++;
      this.getPostList(this.tablist[this.active].id);
    },
    onRefresh() {
      this.pageIndex = 1;
      this.postlist = [];
      this.finished = false;
      this.loading = true;
      this.getPostList(this.tablist[this.active].id);
      // console.log(1);
      setTimeout(() => {
        this.refreshing = false;
      }, 2000);
    },
    getNewTabs() {
      let activeTabs = JSON.parse(localStorage.getItem("activeTabs"));
      if (activeTabs) {
        this.tablist = activeTabs;
        this.active = 0;
        this.getPostList(this.tablist[this.active].id);
      }
    },
    jump2tabsedit() {
      this.$router.push({
        name: "tabsedit",
        params: {
          callback: this.getNewTabs
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
/deep/ .van-tabs__nav {
  background: #ccc;
  margin-right: 40px;
}
.header {
  padding: 10px;
  height: 40px;
  background: #f00;
  display: flex;
  align-items: center;
  text-align: center;
  .left,
  .right {
    width: 50px;
    // background: pink;
  }

  .iconnew {
    color: #fff;
    font-size: 50px;
  }
  .iconwode {
    color: #fff;
    font-size: 30px;
  }

  .center {
    flex: 1;
    background: rgba(255, 255, 255, 0.6);
    height: 38px;
    border-radius: 19px;
    color: #fff;
    line-height: 38px;
    font-size: 14px;
    .iconfont {
      margin-right: 10px;
    }
  }
}
.container {
  z-index: 999;
  width: 40px;
  height: 44px;
  background: #ccc;
  line-height: 44px;
  text-align: center;
  position: absolute;
  right: 0;
  .iconfont {
    font-weight: bold;
    transform: rotate(90deg);
    display: block;
  }
}
</style>
