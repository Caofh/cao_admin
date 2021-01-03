<template>
  <div class="map-container">
    <div id="map" class="map"></div>
  </div>
</template>

<script>
import axios from "axios";
import * as mapv from "mapv";

export default {
  name: "Map",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      const map = new maptalks.Map("map", {
        center: [116.41348403785, 39.910843952376],
        zoom: 12,
        minZoom: 1,
        maxZoom: 19,
        spatialReference: {
          projection: "baidu",
        },
        attribution: {
          content: "&copy; vue-admin-beautiful",
        },
        baseLayer: new maptalks.TileLayer("base", {
          cssFilter: "sepia(100%) invert(90%)",
          urlTemplate:
            "http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1",
          subdomains: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          attribution:
            '&copy; <a target="_blank" href="http://map.baidu.com">Baidu</a>',
        }),
      });
      axios
        .get(
          "https://cdn.jsdelivr.net/npm/mapv@2.0.12/examples/data/od-xierqi.txt"
        )
        .then((rs) => {
          let data = [];
          let timeData = [];

          rs = rs.data.split("\n");
          let maxLength = 0;
          for (let i = 0; i < rs.length; i++) {
            let item = rs[i].split(",");
            let coordinates = [];
            if (item.length > maxLength) {
              maxLength = item.length;
            }
            for (let j = 0; j < item.length; j += 2) {
              let x = (Number(item[j]) / 20037508.34) * 180;
              let y = (Number(item[j + 1]) / 20037508.34) * 180;
              y =
                (180 / Math.PI) *
                (2 * Math.atan(Math.exp((y * Math.PI) / 180)) - Math.PI / 2);
              if (x == 0 || y == NaN) {
                continue;
              }
              coordinates.push([x, y]);
              timeData.push({
                geometry: {
                  type: "Point",
                  coordinates: [x, y],
                },
                count: 1,
                time: j,
              });
            }
            data.push({
              geometry: {
                type: "LineString",
                coordinates: coordinates,
              },
            });
          }

          let dataSet = new mapv.DataSet(data);

          let options = {
            strokeStyle: "rgba(53,57,255,0.5)",
            // globalCompositeOperation: 'lighter',
            shadowColor: "rgba(53,57,255,0.2)",
            shadowBlur: 3,
            lineWidth: 3.0,
            draw: "simple",
          };

          let mapvLayer = new mapv.MaptalksLayer(
            "mapv1",
            dataSet,
            options
          ).addTo(map);

          let dataSet2 = new mapv.DataSet(timeData);

          let options2 = {
            fillStyle: "rgba(255, 250, 250, 0.2)",
            globalCompositeOperation: "lighter",
            size: 1.5,
            animation: {
              stepsRange: {
                start: 0,
                end: 100,
              },
              trails: 3,
              duration: 5,
            },
            draw: "simple",
          };

          let mapvLayer2 = new mapv.MaptalksLayer(
            "mapv2",
            dataSet2,
            options2
          ).addTo(map);
        });
    });
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.map-container {
  .map {
    width: calc(100vw - 260px);
    height: calc(100vh - 120px);
  }
}
</style>
