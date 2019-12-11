<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 11:13:24
 * @LastEditTime: 2019-11-19 11:02:15
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div id="app">
    <!-- <Header v-show="title" :title="title" :hasClose="hasClose"/> -->
    <router-view />
  </div>
</template>

<script>
import router from "./router";
export default {
  name: "App",
  data() {
    return {};
  },
  watch: {
    $route: function(to, from) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      window.pageYOffset = 0;
    }
  }
};
</script>

<style>
@import "./style/reset.less";
#app {
  font-family: "HelveticaNeue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  height: 100%;
  background-color: #fff;
  /* color: #2c3e50; */
  /* margin-top: 60px;*/
}
</style>
