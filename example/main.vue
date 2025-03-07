<script setup>
import { reactive } from "vue";
import { FengShuiCompassSvg , themes } from "../dist/feng-shui-compass.es.js";
import "../dist/index.css";
// import 'feng-shui-compass/dist/style.css'

// 罗盘配置
const compassConfig = reactive(themes.compassTheme);

// 处理格子点击事件
function handleLatticeClick(event) {
  console.log("Lattice clicked:", event);
}
</script>

<template>
  <div class="example-container">
    <h1>Feng Shui Compass Example</h1>
    <div class="compass-wrapper">
      <FengShuiCompassSvg
        :config="compassConfig"
        @latticeClick="handleLatticeClick"
      />
    </div>
  </div>
</template>

<style scoped>
.example-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background: #f5f5f5;
}

.compass-wrapper {
  margin: 20px;
  padding: 20px;
  background: rgb(31, 31, 31);
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  margin-bottom: 20px;
}
</style> 