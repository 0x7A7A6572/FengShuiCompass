<template>
  <div class="control" :class="{ collapsed: !isPanelExpanded }">
    <el-button
      class="toggle-panel"
      @click="isPanelExpanded = !isPanelExpanded"
      :icon="isPanelExpanded ? 'ArrowRight' : 'ArrowLeft'"
    />
    <div direction="vertical" fill class="control-content">
      <div class="control-section">
        <el-text class="sub-title">旋转罗盘</el-text>
        <div class="flex-center">
          <el-text>角度：</el-text>
          <el-slider
            v-model="rotate"
            :min="0"
            :max="360"
            :step="1"
            @input="$emit('update:rotate', rotate)"
          />
        </div>
      </div>
      <div class="control-section">
        <el-text class="sub-title">罗盘大小</el-text>
        <div class="flex-center">
          <el-text>宽度：</el-text>
          <el-slider
            v-model="compassSize.width"
            :min="400"
            :max="1600"
            :step="100"
            show-stops
            @input="updateCompassSize"
          >
            <template #marker> {{ compassSize.width }}px </template>
          </el-slider>
        </div>
        <div class="flex-center">
          <el-text>高度：</el-text>
          <el-slider
            v-model="compassSize.height"
            :min="400"
            :max="1600"
            :step="100"
            show-stops
            @input="updateCompassSize"
          >
            <template #marker> {{ compassSize.height }}px </template>
          </el-slider>
        </div>
      </div>
      <div class="control-section">
        <el-text class="sub-title">样式修改</el-text>
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
            show-alpha
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
            show-alpha
          />
        </div>
        <div class="color-select">
          <el-text>文字颜色：</el-text>
          <el-color-picker
            v-model="selectLatticeTextColor"
            @change="changeLatticeTextColorFill"
            size="small"
            show-alpha
          />
        </div>
      </div>
      <div class="control-section">
        <el-text class="sub-title">罗盘边框与刻度</el-text>
        <div class="color-select">
          <el-text>边框颜色：</el-text>
          <el-color-picker
            v-model="borderColor"
            @change="$emit('update:borderColor', borderColor)"
            size="small"
            show-alpha
          />
        </div>
        <div class="color-select">
          <el-text>刻度颜色：</el-text>
          <el-color-picker
            v-model="scaleColor"
            @change="$emit('update:scaleColor', scaleColor)"
            size="small"
            show-alpha
          />
        </div>
        <div class="color-select">
          <el-text>高亮刻度颜色：</el-text>
          <el-color-picker
            v-model="scaleHighlightColor"
            @change="$emit('update:scaleHighlightColor', scaleHighlightColor)"
            size="small"
            show-alpha
          />
        </div>
      </div>
      <div class="control-section">
        <el-text class="sub-title">天心十字</el-text>
        <div class="switch-item">
          <el-text>显示/隐藏：</el-text>
          <el-switch
            v-model="isShowTianxinCross"
            @change="$emit('update:isShowTianxinCross', isShowTianxinCross)"
          />
        </div>
      </div>
      <div class="control-section">
        <el-text class="sub-title">主题选择</el-text>
        <div class="themes-container">
          <div class="theme-cards">
            <div v-for="theme in themes" :key="theme.name" class="theme-card" :class="{ active: currentTheme === theme.name }" @click="applyTheme(theme.data, theme.name)">
              <div class="theme-preview" :style="{ backgroundImage: `url(${theme.preview})`, backgroundSize: 'cover', backgroundPosition: 'center' }"></div>
              <h3>{{ theme.name }}</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="control-section">
        <el-text class="sub-title">罗盘渲染数据</el-text>
        <div class="flex-center" style="justify-content: end">
          <el-button @click="showFullscreenEditor = true" type="primary">
            <el-icon><FullScreen /></el-icon>
          </el-button>
          <el-button type="primary" @click="updateCompassData">更新</el-button>
        </div>

        <v-ace-editor
          v-model:value="editorContent"
          lang="json"
          theme="monokai"
          style="height: 30vh"
          :options="{
            fontSize: 14,
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            showPrintMargin: false,
          }"
        />
      </div>
      <el-divider />
    </div>
  </div>
  <el-dialog
    style="background: #272822; color: whit"
    v-model="showFullscreenEditor"
    title="罗盘数据编辑器"
    fullscreen
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <v-ace-editor
      v-model:value="editorContent"
      lang="json"
      theme="monokai"
      style="height: calc(100vh - 150px)"
      :options="{
        fontSize: 14,
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        showPrintMargin: false,
      }"
    />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showFullscreenEditor = false">取消</el-button>
        <el-button type="primary" @click="handleFullscreenUpdate">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";
