<template>
  <div class="hm-input">
    <input
      :value="value"
      @input="iptFn"
      :class="{ success: status === 'success', fail: status === 'fail' }"
      :type="type"
      :placeholder="placeholder"
    />
    <div class="tip" v-show="status === 'fail'">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "MyComponent",
  props: {
    type: String,
    placeholder: String,
    value: String,
    rule: RegExp,
    message: String,
  },
  data() {
    return {
      status: "",
    };
  },
  methods: {
    iptFn(e) {
      let value = e.target.value;
      this.$emit("input", value);
      this.validate(value);
    },
    validate(value) {
      if (this.rule) {
        if (this.rule.test(value)) {
          this.status = "success";
          return true;
        } else {
          this.status = "fail";
          return false;
        }
      }
    },
  },
  computed: {},
  created() {},
  mounted() {},
};
</script>

<style scoped lang="less">
.hm-input {
  height: 50px;
  margin: 0 20px;
  input {
    height: 30px;
    width: 100%;
    border: none;
    outline: none;
    border-bottom: 1px solid #ccc;
    &.success {
      border-bottom: 1px solid #0f0;
    }
    &.fail {
      border-bottom: 1px solid #f00;
    }
  }

  .tip {
    height: 20px;
    line-height: 20px;
    font-size: 10px;
    color: #f00;
  }
}
</style>
