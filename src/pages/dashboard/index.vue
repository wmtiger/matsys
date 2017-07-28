<template>
  <div class="layout">
    <Row>
      <Col :span="spanLeft" class="layout-menu-left">
        <Menu @on-select="routeTo" width="auto" theme="dark">
          <template v-for="menu in menus" v-if="menu.subMenu.length <= 0">
            <Menu-item :name="menu.routerPath" :key="menu.id">
              {{menu.name}}
            </Menu-item>
          </template>
          <template v-for="menu in menus" v-if="menu.subMenu.length > 0">
            <Submenu :name="menu.routerPath" :key="menu.id">
              <template slot="title">
                {{menu.name}}
              </template>
              <template v-for="submenu in menu.subMenu">
                <Menu-item :name="submenu.routerPath" :key="menu.id">
                  {{submenu.name}}
                </Menu-item>
              </template>
            </Submenu>
          </template>
        </Menu>
      </Col>
      <Col :span="spanRight">
        <div class="layout-header">
          <i-button type="text" @click.native="toggleClick">
            <Icon type="navicon" size="32"></Icon>
          </i-button>
        </div>
        <div class="layout-breadcrumb">
          <Breadcrumb>
            <Breadcrumb-item>首页</Breadcrumb-item>
            <Breadcrumb-item>页面</Breadcrumb-item>
            <Breadcrumb-item>{{this.$route.path.replace('/','')}}</Breadcrumb-item>
          </Breadcrumb>
        </div>
        <div class="layout-content">
          <div class="layout-content-main">
            <transition mode="out-in">
              <router-view></router-view>
            </transition>
          </div>
        </div>
        <div class="layout-copy">
          2017-2018 &copy; 边锋蜀山
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
  import {getMyMenu} from '@/api/menu.js'
  import {getVO} from '@/common/proto-vo.js'
  import {trim} from '@/common/stringutil.js'
  import {getListItemByKey} from '@/common/arrayutil.js'

  export default {
    data () {
      return {
        spanLeft: 5,
        spanRight: 19,
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
          let menuvo = {
            id: vo.id.toNumber(),
            menuAction: vo.menuAction,
            menuName: vo.menuName,
            name: vo.name,
            parentId: parseInt(vo.parentId),
            sort: vo.sort,
            routerPath: trim(vo.menuName),
            mid: '' + vo.id.toNumber(),
            subMenu: []
          }
          vos.push(menuvo)
        }
        for (let i = 0; i < len; i++) {
          let mvo = vos[i]
          // console.log('mvo i=', i, 'mov.id=', mvo.id, mvo.parentId)
          if (mvo.parentId === 0) {
            this.menus.push(mvo)
          } else {
            let pmvo = getListItemByKey(this.menus, 'id', mvo.parentId)
            if (pmvo) {
              mvo.mid = mvo.parentId + '-' + mvo.sort
              pmvo.subMenu.push(mvo)
            }
          }
        }
        console.log(this.menus)
      })
    },
    methods: {
      routeTo (e) {
        console.log(e)
        this.$router.push(e)
      }
    }
  }
</script>

<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-menu-left {
    background: #464c5b;
  }
  .layout-header{
    height: 50px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }
  .layout-breadcrumb {
    padding: 10px 15px 0;
  }
  .layout-content {
    min-height: 600px;
    margin: 10px;
    overflow: hidden;
    background: #fff;
    border-radius: 2px;
  }
  .layout-content-main {
    padding: 10px 10px;
  }
  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
</style>
