<template>
  <div
    class="feng-shui-compass-svg"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <!-- 罗盘主体 -->
    <svg
      :width="width"
      :height="height"
      :viewBox="`0 0 ${width} ${height}`"
      :style="{ transform: `rotate(${rotate}deg)` }"
    >
      <!-- 天池圆圈 -->
      <circle
        :cx="centerPoint.x"
        :cy="centerPoint.y"
        :r="tianChiRadius"
        :stroke="borderColor"
        :stroke-width="borderWidth"
        fill="none"
      />

      <!-- 各层圆环 -->
      <g v-for="(layer, layerIndex) in compassData" :key="layerIndex">
        <!-- 层边框圆圈 -->
        <circle
          :cx="centerPoint.x"
          :cy="centerPoint.y"
          :r="getLayerRadius(layerIndex + 1)"
          :stroke="borderColor"
          :stroke-width="borderWidth"
          fill="none"
        />
        <!-- 层填充 -->
        <path
          v-if="hasLayerFill(layerIndex)"
          :d="getLayerPath(layerIndex)"
          :fill="getLayerFillColor(layerIndex)"
        />

        <!-- 宫格填充 -->
        <path
          v-for="(_, latticeIndex) in layer.data"
          :key="`lattice-${layerIndex}-${latticeIndex}`"
          :d="getLatticePath(latticeIndex, layerIndex)"
          :fill="
            hasLatticeFill(latticeIndex, layerIndex)
              ? getLatticeFillColor(latticeIndex, layerIndex)
              : 'transparent'
          "
          @click="handleLatticeClick(latticeIndex, layerIndex)"
          style="cursor: pointer"
        />

        <!-- 层文字 -->
        <g
          v-for="(text, textIndex) in layer.data"
          :key="`text-${layerIndex}-${textIndex}`"
        >
          <text
            v-if="!Array.isArray(text)"
            :x="getTextX(layerIndex, textIndex, layer)"
            :y="getTextY(layerIndex, textIndex, layer)"
            :transform="getTextTransform(layerIndex, textIndex, layer)"
            :fill="layer.textColor"
            :font-size="props.autoFontSize ? baseFontSize : layer.fontSize"
            text-anchor="middle"
            dominant-baseline="middle"
            font-family="楷书"
            @click="handleLatticeClick(textIndex, layerIndex)"
            style="cursor: pointer"
          >
            {{ text }}
          </text>

          <!-- 同宫文字处理 -->
          <g v-else>
            <text
              v-for="(subText, subIndex) in text"
              :key="`subtext-${layerIndex}-${textIndex}-${subIndex}`"
              :x="getTogetherTextX(layerIndex, textIndex, subIndex, layer)"
              :y="getTogetherTextY(layerIndex, textIndex, subIndex, layer)"
              :transform="
                getTogetherTextTransform(layerIndex, textIndex, subIndex, layer)
              "
              :fill="
                Array.isArray(layer.textColor)
                  ? layer.textColor[subIndex]
                  : layer.textColor
              "
              :font-size="props.autoFontSize ? baseFontSize : layer.fontSize"
              text-anchor="middle"
              dominant-baseline="middle"
              font-family="楷书"
              @click="handleLatticeClick(textIndex, layerIndex)"
              style="cursor: pointer"
            >
              {{ subText }}
            </text>
          </g>
        </g>

        <!-- 分隔线 -->
        <line
          v-for="i in layer.data.length"
          :key="`divider-${layerIndex}-${i}`"
          :x1="getDividerStartX(layerIndex, i - 1)"
          :y1="getDividerStartY(layerIndex, i - 1)"
          :x2="getDividerEndX(layerIndex, i - 1)"
          :y2="getDividerEndY(layerIndex, i - 1)"
          :stroke="borderColor"
          :stroke-width="borderWidth"
        />
      </g>

      <!-- 刻度 -->
      <g v-if="scaclStyle">
        <g v-for="i in 360" :key="`scale-${i}`">
          <line
            :x1="getScaleStartX(i)"
            :y1="getScaleStartY(i)"
            :x2="getScaleEndX(i)"
            :y2="getScaleEndY(i)"
            :stroke="i % 10 === 0 ? scaleHighlightColor : scaleColor"
            :stroke-width="borderWidth"
          />
          <text
            v-if="i % 10 === 0"
            :x="getScaleTextX(i)"
            :y="getScaleTextY(i)"
            :transform="getScaleTextTransform(i)"
            :fill="scaleHighlightColor"
            :font-size="getScaleFontSize()"
            text-anchor="middle"
            dominant-baseline="middle"
          >
            {{ i }}
          </text>
        </g>
      </g>
    </svg>
    <!-- 天心十字 -->
    <svg
      v-if="isShowTianxinCross"
      class="tianxin-cross"
      :width="width"
      :height="height"
      :viewBox="`0 0 ${width} ${height}`"
    >
      <line
        :x1="centerPoint.x - tianxinCrossSize / 2"
        :y1="centerPoint.y"
        :x2="centerPoint.x + tianxinCrossSize / 2"
        :y2="centerPoint.y"
        :stroke="tianxinCrossColor"
        :stroke-width="tianxinCrossWidth"
      />
      <line
        :x1="centerPoint.x"
        :y1="centerPoint.y - tianxinCrossSize / 2"
        :x2="centerPoint.x"
        :y2="centerPoint.y + tianxinCrossSize / 2"
        :stroke="tianxinCrossColor"
        :stroke-width="tianxinCrossWidth"
      />
    </svg>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";

