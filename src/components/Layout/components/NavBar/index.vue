<template>
  <div class="navbar" :style="{height: navBarHeight}">
    <div class="navbar-logo" :style="{width:sideBarWidth}">
      <slot name="navLogo">
        <img :src="Logo"/>
      </slot>
    </div>
    
    <div style="flex-grow: 1;display:flex; align-items:center;">
      <Hamburger v-if="hasHambuger" class="hamburger-container" :isCollapse="isCollapse" @toggleSideBar="toggleClick" />
      <slot name="navLeft" />
    </div>
    <slot name="navCenter" />
    <div class="right-menu">
      <slot name="navRight">
        <el-space :size="12" spacer="|">
          <div class="rightItem">
            <el-avatar :src="avatar" :size="35" style="margin-right:10px" />
            <span>欢迎您，{{ user.userName || 'default' }}</span>
          </div>
          <div class="rightItem">
            <el-icon :size="20" style="margin-right:5px" ><SwitchButton /></el-icon>
            <span>退出系统</span>
          </div>
        </el-space>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
// import BreadCrumb from '@/components/bread-crumb/Index.vue'
import Hamburger from './hamburger.vue'
// import Screenfull from '@/components/screenfull/Index.vue'
// import LangSelect from '@/components/lang_select/Index.vue'
// import SizeSelect from '@/components/size_select/Index.vue'
import variables from '@/styles/variables.module.scss'
import { reactive, toRefs } from 'vue'
// import { useStore } from '@/store'
// import { AppActionTypes } from '@/store/modules/app/action-types'
// import { UserActionTypes } from '@/store/modules/user/action-types'
import { useRoute, useRouter } from 'vue-router'
import avatar from './user.png'
export default {
  components: {
    // BreadCrumb,
    Hamburger,
    // Screenfull,
    // LangSelect,
    // SizeSelect
  },
  props:{
    hasHambuger: {
      type:Boolean,
      default:true
    },
    sideBarWidth: {
      type:String,
      default:'200px'
    },
    navBarHeight: {
      type:String,
      default:'50px'
    },
    user: {
      type:Object,
      default:()=>({})
    },
    isCollapse: {
      type:Boolean,
      default:false
    },
    Logo:{
      type:String,
      default: ''
    },
  },
  emits: ['toggleSideBar'],
  setup(_, context){
    
    const route = useRoute()
    const router = useRouter()
    const data = reactive({
      logout: () => {
        router.push(`/login?redirect=${route.fullPath}`).catch(err => {
          console.warn(err)
        })
      }
    })

    const toggleClick = () => {
      context.emit('toggleSideBar')
    }
    return {
      toggleClick,
      avatar,
      variables,
      ...toRefs(data),
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(15, 18, 20, 0.1);
  background:$navBgColor;
  color:$navTextColor;
  .navbar-logo{
    display: flex;
    align-items: center;
    img{
      margin-left: 20px;
      width: 80px;
    }
  }
}
.right-menu{
  display: flex;
  align-items: center;
  .rightItem{
    display: flex;
    align-items: center;
  }
}
.avatar-wrapper{
  display: flex;
  align-items: center;
}
.avatar-container{
  cursor: pointer;
  margin: 0 20px;
}
</style>
