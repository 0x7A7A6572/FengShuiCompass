<template>
  <canvas
    ref="canvasFengShuiCompass"
    :style="{
      transform: 'rotate(' + rotate + 'deg)',
    }"
  >
    你的浏览器不支持HTML5 Canvas标签
  </canvas>
</template>

<script setup>
import { FengShuiCompass, CompassData } from "./compass-main.js";
// import  CompassData  from "./compass-redata.js";
import { ref, onMounted, watch } from "vue";
const props = defineProps({
  width: Number,
  height: Number,
  rotate: String,
  compassData: {
    type: Array,
    default: new CompassData().getAllData(),
  },
  layerFilt: {
    type: Array,
    default: [],
  },
  latticeFill: {
    type: Array,
    default: [],
  },
});

const fs = new FengShuiCompass();
let ctx = null;
// components:{FengShuiCompass},
let canvasFengShuiCompass = ref(null);
// onUpdated(() => {
//       console.log("props-onUpdated:",props)
//     })

watch(
  [() => props.layerFilt, () => props.latticeFill],
  (newVal) => {
    if (ctx != null) {
      console.log(canvasFengShuiCompass.value.width, canvasFengShuiCompass.value.height);
      ctx.clearRect(
        0,
        0,
        canvasFengShuiCompass.value.width,
        canvasFengShuiCompass.value.height
      );
      fs.setLatticeFill(props.latticeFill)
        .setLayerFill(props.layerFilt)
        .setScaclStyle({
          minLineHeight: 10,
          midLineHeight: 25,
          maxLineHeight: 25,
          numberFontSize: 30,
        })
        .setCompassData(props.compassData)
        .draw(ctx);
    }
  },
  { deep: true }
);

onMounted(() => {

  var canvas = canvasFengShuiCompass.value;
  canvas.width = props.width;
  canvas.height = props.height;
  ctx = canvas.getContext("2d");

  fs.setCenterPoint(props.width / 2, props.height / 2)
    .setRadius(props.height / 2)
    .setLatticeFill([])
    .setLayerFill([])
    .setScaclStyle({
      minLineHeight: 10,
      midLineHeight: 25,
      maxLineHeight: 25,
      numberFontSize: 30,
    })
    .setCompassData(props.compassData) //必须在配置所有基本数据完成之后执行
    .draw(ctx); //draw 必须setCompassData完成之后执行 终止链式
});
</script>

<style scoped></style>