const emit = defineEmits(["latticeClick", "update:rotate"]);

const CORRECTION_ANGLE = -90;
const TOGERTHER_STYLE_EQUALLY = "equally";

const props = defineProps({
  width: {
    type: Number,
    default: 500,
  },
  height: {
    type: Number,
    default: 500,
  },
  rotate: {
    type: Number,
    default: 0,
  },
  compassData: {
    type: Array,
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
  scaclStyle: {
    type: Object,
    default: () => ({
      minLineHeight: 10,
      midLineHeight: 25,
      maxLineHeight: 25,
      numberFontSize: 30,
    }),
  },
  autoFontSize: {
    type: Boolean,
    default: true,
  },
  borderColor: {
    type: String,
    default: "#000",
  },
  scaleColor: {
    type: String,
    default: "#000",
  },
  scaleHighlightColor: {
    type: String,
    default: "red",
  },
  isShowTianxinCross: {
    type: Boolean,
    default: true,
  },
  tianxinCrossColor: {
    type: String,
    default: "red",
  },
  tianxinCrossWidth: {
    type: Number,
    default: 2,
  },
});

// 计算中心点
const centerPoint = computed(() => ({
  x: props.width / 2,
  y: props.height / 2,
}));

const tianxinCrossSize = computed(() => {
  return Math.max(props.width, props.height);
});

// 基础配置
const radius = computed(() => {
  // 预留刻度线和文字的空间
  const maxScaleSpace = props.scaclStyle
    ? props.scaclStyle.maxLineHeight * 3
    : 0; // 包括文字空间
  const availableSpace =
    Math.min(props.width, props.height) / 2 - maxScaleSpace;
  return Math.max(availableSpace, 0); // 确保半径不为负
});
const tianChiRadius = computed(() => radius.value * 0.1);
const borderWidth = 1;

// 计算每层高度
const layerHeight = computed(() => {
  const availableHeight =
    (radius.value - tianChiRadius.value) / props.compassData.length;
  return new Array(props.compassData.length).fill(availableHeight);
});

// 获取指定层的半径
function getLayerRadius(index) {
  let r = tianChiRadius.value;
  for (let i = 0; i < index; i++) {
    r += layerHeight.value[i];
  }
  return r;
}

// 角度转弧度
function rads(degrees) {
  return (Math.PI * (degrees + CORRECTION_ANGLE)) / 180;
}

// 检查层填充
function hasLayerFill(layerIndex) {
  return props.layerFilt.some((fill) => fill[0] === layerIndex);
}

// 获取层填充颜色
function getLayerFillColor(layerIndex) {
  const fill = props.layerFilt.find((fill) => fill[0] === layerIndex);
  return fill ? fill[1] : "none";
}

// 获取层路径
// 缓存计算结果
const cachedResults = new Map();

// 缓存计算函数
function memoize(fn) {
  return function (...args) {
    const key = JSON.stringify(args);
    if (!cachedResults.has(key)) {
      cachedResults.set(key, fn.apply(this, args));
    }
    return cachedResults.get(key);
  };
}

// 优化计算密集型函数
const getLayerPath = memoize((layerIndex) => {
  const innerRadius = getLayerRadius(layerIndex);
  const outerRadius = getLayerRadius(layerIndex + 1);

  return `
    M ${centerPoint.value.x + innerRadius * Math.cos(0)} ${
    centerPoint.value.y + innerRadius * Math.sin(0)
  }
    A ${innerRadius} ${innerRadius} 0 1 1 ${
    centerPoint.value.x + innerRadius * Math.cos(2 * Math.PI)
  } ${centerPoint.value.y + innerRadius * Math.sin(2 * Math.PI)}
    L ${centerPoint.value.x + outerRadius * Math.cos(2 * Math.PI)} ${
    centerPoint.value.y + outerRadius * Math.sin(2 * Math.PI)
  }
    A ${outerRadius} ${outerRadius} 0 1 0 ${
    centerPoint.value.x + outerRadius * Math.cos(0)
  } ${centerPoint.value.y + outerRadius * Math.sin(0)}
    Z
  `.trim();
});

// const getLatticePath = memoize((latticeIndex, layerIndex) => {
//   const layer = props.compassData[layerIndex];
//   const count = layer.data.length;
//   const startAngle = rads((360 / count) * latticeIndex);
//   const endAngle = rads((360 / count) * (latticeIndex + 1));
//   const innerRadius = getLayerRadius(layerIndex);
//   const outerRadius = getLayerRadius(layerIndex + 1);

//   const x1 = centerPoint.value.x + innerRadius * Math.cos(startAngle);
//   const y1 = centerPoint.value.y + innerRadius * Math.sin(startAngle);
//   const x2 = centerPoint.value.x + outerRadius * Math.cos(startAngle);
//   const y2 = centerPoint.value.y + outerRadius * Math.sin(startAngle);
//   const x3 = centerPoint.value.x + outerRadius * Math.cos(endAngle);
//   const y3 = centerPoint.value.y + outerRadius * Math.sin(endAngle);
//   const x4 = centerPoint.value.x + innerRadius * Math.cos(endAngle);
//   const y4 = centerPoint.value.y + innerRadius * Math.sin(endAngle);

//   return `
//     M ${x1} ${y1}
//     L ${x2} ${y2}
//     A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3}
//     L ${x4} ${y4}
//     A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1}
//     Z
//   `.trim();
// });

// 清理缓存
onMounted(() => {
  // 初始化时清理缓存
  cachedResults.clear();
});

onUnmounted(() => {
  // 组件卸载时清理缓存
  cachedResults.clear();
});

// 检查宫格填充
function hasLatticeFill(latticeIndex, layerIndex) {
  return props.latticeFill.some(
    (fill) => fill[0] === latticeIndex && fill[1] === layerIndex
  );
}

// 获取宫格填充颜色
function getLatticeFillColor(latticeIndex, layerIndex) {
  const fill = props.latticeFill.find(
    (fill) => fill[0] === latticeIndex && fill[1] === layerIndex
  );
  return fill ? fill[2] : "none";
}

// 获取宫格路径
function getLatticePath(latticeIndex, layerIndex) {
  const layer = props.compassData[layerIndex];
  const count = layer.data.length;
  const startAngle = rads((360 / count) * latticeIndex);
  const endAngle = rads((360 / count) * (latticeIndex + 1));
  const innerRadius = getLayerRadius(layerIndex);
  const outerRadius = getLayerRadius(layerIndex + 1);

  // 计算当前宫格的四个角点坐标
  const x1 = centerPoint.value.x + innerRadius * Math.cos(startAngle);
  const y1 = centerPoint.value.y + innerRadius * Math.sin(startAngle);
  const x2 = centerPoint.value.x + outerRadius * Math.cos(startAngle);
  const y2 = centerPoint.value.y + outerRadius * Math.sin(startAngle);
  const x3 = centerPoint.value.x + outerRadius * Math.cos(endAngle);
  const y3 = centerPoint.value.y + outerRadius * Math.sin(endAngle);
  const x4 = centerPoint.value.x + innerRadius * Math.cos(endAngle);
  const y4 = centerPoint.value.y + innerRadius * Math.sin(endAngle);

  // 使用精确的SVG路径命令绘制宫格
  // M: 移动到起点
  // L: 画直线
  // A: 画圆弧，参数：rx ry x-axis-rotation large-arc-flag sweep-flag x y
  return `
    M ${x1} ${y1}
    L ${x2} ${y2}
    A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3}
    L ${x4} ${y4}
    A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1}
    Z
  `.trim();
}

// 计算基础字体大小
const baseFontSize = computed(() => {
  if (!props.autoFontSize) return null;
  // 根据罗盘半径计算合适的字体大小
  // 取罗盘半径的1/20作为基准字体大小
  const baseFontSize = radius.value / 20;
  // 限制最小和最大字体大小
  return Math.min(Math.max(baseFontSize, 12), 40);
});

// 获取文字位置和变换
function getTextPosition(layerIndex, textIndex, layer) {
  const count = layer.data.length;
  const angle = rads((360 / count) * textIndex + 360 / count / 2);
  const r = getLayerRadius(layerIndex) + layerHeight.value[layerIndex] / 2;

  return {
    x: centerPoint.value.x + r * Math.cos(angle),
    y: centerPoint.value.y + r * Math.sin(angle),
    angle: (angle * 180) / Math.PI + 90,
  };
}

function getTextX(layerIndex, textIndex, layer) {
  return getTextPosition(layerIndex, textIndex, layer).x;
}

function getTextY(layerIndex, textIndex, layer) {
  return getTextPosition(layerIndex, textIndex, layer).y;
}

function getTextTransform(layerIndex, textIndex, layer) {
  const pos = getTextPosition(layerIndex, textIndex, layer);
  // 如果设置了垂直显示，则根据文字位置计算角度，使其始终以圆心为底
  const extraRotation = layer.vertical
    ? pos.angle > 90 && pos.angle < 270
      ? 270
      : 90
    : 0;
  return `rotate(${pos.angle + extraRotation} ${pos.x} ${pos.y})`;
}

// 获取同宫文字位置和变换
function getTogetherTextPosition(layerIndex, textIndex, subIndex, layer) {
  const count = layer.data.length; // 宫格数量
  const singleAngle = 360 / count; // 每个宫格的角度
  const baseAngle = singleAngle * textIndex; // 当前宫格的起始角度

  // 获取当前宫格内的文字数量
  const currentLatticeTexts = layer.data[textIndex];
  const textsCount = currentLatticeTexts.length;

  // 计算当前宫格内文字的分布角度
  const textSpacing = singleAngle / (textsCount + 1);
  const textAngle = baseAngle + textSpacing * (subIndex + 1);

  const angle = rads(textAngle);
  const r = getLayerRadius(layerIndex) + layerHeight.value[layerIndex] / 2;

  return {
    x: centerPoint.value.x + r * Math.cos(angle),
    y: centerPoint.value.y + r * Math.sin(angle),
    angle: (angle * 180) / Math.PI + 90,
  };
}

function getTogetherTextX(layerIndex, textIndex, subIndex, layer) {
  return getTogetherTextPosition(layerIndex, textIndex, subIndex, layer).x;
}

function getTogetherTextY(layerIndex, textIndex, subIndex, layer) {
  return getTogetherTextPosition(layerIndex, textIndex, subIndex, layer).y;
}

function getTogetherTextTransform(layerIndex, textIndex, subIndex, layer) {
  const pos = getTogetherTextPosition(layerIndex, textIndex, subIndex, layer);
  return `rotate(${pos.angle} ${pos.x} ${pos.y})`;
}

// 获取分隔线位置
function getDividerPosition(layerIndex, index) {
  const layer = props.compassData[layerIndex];
  const count = layer.data.length;
  const angle = rads((360 / count) * index);
  const innerRadius = getLayerRadius(layerIndex);
  const outerRadius = getLayerRadius(layerIndex + 1);

  return {
    start: {
      x: centerPoint.value.x + innerRadius * Math.cos(angle),
      y: centerPoint.value.y + innerRadius * Math.sin(angle),
    },
    end: {
      x: centerPoint.value.x + outerRadius * Math.cos(angle),
      y: centerPoint.value.y + outerRadius * Math.sin(angle),
    },
  };
}

function getDividerStartX(layerIndex, index) {
  return getDividerPosition(layerIndex, index).start.x;
}

function getDividerStartY(layerIndex, index) {
  return getDividerPosition(layerIndex, index).start.y;
}

function getDividerEndX(layerIndex, index) {
  return getDividerPosition(layerIndex, index).end.x;
}

function getDividerEndY(layerIndex, index) {
  return getDividerPosition(layerIndex, index).end.y;
}

// 获取刻度位置
function getScalePosition(index) {
  const angle = rads(index);
  const r = getLayerRadius(props.compassData.length);
  const scaleLength =
    index % 10 === 0
      ? props.scaclStyle.maxLineHeight
      : index % 5 === 0
      ? props.scaclStyle.midLineHeight
      : props.scaclStyle.minLineHeight;

  return {
    start: {
      x: centerPoint.value.x + r * Math.cos(angle),
      y: centerPoint.value.y + r * Math.sin(angle),
    },
    end: {
      x: centerPoint.value.x + (r + scaleLength) * Math.cos(angle),
      y: centerPoint.value.y + (r + scaleLength) * Math.sin(angle),
    },
    text: {
      x:
        centerPoint.value.x +
        (r + props.scaclStyle.maxLineHeight * 2) * Math.cos(angle),
      y:
        centerPoint.value.y +
        (r + props.scaclStyle.maxLineHeight * 2) * Math.sin(angle),
      angle: (angle * 180) / Math.PI + 90,
    },
  };
}

function getScaleStartX(index) {
  return getScalePosition(index).start.x;
}

function getScaleStartY(index) {
  return getScalePosition(index).start.y;
}

function getScaleEndX(index) {
  return getScalePosition(index).end.x;
}

function getScaleEndY(index) {
  return getScalePosition(index).end.y;
}

function getScaleTextX(index) {
  return getScalePosition(index).text.x;
}

function getScaleTextY(index) {
  return getScalePosition(index).text.y;
}

function getScaleTextTransform(index) {
  const pos = getScalePosition(index).text;
  return `rotate(${pos.angle} ${pos.x} ${pos.y})`;
}

// 处理宫格点击事件
function handleLatticeClick(latticeIndex, layerIndex) {
  emit("latticeClick", {
    latticeIndex,
    layerIndex,
    data: props.compassData[layerIndex].data[latticeIndex],
  });
}

// 计算刻度文字大小
function getScaleFontSize() {
  // 如果有设置固定大小，则使用设置的大小
  if (props.scaclStyle?.numberFontSize) {
    return props.scaclStyle.numberFontSize;
  }

  // 根据罗盘半径计算合适的字体大小
  // 取罗盘半径的1/20作为基准字体大小
  const baseFontSize = radius.value / 20;
  // 限制最小和最大字体大小
  return Math.min(Math.max(baseFontSize, 12), 40);
}
</script>



<style scoped>
.feng-shui-compass-svg {
  position: relative;
  margin: 0 auto;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.feng-shui-compass-svg svg {
  transform-origin: center center;
  will-change: transform;
  backface-visibility: hidden;
  perspective: 1000;
  transform: translateZ(0);
  transition: transform 0.1s linear;
}

.tianxin-cross {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}
</style>