<script setup>
import FengShuiCompass from "./components/FengShuiCompass.vue";
import FengShuiCompassSvg from "./components/fs-compass-svg/FengShuiCompassSvg.vue";
import { CompassData } from "./components/compass-main.js";
import StarryBackground from "./components/StarryBackground.vue";
import ControlPanel from "./components/ControlPanel.vue";
import { ElDialog, ElForm, ElFormItem, ElInput, ElButton } from "element-plus";
import "element-plus/dist/index.css";

import { ref } from "vue";
let compassDataObj = new CompassData();
//旋转角度
let rotate = ref(0);
//罗盘大小
let compassSize = ref({
  width: 800,
  height: 800,
});
//所有层的罗盘数据
let compassData = ref(compassDataObj.getAllData());
//存储层的填充数据
let layerFilt = ref([]);
//存储宫的填充数据
let latticeFill = ref([]);
// 刻度样式
let scaclStyle = ref({
  minLineHeight: 10,
  midLineHeight: 25,
  maxLineHeight: 25,
});
let isShowTianxinCross = ref(true);

// 罗盘边框颜色
let borderColor = ref('#DDDDDD');
// 刻度颜色
let scaleColor = ref('#DDDDDD');
// 高亮刻度颜色
let scaleHighlightColor = ref('#DDDDDD');
const refControlPanel = ref(null);
function handleLatticeClick(event) {
  console.log("宫格被点击：", event);
  // 设置选中的层和宫
  refControlPanel.value.updateLayerLatticeIndex(event);
}

// 处理罗盘数据更新
function handleCompassDataUpdate(newData) {
  compassData.value = newData;
}
</script>

<template>
  <StarryBackground />
  <div class="gemc-layout">
    <div class="compass-container">
      <h3 class="compass-title">SVG-FengShuiCompass</h3>
      <FengShuiCompassSvg
        :width="compassSize.width"
        :height="compassSize.height"
        :rotate="rotate"
        :compassData="compassData"
        :layerFilt="layerFilt"
        :latticeFill="latticeFill"
        :isShowTianxinCross="isShowTianxinCross"
        v-model:borderColor="borderColor"
        v-model:scaleColor="scaleColor"
        v-model:scaleHighlightColor="scaleHighlightColor"
        :scaclStyle="scaclStyle"
        @latticeClick="handleLatticeClick"
      ></FengShuiCompassSvg>
    </div>
    <ControlPanel
      ref="refControlPanel"
      :compassData="compassData"
      v-model:rotate="rotate"
      v-model:layerFilt="layerFilt"
      v-model:latticeFill="latticeFill"
      v-model:compassSize="compassSize"
      v-model:isShowTianxinCross="isShowTianxinCross"
      v-model:borderColor="borderColor"
      v-model:scaleColor="scaleColor"
      v-model:scaleHighlightColor="scaleHighlightColor"
      @update:compassData="handleCompassDataUpdate"
    />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: rgb(12, 12, 12);
}
.gemc-layout {
  display: flex;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}
.compass-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.compass-title {
  color: #dddddd;
  margin-bottom: 20px;
}
.contorl {
  background-color: rgb(35, 35, 35);
  padding: 10px;
  width: 400px;
  height: 100%;
  position: fixed;
  right: 0;
  transition: transform 0.3s ease;
}

.contorl.collapsed {
  transform: translateX(410px);
}

.toggle-panel {
  position: absolute;
  left: -30px;
  top: 5%;
  transform: translateY(-50%);
  width: 30px;
  height: 60px;
  background-color: rgb(35, 35, 35);
  border: none;
  color: #dddddd;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.toggle-panel:hover {
  background-color: rgb(45, 45, 45);
}

.toggle-icon {
  display: inline-block;
}
.control-rotate > div {
  margin-top: 5px;
}
.control-rotate {
  color: #dddddd;
  text-align: left;
  font-size: smaller;
}

.control-data {
  color: #dddddd;
  text-align: left;
  font-size: smaller;
  min-height: 50vh;
}
.control-data textarea {
  font-size: small;
  width: 100%;
  background-color: #2c3e50;
  color: #dddddd;
  height: max-content;
  min-height: inherit;
}
#gemc {
  /* 为了视觉上看起来不奇怪，添加了margin*/
  height: calc(100vh - 100px);
  width: calc(100vh - 100px);
  margin: 50px;
}
.line {
  background-color: #dddddd;
  height: 1px;
  margin: 5px 0px;
  width: 100%;
}
.center {
  text-align: center;
}
input,
select {
  background-color: transparent;
  margin-left: 5px;
  color: #dddddd;
}

/** 开关按钮样式 */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #dddddd;
}

input:focus + .slider {
  box-shadow: 0 0 1px #dddddd;
}

input:checked + .slider:before {
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translateX(20px);
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
