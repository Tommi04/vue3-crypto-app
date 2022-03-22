<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    >
    <el-menu-item index="1" style="width:96px; padding: 0">
      <router-link style="width:100%" to="/">Lista</router-link>
    </el-menu-item>
  </el-menu>

  <router-view/>
</template>

<script>
export default {
  name: "App",
  dara() {
    return {
      activeIndex: "1",
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
