<template>
  <div :class="['word-cloud']" v-if="myShow">
    <div
      :id="[`main${timeStamp}`]"
      :style="{ width: config.width, height: config.height }"
    ></div>
  </div>
</template>

<script>
import { initAsyn_promise } from "@/utils/loadJs.js";

/*
  // 参数：
  config：词云配置信息，目前支持三个配置参数，如下：
  let config = {
    width: 300 + "px",
    height: 300 + "px",
    data: [
      {
        name: "Sam S Club",
        value: 10000,
      },
      {
        name: "Macys",
        value: 6181,
      },
      {
        name: "Amy Schumer",
        value: 4386,
      },
    ]
  }

  // 使用方法：
  <WordCloud v-model="show" :config="config"></WordCloud>
*/
export default {
  name: "WordCloud",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    config: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      myShow: false,
      timeStamp: new Date().getTime(),
    };
  },
  computed: {},
  watch: {
    value(newValue, oldValue) {
      this.myShow = newValue;

      if (newValue) {
        initAsyn_promise(["echarts", "echartsWordcloud"]).then(() => {
          this.start();
        });
      }
    },
    myShow(newValue, oldValue) {
      this.$emit("input", newValue);
    },
  },
  mounted() {},
  methods: {
    start() {
      let chart = echarts.init(
        document.getElementById(`main${this.timeStamp}`)
      );
      let option = {
        tooltip: {},
        series: [
          {
            type: "wordCloud",
            gridSize: 2,
            sizeRange: [12, 50],
            rotationRange: [-90, 90],
            shape: "pentagon",
            width: 600,
            height: 400,
            drawOutOfBound: true,
            textStyle: {
              normal: {
                color: function () {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                    ].join(",") +
                    ")"
                  );
                },
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333",
              },
            },
            // 禁止鼠标悬浮，显示文案
            tooltip: {
              show: false,
            },
            data: this.config.data || [],
          },
        ],
      };

      chart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.word-cloud {
}
</style>
