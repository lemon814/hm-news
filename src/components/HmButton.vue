<template>
  <div class="hm-button">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MyComponent",
  props: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {}
};
</script>

<style scoped lang='less'>
.hm-button {
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #f40;
  color: #fff;
  font-size: 16px;
  margin: 0 20px;
  border-radius: 25px;
}
</style>