import { VAceEditor } from "vue3-ace-editor";
import { ArrowRight, ArrowLeft } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import defaultTheme from "../themes/theme-crice.js";
import compassTheme from "../themes/theme-compass.js";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import darkTheme from "../themes/theme-dark.js";

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
  borderColor: {
    type: String,
    default: '#DDDDDD',
  },
  scaleColor: {
    type: String,
    default: '#DDDDDD',
  },
  scaleHighlightColor: {
    type: String,
    default: '#DDDDDD',
  },
});

const emit = defineEmits([
  'update:rotate',
  'update:compassSize',
  'update:layerFilt',
  'update:latticeFill',
  'update:isShowTianxinCross',
  'update:borderColor',
  'update:scaleColor',
  'update:scaleHighlightColor',
]);

// 注册图标组件
const components = {
  ArrowRight,
  ArrowLeft,
};

const showFullscreenEditor = ref(false);
const isPanelExpanded = ref(true);
const themes = ref([{ name: "默认主题", data: defaultTheme, preview: new URL('../themes/theme-crice-preview.png', import.meta.url).href }, { name: "罗盘主题", data: compassTheme, preview: new URL('../themes/theme-compass-preview.png', import.meta.url).href }, { name: "暗夜主题", data: darkTheme, preview: new URL('../themes/theme-dark-preview.png', import.meta.url).href }]);
const currentTheme = ref(themes.value[0].name);

function applyTheme(themeData, themeName) {
  editorContent.value = JSON.stringify(themeData, null, 2);
  updateCompassData();
  currentTheme.value = themeName;
  ElMessage.success("主题应用成功");
}
const selectLayer = ref(0);
const selectLayerColor = ref("#ff0000");
const selectLattice = ref("");
const selectLatticeColor = ref("#00ff00");
const selectLatticeTextColor = ref("#ffffff");
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
  const newLatticeFill = [...props.latticeFill];
  const layerIndex = parseInt(selectLayer.value);
  const layerData = props.compassData[layerIndex]?.data || [];

  // 遍历当前层的所有宫格
  layerData.forEach((_, latticeIndex) => {
    const existingIndex = newLatticeFill.findIndex(
      (item) => item[0] === latticeIndex && item[1] === layerIndex
    );

    if (existingIndex === -1) {
      newLatticeFill.push([latticeIndex, layerIndex, selectLayerColor.value]);
    } else {
      newLatticeFill[existingIndex][2] = selectLayerColor.value;
    }
  });

  emit("update:latticeFill", newLatticeFill);
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

function changeLatticeTextColorFill() {
  const newLatticeFill = [...props.latticeFill];
  const latticeIndex = parseInt(selectLattice.value);
  const layerIndex = parseInt(selectLayer.value);
  const existingIndex = newLatticeFill.findIndex(
    (item) => item[0] === latticeIndex && item[1] === layerIndex
  );

  if (existingIndex === -1) {
    newLatticeFill.push([latticeIndex, layerIndex, undefined, selectLatticeTextColor.value]);
  } else {
    newLatticeFill[existingIndex][3] = selectLatticeTextColor.value;
  }

  // 更新数据源中对应宫格的textColor属性
  if (props.compassData[layerIndex] && props.compassData[layerIndex].data[latticeIndex]) {
    props.compassData[layerIndex].textColor = selectLatticeTextColor.value;
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
    // 验证数据结构
    if (!Array.isArray(newData)) {
      ElMessage.error("数据格式错误：必须是一个数组");
      return;
    }
    // 验证每个层的数据结构
    const isValid = newData.every((layer, index) => {
      if (!layer.data || !Array.isArray(layer.data)) {
        ElMessage.error(`第${index + 1}层数据格式错误：缺少data数组`);
        return false;
      }
      return true;
    });

    if (!isValid) return;

    emit("update:compassData", newData);
    ElMessage.success("罗盘数据更新成功");
  } catch (e) {
    ElMessage.error("JSON解析错误：" + e.message);
  }
}

