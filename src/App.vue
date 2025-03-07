<script setup>
import FengShuiCompassSvg from "./components/fs-compass-svg/FengShuiCompassSvg.vue";
import StarryBackground from "./components/StarryBackground.vue";
import ControlPanel from "./components/ControlPanel.vue";
import "element-plus/dist/index.css";
import compassTheme from "./themes/theme-compass.js";

import { ref, reactive } from "vue";

const compassProps = reactive(JSON.parse(JSON.stringify(compassTheme)));

const refControlPanel = ref(null);
function handleLatticeClick(event) {
  console.log("宫格被点击：", event);
  // 设置选中的层和宫
  refControlPanel.value.updateLayerLatticeIndex(event);
}

// 处理罗盘数据更新
function handleCompassDataUpdate(newData) {
  compassProps.data = newData;
}
</script>

<template>
  <StarryBackground />
  <div class="gemc-layout">
    <div class="compass-container">
      <h3 class="compass-title">SVG-FengShuiCompass</h3>
      <FengShuiCompassSvg
        :width="compassProps.compassSize.width"
        :height="compassProps.compassSize.height"
        :rotate="compassProps.rotate"
        :compassData="compassProps.data"
        :latticeFill="compassProps.latticeFill"
        :isShowTianxinCross="compassProps.isShowTianxinCross"
        :isShowScale="compassProps.isShowScale"
        :scaclStyle="compassProps.scaclStyle"
        :autoFontSize="compassProps.autoFontSize"
        v-model:borderColor="compassProps.line.borderColor"
        v-model:scaleColor="compassProps.line.scaleColor"
        v-model:scaleHighlightColor="compassProps.line.scaleHighlightColor"
        @latticeClick="handleLatticeClick"
      ></FengShuiCompassSvg>
    </div>
    <ControlPanel
      ref="refControlPanel"
      :compassData="compassProps.data"
      v-model:rotate="compassProps.rotate"
      v-model:latticeFill="compassProps.latticeFill"
      v-model:compassSize="compassProps.compassSize"
      v-model:isShowTianxinCross="compassProps.isShowTianxinCross"
      v-model:isShowScale="compassProps.isShowScale"
      v-model:borderColor="compassProps.line.borderColor"
      v-model:scaleColor="compassProps.line.scaleColor"
      v-model:scaleHighlightColor="compassProps.line.scaleHighlightColor"
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
#gemc {
  /* 为了视觉上看起来不奇怪，添加了margin*/
  height: calc(100vh - 100px);
  width: calc(100vh - 100px);
  margin: 50px;
}
</style>
