<template>
  <el-icon v-if="iconType==='el'" :size="20" :is="icon"></el-icon>
  <i v-else-if="iconType==='iconfont'" :class="['iconfont', icon, 'sub-el-icon']" />

  <span slot='title'>{{ title }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    iconType:{
      type:String,
      default: ''
    },
    icon:{
      type:String,
      default: ''
    },
    title:{
      type:String,
      default: ''
    },
  }
})


// export const item = (props, context) => {
//   const { iconType,icon, title } = props
//   console.log('icon :>> ', icon);
//   console.log('title :>> ', title);
//     const vnodes = []

//     if (icon) {
//       if (iconType==='el') {
//         vnodes.push(`<el-icon :size="20"><${icon}></el-icon>`)
//       } else if(iconType ==='iconfont') {
//         vnodes.push(`<i class={['iconfont', ${icon}, 'sub-el-icon']} />`) // iconfont字体
//       }
//     }

//     if (title) {
//       vnodes.push(`<span slot='title'>{(${title})}</span>`)
//     }
//     return vnodes
// }
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
