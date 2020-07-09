<template>
  <div class="hm-comment">
    <div class="header">
      <div class="left">
        <img :src="$axios.defaults.baseURL+comment.user.head_img" alt />
      </div>
      <div class="center">
        <div class="nickname">{{ comment.user.nickname }}</div>
        <div class="date">{{ comment.create_date | date2 }}</div>
      </div>
      <div @click="reply" class="right">回复</div>
    </div>
    <hm-floor v-if="comment.parent" :parent="comment.parent" :count="getCount(0,comment)"></hm-floor>
    <div class="content">{{ comment.content }}</div>
  </div>
</template>

<script>
export default {
  name: "hm-comment",
  props: {
    comment: Object
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    getCount(num, comment) {
      if (comment.parent) {
        return this.getCount(num + 1, comment.parent);
      } else {
        return num;
      }
    },
    reply() {
      // console.log("comment");
      // this.$bus.$emit("reply", 111);
      this.$bus.$emit("reply", this.comment.id, this.comment.user.nickname);
    }
  }
};
</script>

<style scoped lang='less'>
.hm-comment {
  padding: 20px;
  border-bottom: 1px solid #ccc;
}
.header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .left {
    margin-right: 20px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .center {
    flex: 1;
    line-height: 20px;
    .nickname {
      color: #000;
      font-size: 14px;
    }
    .date {
      color: #999;
    }
  }
  .right {
    width: 50px;
    text-align: center;
    color: #999;
  }
}
.content {
  margin-top: 10px;
}
</style>