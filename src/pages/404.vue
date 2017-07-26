<template>
  <div style="background:#f0f2f5;margin: 0;">
    <div class="wscn-http404">
      <div class="pic-404">
        <img :src="imgNotFound404" alt="404">
      </div>
    </div>
  </div>
</template>

<script>
 import imgNotFound404 from '@/assets/404_images/404.png'
 import imgNotFound404Cloud from '@/assets/404_images/404_cloud.png'

 export default {
   data () {
     return {
       imgNotFound404,
       imgNotFound404Cloud
     }
   },
   computed: {
     message () {
       return '特朗普说这个页面你不能进......'
     }
   }
 }
</script>
