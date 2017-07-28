<template>
<div>
  <!--<vue-markdown>{{content}}</vue-markdown>-->
  <template v-for="log in logs">
    <span>
      [{{log.content}}] 详细信息:{{log.detail}}, 组id:{{log.gid.toNumber()}}, 模块: {{log.module}}, 操作者: {{log.operator}} <br>
    </span>
  </template>
</div>
</template>

<script>
// import VueMarkdown from 'vue-markdown'
import {getLog} from '@/api/log.js'
import {getVO} from '@/common/proto-vo.js'
export default {
  data () {
    return {
      content: 'aaa',
      logs: []
    }
  },
  created () {
    getLog().then((data) => {
      if (!data) {
        return
      }
      let AdminLogVO = getVO('AdminLogVO')
      let pv = data.data.data
      let len = pv.data.length
      for (let i = 0; i < len; i++) {
        let vo = AdminLogVO.decode(pv.data[i])
        this.logs.push(vo)
      }
    })
  }
}
</script>
