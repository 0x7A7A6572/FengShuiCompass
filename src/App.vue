<script setup>
import FengShuiCompass from "./components/FengShuiCompass.vue";
import { CompassData } from "./components/compass-main.js";

import { ref } from "vue";
let compassDataObj = new CompassData();
let rotate = ref(0);
let selectLayer = ref("0");
let selectLayerColor = ref("#ff0000");
let selectLattice = ref("");
let compassData = ref(compassDataObj.getAllData());

let layerFilt = ref([]);

function getDataByIndex(){
 return compassDataObj.getDataByIndex(selectLayer.value)
}

function changeLayerFilt(){
  let count = 0;
  for(let i in layerFilt.value){
     console.log("??",layerFilt.value, layerFilt.value[i][0] == selectLayer.value)
    if(layerFilt.value[i][0] == selectLayer.value){
      layerFilt.value[i][1].value = selectLayerColor.value;
      break;
    }else if(count == layerFilt.value.length){
      layerFilt.value.push([selectLayer.value, selectLayerColor.value]);
    }
    count++;
  }
  console.log("LayerFilt.value",layerFilt.value,count);
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
            <option v-for="(item,index) in compassDataObj.getAllData()" :key="index">{{index}}</option>
          </select>
          <input type="color"  @input="changeLayerFilt"/>
          <!-- <div>{{item}}</div> -->
        </div>
        <div>
          宫：
           <select v-model="selectLattice">
            <option v-for="(item,index) in getDataByIndex()" :key="index">{{item}}</option>
          </select>
          <input type="color" value="#FF9900" />
        </div>
      </div>
      <div class="line"></div>

      <div class="control-data">
        数据
        <textarea disabled type="range" min="0" max="100" step="5"></textarea>
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
}
.control-data textarea {
  font-size: small;
  width: 100%;
}
#gemc {
  height: 100vh;
  display: block;
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
</style>
