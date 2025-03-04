<template>
  <svg class="starry-background" :width="width" :height="height">
    <defs>
      <radialGradient id="starGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#fff" stop-opacity="1" />
        <stop offset="100%" stop-color="#fff" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="starGradientFill" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#268" stop-opacity="1" />
        <stop offset="100%" stop-color="#268" stop-opacity="0" />
      </radialGradient>
    </defs>

    <!-- 二十八星宿 -->
    <g v-for="mansion in mansions" :key="mansion.name">
      <!-- 星宿中的星点 -->
      <g v-for="star in mansion.stars" :key="star.id">
        <circle
          :cx="star.x * width"
          :cy="star.y * height"
          :r="4"
          fill="url(#starGradientFill)"
          :style="{
            opacity: 1,
            animation: `twinkle 3s infinite ease-in-out`,
          }"
        />
      </g>
      <!-- 星宿内部连线 -->
      <path
        v-for="(line, index) in mansion.lines"
        :key="`${mansion.name}-line-${index}`"
        :d="`M ${line.start.x * width} ${line.start.y * height} L ${
          line.end.x * width
        } ${line.end.y * height}`"
        stroke="rgba(255, 255, 255, 0.1)"
        stroke-width="1"
        fill="none"
      />
    </g>

    <!-- 其他星星 -->
    <g v-for="star in stars" :key="star.id">
      <circle
        :cx="star.x"
        :cy="star.y"
        :r="star.size"
        fill="url(#starGradient)"
        :style="{
          opacity: star.opacity,
          transform: `translate(${star.moveX}px, ${star.moveY}px)`,
          animation: `twinkle ${star.twinkleSpeed}s infinite ease-in-out`,
        }"
      />
    </g>
  </svg>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import twentyEightConstellations from "../data/twentyEightConstellations";

const props = defineProps({
  width: {
    type: Number,
    default: Math.max(window.innerWidth, window.innerHeight),
  },
  height: {
    type: Number,
    default: Math.max(window.innerWidth, window.innerHeight),
  },
});

// 二十八星宿数据
const mansions = ref(twentyEightConstellations);

const stars = ref([]);
const constellationLines = ref([]);
const animationFrame = ref(null);

// 生成随机星星
function generateStars(count = 200) {
  const newStars = [];
  for (let i = 0; i < count; i++) {
    newStars.push({
      id: i,
      x: Math.random() * props.width,
      y: Math.random() * props.height,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.5,
      twinkleSpeed: Math.random() * 3 + 2,
      moveX: 0,
      moveY: 0,
    });
  }
  stars.value = newStars;
}

// 生成星座连线
function generateConstellationLines() {
  const lines = [];
  const starsArray = stars.value;
  const connectionCounts = new Map(); // 记录每个星星的连接数

  for (let i = 0; i < starsArray.length; i++) {
    for (let j = i + 1; j < starsArray.length; j++) {
      // 如果任一星星已达到最大连接数，则跳过
      if (
        (connectionCounts.get(i) || 0) >= 7 ||
        (connectionCounts.get(j) || 0) >= 7
      ) {
        continue;
      }

      const distance = Math.hypot(
        starsArray[i].x - starsArray[j].x,
        starsArray[i].y - starsArray[j].y
      );

      if (distance < 150 && Math.random() > 0.85) {
        lines.push({
          path: `M ${starsArray[i].x} ${starsArray[i].y} L ${starsArray[j].x} ${starsArray[j].y}`,
        });

        // 更新连接数
        connectionCounts.set(i, (connectionCounts.get(i) || 0) + 1);
        connectionCounts.set(j, (connectionCounts.get(j) || 0) + 1);
      }
    }
  }

  constellationLines.value = lines;
}

// 更新星星位置
function updateStars() {
  stars.value = stars.value.map((star) => ({
    ...star,
    moveX: star.moveX + (Math.random() - 0.5) * 0.2,
    moveY: star.moveY + (Math.random() - 0.5) * 0.2,
  }));

  animationFrame.value = requestAnimationFrame(updateStars);
}

onMounted(() => {
  generateStars();
  generateConstellationLines();
  updateStars();
});

onUnmounted(() => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value);
  }
});
</script>

<style>
@keyframes twinkle {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.starry-background {
  /* width: 100%;
  height: 100%; */
  left: 0;
  position: fixed;
  background: transparent;
  animation: rotate 120s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: #fff;
  border-radius: 50%;
  animation: twinkle 2s infinite;
}
.constellation-line {
  position: absolute;
  stroke: #fff;
  stroke-width: 1px;
  opacity: 0.5;
}
</style>