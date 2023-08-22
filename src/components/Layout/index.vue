<template>
  <div
    :class="classObj"
    class="app-wrapper"
  >
    <div
      :class="{hasTagsView: showTagsView}"
      class="main-container"
      :style="{'width': `calc(100% - ${sideBarWidth})`,position:'relative',left:sideBarWidth,top:navBarHeight}"
    >
    <Sidebar 
      class="sidebar-container" 
      :showLogo="showLogo"
      :isCollapse="isCollapse" 
      :Logo="logo" 
      :title="title"
      :sideBarWidth="sideBarWidth"
      />
      <div class="fixed-header" :style="{'width': `100%`}">
        <NavBar :sideBarWidth="sideBarWidth" :navBarHeight="navBarHeight" :isCollapse="isCollapse" @toggleSideBar="toggleSideBar"></NavBar>
      </div>
        <!-- <div ><TagsView v-if="showTagsView" /></div> -->
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
      <!-- <RightPanel v-if="showSettings">
        <Settings />
      </RightPanel> -->
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
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
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