<script setup>
import FengShuiCompassSvg from "./components/feng-shui-compass-svg/feng-shui-compass-svg.vue";
import StarryBackground from "./components/starry-background.vue";
import ControlPanel from "./components/control-panel.vue";
import "element-plus/dist/index.css";
import compassTheme from "./themes/theme-compass.js";

import { ref, reactive } from "vue";

const compassProps = ref(JSON.parse(JSON.stringify(compassTheme)));

const refControlPanel = ref(null);

function handleLatticeClick(event) {
  refControlPanel.value.updateLayerLatticeIndex(event);
}

function handleConfigChange(config) {
  // Object.assign(compassProps, config.data);
  compassProps.value = config.data
}
</script>

<template>
  <StarryBackground />
  <div class="gemc-layout dark">
    <div class="compass-container">
      <h3 class="compass-title">SVG-FengShuiCompass</h3>
      <FengShuiCompassSvg
        :config="compassProps"
        @latticeClick="handleLatticeClick"
      />
    </div>
    <ControlPanel
      ref="refControlPanel"
      :config="compassProps"
      @onConfigChange="handleConfigChange"
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
