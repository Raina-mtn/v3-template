<template>
  <el-icon class="menu-icon" v-if="iconType==='el'" :size="20">
    <component class="menu-icon" :is="icon"></component>
  </el-icon>
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
  },
})
</script>

<style lang="scss" scoped>
  .menu-icon{
    color: $menuIconColor;
    width: 1em;
    height: 1em;
  }
</style>
