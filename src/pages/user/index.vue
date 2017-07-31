<template>
  <div>
    <Table :border="true" :stripe="true" :show-header="true" :height="350" :data="tableData" :columns="tableColumns"></Table>
  </div>
</template>
<script>
// import VueMarkdown from 'vue-markdown'
import {getAllUser} from '@/api/user.js'
import {getVO} from '@/common/proto-vo.js'
export default {
  data () {
    return {
      tableData: []
    }
  },
  created () {
    getAllUser().then((data) => {
      if (!data) {
        return
      }
      let ManagerVO = getVO('ManagerVO')
      let pv = data.data.data
      let len = pv.data.length
      for (let i = 0; i < len; i++) {
        let vo = ManagerVO.decode(pv.data[i])
        this.tableData.push({
          userName: vo.userName, realName: vo.realName, gid: vo.gid.toNumber(), uid: vo.uid.toNumber()
        })
      }
      console.log(this.tableData)
    })
  },
  computed: {
    tableColumns () {
      let cols = [
        {
          title: '账号',
          key: 'userName'
        },
        {
          title: '姓名',
          key: 'realName'
        },
        {
          title: '账号ID',
          key: 'uid'
        },
        {
          title: '权限组',
          key: 'gid'
        }
      ]
      return cols
    }
  }
}
</script>
