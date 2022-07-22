<template>
  <canvas ref="canvasFengShuiCompass" :style="{
    transform: 'rotate(' + rotate + 'deg)'
  }">
    你的浏览器不支持HTML5 Canvas标签
  </canvas>
</template>

<script setup>
import { FengShuiCompass, CompassData } from "./compass-main.js";
// import  CompassData  from "./compass-redata.js";
import { ref, onMounted } from "vue";
const props = defineProps({
    width: Number,
    height: Number,
    rotate: String
  }) 
  // components:{FengShuiCompass},
    let canvasFengShuiCompass = ref(null);
    onMounted(() => {
      console.log(canvasFengShuiCompass.value);

      // var [_lineWidth, _borderWidth, _fontSpace] = [3, 3, 5];
      // var correctionAngle = -90;
      var canvas = canvasFengShuiCompass.value;
      canvas.width = props.width;
      canvas.height = props.height;
      var ctx = canvas.getContext("2d");
      const fs = new FengShuiCompass();
      let cpData = new CompassData().getAllData();

      // console.log("props", props);
      fs.setCenterPoint(props.width / 2, props.height / 2)
        .setRadius(props.height / 2)
        .setLatticeFill([
          [3, 3, "red"],
          [4, 3, "aqua"],
        ])
        .setLayerFill([[3, "green"]])
        .setScaclStyle({
          minLineHeight: 10,
          midLineHeight: 25,
          maxLineHeight: 25,
          numberFontSize: 30,
        })
        .setCompassData(cpData) //必须在配置所有基本数据完成之后执行
        .draw(ctx); //draw 必须setCompassData完成之后执行 终止链式
    });

</script>

<style scoped>
</style>