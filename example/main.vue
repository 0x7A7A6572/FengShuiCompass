<script setup>
import { reactive, ref } from "vue";
import Yao  from "../src/components/feng-shui-compass-svg/Yao.vue";

// 爻配置
const yaoConfig = reactive({
  radius: 100,
  angle: 100,
  arcLength: 30,
  layerHeight: 64,
  enableCurve: true,
  barWidth: 10
});

// 爻数据
const bars = ref([
  { id: 'bar1', color: '#ff0050', type: 'yang' },
  { id: 'bar2', color: '#2c3e50', type: 'yin' },
  { id: 'bar3', color: '#2c3ee0', type: 'yang' }
]);

// 控制面板数据
const controls = reactive({
  angle: 100,
  arcLength: 30,
  enableCurve: true,
  layerHeight: 64
});

// 更新配置
function updateConfig(key, value) {
  yaoConfig[key] = value;
}
</script>

<template>
  <div class="example-container">
    <h1>爻组件示例</h1>
    <div class="content-wrapper">
      <div class="yao-wrapper">
        <Yao
          :config="yaoConfig"
          :initialBars="bars"
          :size="400"
        />
      </div>
      <div class="control-panel">
        <div class="control-item">
          <label>角度：{{ controls.angle }}°</label>
          <input
            type="range"
            v-model="controls.angle"
            min="0"
            max="360"
            @input="updateConfig('angle', Number(controls.angle))"
          >
        </div>
        <div class="control-item">
          <label>弧长：{{ controls.arcLength }}°</label>
          <input
            type="range"
            v-model="controls.arcLength"
            min="10"
            max="90"
            @input="updateConfig('arcLength', Number(controls.arcLength))"
          >
        </div>
        <div class="control-item">
          <label>
            <input
              type="checkbox"
              v-model="controls.enableCurve"
              @change="updateConfig('enableCurve', controls.enableCurve)"
            >
            启用曲线
          </label>
        </div>
        <div class="control-item">
          <label>层高：{{ controls.layerHeight }}px</label>
          <input
            type="range"
            v-model="controls.layerHeight"
            min="30"
            max="120"
            @input="updateConfig('layerHeight', Number(controls.layerHeight))"
          >
        </div>
      </div>
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

.content-wrapper {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  margin-top: 20px;
}

.yao-wrapper {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.control-panel {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  min-width: 250px;
}

.control-item {
  margin-bottom: 20px;
}

.control-item label {
  display: block;
  margin-bottom: 8px;
  color: #333;
}

.control-item input[type="range"] {
  width: 100%;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}
</style>