function handleFullscreenUpdate() {
  updateCompassData();
  showFullscreenEditor.value = false;
}

defineExpose({
  updateLayerLatticeIndex,
});
</script>

<style scoped>
.control {
  margin-left: -6px;
  /* background-color: rgb(0, 0, 0); */
  background: #232323;
  color: white;
  padding: 20px;
  width: 400px;
  height: 100%;
  position: fixed;
  right: 0;
  transition: transform 0.3s ease;
}

.control.collapsed {
  transform: translateX(440px);
}

.toggle-panel {
  position: absolute;
  left: -30px;
  top: 5%;
  transform: translateY(-50%);
}

.control-content {
  height: 100%;
  overflow-y: auto;
  /* 隐藏滑动条 */
  scrollbar-width: none;
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

:deep(.el-slider .el-slider__runway) {
  background-color: #2c2c2c;
  height: 8px;
  border-radius: 4px;
}

:deep(.el-slider .el-slider__bar) {
  background-color: #409eff;
  height: 8px;
  border-radius: 4px;
}

:deep(.el-slider .el-slider__button) {
  border-color: #409eff;
  background-color: #409eff;
  width: 16px;
  height: 16px;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.2);
  }
}

:deep(.el-select) {
  width: 100px;
}

:deep(.el-select .el-input__wrapper) {
  background-color: #4a4a4a;
  box-shadow: 0 0 0 1px #606266 inset;
}

:deep(.el-select .el-input__inner) {
  color: #dcdfe6;
}

:deep(.el-color-picker__trigger) {
  border-color: #606266;
}

:deep(.el-space) {
  width: 100%;
}

:deep(.el-button) {
  background-color: #4a4a4a;
  border-color: #606266;
  color: #dcdfe6;
  margin-bottom: 12px;
  display: block;
}
.sub-title {
  font-size: 16px;
  font-weight: 600;
  color: #d1d1d1;
  margin-bottom: 12px;
  display: block;
  text-align: left;
}
.sub-title::before {
  content: "";
  display: block;
  width: 20px;
  height: 5px;
  background-color: #2c4d57;
  margin-top: 10px;
}
.themes-container {
  width: 100%;
  overflow-x: auto;
  padding: 10px 0;
  /* 自定义滚动条样式 */
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #1e1e1e;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #4a4a4a;
    border-radius: 4px;
    transition: background 0.3s ease;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #606060;
  }
}
.theme-cards {
  display: flex;
  gap: 16px;
  padding: 0 4px;
}

.theme-card {
  flex: 0 0 200px;
  background: #2c2c2c;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid transparent;
  position: relative;
}

.theme-card.active {
  background: #3a3a3a;
  border-color: #409eff;
  box-shadow: 0 0 15px rgba(64, 158, 255, 0.3);
}

.theme-card.active::after {
  content: "当前主题";
  position: absolute;
  top: -10px;
  right: -10px;
  background: #409eff;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.theme-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  border-color: #409eff;
}

.theme-card h3 {
  margin: 8px 0 0 0;
  color: #d1d1d1;
  font-size: 16px;
}

.theme-preview {
  width: 100%;
  height: 120px;
  background: #3c3c3c;
  border-radius: 4px;
}
:deep(.el-button:hover) {
  background-color: #595959;
  border-color: #707070;
}

:deep(.el-switch__core) {
  background-color: #4a4a4a;
  border-color: #606266;
}

:deep(.el-switch.is-checked .el-switch__core) {
  background-color: #409eff;
  border-color: #409eff;
}

:deep(.el-button.toggle-panel) {
  background-color: #232323;
  border: none;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
}
.dialog-footer {
  padding: 20px 0;
  text-align: right;
}
</style>