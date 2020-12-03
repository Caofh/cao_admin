<template>
  <div class="home">
    <el-button type="default" @click="toggle">切换普通弹窗</el-button>
    <el-button type="default" @click="toggle('scroll')"
      >切换可滚动弹窗</el-button
    >

    <Dialog v-model="show" v-title="'我是普通弹窗'" :type="'fade'">
      <div class="dia-inner">普通弹窗</div>
    </Dialog>

    <Dialog
      v-model="showScroll"
      v-title="'我是可滚动弹窗'"
      scroll
      :type="'fade'"
    >
      <div class="dia-inner-scroll">可滚动弹窗</div>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "@/components/commonSelf/Dialog.vue";

export default {
  name: "Home",
  components: {
    Dialog,
  },
  data() {
    return {
      show: false,
      showScroll: false,
    };
  },
  created() {},
  methods: {
    toggle(type) {
      if (type === "scroll") {
        this.showScroll = true;
      } else {
        this.show = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  .dia-inner {
    box-sizing: border-box;
    width: 500px;
    height: 500px;
    padding: 20px;
  }
  .dia-inner-scroll {
    box-sizing: border-box;
    width: 500px;
    height: 2000px;
    padding: 20px;
  }
}
</style>
