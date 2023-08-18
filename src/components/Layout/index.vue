<template>
  <div
    :class="classObj"
    class="app-wrapper"
  >
    <!-- <div
      class="drawer-bg"
      @click="handleClickOutside"
    /> -->
    <Sidebar 
      class="sidebar-container" 
      :style="{width:sideBarWidth}"
      :showLogo="showLogo" 
      :isCollapse="isCollapse" 
      :Logo="logo" 
      :title="title"
      :sideBarWidth="sideBarWidth"
      />
    <div
      :class="{hasTagsView: showTagsView}"
      class="main-container"
      :style="{'margin-left': sideBarWidth}"
    >
      <Navbar>
      </Navbar>
      <div >
        <!-- <TagsView v-if="showTagsView" /> -->
      </div>
      <AppMain />
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
    NavBar
  },
  data() {
    return {
    }
  },
  props:{
    showLogo: {
      type:Boolean,
      default:true
    },
    showTagsView: {
      type:Boolean,
      default:false
    },//是否显示面包屑
    fixedHeader: {
      type:Boolean,
      default:true
    },
    title: {
      type:String,
      default:'132'
    },
    logo: {
      type:String,
      default:logo
    },
    sideBarWidth: {
      type:String,
      default:'200px'
    },
  },
  setup () {
    let isCollapse = ref(false)
    const classObj = computed(() => {
      return {
        'hideSidebar': isCollapse.value,
      }
    })

    function handleClickOutside():void{
        isCollapse.value = !isCollapse
      }

    return {
      classObj,
      isCollapse,
      handleClickOutside,
    }
  }
})
</script>

<style scoped>

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.main-container {
  min-height: 100%;
  transition: margin-left .28s;
  position: relative;
}

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

.hideSidebar {
  .main-container {
    margin-left: 54px;
  }

  .sidebar-container {
    width: 54px !important;
  }
}
</style>