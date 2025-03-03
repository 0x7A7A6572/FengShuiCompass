<template>
  <div class="control" :class="{ collapsed: !isPanelExpanded }">
    <el-button 
      class="toggle-panel" 
      @click="isPanelExpanded = !isPanelExpanded"
      :icon="isPanelExpanded ? 'ArrowRight' : 'ArrowLeft'"
      circle
    />
    <el-space direction="vertical" fill class="control-content">
      <el-divider />
      <div class="control-section">
        <el-text>旋转罗盘</el-text>
        <el-slider
          v-model="rotate"
          :min="0"
          :max="100"
          @input="$emit('update:rotate', rotate)"
        />
      </div>
      <el-divider />
      <div class="control-section">
        <el-text>罗盘大小</el-text>
        <div>
          <el-text>宽度：</el-text>
          <el-slider
            v-model="compassSize.width"
            :min="200"
            :max="1200"
            :step="50"
            @input="updateCompassSize"
          >
            <template #marker>
              {{ compassSize.width }}px
            </template>
          </el-slider>
        </div>
        <div>
          <el-text>高度：</el-text>
          <el-slider
            v-model="compassSize.height"
            :min="200"
            :max="1200"
            :step="50"
            @input="updateCompassSize"
          >
            <template #marker>
              {{ compassSize.height }}px
            </template>
          </el-slider>
        </div>
      </div>
      <el-divider />
      <div class="control-section">
        <el-text>颜色填充</el-text>
        <div class="color-select">
          <el-text>层：</el-text>
          <el-select v-model="selectLayer" size="small">
            <el-option
              v-for="(item, index) in compassData"
              :key="index"
              :label="index"
              :value="index"
            />
          </el-select>
          <el-color-picker
            v-model="selectLayerColor"
            @change="changeLayerFilt"
            size="small"
          />
        </div>
        <div class="color-select">
          <el-text>宫：</el-text>
          <el-select v-model="selectLattice" size="small">
            <el-option
              v-for="(item, index) in getDataByIndex()"
              :key="index"
              :label="index"
              :value="index"
            />
          </el-select>
          <el-color-picker
            v-model="selectLatticeColor"
            @change="changeLatticeFill"
            size="small"
          />
        </div>
        <el-divider />
        <div class="switch-item">
          <el-text>隐藏/显示天心十字：</el-text>
          <el-switch
            v-model="isShowTianxinCross"
            @change="$emit('update:isShowTianxinCross', isShowTianxinCross)"
          />
        </div>
      </div>
      <el-divider />
      <div class="control-section">
        <el-text>罗盘渲染数据</el-text>
        <v-ace-editor
          v-model:value="editorContent"
          lang="json"
          theme="monokai"
          style="height: 60vh"
          :options="{
            fontSize: 14,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            showPrintMargin: false,
          }"
        />
        <el-button type="primary" @click="updateCompassData" style="margin-top: 10px">确认</el-button>
      </div>
      <el-divider />
    </el-space>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { VAceEditor } from "vue3-ace-editor";
import { ArrowRight, ArrowLeft } from '@element-plus/icons-vue';
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";

const props = defineProps({
  compassData: {
    type: Array,
    required: true,
  },
  rotate: {
    type: Number,
    default: 0,
  },
  compassSize: {
    type: Object,
    required: true,
  },
  layerFilt: {
    type: Array,
    default: () => [],
  },
  latticeFill: {
    type: Array,
    default: () => [],
  },
  isShowTianxinCross: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits([
  "update:rotate",
  "update:compassSize",
  "update:layerFilt",
  "update:latticeFill",
  "update:isShowTianxinCross",
]);

const isPanelExpanded = ref(true);
const selectLayer = ref(0);
const selectLayerColor = ref("#ff0000");
const selectLattice = ref("");
const selectLatticeColor = ref("#00ff00");
const showEditor = ref(true);
const editorContent = ref(JSON.stringify(props.compassData, null, 2));

function getDataByIndex() {
  return props.compassData[parseInt(selectLayer.value)]?.data || [];
}

function updateCompassSize() {
  emit("update:compassSize", {
    width: props.compassSize.width,
    height: props.compassSize.height,
  });
}

function changeLayerFilt() {
  const newLayerFilt = [...props.layerFilt];
  const layerIndex = parseInt(selectLayer.value);
  const existingIndex = newLayerFilt.findIndex(
    (item) => item[0] === layerIndex
  );

  if (existingIndex === -1) {
    newLayerFilt.push([layerIndex, selectLayerColor.value]);
  } else {
    newLayerFilt[existingIndex][1] = selectLayerColor.value;
  }

  emit("update:layerFilt", newLayerFilt);
}

function changeLatticeFill() {
  const newLatticeFill = [...props.latticeFill];
  const latticeIndex = parseInt(selectLattice.value);
  const layerIndex = parseInt(selectLayer.value);
  const existingIndex = newLatticeFill.findIndex(
    (item) => item[0] === latticeIndex && item[1] === layerIndex
  );

  if (existingIndex === -1) {
    newLatticeFill.push([latticeIndex, layerIndex, selectLatticeColor.value]);
  } else {
    newLatticeFill[existingIndex][2] = selectLatticeColor.value;
  }

  emit("update:latticeFill", newLatticeFill);
}

function updateLayerLatticeIndex(event) {
  selectLayer.value = event.layerIndex;
  selectLattice.value = event.latticeIndex;
}

function openEditor() {
  editorContent.value = JSON.stringify(props.compassData, null, 2);
  showEditor.value = true;
}

function updateCompassData() {
  try {
    const newData = JSON.parse(editorContent.value);
    emit("update:compassData", newData);
    showEditor.value = false;
  } catch (e) {
    alert("JSON格式错误，请检查后重试");
  }
}

defineExpose({
  updateLayerLatticeIndex,
});
</script>

<style scoped>
.control {
  background-color: var(--el-bg-color);
  padding: 20px;
  width: 400px;
  height: 100%;
  position: fixed;
  right: 0;
  transition: transform 0.3s ease;
  border-left: 1px solid var(--el-border-color-light);
}

.control.collapsed {
  transform: translateX(410px);
}

.toggle-panel {
  position: absolute;
  left: -40px;
  top: 5%;
  transform: translateY(-50%);
}

.control-content {
  height: 100%;
  overflow-y: auto;
}

.control-section {
  width: 100%;
}

.control-section > div {
  margin-top: 10px;
}

.color-select {
  display: flex;
  align-items: center;
  gap: 10px;
}

.switch-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:deep(.el-slider) {
  margin-top: 8px;
}

:deep(.el-select) {
  width: 100px;
}

:deep(.el-space) {
  width: 100%;
}
</style>