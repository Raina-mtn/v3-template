<template>
  <div class="navbar" :style="{height: navBarHeight}">
    <!-- <BreadCrumb
      id="breadcrumb-container"
      class="breadcrumb-container"
    /> -->
    <div style="display:flex; align-items:center">
      <Hamburger v-if="hasHambuger" class="hamburger-container" :isCollapse="isCollapse" @toggleSideBar="toggleClick" />
      <!-- <breadcrumb v-if="hasBreadcrumb" class="breadcrumb-container" :text-color="navTextColor" /> -->
      <slot name="navLeft" />
    </div>
    <slot name="navCenter" />
    <div class="right-menu">
      <slot name="navRight" />
      <el-dropdown
        class="avatar-container"
        trigger="click"
        :style="{'--el-text-color-regular':variables.navTextColor}"
      >
        <div class="avatar-wrapper">
          <el-avatar :src="avatar" size="small" style="margin-right:10px" />
          <span>{{ user.userName || 'default' }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <slot name="dropdownItems" />
          </el-dropdown-menu>
        </template>
      </el-dropdown>
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
}
.right-menu{
  display: flex;
  align-items: center;
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
