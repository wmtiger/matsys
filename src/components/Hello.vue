<template>
  <Tabs type="card">
    <Tab-pane v-for="tab in tabs" :key="tab" :label="'标签' + tab">标aa签{{ tab }}</Tab-pane>
    <Button type="ghost" @click="handleTabsAdd" size="small" slot="extra" :disabled="tabs > 3">增加</Button>
  </Tabs>
</template>

<script>
  export default {
    data () {
      return {
        tabs: 2
      }
    },
    methods: {
      handleTabsAdd () {
        this.tabs ++
      }
    }
  }
</script>
