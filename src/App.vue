<script setup>
import FengShuiCompass from "./components/FengShuiCompass.vue";
import { CompassData } from "./components/compass-main.js";

import { ref, reactive } from "vue";
let compassDataObj = new CompassData();
//旋转角度
let rotate = ref(0);
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
  numberFontSize: 30,
});

//显示隐藏天心十字
let isShowTianxinCross = ref(true);

function getDataByIndex() {
  return compassDataObj.getDataByIndex(selectLayer.value);
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
      layerFilt.value.push([parseInt(selectLayer.value), selectLayerColor.value]);
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
  <div class="gemc-layout">
    <FengShuiCompass
      id="gemc"
      :width="2000"
      :height="2000"
      v-model:rotate="rotate"
      :compassData="compassData"
      v-model:layerFilt="layerFilt"
      v-model:latticeFill="latticeFill"
      :scaclStyle="scaclStyle"
      :isShowTianxinCross="isShowTianxinCross"
      :tianxinCrossStyle="{ color: 'red', lineWidth: 10 }"
    ></FengShuiCompass>
    <div class="contorl">
      <div class="control-rotate">
        旋转罗盘
        <input type="range" min="0" max="100" step="" v-model="rotate" />
      </div>
      <div class="line"></div>

      <div class="control-rotate">
        颜色填充
        <div>
          层：
          <select v-model="selectLayer">
            <option v-for="(item, index) in compassDataObj.getAllData()" :key="index">
              {{ index }}
            </option>
          </select>
          <input type="color" v-model="selectLayerColor" @change="changeLayerFilt" />
          <!-- <div>{{item}}</div> -->
        </div>
        <div>
          宫：
          <select v-model="selectLattice">
            <option v-for="(item, index) in getDataByIndex()" :key="index">
              {{ index }}
            </option>
          </select>
          <input type="color" v-model="selectLatticeColor" @change="changeLatticeFill" />
        </div>
     <div class="line"></div>
        <div>
          隐藏/显示天心十字:
          <label class="switch">
            <input type="checkbox" v-model="isShowTianxinCross"/>
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
  background: rgb(46, 47, 46);
}
.gemc-layout {
  display: flex;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}
.contorl {
  background-color: rgb(35, 35, 35);
  flex: auto;
  padding: 10px;
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
  height: 100vh;
  width: 100vh;
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
