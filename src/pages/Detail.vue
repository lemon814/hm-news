<template>
  <div class="detail">
    <van-sticky>
      <div class="header">
        <div class="left" @click="$router.back()">
          <i class="iconfont iconjiantou2"></i>
        </div>
        <div class="center">
          <i class="iconfont iconnew"></i>
        </div>
        <div class="right">
          <div v-if="detail.has_follow" class="follow" @click="unfollow">已关注</div>
          <div v-else class="follow" @click="follow">关注</div>
        </div>
      </div>
    </van-sticky>
    <div class="detail-content">
      <h2 class="title">{{ detail.title }}</h2>
      <div class="info">
        <span>{{ detail.user.nickname }}</span>
        <span>{{ detail.create_date | date }}</span>
      </div>
      <div v-if="detail.type==1" class="content" v-html="detail.content"></div>
      <video v-else :src="detail.content" controls autoplay muted class="content"></video>
    </div>
    <div class="like-container">
      <div class="like" :class="{ active : detail.has_like }" @click="like">
        <i class="iconfont icondianzan"></i>
        <span>{{ detail.like_length }}</span>
      </div>
    </div>
    <div class="list">
      <hm-comment v-for="comment in commentlist" :key="comment.id" :comment="comment"></hm-comment>
    </div>
    <div class="footer">
      <div v-if="!isShow" class="input">
        <input @focus="handleFocus" type="text" placeholder="写跟帖" name id />
        <i class="iconfont iconpinglun-">
          <i class="comment_length">{{ detail.comment_length }}</i>
        </i>
        <i @click="star" class="iconfont iconshoucang" :class="{ active:detail.has_star }"></i>
      </div>
      <div v-else class="textarea">
        <textarea
          v-model="content"
          @blur="handleBlur"
          ref="textarea"
          :placeholder="'回复' + replyName"
          name
          id
          cols="30"
          rows="10"
        ></textarea>
        <div @click="send" class="send">
          <div>发送</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
  props: {},
  data() {
    return {
      id: 0,
      detail: {
        user: {}
      },
      commentlist: [],
      isShow: false,
      content: "",
      replyId: 0,
      replyName: ""
    };
  },
  computed: {},
  created() {
    this.id = this.$route.params.id;
    this.getDetail();
    this.getCommentList();

    this.$bus.$on("reply", (id, nickname) => {
      this.replyId = id;
      this.replyName = nickname;
      // console.log("detail", id);
      this.isShow = true;
      this.$nextTick(() => {
        this.$refs.textarea.focus();
      });
    });
  },
  mounted() {},
  methods: {
    async getDetail() {
      let res = await this.$axios.get(`/post/${this.id}`);
      // console.log(res.data.data);
      this.detail = res.data.data;
    },
    async unfollow() {
      let token = localStorage.getItem("token");
      if (!token) {
        this.$toast("没有token");
        this.$router.push({
          name: "login",
          params: {
            back: true
          }
        });
        return;
      }
      let res = await this.$axios.get(`/user_unfollow/${this.detail.user.id}`);
      // console.log(res);
      this.$toast.success(res.data.message);
      this.getDetail();
    },
    async follow() {
      let token = localStorage.getItem("token");
      if (!token) {
        this.$toast("没有token");
        this.$router.push({
          name: "login",
          params: {
            back: true
          }
        });
        return;
      }
      let res = await this.$axios.get(`/user_follows/${this.detail.user.id}`);
      this.$toast.success(res.data.message);
      this.getDetail();
    },
    async like() {
      let res = await this.$axios.get(`/post_like/${this.detail.id}`);
      this.$toast.success(res.data.message);
      this.getDetail();
    },
    async getCommentList() {
      let res = await this.$axios.get(`/post_comment/${this.id}`);
      // console.log(res.data);
      this.commentlist = res.data.data;
    },
    handleFocus() {
      this.isShow = true;
      this.$nextTick(() => {
        this.$refs.textarea.focus();
      });
    },
    handleBlur() {
      if (!this.content) {
        this.isShow = false;
        this.replyId = "";
        this.replyName = "";
      }
    },
    async send() {
      let res = await this.$axios.post(`/post_comment/${this.id}`, {
        content: this.content,
        parent_id: this.replyId
      });
      // console.log(res.data);
      this.$toast.success(res.data.message);
      this.getDetail();
      this.getCommentList();
      this.isShow = false;
      this.content = "";
      this.replyId = "";
      this.replyName = "";
    },
    async star() {
      let res = await this.$axios.get(`/post_star/${this.id}`);
      // console.log(res.data);
      this.$toast.success(res.data.message);
      this.getDetail();
    }
  }
};
</script>

<style scoped lang='less'>
.detail {
  margin-bottom: 50px;
}
.header {
  height: 40px;
  background: #f4f4f4;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  .left {
    width: 40px;
    text-align: center;
  }
  .center {
    flex: 1;
    .iconfont {
      font-size: 50px;
    }
  }
  .right {
    width: 80px;
    .follow {
      width: 60px;
      height: 20px;
      border: 1px solid #999;
      text-align: center;
      line-height: 20px;
      border-radius: 10px;
    }
  }
}
.detail-content {
  padding: 20px;
  .title {
    margin-bottom: 10px;
  }
  .info {
    color: #999;
    span {
      margin-right: 10px;
    }
  }
  /deep/ img {
    width: 100%;
  }
  video {
    width: 100%;
  }
}
.like-container {
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .like {
    height: 30px;
    width: 80px;
    border: 1px solid #000;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      margin-right: 10px;
    }
  }
  .like.active {
    border: 1px solid #f00;
    color: #f00;
  }
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  .input {
    height: 50px;
    background: #fff;
    border-top: 1px solid #000;
    display: flex;
    align-items: center;
    input {
      flex: 1;
      margin: 0 30px;
      height: 30px;
      background: #ddd;
      border: none;
      outline: none;
      border-radius: 15px;
      padding-left: 10px;
    }
    .iconfont {
      width: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
    }
    .iconpinglun- {
      position: relative;
      .comment_length {
        position: absolute;
        right: 15px;
        top: -5px;
        font-size: 12px;
        width: 20px;
        height: 15px;
        background: #f00;
        color: #fff;
      }
    }
    .active {
      color: #f00;
    }
  }
  .textarea {
    height: 50px;
    border-top: 1px solid #000;
    background: #fff;
    display: flex;
    padding: 10px;
    textarea {
      flex: 1;
      border: none;
      outline: none;
      background: #ddd;
      resize: none;
      padding: 10px;
    }
    .send {
      width: 90px;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        width: 50px;
        height: 30px;
        line-height: 30px;
        background: #f00;
        color: #fff;
        text-align: center;
        border-radius: 5px;
      }
    }
  }
}
</style>