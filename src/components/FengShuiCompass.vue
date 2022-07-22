<template>
  <canvas ref="canvasFengShuiCompass"> 你的浏览器不支持HTML5 Canvas标签 </canvas>
</template>

<script>
import { FengShuiCompass } from "./compass-main.js";
import  CompassData  from "./compass-redata.js";
import { ref, onMounted } from "vue";
export default {
  name: "FengShuiCompass",
  props: {
    width: Number,
    height: Number,
  },
  // components:{FengShuiCompass},
  setup(props) {
    let canvasFengShuiCompass = ref(null);
    onMounted(() => {
      console.log(canvasFengShuiCompass.value,FengShuiCompass);
      
// var [_lineWidth, _borderWidth, _fontSpace] = [3, 3, 5];
// var correctionAngle = -90;
var canvas = canvasFengShuiCompass.value;
// var body = document.body;
// const canvas = res[0].node
canvas.width = props.width;//body.clientWidth;
canvas.height = props.height;//body.clientHeight;
//height * dpr
var ctx = canvas.getContext('2d');
// var screenWidth = body.clientWidth ;//screen.availWidth;
// var screenHeight = body.clientHeight ;//screen.availHeight;

const fs =  new FengShuiCompass();
// var centralPoint = {
//     x: screenWidth/2 , y: screenHeight/2 ,
//   };

//  let cpData = new CompassData().getAllData();


// fs.setCenterPoint(centralPoint.x,centralPoint.y)
//   .setRadius(centralPoint.x)
console.log(props)
  fs.setCenterPoint(props.width/2,props.height/2)
  .setRadius(props.height/2)
  .setLatticeFill([[3,3,'red'],[4,3,'blue']])
  .setLayerFill([[3,'green']])
   //.setCompassData(cpData)
   .setCompassData(CompassData)
  .draw(ctx)

    });
    return {
      canvasFengShuiCompass,
      centerXY: [0, 0],
    };
  },
};
</script>

<style scoped>
</style>