<template>
  <div class="hm-input">
    <input :value="value" @input="iptFn" :type="type" :placeholder="placeholder" />
    <div class="tip">用户名格式不对</div>
  </div>
</template>

<script>
export default {
  name: "MyComponent",
  props: {
    type: String,
    placeholder: String,
    value: String
  },
  data() {
    return {};
  },
  methods: {
    iptFn(e) {
      this.$emit("input", e.target.value);
    }
  },
  computed: {},
  created() {},
  mounted() {}
};
</script>

<style scoped lang='less'>
.hm-input {
  height: 50px;
  margin: 0 20px;
  input {
    height: 30px;
    width: 100%;
    border: none;
    outline: none;
    border-bottom: 1px solid #ccc;
  }
  .tip {
    height: 20px;
    line-height: 20px;
    font-size: 10px;
    color: #f00;
    display: none;
  }
}
</style>