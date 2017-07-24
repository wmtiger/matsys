<template>
  <!-- 这里是导航 -->
  <router-view></router-view>
</template>

<script>
  import {getMyMenu} from '../api/menu.js'
  export default {
    data () {
      return {
      }
    },
    created () {
      console.log('menu')
      getMyMenu(8)
    }
  }
</script>

<style>

</style>
