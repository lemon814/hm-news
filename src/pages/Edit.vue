<template>
  <div class="edit">
    <hm-header>编辑资料</hm-header>
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + info.head_img" alt />
      <van-uploader :before-read="beforeRead" :after-read="afterRead" />
    </div>
    <hm-navbar @click="showNicknameDialog" title="昵称" :content="info.nickname"></hm-navbar>
    <hm-navbar title="密码" content="******"></hm-navbar>
    <hm-navbar @click="showGenderDialog" title="性别" :content="info.gender===0?'女':'男'"></hm-navbar>

    <van-dialog @confirm="editNickname" v-model="nickname_show" title="修改昵称" show-cancel-button>
      <van-field v-model="nickname" />
    </van-dialog>

    <van-dialog @confirm="editGender" v-model="gender_show" title="修改性别" show-cancel-button>
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender=1">
            <van-radio slot="right-icon" :name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="gender=0">
            <van-radio slot="right-icon" :name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: "Edit",
  props: {},
  data() {
    return {
      info: {},
      nickname_show: false,
      nickname: "",
      gender_show: false,
      gender: 1
    };
  },
  methods: {
    getUserInfo() {
      let token = localStorage.getItem("token");
      let user_id = localStorage.getItem("user_id");

      this.$axios
        .get(`/user/${user_id}`, {
          headers: {
            Authorization: token
          }
        })
        .then(res => {
          // console.log("info", res);
          this.info = res.data.data;
        });
    },
    showNicknameDialog() {
      this.nickname_show = true;
      this.nickname = this.info.nickname;
    },
    editNickname() {
      if (this.nickname === this.info.nickname) {
        this.$toast("未修改");
        return;
      }

      this.editUser({
        nickname: this.nickname
      });
    },
    showGenderDialog() {
      this.gender_show = true;
      this.gender = this.info.gender;
    },
    editGender() {
      if (this.gender === this.info.gender) {
        this.$toast("未修改");
        return;
      }

      this.editUser({
        gender: this.gender
      });
    },
    editUser(data) {
      let token = localStorage.getItem("token");
      let user_id = localStorage.getItem("user_id");

      this.$axios
        .post(`/user_update/${user_id}`, data, {
          headers: {
            Authorization: token
          }
        })
        .then(res => {
          this.$toast.success("修改成功");
          this.getUserInfo();
        });
    },
    beforeRead(file) {
      // console.log(file);
      if (file.size / 1024 > 100) {
        this.$toast("图片不能大于100kb");
        return false;
      }
      if (file.type !== "image/jpeg") {
        this.$toast("图片只能上传jpg类型");
        return;
      }
      return true;
    },
    afterRead(file) {
      let token = localStorage.getItem("token");

      let formdata = new FormData();
      formdata.append("file", file.file);

      this.$axios
        .post("/upload", formdata, {
          headers: {
            Authorization: token
          }
        })
        .then(res => {
          // console.log(res);
          this.editUser({
            head_img: res.data.data.url
          });
        });
    }
  },
  computed: {},
  created() {
    this.getUserInfo();
  },
  mounted() {}
};
</script>

<style scoped lang='less'>
.avatar {
  text-align: center;
  margin: 20px 0;
  position: relative;
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  .van-uploader {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
  }
}
</style>