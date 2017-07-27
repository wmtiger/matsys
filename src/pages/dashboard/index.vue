<template>
  <Menu mode="horizontal" :active-name="crtActiveMenu">
    <Menu-item name="1" v-for="menu in menus" :key="menu.id">
      <!--<Icon type="ios-paper"></Icon>-->
      <!--内容管理-->
      {{menu.menuName}}
    </Menu-item>
    <!--<Menu-item name="1">
      <Icon type="ios-paper"></Icon>
      内容管理
    </Menu-item>
    <Menu-item name="2">
      <Icon type="ios-people"></Icon>
      用户管理
    </Menu-item>
    <Submenu name="3">
      <template slot="title">
        <Icon type="stats-bars"></Icon>
        统计分析
      </template>
      <Menu-group title="使用">
        <Menu-item name="3-1">新增和启动</Menu-item>
        <Menu-item name="3-2">活跃分析</Menu-item>
        <Menu-item name="3-3">时段分析</Menu-item>
      </Menu-group>
      <Menu-group title="留存">
        <Menu-item name="3-4">用户留存</Menu-item>
        <Menu-item name="3-5">流失用户</Menu-item>
      </Menu-group>
    </Submenu>
    <Menu-item name="4">
      <Icon type="settings"></Icon>
      综合设置
    </Menu-item>-->
  </Menu>
</template>
<script>
  import {getMyMenu} from '@/api/menu.js'
  import {getVO} from '@/common/proto-vo.js'

  export default {
    data () {
      return {
        crtActiveMenu: '',
        menus: []
      }
    },
    created () {
      getMyMenu().then((data) => {
        if (!data) {
          return
        }
        let MenuVO = getVO('MenuVO')
        let vos = []
        let pv = data.data.data
        let len = pv.data.length
        for (let i = 0; i < len; i++) {
          let vo = MenuVO.decode(pv.data[i])
          vos.push(vo)
        }
      })
    }
  }
</script>
