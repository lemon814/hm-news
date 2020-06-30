<template>
  <div class="myfollow">
    <hm-header>我的关注</hm-header>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="$axios.defaults.baseURL + item.head_img" alt />
        </div>
        <div class="center">
          <div class="nickname">{{ item.nickname }}</div>
          <div class="date">{{ item.create_date | date }}</div>
        </div>
        <div class="right">
          <div @click="cancelMyFollow(item.id)" class="cancel">取消关注</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyComponent",
  props: {},
  data() {
    return {
      list: []
    };
  },
  methods: {
    getMyFollowList() {
      this.$axios.get("/user_follows").then(res => {
        // console.log(res);
        this.list = res.data.data;
      });
    },
    cancelMyFollow(id) {
      this.$axios.get(`/user_unfollow/${id}`).then(res => {
        // console.log(res);
        this.$toast.success("取消关注成功");
        this.getMyFollowList();
      });
    }
  },
  computed: {},
  created() {
    this.getMyFollowList();
  },
  mounted() {}
};
</script>

<style scoped lang='less'>
.item {
  height: 70px;
  border-bottom: 1px solid #ccc;
  display: flex;
  padding: 0 20px;
  .left {
    width: 70px;
    // background: pink;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .center {
    padding: 10px 0;
    flex: 1;
    // background: red;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 14px;
    .nickname {
      color: #000;
    }
    .date {
      color: #999;
    }
  }
  .right {
    width: 80px;
    // background: blue;
    display: flex;
    align-items: center;
    .cancel {
      height: 30px;
      width: 80px;
      background: #ccc;
      line-height: 30px;
      text-align: center;
      border-radius: 15px;
      color: #000;
    }
  }
}
</style>