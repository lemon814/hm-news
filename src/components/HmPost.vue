<template>
  <div class="hm-post">
    <!-- 视频 -->
    <div class="video-post" v-if="post.type===2">
      <div class="title">{{ post.title }}</div>
      <div class="center">
        <img :src="fixedUrl(post.cover[0].url)" alt />
        <div class="video">
          <i class="iconfont iconshipin"></i>
        </div>
      </div>
      <div class="bottom">
        <span class="nickname">{{ post.user.nickname }}</span>
        <span class="count">{{ post.comments.length }} 跟帖</span>
      </div>
    </div>
    <!-- 单张图片  -->
    <div class="single-img-post" v-else-if="post.cover.length<3">
      <div class="left">
        <div class="title">{{ post.title }}</div>
        <div class="bottom">
          <span class="nickname">{{ post.user.nickname }}</span>
          <span class="count">{{ post.comments.length }} 跟帖</span>
        </div>
      </div>
      <div class="right">
        <img :src="fixedUrl(post.cover[0].url)" alt />
      </div>
    </div>
    <!-- 多张图片 -->
    <div class="multi-img-post" v-else>
      <div class="title">{{ post.title }}</div>
      <div class="imgs">
        <img :src="fixedUrl(post.cover[0].url)" alt />
        <img :src="fixedUrl(post.cover[1].url)" alt />
        <img :src="fixedUrl(post.cover[2].url)" alt />
      </div>
      <div class="bottom">
        <span class="nickname">{{ post.user.nickname }}</span>
        <span class="count">{{ post.comments.length }} 跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HmPost",
  props: {
    post: Object
  },
  data() {
    return {};
  },
  methods: {
    fixedUrl(url) {
      if (url.startsWith("http")) {
        return url;
      } else {
        return this.$axios.defaults.baseURL + url;
      }
    }
  },
  computed: {},
  created() {},
  mounted() {}
};
</script>

<style scoped lang='less'>
.title {
  color: #000;
  font-size: 16px;
}
.bottom {
  color: #999;
  span {
    margin-right: 10px;
  }
}
// 单张图片
.single-img-post {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;

  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 0;
  }
  .right {
    img {
      width: 112px;
      height: 75px;
      object-fit: cover;
    }
  }
}
.multi-img-post {
  padding: 10px;
  border-bottom: 1px solid #ccc;

  .imgs {
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    img {
      width: 110px;
      height: 75px;
      object-fit: cover;
    }
  }
}
// 视频
.video-post {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .center {
    margin: 10px 0;
    text-align: center;
    position: relative;
    img {
      width: 340px;
      height: 170px;
      object-fit: cover;
    }
    .video {
      width: 60px;
      height: 60px;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      line-height: 60px;
      text-align: center;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .iconfont {
        color: #fff;
        font-size: 35px;
      }
    }
  }
}
</style>