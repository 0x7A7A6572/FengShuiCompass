<template>
  <div class="fs-layout">
    <canvas
      class="fs-canvas"
      ref="canvasFengShuiCompass"
      :style="{
        transform: 'rotate(' + rotate + 'deg)',
      }"
    >
      你的浏览器不支持HTML5 Canvas标签
    </canvas>

    <canvas v-show="isShowTianxinCross" class="fs-canvas" ref="canvasTianxinCross">
    </canvas>
  </div>
</template>

<script setup>
import { FengShuiCompass, CompassData } from "./compass-main.js";
import { TianXinCross } from "./compass-tianxincross.js";
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
  scaclStyle: Object,
  isShowTianxinCross: {
    type: Boolean,
    default: true,
  },
  tianxinCrossStyle: {
    type: Object,
    default: {
      color: "red",
      lineWidth: 5,
    },
  },
});

const fs = new FengShuiCompass();
let ctx = null;
let canvasFengShuiCompass = ref(null);
let canvasTianxinCross = ref(null);

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
        .setScaclStyle(props.scaclStyle)
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

  // 绘制天心十字
  let tianxinCanvas = canvasTianxinCross.value;
  tianxinCanvas.width = props.width;
  tianxinCanvas.height = props.height;
  let tianxinCtx = tianxinCanvas.getContext("2d");
  const fsTianxinCross = new TianXinCross(tianxinCtx, props.width, props.height);
  fsTianxinCross.draw(props.tianxinCrossStyle.color, props.tianxinCrossStyle.lineWidth);
});
</script>

<style scoped>
.fs-layout {
  display: block;
  overflow: hidden;
  position: relative;
}
.fs-canvas {
  position: absolute;
  left: 0;
  top: 0;
  width: inherit;
  height: inherit;
  overflow: hidden;
}
</style>
