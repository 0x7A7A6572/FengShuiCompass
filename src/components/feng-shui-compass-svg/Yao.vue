<template>
  <div class="yao-container">
    <svg
      :width="svgSize"
      :height="svgSize"
      :viewBox="`0 0 ${svgSize} ${svgSize}`"
      v-show="config.enableCurve"
    >
      <path
        v-for="bar in bars"
        :key="bar.id"
        :d="getBarPath(bar)"
        :stroke="bar.color"
        :stroke-width="barHeight"
        fill="none"
        @click="toggleBarType(bar)"
      />
      <circle
        :cx="centerPoint.x"
        :cy="centerPoint.y"
        :r="3"
        fill="red"
      />
    </svg>
    <svg
      :width="svgSize"
      :height="svgSize"
      :viewBox="`0 0 ${svgSize} ${svgSize}`"
      v-show="!config.enableCurve"
    >
      <path
        v-for="bar in bars"
        :key="bar.id"
        :d="getBarPath(bar)"
        :stroke="bar.color"
        :stroke-width="barHeight"
        fill="none"
        @click="toggleBarType(bar)"
      />
      <circle
        :cx="centerPoint.x"
        :cy="centerPoint.y"
        :r="3"
        fill="red"
      />
    </svg>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  initialBars: {
    type: Array,
    default: () => [
      { id: 'bar1', color: '#ff0050', type: 'yang' },
      { id: 'bar2', color: '#2c3e50', type: 'yang' },
      { id: 'bar3', color: '#2c3ee0', type: 'yang' }
    ]
  },
  config: {
    type: Object,
    default: () => ({
      radius: 100,
      angle: 0,
      arcLength: 30,
      layerHeight: 64,
      enableCurve: true
    })
  },
  size: {
    type: Number,
    default: 400
  }
})

const emit = defineEmits(['update:config', 'bar-click'])

const svgSize = computed(() => props.size)
const centerPoint = computed(() => ({
  x: svgSize.value / 2,
  y: svgSize.value / 2
}))

const bars = ref([...props.initialBars])

const barHeight = computed(() => props.config.layerHeight / 7)
const spacing = computed(() => props.config.layerHeight / 5)

const calculateArcPoint = (radius, angle) => {
  const radians = (angle - 90) * Math.PI / 180
  return [
    centerPoint.value.x + radius * Math.cos(radians),
    centerPoint.value.y + radius * Math.sin(radians)
  ]
}

const createYinPath = (radius, startAngle, endAngle) => {
  const midAngle = (startAngle + endAngle) / 2
  const [startX, startY] = calculateArcPoint(radius, startAngle)
  const [midX, midY] = calculateArcPoint(radius, midAngle)
  const [endX, endY] = calculateArcPoint(radius, endAngle)
  
  return `M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${midX} ${midY} M ${midX} ${midY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`
}

const getBarPath = (bar) => {
  const startAngle = props.config.angle - props.config.arcLength / 2
  const endAngle = props.config.angle + props.config.arcLength / 2
  const radius = props.config.radius

  if (bar.type === 'yin') {
    return createYinPath(radius, startAngle, endAngle)
  } else {
    const [startX, startY] = calculateArcPoint(radius, startAngle)
    const [endX, endY] = calculateArcPoint(radius, endAngle)
    
    return props.config.enableCurve
      ? `M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`
      : `M ${startX} ${startY} L ${endX} ${endY}`
  }
}

const toggleBarType = (bar) => {
  bar.type = bar.type === 'yang' ? 'yin' : 'yang'
  emit('bar-click', bar)
}
</script>

<style scoped>
.yao-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>