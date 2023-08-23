<template>
  <div class="app-wrapper" :class="{'hideSidebar': isCollapse}">
    <Sidebar 
      class="sidebar-container" 
      :showLogo="showLogo" 
      :isCollapse="isCollapse" 
      :title="title"
      :sideBarWidth="sideBarWidth"
      :style="{top:navBarHeight, height:`calc(100vh - ${navBarHeight})`,width:sideBarWidth }"
      />
    <div class="nav-container">
      <NavBar
        :sideBarWidth="sideBarWidth"
        :navBarHeight="navBarHeight" 
        :isCollapse="isCollapse" 
        :Logo="logo" 
        @toggleSideBar="toggleSideBar"
      >
        <template #navLogo>
          <slot name="navLogo" />
        </template>
        <template #navLeft>
          <slot name="navLeft" />
        </template>
        <template #navCenter>
          <slot name="navCenter" />
        </template>
        <template #navRight>
          <slot name="navRight" />
        </template>
        <template #dropdownItems>
          <slot name="dropdownItems" />
        </template>
      </NavBar>
      <!-- <RightPanel v-if="showSettings">
        <Settings />
      </RightPanel> -->
    </div>
    <div class="main-container" :style="{'margin-left':sideBarWidth}">
        <el-scrollbar wrap-class="scrollbar-wrapper" class="app-main" :style="{height:`calc(100vh - ${navBarHeight} - 20px)`}">
          <router-view v-slot="{ Component }" :key="$route.path">
            <transition name="fade-transform" mode="out-in">
              <keep-alive>
                <div>
                  <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.path" />
                </div>
              </keep-alive>
            </transition>
            <transition name="fade-transform" mode="out-in">
              <div>
                <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.path" />
              </div>
            </transition>
          </router-view>
        </el-scrollbar>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,computed,ref } from 'vue'
import Sidebar from './components/SideBar/index.vue'
import NavBar from './components/NavBar/index.vue'
import logo from '@/assets/images/logo.png'
export default defineComponent({
  components:{
    Sidebar,
    NavBar,
  },
  data() {
    return {
    }
  },
  props:{
    showLogo: {
      type:Boolean,
      default:true
    },//是否显示面包屑
    showTagsView: {
      type:Boolean,
      default:false
    },
    title: {
      type:String,
      default:'线路'
    },
    logo: {
      type:String,
      default:logo
    },
    sideBarWidth: {
      type:String,
      default:'200px'
    },
    navBarHeight: {
      type:String,
      default:'50px'
    },
  },
  setup () {
    let isCollapse = ref(false)
    const classObj = computed(() => {
      return {
        'hideSidebar': isCollapse.value,
      }
    })

    const toggleSideBar = ()=>{
        isCollapse.value = !isCollapse.value
      }

    return {
      classObj,
      isCollapse,
      toggleSideBar,
    }
  }
})
</script>

<style lang="scss" scoped>


.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  
  .sidebar-container {
    transition: width 0.28s;
    position: fixed;
    left: 0;
    z-index: 1001;
    overflow: hidden;
  }
  
  
  .main-container {
      transition: margin-left .28s;
      position: relative;
    .app-main {
      width: 100%;
      position: relative;
      overflow: hidden;
      
      ::v-deep .scrollbar-wrapper {
        overflow-x: hidden !important;
      }
    }
  }
  
  .nav-container{
    transition: margin-left .28s;
    position: relative;
  }
}


.hideSidebar {
  .sidebar-container {
    width: 54px !important;
  }

  .main-container {
    margin-left: 54px !important;
  }

  .submenu-title-noDropdown {
    padding: 0 !important;
    position: relative;

    .el-tooltip {
      padding: 0 !important;

      .svg-icon {
        margin-left: 20px;
      }

      .sub-el-icon {
        margin-left: 19px;
      }
    }
  }

  .el-submenu {
    overflow: hidden;

    &>.el-submenu__title {
      // padding: 0 !important;

      .svg-icon {
        margin-left: 20px;
      }

      // .sub-el-icon {
      //   margin-left: 19px;
      // }

      .el-submenu__icon-arrow {
        display: none;
      }
    }
  }

  .el-menu--collapse {
    .el-submenu {
      &>.el-submenu__title {
        &>span {
          height: 0;
          width: 0;
          overflow: hidden;
          visibility: hidden;
          display: inline-block;
        }
      }
    }
    .el-menu-item{
      span{
        height: 0;
          width: 0;
          overflow: hidden;
          visibility: hidden;
          display: inline-block;
      }
    }
  }
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: width 0.28s;
}

.hideSidebar {
  .main-container {
    margin-left: 54px;
  }

  .sidebar-container {
    width: 54px !important;
  }
}
</style>