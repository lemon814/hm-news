<template>
  <div class="tabsedit">
    <hm-header>栏目管理</hm-header>
    <div class="tabs">
      <p>点击删除以下频道</p>
      <div class="list">
        <div class="item" v-for="tab in activeTabs" :key="tab.id" @click="del(tab.id)">
          <div>{{ tab.name }}</div>
        </div>
      </div>
      <p>点击添加以下频道</p>
      <div class="list">
        <div class="item" v-for="tab in deactiveTabs" :key="tab.id" @click="add(tab.id)">
          <div>{{ tab.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabsedit",
  props: {},
  data() {
    return {
      activeTabs: [],
      deactiveTabs: []
    };
  },
  computed: {},
  watch: {
    activeTabs(newVal) {
      localStorage.setItem("activeTabs", JSON.stringify(newVal));
      localStorage.setItem("deactiveTabs", JSON.stringify(this.deactiveTabs));
      if (this.$route.params.callback) {
        this.$route.params.callback();
      }
    }
  },
  created() {
    this.getTabsList();
  },
  mounted() {},
  methods: {
    async getTabsList() {
      let activeTabs = JSON.parse(localStorage.getItem("activeTabs"));
      let deactiveTabs = JSON.parse(localStorage.getItem("deactiveTabs"));

      if (activeTabs && deactiveTabs) {
        this.activeTabs = activeTabs;
        this.deactiveTabs = deactiveTabs;
        return;
      }

      let res = await this.$axios.get("/category");
      //   console.log(res.data);
      this.activeTabs = res.data.data;
    },
    del(id) {
      let tab = this.activeTabs.find(v => v.id === id);
      this.deactiveTabs.push(tab);
      this.activeTabs = this.activeTabs.filter(v => v.id !== id);
    },
    add(id) {
      let tab = this.deactiveTabs.find(v => v.id === id);
      this.activeTabs.push(tab);
      this.deactiveTabs = this.deactiveTabs.filter(v => v.id !== id);
    }
  }
};
</script>

<style scoped lang='less'>
.tabs {
  padding: 20px;
  p {
    height: 30px;
    line-height: 30px;
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 5px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 20%;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 5px;
      div {
        width: 80%;
        height: 80%;
        background: #ddd;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>