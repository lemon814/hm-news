<template>
  <div class="user">
    <hm-header>个人中心</hm-header>
    <div class="info">
      <div class="left">
        <img :src="$axios.defaults.baseURL + info.head_img" alt />
      </div>
      <div class="center">
        <div class="name">
          <i v-if="info.gender === 0" class="iconfont iconxingbienv"></i>
          <i v-else class="iconfont iconxingbienan"></i>
          <span>{{ info.nickname }}</span>
        </div>
        <div class="date">{{ info.create_date | date }}</div>
      </div>
      <div class="right">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </div>

    <hm-navbar @click="$router.push('/home')" title="首页"></hm-navbar>
    <hm-navbar @click="$router.push('/tabsedit')" title="栏目管理"></hm-navbar>
    <hm-navbar @click="$router.push('/myfollow')" title="我的关注" content="关注的用户"></hm-navbar>
    <hm-navbar @click="$router.push('/mycomments')" title="我的跟帖" content="跟帖/回复"></hm-navbar>
    <hm-navbar @click="$router.push('/mystar')" title="我的收藏" content="文档/视频"></hm-navbar>
    <hm-navbar @click="$router.push('/edit')" title="设置"></hm-navbar>
    <hm-navbar @click="logout" title="退出"></hm-navbar>
  </div>
</template>

<script>
export default {
  name: "user",
  props: {},
  data() {
    return {
      info: ""
    };
  },
  methods: {
    async logout() {
      try {
        await this.$dialog.confirm({
          title: "温馨提示",
          message: "Master，你确定要退出吗？"
        });
        // console.log("点了确定");
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        this.$router.push("/login");
      } catch (error) {}
    }
  },
  computed: {},
  async created() {
    let token = localStorage.getItem("token");
    let user_id = localStorage.getItem("user_id");

    let res = await this.$axios.get(`/user/${user_id}`, {
      headers: {
        Authorization: token
      }
    });
    // console.log("个人信息", res);
    if (res.data.statusCode === 200) {
      this.info = res.data.data;
      this.$toast.success("获取个人信息成功");
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.info {
  height: 100px;
  border-bottom: 3px solid #ccc;
  display: flex;
  align-items: center;
  padding: 0 10px;
  .left {
    margin-right: 10px;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
  }
  .center {
    flex: 1;
    // background: red;
    height: 50px;
    line-height: 25px;
    .iconfont {
      margin-right: 10px;
    }
  }
  .right {
    width: 70px;
    text-align: center;
  }
}
</style>
