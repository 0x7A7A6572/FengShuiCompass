<script setup>
import FengShuiCompass from "./components/FengShuiCompass.vue";
</script>

<template>
  <div class="gemc-layout">
    <FengShuiCompass id="gemc" :width="2000" :height="2000"></FengShuiCompass>
    <div class="contorl">
      <div class="control-rotate">
        旋转罗盘
        <input type="range" min="0" max="100" step="5" />
      </div>
      <div class="line"></div>

      <div class="control-rotate">
        颜色填充
        <div>
          层：
          <select>
            <option>1</option>
          </select>
          <input type="color" value="#2D9900" />
        </div>
        <div>
          宫：
          <select>
            <option>1</option>
          </select>
          <input type="color" value="#FF9900" />
        </div>
      </div>
      <div class="line"></div>

      <div class="control-data">
        数据
        <textarea disabled type="range" min="0" max="100" step="5" ></textarea>
      </div>
      <div class="line"></div>
    </div>
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
}
.gemc-layout {
  display: flex;
}
.contorl {
  background-color: rgb(35, 35, 35);
  flex: auto;
  padding: 10px;
}
.control-rotate > div {
  margin-top: 5px;
}
.control-rotate {
  color: aqua;
  text-align: left;
  font-size: smaller;
}

.control-data {
   color: aqua;
  text-align: left;
  font-size: smaller;
}
.control-data textarea{
  font-size: small;
  width: 100%;
}
#gemc {
  height: 500px;
  display: block;
  background: rgb(46, 47, 46);
}
.line {
  background-color: aqua;
  height: 1px;
  margin: 5px 0px;
  width: 100%;
}
.center {
  text-align: center;
}
input,
select {
  background-color: transparent;
  margin-left: 5px;
  color: aqua;
}
</style>
