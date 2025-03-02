<script setup>
import FengShuiCompass from "./components/FengShuiCompass.vue";
import FengShuiCompassSvg from "./components/fs-compass-svg/FengShuiCompassSvg.vue";
import { CompassData } from "./components/compass-main.js";
import StarryBackground from "./components/StarryBackground.vue";

import { ref, reactive } from "vue";
let compassDataObj = new CompassData();
//旋转角度
let rotate = ref(0);
//罗盘大小
let compassSize = ref({
  width: 800,
  height: 800,
});
//选择的层数
let selectLayer = ref("0");
//选择层的填充色
let selectLayerColor = ref("#ff0000");
//选择的宫
let selectLattice = ref("");
//选择宫的填充色
let selectLatticeColor = ref("#00ff00");
//所有层的罗盘数据
let compassData = ref(compassDataObj.getAllData());
// console.log(compassDataObj.getAllData(), compassData.value)
//存储层的填充数据
let layerFilt = ref([]);
//存储宫的填充数据
let latticeFill = ref([]);
// 刻度样式
let scaclStyle = ref({
  minLineHeight: 10,
  midLineHeight: 25,
  maxLineHeight: 25,
  // numberFontSize: 20,
});
let isPanelExpanded = ref(true);
function getDataByIndex() {
  return compassDataObj.getDataByIndex(selectLayer.value);
}

function handleLatticeClick(event) {
  console.log("宫格被点击：", event);
  // 设置选中的层和宫
  selectLayer.value = event.layerIndex.toString();
  selectLattice.value = event.latticeIndex.toString();
}

function changeLayerFilt() {
  let count = 0;
  // console.log("selectLayerColor:", typeof selectLayerColor.value);
  if (layerFilt.value.length == 0) {
    layerFilt.value.push([parseInt(selectLayer.value), selectLayerColor.value]);
  }
  for (let i in layerFilt.value) {
    if (layerFilt.value[i][0] == selectLayer.value) {
      layerFilt.value[i][1] = selectLayerColor.value;
      break;
    } else if (count == layerFilt.value.length - 1) {
      layerFilt.value.push([
        parseInt(selectLayer.value),
        selectLayerColor.value,
      ]);
    }
    count++;
  }
  // console.log("LayerFilt.value", layerFilt.value, count);
}

function changeLatticeFill() {
  let count = 0;
  // console.log("selectLayerColor:", typeof selectLayerColor.value);
  if (latticeFill.value.length == 0) {
    latticeFill.value.push([
      parseInt(selectLattice.value),
      parseInt(selectLayer.value),
      selectLatticeColor.value,
    ]);
  }
  for (let i in latticeFill.value) {
    if (
      latticeFill.value[i][1] == selectLayer.value &&
      latticeFill.value[i][0] == selectLattice.value
    ) {
      latticeFill.value[i][2] = selectLatticeColor.value;
      break;
    } else if (count == latticeFill.value.length - 1) {
      latticeFill.value.push([
        parseInt(selectLattice.value),
        parseInt(selectLayer.value),
        selectLatticeColor.value,
      ]);
    }
    count++;
  }
}
</script>

<template>
  <StarryBackground />
  <div class="gemc-layout">
    <!-- <div class="compass-container">
      <h3 class="compass-title">Canvas版本</h3>
      <FengShuiCompass
        id="gemc"
        :width="1000"
        :height="1000"
        v-model:rotate="rotate"
        :compassData="compassData"
        v-model:layerFilt="layerFilt"
        v-model:latticeFill="latticeFill"
        :scaclStyle="scaclStyle"
        :isShowTianxinCross="isShowTianxinCross"
        :tianxinCrossStyle="{ color: 'red', lineWidth: 10 }"
      ></FengShuiCompass>
    </div> -->
    <div class="compass-container">
      <h3 class="compass-title">SVG版本</h3>
      <FengShuiCompassSvg
        :width="compassSize.width"
        :height="compassSize.height"
        :rotate="rotate"
        :compassData="compassData"
        :layerFilt="layerFilt"
        :latticeFill="latticeFill"
        borderColor="#DDDDDD"
        scaleColor="#DDDDDD"
        scaleHighlightColor="#DDDDDD"
        :scaclStyle="scaclStyle"
        @latticeClick="handleLatticeClick"
      ></FengShuiCompassSvg>
    </div>

    <div class="contorl" :class="{ collapsed: !isPanelExpanded }">
      <button class="toggle-panel" @click="isPanelExpanded = !isPanelExpanded">
        <span class="toggle-icon">{{ isPanelExpanded ? "→" : "←" }}</span>
      </button>
      <div>
        <div class="line"></div>
        <div class="control-rotate">
          旋转罗盘
          <input type="range" min="0" max="100" step="" v-model="rotate" />
        </div>
        <div class="line"></div>
        <div class="control-rotate">
          罗盘大小
          <div>
            宽度：<input type="range" min="200" max="1200" step="50" v-model="compassSize.width" /> {{ compassSize.width }}px
          </div>
          <div>
            高度：<input type="range" min="200" max="1200" step="50" v-model="compassSize.height" /> {{ compassSize.height }}px
          </div>
        </div>
        <div class="line"></div>
        <div class="control-rotate">
          颜色填充
          <div>
            层：
            <select v-model="selectLayer">
              <option
                v-for="(item, index) in compassDataObj.getAllData()"
                :key="index"
              >
                {{ index }}
              </option>
            </select>
            <input
              type="color"
              v-model="selectLayerColor"
              @change="changeLayerFilt"
            />
            <!-- <div>{{item}}</div> -->
          </div>
          <div>
            宫：
            <select v-model="selectLattice">
              <option v-for="(item, index) in getDataByIndex()" :key="index">
                {{ index }}
              </option>
            </select>
            <input
              type="color"
              v-model="selectLatticeColor"
              @change="changeLatticeFill"
            />
          </div>
          <div class="line"></div>
          <div>
            隐藏/显示天心十字:
            <label class="switch">
              <input type="checkbox" v-model="isShowTianxinCross" />
              <div class="slider"></div>
            </label>
          </div>
        </div>

        <div class="line"></div>
        <div class="control-data">
          数据
          <textarea
            disabled
            type="range"
            min="0"
            max="100"
            step="5"
            :value="JSON.stringify(compassData)"
          ></textarea>
        </div>
        <div class="line"></div>
      </div>
    </div>
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
  color: aqua;
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
  transform: translateX(400px);
}

.toggle-panel {
  position: absolute;
  left: -30px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 60px;
  background-color: rgb(35, 35, 35);
  border: none;
  color: aqua;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
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
  color: aqua;
  text-align: left;
  font-size: smaller;
}

.control-data {
  color: aqua;
  text-align: left;
  font-size: smaller;
  min-height: 50vh;
}
.control-data textarea {
  font-size: small;
  width: 100%;
  background-color: #2c3e50;
  color: aqua;
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
  background-color: aqua;
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
  color: aqua;
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
  background-color: aqua;
}

input:focus + .slider {
  box-shadow: 0 0 1px aqua;
}

input:checked + .slider:before {
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translateX(20px);
}
</style>
