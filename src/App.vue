<script setup>
import FengShuiCompass from './components/FengShuiCompass.vue'
</script>

<template>
    <FengShuiCompass id="gemc" width="2000" height="2000" ></FengShuiCompass>
  <button id="control_rotate">
    旋转
  </button>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#control-rotate{
  background: none;
  display: block;
  float: left;
}
#gemc{
  width: 500px;
  height: 500px;
  display: block;
  background: rgb(46, 47, 46);
}
</style>
