<template>12
  <div class="navbar" :style="{background: navBgColor, color:navTextColor, height: navHeight}">
    <div style="display:flex; align-items:center">
      <!-- <hamburger v-if="hasHambuger" :is-active="opened" class="hamburger-container" :svg-color="navTextColor" @toggleClick="toggleSideBar" />
      <breadcrumb v-if="hasBreadcrumb" class="breadcrumb-container" :text-color="navTextColor" /> -->
      <slot name="navLeft" />
    </div>
    <slot name="navCenter" />
    <div class="right-menu" :style="{color: navTextColor}">
      <slot name="navRight" />
      <!-- 自定义内容 -->123
      <el-dropdown v-if="hasAvatar" class="avatar-container" trigger="click">
        <div class="avatar-wrapper" :style="{color: navTextColor}">
          <el-avatar :src="avatar" size="small" style="margin-right:10px" />
          <span>{{ user.userName || 'default' }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <slot name="dropdownItems" />
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
// import Breadcrumb from "./breadcrumb.vue";
// import Hamburger from "./hamburger.vue";
import avatar from './user.png'
export default {
  name: "Navabr",
  components: {
    // Breadcrumb,
    // Hamburger
  },
  props: {
    opened: {
      type: Boolean,
      default: true
    },
    user: {
      type: [Object, String],
      default: () => ({})
    },
    avatar: {
      type: String,
      default: avatar
    },
    hasHambuger: {
      type: Boolean,
      default: true
    },
    hasBreadcrumb: {
      type: Boolean,
      default: true
    },
    navBgColor: {
      type: String,
      default: ''
    },
    navTextColor: {
      type: String,
      default: ''
    },
    hasAvatar: {
      type: Boolean,
      default: true
    },
    navHeight: {
      type: String,
      default: '52px'
    }
  },
  methods: {
    toggleSideBar() {
      this.$emit("toggleSideBar");
    }
  }
};
</script>

<style scoped lang="scss">
.navbar{
  display: flex;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(15, 18, 20, 0.1);
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
