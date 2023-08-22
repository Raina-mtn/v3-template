<template>
  <div
    :class="{'has-logo': showLogo}"
    class="sideWrap"
    :style="{width:sideBarWidth}"
  >
    <SidebarLogo
      v-if="showLogo"
      :collapse="isCollapse"
      :Logo="Logo"
      :title="title"
    />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        class="el-menu-demo"
        :collapse="isCollapse"
        :unique-opened="false"
        :default-active="activeMenu"
        :style="{
          '--el-menu-text-color':variables.menuText,
          '--el-menu-bg-color':variables.menuBg,
          '--el-menu-active-color':variables.menuActiveText,
          '--el-menu-hover-text-color':variables.menuActiveText,
          '--el-menu-hover-bg-color':variables.menuActiveBg,
          }"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in asyncRoutes"
          :key="route.path"
          :item="route"
          :is-collapse="isCollapse"
          :sideBarWidth="sideBarWidth"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import SidebarItem from './SidebarItem.vue'
import SidebarLogo from './SidebarLogo.vue'
import variables from '@/styles/variables.module.scss'
import { asyncRoutes } from "@/router/config";
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    SidebarItem,
    SidebarLogo
  },
  props: {
    isCollapse: {
      type:Boolean,
      default:false
    },
    showLogo: {
      type:Boolean,
      default:true
    },
    Logo:{
      type:String,
      default: ''
    },
    title:{
      type:String,
      default: ''
    },
    sideBarWidth: {
      type:String,
      default:'200px'
    },
  },
  setup() {
    const route = useRoute()
    const activeMenu = computed(() => {
      const { meta, path } = route
      if (meta !== null || meta !== undefined) {
        if (meta.activeMenu) {
          return meta.activeMenu
        }
      }
      return path
    })

    return {
      asyncRoutes,
      variables,
      activeMenu,
      
    }
  }
})
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%;
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.sideWrap{
  background: $menuBg;
}
.el-scrollbar {
  height: 100%;
}

.has-logo {
  .el-scrollbar {
    height: calc(100vh - 100px);
  }
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
  .el-menu-demo--bg-color{
    background: $menuBg;
  } 
}
</style>
